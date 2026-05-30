// Saver state-machine tests. The state transitions must be exact so that
// every UI subscriber (status bar, conflict modal, merge modal, autosave
// scheduler, page-nav flush) can trust the kind discriminator.
//
// We mock the `api/pages` module — the Saver doesn't care about actual
// SharePoint, only the contract: apiSavePageBlocks returns ok/conflict;
// apiLoadFileMeta returns metadata; apiLoadBlocksBody returns the body.
//
// Phase 2: the Saver's body string is JSON-blocks, but for these tests
// we treat it as opaque (string compare for dirty / save mocks). The
// content semantics (markdown, JSON, anything) don't affect the state
// machine — only equality and the SP API surface do.

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the api/pages module before importing the Saver, so the Saver
// picks up the mocked exports.
const apiSavePageBlocks = vi.fn();
const apiLoadFileMeta = vi.fn();
const apiLoadBlocksBody = vi.fn();

vi.mock('../src/api/pages', () => ({
  apiSavePageBlocks: (...a: unknown[]) => apiSavePageBlocks(...a),
  apiLoadFileMeta: (...a: unknown[]) => apiLoadFileMeta(...a),
  apiLoadBlocksBody: (...a: unknown[]) => apiLoadBlocksBody(...a),
  // serializeBlocks is used by Saver — passes a Block[] through. For
  // tests we don't need real serialization since bodies are strings.
  serializeBlocks: (b: unknown) => JSON.stringify(b),
  // parseBlocksJson is consulted by tryBlockMerge; treat any
  // non-JSON-array input as empty so the line-merge fallback runs
  // (these tests use plain-string bodies, not JSON-blocks).
  parseBlocksJson: (json: unknown): unknown[] => {
    if (typeof json !== 'string' || !json.trim().startsWith('[')) return [];
    try {
      const v = JSON.parse(json);
      return Array.isArray(v) ? v : [];
    } catch { return []; }
  },
}));

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type SaverModule = typeof import('../src/lib/saver');
let mod: SaverModule;

beforeEach(async () => {
  vi.resetModules();
  apiSavePageBlocks.mockReset();
  apiLoadFileMeta.mockReset();
  apiLoadBlocksBody.mockReset();
  apiLoadFileMeta.mockResolvedValue({ etag: 'E?', modified: '2026-01-01T00:00:00Z' });
  apiLoadBlocksBody.mockResolvedValue('');
  mod = await import('../src/lib/saver');
});

const SNAP = (over: Partial<import('../src/lib/saver').PageSnapshot> = {}) => ({
  pageId: '1',
  body: 'hello',
  title: 'Page',
  etag: 'E0',
  modified: '2026-01-01T00:00:00Z',
  ...over,
});

describe('Saver — lifecycle', () => {
  it('starts in unloaded', () => {
    expect(mod.saver.state().kind).toBe('unloaded');
  });

  it('loadPage transitions to idle with the given snapshot', () => {
    mod.saver.loadPage(SNAP());
    const s = mod.saver.state();
    expect(s.kind).toBe('idle');
    if (s.kind === 'idle') expect(s.base.etag).toBe('E0');
  });

  it('unload returns to unloaded', () => {
    mod.saver.loadPage(SNAP());
    mod.saver.unload();
    expect(mod.saver.state().kind).toBe('unloaded');
  });

  it('subscribe receives the current state immediately', () => {
    const seen: string[] = [];
    mod.saver.subscribe((s) => seen.push(s.kind));
    expect(seen).toEqual(['unloaded']);
    mod.saver.loadPage(SNAP());
    expect(seen).toEqual(['unloaded', 'idle']);
  });

  it('subscribe returns an unsubscribe fn that stops further notifications', () => {
    const seen: string[] = [];
    const off = mod.saver.subscribe((s) => seen.push(s.kind));
    off();
    mod.saver.loadPage(SNAP());
    expect(seen).toEqual(['unloaded']);
  });
});

describe('Saver — edit', () => {
  beforeEach(() => mod.saver.loadPage(SNAP()));

  it('idle → idle if body and title unchanged', () => {
    mod.saver.notifyEdit('hello', 'Page');
    expect(mod.saver.state().kind).toBe('idle');
  });

  it('idle → dirty when body diverges from base', () => {
    mod.saver.notifyEdit('hello world', 'Page');
    const s = mod.saver.state();
    expect(s.kind).toBe('dirty');
    if (s.kind === 'dirty') expect(s.body).toBe('hello world');
  });

  it('idle → dirty when title diverges', () => {
    mod.saver.notifyEdit('hello', 'New Title');
    expect(mod.saver.state().kind).toBe('dirty');
  });

  it('stays idle when only per-block stamps differ (D2 — no spurious dirty)', () => {
    // base body carries lastBy/lastAt (as after a save); the editor
    // re-reports the same content WITHOUT stamps. This must NOT be
    // treated as an edit (else: spurious 未保存→保存中 cycling).
    const stamped = '[{"id":"b1","kind":"p","inline":[{"kind":"text","text":"x"}],"lastBy":7,"lastAt":99}]';
    const unstamped = '[{"id":"b1","kind":"p","inline":[{"kind":"text","text":"x"}]}]';
    mod.saver.loadPage(SNAP({ body: stamped }));
    mod.saver.notifyEdit(unstamped, 'Page');
    expect(mod.saver.state().kind).toBe('idle');
    // a genuine content change is still detected
    mod.saver.notifyEdit('[{"id":"b1","kind":"p","inline":[{"kind":"text","text":"y"}]}]', 'Page');
    expect(mod.saver.state().kind).toBe('dirty');
  });

  it('dirty → idle when user undoes back to base', () => {
    mod.saver.notifyEdit('hello world', 'Page');
    mod.saver.notifyEdit('hello', 'Page');
    expect(mod.saver.state().kind).toBe('idle');
  });

  it('dirty → dirty with updated body', () => {
    mod.saver.notifyEdit('A', 'Page');
    mod.saver.notifyEdit('B', 'Page');
    const s = mod.saver.state();
    if (s.kind === 'dirty') expect(s.body).toBe('B');
    else throw new Error('expected dirty');
  });

  it('unloaded ignores edits', () => {
    mod.saver.unload();
    mod.saver.notifyEdit('A', 'B');
    expect(mod.saver.state().kind).toBe('unloaded');
  });
});

describe('Saver — save (happy path)', () => {
  beforeEach(() => mod.saver.loadPage(SNAP()));

  it('idle save returns noop', async () => {
    const r = await mod.saver.save();
    expect(r).toEqual({ ok: false, reason: 'noop' });
  });

  it('dirty save transitions saving → idle on success', async () => {
    mod.saver.notifyEdit('hello world', 'Page');
    apiSavePageBlocks.mockResolvedValueOnce({ ok: true, etag: 'E1' });
    apiLoadFileMeta.mockResolvedValueOnce({ etag: 'E1', modified: '2026-01-02T00:00:00Z' });
    const seen: string[] = [];
    mod.saver.subscribe((s) => seen.push(s.kind));
    const r = await mod.saver.save();
    expect(r).toEqual({ ok: true });
    expect(seen).toContain('saving');
    expect(seen[seen.length - 1]).toBe('idle');
    const s = mod.saver.state();
    if (s.kind === 'idle') {
      expect(s.base.etag).toBe('E1');
      expect(s.base.body).toBe('hello world');
    }
  });

  it('passes the loaded etag as If-Match', async () => {
    mod.saver.notifyEdit('changed', 'Page');
    apiSavePageBlocks.mockResolvedValueOnce({ ok: true, etag: 'E1' });
    await mod.saver.save();
    expect(apiSavePageBlocks).toHaveBeenCalledWith('1', 'Page', 'changed', 'E0');
  });

  it('coalesces concurrent save calls onto one Promise', async () => {
    mod.saver.notifyEdit('changed', 'Page');
    apiSavePageBlocks.mockResolvedValueOnce({ ok: true, etag: 'E1' });
    const p1 = mod.saver.save();
    const p2 = mod.saver.save();
    expect(p1).toBe(p2);
    await p1;
    expect(apiSavePageBlocks).toHaveBeenCalledTimes(1);
  });
});

describe('Saver — save (conflict)', () => {
  beforeEach(() => mod.saver.loadPage(SNAP()));

  it('save → conflict when SP rejects', async () => {
    mod.saver.notifyEdit('mine', 'Page');
    apiSavePageBlocks.mockResolvedValueOnce({ ok: false, reason: 'conflict' });
    apiLoadBlocksBody.mockResolvedValueOnce('theirs');
    apiLoadFileMeta.mockResolvedValueOnce({ etag: 'E2', modified: '2026-01-02T00:00:00Z' });
    const r = await mod.saver.save();
    expect(r).toEqual({ ok: false, reason: 'conflict' });
    const s = mod.saver.state();
    expect(s.kind).toBe('conflict');
    if (s.kind === 'conflict') {
      expect(s.conflict.ours.body).toBe('mine');
      expect(s.conflict.theirs.body).toBe('theirs');
      expect(s.conflict.base.body).toBe('hello');
    }
  });

  it('save → dirty (preserved) on network error', async () => {
    mod.saver.notifyEdit('mine', 'Page');
    apiSavePageBlocks.mockRejectedValueOnce(new Error('boom'));
    const r = await mod.saver.save();
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe('error');
    const s = mod.saver.state();
    expect(s.kind).toBe('dirty');
    if (s.kind === 'dirty') expect(s.body).toBe('mine');
  });

  it('cancelConflict returns to dirty (no auto-retry)', async () => {
    mod.saver.notifyEdit('mine', 'Page');
    apiSavePageBlocks.mockResolvedValueOnce({ ok: false, reason: 'conflict' });
    apiLoadBlocksBody.mockResolvedValueOnce('theirs');
    await mod.saver.save();
    mod.saver.cancelConflict();
    const s = mod.saver.state();
    expect(s.kind).toBe('dirty');
    if (s.kind === 'dirty') {
      expect(s.body).toBe('mine');
      expect(s.base.etag).toBe('E0');     // original baseline preserved
    }
  });

  it('typing during conflict drops the bundle and returns to dirty', async () => {
    mod.saver.notifyEdit('mine', 'Page');
    apiSavePageBlocks.mockResolvedValueOnce({ ok: false, reason: 'conflict' });
    apiLoadBlocksBody.mockResolvedValueOnce('theirs');
    await mod.saver.save();
    expect(mod.saver.state().kind).toBe('conflict');
    mod.saver.notifyEdit('mine-edited', 'Page');
    const s = mod.saver.state();
    expect(s.kind).toBe('dirty');
    if (s.kind === 'dirty') {
      expect(s.body).toBe('mine-edited');
      expect(s.base.etag).toBe('E0');     // still against original
    }
  });

  it('forceOverwrite saves without etag and returns to idle', async () => {
    mod.saver.notifyEdit('mine', 'Page');
    apiSavePageBlocks.mockResolvedValueOnce({ ok: false, reason: 'conflict' });
    apiLoadBlocksBody.mockResolvedValueOnce('theirs');
    await mod.saver.save();
    apiSavePageBlocks.mockResolvedValueOnce({ ok: true, etag: 'E3' });
    apiLoadFileMeta.mockResolvedValueOnce({ etag: 'E3', modified: '2026-01-03T00:00:00Z' });
    const r = await mod.saver.forceOverwrite();
    expect(r.ok).toBe(true);
    // forceOverwrite passes undefined for the etag arg
    const lastCall = apiSavePageBlocks.mock.calls[1];
    expect(lastCall[3]).toBeUndefined();
    expect(mod.saver.state().kind).toBe('idle');
  });

  it('acceptTheirs transitions to unloaded (caller reloads)', async () => {
    mod.saver.notifyEdit('mine', 'Page');
    apiSavePageBlocks.mockResolvedValueOnce({ ok: false, reason: 'conflict' });
    apiLoadBlocksBody.mockResolvedValueOnce('theirs');
    await mod.saver.save();
    mod.saver.acceptTheirs();
    expect(mod.saver.state().kind).toBe('unloaded');
  });
});

describe('Saver — merge', () => {
  beforeEach(() => mod.saver.loadPage(SNAP({ body: 'a\nb\nc' })));

  async function enterConflict(ours: string, theirs: string): Promise<void> {
    mod.saver.notifyEdit(ours, 'Page');
    apiSavePageBlocks.mockResolvedValueOnce({ ok: false, reason: 'conflict' });
    apiLoadBlocksBody.mockResolvedValueOnce(theirs);
    apiLoadFileMeta.mockResolvedValueOnce({ etag: 'E2', modified: '2026-01-02T00:00:00Z' });
    await mod.saver.save();
  }

  it('startMerge transitions conflict → merging with hunks', async () => {
    await enterConflict('a\nb-mine\nc', 'a\nb-theirs\nc');
    mod.saver.startMerge();
    const s = mod.saver.state();
    expect(s.kind).toBe('merging');
    if (s.kind === 'merging') expect(s.hunks.length).toBe(1);
  });

  it('cancelMerge returns to conflict', async () => {
    await enterConflict('a\nb-mine\nc', 'a\nb-theirs\nc');
    mod.saver.startMerge();
    mod.saver.cancelMerge();
    expect(mod.saver.state().kind).toBe('conflict');
  });

  it('setMergeChoice updates resolved map and emits state', async () => {
    await enterConflict('a\nb-mine\nc', 'a\nb-theirs\nc');
    mod.saver.startMerge();
    mod.saver.setMergeChoice(0, 'yours');
    const s = mod.saver.state();
    if (s.kind === 'merging') {
      expect(s.resolved.get(0)).toBe('yours');
    } else throw new Error('expected merging');
  });

  it('isMergeResolved is false until every hunk is decided', async () => {
    await enterConflict('a\nb-mine\nc', 'a\nb-theirs\nc');
    mod.saver.startMerge();
    expect(mod.saver.isMergeResolved()).toBe(false);
    mod.saver.setMergeChoice(0, 'theirs');
    expect(mod.saver.isMergeResolved()).toBe(true);
  });

  it('isMergeResolved is true immediately when no conflicts (auto-merged)', async () => {
    // both sides edited DIFFERENT lines → auto-merged, no hunks
    await enterConflict('a-mine\nb\nc', 'a\nb\nc-theirs');
    mod.saver.startMerge();
    expect(mod.saver.isMergeResolved()).toBe(true);
  });

  it('applyMerge saves merged body with theirs-etag and goes to idle', async () => {
    await enterConflict('a\nb-mine\nc', 'a\nb-theirs\nc');
    mod.saver.startMerge();
    mod.saver.setMergeChoice(0, 'theirs');
    apiSavePageBlocks.mockResolvedValueOnce({ ok: true, etag: 'E3' });
    apiLoadFileMeta.mockResolvedValueOnce({ etag: 'E3', modified: '2026-01-03T00:00:00Z' });
    const r = await mod.saver.applyMerge();
    expect(r.ok).toBe(true);
    // Phase 2: applyMerge serializes the resolved markdown back to
    // JSON-blocks for save. The merged text 'a\nb-theirs\nc' becomes
    // a single-paragraph block after parsing.
    const lastCall = apiSavePageBlocks.mock.calls[apiSavePageBlocks.mock.calls.length - 1];
    expect(lastCall[0]).toBe('1');
    expect(lastCall[1]).toBe('Page');
    expect(lastCall[3]).toBe('E2');
    // Body is JSON-blocks containing the merged text
    const blocks = JSON.parse(lastCall[2] as string);
    expect(Array.isArray(blocks)).toBe(true);
    expect(blocks[0].kind).toBe('p');
    expect(blocks[0].inline[0].text).toBe('a\nb-theirs\nc');
    expect(mod.saver.state().kind).toBe('idle');
  });

  it('applyMerge surfaces a fresh conflict if SP advanced again', async () => {
    await enterConflict('a\nb-mine\nc', 'a\nb-theirs\nc');
    mod.saver.startMerge();
    mod.saver.setMergeChoice(0, 'yours');
    // SP advanced again during the merge UI
    apiSavePageBlocks.mockResolvedValueOnce({ ok: false, reason: 'conflict' });
    apiLoadBlocksBody.mockResolvedValueOnce('a\nb-newest\nc');
    apiLoadFileMeta.mockResolvedValueOnce({ etag: 'E4', modified: '2026-01-04T00:00:00Z' });
    const r = await mod.saver.applyMerge();
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe('conflict');
    expect(mod.saver.state().kind).toBe('conflict');
  });
});

describe('Saver — flush', () => {
  beforeEach(() => mod.saver.loadPage(SNAP()));

  it('returns immediately when idle', async () => {
    await mod.saver.flush();
    expect(apiSavePageBlocks).not.toHaveBeenCalled();
  });

  it('saves when dirty', async () => {
    mod.saver.notifyEdit('changed', 'Page');
    apiSavePageBlocks.mockResolvedValueOnce({ ok: true, etag: 'E1' });
    await mod.saver.flush();
    expect(apiSavePageBlocks).toHaveBeenCalledTimes(1);
    expect(mod.saver.state().kind).toBe('idle');
  });

  it('does NOT loop after a conflict (avoids the modal-multiplication bug)', async () => {
    mod.saver.notifyEdit('mine', 'Page');
    apiSavePageBlocks.mockResolvedValueOnce({ ok: false, reason: 'conflict' });
    apiLoadBlocksBody.mockResolvedValueOnce('theirs');
    await mod.saver.flush();
    // After conflict, state is 'conflict' — flush should NOT call save again.
    expect(apiSavePageBlocks).toHaveBeenCalledTimes(1);
    expect(mod.saver.state().kind).toBe('conflict');
  });
});

describe('Saver — typing during in-flight save', () => {
  beforeEach(() => mod.saver.loadPage(SNAP()));

  it('keeps the new content as dirty after the in-flight save returns', async () => {
    mod.saver.notifyEdit('first', 'Page');
    let resolveSave: (v: { ok: true; etag: string }) => void = () => undefined;
    apiSavePageBlocks.mockReturnValueOnce(new Promise((res) => { resolveSave = res; }));
    apiLoadFileMeta.mockResolvedValueOnce({ etag: 'E1', modified: '2026-01-02T00:00:00Z' });
    const savePromise = mod.saver.save();
    expect(mod.saver.state().kind).toBe('saving');
    // User keeps typing during the save round-trip
    mod.saver.notifyEdit('first-then-second', 'Page');
    expect(mod.saver.state().kind).toBe('saving');     // still saving
    resolveSave({ ok: true, etag: 'E1' });
    await savePromise;
    // Now the save is done; we should be dirty against the new base (E1)
    const s = mod.saver.state();
    expect(s.kind).toBe('dirty');
    if (s.kind === 'dirty') {
      expect(s.body).toBe('first-then-second');
      expect(s.base.etag).toBe('E1');                  // base advanced
    }
  });
});
