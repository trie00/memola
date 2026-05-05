// Save flow controllers. Thin shims over the Saver state machine
// (`src/lib/saver.ts`) — they pull the current editor content into the
// Saver and trigger save / flush operations. The Saver, autosave
// scheduler, status bar bridge, conflict modal and merge modal are
// all wired together via subscriptions; nothing else has to know about
// state transitions.
//
// Public API:
//   - `schedSave()`       editor mutation hook (flips Saver to 'dirty')
//   - `doSave()`          immediate save (Cmd/Ctrl+S, etc)
//   - `flushPendingSave()` synchronous-ish flush (page nav, app close)
//   - `clearSaveTimer()`  cancel pending autosave (close path)
//
// Row-page saves take a separate code path (`row-page.saveCurrentRow`)
// because DB rows aren't yet migrated to the Saver. The doSave wrapper
// here delegates when `S.currentRow` is set.

import { S } from '../state';
import { g, getEd } from './dom';
import { saver } from '../lib/saver';
import { cancelAutosave } from '../lib/autosave';
import { htmlToBlocks } from '../lib/blocks-html';
import { assignStableBlockIds } from '../lib/blocks-stable-ids';
import { parseBlocksJson, serializeBlocks } from '../api/pages';
import { isEditor2Enabled, syncEditor2IntoSaver } from './editor2/editor2-bridge';

/** Pull the editor's current content (HTML → markdown + title) and
 *  push it to the Saver. Called from every editor mutation site via
 *  `schedSave()` and from the keyboard `Ctrl+S` / page-nav flush.
 *
 *  This is the only bridge between "the editor's DOM" and "the
 *  Saver's view of pending changes". Everywhere else, the source of
 *  truth is `saver.state()`. */
function syncEditorIntoSaver(): void {
  if (!S.currentId) return;
  if (S.currentType === 'database') return;
  if (S.currentRow) return;     // row-pages have their own save path
  const te = g('ttl') as HTMLTextAreaElement | null;
  const ed = getEd();
  if (!te || !ed) return;
  const title = te.value.trim() || '無題';
  // Phase 2c: when editor2 owns the DOM, pull blocks from its state
  // directly (no htmlToBlocks parse — the state IS the blocks).
  if (isEditor2Enabled()) {
    syncEditor2IntoSaver(title);
    return;
  }
  // Phase 2 (legacy editor path): Saver body = JSON-serialized
  // Block[]. Walk the editor DOM into blocks, then stabilize block
  // IDs against the previously saved blocks so block-id 3-way merge
  // sees "edited block X" instead of "deleted X, inserted Y".
  const newBlocks = htmlToBlocks(ed.innerHTML);
  const baseJson = saver.state().kind === 'unloaded' ? '' :
    (saver.state() as { base?: { body: string } }).base?.body || '';
  const baseBlocks = parseBlocksJson(baseJson);
  const stable = assignStableBlockIds(baseBlocks, newBlocks);
  const body = serializeBlocks(stable);
  saver.notifyEdit(body, title);
}

/** Trigger a save attempt against the current editor content. The
 *  Saver state machine handles the full lifecycle (dirty → saving →
 *  idle / conflict). UI subscribers (status bar, conflict modal,
 *  merge modal) react automatically. */
export async function doSave(): Promise<void> {
  // DB-row pages still have their own bespoke save path (not yet
  // migrated to the Saver). Delegate.
  if (S.currentRow && S.dirty && !S.saving) {
    S.saving = true;
    try {
      const m = await import('./row-page');
      await m.saveCurrentRow();
    } finally { S.saving = false; }
    return;
  }
  if (!S.currentId || S.currentType === 'database') return;
  syncEditorIntoSaver();
  await saver.save();
}

/** Editor-input hook — debounced autosave. Pulls the current editor
 *  content into the Saver (which transitions to 'dirty'); the autosave
 *  scheduler arms a timer to call `saver.save()`. */
export function schedSave(): void {
  if (!S.currentId || S.currentType === 'database') return;
  if (S.currentRow) {
    // Row-pages still use the legacy dirty/saving markers
    // (saveCurrentRow is invoked from doSave above).
    return;
  }
  syncEditorIntoSaver();
}

/** Cancel any pending autosave timer. Used by close / nav teardown. */
export function clearSaveTimer(): void {
  cancelAutosave();
}

/** Robust "save right now and don't lose anything" flush. Used by:
 *  - page navigation (`doSelect` calls this before swapping the editor DOM)
 *  - manual save (Ctrl/Cmd+S)
 *  - app close / bookmarklet teardown
 *
 *  The Saver's `flush()` waits for any in-flight save and triggers a
 *  follow-up if the user typed during the round-trip. It does NOT
 *  retry after a conflict — the user must resolve it explicitly. */
export async function flushPendingSave(): Promise<void> {
  syncEditorIntoSaver();
  await saver.flush();
}
