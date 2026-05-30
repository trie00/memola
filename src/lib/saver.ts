// Saver — single state machine for page-body saves.
//
// Replaces the old soup of:
//   - S.dirty / S.saving / S.sync.mergeInProgress / S.sync.conflictPendingId
//   - S.sync.loadedEtag / loadedModified / baseBody (split watermarks)
//   - S.sync.ourSavedEtags / lastLocalWriteTs (silent-align heuristics)
//   - doSave / schedSave / flushPendingSave (busy-wait loops)
//   - showConflictModal Promise embedded mid-doSave
//   - merge-modal global _state + mergeInProgress flag
//
// One module, one state, observable via subscribe(). UI components
// (status bar, conflict modal, merge modal, autosave timer, page-nav
// flush) all derive their behaviour from `state.kind`.
//
// Why a state machine and not just promises:
//   - The conflict-resolution flow is INHERENTLY long-lived (waits on
//     human clicks). Promises don't compose well with "resume on user
//     gesture" semantics; an explicit state field does.
//   - Multiple concurrent callers (autosave timer + Ctrl+S + page-nav
//     flush) need to coalesce onto a single in-flight save. A Promise
//     ref + dedupe is enough; we expose `flush()` for that.
//   - The earlier "is this our write?" silent-align in sync-watch.ts
//     existed because the save flow couldn't reliably tell sync-watch
//     "I just wrote etag X". With a single Saver owning the watermark,
//     post-save updates are atomic and the heuristics are unnecessary.

import {
  apiSavePageBlocks,
  apiLoadFileMeta,
  apiLoadBlocksBody,
  serializeBlocks,
} from '../api/pages';
import {
  threeWayMerge,
  resolveConflict as resolveConflictMarker,
  hasUnresolvedConflicts,
  type ConflictHunk,
} from './three-way-merge';
import { blocksToMd, mdToBlocks } from './blocks-md';
import { parseBlocksJson as parseBlocksJsonLib } from '../api/pages';
import { threeWayMergeBlocks } from './three-way-merge-blocks';
import { stampBodyForSave } from './block-stamp';
import { S } from '../state';

/** Stamp the to-save body with the current user + now on blocks whose
 *  content changed vs `baseBody` (D2). Centralised so every save path
 *  records "who last edited each block". No-op-ish when the user id is
 *  unknown (0) — blocks still get `lastAt`, `lastBy:0`. */
function stampForSave(toSaveBody: string, baseBody: string): string {
  const by = S.meta.myUserId || 0;
  return stampBodyForSave(toSaveBody, baseBody, by, Date.now());
}

/** Convert a Saver body (JSON-blocks string) to markdown for the
 *  line-based 3-way merge. The merge UI is line-oriented; running it
 *  on the JSON string would produce nonsense diffs. We round-trip
 *  through markdown which is human-readable and aligned with the
 *  way users think about the document.
 *
 *  Returns the original string if it doesn't parse as JSON-blocks
 *  (= legacy / corrupted) — better to merge garbage than to throw. */
function bodyToMergeText(body: string): string {
  if (!body) return '';
  try {
    const parsed = JSON.parse(body);
    if (Array.isArray(parsed)) return blocksToMd(parsed);
  } catch { /* fall through */ }
  return body;
}

/** Inverse of `bodyToMergeText`. After the user resolves conflicts in
 *  the markdown view, convert back to JSON-blocks for storage. */
function mergeTextToBody(merged: string): string {
  return serializeBlocks(mdToBlocks(merged));
}

/** Codex review #3: prefer block-id 3-way merge when bodies are
 *  JSON-blocks AND there are no real conflicts (= one side changed,
 *  other side didn't, or both made identical edits). The line-based
 *  merge path discards block IDs and converts table/linkdb/ai
 *  placeholder comments back into plain markdown which destroys those
 *  blocks. The block-id path preserves all of that.
 *
 *  Returns null when block merge has unresolved conflicts (= caller
 *  must fall back to the line-based merge UI for user resolution).
 *  Returns the merged JSON-blocks string otherwise. */
function tryBlockMerge(base: string, ours: string, theirs: string): string | null {
  // Sniff: only attempt block merge when ALL inputs look like JSON
  // arrays. Plain markdown / empty strings / legacy data fall through
  // to the line-based merge path. parseBlocksJson silently returns []
  // for non-JSON, which would otherwise produce a false "no conflict"
  // for plain-text inputs.
  const looksJson = (s: string): boolean => {
    const t = (s || '').trim();
    return t === '' || t.startsWith('[');
  };
  if (!looksJson(base) || !looksJson(ours) || !looksJson(theirs)) return null;
  const baseBlocks = parseBlocksJsonLib(base);
  const oursBlocks = parseBlocksJsonLib(ours);
  const theirsBlocks = parseBlocksJsonLib(theirs);
  // Treat all-empty as "nothing to merge" — no point reflecting it.
  if (baseBlocks.length === 0 && oursBlocks.length === 0 && theirsBlocks.length === 0) {
    return null;
  }
  const result = threeWayMergeBlocks(baseBlocks, oursBlocks, theirsBlocks);
  if (result.conflicts.length > 0) return null;
  return serializeBlocks(result.merged);
}

/** Three-way merge for the page title (Codex review #5). When only
 *  one side changed, take that side. When both sides made the same
 *  change, take it. When both diverged, prefer ours (the user's most
 *  recent intent in this session); the remote title is documented in
 *  the conflict bundle for the merge UI to surface if needed. */
function mergeTitle(base: string, ours: string, theirs: string): string {
  if (ours === theirs) return ours;
  if (ours === base) return theirs;       // theirs changed only
  if (theirs === base) return ours;       // ours changed only
  return ours;                             // both changed → keep ours
}

/** Immutable page snapshot at a known SP revision. */
export interface PageSnapshot {
  pageId: string;
  body: string;        // markdown source
  title: string;
  etag: string;
  modified: string;    // ISO date, optional but tracked
}

/** Information captured at the moment a save attempt was rejected. */
export interface ConflictBundle {
  pageId: string;
  ours: { body: string; title: string };
  /** The baseline the user's edits were made against. `modified` is
   *  carried through so the watermark in `S.sync.loadedModified`
   *  doesn't get reset to the empty string when conflict is cancelled
   *  back to dirty (Codex review #8). */
  base: { body: string; etag: string; title: string; modified: string };
  theirs: { body: string; etag: string; modified: string; title: string };
}

/** Saver state — discriminated union. Every transition is explicit. */
export type SaverState =
  /** No page is loaded (initial or after unload). */
  | { kind: 'unloaded' }
  /** Editor mirrors the loaded baseline; nothing to save. */
  | { kind: 'idle';     base: PageSnapshot }
  /** Editor has unsaved changes against `base`. */
  | { kind: 'dirty';    base: PageSnapshot; body: string; title: string }
  /** A save round-trip is in flight against `base.etag`. */
  | { kind: 'saving';   base: PageSnapshot; body: string; title: string }
  /** Save was rejected (SP advanced); user has not yet chosen a strategy. */
  | { kind: 'conflict'; conflict: ConflictBundle }
  /** User opted to merge; tracking per-hunk decisions. */
  | {
      kind: 'merging';
      conflict: ConflictBundle;
      hunks: ConflictHunk[];
      rawMerged: string;
      resolved: Map<number, 'yours' | 'theirs' | 'both'>;
    };

export type SaveOutcome =
  | { ok: true }
  | { ok: false; reason: 'conflict' }
  | { ok: false; reason: 'error'; error: Error }
  | { ok: false; reason: 'noop' };

type Listener = (s: SaverState) => void;

class Saver {
  private _state: SaverState = { kind: 'unloaded' };
  private _listeners = new Set<Listener>();
  private _saveInFlight: Promise<SaveOutcome> | null = null;
  /** Generation counter — incremented on every loadPage / unload so
   *  the running save can detect whether its result is still
   *  applicable to the CURRENT loaded page (Codex review #2). */
  private _generation = 0;

  /** Read the current state. UI components should usually subscribe(). */
  state(): SaverState {
    return this._state;
  }

  /** Subscribe to state transitions. Returns an unsubscribe fn. The
   *  listener is invoked synchronously on registration with the
   *  current state so subscribers don't need a separate initial read. */
  subscribe(fn: Listener): () => void {
    this._listeners.add(fn);
    try {
      fn(this._state);
    } catch {
      /* listener errors must not break other subscribers */
    }
    return () => {
      this._listeners.delete(fn);
    };
  }

  /** True if the saver currently has unsaved changes for the given page. */
  isDirty(pageId?: string): boolean {
    const s = this._state;
    if (s.kind === 'dirty' || s.kind === 'saving') {
      return pageId == null || s.base.pageId === pageId;
    }
    return false;
  }

  /** True if a save is currently in flight (any state where the editor
   *  shouldn't be torn down). */
  isBusy(): boolean {
    const k = this._state.kind;
    return k === 'saving' || k === 'conflict' || k === 'merging';
  }

  // ── Lifecycle ──────────────────────────────────────────────────────

  /** Establish the editor baseline. Called after a successful page load
   *  (apiLoadContentMeta). Any in-flight save Promise is abandoned —
   *  bumping the generation makes the running save's completion path
   *  drop its state mutation when it finally resolves (Codex #2).
   *  Without this, a save started against page A could clobber the
   *  state of page B after the user navigated. */
  loadPage(snapshot: PageSnapshot): void {
    this._generation++;
    this._saveInFlight = null;
    this._set({ kind: 'idle', base: snapshot });
  }

  /** Drop the loaded page entirely. Called on page navigation away,
   *  workspace switch, app close. */
  unload(): void {
    this._generation++;
    this._saveInFlight = null;
    this._set({ kind: 'unloaded' });
  }

  /** Advance the baseline onto a freshly-observed remote version after a
   *  live poll-merge (C). `theirs` is SP's current snapshot; `editorBody`
   *  is what the editor now shows (= the merge of my unsaved edits + the
   *  remote changes). If they match, I have nothing unsaved → idle.
   *  Otherwise stay dirty against the NEW base so my next save uses the
   *  new etag (and merges cleanly). No-op unless a page is loaded for
   *  the same id and no save is mid-flight. */
  rebaseOnto(theirs: PageSnapshot, editorBody: string, editorTitle: string): void {
    const s = this._state;
    if (s.kind !== 'idle' && s.kind !== 'dirty') return;   // don't disturb saving/conflict/merging
    const base = s.kind === 'idle' ? s.base : s.base;
    if (base.pageId !== theirs.pageId) return;
    const newBase: PageSnapshot = {
      pageId: theirs.pageId,
      body: theirs.body,
      title: theirs.title,
      etag: theirs.etag,
      modified: theirs.modified,
    };
    if (editorBody === newBase.body && editorTitle === newBase.title) {
      this._set({ kind: 'idle', base: newBase });
    } else {
      this._set({ kind: 'dirty', base: newBase, body: editorBody, title: editorTitle });
    }
  }

  // ── Editor input ───────────────────────────────────────────────────

  /** The editor reports new content. Saver decides whether this is
   *  actually different from `base` and updates state accordingly.
   *
   *  Call this on every keystroke / structural mutation. It's cheap —
   *  just a string compare and a state transition.
   *
   *  If the user types while a conflict is unresolved, the conflict
   *  bundle is dropped: their new edits are now layered on top of the
   *  ORIGINAL base (the next save will surface a fresh conflict if SP
   *  is still ahead). This matches the user's intuition that "starting
   *  to type means I'm overriding my earlier 'cancel' decision". */
  notifyEdit(body: string, title: string): void {
    const s = this._state;
    switch (s.kind) {
      case 'unloaded':
        return; // no baseline, nothing to compare
      case 'idle':
        if (body === s.base.body && title === s.base.title) return;
        this._set({ kind: 'dirty', base: s.base, body, title });
        return;
      case 'dirty':
        if (body === s.base.body && title === s.base.title) {
          this._set({ kind: 'idle', base: s.base });
        } else {
          this._set({ kind: 'dirty', base: s.base, body, title });
        }
        return;
      case 'saving':
        // Editor changed during in-flight save. We can't roll back the
        // network call, so we record the new content as a fresh dirty
        // layer — when the in-flight save completes, the post-save
        // base mismatches the editor and we re-enter dirty for another
        // round. (This is the "user typed during save" race.)
        this._set({ kind: 'saving', base: s.base, body, title });
        return;
      case 'conflict':
      case 'merging': {
        // User started typing again while a conflict was unresolved.
        // Treat this as an explicit override: drop the conflict bundle,
        // re-enter dirty against the ORIGINAL base. The next save will
        // re-detect SP advancement and surface a fresh conflict if real.
        const c = s.conflict;
        const base: PageSnapshot = {
          pageId: c.pageId,
          body: c.base.body,
          title: c.base.title,
          etag: c.base.etag,
          // Preserve the conflict-time `modified` watermark — this
          // mirrors `cancelConflict` (Codex review #8). Resetting to ''
          // here would zero out `S.sync.loadedModified` via saver-bridge,
          // breaking the foreground poller's "is this our edit?"
          // short-circuit until the next save.
          modified: c.base.modified,
        };
        if (body === base.body && title === base.title) {
          this._set({ kind: 'idle', base });
        } else {
          this._set({ kind: 'dirty', base, body, title });
        }
        return;
      }
    }
  }

  // ── Save ───────────────────────────────────────────────────────────

  /** Attempt to persist the current dirty content to SP. Coalesces
   *  concurrent calls: if a save is already in flight, all callers
   *  receive the same Promise. A no-op (idle / unloaded) returns
   *  immediately with `noop`. */
  save(): Promise<SaveOutcome> {
    if (this._saveInFlight) return this._saveInFlight;
    const s = this._state;
    if (s.kind !== 'dirty') {
      return Promise.resolve({ ok: false, reason: 'noop' });
    }
    return this._runSave(s.base, s.body, s.title);
  }

  private _runSave(
    base: PageSnapshot,
    body: string,
    title: string,
  ): Promise<SaveOutcome> {
    this._set({ kind: 'saving', base, body, title });
    const myGen = this._generation;
    // D2: stamp blocks whose content changed vs the base with the
    // current user + now. The stamped body is what we persist and what
    // becomes the new baseline (so the stamp round-trips); the editor
    // picks it up via the caret-preserving reconcile (A2). The dirty-
    // detection comparisons below still use the unstamped `body`.
    const stampedBody = stampForSave(body, base.body);
    const promise = (async (): Promise<SaveOutcome> => {
      try {
        const result = await apiSavePageBlocks(base.pageId, title, stampedBody, base.etag);
        // Codex review #2: if the user navigated away (loadPage / unload
        // bumped the generation), abandon — don't mutate state for a
        // page that's no longer loaded.
        if (myGen !== this._generation) {
          return result.ok
            ? { ok: true }
            : { ok: false, reason: 'conflict' };
        }
        if (result.ok) {
          // Post-save snapshot — fetch modified for the new baseline.
          const meta = await apiLoadFileMeta(base.pageId).catch(() => null);
          if (myGen !== this._generation) return { ok: true };     // navigated away
          const fresh: PageSnapshot = {
            pageId: base.pageId,
            body: stampedBody,
            title,
            etag: result.etag,
            modified: meta?.modified || base.modified,
          };
          // Only commit the fresh baseline if the editor hasn't kept
          // typing in the meantime. If it has, we're in 'saving' with
          // newer content — diff against the now-stale base and stay
          // dirty so the next save attempt picks up the latest text.
          const cur = this._state;
          if (cur.kind === 'saving' && cur.body === body && cur.title === title) {
            this._set({ kind: 'idle', base: fresh });
          } else if (cur.kind === 'saving') {
            // User typed during save → re-enter dirty against new base.
            this._set({ kind: 'dirty', base: fresh, body: cur.body, title: cur.title });
          }
          return { ok: true };
        }
        // Conflict — fetch theirs and build the conflict bundle.
        // Codex review #4: a synthetic snapshot with empty etag/body
        // would silently disable If-Match on the next save; treat
        // remote-fetch failure as a hard error instead.
        const theirsBody = await apiLoadBlocksBody(base.pageId).catch(() => null);
        const meta = await apiLoadFileMeta(base.pageId).catch(() => null);
        if (theirsBody === null || !meta?.etag) {
          // Couldn't read the remote — preserve user's edits in dirty
          // and surface the error. The autosave scheduler will retry.
          // Codex review #1: use the LATEST state to preserve any typing
          // that happened during the in-flight save.
          const cur1 = this._state;
          const recoverBody = cur1.kind === 'saving' ? cur1.body : body;
          const recoverTitle = cur1.kind === 'saving' ? cur1.title : title;
          this._set({ kind: 'dirty', base, body: recoverBody, title: recoverTitle });
          return { ok: false, reason: 'error', error: new Error('remote-fetch-failed') };
        }
        const theirsTitle = (meta as { title?: string }).title ?? base.title;
        // Codex review #1: preserve typing-during-save in conflict.ours.
        const cur = this._state;
        const oursBody = cur.kind === 'saving' ? cur.body : body;
        const oursTitle = cur.kind === 'saving' ? cur.title : title;
        // Codex review #3: try block-id auto-merge first. If both
        // sides changed in different (non-overlapping) places, this
        // produces a clean merged block list — preserves block IDs
        // and table/linkdb/ai blocks. Save it directly, transition
        // to idle, no conflict UI needed.
        const autoMerged = tryBlockMerge(base.body, oursBody, theirsBody);
        if (autoMerged !== null) {
          const finalTitle = mergeTitle(base.title, oursTitle, theirsTitle);
          // D2: stamp my-changed blocks. theirs' blocks already carry
          // theirs' stamps (read from SP); diffing the merge against
          // `base.body` stamps only the blocks *I* changed.
          const stampedMerged = stampForSave(autoMerged, base.body);
          // Save the auto-merged result with theirs.etag (we know SP's
          // current state; the If-Match should match).
          const reSave = await apiSavePageBlocks(base.pageId, finalTitle, stampedMerged, meta.etag);
          if (myGen !== this._generation) {
            return reSave.ok ? { ok: true } : { ok: false, reason: 'conflict' };
          }
          if (reSave.ok) {
            const m2 = await apiLoadFileMeta(base.pageId).catch(() => null);
            if (myGen !== this._generation) return { ok: true };
            this._set({ kind: 'idle', base: {
              pageId: base.pageId,
              body: stampedMerged,
              title: finalTitle,
              etag: reSave.etag,
              modified: m2?.modified || base.modified,
            } });
            return { ok: true };
          }
          // Re-save raced and failed → fall through to conflict path
          // (reload remote, build bundle).
        }
        const conflict: ConflictBundle = {
          pageId: base.pageId,
          ours: { body: oursBody, title: oursTitle },
          base: {
            body: base.body, etag: base.etag, title: base.title,
            modified: base.modified,
          },
          theirs: {
            body: theirsBody,
            etag: meta.etag,
            modified: meta.modified || '',
            title: theirsTitle,
          },
        };
        this._set({ kind: 'conflict', conflict });
        return { ok: false, reason: 'conflict' };
      } catch (e) {
        // Codex #2: drop state mutations when the page changed during save.
        if (myGen !== this._generation) {
          return { ok: false, reason: 'error', error: e as Error };
        }
        // Restore to dirty so the user can retry; their content is preserved.
        // Codex review #1: use latest state so typing during save isn't lost.
        const cur = this._state;
        const recoverBody = cur.kind === 'saving' ? cur.body : body;
        const recoverTitle = cur.kind === 'saving' ? cur.title : title;
        this._set({ kind: 'dirty', base, body: recoverBody, title: recoverTitle });
        return { ok: false, reason: 'error', error: e as Error };
      } finally {
        // Only clear the in-flight ref if we're still the current op —
        // otherwise we'd null out a *new* save's promise.
        if (myGen === this._generation) this._saveInFlight = null;
      }
    })();
    this._saveInFlight = promise;
    return promise;
  }

  /** Wait for any in-flight save to settle, then save again if the user
   *  typed during the wait. Used by page-navigation and Ctrl+S to make
   *  "make sure my latest text is on SP" robust without a busy loop. */
  async flush(): Promise<void> {
    // First wait for the existing in-flight save (if any).
    if (this._saveInFlight) {
      try {
        await this._saveInFlight;
      } catch {
        /* ignore — error already handled by save()'s catch */
      }
    }
    // If still dirty (user typed during the wait, or the in-flight save
    // hit a conflict), do one more save. We don't loop further: a
    // conflict needs user attention, and "saved → typed → saved" within
    // the same flush is rare enough that one extra round suffices.
    if (this._state.kind === 'dirty') {
      try {
        await this.save();
      } catch {
        /* swallow */
      }
    }
  }

  // ── Conflict resolution ────────────────────────────────────────────

  /** User chose 'overwrite' on the conflict modal — force-save ours
   *  with no etag check. */
  forceOverwrite(): Promise<SaveOutcome> {
    // Codex review #7: coalesce concurrent forceOverwrite calls onto
    // a single Promise so a double-click doesn't race.
    if (this._saveInFlight) return this._saveInFlight;
    const s = this._state;
    if (s.kind !== 'conflict' && s.kind !== 'merging') {
      return Promise.resolve({ ok: false, reason: 'noop' });
    }
    const c = s.conflict;
    const myGen = this._generation;
    // D2: stamp blocks I changed vs the conflict base.
    const stampedOurs = stampForSave(c.ours.body, c.base.body);
    const promise = (async (): Promise<SaveOutcome> => {
      try {
        const result = await apiSavePageBlocks(c.pageId, c.ours.title, stampedOurs /* no expectedEtag */);
        if (myGen !== this._generation) {
          return result.ok ? { ok: true } : { ok: false, reason: 'error', error: new Error('overwrite-failed') };
        }
        if (result.ok) {
          const meta = await apiLoadFileMeta(c.pageId).catch(() => null);
          if (myGen !== this._generation) return { ok: true };
          const fresh: PageSnapshot = {
            pageId: c.pageId,
            body: stampedOurs,
            title: c.ours.title,
            etag: result.etag,
            modified: meta?.modified || '',
          };
          this._set({ kind: 'idle', base: fresh });
          return { ok: true };
        }
        // Force overwrite shouldn't conflict (no If-Match), but defensively
        // surface as error.
        return { ok: false, reason: 'error', error: new Error('overwrite-failed') };
      } catch (e) {
        return { ok: false, reason: 'error', error: e as Error };
      } finally {
        if (myGen === this._generation) this._saveInFlight = null;
      }
    })();
    this._saveInFlight = promise;
    return promise;
  }

  /** User chose 'reload' — throw away local edits, accept SP's version.
   *  Caller is responsible for re-loading the page into the editor;
   *  Saver just transitions to unloaded so the load path can call
   *  loadPage() afresh. */
  acceptTheirs(): void {
    const s = this._state;
    if (s.kind !== 'conflict' && s.kind !== 'merging') return;
    this._saveInFlight = null;
    this._set({ kind: 'unloaded' });
  }

  /** User chose 'cancel' on the conflict modal — keep editing locally.
   *  Saver returns to 'dirty' against the ORIGINAL base. The next
   *  save attempt will surface the conflict again if SP is still ahead.
   *
   *  Earlier code introduced a `conflictPendingId` flag here to
   *  silence subsequent autosaves. We don't need that now: the autosave
   *  scheduler is allowed to fire, save() will detect the conflict via
   *  the etag check, and the conflict modal will surface. The user has
   *  the choice every time, but at most one modal at a time (the saver
   *  state is the source of truth — UI subscribes and shows whatever
   *  the current state demands).
   *
   *  …well, ONE caveat: we don't want autosave to immediately re-fire
   *  the moment the user clicks 「このままにする」. A simple defer is
   *  enough — see the autosave scheduler in `ui/autosave.ts`. */
  cancelConflict(): void {
    const s = this._state;
    if (s.kind !== 'conflict' && s.kind !== 'merging') return;
    const c = s.conflict;
    // Codex review #8: preserve `modified` from the conflict base
    // so the watermark doesn't reset to ''. The watermark drives
    // the foreground sync poller's "is this our write?" detection.
    const base: PageSnapshot = {
      pageId: c.pageId,
      body: c.base.body,
      title: c.base.title,
      etag: c.base.etag,
      modified: c.base.modified,
    };
    // ours might match base → idle; else dirty
    if (c.ours.body === base.body && c.ours.title === base.title) {
      this._set({ kind: 'idle', base });
    } else {
      this._set({ kind: 'dirty', base, body: c.ours.body, title: c.ours.title });
    }
  }

  // ── Merge UI ───────────────────────────────────────────────────────

  /** Enter merge mode — compute the 3-way merge and enter 'merging'.
   *  Phase 2: bodies are JSON-blocks. We round-trip through markdown
   *  for the line-based merge (the merge UI is line-oriented). The
   *  resolved markdown is converted back to JSON-blocks at apply time
   *  (see `applyMerge`). */
  startMerge(): void {
    const s = this._state;
    if (s.kind !== 'conflict') return;
    const c = s.conflict;
    const result = threeWayMerge(
      bodyToMergeText(c.base.body),
      bodyToMergeText(c.ours.body),
      bodyToMergeText(c.theirs.body),
    );
    this._set({
      kind: 'merging',
      conflict: c,
      hunks: result.conflicts,
      rawMerged: result.merged,
      resolved: new Map(),
    });
  }

  /** Update one hunk's resolution choice. Re-emits state so the merge
   *  modal re-renders with the new selection highlighted. */
  setMergeChoice(hunkId: number, choice: 'yours' | 'theirs' | 'both'): void {
    const s = this._state;
    if (s.kind !== 'merging') return;
    const resolved = new Map(s.resolved);
    resolved.set(hunkId, choice);
    this._set({ ...s, resolved });
  }

  /** Compute the merged text given current resolutions (replays each
   *  resolution against the immutable rawMerged). UI calls this to
   *  render the preview (markdown form). */
  computeMergedBody(): string {
    const s = this._state;
    if (s.kind !== 'merging') return '';
    let m = s.rawMerged;
    for (const [id, choice] of s.resolved) {
      m = resolveConflictMarker(m, id, choice);
    }
    return m;
  }

  /** Compute the merged body in storage form (JSON-blocks) for save.
   *  Phase 2: the merge UI works on markdown for readability; we
   *  convert back to blocks at apply time. */
  private computeMergedBodyForSave(): string {
    return mergeTextToBody(this.computeMergedBody());
  }

  /** True if every hunk has a chosen resolution. Used to gate the
   *  「このマージを保存」button. */
  isMergeResolved(): boolean {
    const s = this._state;
    if (s.kind !== 'merging') return false;
    if (s.hunks.length === 0) return true;        // auto-merged
    if (s.resolved.size < s.hunks.length) return false;
    // Defensive: also confirm the rendered text has no markers
    return !hasUnresolvedConflicts(this.computeMergedBody());
  }

  /** Apply the merged result and save it. */
  applyMerge(): Promise<SaveOutcome> {
    // Codex review #7: coalesce concurrent applyMerge calls.
    if (this._saveInFlight) return this._saveInFlight;
    const s = this._state;
    if (s.kind !== 'merging') {
      return Promise.resolve({ ok: false, reason: 'noop' });
    }
    if (!this.isMergeResolved()) {
      return Promise.resolve({ ok: false, reason: 'error', error: new Error('未解決の競合があります') });
    }
    const finalBody = this.computeMergedBodyForSave();
    const c = s.conflict;
    // Codex review #5: apply title 3-way merge — auto-resolve when
    // only one side changed, fall back to ours when both did. Without
    // this, choosing "merge" silently discards the remote's title-only
    // edit.
    const finalTitle = mergeTitle(c.base.title, c.ours.title, c.theirs.title);
    // D2: stamp blocks changed vs the conflict base.
    const stampedFinal = stampForSave(finalBody, c.base.body);
    const myGen = this._generation;
    const promise = (async (): Promise<SaveOutcome> => {
      try {
        // If-Match against theirs.etag — we read it at conflict time;
        // if SP advanced AGAIN during the merge UI, surface a new
        // conflict so the user can decide whether to re-merge.
        const result = await apiSavePageBlocks(
          c.pageId,
          finalTitle,
          stampedFinal,
          c.theirs.etag,
        );
        if (myGen !== this._generation) {
          return result.ok ? { ok: true } : { ok: false, reason: 'conflict' };
        }
        if (result.ok) {
          const meta = await apiLoadFileMeta(c.pageId).catch(() => null);
          if (myGen !== this._generation) return { ok: true };
          const fresh: PageSnapshot = {
            pageId: c.pageId,
            body: stampedFinal,
            title: finalTitle,
            etag: result.etag,
            modified: meta?.modified || '',
          };
          this._set({ kind: 'idle', base: fresh });
          return { ok: true };
        }
        // SP advanced again during the merge UI. Re-fetch and re-enter
        // conflict so the user can decide. Codex review #4: bail out
        // hard when the re-fetch fails — synthetic empty etag/body
        // would let the next save silently overwrite.
        const newTheirsBody = await apiLoadBlocksBody(c.pageId).catch(() => null);
        const newMeta = await apiLoadFileMeta(c.pageId).catch(() => null);
        if (newTheirsBody === null || !newMeta?.etag) {
          return { ok: false, reason: 'error', error: new Error('remote-fetch-failed') };
        }
        if (myGen !== this._generation) return { ok: false, reason: 'conflict' };
        const newConflict: ConflictBundle = {
          pageId: c.pageId,
          ours: { body: finalBody, title: finalTitle },
          // c.theirs is what we thought was current — promote it as
          // the new base. Carry its modified timestamp through.
          base: {
            body: c.theirs.body, etag: c.theirs.etag,
            title: c.theirs.title, modified: c.theirs.modified,
          },
          theirs: {
            body: newTheirsBody,
            etag: newMeta.etag,
            modified: newMeta.modified || '',
            // Codex review #5: read theirs.title properly; don't
            // assume our title is theirs.
            title: (newMeta as { title?: string }).title ?? c.theirs.title,
          },
        };
        this._set({ kind: 'conflict', conflict: newConflict });
        return { ok: false, reason: 'conflict' };
      } catch (e) {
        return { ok: false, reason: 'error', error: e as Error };
      } finally {
        if (myGen === this._generation) this._saveInFlight = null;
      }
    })();
    this._saveInFlight = promise;
    return promise;
  }

  /** Back-out from merging → conflict (user clicked 「キャンセル」 in
   *  the merge UI but wants to choose a different strategy). */
  cancelMerge(): void {
    const s = this._state;
    if (s.kind !== 'merging') return;
    this._set({ kind: 'conflict', conflict: s.conflict });
  }

  /** Inject a merge from an external source (= a saved draft picked
   *  out of the drafts list). Fetches SP's current body itself for the
   *  theirs side, computes the 3-way merge, and transitions directly
   *  to 'merging' (skipping the conflict modal — the user already
   *  chose to merge by clicking the draft's button).
   *
   *  Used by drafts-modal.ts. The Saver's loaded baseline (if any) is
   *  irrelevant here; this is a one-shot operation that doesn't touch
   *  the editor's loaded snapshot. */
  async beginExternalMerge(opts: {
    pageId: string;
    pageTitle: string;
    title: string;
    ourBody: string;
    baseBody: string;
    baseEtag: string;
  }): Promise<void> {
    // Codex review #4: don't synthesise an empty-etag snapshot —
    // surface a clear error if SP can't be read.
    const theirsBody = await apiLoadBlocksBody(opts.pageId).catch(() => null);
    const meta = await apiLoadFileMeta(opts.pageId).catch(() => null);
    if (theirsBody === null || !meta?.etag) {
      throw new Error('beginExternalMerge: remote-fetch-failed');
    }
    const conflict: ConflictBundle = {
      pageId: opts.pageId,
      ours: { body: opts.ourBody, title: opts.title },
      base: {
        body: opts.baseBody, etag: opts.baseEtag,
        title: opts.title, modified: '',
      },
      theirs: {
        body: theirsBody,
        etag: meta.etag,
        modified: meta.modified || '',
        title: opts.pageTitle,
      },
    };
    // Codex review #6: `||` treats an empty-string baseBody as
    // "unspecified" and falls back to theirs — which destroys 3-way
    // merge for pages that genuinely started empty. Use `??` so only
    // null/undefined trigger the fallback.
    const baseForMerge = (opts.baseBody ?? theirsBody);
    const result = threeWayMerge(
      bodyToMergeText(baseForMerge),
      bodyToMergeText(opts.ourBody),
      bodyToMergeText(theirsBody),
    );
    this._set({
      kind: 'merging',
      conflict,
      hunks: result.conflicts,
      rawMerged: result.merged,
      resolved: new Map(),
    });
  }

  // ── Internals ──────────────────────────────────────────────────────

  private _set(s: SaverState): void {
    this._state = s;
    for (const fn of this._listeners) {
      try {
        fn(s);
      } catch {
        /* never let one listener break others */
      }
    }
  }
}

/** Singleton — one Saver per app instance. */
export const saver = new Saver();
