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
  updateListItemIfMatch,
  deleteListItem,
  deleteList,
  getListItems,
  setColumnIndexed,
  applyOwnerOnlyAcl,
} from './sp-list';
import { spListUrl, spGetD } from './sp-rest';
import { mdToBlocks, blocksToMd } from '../lib/blocks-md';
import { blocksToHtml } from '../lib/blocks-html';
import type { Block } from '../lib/blocks';
import { collectDescendantIds } from '../lib/page-tree';
import { getCurrentUserId } from './sync';
import { invalidateBacklinkCache } from './backlinks';
import { removePages, metaById} from '../lib/page-store';

/** Org-shared pages list. Anything `Scope='org'` lives here (visible to
 *  the whole workspace). Phase 3 split: this is the workspace-shared
 *  half; user-scope pages live in per-user lists (see `getMyPagesList`).
 *
 *  Row entries (`PageType='row'` — internal DB-row body metadata)
 *  also live here unconditionally: they're not user-facing pages, so
 *  the per-user split doesn't apply to them. */
export const ORG_PAGES_LIST = 'memola-pages';

/** Per-user pages list name. Computed from `S.meta.myUserId` when
 *  cached (set by `apiGetPages` at startup). Falls back to
 *  `ORG_PAGES_LIST` BEFORE bootstrap — pre-bootstrap operations end up
 *  on the shared list, which is intentional (everything boots into a
 *  consistent state and post-bootstrap calls route correctly). */
export function getMyPagesList(): string {
  const id = S.meta.myUserId;
  if (id) return 'memola-user-' + id + '-pages';
  return ORG_PAGES_LIST;
}

/** Pick the right list for a given page scope. `'user'` → per-user
 *  list, `'org'` → org-shared list. */
export function pagesListFor(scope: PageScope): string {
  return scope === 'user' ? getMyPagesList() : ORG_PAGES_LIST;
}

/** Resolve which SP list backs the given page id. Looks up
 *  `S.meta.pages` to derive scope; falls back to `ORG_PAGES_LIST` for
 *  unknown ids (= legacy / pre-bootstrap reads).
 *
 *  Note: this resolves by *the current user's view*. A page authored
 *  by user A with scope='user' lives in A's list; if user B somehow
 *  has its meta cached (they shouldn't — apiGetPages filters), this
 *  helper would still route to "my user list", which would 404. The
 *  privacy filter in `apiGetPages` ensures user-scope rows in the
 *  meta cache always belong to the current user. */
export function listForPageId(pageId: string): string {
  // Codex review PS1: explicit source-list mapping wins over
  // scope-derived routing. The loader (apiGetPages) records each
  // pageId's source list at read time; that's authoritative for
  // existing rows. When the mapping is missing (e.g. brand-new pages
  // not yet observed by a load), fall back to scope-derived routing.
  const explicit = SOURCE_LIST_BY_PAGEID.get(pageId);
  if (explicit) return explicit;
  const meta = metaById(pageId);
  if (!meta) return ORG_PAGES_LIST;
  return pagesListFor(meta.scope === 'org' ? 'org' : 'user');
}

export interface PageRow {
  Id: number;
  Title?: string;
  ParentId?: string;
  PageType?: string;        // 'page' | 'database' | 'row' | 'draft'
  Icon?: string;
  Pinned?: number;
  Trashed?: number;
  ListTitle?: string;       // for 'database': backing list name; for 'row': owning DB list
  DbRowId?: number;         // for 'row': item id within the DB list
  /** Block-tree JSON — Phase 2 canonical body store. Contents are
   *  `JSON.stringify(Block[])`. Markdown remains a boundary format
   *  (AI tool I/F, paste, export) but isn't persisted. */
  Body_blocks?: string;
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
 *  'user' = personal to the creator. Phase 3: this drives STORAGE
 *  routing, not just metadata — `pagesListFor(scope)` sends 'org' pages
 *  to the shared `memola-pages` list and 'user' pages to the per-user
 *  `memola-user-{id}-pages` list, which `provisionOnePagesList` locks
 *  to the owner via `applyOwnerOnlyAcl` (= real SP-layer privacy).
 *  apiGetPages does a union read over both lists; `filterVisiblePages`
 *  additionally hides other users' user-scope rows that leak into the
 *  cache. Empty Scope = legacy row, treated as 'user' (secure-by-default). */
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
  ['ListTitle', 2], ['DbRowId', 9],
  // Phase 2: block-tree JSON canonical body. The legacy 'Body' (markdown)
  // column is no longer required — pre-prod data is throwaway, so we
  // simply stop reading/writing it. The column may linger on the SP
  // list but isn't enforced.
  ['Body_blocks', 3],
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

/** Provision a single pages list (org or per-user) with its columns and
 *  indexed fields. Same shape for both list flavours — only the list
 *  title differs. Throws if any required column is still missing after
 *  the field-add pass. */
async function provisionOnePagesList(listTitle: string): Promise<void> {
  const wasNew = !((await spGetD<unknown>(spListUrl(listTitle))) != null);
  if (wasNew) await createList(listTitle);
  const titles = await listFieldTitles(listTitle);
  const need = async (n: string, kind: number): Promise<void> => {
    if (titles.has(n)) return;
    try { await addListField(listTitle, n, kind); titles.add(n); }
    catch { /* tolerate failure; verified below */ }
  };
  // Run sequentially to avoid digest churn / race
  for (const [name, kind] of REQUIRED_FIELDS) {
    await need(name, kind);
  }
  // Verify schema completeness — re-fetch field titles in case `titles`
  // got out of sync (e.g. another tab added a column concurrently).
  const finalTitles = await listFieldTitles(listTitle);
  const missing = REQUIRED_FIELDS.filter(([n]) => !finalTitles.has(n)).map(([n]) => n);
  if (missing.length > 0) {
    throw new Error(listTitle + ' の必須列が不足しています: ' + missing.join(', '));
  }
  // Mark filter-critical columns as indexed so $filter queries scale
  // past the 5,000-row LVT. Idempotent — SP no-ops on already-indexed
  // columns. Failures are non-fatal (the app still works at <5K rows).
  for (const col of INDEXED_COLUMNS) {
    await setColumnIndexed(listTitle, col).catch(() => undefined);
  }
  // Phase 3 ACL: lock per-user lists down to the owner only.
  //
  // Codex review P3: re-apply ACL on EVERY ensure pass for per-user
  // lists, not only when `wasNew`. If list creation succeeded but a
  // subsequent step (column add, indexing) threw, the next ensure
  // would have `wasNew=false` and the ACL was previously skipped —
  // leaving the list created but wide-open. ACL ops are idempotent
  // on SP (already-broken inheritance / already-granted role return
  // benign errors that `applyOwnerOnlyAcl` tolerates).
  const userIdMatch = listTitle.match(/^memola-user-(\d+)-pages$/);
  if (userIdMatch) {
    const userId = parseInt(userIdMatch[1], 10);
    await applyOwnerOnlyAcl(listTitle, userId);
  }
}

/** Idempotently create both the org-shared pages list AND the current
 *  user's per-user pages list (when the user id is known). Resilient
 *  to transient field-add failures: clears the cached promise on
 *  failure so the next call retries.
 *
 *  Phase 3: when `S.meta.myUserId` is set (= apiGetPages has run at
 *  least once), this provisions `'memola-user-' + myUserId + '-pages'`
 *  alongside the org list. Pre-bootstrap calls only provision the org
 *  list, which is fine because pre-bootstrap operations route through
 *  the org list anyway (see `getMyPagesList`). */
export async function ensurePagesList(): Promise<void> {
  if (_ensurePromise) return _ensurePromise;
  _ensurePromise = (async () => {
    await provisionOnePagesList(ORG_PAGES_LIST);
    const myList = getMyPagesList();
    if (myList !== ORG_PAGES_LIST) {
      await provisionOnePagesList(myList);
    }
  })().catch((e) => {
    // Allow the next caller to retry. Without this, a single transient
    // failure (e.g. digest expiry, network blip) wedged the whole session.
    _ensurePromise = null;
    throw e;
  });
  return _ensurePromise;
}

async function listFieldTitles(listTitle: string): Promise<Set<string>> {
  const d = await spGetD<{ results: { Title: string; InternalName: string }[] }>(
    spListUrl(listTitle, '/fields?$select=Title,InternalName'),
  );
  const s = new Set<string>();
  d?.results.forEach((f) => { s.add(f.Title); s.add(f.InternalName); });
  return s;
}

/** Filter raw memola-pages rows down to what the given user should see.
 *
 *  - PageType='row' (internal DB-row body metadata) is always excluded
 *    — those are looked up on demand via getRowBody / setRowBody.
 *  - Drafts (PageType='draft' OR OriginPageId set for legacy rows) are
 *    private to their author.
 *  - Pages with `Scope='user'` are visible only to their author.
 *    Codex review PS5: rows with empty `Scope` are also treated as
 *    user-scope (= private). The create-path defaults Scope to 'user',
 *    so any empty value is a legacy row predating Phase 3 — and the
 *    pre-launch convention is "no migration, secure-by-default". The
 *    earlier `return true` for empty-Scope leaked personal/draft rows.
 *  - Only `Scope === 'org'` is treated as org-shared.
 *  - When `myUserId === 0` (self resolution failed) we lean toward
 *    leaking rather than losing data — the user sees more than they
 *    "should" but no edits go missing.
 *
 *  Pure: doesn't mutate `items` and doesn't read any module state. */
export function filterVisiblePages(items: PageRow[], myUserId: number): PageRow[] {
  return items.filter((it) => {
    if (it.PageType === 'row') return false;
    const isDraft = it.PageType === 'draft' || !!it.OriginPageId;
    if (isDraft) {
      if (myUserId === 0) return true;
      return it.AuthorId === myUserId;
    }
    if (it.Scope === 'org') return true;
    // Default = user-scope (private). Includes Scope='user' AND legacy
    // empty Scope.
    if (myUserId === 0) return true;
    return it.AuthorId === myUserId;
  });
}

function rowToMeta(row: PageRow): PageMeta {
  return rowToMetaWithId(row, String(row.Id));
}

/** Codex review PS1: rowToMeta variant that takes the chosen pageId
 *  externally (the loader picks composite or numeric per collision). */
function rowToMetaWithId(row: PageRow, pageId: string): PageMeta {
  const m: PageMeta = {
    id: pageId,
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

/** Read a single page row. Takes a `pageId` (string) so the list can be
 *  resolved per-page — Phase 3 routes user-scope pages to per-user
 *  lists. Empty/unparseable ids return null. */
async function fetchOneRow(pageId: string, select?: string): Promise<FetchedRow | null> {
  const itemId = pageIdToItemId(pageId);
  if (!itemId) return null;
  const sel = select || 'Id,Title,ParentId,PageType,Icon,Pinned,Trashed,ListTitle,DbRowId,Body_blocks,Published,PublishedUrl,PublishedPageId,PublishedDirty,OriginDailyDate,OriginPageId,Scope,AuthorId,TrashedBy,Modified,Editor/Title';
  // Only $expand=Editor when an Editor sub-field is in $select; otherwise SP
  // returns 400 (expand without matching select).
  const expandPart = /\bEditor\//.test(sel) ? '&$expand=Editor' : '';
  const url = spListUrl(listForPageId(pageId), '/items(' + itemId + ')?$select=' +
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

/** Codex review PS1: itemId-collision detection. When the org list and
 *  per-user list contain rows with the same numeric SP item id, the
 *  meta cache (keyed by `String(id)`) used to silently drop one. After
 *  this pass, every meta row is keyed by the full PS1 composite form
 *  `${listTitle}:${itemId}` if and only if a collision exists for that
 *  itemId — non-colliding rows keep their plain numeric id form for
 *  source-compatibility with the rest of the codebase.
 *
 *  PS1 full form (= every pageId is composite, no exceptions) is
 *  deferred to its own focused refactor; this opportunistic form fixes
 *  the actual data-shadowing collision without churning every call
 *  site that does `parseInt(pageId, 10)`. */
const SOURCE_LIST_BY_PAGEID = new Map<string, string>();

export function buildSourceListMap(buckets: { list: string; rows: PageRow[] }[]): {
  rowToPageId: Map<PageRow, string>;
  sourceListByPageId: Map<string, string>;
} {
  const rowToPageId = new Map<PageRow, string>();
  const sourceListByPageId = new Map<string, string>();
  // Tally numeric-id occurrences across buckets — a numeric id present
  // in ≥2 buckets requires composite-key minting.
  const byNumericId = new Map<number, Array<{ list: string; row: PageRow }>>();
  for (const bucket of buckets) {
    for (const row of bucket.rows) {
      const arr = byNumericId.get(row.Id) || [];
      arr.push({ list: bucket.list, row });
      byNumericId.set(row.Id, arr);
    }
  }
  for (const [num, entries] of byNumericId) {
    if (entries.length === 1) {
      const { list, row } = entries[0];
      const pid = String(num);
      rowToPageId.set(row, pid);
      sourceListByPageId.set(pid, list);
    } else {
      // Collision — mint composite ids for all of them.
      for (const { list, row } of entries) {
        const pid = list + ':' + num;
        rowToPageId.set(row, pid);
        sourceListByPageId.set(pid, list);
      }
    }
  }
  return { rowToPageId, sourceListByPageId };
}

/** Pure inverse of the pageId-minting in `buildSourceListMap`: given the
 *  pageId→sourceList map plus a row's source list + numeric item id,
 *  return the SAME pageId that minting assigned. Returns the composite
 *  `list:num` when that numeric id collided across lists, else the bare
 *  `num`. Exported for unit tests. */
export function resolvePageId(
  sourceListByPageId: Map<string, string>,
  sourceList: string,
  numericId: number,
): string {
  const bare = String(numericId);
  if (sourceListByPageId.get(bare) === sourceList) return bare;
  const composite = sourceList + ':' + numericId;
  if (sourceListByPageId.get(composite) === sourceList) return composite;
  return bare;
}

/** Resolve a (source list, numeric item id) pair to the canonical pageId
 *  that `apiGetPages` recorded in `S.meta.pages` — so callers like the
 *  backlinks scan can hand the result to `doSelect` and actually
 *  navigate. Without this, a backlink source page that got a composite
 *  id (its numeric id collided across the org + per-user lists, which is
 *  the common case since each SP list numbers items from 1) would be
 *  addressed by its bare numeric id, which `S.pages` doesn't contain →
 *  doSelect no-ops and the click appears dead.
 *
 *  Falls back to the bare id when the row isn't part of the current
 *  union view (e.g. filtered out) — doSelect then correctly no-ops. */
export function pageIdForListItem(sourceList: string, numericId: number): string {
  return resolvePageId(SOURCE_LIST_BY_PAGEID, sourceList, numericId);
}

/** Refresh `S.meta.pages` from the union of the org-shared list and
 *  the current user's per-user list. `S.pages` is a derived view that
 *  picks up the change automatically — callers don't need to capture
 *  the return value (it's `S.pages` for legacy callers that expect an
 *  array, but `await apiGetPages()` followed by reading `S.pages` is
 *  the new pattern). */
export async function apiGetPages(): Promise<Page[]> {
  // Resolve the SP user id FIRST so `getMyPagesList()` (consulted by
  // ensurePagesList → provisionOnePagesList for the per-user list)
  // returns the right name. Cache it for downstream helpers
  // (`listForPageId`, `pagesListFor`) that route writes by scope.
  const myId = await getCurrentUserId().catch(() => 0);
  S.meta.myUserId = myId || 0;
  await ensurePagesList();
  // Phase 3 union read: pages live in the org-shared list (Scope='org')
  // OR in the current user's per-user list (Scope='user'). Read both
  // in parallel and merge. When myUserId can't be resolved we fall
  // back to a single-list read against the org list — the user sees a
  // degraded view but doesn't lose data.
  const myList = getMyPagesList();
  const buckets: { list: string; rows: PageRow[] }[] = [
    { list: ORG_PAGES_LIST, rows: (await getListItems(ORG_PAGES_LIST)) as unknown as PageRow[] },
  ];
  if (myList !== ORG_PAGES_LIST) {
    const myRows = await getListItems(myList).catch(() => [] as unknown[]);
    buckets.push({ list: myList, rows: myRows as unknown as PageRow[] });
  }
  // Codex review PS1: detect itemId collisions across lists and mint
  // composite pageIds where needed.
  const { rowToPageId, sourceListByPageId } = buildSourceListMap(buckets);
  SOURCE_LIST_BY_PAGEID.clear();
  for (const [pid, list] of sourceListByPageId) SOURCE_LIST_BY_PAGEID.set(pid, list);
  const items = buckets.flatMap((b) => b.rows);
  const topLevel = filterVisiblePages(items, myId);
  S.meta.pages = topLevel.map((row) => rowToMetaWithId(row, rowToPageId.get(row) ?? String(row.Id)));
  // S.pages getter recomputes from meta.pages — return the current
  // value for legacy callers (the assignment is a no-op via the setter).
  return S.pages;
}

/** Codex review PS1: parse a pageId that may be either plain numeric
 *  (`'42'`, the original form) or composite (`'memola-pages:42'`).
 *  Returns the numeric SP itemId portion. Used by every caller that
 *  needs to talk to the SP REST API. */
export function pageIdToItemId(pageId: string): number {
  const colon = pageId.lastIndexOf(':');
  const numericPart = colon >= 0 ? pageId.substring(colon + 1) : pageId;
  return parseInt(numericPart, 10);
}

export function getTrashedPages(): Array<{ id: string; title: string; trashed: number; type?: string }> {
  return S.meta.pages
    .filter((p) => p.trashed)
    .map((p) => ({ id: p.id, title: p.title, trashed: p.trashed!, type: p.type }))
    .sort((a, b) => b.trashed - a.trashed);
}

/** Parse the Body_blocks JSON string into Block[]. Tolerates legacy /
 *  empty values (returns []). The string form is the Saver's body
 *  representation — opaque to the Saver, parsed at the boundaries. */
export function parseBlocksJson(json: string | undefined | null): Block[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed as Block[] : [];
  } catch {
    return [];
  }
}

/** Serialize Block[] to the canonical JSON string. Stable across
 *  saves so the Saver's `===` dirty check works as expected. */
export function serializeBlocks(blocks: Block[]): string {
  return JSON.stringify(blocks);
}

export async function apiLoadContent(id: string): Promise<string> {
  const r = await fetchOneRow(id, 'Body_blocks');
  const blocks = parseBlocksJson(r?.row.Body_blocks);
  return blocksToHtml(blocks);
}

/** Raw markdown body — used by export/duplicate paths that don't want
 *  HTML. Phase 2: derived from Body_blocks via blocksToMd at the
 *  boundary; the canonical store is JSON, markdown is generated on
 *  demand for AI / export consumers. */
export async function apiLoadRawBody(id: string): Promise<string> {
  const r = await fetchOneRow(id, 'Body_blocks');
  return blocksToMd(parseBlocksJson(r?.row.Body_blocks));
}

/** Block-tree body — Phase 2 canonical form. Returns the JSON string
 *  as stored on SP (= what the Saver carries as its body).
 *  Codex review P6: normalise empty / missing values to the canonical
 *  `'[]'` so the Saver's string-equality dirty check doesn't see
 *  `''` as different from `'[]'` (= an empty page would otherwise
 *  appear dirty on every load). */
export async function apiLoadBlocksBody(id: string): Promise<string> {
  const r = await fetchOneRow(id, 'Body_blocks');
  const raw = r?.row.Body_blocks;
  if (!raw) return '[]';
  // Validate: if it doesn't parse as an array, fall back to canonical empty.
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return '[]';
  } catch { return '[]'; }
  return raw;
}

export async function apiLoadFileMeta(id: string): Promise<{ modified: string; etag: string } | null> {
  const r = await fetchOneRow(id, 'Modified');
  return r ? { modified: r.modified, etag: r.etag } : null;
}

/** Atomic Body_blocks + Modified + ETag fetch.
 *
 *  Use this from page-open paths instead of calling apiLoadContent and then
 *  apiLoadFileMeta separately. Two separate GETs leave a window where another
 *  user can write between them, producing a stale-Body / fresh-ETag pair —
 *  the next save would then pass `If-Match: <fresh ETag>` and silently
 *  overwrite the foreign edit because SP sees no conflict.
 *
 *  Returns the raw block-tree JSON in `body` so callers can capture
 *  it as the Saver's baseline. `html` is derived for the editor.
 *
 *  Returns null if the row doesn't exist. */
export async function apiLoadContentMeta(
  id: string,
): Promise<{ html: string; body: string; modified: string; etag: string } | null> {
  const r = await fetchOneRow(id, 'Body_blocks,Modified');
  if (!r) return null;
  // Codex review P6: normalise the body to the canonical empty form
  // so the Saver baseline matches what the editor will produce on a
  // pristine empty page. Without this, an empty page would appear
  // dirty immediately after load (`''` !== `'[]'`).
  const raw = r.row.Body_blocks || '';
  const blocks = parseBlocksJson(raw);
  const json = serializeBlocks(blocks);
  return {
    html: blocksToHtml(blocks),
    body: json,                  // Saver baseline (opaque JSON string)
    modified: r.modified,
    etag: r.etag,
  };
}


/** Single funnel for ALL writes against the memola-pages list.
 *
 *  Every memola-pages mutation (body, title, icon, pinned, parent, trashed,
 *  published flags, …) goes through this helper. After the SP write
 *  succeeds, we read back the new ETag/Modified and update
 *  `S.sync.loadedEtag` / `loadedModified` so the foreground poller
 *  doesn't see our own write as foreign.
 *
 *  Takes a `pageId` (string — the canonical page identity used everywhere
 *  in the app), parses + list-resolves internally. Empty / unparseable
 *  ids are no-ops, so callers don't need their own `if (itemId)` guard. */
export async function updatePageRow(
  pageId: string,
  fields: Record<string, unknown>,
): Promise<void> {
  const itemId = pageIdToItemId(pageId);
  if (!itemId) return;
  const list = listForPageId(pageId);
  await updateListItem(list, itemId, fields);
  try {
    const fresh = await fetchOneRow(pageId, 'Modified');
    if (fresh && S.sync.pageId === pageId) {
      S.sync.loadedEtag = fresh.etag;
      S.sync.loadedModified = fresh.modified;
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
  const list = pagesListFor(scope);
  const created = await createListItem(list, {
    Title: title,
    ParentId: parentId || '',
    PageType: 'page',
    Icon: '',
    Pinned: 0,
    Trashed: 0,
    Body_blocks: '[]',
    Scope: scope,
  });
  const id = String(created.Id);
  // Codex review PS1: register the newly-created row's source list so
  // listForPageId routes correctly even before the next apiGetPages refresh.
  SOURCE_LIST_BY_PAGEID.set(id, list);
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
  const list = pagesListFor(scope);
  const created = await createListItem(list, {
    Title: title,
    ParentId: parentId || '',
    PageType: 'database',
    Icon: '',
    Pinned: 0,
    Trashed: 0,
    ListTitle: listTitle,
    Body_blocks: '[]',
    Scope: scope,
  });
  const id = String(created.Id);
  SOURCE_LIST_BY_PAGEID.set(id, list);
  S.meta.pages.push({
    id, title, parent: parentId || '',
    type: 'database', list: listTitle, icon: '', scope,
  });
  return { Id: id, Title: title, ParentId: parentId || '', Type: 'database' };
}

/** Save a page's title + body. Phase 2: the body parameter is the
 *  Saver's body string, which is `JSON.stringify(Block[])` (the
 *  canonical block-tree storage form). Boundary callers (AI, export,
 *  daily-convert) that have markdown should use `apiSavePageMd`,
 *  which converts md → blocks at the boundary. */
export async function apiSavePageBlocks(
  id: string,
  title: string,
  blocksJson: string,
  expectedEtag?: string,
): Promise<{ ok: true; etag: string } | { ok: false; reason: 'conflict' }> {
  return saveBodyInternal(id, title, blocksJson, expectedEtag);
}

/** Save with a markdown body — converts md → blocks at the boundary
 *  before writing. Used by AI tool I/F, daily→page conversion, and
 *  draft-apply paths that don't have a Block[] handy. */
export async function apiSavePageMd(
  id: string,
  title: string,
  bodyMd: string,
  expectedEtag?: string,
): Promise<{ ok: true; etag: string } | { ok: false; reason: 'conflict' }> {
  // Convert md → blocks here. We don't yet have access to the previous
  // saved blocks (= no stable-id matching), so the produced blocks have
  // fresh ids. That's fine for first-write or AI-replace flows; for
  // user-edit flows the editor uses apiSavePageBlocks directly with a
  // pre-stabilized payload.
  const blocks = mdToBlocks(bodyMd);
  return saveBodyInternal(id, title, serializeBlocks(blocks), expectedEtag);
}

async function saveBodyInternal(
  id: string,
  title: string,
  blocksJson: string,
  expectedEtag?: string,
): Promise<{ ok: true; etag: string } | { ok: false; reason: 'conflict' }> {
  const itemId = pageIdToItemId(id);
  if (!itemId) throw new Error('invalid page id');
  const p = metaById(id);
  const published = !!p?.published;
  const fields: Record<string, unknown> = { Title: title, Body_blocks: blocksJson };
  if (published) fields.PublishedDirty = 1;

  if (expectedEtag) {
    // Atomic optimistic concurrency: SharePoint rejects the write with
    // 412 if the row advanced since `expectedEtag` was read. This closes
    // the TOCTOU window that the old read-then-compare (fetch etag →
    // compare → blind validateUpdate) left open — two concurrent saves
    // could both pass the compare and the second would clobber the first.
    const list = listForPageId(id);
    const res = await updateListItemIfMatch(list, itemId, fields, expectedEtag);
    if (!res.ok) return { ok: false, reason: 'conflict' };
  } else {
    // No expected etag = deliberate force-overwrite (conflict modal's
    // 「上書きで保存」). Blind write, no concurrency guard by design.
    await updatePageRow(id, fields);
  }

  // Write succeeded — now reflect it in-memory. (Done AFTER the write so
  // a 412 doesn't leave a phantom title / publishedDirty mark.)
  if (p) {
    p.title = title;
    if (published) p.publishedDirty = true;
  }
  // Refresh the foreground-poll watermark so we don't see our own write
  // as a foreign edit. (updatePageRow does this internally; the If-Match
  // path needs it explicitly.)
  const fresh = await fetchOneRow(id, 'Modified');
  if (fresh && S.sync.pageId === id) {
    S.sync.loadedEtag = fresh.etag;
    S.sync.loadedModified = fresh.modified;
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
    const meta = metaById(id);
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
  const guardMeta = metaById(id);
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
    const meta = metaById(pid);
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
    //    The list is resolved from the pageId — Phase 3 will route
    //    user-scope pages to per-user lists.
    // Use `pageIdToItemId` so composite ids ('memola-pages-user:42')
    // resolve to the numeric SP itemId. `parseInt(pid, 10)` returned
    // NaN for those, so the SP delete was silently skipped and the row
    // re-surfaced on next reload.
    const itemId = pageIdToItemId(pid);
    if (itemId) {
      await deleteListItem(listForPageId(pid), itemId).catch(() => undefined);
    }
    // 3. Best-effort cleanup of orphan storage. If we crash here, the
    //    SP list and row bodies persist as unreachable garbage — they
    //    no longer break the UI but they consume storage. A future
    //    "garbage collection" pass could clean these up by scanning
    //    for memola-db-* lists not referenced by any registration row.
    if (dbListToCleanup) {
      const { deleteAllRowEntriesForList } = await import('./page-row-entries');
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
  removePages(ids);
  return ids;
}

export async function apiMovePage(id: string, newParentId: string): Promise<void> {
  if (id === newParentId) return;
  // Prevent cycles
  let p = newParentId;
  while (p) {
    if (p === id) throw new Error('循環参照になります');
    const m = metaById(p);
    p = m?.parent || '';
  }
  const m = metaById(id);
  if (!m) return;
  m.parent = newParentId || '';
  await updatePageRow(id, { ParentId: newParentId || '' });
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
  const child = metaById(childId);
  const parent = metaById(newParentId);
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
  const guardMeta = metaById(id);
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
    const meta = metaById(pid);
    if (meta) { meta.trashed = ts; meta.trashedBy = myId; }
    await updatePageRow(pid, { Trashed: ts, TrashedBy: myId }).catch(() => undefined);
  }
}

export async function apiRestorePage(id: string): Promise<void> {
  const ids = collectIds(id);
  // If we just restored the daily DB, drop the cache so the bootstrap
  // re-resolves the (now-active again) page id instead of falling into
  // its "create new" branch on the next note open.
  await maybeInvalidateDailyCache(ids);
  for (const pid of ids) {
    const meta = metaById(pid);
    if (meta) { delete meta.trashed; delete meta.trashedBy; }
    await updatePageRow(pid, { Trashed: 0, TrashedBy: 0 }).catch(() => undefined);
  }
}

export async function apiPurgePage(id: string): Promise<string[]> {
  return apiDeletePage(id);
}

export async function apiSetPin(id: string, pinned: boolean): Promise<void> {
  const meta = metaById(id);
  if (!meta) return;
  if (pinned) meta.pinned = true;
  else delete meta.pinned;
  await updatePageRow(id, { Pinned: pinned ? 1 : 0 });
}

export async function apiSetIcon(id: string, emoji: string): Promise<void> {
  const meta = metaById(id);
  if (meta) meta.icon = emoji;
  await updatePageRow(id, { Icon: emoji });
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
    const m = metaById(id);
    if (m?.type === 'database' && m.list === 'memola-daily') {
      throw new Error('デイリーノート DB は組織に公開できません (個人専用)');
    }
  }
  const ids = cascadeChildren ? collectIds(id) : [id];
  // Codex review PS2: capture the source list BEFORE mutating meta,
  // then update on the source list, THEN flip meta. The previous
  // sequence (mutate meta → updatePageRow → listForPageId(meta)) sent
  // the write to the destination list (= the new scope's list), where
  // the row didn't yet exist — silently 404'd via the .catch and left
  // a memory-only scope change that vanished on next reload.
  //
  // Cross-list migration of the row itself (= delete from old, create
  // in new) is deferred to PS1 (pageId GUID redesign). For now the row
  // stays in its origin list with the new Scope field; the SP-side
  // ACL of the origin list still applies, so an org->user demotion
  // doesn't accidentally widen access — and a user->org promotion is
  // limited to the author until proper migration lands.
  for (const pid of ids) {
    const sourceList = listForPageId(pid);
    // Composite ids ('memola-pages-user:42') need pageIdToItemId; the
    // raw `parseInt` returned NaN and silently skipped the SP write.
    const itemId = pageIdToItemId(pid);
    if (!itemId) continue;
    try {
      await updateListItem(sourceList, itemId, { Scope: scope });
    } catch { /* tolerate transient failure; meta update below kept consistent */ }
    const meta = metaById(pid);
    if (meta) meta.scope = scope;
  }
  return ids;
}

/** Persist title-only metadata change (used when title is edited live).
 *  When the page is currently Web-published, also flag PublishedDirty so the
 *  「公開中」 tag flips to 「未反映」 — the Site Page mirror's banner now
 *  shows a stale title until the user explicitly re-syncs. */
export async function apiSetTitle(id: string, title: string): Promise<void> {
  const meta = metaById(id);
  if (meta) {
    meta.title = title;
    if (meta.published) meta.publishedDirty = true;
  }
  const fields: Record<string, unknown> = { Title: title };
  if (meta?.published) fields.PublishedDirty = 1;
  await updatePageRow(id, fields);
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
  const origin = metaById(originId);
  if (!origin) throw new Error('原本ページが見つかりません');
  // Copy the origin's block-tree JSON directly — preserving structure
  // (and block IDs, which is fine for drafts since the draft is a
  // separate row that won't be merged with the origin).
  const blocksJson = await apiLoadBlocksBody(originId);
  const draftTitle = '[下書き] ' + (origin.title || '無題');
  // Drafts inherit the origin's scope so a personal draft of an org page
  // doesn't accidentally become globally visible (and vice versa).
  const inheritScope: PageScope = origin.scope || 'user';
  const inheritList = pagesListFor(inheritScope);
  const created = await createListItem(inheritList, {
    Title: draftTitle,
    // ParentId is intentionally empty so drafts never appear as a child of
    // anything in the regular page tree (defence-in-depth on top of the
    // IsDraft filter in tree.ts / search-ui / page-picker).
    ParentId: '',
    PageType: 'draft',
    Icon: '✏️',
    Pinned: 0,
    Trashed: 0,
    Body_blocks: blocksJson || '[]',
    OriginPageId: originId,
    Scope: inheritScope,
  });
  const newId = String(created.Id);
  SOURCE_LIST_BY_PAGEID.set(newId, inheritList);
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
  const draftMeta = metaById(draftId);
  if (!draftMeta) throw new Error('下書きが見つかりません');
  if (!draftMeta.originPageId) throw new Error('このページは下書きではありません');
  const originId = draftMeta.originPageId;
  const originExists = S.meta.pages.find((p) => p.id === originId && !p.trashed);
  if (!originExists) throw new Error('原本ページが見つかりません (削除済み?)');

  // Fetch the draft's title + body-as-blocks-JSON, write to origin.
  // We copy the JSON directly (no md round-trip) so the draft's
  // structure / block IDs are preserved exactly.
  const draftBody = await apiLoadBlocksBody(draftId);
  const draftTitleRaw = draftMeta.title.replace(/^\[下書き\]\s*/, '');
  const result = await saveBodyInternal(originId, draftTitleRaw, draftBody || '[]');
  if (!result.ok) throw new Error('原本の更新に失敗しました (競合)');

  // Drop the draft itself
  await apiDeletePage(draftId).catch(() => undefined);
  return originId;
}

// Row entries (PageType='row' — internal DB-row body metadata) live in
// `./page-row-entries.ts`. Re-export here so existing call sites keep
// `from '../api/pages'`.
export {
  getRowBody,
  setRowBody,
  deleteRowEntry,
  deleteAllRowEntriesForList,
} from './page-row-entries';
