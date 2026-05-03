// Database (SP custom list) creation and row CRUD wrappers.
//
// The DB list holds only structural row data (Title + user-defined columns).
// Row body markdown lives in memola-pages (PageType='row'); see api/pages.ts.

import { type Page, type ListItem } from '../state';
import { createList, createListItem, updateListItem } from './sp-list';
import { apiCreateDbPageRow } from './pages';

export async function apiCreateDb(title: string, parentId: string): Promise<Page> {
  const stamp = Date.now().toString();
  const listTitle = 'memola-db-' + stamp;
  await createList(listTitle);
  return await apiCreateDbPageRow(title, parentId, listTitle);
}

export async function apiAddDbRow(
  listTitle: string,
  data: Record<string, unknown>,
): Promise<ListItem> {
  // Two-step: create with Title only (POST/JSON requires InternalName, which
  // is gnarly for non-ASCII column names like '日付' → '_x65e5__x4ed8_'),
  // then push the rest via validateUpdateListItem which accepts both display
  // and internal names. This sidesteps the "プロパティ '日付' は型 ... に
  // 存在しません" error users hit when DBs have Japanese column names.
  const title = data.Title;
  const rest: Record<string, unknown> = {};
  for (const k of Object.keys(data)) {
    if (k === 'Title' || k === '__metadata') continue;
    rest[k] = data[k];
  }
  const created = await createListItem(listTitle, { Title: title == null ? '' : title });
  if (Object.keys(rest).length > 0) {
    await updateListItem(listTitle, created.Id, rest);
    // Reflect the updated values in the returned object so callers that read
    // `created.<field>` see the values they just wrote.
    for (const k of Object.keys(rest)) created[k] = rest[k];
  }
  return created;
}

export async function apiUpdateDbRow(
  listTitle: string,
  itemId: number,
  data: Record<string, unknown>,
): Promise<void> {
  await updateListItem(listTitle, itemId, data);
}
