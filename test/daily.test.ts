// daily.ts unit tests — orchestration of ensure / find / create flows.
//
// Daily depends on many modules (sp-list, sp-rest, pages, db). We mock
// each at the import boundary and assert the call-graph + state effects.

import { describe, it, expect, beforeEach, vi } from 'vitest';

// ── Mocks (set up before importing daily.ts) ──────────────────

const createList = vi.fn();
const addListField = vi.fn();
const getListFields = vi.fn();
const setColumnIndexed = vi.fn();
const deleteListField = vi.fn();

const spListUrl = vi.fn((title: string, suffix = '') => '/api/' + title + suffix);
const spGetD = vi.fn();

const apiCreateDbPageRow = vi.fn();
const apiCreatePage = vi.fn();
const apiSavePageMd = vi.fn();
const apiLoadRawBody = vi.fn();
const setRowBody = vi.fn();
const getRowBody = vi.fn();
const deleteRowEntry = vi.fn();
const updatePageRow = vi.fn();

const apiAddDbRow = vi.fn();

vi.mock('../src/api/sp-list', () => ({
  createList: (...a: unknown[]) => createList(...a),
  addListField: (...a: unknown[]) => addListField(...a),
  getListFields: (...a: unknown[]) => getListFields(...a),
  getListItems: vi.fn(),
  deleteListItem: vi.fn(),
  setColumnIndexed: (...a: unknown[]) => setColumnIndexed(...a),
  deleteListField: (...a: unknown[]) => deleteListField(...a),
}));

vi.mock('../src/api/sp-rest', () => ({
  spListUrl: (...a: [string, string?]) => spListUrl(...a),
  spGetD: (...a: unknown[]) => spGetD(...a),
}));

vi.mock('../src/api/pages', () => ({
  apiCreateDbPageRow: (...a: unknown[]) => apiCreateDbPageRow(...a),
  apiCreatePage: (...a: unknown[]) => apiCreatePage(...a),
  apiSavePageMd: (...a: unknown[]) => apiSavePageMd(...a),
  apiLoadRawBody: (...a: unknown[]) => apiLoadRawBody(...a),
  setRowBody: (...a: unknown[]) => setRowBody(...a),
  getRowBody: (...a: unknown[]) => getRowBody(...a),
  deleteRowEntry: (...a: unknown[]) => deleteRowEntry(...a),
  updatePageRow: (...a: unknown[]) => updatePageRow(...a),
}));

vi.mock('../src/api/db', () => ({
  apiAddDbRow: (...a: unknown[]) => apiAddDbRow(...a),
}));

let daily: typeof import('../src/api/daily');
let stateMod: typeof import('../src/state');

beforeEach(async () => {
  vi.resetModules();
  // Reset every mock between tests
  [
    createList, addListField, getListFields, setColumnIndexed, deleteListField,
    spListUrl, spGetD,
    apiCreateDbPageRow, apiCreatePage, apiSavePageMd, apiLoadRawBody,
    setRowBody, getRowBody, deleteRowEntry, updatePageRow,
    apiAddDbRow,
  ].forEach((m) => m.mockReset());

  // Restore default implementations / shapes
  spListUrl.mockImplementation((title: string, suffix = '') => '/api/' + title + suffix);
  // Every mock that gets `await`-ed or `.catch()`-chained needs a
  // resolved-promise default so the chain doesn't blow up.
  updatePageRow.mockResolvedValue(undefined);
  apiSavePageMd.mockResolvedValue({ ok: true, etag: 'E1' });
  setColumnIndexed.mockResolvedValue(undefined);
  addListField.mockResolvedValue(undefined);
  deleteListField.mockResolvedValue(undefined);
  deleteRowEntry.mockResolvedValue(undefined);
  setRowBody.mockResolvedValue(undefined);
  getRowBody.mockResolvedValue('');
  apiAddDbRow.mockResolvedValue({ Id: 1 });

  daily = await import('../src/api/daily');
  stateMod = await import('../src/state');
  stateMod.S.meta.pages = [];
  stateMod.S.pages = [];
});

describe('isDailyList', () => {
  it('matches the daily list title exactly', () => {
    expect(daily.isDailyList('memola-daily')).toBe(true);
  });

  it('rejects other list names', () => {
    expect(daily.isDailyList('memola-pages')).toBe(false);
    expect(daily.isDailyList('memola-db-123')).toBe(false);
  });

  it('rejects null / undefined', () => {
    expect(daily.isDailyList(null)).toBe(false);
    expect(daily.isDailyList(undefined)).toBe(false);
  });
});

describe('ensureDailyDb — fast path (cached registration)', () => {
  it('reuses cached meta when SP list is present', async () => {
    stateMod.S.meta.pages = [{
      id: '5', title: 'デイリーノート', parent: '',
      type: 'database', list: 'memola-daily',
    }];
    // 1st spGetD: spListUrl(DAILY_LIST_TITLE) — list exists check
    spGetD.mockResolvedValueOnce({});
    // ensureDateField → getListFields shows date column present
    getListFields.mockResolvedValue([
      { Title: 'NoteDate', InternalName: 'NoteDate', FieldTypeKind: 4 },
      { Title: 'NoteTag', InternalName: 'NoteTag', FieldTypeKind: 6 },
    ]);

    const db = await daily.ensureDailyDb();
    expect(db.dbPageId).toBe('5');
    expect(db.listTitle).toBe('memola-daily');
    expect(db.dateInternalName).toBe('NoteDate');
    // Should NOT have created the list nor a new registration row
    expect(createList).not.toHaveBeenCalled();
    expect(apiCreateDbPageRow).not.toHaveBeenCalled();
  });

  it('falls through to creation when cached meta is stale (list missing)', async () => {
    stateMod.S.meta.pages = [{
      id: '5', title: 'デイリーノート', parent: '',
      type: 'database', list: 'memola-daily',
    }];
    // First spGetD (cache-fast-path verify) → null = list missing
    spGetD.mockResolvedValueOnce(null);
    // Second spGetD (creation path verify) → null again
    spGetD.mockResolvedValueOnce(null);
    // After createList + addListField, getListFields shows date present
    getListFields.mockResolvedValue([
      { Title: 'NoteDate', InternalName: 'NoteDate', FieldTypeKind: 4 },
      { Title: 'NoteTag', InternalName: 'NoteTag', FieldTypeKind: 6 },
    ]);
    // Creation path expects apiCreateDbPageRow, but we have a cached
    // registration row already so it should NOT recreate (per the
    // logic: cachedMeta still satisfies the registration row requirement
    // even if the SP list itself was recreated)
    const db = await daily.ensureDailyDb();
    expect(createList).toHaveBeenCalledWith('memola-daily');
    expect(db.dbPageId).toBe('5');                  // reused
    expect(apiCreateDbPageRow).not.toHaveBeenCalled();
  });
});

describe('ensureDailyDb — fresh provisioning', () => {
  it('creates the list, columns, and registration row when nothing cached', async () => {
    // No cached meta. Both list-existence checks → null.
    spGetD.mockResolvedValue(null);
    // First getListFields call: list freshly created — empty schema.
    // After addListField the verify call returns the column.
    getListFields
      .mockResolvedValueOnce([])                    // ensureDateField → check #1
      .mockResolvedValueOnce([                      // ensureDateField → after add
        { Title: 'NoteDate', InternalName: 'NoteDate', FieldTypeKind: 4 },
      ])
      .mockResolvedValueOnce([                      // ensureTagFieldUnique → check
        { Title: 'NoteDate', InternalName: 'NoteDate', FieldTypeKind: 4 },
      ])
      .mockResolvedValue([                           // resolveDateInternalName
        { Title: 'NoteDate', InternalName: 'NoteDate', FieldTypeKind: 4 },
        { Title: 'NoteTag', InternalName: 'NoteTag', FieldTypeKind: 6 },
      ]);
    apiCreateDbPageRow.mockResolvedValue({
      Id: '99', Title: 'デイリーノート', ParentId: '', Type: 'database',
    });

    const db = await daily.ensureDailyDb();
    expect(createList).toHaveBeenCalledWith('memola-daily');
    expect(addListField).toHaveBeenCalledWith('memola-daily', 'NoteDate', 4);
    expect(apiCreateDbPageRow).toHaveBeenCalledWith('デイリーノート', '', 'memola-daily');
    expect(updatePageRow).toHaveBeenCalledWith('99', { Icon: '📅', Pinned: 1 });
    expect(db.dbPageId).toBe('99');
    expect(db.dateInternalName).toBe('NoteDate');
  });
});

describe('clearDailyCache', () => {
  it('forces re-bootstrap on the next ensureDailyDb call', async () => {
    stateMod.S.meta.pages = [{
      id: '5', title: 'デイリーノート', parent: '',
      type: 'database', list: 'memola-daily',
    }];
    spGetD.mockResolvedValue({});
    getListFields.mockResolvedValue([
      { Title: 'NoteDate', InternalName: 'NoteDate', FieldTypeKind: 4 },
      { Title: 'NoteTag', InternalName: 'NoteTag', FieldTypeKind: 6 },
    ]);

    await daily.ensureDailyDb();
    const callsBefore = spGetD.mock.calls.length;
    // Without clearing, the second call hits the cached promise — no new fetches
    await daily.ensureDailyDb();
    expect(spGetD.mock.calls.length).toBe(callsBefore);

    // After clearing, the next call re-runs everything
    daily.clearDailyCache();
    await daily.ensureDailyDb();
    expect(spGetD.mock.calls.length).toBeGreaterThan(callsBefore);
  });
});

describe('findNoteForDate', () => {
  beforeEach(() => {
    stateMod.S.meta.pages = [{
      id: '5', title: 'デイリーノート', parent: '',
      type: 'database', list: 'memola-daily',
    }];
    // ensureDailyDb fast path
    spGetD.mockImplementation((url: string) => {
      // First call (list-exists check) → present
      if (url === '/api/memola-daily') return Promise.resolve({});
      return Promise.resolve(null);
    });
    getListFields.mockResolvedValue([
      { Title: 'NoteDate', InternalName: 'NoteDate', FieldTypeKind: 4 },
      { Title: 'NoteTag', InternalName: 'NoteTag', FieldTypeKind: 6 },
    ]);
  });

  it('returns null when no row for the date', async () => {
    spGetD.mockImplementation((url: string) => {
      if (url === '/api/memola-daily') return Promise.resolve({});
      // The $filter query → no hits
      if (url.includes('$filter')) return Promise.resolve({ results: [] });
      return Promise.resolve(null);
    });

    const result = await daily.findNoteForDate('2026-05-05');
    expect(result).toBeNull();
  });

  it('returns the row + body when present', async () => {
    spGetD.mockImplementation((url: string) => {
      if (url === '/api/memola-daily') return Promise.resolve({});
      if (url.includes('$filter')) {
        return Promise.resolve({ results: [{ Id: 42, Title: 'Daily 2026-05-05' }] });
      }
      return Promise.resolve(null);
    });
    getRowBody.mockResolvedValue('## タスク\n- [ ] thing');

    const result = await daily.findNoteForDate('2026-05-05');
    expect(result).toEqual({
      rowId: 42,
      title: 'Daily 2026-05-05',
      body: '## タスク\n- [ ] thing',
    });
    expect(getRowBody).toHaveBeenCalledWith('memola-daily', 42);
  });
});

describe('getOrCreateNoteForDate', () => {
  beforeEach(() => {
    stateMod.S.meta.pages = [{
      id: '5', title: 'デイリーノート', parent: '',
      type: 'database', list: 'memola-daily',
    }];
    spGetD.mockImplementation((url: string) => {
      if (url === '/api/memola-daily') return Promise.resolve({});
      return Promise.resolve({ results: [] });   // findNoteForDate → none
    });
    getListFields.mockResolvedValue([
      { Title: 'NoteDate', InternalName: 'NoteDate', FieldTypeKind: 4 },
      { Title: 'NoteTag', InternalName: 'NoteTag', FieldTypeKind: 6 },
    ]);
  });

  it('returns existing note when one already exists', async () => {
    spGetD.mockImplementation((url: string) => {
      if (url === '/api/memola-daily') return Promise.resolve({});
      if (url.includes('$filter')) {
        return Promise.resolve({ results: [{ Id: 7, Title: 'Existing' }] });
      }
      return Promise.resolve(null);
    });
    getRowBody.mockResolvedValue('cached body');

    const r = await daily.getOrCreateNoteForDate('2026-05-05');
    expect(r.rowId).toBe(7);
    expect(r.body).toBe('cached body');
    expect(r.dbPageId).toBe('5');
    expect(apiAddDbRow).not.toHaveBeenCalled();
  });

  it('creates a new note (with default body) when none exists', async () => {
    apiAddDbRow.mockResolvedValue({ Id: 88 });

    const r = await daily.getOrCreateNoteForDate('2026-05-05');
    expect(apiAddDbRow).toHaveBeenCalledWith('memola-daily', expect.objectContaining({
      NoteDate: '2026-05-05',
    }));
    expect(setRowBody).toHaveBeenCalledWith(
      'memola-daily', 88, '5', expect.any(String), expect.stringContaining('## タスク'),
    );
    expect(r.rowId).toBe(88);
    expect(r.dbPageId).toBe('5');
    expect(r.body).toContain('## タスク');
  });
});
