// Database (SP custom list) creation and row CRUD wrappers.
//
// The DB list holds only structural row data (Title + user-defined columns).
// Row body markdown lives in n365-pages (PageType='row'); see api/pages.ts.

import { type Page, type ListItem } from '../state';
import { createList, createListItem, updateListItem } from './sp-list';
import { apiCreateDbPageRow } from './pages';

export async function apiCreateDb(title: string, parentId: string): Promise<Page> {
  const stamp = Date.now().toString();
  const listTitle = 'n365-db-' + stamp;
  await createList(listTitle);
  return await apiCreateDbPageRow(title, parentId, listTitle);
}

export async function apiAddDbRow(
  listTitle: string,
  data: Record<string, unknown>,
): Promise<ListItem> {
  return await createListItem(listTitle, data);
}

export async function apiUpdateDbRow(
  listTitle: string,
  itemId: number,
  data: Record<string, unknown>,
): Promise<void> {
  await updateListItem(listTitle, itemId, data);
}
