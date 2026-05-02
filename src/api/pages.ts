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

/** Idempotently create the n365-pages list and its columns. */
async function ensurePagesList(): Promise<void> {
  if (_ensurePromise) return _ensurePromise;
  _ensurePromise = (async () => {
    const exists = (await spGetD<unknown>(spListUrl(PAGES_LIST))) != null;
    if (!exists) await createList(PAGES_LIST);
    const titles = await listFieldTitles();
    const need = async (n: string, kind: number): Promise<void> => {
      if (titles.has(n)) return;
      try { await addListField(PAGES_LIST, n, kind); titles.add(n); }
      catch { /* tolerate failure; subsequent runs retry */ }
    };
    // Run sequentially to avoid digest churn / race
    await need('ParentId', 2);
    await need('PageType', 2);
    await need('Icon', 2);
    await need('Pinned', 9);
    await need('Trashed', 9);
    await need('ListTitle', 2);
    await need('DbRowId', 9);
    await need('Body', 3);
    await need('Published', 9);
    await need('PublishedUrl', 3);
    await need('PublishedPageId', 9);
    await need('PublishedDirty', 9);
  })();
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

/** Save with raw markdown (used by AI tool path; avoids lossy md↔HTML round-trip). */
export async function apiSavePageMd(
  id: string,
  title: string,
  bodyMd: string,
): Promise<{ ok: true; etag: string } | { ok: false; reason: 'conflict' }> {
  return saveBodyInternal(id, title, bodyMd);
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

/** Hard delete: removes list rows (and the linked DB list, when applicable). */
export async function apiDeletePage(id: string): Promise<string[]> {
  const ids = collectIds(id);
  for (const pid of ids) {
    const meta = S.meta.pages.find((p) => p.id === pid);
    if (meta?.type === 'database' && meta.list) {
      // Drop every row-as-page entry first, then the backing DB list itself
      await deleteAllRowEntriesForList(meta.list).catch(() => undefined);
      await deleteList(meta.list).catch(() => undefined);
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

/** Persist title-only metadata change (used when title is edited live). */
export async function apiSetTitle(id: string, title: string): Promise<void> {
  const meta = S.meta.pages.find((p) => p.id === id);
  if (meta) meta.title = title;
  const itemId = parseInt(id, 10);
  if (itemId) await updateListItem(PAGES_LIST, itemId, { Title: title });
}

// ── DB row-as-page bodies ─────────────────────────────────
//
// A "row" entry in n365-pages has PageType='row', ListTitle=<db list>, and
// DbRowId=<row item id>. Title is mirrored from the DB row for human readability
// in SP UI; the canonical title still lives on the DB row itself.

async function findRowEntry(listTitle: string, dbRowId: number): Promise<{ id: number; etag: string } | null> {
  const filter = "PageType eq 'row' and ListTitle eq '" + listTitle.replace(/'/g, "''") +
    "' and DbRowId eq " + dbRowId;
  const url = spListUrl(PAGES_LIST, '/items?$select=Id&$filter=' + encodeURIComponent(filter) + '&$top=1');
  const d = await spGetD<{ results: Array<{ Id: number; __metadata?: { etag?: string } }> }>(url);
  const hit = d?.results[0];
  if (!hit) return null;
  return { id: hit.Id, etag: hit.__metadata?.etag || '' };
}

/** Read the markdown body for a DB row from the n365-pages list. */
export async function getRowBody(listTitle: string, dbRowId: number): Promise<string> {
  await ensurePagesList();
  const hit = await findRowEntry(listTitle, dbRowId);
  if (!hit) return '';
  const fetched = await fetchOneRow(hit.id, 'Body');
  return fetched?.row.Body || '';
}

/** Upsert (title, body) for a DB row's page entry in n365-pages. */
export async function setRowBody(
  listTitle: string,
  dbRowId: number,
  parentDbId: string,
  title: string,
  body: string,
): Promise<void> {
  await ensurePagesList();
  const hit = await findRowEntry(listTitle, dbRowId);
  if (hit) {
    await updateListItem(PAGES_LIST, hit.id, { Title: title, Body: body });
  } else {
    await createListItem(PAGES_LIST, {
      Title: title,
      ParentId: parentDbId || '',
      PageType: 'row',
      ListTitle: listTitle,
      DbRowId: dbRowId,
      Body: body,
    });
  }
}

/** Delete the n365-pages entry for a DB row, if present. */
export async function deleteRowEntry(listTitle: string, dbRowId: number): Promise<void> {
  const hit = await findRowEntry(listTitle, dbRowId);
  if (hit) await deleteListItem(PAGES_LIST, hit.id).catch(() => undefined);
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
