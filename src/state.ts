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
}

export interface Meta {
  pages: PageMeta[];
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
  sync: { pageId: null, loadedModified: null, loadedEtag: null, pollTimer: null, ourSavedEtags: [] },
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
  if (S.sync.pollTimer) { clearInterval(S.sync.pollTimer); S.sync.pollTimer = null; }
  S.expanded.clear();
  S.dirty = false;
  S.saving = false;
}
