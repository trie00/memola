// Per-DB undo/redo stacks.
//
// Each command has a label (for tooltip / debugging) and a pair of async
// undo/redo functions. Recording a fresh command clears the redo (future)
// stack — standard editor semantics.
//
// History is kept in-memory only (not persisted). Page reload = clean slate.
// MAX_HISTORY caps memory; older entries fall off the bottom of the past stack.

export interface DbCommand {
  label: string;
  undo: () => Promise<void> | void;
  redo: () => Promise<void> | void;
}

interface DbStack {
  past: DbCommand[];
  future: DbCommand[];
}

const MAX_HISTORY = 50;
const stacks = new Map<string, DbStack>();

function getStack(listTitle: string): DbStack {
  let s = stacks.get(listTitle);
  if (!s) { s = { past: [], future: [] }; stacks.set(listTitle, s); }
  return s;
}

/** Push a command after it has already been performed once. Clears redo. */
export function recordDbCommand(listTitle: string, cmd: DbCommand): void {
  if (!listTitle) return;
  const s = getStack(listTitle);
  s.past.push(cmd);
  if (s.past.length > MAX_HISTORY) s.past.shift();
  s.future = [];
}

export async function undoDb(listTitle: string): Promise<DbCommand | null> {
  const s = getStack(listTitle);
  const cmd = s.past.pop();
  if (!cmd) return null;
  try {
    await cmd.undo();
    s.future.push(cmd);
    return cmd;
  } catch (e) {
    // If undo fails, drop this command — don't keep retrying on Cmd+Z.
    throw e;
  }
}

export async function redoDb(listTitle: string): Promise<DbCommand | null> {
  const s = getStack(listTitle);
  const cmd = s.future.pop();
  if (!cmd) return null;
  try {
    await cmd.redo();
    s.past.push(cmd);
    return cmd;
  } catch (e) {
    throw e;
  }
}

export function canUndoDb(listTitle: string): boolean {
  return getStack(listTitle).past.length > 0;
}
export function canRedoDb(listTitle: string): boolean {
  return getStack(listTitle).future.length > 0;
}

/** Clear all history for a DB (e.g. when the DB is deleted). */
export function clearDbHistory(listTitle: string): void {
  stacks.delete(listTitle);
}

// ── Convenience recorders for common ops ────────────────
//
// Cross-DB safety: every undo/redo must be careful that the user might be
// viewing a *different* DB by the time the command runs. The SP REST call
// (apiUpdateDbRow / apiAddDbRow / apiDeleteListItem etc.) always uses the
// listTitle from the command's closure → safe. But the local cache mutation
// (S.dbItems / S.dbFields) and the view re-render are tied to the *currently
// open* DB — mutating them when S.dbList !== listTitle would corrupt the
// open DB's view. The helpers below all guard with `isViewing(listTitle)`
// and skip cache + render when the user has switched away.

async function isViewing(listTitle: string): Promise<boolean> {
  const { S } = await import('../state');
  return S.currentType === 'database' && S.dbList === listTitle;
}

async function rerenderActiveDbView(): Promise<void> {
  const v = await import('./views');
  v.renderDbTable();
  // Also refresh whichever alt-view is on
  const list = document.getElementById('list-view');
  const gallery = document.getElementById('gallery-view');
  const calendar = document.getElementById('calendar-view');
  const gantt = document.getElementById('gantt-view');
  if (list?.classList.contains('on') ||
      gallery?.classList.contains('on') ||
      calendar?.classList.contains('on') ||
      gantt?.classList.contains('on')) {
    const m = await import('./db-views-extra');
    if (list?.classList.contains('on')) m.renderListView();
    if (gallery?.classList.contains('on')) m.renderGalleryView();
    if (calendar?.classList.contains('on')) m.renderCalendarView();
    if (gantt?.classList.contains('on')) m.renderGanttView();
  }
}

/** Record a single-cell change. The actual update has already happened; this
 *  just registers undo/redo handlers that re-write the field via SP REST and
 *  refresh the active DB view *only if it's the same DB*. */
export function recordCellChange(
  listTitle: string,
  itemId: number,
  fieldInternal: string,
  fieldLabel: string,
  oldValue: unknown,
  newValue: unknown,
): void {
  const apply = async (val: unknown): Promise<void> => {
    const { apiUpdateDbRow } = await import('../api/db');
    await apiUpdateDbRow(listTitle, itemId, { [fieldInternal]: val ?? '' });
    if (!(await isViewing(listTitle))) return;          // user switched DBs
    const { S } = await import('../state');
    const it = S.dbItems.find((i) => i.Id === itemId);
    if (it) it[fieldInternal] = val;
    await rerenderActiveDbView();
  };
  recordDbCommand(listTitle, {
    label: fieldLabel + ' 変更',
    undo: () => apply(oldValue),
    redo: () => apply(newValue),
  });
}

/** Record a row-order change (drag reorder). Order is always persisted (it's
 *  per-DB localStorage), but re-render only when viewing the same DB. */
export function recordRowOrderChange(
  listTitle: string,
  oldOrder: number[],
  newOrder: number[],
): void {
  const apply = async (order: number[] | null): Promise<void> => {
    const { saveRowOrder } = await import('../lib/db-order');
    if (order === null) {
      const { prefDbRowOrderLegacy } = await import('../lib/prefs');
      prefDbRowOrderLegacy(listTitle).clear();
    } else {
      saveRowOrder(listTitle, order);
    }
    if (!(await isViewing(listTitle))) return;
    await rerenderActiveDbView();
  };
  recordDbCommand(listTitle, {
    label: '行の並び替え',
    undo: () => apply(oldOrder.length ? oldOrder : null),
    redo: () => apply(newOrder),
  });
}

/** Whitelist a row payload to user-defined columns only. SP rejects POSTs
 *  that include readonly system fields (ContentTypeId / Modified / Author /
 *  _UIVersionString etc.), so we must strip everything except known editable
 *  columns. Schema is fetched fresh in case the cached S.dbFields is for a
 *  different DB than the one being undone. */
async function toUserFieldsOnly(
  listTitle: string,
  snap: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const { getListFields } = await import('../api/sp-list');
  const fields = await getListFields(listTitle);
  const userKeys = new Set(fields.map((f) => f.InternalName));
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(snap)) {
    if (!userKeys.has(k)) continue;
    const v = snap[k];
    if (v == null) continue;
    if (typeof v === 'object') continue; // skip lookup objects (Author/Editor etc.)
    out[k] = v;
  }
  if (!out.Title && snap.Title) out.Title = String(snap.Title);
  return out;
}

async function dbIdForList(listTitle: string): Promise<string> {
  const { S } = await import('../state');
  const meta = S.meta.pages.find((p) => p.list === listTitle && p.type === 'database');
  return meta?.id || '';
}

/** Delete a DB row + cascade body, with undo/redo. Captures snapshot before delete. */
export async function deleteRowWithUndo(listTitle: string, rowId: number): Promise<void> {
  const { S } = await import('../state');
  // SharePoint Id is per-list, so `S.dbItems` (active-DB cache) only contains
  // the right row when we're actually viewing the target list. Otherwise we
  // would either snapshot a totally different DB's row #N or fail to record
  // any undo at all. Always source the snapshot from the target list itself.
  const { deleteListItem, getListItemById } = await import('../api/sp-list');
  const { getRowBody, deleteRowEntry, setRowBody } = await import('../api/pages');

  let snapshot: Record<string, unknown> | null = null;
  if (S.dbList === listTitle) {
    const cached = S.dbItems.find((i) => i.Id === rowId);
    if (cached) snapshot = { ...cached };
  }
  if (!snapshot) {
    // Either viewing a different DB, or the active-DB cache is stale. Pull
    // a fresh snapshot from SP for the *target* list.
    const fetched = await getListItemById(listTitle, rowId).catch(() => null);
    if (fetched) snapshot = { ...fetched };
  }
  if (!snapshot) {
    // Row really doesn't exist — still attempt the SP-level delete idempotently
    // and skip undo recording (no data to restore).
    await deleteListItem(listTitle, rowId).catch(() => undefined);
    await deleteRowEntry(listTitle, rowId).catch(() => undefined);
    return;
  }

  const body = await getRowBody(listTitle, rowId).catch(() => '');
  const dbId = await dbIdForList(listTitle);
  await deleteListItem(listTitle, rowId);
  await deleteRowEntry(listTitle, rowId).catch(() => undefined);
  if (S.dbList === listTitle) {
    S.dbItems = S.dbItems.filter((i) => i.Id !== rowId);
  }

  // Closure-captured "current Id" — recreate-after-undo gives a new Id.
  let curId = rowId;
  let curBody = body;
  let curSnap = snapshot;

  recordDbCommand(listTitle, {
    label: '行削除',
    undo: async () => {
      const { apiAddDbRow } = await import('../api/db');
      const payload = await toUserFieldsOnly(listTitle, curSnap);
      const created = await apiAddDbRow(listTitle, payload);
      curId = created.Id;
      if (curBody) await setRowBody(listTitle, curId, dbId, String(curSnap.Title || ''), curBody);
      // Local cache + render only if user is viewing this DB
      if (!(await isViewing(listTitle))) return;
      const sx = (await import('../state')).S;
      sx.dbItems.push(created);
      await rerenderActiveDbView();
    },
    redo: async () => {
      // Snapshot current state (may have been edited since) before deleting.
      // Always pull from the target list — the active-DB cache may belong to
      // a different DB at this point.
      let freshSnap: Record<string, unknown> | null = null;
      const sx = (await import('../state')).S;
      if (sx.dbList === listTitle) {
        const cur = sx.dbItems.find((i) => i.Id === curId);
        if (cur) freshSnap = { ...cur };
      }
      if (!freshSnap) {
        const fetched = await getListItemById(listTitle, curId).catch(() => null);
        if (fetched) freshSnap = { ...fetched };
      }
      if (freshSnap) curSnap = freshSnap;
      curBody = await getRowBody(listTitle, curId).catch(() => curBody);
      await deleteListItem(listTitle, curId).catch(() => undefined);
      await deleteRowEntry(listTitle, curId).catch(() => undefined);
      if (sx.dbList !== listTitle) return;
      sx.dbItems = sx.dbItems.filter((i) => i.Id !== curId);
      await rerenderActiveDbView();
    },
  });
}

/** Add a DB row with undo/redo recording. Returns the created row. */
export async function addRowWithUndo(
  listTitle: string,
  data: Record<string, unknown>,
  body?: string,
): Promise<{ Id: number; Title?: string; [k: string]: unknown }> {
  const { apiAddDbRow } = await import('../api/db');
  const { setRowBody, deleteRowEntry, getRowBody } = await import('../api/pages');
  const { deleteListItem } = await import('../api/sp-list');
  const dbId = await dbIdForList(listTitle);
  const created = await apiAddDbRow(listTitle, data);
  if (body) await setRowBody(listTitle, created.Id, dbId, String(data.Title || ''), body);

  let curId = created.Id;
  let curSnap: Record<string, unknown> = { ...created };
  let curBody = body || '';

  recordDbCommand(listTitle, {
    label: '行追加',
    undo: async () => {
      // Snapshot before delete (only if currently viewing — otherwise use stored)
      if (await isViewing(listTitle)) {
        const sx = (await import('../state')).S;
        const cur = sx.dbItems.find((i) => i.Id === curId);
        if (cur) curSnap = { ...cur };
      }
      curBody = await getRowBody(listTitle, curId).catch(() => curBody);
      // Tolerate "row already gone" (404 etc.) — the desired end state of
      // "undo add" is "row doesn't exist", which is satisfied either way.
      await deleteListItem(listTitle, curId).catch(() => undefined);
      await deleteRowEntry(listTitle, curId).catch(() => undefined);
      if (!(await isViewing(listTitle))) return;
      const sx = (await import('../state')).S;
      sx.dbItems = sx.dbItems.filter((i) => i.Id !== curId);
      await rerenderActiveDbView();
    },
    redo: async () => {
      const payload = await toUserFieldsOnly(listTitle, curSnap);
      const recreated = await apiAddDbRow(listTitle, payload);
      curId = recreated.Id;
      if (curBody) await setRowBody(listTitle, curId, dbId, String(curSnap.Title || ''), curBody);
      if (!(await isViewing(listTitle))) return;
      const sx = (await import('../state')).S;
      sx.dbItems.push(recreated);
      await rerenderActiveDbView();
    },
  });
  return created;
}

/** Record an update_db_row from AI tool path. The actual update was already
 *  performed by the caller; this just adds undo/redo entries. */
export function recordRowFieldsUpdate(
  listTitle: string,
  rowId: number,
  oldFields: Record<string, unknown>,
  newFields: Record<string, unknown>,
  oldBody: string | undefined,
  newBody: string | undefined,
  dbId: string,
): void {
  const apply = async (
    fields: Record<string, unknown>,
    body: string | undefined,
  ): Promise<void> => {
    const { apiUpdateDbRow } = await import('../api/db');
    if (Object.keys(fields).length > 0) {
      await apiUpdateDbRow(listTitle, rowId, fields);
    }
    // Need the row title for setRowBody. Read from local cache only if
    // currently viewing this DB; otherwise the snapshot's Title field is
    // the safer fallback.
    let rowTitle = '';
    if (await isViewing(listTitle)) {
      const sx = (await import('../state')).S;
      const it = sx.dbItems.find((i) => i.Id === rowId);
      if (it) rowTitle = String(it.Title || '');
    }
    if (body !== undefined) {
      const { setRowBody } = await import('../api/pages');
      await setRowBody(listTitle, rowId, dbId, rowTitle, body);
    }
    if (!(await isViewing(listTitle))) return;
    // Mirror to local cache + render
    if (Object.keys(fields).length > 0) {
      const sx = (await import('../state')).S;
      const it = sx.dbItems.find((i) => i.Id === rowId);
      if (it) for (const k of Object.keys(fields)) it[k] = fields[k];
    }
    await rerenderActiveDbView();
  };
  recordDbCommand(listTitle, {
    label: '行更新',
    undo: () => apply(oldFields, oldBody),
    redo: () => apply(newFields, newBody),
  });
}

/** Record a column-order change (drag reorder). Order is always persisted;
 *  re-render only happens when viewing the same DB. */
export function recordColOrderChange(
  listTitle: string,
  oldOrder: string[],
  newOrder: string[],
): void {
  const apply = async (order: string[] | null): Promise<void> => {
    const { saveColOrder } = await import('../lib/db-order');
    if (order === null) {
      const { prefDbColOrderLegacy } = await import('../lib/prefs');
      prefDbColOrderLegacy(listTitle).clear();
    } else {
      saveColOrder(listTitle, order);
    }
    if (!(await isViewing(listTitle))) return;
    await rerenderActiveDbView();
  };
  recordDbCommand(listTitle, {
    label: '列の並び替え',
    undo: () => apply(oldOrder.length ? oldOrder : null),
    redo: () => apply(newOrder),
  });
}
