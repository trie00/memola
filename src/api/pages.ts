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
  getListItemById,
  setColumnIndexed,
  setListVersionLimit,
  applyOwnerOnlyAcl,
} from './sp-list';
import { spListUrl, spGetD } from './sp-rest';
import { SP_VERSION_LIMIT, SITE } from '../config';
import { logOp } from './oplog';
import { mdToBlocks, blocksToMd } from '../lib/blocks-md';
import { blocksToHtml } from '../lib/blocks-html';
import type { Block, Inline } from '../lib/blocks';
import { collectDescendantIds } from '../lib/page-tree';
import { getCurrentUserId } from './sync';
import { invalidateBacklinkCache } from './backlinks';
import { prefLastSeenEtag } from '../lib/prefs';
import { removePages, metaById, setMetaPages } from '../lib/page-store';

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
  OriginBaseBlocks?: string; // for 'draft': origin body snapshot at creation (3-way merge base)
  Scope?: string;           // 'org' = 組織共通 / 'user' = 個人 (default 'user' on creation)
  TrashedBy?: number;       // SP user id of who set the Trashed flag (= deleter)
  IsTemplate?: number;      // 1 = reusable template row (hidden from tree/library/search)
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
  ['IsTemplate', 9],             // 1 = this row is a reusable template (hidden from normal views)
  ['OriginBaseBlocks', 3],       // for 'draft': snapshot of the origin's body at draft-creation (3-way merge base)
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
  // Cap version retention so frequent autosaves don't bury pages under
  // unbounded SP versions (best-effort; the app works without it).
  await setListVersionLimit(listTitle, SP_VERSION_LIMIT).catch(() => undefined);
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
    // 権限継承の切断(breakroleinheritance)は「権限の管理(Manage Permissions)」
    // 権限が必要で、通常のメンバー/編集者ユーザーでは 403 になる。これは SP層の
    // 付加的なプライバシー(defence-in-depth)であり、プライベート表示はクライアント
    // 側フィルタ(filterVisiblePages)で担保されるため、失敗しても致命にせず継続する
    // (= 別ユーザーがアプリを使えなくならないように)。
    await applyOwnerOnlyAcl(listTitle, userId).catch((e) => {
      // eslint-disable-next-line no-console
      console.warn('[memola] per-user リストの権限設定をスキップ(権限不足の可能性): ' + (e as Error).message);
    });
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
  if (row.IsTemplate && row.IsTemplate > 0) m.isTemplate = true;
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
  const sel = select || 'Id,Title,ParentId,PageType,Icon,Pinned,Trashed,ListTitle,DbRowId,Body_blocks,Published,PublishedUrl,PublishedPageId,PublishedDirty,OriginDailyDate,OriginPageId,Scope,AuthorId,TrashedBy,IsTemplate,Modified,Editor/Title';
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

/** 作成時に buildSourceListMap と **同一規則** で app pageId を採番する。
 *  org → bare `num` / per-user → `list:num`(composite)。
 *  これを使わず bare 固定にすると、per-user ページで「作成時 id(bare)」と
 *  「reconcile 時 id(composite)」が食い違い、pending-create が収束できず左ペインに
 *  同一ページが重複(増殖)する。全 create 経路はこれを使うこと。 */
export function mintPageId(sourceList: string, numericId: number | string): string {
  return sourceList === ORG_PAGES_LIST ? String(numericId) : sourceList + ':' + numericId;
}

export function buildSourceListMap(buckets: { list: string; rows: PageRow[] }[]): {
  rowToPageId: Map<PageRow, string>;
  sourceListByPageId: Map<string, string>;
} {
  const rowToPageId = new Map<PageRow, string>();
  const sourceListByPageId = new Map<string, string>();
  // DETERMINISTIC, STABLE ids (was: opportunistic composite-on-collision).
  //   - org list rows  → bare `num`  (shared list → identical id for all users)
  //   - per-user rows  → `list:num`  (composite, always)
  // These two id-spaces can never collide (number vs prefixed string), so a
  // page's id is FIXED regardless of what the other list contains. The old
  // "mint composite only when a number appears in both lists" scheme made an
  // org page flip `5` ⇆ `memola-pages:5` the moment another user's per-user
  // list happened to contain item 5 — which silently re-keyed the OPEN page
  // on the next refresh, so the live-sync / saver started reading/writing a
  // DIFFERENT SP row (another page's body bleeding in, phantom duplicates).
  for (const bucket of buckets) {
    for (const row of bucket.rows) {
      const pid = mintPageId(bucket.list, row.Id); // 採番規則は mintPageId に一本化
      rowToPageId.set(row, pid);
      sourceListByPageId.set(pid, bucket.list);
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

/** DB行ページを通常ページと同じ保存/読込経路に載せるため、行 pageId(例
 *  `memola-db-…:5`)→そのDBリスト の対応を登録する。listForPageId がこれを見て
 *  apiLoadContentMeta / apiSavePageBlocks を正しいリストへルーティングできる。 */
export function registerPageSourceList(pageId: string, list: string): void {
  SOURCE_LIST_BY_PAGEID.set(pageId, list);
}

/** Stable, USER-INDEPENDENT key for a page, used to anchor comments so they
 *  are shared correctly across users. The app's `pageId` can differ per
 *  user (numeric-id collisions with each user's per-user list mint a
 *  composite id for one user but not another), so keying comments by it
 *  would hide A's comment from B. This key is always `<sourceList>:<itemId>`
 *  — identical for everyone for an org page (it lives in `memola-pages` with
 *  the same SP item id for all). */
export function pageCommentKey(pageId: string): string {
  return listForPageId(pageId) + ':' + pageIdToItemId(pageId);
}

/** Inverse of `pageCommentKey`: resolve a comment key back to THIS user's
 *  app pageId (for navigation). Returns '' for `row:` keys (DB-row detail
 *  pages — handled separately). */
export function appIdForCommentKey(key: string): string {
  if (!key || key.startsWith('row:')) return '';
  const ci = key.lastIndexOf(':');
  if (ci <= 0) return key;
  return pageIdForListItem(key.slice(0, ci), parseInt(key.slice(ci + 1), 10));
}

/** Columns the startup page load needs — everything `rowToMetaWithId`,
 *  `filterVisiblePages` and `buildSourceListMap` read, and deliberately
 *  NOT `Body_blocks`. Without a `$select`, SP returns every column incl.
 *  each page's full body (potentially hundreds of KB per row), which the
 *  tree / library / search never use at startup — bodies are fetched
 *  lazily by `fetchOneRow` only when a page is opened. Trimming the body
 *  here is the single biggest cut to the boot payload. */
const PAGE_META_SELECT =
  'Id,Title,ParentId,PageType,Icon,Pinned,Trashed,ListTitle,DbRowId,' +
  'Published,PublishedUrl,PublishedPageId,PublishedDirty,OriginDailyDate,' +
  'OriginPageId,Scope,AuthorId,TrashedBy,IsTemplate';

// ── Concurrency guards for the page store ────────────────
//
// `apiGetPages` does a FULL REPLACE of `S.meta.pages`. Run naively it
// races (a) other apiGetPages calls (two clobbers interleaving) and (b)
// local optimistic mutations + SharePoint read-after-write lag (a row
// created/deleted ms ago may not yet be reflected). Both produced the
// "page duplicates / self-nests / vanishes / title reverts" corruption.

// ── per-id pending op state machine (v5) ───────────────────────────────
// 各 pageId につき「自分が出した未確定の操作」をちょうど1つだけ持つ。
// reconcile はこれを SP スナップショットに重ねて適用する。クリアは「時間」
// ではなく「SP が結果を正に観測した(収束)」ときだけ(負の証拠で進めない)。
//   create       : SP がまだ返さなくても保持。SP に出現したらクリア。
//   delete-soft  : ゴミ箱(Trashed)。SP がまだ Trashed=0 でも trashed を強制。
//                  SP が Trashed>0 を観測したらクリア。
//   delete-purge : 完全削除(行は物理削除)。SP がまだ返してもツリーから除外。
//                  連続 absentReads>=2 (= 確定不在) でクリア。
//   restore      : ゴミ箱から復元。SP が untrashed を観測したらクリア。
type PendingState = 'create' | 'delete-soft' | 'delete-purge' | 'restore';
interface PendingOp { state: PendingState; at: number; absentReads?: number }
const _pending = new Map<string, PendingOp>();
// create/restore の安全弁: SP 書込失敗でロールバックされなかった等で永久に
// 収束しない事故を防ぐため、長め(5分)で自動失効。delete は失効させない(正観測のみ)。
const PENDING_SAFETY_MS = 5 * 60_000;

export function markPendingCreate(pageId: string): void { _pending.set(pageId, { state: 'create', at: Date.now() }); }
/** delete 時は同 id の他状態(create 等)を上書きで消す(per-id 単一状態)。 */
export function markPendingDelete(pageId: string, purge: boolean): void {
  _pending.set(pageId, { state: purge ? 'delete-purge' : 'delete-soft', at: Date.now() });
}
export function markPendingRestore(pageId: string): void { _pending.set(pageId, { state: 'restore', at: Date.now() }); }
export function clearPending(pageId: string): void { _pending.delete(pageId); }
/** 旧名: 作成の保護。呼び出し側互換のため alias として維持。 */
export function markRecentlyCreated(pageId: string): void { markPendingCreate(pageId); }

/** While this window is active the periodic tree refresh skips its clobber,
 *  so it can't interleave with an in-flight create / move / scope migration
 *  (which would otherwise surface a transient duplicate or drop the op). */
let _structuralUntil = 0;
export function markStructuralOp(ms = 5000): void { _structuralUntil = Math.max(_structuralUntil, Date.now() + ms); }
export function isStructuralOpActive(): boolean { return Date.now() < _structuralUntil; }

/** Serialize apiGetPages: each call runs after the previous finishes (fresh
 *  read each time), so two full-store clobbers never interleave and a
 *  refresh queued after a structural op observes the post-op state. */
let _getPagesChain: Promise<unknown> = Promise.resolve();

/** Refresh `S.meta.pages` from the union of the org-shared list and the
 *  current user's per-user list. Serialized + merges optimistic creates. */
export function apiGetPages(): Promise<Page[]> {
  const run = _getPagesChain.then(() => apiGetPagesImpl(), () => apiGetPagesImpl());
  _getPagesChain = run.catch(() => undefined);
  return run;
}

async function apiGetPagesImpl(): Promise<Page[]> {
  // Resolve the SP user id FIRST so `getMyPagesList()` returns the right name.
  const myId = await getCurrentUserId().catch(() => 0);
  S.meta.myUserId = myId || 0;
  await ensurePagesList();
  const myList = getMyPagesList();

  // ── 完全成功読みゲート ──
  // 必要な全リストを例外なく取り切れたときだけ reconcile を進める。1つでも
  // 失敗したらローカルを上書きしない(現状維持)。空配列での全消去を禁止。
  let orgRows: PageRow[];
  try {
    orgRows = (await getListItems(ORG_PAGES_LIST, PAGE_META_SELECT)) as unknown as PageRow[];
  } catch {
    return S.pages; // org 取得失敗 → 上書きしない
  }
  const buckets: { list: string; rows: PageRow[] }[] = [{ list: ORG_PAGES_LIST, rows: orgRows }];
  if (myList !== ORG_PAGES_LIST) {
    try {
      const myRows = (await getListItems(myList, PAGE_META_SELECT)) as unknown as PageRow[];
      buckets.push({ list: myList, rows: myRows });
    } catch {
      return S.pages; // 個人リスト取得失敗 → 上書きしない(空で消さない)
    }
  }

  // Capture the pre-rebuild source map so re-attached pending pages keep
  // correct list routing even though we clear+rebuild below.
  const prevSource = new Map(SOURCE_LIST_BY_PAGEID);
  const { rowToPageId, sourceListByPageId } = buildSourceListMap(buckets);
  SOURCE_LIST_BY_PAGEID.clear();
  for (const [pid, list] of sourceListByPageId) SOURCE_LIST_BY_PAGEID.set(pid, list);
  const items = buckets.flatMap((b) => b.rows);
  // raw メタ(trashed も含む — Trashed を正観測して tombstone を解除するため)。
  const rawMetas = filterVisiblePages(items, myId)
    .map((row) => rowToMetaWithId(row, rowToPageId.get(row) ?? String(row.Id)));
  const byId = new Map(rawMetas.map((m) => [m.id, m] as const));

  // ── pending の収束判定(正観測でのみクリア。負の証拠で進めない) ──
  const now = Date.now();
  for (const [id, op] of _pending) {
    const row = byId.get(id);
    if (op.state === 'create') {
      if (row || now - op.at >= PENDING_SAFETY_MS) clearPending(id);
    } else if (op.state === 'restore') {
      if ((row && !row.trashed) || now - op.at >= PENDING_SAFETY_MS) clearPending(id);
    } else if (op.state === 'delete-soft') {
      if (row && row.trashed) clearPending(id);                 // Trashed 正観測 → 収束
      else if (!row) { op.absentReads = (op.absentReads ?? 0) + 1; if (op.absentReads >= 2) clearPending(id); }
      else op.absentReads = 0;                                  // まだ Trashed=0(伝播待ち)
    } else if (op.state === 'delete-purge') {
      if (!row) { op.absentReads = (op.absentReads ?? 0) + 1; if (op.absentReads >= 2) clearPending(id); }
      else op.absentReads = 0;                                  // まだ存在(stale) → 抑制継続
    }
  }

  // ── pending を SP スナップショットに重ねて結果を組む(優先: delete > create/restore > SP) ──
  const result: PageMeta[] = [];
  for (const m of rawMetas) {
    const op = _pending.get(m.id);
    if (op && (op.state === 'delete-purge')) continue;          // 完全削除 → 除外
    if (op?.state === 'delete-soft' && !m.trashed) m.trashed = op.at; // 伝播前でも trashed 強制
    if (op?.state === 'restore' && m.trashed) delete m.trashed;       // 復元を強制
    result.push(m);
  }
  // SP にまだ出ていない自分の create/restore/soft-delete をローカルから補完。
  // (present = SP から既に出た id。重複の最終排除は setMetaPages が一括で行う)
  const present = new Set(result.map((m) => m.id));
  for (const [id, op] of _pending) {
    if (present.has(id) || op.state === 'delete-purge') continue;
    const prev = S.meta.pages.find((p) => p.id === id);
    if (!prev) continue;
    const clone: PageMeta = { ...prev };
    if (op.state === 'delete-soft' && !clone.trashed) clone.trashed = op.at;
    if (op.state === 'restore') delete clone.trashed;
    result.push(clone);
    SOURCE_LIST_BY_PAGEID.set(id, prevSource.get(id) || pagesListFor(clone.scope === 'org' ? 'org' : 'user'));
  }
  setMetaPages(result); // 単一チョークポイントで id 一意化して確定

  // Lazy GC of the current user's orphaned private comments (best-effort).
  void import('./comments').then((m) =>
    m.gcMyOrphanComments(new Set(S.meta.pages.map((p) => pageCommentKey(p.id))))).catch(() => undefined);
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

export async function apiLoadFileMeta(
  id: string,
): Promise<{ modified: string; etag: string; trashed: number } | null> {
  const r = await fetchOneRow(id, 'Modified,Trashed');
  if (!r) return null;
  const t = (r.row as unknown as { Trashed?: number }).Trashed;
  return { modified: r.modified, etag: r.etag, trashed: typeof t === 'number' ? t : 0 };
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
    if (fresh) {
      if (S.sync.pageId === pageId) {
        S.sync.loadedEtag = fresh.etag;
        S.sync.loadedModified = fresh.modified;
      }
      // The current user just wrote this row (rename / move / pin / icon /
      // trash). Advance the since-last-view marker too, so re-opening the
      // page later doesn't pop a 「前回の表示以降に誰かが更新しました」 banner
      // for our OWN metadata change. Body saves are covered separately by
      // saver-bridge; this is the metadata-write equivalent. Keyed by
      // pageId regardless of whether the page is currently open, since the
      // notification fires on the NEXT load.
      if (fresh.etag) prefLastSeenEtag(pageId).set(fresh.etag);
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
    AuthorId: S.meta.myUserId,
  });
  const id = mintPageId(list, created.Id);
  // Codex review PS1: register the newly-created row's source list so
  // listForPageId routes correctly even before the next apiGetPages refresh.
  SOURCE_LIST_BY_PAGEID.set(id, list);
  markRecentlyCreated(id);
  markStructuralOp();
  S.meta.pages.push({
    id, title, parent: parentId || '',
    type: 'page', icon: '', scope, authorId: S.meta.myUserId,
  });
  void logOp({ action: 'page.create', target: '"' + title + '" (' + scope + ')',
    method: 'POST', url: SITE + "/_api/web/lists/getbytitle('" + list + "')/items" });
  return { Id: id, Title: title, ParentId: parentId || '', Type: 'page' };
}

/** Create a "database" page row that points to a separate SP list. */
export async function apiCreateDbPageRow(
  title: string,
  parentId: string,
  listTitle: string,
  scope: PageScope = 'user',
  isTemplate = false,
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
    AuthorId: S.meta.myUserId,
    ...(isTemplate ? { IsTemplate: 1 } : {}),
  });
  const id = mintPageId(list, created.Id);
  SOURCE_LIST_BY_PAGEID.set(id, list);
  markRecentlyCreated(id);
  markStructuralOp();
  S.meta.pages.push({
    id, title, parent: parentId || '',
    type: 'database', list: listTitle, icon: '', scope, authorId: S.meta.myUserId,
    ...(isTemplate ? { isTemplate: true } : {}),
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
  markStructuralOp();
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
  // v5: 削除は **葉→親** 順(ids は親→子なので reverse)。各行ごとに SP 削除の
  // 成否を確認し、**成功したものだけ** pending-delete-purge + ローカル除去する。
  // 失敗した行はツリーに残す(「消えたように見える」幻想を作らない)。親が消え子が
  // 失敗で残っても orphan repair が root へ昇格させるので到達不能にはならない。
  // 各行の手順: 1.Unpublish → 2.登録行 delete(成否判定) → 3.成功時のみ
  //            コメント purge + 子DBリスト掃除。
  const succeeded: string[] = [];
  const failed: string[] = [];
  for (const pid of [...ids].reverse()) {
    const meta = metaById(pid);
    const dbListToCleanup = (meta?.type === 'database' && meta.list) ? meta.list : null;
    if (meta?.published) {
      const { unpublishPage } = await import('./publish');
      await unpublishPage(pid).catch(() => undefined);
    }
    // `pageIdToItemId` で composite id ('list:42') も numeric itemId に解決。
    const itemId = pageIdToItemId(pid);
    try {
      // deleteListItem は 404(既に無い)を成功扱いで返す。非OK非404のみ throw。
      if (itemId) await deleteListItem(listForPageId(pid), itemId);
      succeeded.push(pid);
    } catch {
      failed.push(pid);
      continue; // SP 削除失敗 → mark/remove せず、子DBリストも消さない(行は残る)
    }
    void import('./comments').then((m) => m.purgeCommentsForPage(pageCommentKey(pid))).catch(() => undefined);
    if (dbListToCleanup) {
      const { deleteAllRowEntriesForList } = await import('./page-row-entries');
      await deleteAllRowEntriesForList(dbListToCleanup).catch(() => undefined);
      await deleteList(dbListToCleanup).catch(() => undefined);
    }
  }
  // 成功した id だけを pending-delete-purge に + ローカル除去。reconcile は SP が
  // まだ古い行を返しても抑制し、確定不在(連続2回)まで復活させない。
  for (const pid of succeeded) markPendingDelete(pid, true);
  removePages(succeeded);
  if (failed.length) {
    throw new Error('削除に失敗しました (' + failed.length + ' 件)。一部のページは残っています。再度お試しください。');
  }
  return succeeded;
}

export async function apiMovePage(id: string, newParentId: string): Promise<void> {
  if (id === newParentId) return;
  markStructuralOp();
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
  markStructuralOp();
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
  const failed: string[] = [];
  for (const pid of ids) {
    const meta = metaById(pid);
    const prevTrashed = meta?.trashed; const prevBy = meta?.trashedBy;
    if (meta) { meta.trashed = ts; meta.trashedBy = myId; }
    markPendingDelete(pid, false); // pending-delete-soft: SP が Trashed を返すまで trashed 強制
    try {
      await updatePageRow(pid, { Trashed: ts, TrashedBy: myId });
    } catch {
      // SP 書込失敗 → ローカルを巻き戻し pending 解除(「消えたように見える」幻想を作らない)。
      if (meta) {
        if (prevTrashed) meta.trashed = prevTrashed; else delete meta.trashed;
        if (prevBy) meta.trashedBy = prevBy; else delete meta.trashedBy;
      }
      clearPending(pid);
      failed.push(pid);
    }
  }
  if (failed.length) throw new Error('ゴミ箱への移動に失敗しました (' + failed.length + ' 件)。再度お試しください。');
  void logOp({ action: 'page.delete', target: (guardMeta?.title || id) + ' (' + ids.length + '件)',
    method: 'POST', url: SITE + "/_api/web/lists/.../items(<id>)  (Trashed=" + ts + ' に更新)' });
}

export async function apiRestorePage(id: string): Promise<void> {
  const ids = collectIds(id);
  // If we just restored the daily DB, drop the cache so the bootstrap
  // re-resolves the (now-active again) page id instead of falling into
  // its "create new" branch on the next note open.
  await maybeInvalidateDailyCache(ids);
  const failed: string[] = [];
  for (const pid of ids) {
    const meta = metaById(pid);
    const prevTrashed = meta?.trashed; const prevBy = meta?.trashedBy;
    if (meta) { delete meta.trashed; delete meta.trashedBy; }
    markPendingRestore(pid); // pending-restore: SP が untrashed を返すまで復元を強制(re-suppress 防止)
    try {
      await updatePageRow(pid, { Trashed: 0, TrashedBy: 0 });
    } catch {
      if (meta) { if (prevTrashed) meta.trashed = prevTrashed; if (prevBy) meta.trashedBy = prevBy; }
      clearPending(pid);
      failed.push(pid);
    }
  }
  if (failed.length) throw new Error('復元に失敗しました (' + failed.length + ' 件)。再度お試しください。');
}

export async function apiPurgePage(id: string): Promise<string[]> {
  markStructuralOp();
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
/** Result of a scope change. `rootId` is the (possibly new) id of the page
 *  the caller acted on — after a cross-list migration the SP item id
 *  changes, so callers must navigate / re-reference via this. `idMap` maps
 *  every old subtree id → its new id (identity map when no move happened). */
export interface ScopeChangeResult {
  rootId: string;
  idMap: Record<string, string>;
}

export async function apiSetScope(
  id: string,
  scope: PageScope,
  cascadeChildren = true,
): Promise<ScopeChangeResult> {
  // Cross-list migration creates+deletes rows over several SP round-trips —
  // hold the structural window generously so the periodic refresh can't
  // observe the half-migrated (both-rows-present) state as a duplicate.
  markStructuralOp(15000);
  if (scope === 'org') {
    const m = metaById(id);
    if (m?.type === 'database' && m.list === 'memola-daily') {
      throw new Error('デイリーノート DB は組織に公開できません (個人専用)');
    }
  }
  // `collectDescendantIds` returns parent-before-child (DFS pre-order), so
  // when we migrate the subtree we always know a parent's NEW id before we
  // create its children (→ ParentId remaps correctly).
  const ids = cascadeChildren ? collectIds(id) : [id];
  const destList = pagesListFor(scope);

  // Does any row actually need to change lists? When the per-user list
  // can't be resolved (myUserId unknown) destList collapses to the org
  // list, and there's nothing to move — fall back to an in-place Scope
  // field flip (legacy behaviour).
  const needMove = ids.some((pid) => listForPageId(pid) !== destList);
  if (!needMove) {
    for (const pid of ids) {
      const itemId = pageIdToItemId(pid);
      if (itemId) {
        await updateListItem(listForPageId(pid), itemId, { Scope: scope }).catch(() => undefined);
      }
      const meta = metaById(pid);
      if (meta) meta.scope = scope;
    }
    const idMap: Record<string, string> = {};
    for (const pid of ids) idMap[pid] = pid;
    return { rootId: id, idMap };
  }

  // ── Cross-list migration ────────────────────────────────────────────
  // Move each row from its source list to `destList`: create the new row
  // first (so a mid-flight failure leaves a recoverable duplicate, never a
  // hole), then delete the old. Page identity (= SP item id) changes, so
  // we remap ParentId within the subtree and rebuild the meta cache.
  // Inbound [[links]] FROM OTHER pages to a moved page break by design —
  // the UI warns the user before calling this.
  const migrating = new Set(ids);
  const idMap: Record<string, string> = {};
  const CARRY = ['Title', 'PageType', 'Icon', 'Pinned', 'Trashed', 'ListTitle',
    'DbRowId', 'Body_blocks', 'Published', 'PublishedUrl', 'PublishedPageId',
    'PublishedDirty', 'OriginDailyDate', 'OriginPageId', 'IsTemplate', 'AuthorId'] as const;
  for (const pid of ids) {
    const srcList = listForPageId(pid);
    const itemId = pageIdToItemId(pid);
    if (!itemId) continue;
    const row = await getListItemById(srcList, itemId).catch(() => null);
    if (!row) continue;
    const r = row as unknown as Record<string, unknown>;
    const oldParent = (r.ParentId as string) || '';
    const newParent = migrating.has(oldParent) ? (idMap[oldParent] ?? '') : oldParent;
    const payload: Record<string, unknown> = { ParentId: newParent, Scope: scope };
    for (const k of CARRY) {
      if (r[k] !== undefined && r[k] !== null) payload[k] = r[k];
    }
    const created = await createListItem(destList, payload);
    const newId = mintPageId(destList, created.Id);
    idMap[pid] = newId;
    SOURCE_LIST_BY_PAGEID.set(newId, destList);
    markRecentlyCreated(newId);
    await deleteListItem(srcList, itemId).catch(() => undefined);
    SOURCE_LIST_BY_PAGEID.delete(pid);
  }
  // Authoritative rebuild from SP. We deliberately re-read both lists
  // instead of optimistically pushing bare-id metas, because the new SP
  // item ids are minted per-list from 1 and therefore almost always
  // COLLIDE with an item of the same numeric id in the *other* list — so
  // `apiGetPages`/`buildSourceListMap` will key the migrated page under a
  // COMPOSITE id (`memola-pages:N`), not the bare `N`. If we returned the
  // bare id, the caller's `S.currentId` would point at an id that the very
  // next `apiGetPages` (e.g. the periodic tree-sync) replaces with the
  // composite form → the open page "loses" its meta (scope tag vanishes,
  // view goes stale). Rebuilding here and resolving via `pageIdForListItem`
  // returns the SAME canonical id that every later refresh will compute, so
  // navigation stays valid.
  await apiGetPages();
  // Map every old subtree id → its CANONICAL new id (composite when the
  // numeric id collided across lists, else bare).
  const canonicalIdMap: Record<string, string> = {};
  for (const [oldPid, bareNew] of Object.entries(idMap)) {
    canonicalIdMap[oldPid] = pageIdForListItem(destList, pageIdToItemId(bareNew));
  }
  invalidateBacklinkCache();
  // Remap comment anchors to the reminted page ids (reachable lists only;
  // other users' private comments orphan and are GC'd lazily). Comment
  // SCOPE is intentionally NOT changed here — private memos stay private.
  void import('./comments').then((m) => m.remapCommentsPageId(new Map(Object.entries(canonicalIdMap))))
    .catch(() => undefined);
  return { rootId: canonicalIdMap[id] ?? (idMap[id] ?? id), idMap: canonicalIdMap };
}

/** Titles of PRIVATE (non-org) pages that `pageId`'s body links to,
 *  EXCLUDING ids in `exclude` (= the subtree being promoted together,
 *  which stays mutually linkable). Used to warn before promoting a page to
 *  org: those [[links]] would resolve to pages other people can't open.
 *  Links to unknown ids are ignored (can't classify). */
export async function findOutgoingPrivateLinks(
  pageId: string,
  exclude: Set<string> = new Set(),
): Promise<string[]> {
  const body = await apiLoadBlocksBody(pageId).catch(() => null);
  if (!body) return [];
  let blocks: Block[];
  try { blocks = parseBlocksJson(body); } catch { return []; }
  const titles: string[] = [];
  const seen = new Set<string>();
  const visitRun = (run: Inline[]): void => {
    for (const n of run) {
      if (n.kind === 'pagelink') {
        const t = n.pageId;
        if (seen.has(t) || exclude.has(t)) continue;
        const m = metaById(t);
        if (m && m.scope !== 'org') { seen.add(t); titles.push(m.title || n.alias || t); }
      } else if (n.kind === 'bold' || n.kind === 'italic'
        || n.kind === 'strike' || n.kind === 'link') {
        visitRun(n.children);
      }
    }
  };
  const visit = (bs: Block[]): void => {
    for (const b of bs) {
      if ('inline' in b && Array.isArray(b.inline)) visitRun(b.inline);
      if (b.kind === 'table') for (const r of b.rows) for (const c of r) visitRun(c);
      if (b.kind === 'quote' || b.kind === 'callout') visit(b.children);
      if (b.kind === 'list') for (const item of b.items) visit(item);
    }
  };
  visit(blocks);
  return titles;
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
    // Freeze the origin's body as the 3-way-merge base. The draft body
    // diverges from here as the user edits; at apply-time we compare the
    // origin's *current* body against this base to detect intervening
    // edits and merge instead of blindly overwriting.
    OriginBaseBlocks: blocksJson || '[]',
    Scope: inheritScope,
    AuthorId: S.meta.myUserId,
  });
  const newId = mintPageId(inheritList, created.Id);
  SOURCE_LIST_BY_PAGEID.set(newId, inheritList);
  markRecentlyCreated(newId);
  markStructuralOp();
  S.meta.pages.push({
    id: newId,
    title: draftTitle,
    parent: '',
    type: 'page',
    icon: '✏️',
    originPageId: originId,
    authorId: S.meta.myUserId,
  });
  return { Id: newId, Title: draftTitle, ParentId: '', Type: 'page', IsDraft: true };
}

// ── Templates ───────────────────────────────────────────────────────────
//
// A template is an ordinary memola-pages row flagged `IsTemplate=1`. It is
// hidden from the tree / library / search / picker / backlinks, and listed
// only in 「＋新規 → テンプレートから」. Editing a template = opening it
// normally (it renders as its real page/DB). Creating FROM a template =
// duplicating it into a normal row. Deleting = removing the template row.

/** All template rows currently known (page templates for now; DB templates
 *  arrive in phase 2). Sorted by title. */
export function listTemplates(): PageMeta[] {
  return S.meta.pages
    .filter((p) => p.isTemplate && !p.trashed)
    .sort((a, b) => (a.title || '無題').localeCompare(b.title || '無題', 'ja'));
}

/** Register an existing page as a reusable template: copy its title + body
 *  into a new `IsTemplate=1` row. The original page is left untouched.
 *  Returns the new template's pageId. */
export async function apiRegisterPageAsTemplate(pageId: string): Promise<string> {
  await ensurePagesList();
  const origin = metaById(pageId);
  if (!origin) throw new Error('ページが見つかりません');
  if (origin.type === 'database') throw new Error('DB のテンプレ登録は未対応です');
  const blocksJson = await apiLoadBlocksBody(pageId);
  const title = origin.title || '無題';
  const scope: PageScope = origin.scope || 'user';
  const list = pagesListFor(scope);
  const created = await createListItem(list, {
    Title: title,
    ParentId: '',
    PageType: 'page',
    Icon: origin.icon || '',
    Pinned: 0,
    Trashed: 0,
    Body_blocks: blocksJson || '[]',
    Scope: scope,
    IsTemplate: 1,
    AuthorId: S.meta.myUserId,
  });
  const newId = mintPageId(list, created.Id);
  SOURCE_LIST_BY_PAGEID.set(newId, list);
  markRecentlyCreated(newId);
  markStructuralOp();
  S.meta.pages.push({
    id: newId, title, parent: '', type: 'page',
    icon: origin.icon || '', scope, isTemplate: true, authorId: S.meta.myUserId,
  });
  invalidateBacklinkCache();
  return newId;
}

/** Create a brand-new normal page from a template: duplicate the template's
 *  title + body into a fresh `IsTemplate`-unset row. Returns the new page. */
export async function apiCreatePageFromTemplate(templateId: string): Promise<Page> {
  await ensurePagesList();
  const tpl = metaById(templateId);
  if (!tpl) throw new Error('テンプレートが見つかりません');
  if (tpl.type === 'database') throw new Error('DB テンプレからの作成は未対応です');
  const blocksJson = await apiLoadBlocksBody(templateId);
  const title = tpl.title || '無題';
  // New pages default to personal scope (same as the blank-page path).
  const scope: PageScope = 'user';
  const list = pagesListFor(scope);
  const created = await createListItem(list, {
    Title: title,
    ParentId: '',
    PageType: 'page',
    Icon: tpl.icon || '',
    Pinned: 0,
    Trashed: 0,
    Body_blocks: blocksJson || '[]',
    Scope: scope,
    AuthorId: S.meta.myUserId,
  });
  const newId = mintPageId(list, created.Id);
  SOURCE_LIST_BY_PAGEID.set(newId, list);
  markRecentlyCreated(newId);
  markStructuralOp();
  S.meta.pages.push({
    id: newId, title, parent: '', type: 'page', icon: tpl.icon || '', scope, authorId: S.meta.myUserId,
  });
  invalidateBacklinkCache();
  return { Id: newId, Title: title, ParentId: '', Type: 'page' };
}

/** Duplicate a normal page (title + body) into a new sibling page named
 *  "… (コピー)". Same scope/parent as the origin. Returns the new page.
 *  Used by the library's bulk-duplicate. DBs use `duplicateDb` instead. */
export async function apiDuplicatePage(id: string): Promise<Page> {
  await ensurePagesList();
  const origin = metaById(id);
  if (!origin) throw new Error('ページが見つかりません');
  if (origin.type === 'database') throw new Error('DB はこの経路では複製できません');
  const blocksJson = await apiLoadBlocksBody(id);
  const title = (origin.title || '無題') + ' (コピー)';
  const scope: PageScope = origin.scope || 'user';
  const list = pagesListFor(scope);
  const created = await createListItem(list, {
    Title: title,
    ParentId: origin.parent || '',
    PageType: 'page',
    Icon: origin.icon || '',
    Pinned: 0,
    Trashed: 0,
    Body_blocks: blocksJson || '[]',
    Scope: scope,
    AuthorId: S.meta.myUserId,
  });
  const newId = mintPageId(list, created.Id);
  SOURCE_LIST_BY_PAGEID.set(newId, list);
  markRecentlyCreated(newId);
  markStructuralOp();
  S.meta.pages.push({
    id: newId, title, parent: origin.parent || '', type: 'page',
    icon: origin.icon || '', scope, authorId: S.meta.myUserId,
  });
  invalidateBacklinkCache();
  return { Id: newId, Title: title, ParentId: origin.parent || '', Type: 'page' };
}

/** Hard-delete a template row (templates skip the trash — they're scratch
 *  scaffolding, not user content). */
export async function apiDeleteTemplate(templateId: string): Promise<void> {
  const meta = metaById(templateId);
  const itemId = pageIdToItemId(templateId);
  if (itemId) {
    await deleteListItem(listForPageId(templateId), itemId).catch(() => undefined);
  }
  // A DB template owns a backing SP list — drop it too so we don't leak
  // orphan lists. (Page templates have no backing list.)
  if (meta?.type === 'database' && meta.list) {
    await deleteList(meta.list).catch(() => undefined);
  }
  removePages([templateId]);
  invalidateBacklinkCache();
}

/** Outcome of applying a draft to its origin.
 *  - 'applied'  : origin was unchanged since the draft's base → wrote draft as-is.
 *  - 'merged'   : origin had non-conflicting edits → auto-merged (3-way) and wrote.
 *  - 'conflict' : origin and draft edited the SAME blocks differently → NOT written;
 *                 the caller must decide (re-call with {force:true} to overwrite).
 *  - 'forced'   : caller passed {force:true} → blind overwrite. */
export type ApplyDraftResult =
  | { status: 'applied'; originId: string }
  | { status: 'merged'; originId: string; autoMerged: number }
  | { status: 'conflict'; originId: string; conflicts: number }
  | { status: 'forced'; originId: string };

/** Apply a draft's contents to its origin page, preserving the origin's
 *  id (so inbound [[..]] page-links remain valid). On a clean apply the
 *  draft is deleted.
 *
 *  Base-aware (option ②): if the origin changed since the draft was
 *  created (its current body differs from the snapshot frozen at draft
 *  creation), we 3-way merge (base = snapshot, yours = draft, theirs =
 *  origin-now) instead of blindly clobbering the origin's intervening
 *  edits. A clean merge is written automatically; real same-block
 *  conflicts return status:'conflict' WITHOUT writing, so the caller can
 *  prompt the user (overwrite vs. cancel). `{force:true}` skips all of
 *  this and overwrites (the conflict dialog's 「上書き」 path). */
export async function apiApplyDraftToOrigin(
  draftId: string,
  opts?: { force?: boolean },
): Promise<ApplyDraftResult> {
  const draftMeta = metaById(draftId);
  if (!draftMeta) throw new Error('下書きが見つかりません');
  if (!draftMeta.originPageId) throw new Error('このページは下書きではありません');
  const originId = draftMeta.originPageId;
  const originExists = S.meta.pages.find((p) => p.id === originId && !p.trashed);
  if (!originExists) throw new Error('原本ページが見つかりません (削除済み?)');

  const draftTitleRaw = draftMeta.title.replace(/^\[下書き\]\s*/, '');
  // Draft body (yours). Copy JSON directly (no md round-trip) so the
  // draft's structure / block IDs are preserved exactly.
  const draftBody = await apiLoadBlocksBody(draftId);

  // Force path = legacy blind overwrite (conflict dialog's 「上書き」).
  if (opts?.force) {
    const r = await saveBodyInternal(originId, draftTitleRaw, draftBody || '[]');
    if (!r.ok) throw new Error('原本の更新に失敗しました (競合)');
    await apiDeletePage(draftId).catch(() => undefined);
    return { status: 'forced', originId };
  }

  // Base = origin body snapshot frozen at draft creation. Theirs = origin
  // body now. If they match, the origin hasn't moved → safe straight apply.
  const baseRow = await fetchOneRow(draftId, 'OriginBaseBlocks');
  const baseJson = baseRow?.row.OriginBaseBlocks ?? '';
  const theirsJson = await apiLoadBlocksBody(originId);
  const sameBase = baseJson !== '' && serializeBlocks(parseBlocksJson(theirsJson)) === serializeBlocks(parseBlocksJson(baseJson));

  if (!baseJson || sameBase) {
    // No base recorded (legacy draft) → fall back to straight apply;
    // OR origin unchanged → straight apply.
    const r = await saveBodyInternal(originId, draftTitleRaw, draftBody || '[]');
    if (!r.ok) return { status: 'conflict', originId, conflicts: 1 };
    await apiDeletePage(draftId).catch(() => undefined);
    return { status: 'applied', originId };
  }

  // Origin advanced since the draft's base → 3-way merge.
  const { threeWayMergeBlocks } = await import('../lib/three-way-merge-blocks');
  const res = threeWayMergeBlocks(
    parseBlocksJson(baseJson),
    parseBlocksJson(draftBody),
    parseBlocksJson(theirsJson),
  );
  if (res.conflicts.length > 0) {
    // Same blocks edited on both sides — needs a human decision. Don't
    // write; let the caller offer overwrite / cancel.
    return { status: 'conflict', originId, conflicts: res.conflicts.length };
  }
  const r = await saveBodyInternal(originId, draftTitleRaw, serializeBlocks(res.merged));
  if (!r.ok) return { status: 'conflict', originId, conflicts: 1 };
  await apiDeletePage(draftId).catch(() => undefined);
  return { status: 'merged', originId, autoMerged: res.autoMergedCount };
}

/** Promote a draft into a standalone normal page. Used when the draft's
 *  origin no longer exists (deleted), so 「原本に適用」 isn't possible —
 *  the user keeps their edits as a brand-new document instead of losing
 *  them. Pure metadata update: the body already lives on the draft row,
 *  so we just clear the draft markers (PageType / OriginPageId) and strip
 *  the "[下書き]" title prefix. Returns the (unchanged) page id. */
export async function apiPromoteDraftToPage(draftId: string): Promise<string> {
  const meta = metaById(draftId);
  if (!meta) throw new Error('下書きが見つかりません');
  if (!meta.originPageId) throw new Error('このページは下書きではありません');
  const newTitle = (meta.title || '無題').replace(/^\[下書き\]\s*/, '');
  const newIcon = meta.icon === '✏️' ? '' : (meta.icon || '');
  await updatePageRow(draftId, {
    Title: newTitle,
    PageType: 'page',
    OriginPageId: '',      // '' clears the field (validateUpdateListItem)
    Icon: newIcon,
  });
  // Reflect in-memory so the tree / library / search pick it up as a
  // normal page immediately (IsDraft is derived from originPageId).
  meta.title = newTitle;
  meta.originPageId = undefined;
  meta.icon = newIcon;
  invalidateBacklinkCache();
  return draftId;
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
