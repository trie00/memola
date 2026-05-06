// Database (SP custom list) creation and row CRUD wrappers.
//
// The DB list holds only structural row data (Title + user-defined columns).
// Row body markdown lives in memola-pages (PageType='row'); see api/pages.ts.

import { S, type Page, type ListItem, type ListField } from '../state';

/** Columns we add for soft-delete bookkeeping. They MUST be excluded
 *  from any user-facing column list (table headers, row-props panel,
 *  filter UI, "+ 列" picker, etc.). Match by display name OR internal
 *  name so the filter is robust against tenant-specific renames. */
const INTERNAL_DB_COLUMN_NAMES = new Set<string>([
  'Trashed',
  'TrashedBy',
]);

/** Strip internal-only columns (Trashed / TrashedBy) from a field list. */
export function stripInternalDbFields(fields: ListField[]): ListField[] {
  return fields.filter((f) =>
    !INTERNAL_DB_COLUMN_NAMES.has(f.Title) &&
    !INTERNAL_DB_COLUMN_NAMES.has(f.InternalName),
  );
}
import {
  ensureList, createListItem, updateListItem,
  deleteListItem, getListItemById,
  softDelete, restoreSoftDelete,
} from './sp-list';
// Re-export type so callers don't need to chase imports
export type { ListField } from '../state';
import {
  apiCreateDbPageRow, ORG_PAGES_LIST, deleteRowEntry,
} from './pages';
import { getCurrentUserId } from './sync';
import { spListUrl, spGetD } from './sp-rest';

export async function apiCreateDb(title: string, parentId: string): Promise<Page> {
  const stamp = Date.now().toString();
  const listTitle = 'memola-db-' + stamp;
  // ensureList handles the create + trash-column provisioning + indexing
  // in one pass. The columns scale the list past the 5,000-row LVT for
  // soft-delete filter queries.
  await ensureList({
    title: listTitle,
    fields: [
      { name: 'Trashed', kind: 9, indexed: true },
      { name: 'TrashedBy', kind: 9, indexed: true },
    ],
  });
  return await apiCreateDbPageRow(title, parentId, listTitle);
}

/** Idempotent re-provision for older DB lists that pre-date the trash
 *  schema. Safe to call repeatedly; equivalent to a partial ensureList
 *  with only the trash fields. */
export async function ensureRowTrashFields(listTitle: string): Promise<void> {
  await ensureList({
    title: listTitle,
    fields: [
      { name: 'Trashed', kind: 9, indexed: true },
      { name: 'TrashedBy', kind: 9, indexed: true },
    ],
  }).catch(() => undefined);
}

/** Soft-delete a DB row. Sets Trashed=ts (and TrashedBy=current user id)
 *  on BOTH the DB row and the memola-pages body row. Order is
 *  body-first → DB-row so a process kill mid-write leaves the row
 *  visible in BOTH the DB AND the trash modal (recoverable, no orphan).
 *  Self-heal in views.doSelectDb completes the second write on next
 *  open if it was missed.
 *
 *  If the row never had a body (= user added a row in the table view
 *  and deleted it without ever opening it as a page), there is no
 *  memola-pages PageType='row' entry — the trash modal would have
 *  nothing to display. We create a placeholder body row in that case so
 *  the deletion is visible and restorable. */
export async function apiTrashRow(listTitle: string, rowId: number): Promise<void> {
  const ts = Date.now();
  const myId = S.meta.myUserId || (await getCurrentUserId().catch(() => 0));
  // 1. Lazy-provision the columns on first soft-delete (cheap if already there).
  await ensureRowTrashFields(listTitle).catch(() => undefined);
  // 2. Mark the body row in memola-pages first → trash modal sees it
  //    immediately, even if step 3 fails. Create a placeholder body row
  //    if none exists (= row never opened as page).
  const hits = await findTrashHits(listTitle, rowId);
  if (hits.length === 0) {
    // Need parent DB info (id + scope) for the placeholder body
    const parentDb = S.meta.pages.find(
      (m) => m.type === 'database' && m.list === listTitle,
    );
    // Pull the row's Title for display in the trash modal
    let title = '';
    try {
      const fetched = await getListItemById(listTitle, rowId);
      title = String(fetched?.Title || '');
    } catch { /* ignore */ }
    try {
      await createListItem(ORG_PAGES_LIST, {
        Title: title,
        ParentId: parentDb?.id || '',
        PageType: 'row',
        ListTitle: listTitle,
        DbRowId: rowId,
        // Phase 2: canonical body column is Body_blocks (JSON-blocks),
        // not the legacy Body markdown column. Writing Body='' here
        // left the row's body invisible to every Phase-2-aware reader.
        Body_blocks: '[]',
        Scope: parentDb?.scope || 'user',
        Trashed: ts,
        TrashedBy: myId,
      });
    } catch { /* fatal? not really — row gets hidden from DB anyway,
                  but trash modal won't see it. Log and continue. */ }
  } else {
    for (const h of hits) {
      await softDelete(ORG_PAGES_LIST, h.id, myId, ts).catch(() => undefined);
    }
  }
  // 3. Mark the DB row → table view filters it out.
  await softDelete(listTitle, rowId, myId, ts).catch(() => undefined);
}

/** Restore a soft-deleted DB row. Clears Trashed/TrashedBy on both
 *  the DB row and the body. Order is DB-row first → body so the row
 *  re-appears in the table view immediately; if step 2 fails, the row
 *  is back in the table but still in trash modal (user can re-restore). */
export async function apiRestoreRow(listTitle: string, rowId: number): Promise<void> {
  await ensureRowTrashFields(listTitle).catch(() => undefined);
  await restoreSoftDelete(listTitle, rowId).catch(() => undefined);
  const hits = await findTrashHits(listTitle, rowId);
  for (const h of hits) {
    await restoreSoftDelete(ORG_PAGES_LIST, h.id).catch(() => undefined);
  }
}

/** Hard-delete a DB row. Used by trash modal's 「完全削除」 button and
 *  by the empty-trash flow (with own-only filter applied at caller).
 *  Hits the same 2-list deletion as the legacy hard-delete path. */
export async function apiPurgeRow(listTitle: string, rowId: number): Promise<void> {
  await deleteListItem(listTitle, rowId).catch(() => undefined);
  await deleteRowEntry(listTitle, rowId).catch(() => undefined);
}

/** Find memola-pages body rows for a given (listTitle, dbRowId).
 *  Local helper — db.ts can't import from pages.ts's findRowEntries
 *  without circular issues, so we issue the query directly. */
async function findTrashHits(
  listTitle: string,
  dbRowId: number,
): Promise<Array<{ id: number }>> {
  const filter = "PageType eq 'row' and ListTitle eq '" + listTitle.replace(/'/g, "''") +
    "' and DbRowId eq " + dbRowId;
  const url = spListUrl(ORG_PAGES_LIST,
    '/items?$select=Id&$filter=' + encodeURIComponent(filter) + '&$orderby=Id&$top=20');
  const d = await spGetD<{ results: Array<{ Id: number }> }>(url);
  return (d?.results || []).map((r) => ({ id: r.Id }));
}

/** Fetch all currently-trashed memola-pages row bodies. Returns enough
 *  data for the trash modal to render: parent DB list + row id + title +
 *  who deleted + when. Each entry can be restored / purged via
 *  apiRestoreRow / apiPurgeRow. */
export interface TrashedRow {
  /** memola-pages item id (= the body row's id, NOT the DB row id) */
  bodyId: number;
  /** Owning DB's SP list title (e.g. 'memola-db-1234567890') */
  listTitle: string;
  /** Row id within that DB list */
  dbRowId: number;
  /** Mirror of the row's Title (set by setRowBody) */
  title: string;
  /** Trashed timestamp (ms) */
  trashedAt: number;
  /** SP user id of the deleter */
  trashedBy: number;
  /** Scope inherited from parent DB at row-create time */
  scope: 'org' | 'user' | '';
  /** SP user id of the body's creator (for visibility filtering) */
  authorId: number;
}

/** Self-heal for partial soft-delete writes:
 *  apiTrashRow does memola-pages-body THEN db-row updates. If a process
 *  kill / network failure interrupts AFTER body but BEFORE db-row, the
 *  row appears in BOTH the DB (still active in table) and the trash
 *  modal (= memola-pages body has Trashed flag). On the next DB open,
 *  detect this and complete the missed db-row write so the row is
 *  consistently filtered.
 *
 *  Inverse direction (db-row trashed but body not) shouldn't occur
 *  given the write order, but if it ever does — we don't fix it here
 *  because the rule is "memola-pages is the trash modal's source of
 *  truth"; a body without a Trashed flag means no trash entry, so the
 *  user wouldn't lose data. */
export async function reconcileTrashedRows(
  listTitle: string, dbRows: ListItem[],
): Promise<void> {
  // Query memola-pages for trashed body rows pointing to this DB
  const url = spListUrl(ORG_PAGES_LIST,
    "/items?$select=Id,DbRowId,Trashed,TrashedBy" +
    "&$filter=" + encodeURIComponent(
      "PageType eq 'row' and ListTitle eq '" + listTitle.replace(/'/g, "''") + "' and Trashed gt 0"
    ) + '&$top=500');
  const d = await spGetD<{ results: Array<{ DbRowId: number; Trashed: number; TrashedBy: number }> }>(url)
    .catch(() => null);
  if (!d?.results) return;
  for (const trashedBody of d.results) {
    const dbRow = dbRows.find((r) => r.Id === trashedBody.DbRowId);
    if (!dbRow) continue;                      // already gone, fine
    // Active in DB but body says trashed → fix
    if (!dbRow.Trashed) {
      await updateListItem(listTitle, dbRow.Id, {
        Trashed: trashedBody.Trashed,
        TrashedBy: trashedBody.TrashedBy,
      }).catch(() => undefined);
    }
  }
}

export async function getTrashedRows(): Promise<TrashedRow[]> {
  const url = spListUrl(ORG_PAGES_LIST,
    "/items?$select=Id,Title,ListTitle,DbRowId,Trashed,TrashedBy,Scope,AuthorId" +
    "&$filter=" + encodeURIComponent("PageType eq 'row' and Trashed gt 0") +
    "&$orderby=Trashed desc&$top=500");
  const d = await spGetD<{
    results: Array<{
      Id: number; Title?: string; ListTitle?: string; DbRowId?: number;
      Trashed?: number; TrashedBy?: number; Scope?: string; AuthorId?: number;
    }>
  }>(url).catch(() => null);
  if (!d) return [];
  return d.results
    .filter((r) => r.ListTitle && r.DbRowId)
    .map((r) => ({
      bodyId: r.Id,
      listTitle: r.ListTitle as string,
      dbRowId: r.DbRowId as number,
      title: r.Title || '',
      trashedAt: r.Trashed || 0,
      trashedBy: r.TrashedBy || 0,
      scope: (r.Scope === 'org' || r.Scope === 'user' ? r.Scope : '') as 'org' | 'user' | '',
      authorId: r.AuthorId || 0,
    }));
}

export async function apiAddDbRow(
  listTitle: string,
  data: Record<string, unknown>,
): Promise<ListItem> {
  // Two-step: create with Title only (POST/JSON requires InternalName, which
  // is gnarly for non-ASCII column names like '日付' → '_x65e5__x4ed8_'),
  // then push the rest via validateUpdateListItem which accepts both display
  // and internal names. This sidesteps the "プロパティ '日付' は型 ... に
  // 存在しません" error users hit when DBs have Japanese column names.
  const title = data.Title;
  const rest: Record<string, unknown> = {};
  for (const k of Object.keys(data)) {
    if (k === 'Title' || k === '__metadata') continue;
    rest[k] = data[k];
  }
  const created = await createListItem(listTitle, { Title: title == null ? '' : title });
  if (Object.keys(rest).length > 0) {
    await updateListItem(listTitle, created.Id, rest);
    // Reflect the updated values in the returned object so callers that read
    // `created.<field>` see the values they just wrote.
    for (const k of Object.keys(rest)) created[k] = rest[k];
  }
  return created;
}

export async function apiUpdateDbRow(
  listTitle: string,
  itemId: number,
  data: Record<string, unknown>,
): Promise<void> {
  await updateListItem(listTitle, itemId, data);
}
