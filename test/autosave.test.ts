// Autosave scheduler tests — validates the timer arm/cancel behaviour
// driven by Saver state transitions.
//
// Uses fake timers so we can assert "no save fires after T ms" without
// real waits.

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const apiSavePageBlocks = vi.fn();
const apiLoadFileMeta = vi.fn();
const apiLoadBlocksBody = vi.fn();
const prefGet = vi.fn();

vi.mock('../src/api/pages', () => ({
  apiSavePageBlocks: (...a: unknown[]) => apiSavePageBlocks(...a),
  apiLoadFileMeta: (...a: unknown[]) => apiLoadFileMeta(...a),
  apiLoadBlocksBody: (...a: unknown[]) => apiLoadBlocksBody(...a),
  serializeBlocks: (b: unknown) => JSON.stringify(b),
  parseBlocksJson: (json: unknown): unknown[] => {
    if (typeof json !== 'string' || !json.trim().startsWith('[')) return [];
    try {
      const v = JSON.parse(json);
      return Array.isArray(v) ? v : [];
    } catch { return []; }
  },
}));

vi.mock('../src/lib/prefs', () => ({
  prefSaveDelayMs: { get: () => prefGet() },
}));

let mod: typeof import('../src/lib/saver');
let autosave: typeof import('../src/lib/autosave');

beforeEach(async () => {
  vi.useFakeTimers();
  vi.resetModules();
  apiSavePageBlocks.mockReset();
  apiLoadFileMeta.mockReset();
  apiLoadBlocksBody.mockReset();
  prefGet.mockReset();
  prefGet.mockReturnValue('2000');     // default 2s delay
  apiLoadFileMeta.mockResolvedValue({ etag: 'E?', modified: '2026-01-01T00:00:00Z' });
  apiLoadBlocksBody.mockResolvedValue('');
  mod = await import('../src/lib/saver');
  autosave = await import('../src/lib/autosave');
  autosave.attachAutosaveScheduler();
});

afterEach(() => {
  vi.useRealTimers();
});

const SNAP = (over: Partial<import('../src/lib/saver').PageSnapshot> = {}) => ({
  pageId: '1',
  body: 'hello',
  title: 'Page',
  etag: 'E0',
  modified: '2026-01-01T00:00:00Z',
  ...over,
});

describe('autosave scheduler', () => {
  it('arms a timer on dirty → fires save after delay', async () => {
    mod.saver.loadPage(SNAP());
    apiSavePageBlocks.mockResolvedValueOnce({ ok: true, etag: 'E1' });
    mod.saver.notifyEdit('changed', 'Page');
    expect(apiSavePageBlocks).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(2000);
    expect(apiSavePageBlocks).toHaveBeenCalledTimes(1);
  });

  it('cancels timer on idle (user undoes)', async () => {
    mod.saver.loadPage(SNAP());
    mod.saver.notifyEdit('changed', 'Page');
    mod.saver.notifyEdit('hello', 'Page');     // back to base = idle
    await vi.advanceTimersByTimeAsync(5000);
    expect(apiSavePageBlocks).not.toHaveBeenCalled();
  });

  it('cancels timer on conflict (no autosave loops)', async () => {
    mod.saver.loadPage(SNAP());
    mod.saver.notifyEdit('mine', 'Page');
    apiSavePageBlocks.mockResolvedValueOnce({ ok: false, reason: 'conflict' });
    apiLoadBlocksBody.mockResolvedValueOnce('theirs');
    await mod.saver.save();
    // Now in conflict — autosave should NOT fire
    apiSavePageBlocks.mockClear();
    await vi.advanceTimersByTimeAsync(10_000);
    expect(apiSavePageBlocks).not.toHaveBeenCalled();
  });

  it('manual-only mode (delay=0) suppresses autosave', async () => {
    prefGet.mockReturnValue('0');
    mod.saver.loadPage(SNAP());
    mod.saver.notifyEdit('changed', 'Page');
    await vi.advanceTimersByTimeAsync(10_000);
    expect(apiSavePageBlocks).not.toHaveBeenCalled();
  });

  it('cancelAutosave clears a pending timer', async () => {
    mod.saver.loadPage(SNAP());
    mod.saver.notifyEdit('changed', 'Page');
    autosave.cancelAutosave();
    await vi.advanceTimersByTimeAsync(5000);
    expect(apiSavePageBlocks).not.toHaveBeenCalled();
  });

  it('successive edits debounce — only one save per quiet period', async () => {
    mod.saver.loadPage(SNAP());
    apiSavePageBlocks.mockResolvedValueOnce({ ok: true, etag: 'E1' });
    mod.saver.notifyEdit('a', 'Page');
    await vi.advanceTimersByTimeAsync(1000);
    mod.saver.notifyEdit('ab', 'Page');         // resets timer
    await vi.advanceTimersByTimeAsync(1000);
    mod.saver.notifyEdit('abc', 'Page');        // resets again
    await vi.advanceTimersByTimeAsync(1000);
    // 3s elapsed total but timer keeps resetting; no save yet
    expect(apiSavePageBlocks).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(2000);    // now full quiet window
    expect(apiSavePageBlocks).toHaveBeenCalledTimes(1);
    // The save body should be the LATEST text
    expect(apiSavePageBlocks.mock.calls[0][2]).toBe('abc');
  });

  it('stays armed when typing during merge would re-enter dirty', async () => {
    // Simulate: user typed → conflict → merge UI → cancel → keeps typing
    mod.saver.loadPage(SNAP());
    mod.saver.notifyEdit('mine', 'Page');
    apiSavePageBlocks.mockResolvedValueOnce({ ok: false, reason: 'conflict' });
    apiLoadBlocksBody.mockResolvedValueOnce('theirs');
    await mod.saver.save();
    // In conflict — type more (transitions back to dirty against base)
    mod.saver.notifyEdit('mine-edited', 'Page');
    apiSavePageBlocks.mockResolvedValueOnce({ ok: true, etag: 'E1' });
    await vi.advanceTimersByTimeAsync(2000);
    expect(apiSavePageBlocks).toHaveBeenCalledTimes(2);   // 1 conflict + 1 success
  });
});
