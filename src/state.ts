// Shared application state and types.

import type { ApiMessage } from './api/anthropic';

export interface PageMeta {
  id: string;
  title: string;
  parent: string;
  type?: 'page' | 'database';
  list?: string;              // backing SP list name when type === 'database'
  icon?: string;
  trashed?: number;           // unix ms when moved to trash; absent = active
  pinned?: boolean;
  published?: boolean;        // true → mirrored as a Modern Site Page (.aspx)
  publishedUrl?: string;      // absolute URL of the Site Page when published
  publishedSitePageId?: number; // SP.Publishing.SitePage Id (used to update / delete)
  publishedDirty?: boolean;   // true → page edited since the last sync to the Site Page
  /** Set on a *regular* page that was originally a daily-note row. The value
   *  is the YYYY-MM-DD it represented before conversion. Used to expose
   *  「デイリーノートに戻す」 in the page menu. */
  originDailyDate?: string;
  /** When this page was created via 「下書きとして複製」, holds the id of the
   *  origin page. The draft page renders an "← 原本に適用" banner that copies
   *  its body back to the origin (preserving the origin's id so inbound
   *  links don't break) and then deletes the draft. */
  originPageId?: string;
  /** 'org' = workspace 全員に公開、'user' = 作成者の個人スコープ。
   *  現アーキでは 1 つの memola-pages を共有しているため、この値は単なる
   *  メタデータ (UI の "自分のページだけ表示" フィルタや、将来 Phase 2 で
   *  リスト分割する際の振り分け基準として読まれる)。空文字 / undefined は
   *  旧データ — 後方互換のため `org` (= 全員に表示) として扱う。 */
  scope?: 'org' | 'user';
  /** SP 上の作成者 user id (= AuthorId 自動入力)。可視性フィルタ
   *  (個人スコープなら作成者本人のみ表示) で使用。 */
  authorId?: number;
  /** Trashed フラグを立てた user id (= 削除実行者)。ゴミ箱モーダルで
   *  「誰が消したか」表示と「他人が削除した行は完全削除しない」判定に使用。 */
  trashedBy?: number;
}

export interface Meta {
  pages: PageMeta[];
  /** SP user id of the currently signed-in user, cached at apiGetPages time.
   *  Used by trash/visibility filters that need to compare against AuthorId
   *  / TrashedBy without making a fresh REST call. 0 = unknown. */
  myUserId?: number;
}

export interface Page {
  Id: string;
  Title: string;
  ParentId: string;
  Type?: 'page' | 'database';
  /** True when this entry is a 「下書きとして複製」 result. Such pages are
   *  excluded from the main page tree, search, and page-link picker — they
   *  only appear in the 「📝 下書き」 sidebar. */
  IsDraft?: boolean;
}

export interface ListField {
  Title: string;
  InternalName: string;
  FieldTypeKind: number;
  Choices?: string[];
}

export interface ListItem {
  Id: number;
  Title?: string;
  [key: string]: unknown;
}

export interface AppState {
  pages: Page[];
  meta: Meta;
  currentId: string | null;
  currentType: 'page' | 'database';
  dbFields: ListField[];
  dbItems: ListItem[];
  dbList: string;
  dbSort: { field: string | null; asc: boolean };
  /** Notion-style multi-field AND filters */
  dbFilters: { field: string; op: 'contains' | 'equals' | 'not_empty' | 'empty'; value: string }[];
  dbView: 'table' | 'board';
  dbColumnWidths: Record<string, number>;
  /** When viewing a DB row as a full page, holds list/item identity. */
  currentRow: { listTitle: string; itemId: number; dbId: string } | null;
  /** Currently checkbox-selected row ids in the DB view. Reset on DB switch. */
  dbSelected: Set<number>;
  ai: {
    panelOpen: boolean;
    /** Full structured Tool Use history. tool_use / tool_result blocks are
     *  preserved across turns so Claude remembers prior actions. */
    messages: ApiMessage[];
    loading: boolean;
  };
  sync: {
    pageId: string | null;
    loadedModified: string | null;
    loadedEtag: string | null;
    pollTimer: ReturnType<typeof setInterval> | null;
    /** Etags this tab has produced via its own save calls. The poll
     *  loop suppresses the "別タブで更新" banner when the remote etag
     *  is in this set — it's our own save we're seeing, not someone
     *  else's. Bounded to 32 entries (FIFO) to cap memory. */
    ourSavedEtags: string[];
    /** Wall-clock ms of the last write THIS tab made against the
     *  currently-watched page. Defence-in-depth on top of ourSavedEtags:
     *  if the poll sees an etag mismatch but our last local write was
     *  within QUIET_AFTER_WRITE_MS, treat as our own save propagation lag
     *  (some pre-fix zombie instance, etag-format quirk, etc.) instead of
     *  raising "別タブで更新". Cleared when the watched page changes. */
    lastLocalWriteTs: number | null;
    /** When true, the "別タブで更新" banner won't be re-shown until the
     *  user switches the browser tab away and back. Set by the "このタブ
     *  を離れるまで通知しない" button on the banner. Reset on
     *  visibilitychange (tab regains focus). */
    suppressBannerUntilFocus?: boolean;
    /** Raw markdown body of the watched page at the moment we last
     *  fetched it from SP (= our "common ancestor" for 3-way merge).
     *  Refreshed on every page load AND on every successful save (= the
     *  body we just wrote becomes the new base). When a save conflict
     *  surfaces, this is the `base` input to threeWayMerge. */
    baseBody?: string;
    /** True while the user is in the merge UI resolving a conflict.
     *  doSave / schedSave bail when this is set so the autosave timer
     *  doesn't keep re-firing the conflict modal on top of the merge
     *  modal. Reset when the merge modal closes (any path). */
    mergeInProgress?: boolean;
  };
  expanded: Set<string>;
  dirty: boolean;
  saving: boolean;
}

export const S: AppState = {
  pages: [],
  meta: { pages: [] },
  currentId: null,
  currentType: 'page',
  dbFields: [],
  dbItems: [],
  dbList: '',
  dbSort: { field: null, asc: true },
  dbFilters: [],
  dbView: 'table',
  dbColumnWidths: {},
  currentRow: null,
  dbSelected: new Set<number>(),
  ai: { panelOpen: false, messages: [], loading: false },
  sync: { pageId: null, loadedModified: null, loadedEtag: null, pollTimer: null, ourSavedEtags: [], lastLocalWriteTs: null },
  expanded: new Set<string>(),
  dirty: false,
  saving: false,
};

/** Wipe in-memory app state. Used by workspace switching — caches in
 *  /api are cleared separately. Does NOT touch S itself by reassignment
 *  (other modules import S as a live reference); mutates fields in place. */
export function resetAppState(): void {
  S.pages = [];
  S.meta = { pages: [] };
  S.currentId = null;
  S.currentType = 'page';
  S.dbFields = [];
  S.dbItems = [];
  S.dbList = '';
  S.dbSort = { field: null, asc: true };
  S.dbFilters = [];
  S.dbColumnWidths = {};
  S.currentRow = null;
  S.dbSelected.clear();
  S.ai.messages = [];
  S.ai.loading = false;
  S.sync.pageId = null;
  S.sync.loadedModified = null;
  S.sync.loadedEtag = null;
  S.sync.ourSavedEtags = [];
  S.sync.lastLocalWriteTs = null;
  if (S.sync.pollTimer) { clearInterval(S.sync.pollTimer); S.sync.pollTimer = null; }
  S.expanded.clear();
  S.dirty = false;
  S.saving = false;
}
