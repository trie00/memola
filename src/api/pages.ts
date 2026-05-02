// Pages stored as rows in a single SharePoint list `n365-pages`.
// Title + meta (parent, type, icon, pin/trash flags, listTitle for DBs) live as
// columns; the page body markdown is stored in the `Body` Note column.
//
// Page id == SP list item id, stringified — kept as string for compatibility
// with the rest of the codebase, which has always treated ids as strings.

import { S, type Page, type PageMeta } from '../state';
import {
  createList,
  addListField,
  createListItem,
  updateListItem,
  deleteListItem,
  deleteList,
  getListItems,
} from './sp-list';
import { spListUrl, spGetD } from './sp-rest';
import { mdToHtml, htmlToMd } from '../lib/markdown';
import { collectDescendantIds } from '../lib/page-tree';

export const PAGES_LIST = 'n365-pages';

interface PageRow {
  Id: number;
  Title?: string;
  ParentId?: string;
  PageType?: string;        // 'page' | 'database' | 'row'
  Icon?: string;
  Pinned?: number;
  Trashed?: number;
  ListTitle?: string;       // for 'database': backing list name; for 'row': owning DB list
  DbRowId?: number;         // for 'row': item id within the DB list
  Body?: string;
  Published?: number;       // 0 / 1 — currently mirrored as a Modern Site Page
  PublishedUrl?: string;    // absolute URL of the mirrored Site Page
  PublishedPageId?: number; // SP.Publishing.SitePage Id
  PublishedDirty?: number;  // 0 / 1 — page edited since the last sync to the Site Page
}

let _ensurePromise: Promise<void> | null = null;

/** Required columns for the n365-pages list. Kept in one place so
 *  ensurePagesList can verify completeness after column-add attempts. */
const REQUIRED_FIELDS: Array<[string, number]> = [
  ['ParentId', 2], ['PageType', 2], ['Icon', 2], ['Pinned', 9], ['Trashed', 9],
  ['ListTitle', 2], ['DbRowId', 9], ['Body', 3],
  ['Published', 9], ['PublishedUrl', 3], ['PublishedPageId', 9], ['PublishedDirty', 9],
];

/** Idempotently create the n365-pages list and its columns. Resilient to
 *  transient field-add failures: if any required column is still missing
 *  after the first pass, the cached promise is cleared so subsequent calls
 *  retry, and the current call rejects so the caller can surface the error
 *  instead of silently running with an incomplete schema. */
async function ensurePagesList(): Promise<void> {
  if (_ensurePromise) return _ensurePromise;
  _ensurePromise = (async () => {
    const exists = (await spGetD<unknown>(spListUrl(PAGES_LIST))) != null;
    if (!exists) await createList(PAGES_LIST);
    const titles = await listFieldTitles();
    const need = async (n: string, kind: number): Promise<void> => {
      if (titles.has(n)) return;
      try { await addListField(PAGES_LIST, n, kind); titles.add(n); }
      catch { /* tolerate failure; verified below */ }
    };
    // Run sequentially to avoid digest churn / race
    for (const [name, kind] of REQUIRED_FIELDS) {
      await need(name, kind);
    }
    // Verify schema completeness — re-fetch field titles in case `titles`
    // got out of sync (e.g. another tab added a column concurrently).
    const finalTitles = await listFieldTitles();
    const missing = REQUIRED_FIELDS.filter(([n]) => !finalTitles.has(n)).map(([n]) => n);
    if (missing.length > 0) {
      throw new Error('n365-pages の必須列が不足しています: ' + missing.join(', '));
    }
  })().catch((e) => {
    // Allow the next caller to retry. Without this, a single transient
    // failure (e.g. digest expiry, network blip) wedged the whole session.
    _ensurePromise = null;
    throw e;
  });
  return _ensurePromise;
}

async function listFieldTitles(): Promise<Set<string>> {
  const d = await spGetD<{ results: { Title: string; InternalName: string }[] }>(
    spListUrl(PAGES_LIST, '/fields?$select=Title,InternalName'),
  );
  const s = new Set<string>();
  d?.results.forEach((f) => { s.add(f.Title); s.add(f.InternalName); });
  return s;
}

function rowToMeta(row: PageRow): PageMeta {
  const m: PageMeta = {
    id: String(row.Id),
    title: row.Title || '',
    parent: row.ParentId || '',
    type: row.PageType === 'database' ? 'database' : 'page',
    icon: row.Icon || '',
  };
  if (row.ListTitle) m.list = row.ListTitle;
  if (row.Pinned && row.Pinned > 0) m.pinned = true;
  if (row.Trashed && row.Trashed > 0) m.trashed = row.Trashed;
  if (row.Published && row.Published > 0) m.published = true;
  if (row.PublishedUrl) m.publishedUrl = row.PublishedUrl;
  if (row.PublishedPageId && row.PublishedPageId > 0) m.publishedSitePageId = row.PublishedPageId;
  if (row.PublishedDirty && row.PublishedDirty > 0) m.publishedDirty = true;
  return m;
}

interface FetchedRow {
  row: PageRow;
  etag: string;
  modified: string;
  editor: string;
}

async function fetchOneRow(itemId: number, select?: string): Promise<FetchedRow | null> {
  const sel = select || 'Id,Title,ParentId,PageType,Icon,Pinned,Trashed,ListTitle,DbRowId,Body,Published,PublishedUrl,PublishedPageId,PublishedDirty,Modified,Editor/Title';
  // Only $expand=Editor when an Editor sub-field is in $select; otherwise SP
  // returns 400 (expand without matching select).
  const expandPart = /\bEditor\//.test(sel) ? '&$expand=Editor' : '';
  const url = spListUrl(PAGES_LIST, '/items(' + itemId + ')?$select=' +
    encodeURIComponent(sel) + expandPart);
  const d = await spGetD<PageRow & { __metadata: { etag: string }; Modified: string; Editor?: { Title: string } }>(url);
  if (!d) return null;
  return {
    row: d,
    etag: d.__metadata?.etag || '',
    modified: d.Modified || '',
    editor: d.Editor?.Title || '',
  };
}

export function getPageParent(id: string): string {
  const p = S.meta.pages.find((p) => p.id === id);
  return p ? (p.parent || '') : '';
}

export async function apiGetPages(): Promise<Page[]> {
  await ensurePagesList();
  const items = (await getListItems(PAGES_LIST)) as unknown as PageRow[];
  // Keep only top-level entries (page / database) in S.meta and the page tree.
  // Row-as-page entries (PageType='row') are an internal join with DB rows and
  // are looked up on demand via getRowBody / setRowBody.
  const topLevel = items.filter((it) => it.PageType !== 'row');
  S.meta.pages = topLevel.map(rowToMeta);
  return S.meta.pages
    .filter((p) => !p.trashed)
    .map((p) => ({
      Id: p.id,
      Title: p.title,
      ParentId: p.parent || '',
      Type: (p.type || 'page') as 'page' | 'database',
    }));
}

export function getTrashedPages(): Array<{ id: string; title: string; trashed: number; type?: string }> {
  return S.meta.pages
    .filter((p) => p.trashed)
    .map((p) => ({ id: p.id, title: p.title, trashed: p.trashed!, type: p.type }))
    .sort((a, b) => b.trashed - a.trashed);
}

export async function apiLoadContent(id: string): Promise<string> {
  const itemId = parseInt(id, 10);
  if (!itemId) return '';
  const r = await fetchOneRow(itemId, 'Body');
  const md = r?.row.Body || '';
  return mdToHtml(md);
}

/** Raw markdown body — used by export/duplicate paths that don't want HTML. */
export async function apiLoadRawBody(id: string): Promise<string> {
  const itemId = parseInt(id, 10);
  if (!itemId) return '';
  const r = await fetchOneRow(itemId, 'Body');
  return r?.row.Body || '';
}

export async function apiLoadFileMeta(id: string): Promise<{ modified: string; etag: string } | null> {
  const itemId = parseInt(id, 10);
  if (!itemId) return null;
  const r = await fetchOneRow(itemId, 'Modified');
  return r ? { modified: r.modified, etag: r.etag } : null;
}

/** Create a normal page row. */
export async function apiCreatePage(title: string, parentId: string): Promise<Page> {
  await ensurePagesList();
  const created = await createListItem(PAGES_LIST, {
    Title: title,
    ParentId: parentId || '',
    PageType: 'page',
    Icon: '',
    Pinned: 0,
    Trashed: 0,
    Body: '',
  });
  const id = String(created.Id);
  S.meta.pages.push({
    id, title, parent: parentId || '',
    type: 'page', icon: '',
  });
  return { Id: id, Title: title, ParentId: parentId || '', Type: 'page' };
}

/** Create a "database" page row that points to a separate SP list. */
export async function apiCreateDbPageRow(
  title: string,
  parentId: string,
  listTitle: string,
): Promise<Page> {
  await ensurePagesList();
  const created = await createListItem(PAGES_LIST, {
    Title: title,
    ParentId: parentId || '',
    PageType: 'database',
    Icon: '',
    Pinned: 0,
    Trashed: 0,
    ListTitle: listTitle,
    Body: '',
  });
  const id = String(created.Id);
  S.meta.pages.push({
    id, title, parent: parentId || '',
    type: 'database', list: listTitle, icon: '',
  });
  return { Id: id, Title: title, ParentId: parentId || '', Type: 'database' };
}

export async function apiSavePage(
  id: string,
  title: string,
  bodyHtml: string,
  expectedEtag?: string,
): Promise<{ ok: true; etag: string } | { ok: false; reason: 'conflict' }> {
  // Editor path: bodyHtml comes from contenteditable, convert to markdown.
  return saveBodyInternal(id, title, htmlToMd(bodyHtml), expectedEtag);
}

/** Save with raw markdown (used by AI tool path; avoids lossy md↔HTML round-trip).
 *  Like apiSavePage, accepts an optional `expectedEtag` so the AI path can
 *  surface conflict-on-save instead of silently overwriting concurrent edits
 *  by other users. */
export async function apiSavePageMd(
  id: string,
  title: string,
  bodyMd: string,
  expectedEtag?: string,
): Promise<{ ok: true; etag: string } | { ok: false; reason: 'conflict' }> {
  return saveBodyInternal(id, title, bodyMd, expectedEtag);
}

async function saveBodyInternal(
  id: string,
  title: string,
  bodyMd: string,
  expectedEtag?: string,
): Promise<{ ok: true; etag: string } | { ok: false; reason: 'conflict' }> {
  const itemId = parseInt(id, 10);
  if (!itemId) throw new Error('invalid page id');
  if (expectedEtag) {
    const cur = await fetchOneRow(itemId, 'Modified');
    if (cur && cur.etag && cur.etag !== expectedEtag) return { ok: false, reason: 'conflict' };
  }
  const p = S.meta.pages.find((p) => p.id === id);
  // If the page is currently published, this edit creates a divergence with
  // the Site Page mirror. Mark that *now* (in-memory) so the "公開中" tag
  // can flip to "未反映" before the SP round-trip finishes. We also persist
  // it as a column write — auto-sync on save was removed by design; sync is
  // opt-in via the tag popover.
  if (p) {
    p.title = title;
    if (p.published) p.publishedDirty = true;
  }
  const fields: Record<string, unknown> = { Title: title, Body: bodyMd };
  if (p?.published) fields.PublishedDirty = 1;
  await updateListItem(PAGES_LIST, itemId, fields);
  const fresh = await fetchOneRow(itemId, 'Modified');
  return { ok: true, etag: fresh?.etag || '' };
}

const collectIds = (id: string): string[] => collectDescendantIds(S.pages, id);

/** Hard delete: removes list rows (and the linked DB list, when applicable).
 *  When a page (or descendant) is currently Web-published, the mirrored
 *  Site Page is removed first so we don't leave orphaned `.aspx` files
 *  accessible in SharePoint after the metadata row is gone. */
export async function apiDeletePage(id: string): Promise<string[]> {
  const ids = collectIds(id);
  for (const pid of ids) {
    const meta = S.meta.pages.find((p) => p.id === pid);
    if (meta?.type === 'database' && meta.list) {
      // Drop every row-as-page entry first, then the backing DB list itself
      await deleteAllRowEntriesForList(meta.list).catch(() => undefined);
      await deleteList(meta.list).catch(() => undefined);
    }
    // Cleanup published Site Page mirror BEFORE removing the n365-pages row,
    // because unpublishPage() reads metadata (publishedSitePageId) from it.
    if (meta?.published) {
      const { unpublishPage } = await import('./publish');
      await unpublishPage(pid).catch(() => undefined);
    }
    const itemId = parseInt(pid, 10);
    if (itemId) {
      await deleteListItem(PAGES_LIST, itemId).catch(() => undefined);
    }
  }
  S.meta.pages = S.meta.pages.filter((p) => ids.indexOf(p.id) < 0);
  return ids;
}

export async function apiMovePage(id: string, newParentId: string): Promise<void> {
  if (id === newParentId) return;
  // Prevent cycles
  let p = newParentId;
  while (p) {
    if (p === id) throw new Error('循環参照になります');
    const m = S.meta.pages.find((x) => x.id === p);
    p = m?.parent || '';
  }
  const m = S.meta.pages.find((p) => p.id === id);
  if (!m) return;
  m.parent = newParentId || '';
  const itemId = parseInt(id, 10);
  if (itemId) await updateListItem(PAGES_LIST, itemId, { ParentId: newParentId || '' });
  const pg = S.pages.find((x) => x.Id === id);
  if (pg) pg.ParentId = newParentId || '';
}

export async function apiTrashPage(id: string): Promise<void> {
  const ids = collectIds(id);
  const ts = Date.now();
  for (const pid of ids) {
    const meta = S.meta.pages.find((p) => p.id === pid);
    if (meta) meta.trashed = ts;
    const itemId = parseInt(pid, 10);
    if (itemId) await updateListItem(PAGES_LIST, itemId, { Trashed: ts }).catch(() => undefined);
  }
}

export async function apiRestorePage(id: string): Promise<void> {
  const ids = collectIds(id);
  for (const pid of ids) {
    const meta = S.meta.pages.find((p) => p.id === pid);
    if (meta) delete meta.trashed;
    const itemId = parseInt(pid, 10);
    if (itemId) await updateListItem(PAGES_LIST, itemId, { Trashed: 0 }).catch(() => undefined);
  }
}

export async function apiPurgePage(id: string): Promise<string[]> {
  return apiDeletePage(id);
}

export async function apiSetPin(id: string, pinned: boolean): Promise<void> {
  const meta = S.meta.pages.find((p) => p.id === id);
  if (!meta) return;
  if (pinned) meta.pinned = true;
  else delete meta.pinned;
  const itemId = parseInt(id, 10);
  if (itemId) await updateListItem(PAGES_LIST, itemId, { Pinned: pinned ? 1 : 0 });
}

export async function apiSetIcon(id: string, emoji: string): Promise<void> {
  const meta = S.meta.pages.find((p) => p.id === id);
  if (meta) meta.icon = emoji;
  const itemId = parseInt(id, 10);
  if (itemId) await updateListItem(PAGES_LIST, itemId, { Icon: emoji });
}

/** Persist title-only metadata change (used when title is edited live).
 *  When the page is currently Web-published, also flag PublishedDirty so the
 *  「公開中」 tag flips to 「未反映」 — the Site Page mirror's banner now
 *  shows a stale title until the user explicitly re-syncs. */
export async function apiSetTitle(id: string, title: string): Promise<void> {
  const meta = S.meta.pages.find((p) => p.id === id);
  if (meta) {
    meta.title = title;
    if (meta.published) meta.publishedDirty = true;
  }
  const itemId = parseInt(id, 10);
  if (itemId) {
    const fields: Record<string, unknown> = { Title: title };
    if (meta?.published) fields.PublishedDirty = 1;
    await updateListItem(PAGES_LIST, itemId, fields);
  }
}

// ── DB row-as-page bodies ─────────────────────────────────
//
// A "row" entry in n365-pages has PageType='row', ListTitle=<db list>, and
// DbRowId=<row item id>. Title is mirrored from the DB row for human readability
// in SP UI; the canonical title still lives on the DB row itself.

/** Find every n365-pages row matching (PageType='row', listTitle, dbRowId).
 *  Returns multiple in case a prior race created duplicates; callers can
 *  pick a canonical winner and clean up the rest. Sorted by Id ascending. */
async function findRowEntries(
  listTitle: string,
  dbRowId: number,
): Promise<Array<{ id: number; etag: string }>> {
  const filter = "PageType eq 'row' and ListTitle eq '" + listTitle.replace(/'/g, "''") +
    "' and DbRowId eq " + dbRowId;
  const url = spListUrl(PAGES_LIST,
    '/items?$select=Id&$filter=' + encodeURIComponent(filter) + '&$orderby=Id&$top=20');
  const d = await spGetD<{ results: Array<{ Id: number; __metadata?: { etag?: string } }> }>(url);
  if (!d) return [];
  return d.results.map((r) => ({ id: r.Id, etag: r.__metadata?.etag || '' }));
}

async function findRowEntry(listTitle: string, dbRowId: number): Promise<{ id: number; etag: string } | null> {
  const all = await findRowEntries(listTitle, dbRowId);
  return all[0] || null;
}

/** Read the markdown body for a DB row from the n365-pages list. */
export async function getRowBody(listTitle: string, dbRowId: number): Promise<string> {
  await ensurePagesList();
  const hit = await findRowEntry(listTitle, dbRowId);
  if (!hit) return '';
  const fetched = await fetchOneRow(hit.id, 'Body');
  return fetched?.row.Body || '';
}

/** Upsert (title, body) for a DB row's page entry in n365-pages.
 *
 *  Race handling: SP has no unique constraint on (ListTitle, DbRowId), so a
 *  concurrent caller could create a parallel `PageType='row'` entry between
 *  our find and create. We mitigate by:
 *    1. Re-fetching after create and deduplicating to the lowest-Id entry.
 *    2. Keeping `findRowEntry` deterministic (orderby Id asc) so subsequent
 *       getters consistently pick the same canonical row.
 */
export async function setRowBody(
  listTitle: string,
  dbRowId: number,
  parentDbId: string,
  title: string,
  body: string,
): Promise<void> {
  await ensurePagesList();
  const hits = await findRowEntries(listTitle, dbRowId);
  if (hits.length >= 1) {
    // Update canonical (lowest Id) entry.
    await updateListItem(PAGES_LIST, hits[0].id, { Title: title, Body: body });
    // Best-effort cleanup of any duplicates accumulated by past races.
    for (let i = 1; i < hits.length; i++) {
      await deleteListItem(PAGES_LIST, hits[i].id).catch(() => undefined);
    }
    return;
  }
  await createListItem(PAGES_LIST, {
    Title: title,
    ParentId: parentDbId || '',
    PageType: 'row',
    ListTitle: listTitle,
    DbRowId: dbRowId,
    Body: body,
  });
  // Post-create reconciliation: if a concurrent caller raced us, multiple
  // entries now exist. Keep the lowest Id (deterministic across tabs) and
  // delete the rest.
  const after = await findRowEntries(listTitle, dbRowId);
  if (after.length > 1) {
    // Make sure the surviving canonical entry has our latest body — the
    // older entry might be stale.
    await updateListItem(PAGES_LIST, after[0].id, { Title: title, Body: body }).catch(() => undefined);
    for (let i = 1; i < after.length; i++) {
      await deleteListItem(PAGES_LIST, after[i].id).catch(() => undefined);
    }
  }
}

/** Delete the n365-pages entry for a DB row, if present. Removes ALL
 *  matching entries in case duplicates accumulated. */
export async function deleteRowEntry(listTitle: string, dbRowId: number): Promise<void> {
  const hits = await findRowEntries(listTitle, dbRowId);
  for (const h of hits) {
    await deleteListItem(PAGES_LIST, h.id).catch(() => undefined);
  }
}

/** Delete every n365-pages entry that points at a given DB list (used when the DB itself is removed). */
export async function deleteAllRowEntriesForList(listTitle: string): Promise<void> {
  await ensurePagesList();
  const filter = "PageType eq 'row' and ListTitle eq '" + listTitle.replace(/'/g, "''") + "'";
  const url = spListUrl(PAGES_LIST, '/items?$select=Id&$filter=' + encodeURIComponent(filter) + '&$top=500');
  const d = await spGetD<{ results: Array<{ Id: number }> }>(url);
  if (!d) return;
  for (const it of d.results) {
    await deleteListItem(PAGES_LIST, it.Id).catch(() => undefined);
  }
}
