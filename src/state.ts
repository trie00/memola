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
   *  Phase 3 でストレージ振り分けに使用: 'org' は共有リスト
   *  (memola-pages)、'user' は所有者限定 ACL の per-user リスト
   *  (memola-user-{id}-pages) に保存される (api/pages.ts の
   *  `pagesListFor` / `getMyPagesList`)。空文字 / undefined は旧データで、
   *  secure-by-default のため 'user' (= 作成者のみ表示) として扱う
   *  (filterVisiblePages)。 */
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
  /** Derived, read-only view of `meta.pages` (see the getter on `S`).
   *  Mutate the store via `lib/page-store.ts` helpers, never by
   *  assigning to `S.pages`. */
  readonly pages: Page[];
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
  /** Sync watch — tracks "the page we're watching for foreign edits".
   *  The save lifecycle (dirty / saving / conflict / merging) lives in
   *  the Saver state machine (`src/lib/saver.ts`). The legacy
   *  `S.dirty`, `S.saving`, `S.sync.loadedEtag`, `S.sync.loadedModified`
   *  and `S.sync.baseBody` fields below are kept in sync by
   *  saver-bridge so non-migrated readers keep working. */
  sync: {
    pageId: string | null;
    loadedModified: string | null;
    loadedEtag: string | null;
    pollTimer: ReturnType<typeof setInterval> | null;
    /** When true, the "別タブで更新" banner won't be re-shown until the
     *  user switches the browser tab away and back. Set by the "このタブ
     *  を離れるまで通知しない" button on the banner. Reset on
     *  visibilitychange (tab regains focus). */
    suppressBannerUntilFocus?: boolean;
  };
  expanded: Set<string>;
  dirty: boolean;
  saving: boolean;
}

export const S: AppState = {
  /** **Derived, read-only view** of `meta.pages`. The getter rebuilds
   *  the UI-friendly Page[] on each access from the canonical
   *  PageMeta[] so the two can never drift out of sync. Excludes
   *  trashed entries and decorates with `IsDraft`.
   *
   *  Mutate via the helpers in `lib/page-store.ts` (addPage /
   *  removePages / setPageTitle), which write to `meta.pages`. There is
   *  intentionally no setter — `S.pages = …` is a compile error. */
  get pages(): Page[] {
    return this.meta.pages
      .filter((p) => !p.trashed)
      .map((p): Page => ({
        Id: p.id,
        Title: p.title,
        ParentId: p.parent || '',
        Type: (p.type || 'page') as 'page' | 'database',
        IsDraft: !!p.originPageId,
      }));
  },
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
  sync: { pageId: null, loadedModified: null, loadedEtag: null, pollTimer: null },
  expanded: new Set<string>(),
  dirty: false,
  saving: false,
};

/** Wipe in-memory app state. Used by workspace switching — caches in
 *  /api are cleared separately. Does NOT touch S itself by reassignment
 *  (other modules import S as a live reference); mutates fields in place. */
export function resetAppState(): void {
  // S.pages is a derived view — clearing meta.pages also clears the view.
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
  if (S.sync.pollTimer) { clearInterval(S.sync.pollTimer); S.sync.pollTimer = null; }
  S.expanded.clear();
  S.dirty = false;
  S.saving = false;
}
