// Database (SP custom list) creation and row CRUD wrappers.

import { S, type Page, type ListItem } from '../state';
import { addListField, createList, createListItem, updateListItem } from './sp-list';
import { saveMeta } from './meta';

/** Hidden multi-line text column that stores each row's page body (markdown). */
export const ROW_BODY_FIELD = '_n365_body';

export async function apiCreateDb(title: string, parentId: string): Promise<Page> {
  const id = Date.now().toString();
  const listTitle = 'n365-db-' + id;
  await createList(listTitle);
  // Auto-create the hidden body column (Multiple lines of text)
  try { await addListField(listTitle, ROW_BODY_FIELD, 3); }
  catch { /* tolerate failure — ensureRowBodyField will retry on first open */ }
  S.meta.pages.push({
    id, title, parent: parentId || '', path: '',
    type: 'database', list: listTitle, icon: '',
  });
  await saveMeta();
  return { Id: id, Title: title, ParentId: parentId || '', Type: 'database' };
}

/** Idempotently make sure the hidden _n365_body column exists on the list. */
export async function ensureRowBodyField(listTitle: string): Promise<void> {
  // Check existing fields (caller should refresh after this if it returns true)
  const { getListFields } = await import('./sp-list');
  const fields = await getListFields(listTitle);
  if (fields.find((f) => f.InternalName === ROW_BODY_FIELD || f.Title === ROW_BODY_FIELD)) return;
  try { await addListField(listTitle, ROW_BODY_FIELD, 3); }
  catch { /* ignore — read-only users etc. */ }
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
