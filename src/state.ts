// Shared application state and types.

export interface PageMeta {
  id: string;
  title: string;
  parent: string;
  path: string;
  type?: 'page' | 'database';
  list?: string;
  icon?: string;
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
  expanded: new Set<string>(),
  dirty: false,
  saving: false,
};
