// Pages stored as rows in a single SharePoint list `memola-pages`.
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
  setColumnIndexed,
} from './sp-list';
import { spListUrl, spGetD } from './sp-rest';
import { mdToHtml, htmlToMd } from '../lib/markdown';
import { collectDescendantIds } from '../lib/page-tree';
import { getCurrentUserId } from './sync';
import { invalidateBacklinkCache } from './backlinks';

export const PAGES_LIST = 'memola-pages';

interface PageRow {
  Id: number;
  Title?: string;
  ParentId?: string;
  PageType?: string;        // 'page' | 'database' | 'row' | 'draft'
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
  OriginDailyDate?: string; // for converted pages: the original YYYY-MM-DD
  OriginPageId?: string;    // for "draft of …" duplicates: id of the origin page
  AuthorId?: number;        // SP user id of the row creator (auto-populated)
  Scope?: string;           // 'org' = 組織共通 / 'user' = 個人 (default 'user' on creation)
  TrashedBy?: number;       // SP user id of who set the Trashed flag (= deleter)
}

/** Page-scope discriminator. 'org' = visible to everyone in the workspace,
 *  'user' = personal to the creator. The current architecture uses one
 *  shared `memola-pages` list, so this column is metadata only — UI can
 *  filter on it (`Scope eq 'user' AND AuthorId eq <me>` for "my pages")
 *  but doesn't yet enforce any permissions at the SP layer. The column
 *  is in place so that a future Phase 2 (split into `-org` / `-user-{id}`
 *  lists) can migrate items by reading this flag. */
export type PageScope = 'org' | 'user';

let _ensurePromise: Promise<void> | null = null;

/** Drop the cached "we've already provisioned memola-pages" promise. Called
 *  when switching workspaces — the new site may not yet have the list. */
export function clearPagesCache(): void {
  _ensurePromise = null;
}

/** Required columns for the memola-pages list. Kept in one place so
 *  ensurePagesList can verify completeness after column-add attempts. */
const REQUIRED_FIELDS: Array<[string, number]> = [
  ['ParentId', 2], ['PageType', 2], ['Icon', 2], ['Pinned', 9], ['Trashed', 9],
  ['ListTitle', 2], ['DbRowId', 9], ['Body', 3],
  ['Published', 9], ['PublishedUrl', 3], ['PublishedPageId', 9], ['PublishedDirty', 9],
  ['OriginDailyDate', 2],
  ['OriginPageId', 2],
  ['Scope', 2],                  // 'org' | 'user' — see PageScope type
  ['TrashedBy', 9],              // SP user id of who soft-deleted this row
];

/** Columns to mark `Indexed=true` after schema provisioning. Indexing the
 *  filter columns lets `findRowEntries` / `deleteAllRowEntriesForList` etc.
 *  scale beyond the 5,000-row List View Threshold (LVT). Note (multi-line
 *  text) columns can't be indexed, so `Body` is intentionally absent. */
const INDEXED_COLUMNS = ['ListTitle', 'DbRowId', 'PageType', 'Scope', 'Trashed', 'TrashedBy'];

/** Idempotently create the memola-pages list and its columns. Resilient to
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
      throw new Error('memola-pages の必須列が不足しています: ' + missing.join(', '));
    }
    // Mark filter-critical columns as indexed so $filter queries scale
    // past the 5,000-row LVT. Idempotent — SP no-ops on already-indexed
    // columns. Failures are non-fatal (the app still works at <5K rows).
    for (const col of INDEXED_COLUMNS) {
      await setColumnIndexed(PAGES_LIST, col).catch(() => undefined);
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
  if (row.OriginDailyDate) m.originDailyDate = row.OriginDailyDate;
  if (row.OriginPageId) m.originPageId = row.OriginPageId;
  if (row.Scope === 'org' || row.Scope === 'user') m.scope = row.Scope;
  if (row.AuthorId) m.authorId = row.AuthorId;
  if (row.TrashedBy) m.trashedBy = row.TrashedBy;
  return m;
}

interface FetchedRow {
  row: PageRow;
  etag: string;
  modified: string;
  editor: string;
}

async function fetchOneRow(itemId: number, select?: string): Promise<FetchedRow | null> {
  const sel = select || 'Id,Title,ParentId,PageType,Icon,Pinned,Trashed,ListTitle,DbRowId,Body,Published,PublishedUrl,PublishedPageId,PublishedDirty,OriginDailyDate,OriginPageId,Scope,AuthorId,TrashedBy,Modified,Editor/Title';
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
  // Drafts (PageType='draft') are private to their creator. Hide other
  // users' drafts from this user's view entirely — they shouldn't appear
  // in the tree, search, or even metadata lookups.
  const myId = await getCurrentUserId().catch(() => 0);
  // Cache the resolved id for sync writes (TrashedBy etc.)
  S.meta.myUserId = myId || 0;
  // Keep only top-level entries. Row-as-page (PageType='row') is an internal
  // join with DB rows and is looked up on demand via getRowBody / setRowBody.
  // Other users' drafts are filtered here so they never enter S.meta.pages.
  const topLevel = items.filter((it) => {
    if (it.PageType === 'row') return false;
    // Anything with OriginPageId is a draft (PageType='draft' for new ones,
    // PageType='page' for ones created before the type was introduced).
    // Show only the current user's drafts.
    const isDraft = it.PageType === 'draft' || !!it.OriginPageId;
    if (isDraft) {
      if (myId === 0) return true;     // can't resolve self → leak rather than lose
      return it.AuthorId === myId;
    }
    // Privacy filter: pages with `Scope='user'` are visible only to their
    // creator. Pages with `Scope='org'` (or pre-Scope-column legacy data
    // where Scope is empty) stay visible to everyone.
    if (it.Scope === 'user') {
      if (myId === 0) return true;     // can't resolve self → leak rather than lose
      return it.AuthorId === myId;
    }
    return true;
  });
  S.meta.pages = topLevel.map(rowToMeta);
  return S.meta.pages
    .filter((p) => !p.trashed)
    .map((p) => ({
      Id: p.id,
      Title: p.title,
      ParentId: p.parent || '',
      Type: (p.type || 'page') as 'page' | 'database',
      // Drafts get IsDraft=true so the tree / search / picker can hide them
      // and the drafts modal can find them.
      IsDraft: !!p.originPageId,
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

/** Atomic Body + Modified + ETag fetch.
 *
 *  Use this from page-open paths instead of calling apiLoadContent and then
 *  apiLoadFileMeta separately. Two separate GETs leave a window where another
 *  user can write between them, producing a stale-Body / fresh-ETag pair —
 *  the next save would then pass `If-Match: <fresh ETag>` and silently
 *  overwrite the foreign edit because SP sees no conflict.
 *
 *  Returns the raw markdown body in `body` so callers can capture it as
 *  the `base` input for 3-way merge on later conflicts.
 *
 *  Returns null if the row doesn't exist. */
export async function apiLoadContentMeta(
  id: string,
): Promise<{ html: string; body: string; modified: string; etag: string } | null> {
  const itemId = parseInt(id, 10);
  if (!itemId) return null;
  const r = await fetchOneRow(itemId, 'Body,Modified');
  if (!r) return null;
  const md = r.row.Body || '';
  return {
    html: mdToHtml(md),
    body: md,
    modified: r.modified,
    etag: r.etag,
  };
}

/** After any SP write that advances the row's Modified/ETag, refresh
 *  S.sync watermark for the active page so the foreground poller doesn't
 *  mistake our own write for a remote change.
 *
 *  Callers should `void`-call this — failure is non-fatal (the poller's
 *  own self-edit filter is a backup). Quietly skips when the affected
 *  page isn't the one currently being watched. */
export async function refreshSyncWatermark(pageId: string): Promise<void> {
  if (S.sync.pageId !== pageId) return;
  try {
    const fm = await apiLoadFileMeta(pageId);
    if (fm) {
      S.sync.loadedEtag = fm.etag;
      S.sync.loadedModified = fm.modified;
      rememberOurEtag(fm.etag);
    }
  } catch { /* ignore */ }
}

/** Push an etag we just produced into the "ours" ring buffer. The poll
 *  loop checks this set before surfacing a stale-data banner — anything
 *  in here is a write we made, even if our watermark wasn't updated in
 *  the same code path that did the save. */
export function rememberOurEtag(etag: string): void {
  if (!etag) return;
  const arr = S.sync.ourSavedEtags;
  if (arr.indexOf(etag) >= 0) return;
  arr.push(etag);
  // Bound the list — old etags can be forgotten safely (their SP versions
  // are well in the past).
  if (arr.length > 32) arr.shift();
}

/** Single funnel for ALL writes against the memola-pages list.
 *
 *  Every memola-pages mutation (body, title, icon, pinned, parent, trashed,
 *  published flags, …) MUST go through this helper. After the SP write
 *  succeeds, we read back the new ETag/Modified and remember the ETag in
 *  `ourSavedEtags`. This guarantees the foreground poller never mistakes
 *  one of our own writes for "別のタブで更新".
 *
 *  It also updates `S.sync.loadedEtag` / `loadedModified` when the row
 *  being written is the currently-watched page — keeps the watermark
 *  fresh without each caller needing to remember `refreshSyncWatermark`. */
export async function updatePageRow(
  itemId: number,
  fields: Record<string, unknown>,
): Promise<void> {
  if (!itemId) return;
  await updateListItem(PAGES_LIST, itemId, fields);
  // Stamp the wall-clock time of the write BEFORE the read-back fetch.
  // This is the "we just touched this row" signal the poll loop checks
  // as a defence-in-depth fallback — even if the etag tracking somehow
  // misses (zombie pre-fix instance, format quirk), the recent-write
  // timestamp will suppress the phantom banner.
  if (S.sync.pageId === String(itemId)) {
    S.sync.lastLocalWriteTs = Date.now();
  }
  try {
    const fresh = await fetchOneRow(itemId, 'Modified');
    if (fresh) {
      rememberOurEtag(fresh.etag);
      if (S.sync.pageId === String(itemId)) {
        S.sync.loadedEtag = fresh.etag;
        S.sync.loadedModified = fresh.modified;
      }
    }
  } catch { /* fetch failures are non-fatal — just one phantom risk */ }
}

/** Create a normal page row.
 *
 *  `scope` defaults to 'user' (personal). UIs that distinguish
 *  organisation-shared pages can pass 'org' explicitly. Existing rows
 *  predating the column have empty Scope, which the UI should treat as
 *  'user' for safety. */
export async function apiCreatePage(
  title: string,
  parentId: string,
  scope: PageScope = 'user',
): Promise<Page> {
  await ensurePagesList();
  const created = await createListItem(PAGES_LIST, {
    Title: title,
    ParentId: parentId || '',
    PageType: 'page',
    Icon: '',
    Pinned: 0,
    Trashed: 0,
    Body: '',
    Scope: scope,
  });
  const id = String(created.Id);
  S.meta.pages.push({
    id, title, parent: parentId || '',
    type: 'page', icon: '', scope,
  });
  return { Id: id, Title: title, ParentId: parentId || '', Type: 'page' };
}

/** Create a "database" page row that points to a separate SP list. */
export async function apiCreateDbPageRow(
  title: string,
  parentId: string,
  listTitle: string,
  scope: PageScope = 'user',
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
    Scope: scope,
  });
  const id = String(created.Id);
  S.meta.pages.push({
    id, title, parent: parentId || '',
    type: 'database', list: listTitle, icon: '', scope,
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
  // Body save is also an memola-pages row update — the funnel handles
  // ETag tracking + watermark refresh in one place.
  await updatePageRow(itemId, fields);
  const fresh = await fetchOneRow(itemId, 'Modified');
  // The body we just wrote becomes the new common ancestor for any
  // future conflict on this page. Without this, subsequent saves
  // would diff against the body that was on SP when we OPENED the
  // page — wildly stale after even one edit cycle.
  if (S.sync.pageId === String(itemId)) {
    S.sync.baseBody = bodyMd;
  }
  // Body changed — drop the backlinks cache so the next "リンク元" panel
  // render reflects newly-added / removed `[[..]]` references.
  invalidateBacklinkCache();
  return { ok: true, etag: fresh?.etag || '' };
}

const collectIds = (id: string): string[] => collectDescendantIds(S.pages, id);

/** Drop the daily-DB bootstrap cache (`_ensurePromise` in api/daily.ts) when
 *  any of the given page ids is the daily-DB. Called before / after any
 *  trash / purge / restore on memola-pages so subsequent
 *  `getOrCreateNoteForDate` calls re-resolve the (possibly recreated)
 *  daily DB instead of pointing at a stale id. Dynamic import avoids a
 *  circular dependency (daily.ts imports plenty from this file). */
async function maybeInvalidateDailyCache(ids: string[]): Promise<void> {
  // Hard-coded constant matches DAILY_LIST_TITLE — keeping it in-line
  // avoids importing daily.ts at module top.
  for (const id of ids) {
    const meta = S.meta.pages.find((p) => p.id === id);
    if (meta?.type === 'database' && meta.list === 'memola-daily') {
      const { clearDailyCache } = await import('./daily');
      clearDailyCache();
      return;
    }
  }
}

/** Hard delete: removes list rows (and the linked DB list, when applicable).
 *  When a page (or descendant) is currently Web-published, the mirrored
 *  Site Page is removed first so we don't leave orphaned `.aspx` files
 *  accessible in SharePoint after the metadata row is gone. */
export async function apiDeletePage(id: string): Promise<string[]> {
  // Defence-in-depth: the daily DB cannot be hard-deleted either. (Soft
  // delete via apiTrashPage is also blocked, so this is unreachable in
  // normal flow — but a future caller using apiDeletePage directly
  // shouldn't be able to bypass the guard.)
  const guardMeta = S.meta.pages.find((p) => p.id === id);
  if (guardMeta?.type === 'database' && guardMeta.list === 'memola-daily') {
    throw new Error('デイリーノート DB は削除できません (個人運用に必須)');
  }
  const ids = collectIds(id);
  // Drop the daily-DB bootstrap cache BEFORE we delete the SP list and
  // the meta entry — otherwise `getOrCreateNoteForDate` can still hand
  // out the deleted dbPageId and subsequent row creates write to a
  // non-existent SP list (404) or an orphaned memola-pages row.
  await maybeInvalidateDailyCache(ids);
  // Delete order is chosen for "**worst-case integrity**": if a process
  // dies mid-loop or a SP request fails, the remaining state should be
  // user-INVISIBLE rather than half-broken-and-clickable.
  //   1. Unpublish first (needs metadata that's still on the registration row)
  //   2. Delete the memola-pages registration row → page disappears
  //      from sidebar IMMEDIATELY. Any later step's failure leaves only
  //      orphan data that the user can't see or interact with.
  //   3. Cleanup orphan data (per-DB list rows + the SP list itself).
  // Reverse of the older "rows → list → registration" order, which on
  // partial failure left a clickable DB whose backing list was gone
  // (404 toast on click).
  for (const pid of ids) {
    const meta = S.meta.pages.find((p) => p.id === pid);
    // Capture cleanup target BEFORE any mutation (we still need the list
    // name to delete its rows/list AFTER the registration is gone).
    const dbListToCleanup = (meta?.type === 'database' && meta.list) ? meta.list : null;
    // 1. Unpublish published mirror — must happen before registration
    //    deletion because unpublishPage() reads publishedSitePageId off
    //    the registration row.
    if (meta?.published) {
      const { unpublishPage } = await import('./publish');
      await unpublishPage(pid).catch(() => undefined);
    }
    // 2. Hide the page from the user by removing its registration. Any
    //    later step's failure leaves only invisible orphan data.
    const itemId = parseInt(pid, 10);
    if (itemId) {
      await deleteListItem(PAGES_LIST, itemId).catch(() => undefined);
    }
    // 3. Best-effort cleanup of orphan storage. If we crash here, the
    //    SP list and row bodies persist as unreachable garbage — they
    //    no longer break the UI but they consume storage. A future
    //    "garbage collection" pass could clean these up by scanning
    //    for memola-db-* lists not referenced by any registration row.
    if (dbListToCleanup) {
      await deleteAllRowEntriesForList(dbListToCleanup).catch(() => undefined);
      await deleteList(dbListToCleanup).catch(() => undefined);
    }
  }
  // Drop the purged ids from BOTH state mirrors. Previously only
  // `S.meta.pages` was filtered; `S.pages` was left to whatever the
  // caller did next. When the caller forgets (trash modal's empty path
  // historically did), the tree shows a ghost page whose backing list
  // has been deleted — clicking it tries to load a non-existent SP list,
  // and the title→list mapping appears "shifted" against neighbouring
  // entries. Filtering here keeps both arrays consistent always.
  S.meta.pages = S.meta.pages.filter((p) => ids.indexOf(p.id) < 0);
  S.pages = S.pages.filter((p) => ids.indexOf(p.Id) < 0);
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
  if (itemId) await updatePageRow(itemId, { ParentId: newParentId || '' });
  const pg = S.pages.find((x) => x.Id === id);
  if (pg) pg.ParentId = newParentId || '';
}

/** Compare a candidate child's scope against its proposed parent. Returns
 *  the parent's scope when they differ (caller can use this as the value
 *  to migrate the child to), or `null` when no migration is needed.
 *  - moving to root (no parent): never triggers (root accepts both scopes)
 *  - parent has no scope set:    treat as same-scope (legacy data) */
export function scopeMismatchOnMove(
  childId: string,
  newParentId: string,
): PageScope | null {
  if (!newParentId) return null;
  const child = S.meta.pages.find((p) => p.id === childId);
  const parent = S.meta.pages.find((p) => p.id === newParentId);
  if (!child || !parent) return null;
  const childScope: PageScope = (child.scope === 'org' || child.scope === 'user') ? child.scope : 'user';
  const parentScope: PageScope = (parent.scope === 'org' || parent.scope === 'user') ? parent.scope : 'user';
  return childScope === parentScope ? null : parentScope;
}

export async function apiTrashPage(id: string): Promise<void> {
  // The daily DB is treated as undeletable infrastructure — its presence
  // is what makes 「今日のノート」 work without re-bootstrap. Throwing
  // here is the API-level guard; UI paths block the action with a toast
  // upstream so the user never reaches this throw in normal flow.
  const guardMeta = S.meta.pages.find((p) => p.id === id);
  if (guardMeta?.type === 'database' && guardMeta.list === 'memola-daily') {
    throw new Error('デイリーノート DB は削除できません (個人運用に必須)');
  }
  const ids = collectIds(id);
  // Capture daily-DB-ness BEFORE we mutate meta.trashed — the
  // invalidation helper looks at the meta entry to decide.
  await maybeInvalidateDailyCache(ids);
  const ts = Date.now();
  // Resolve current user id to record as the deleter. 0 = couldn't
  // resolve (= anonymous-ish) → leave TrashedBy=0 so empty-trash treats
  // the entry as belonging to nobody (= won't be hard-deleted by anyone
  // who isn't them; effectively orphaned but recoverable by manual
  // restore).
  const myId = S.meta.myUserId || (await getCurrentUserId().catch(() => 0));
  for (const pid of ids) {
    const meta = S.meta.pages.find((p) => p.id === pid);
    if (meta) { meta.trashed = ts; meta.trashedBy = myId; }
    const itemId = parseInt(pid, 10);
    if (itemId) {
      await updatePageRow(itemId, { Trashed: ts, TrashedBy: myId }).catch(() => undefined);
    }
  }
}

export async function apiRestorePage(id: string): Promise<void> {
  const ids = collectIds(id);
  // If we just restored the daily DB, drop the cache so the bootstrap
  // re-resolves the (now-active again) page id instead of falling into
  // its "create new" branch on the next note open.
  await maybeInvalidateDailyCache(ids);
  for (const pid of ids) {
    const meta = S.meta.pages.find((p) => p.id === pid);
    if (meta) { delete meta.trashed; delete meta.trashedBy; }
    const itemId = parseInt(pid, 10);
    if (itemId) {
      await updatePageRow(itemId, { Trashed: 0, TrashedBy: 0 }).catch(() => undefined);
    }
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
  if (itemId) await updatePageRow(itemId, { Pinned: pinned ? 1 : 0 });
}

export async function apiSetIcon(id: string, emoji: string): Promise<void> {
  const meta = S.meta.pages.find((p) => p.id === id);
  if (meta) meta.icon = emoji;
  const itemId = parseInt(id, 10);
  if (itemId) await updatePageRow(itemId, { Icon: emoji });
}

/** Change a page's `Scope` ('user' / 'org'). Cascades to all descendants
 *  by default so a subtree always belongs to a single scope — a personal
 *  child under an org parent is the kind of inconsistency the UI's
 *  cross-scope move dialog is meant to prevent.
 *
 *  Refuses to set scope='org' on the daily DB (= the registration row
 *  whose `list='memola-daily'`). Daily notes are inherently personal
 *  scratch space — exposing them to the org would leak private notes,
 *  and the per-user daily DB design (Phase 1) implicitly assumes scope
 *  stays 'user'. The UI blocks the action upstream, but this API guard
 *  is the last line of defence (e.g. AI tools, future scripts).
 *
 *  Returns the affected ids (caller can use this to re-render or to know
 *  what was touched). */
export async function apiSetScope(
  id: string,
  scope: PageScope,
  cascadeChildren = true,
): Promise<string[]> {
  if (scope === 'org') {
    const m = S.meta.pages.find((p) => p.id === id);
    if (m?.type === 'database' && m.list === 'memola-daily') {
      throw new Error('デイリーノート DB は組織に公開できません (個人専用)');
    }
  }
  const ids = cascadeChildren ? collectIds(id) : [id];
  for (const pid of ids) {
    const meta = S.meta.pages.find((p) => p.id === pid);
    if (meta) meta.scope = scope;
    const itemId = parseInt(pid, 10);
    if (itemId) await updatePageRow(itemId, { Scope: scope }).catch(() => undefined);
  }
  return ids;
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
    await updatePageRow(itemId, fields);
  }
}

// ── Draft-as-page (duplicate to draft / apply to origin) ──
//
// Workflow: user picks 「下書きとして複製」 on a regular page X. We create
// a new page Y with PageType='page' (regular page so it can be edited
// normally), but with OriginPageId=X.id stored on it. The editor renders
// a banner on Y offering 「原本に適用」 — that copies Y's body back into
// X (preserving X's id, so any [[X]] page-links remain valid) and deletes
// Y. This is the safer alternative to "duplicate / edit / delete original
// / swap" which would break inbound page-links.

/** Create a draft duplicate of `originId` for the user to edit safely.
 *  Returns the new page so the caller can navigate to it immediately. */
export async function apiDuplicateAsDraft(originId: string): Promise<Page> {
  await ensurePagesList();
  const origin = S.meta.pages.find((p) => p.id === originId);
  if (!origin) throw new Error('原本ページが見つかりません');
  const body = await apiLoadRawBody(originId);
  const draftTitle = '[下書き] ' + (origin.title || '無題');
  const created = await createListItem(PAGES_LIST, {
    Title: draftTitle,
    // ParentId is intentionally empty so drafts never appear as a child of
    // anything in the regular page tree (defence-in-depth on top of the
    // IsDraft filter in tree.ts / search-ui / page-picker).
    ParentId: '',
    PageType: 'draft',
    Icon: '✏️',
    Pinned: 0,
    Trashed: 0,
    Body: body,
    OriginPageId: originId,
    // Drafts inherit the origin's scope so a personal draft of an org page
    // doesn't accidentally become globally visible (and vice versa).
    Scope: origin.scope || 'user',
  });
  const newId = String(created.Id);
  S.meta.pages.push({
    id: newId,
    title: draftTitle,
    parent: '',
    type: 'page',
    icon: '✏️',
    originPageId: originId,
  });
  return { Id: newId, Title: draftTitle, ParentId: '', Type: 'page', IsDraft: true };
}

/** Apply a draft's contents to its origin page, preserving the origin's
 *  id (so inbound [[..]] page-links remain valid). The draft itself is
 *  then deleted. Returns the origin id so the caller can navigate. */
export async function apiApplyDraftToOrigin(draftId: string): Promise<string> {
  const draftMeta = S.meta.pages.find((p) => p.id === draftId);
  if (!draftMeta) throw new Error('下書きが見つかりません');
  if (!draftMeta.originPageId) throw new Error('このページは下書きではありません');
  const originId = draftMeta.originPageId;
  const originExists = S.meta.pages.find((p) => p.id === originId && !p.trashed);
  if (!originExists) throw new Error('原本ページが見つかりません (削除済み?)');

  // Fetch the draft's title + body and write them to the origin in one
  // shot. Use the Md save path so the published-state machinery (Web 公開
  // の dirty フラグ等) fires the same as a regular save.
  const draftBody = await apiLoadRawBody(draftId);
  const draftTitleRaw = draftMeta.title.replace(/^\[下書き\]\s*/, '');
  const result = await saveBodyInternal(originId, draftTitleRaw, draftBody);
  if (!result.ok) throw new Error('原本の更新に失敗しました (競合)');

  // Drop the draft itself
  await apiDeletePage(draftId).catch(() => undefined);
  return originId;
}

// ── DB row-as-page bodies ─────────────────────────────────
//
// A "row" entry in memola-pages has PageType='row', ListTitle=<db list>, and
// DbRowId=<row item id>. Title is mirrored from the DB row for human readability
// in SP UI; the canonical title still lives on the DB row itself.

/** Find every memola-pages row matching (PageType='row', listTitle, dbRowId).
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

/** Read the markdown body for a DB row from the memola-pages list. */
export async function getRowBody(listTitle: string, dbRowId: number): Promise<string> {
  await ensurePagesList();
  const hit = await findRowEntry(listTitle, dbRowId);
  if (!hit) return '';
  const fetched = await fetchOneRow(hit.id, 'Body');
  return fetched?.row.Body || '';
}

/** Upsert (title, body) for a DB row's page entry in memola-pages.
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
    await updatePageRow(hits[0].id, { Title: title, Body: body });
    // Best-effort cleanup of any duplicates accumulated by past races.
    for (let i = 1; i < hits.length; i++) {
      await deleteListItem(PAGES_LIST, hits[i].id).catch(() => undefined);
    }
    return;
  }
  // DB row body inherits the parent DB's scope so a row in an org DB
  // is org-scoped, and a row in a personal DB is personal-scoped.
  const parentMeta = parentDbId ? S.meta.pages.find((p) => p.id === parentDbId) : null;
  const inheritScope: PageScope = parentMeta?.scope || 'user';
  await createListItem(PAGES_LIST, {
    Title: title,
    ParentId: parentDbId || '',
    PageType: 'row',
    ListTitle: listTitle,
    DbRowId: dbRowId,
    Body: body,
    Scope: inheritScope,
  });
  // Post-create reconciliation: if a concurrent caller raced us, multiple
  // entries now exist. Keep the lowest Id (deterministic across tabs) and
  // delete the rest.
  const after = await findRowEntries(listTitle, dbRowId);
  if (after.length > 1) {
    // Make sure the surviving canonical entry has our latest body — the
    // older entry might be stale.
    await updatePageRow(after[0].id, { Title: title, Body: body }).catch(() => undefined);
    for (let i = 1; i < after.length; i++) {
      await deleteListItem(PAGES_LIST, after[i].id).catch(() => undefined);
    }
  }
}

/** Delete the memola-pages entry for a DB row, if present. Removes ALL
 *  matching entries in case duplicates accumulated. */
export async function deleteRowEntry(listTitle: string, dbRowId: number): Promise<void> {
  const hits = await findRowEntries(listTitle, dbRowId);
  for (const h of hits) {
    await deleteListItem(PAGES_LIST, h.id).catch(() => undefined);
  }
}

/** Delete every memola-pages entry that points at a given DB list (used when the DB itself is removed). */
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
