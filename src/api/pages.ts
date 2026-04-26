// Page-level CRUD that combines folder/file ops with the meta manifest.

import { S, type Page } from '../state';
import { createFolder, deleteFolderApi, readFile, writeFile } from './sp-core';
import { deleteList } from './sp-list';
import { loadMeta, saveMeta } from './meta';
import { buildMdFile, getBody, mdToHtml } from '../lib/markdown';
import { getFileMeta, writeFileIfMatch } from './sync';

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

export async function apiLoadFileMeta(id: string): Promise<{ modified: string; etag: string } | null> {
  const meta = await getFileMeta(getPathForId(id) + '/index.md');
  return meta ? { modified: meta.modified, etag: meta.etag } : null;
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

export async function apiSavePage(
  id: string,
  title: string,
  html: string,
  expectedEtag?: string,
): Promise<{ ok: true; etag: string } | { ok: false; reason: 'conflict' }> {
  const path = getPathForId(id);
  const body = buildMdFile(title, getPageParent(id), html);
  if (expectedEtag) {
    const result = await writeFileIfMatch(path + '/index.md', body, expectedEtag);
    if (result === 'conflict') return { ok: false, reason: 'conflict' };
  } else {
    await writeFile(path + '/index.md', body);
  }
  const p = S.meta.pages.find((p) => p.id === id);
  if (p) p.title = title;
  await saveMeta();
  // Re-fetch file meta to learn the new etag
  const fm = await getFileMeta(path + '/index.md');
  return { ok: true, etag: fm?.etag || '' };
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

// Move a page to a new parent. Updates only metadata (path stays the same on
// disk; we just rewire the parent pointer). Folder relocation is intentionally
// avoided because SP REST has no atomic move and copy+delete is risky.
export async function apiMovePage(id: string, newParentId: string): Promise<void> {
  if (id === newParentId) return;
  // Prevent cycles
  let p = newParentId;
  while (p) {
    if (p === id) throw new Error('循環参照になります');
    const m = S.meta.pages.find((x) => x.id === p);
    p = m?.parent || '';
  }
  const m = S.meta.pages.find((p) => p.id === id);
  if (!m) return;
  m.parent = newParentId || '';
  await saveMeta();
  // Reflect in S.pages cache
  const pg = S.pages.find((x) => x.Id === id);
  if (pg) pg.ParentId = newParentId || '';
}

export async function apiSetIcon(id: string, emoji: string): Promise<void> {
  const p = S.meta.pages.find((p) => p.id === id);
  if (p) {
    p.icon = emoji;
    await saveMeta();
  }
}
