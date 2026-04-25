// Page-level CRUD that combines folder/file ops with the meta manifest.

import { S, type Page } from '../state';
import { createFolder, deleteFolderApi, readFile, writeFile } from './sp-core';
import { deleteList } from './sp-list';
import { loadMeta, saveMeta } from './meta';
import { buildMdFile, getBody, mdToHtml } from '../lib/markdown';

export function getPathForId(id: string): string {
  const p = S.meta.pages.find((p) => p.id === id);
  return p ? p.path : id;
}

export function getPageParent(id: string): string {
  const p = S.meta.pages.find((p) => p.id === id);
  return p ? (p.parent || '') : '';
}

export async function apiGetPages(): Promise<Page[]> {
  S.meta = await loadMeta();
  return S.meta.pages.map((p) => ({
    Id: p.id,
    Title: p.title,
    ParentId: p.parent || '',
    Type: (p.type || 'page') as 'page' | 'database',
  }));
}

export async function apiLoadContent(id: string): Promise<string> {
  const content = await readFile(getPathForId(id) + '/index.md');
  return mdToHtml(getBody(content));
}

export async function apiCreatePage(title: string, parentId: string): Promise<Page> {
  const id = Date.now().toString();
  const parentPath = parentId ? getPathForId(parentId) : '';
  const path = parentPath ? parentPath + '/' + id : id;
  await createFolder(path);
  await writeFile(path + '/index.md', buildMdFile(title, parentId || '', ''));
  S.meta.pages.push({ id, title, parent: parentId || '', path, icon: '' });
  await saveMeta();
  return { Id: id, Title: title, ParentId: parentId || '' };
}

export async function apiSavePage(id: string, title: string, html: string): Promise<void> {
  const path = getPathForId(id);
  await writeFile(path + '/index.md', buildMdFile(title, getPageParent(id), html));
  const p = S.meta.pages.find((p) => p.id === id);
  if (p) p.title = title;
  await saveMeta();
}

// Local helper — collect a page id and all its descendants from S.pages.
function collectIds(id: string): string[] {
  let r = [id];
  S.pages.filter((p) => p.ParentId === id).forEach((c) => { r = r.concat(collectIds(c.Id)); });
  return r;
}

export async function apiDeletePage(id: string): Promise<string[]> {
  const ids = collectIds(id);
  const topPage = S.meta.pages.find((p) => p.id === id);
  if (topPage) {
    if (topPage.type === 'database' && topPage.list) {
      await deleteList(topPage.list).catch(() => undefined);
    } else if (topPage.path) {
      await deleteFolderApi(topPage.path).catch(() => undefined);
    }
  }
  S.meta.pages = S.meta.pages.filter((p) => ids.indexOf(p.id) < 0);
  await saveMeta();
  return ids;
}

export async function apiSetIcon(id: string, emoji: string): Promise<void> {
  const p = S.meta.pages.find((p) => p.id === id);
  if (p) {
    p.icon = emoji;
    await saveMeta();
  }
}
