// Saver-bridge tests — validates that legacy `S.dirty / S.saving /
// S.sync.loadedEtag / loadedModified` mirrors track Saver state, and
// that the status bar (`setSave`) reflects the right label.
//
// We mock the api/pages module so the Saver doesn't try to talk to SP.

import { describe, it, expect, beforeEach, vi } from 'vitest';

const apiSavePageBlocks = vi.fn();
const apiLoadFileMeta = vi.fn();
const apiLoadBlocksBody = vi.fn();
const setSave = vi.fn();

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

vi.mock('../src/ui/ui-helpers', () => ({
  setSave: (t: string) => setSave(t),
  setLoad: vi.fn(),
  toast: vi.fn(),
  setSavedAt: vi.fn(),
  autoR: vi.fn(),
}));

let mod: typeof import('../src/lib/saver');
let bridge: typeof import('../src/lib/saver-bridge');
let stateMod: typeof import('../src/state');

beforeEach(async () => {
  vi.resetModules();
  apiSavePageBlocks.mockReset();
  apiLoadFileMeta.mockReset();
  apiLoadBlocksBody.mockReset();
  setSave.mockReset();
  apiLoadFileMeta.mockResolvedValue({ etag: 'E?', modified: '2026-01-01T00:00:00Z' });
  apiLoadBlocksBody.mockResolvedValue('');
  mod = await import('../src/lib/saver');
  bridge = await import('../src/lib/saver-bridge');
  stateMod = await import('../src/state');
  bridge.attachSaverBridge();
});

const SNAP = (over: Partial<import('../src/lib/saver').PageSnapshot> = {}) => ({
  pageId: '1',
  body: 'hello',
  title: 'Page',
  etag: 'E0',
  modified: '2026-01-01T00:00:00Z',
  ...over,
});

describe('saver-bridge', () => {
  it('idle → S.dirty=false, S.saving=false, sets watermark, calls setSave("保存済み")', () => {
    mod.saver.loadPage(SNAP());
    expect(stateMod.S.dirty).toBe(false);
    expect(stateMod.S.saving).toBe(false);
    expect(stateMod.S.sync.loadedEtag).toBe('E0');
    expect(stateMod.S.sync.loadedModified).toBe('2026-01-01T00:00:00Z');
    expect(setSave).toHaveBeenLastCalledWith('保存済み');
  });

  it('dirty → S.dirty=true, S.saving=false, setSave("未保存")', () => {
    mod.saver.loadPage(SNAP());
    mod.saver.notifyEdit('changed', 'Page');
    expect(stateMod.S.dirty).toBe(true);
    expect(stateMod.S.saving).toBe(false);
    expect(setSave).toHaveBeenLastCalledWith('未保存');
  });

  it('saving → S.dirty=true, S.saving=true, setSave("保存中...")', async () => {
    mod.saver.loadPage(SNAP());
    mod.saver.notifyEdit('changed', 'Page');
    let resolveSave: (v: { ok: true; etag: string }) => void = () => undefined;
    apiSavePageBlocks.mockReturnValueOnce(new Promise((res) => { resolveSave = res; }));
    apiLoadFileMeta.mockResolvedValueOnce({ etag: 'E1', modified: '2026-01-02T00:00:00Z' });
    const savePromise = mod.saver.save();
    expect(stateMod.S.dirty).toBe(true);
    expect(stateMod.S.saving).toBe(true);
    expect(setSave).toHaveBeenLastCalledWith('保存中...');
    resolveSave({ ok: true, etag: 'E1' });
    await savePromise;
    // Now idle
    expect(stateMod.S.dirty).toBe(false);
    expect(stateMod.S.saving).toBe(false);
    expect(setSave).toHaveBeenLastCalledWith('保存済み');
  });

  it('conflict → S.dirty=true, setSave("競合"), watermark stays at base', async () => {
    mod.saver.loadPage(SNAP());
    mod.saver.notifyEdit('mine', 'Page');
    apiSavePageBlocks.mockResolvedValueOnce({ ok: false, reason: 'conflict' });
    apiLoadBlocksBody.mockResolvedValueOnce('theirs');
    apiLoadFileMeta.mockResolvedValueOnce({ etag: 'E2', modified: '2026-01-02T00:00:00Z' });
    await mod.saver.save();
    expect(stateMod.S.dirty).toBe(true);
    expect(stateMod.S.saving).toBe(false);
    expect(stateMod.S.sync.loadedEtag).toBe('E0');     // unchanged — sync-watch needs this
    expect(setSave).toHaveBeenLastCalledWith('競合');
  });

  it('merging → mirrors the conflict baseline', async () => {
    mod.saver.loadPage(SNAP());
    mod.saver.notifyEdit('mine', 'Page');
    apiSavePageBlocks.mockResolvedValueOnce({ ok: false, reason: 'conflict' });
    apiLoadBlocksBody.mockResolvedValueOnce('theirs');
    await mod.saver.save();
    mod.saver.startMerge();
    expect(stateMod.S.sync.loadedEtag).toBe('E0');
    expect(setSave).toHaveBeenLastCalledWith('競合');
  });

  it('unloaded → leaves row-page dirty alone, clears stale page-driven flags', () => {
    mod.saver.loadPage(SNAP());
    expect(stateMod.S.dirty).toBe(false);
    // Simulate row-page setting its own dirty (S.currentRow ≠ null is
    // the signal that row-page owns the dirty/saving markers).
    stateMod.S.dirty = true;
    stateMod.S.currentRow = { listTitle: 'list', itemId: 1, dbId: '1' };
    mod.saver.unload();
    expect(stateMod.S.dirty).toBe(true);
    // Without an active row-page, an unload from a stuck dirty/saving
    // page must clear the markers so subsequent flows (sync-watch
    // checkOnce, status bar) don't see stale data.
    stateMod.S.currentRow = null;
    stateMod.S.dirty = true;
    mod.saver.loadPage(SNAP());
    mod.saver.unload();
    expect(stateMod.S.dirty).toBe(false);
  });
});
