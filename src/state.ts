// Shared application state and types.

export interface PageMeta {
  id: string;
  title: string;
  parent: string;
  path: string;
  type?: 'page' | 'database';
  list?: string;
  icon?: string;
  trashed?: number;          // unix ms when moved to trash; absent = active
  pinned?: boolean;
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
  dbFilter: string;
  dbView: 'table' | 'board';
  dbColumnWidths: Record<string, number>;
  ai: {
    panelOpen: boolean;
    messages: { role: 'user' | 'assistant'; content: string }[];
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
  dbFilter: '',
  dbView: 'table',
  dbColumnWidths: {},
  ai: { panelOpen: false, messages: [], loading: false },
  sync: { pageId: null, loadedModified: null, loadedEtag: null, pollTimer: null },
  expanded: new Set<string>(),
  dirty: false,
  saving: false,
};
