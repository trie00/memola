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
}

export interface Meta {
  pages: PageMeta[];
}

export interface Page {
  Id: string;
  Title: string;
  ParentId: string;
  Type?: 'page' | 'database';
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
  sync: { pageId: null, loadedModified: null, loadedEtag: null, pollTimer: null },
  expanded: new Set<string>(),
  dirty: false,
  saving: false,
};
