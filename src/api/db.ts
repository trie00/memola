// Database (SP custom list) creation and row CRUD wrappers.

import { S, type Page, type ListItem } from '../state';
import { createList, createListItem, updateListItem } from './sp-list';
import { saveMeta } from './meta';

export async function apiCreateDb(title: string, parentId: string): Promise<Page> {
  const id = Date.now().toString();
  const listTitle = 'n365-db-' + id;
  await createList(listTitle);
  S.meta.pages.push({
    id, title, parent: parentId || '', path: '',
    type: 'database', list: listTitle, icon: '',
  });
  await saveMeta();
  return { Id: id, Title: title, ParentId: parentId || '', Type: 'database' };
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
