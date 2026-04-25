// Core SharePoint REST helpers for files and folders.

import { SITE, FOLDER } from '../config';
import { getDigest } from './digest';

export async function readFile(name: string): Promise<string> {
  const url = SITE + "/_api/web/GetFileByServerRelativeUrl('" + FOLDER + '/' + name + "')/$value";
  const r = await fetch(url, { credentials: 'include' });
  if (!r.ok) throw new Error('読み込み失敗: ' + r.status);
  return r.text();
}

export async function writeFile(relPath: string, content: string): Promise<void> {
  const d = await getDigest();
  const lastSlash = relPath.lastIndexOf('/');
  const folderRel = lastSlash >= 0 ? FOLDER + '/' + relPath.substring(0, lastSlash) : FOLDER;
  const fileName = lastSlash >= 0 ? relPath.substring(lastSlash + 1) : relPath;
  const url = SITE + "/_api/web/GetFolderByServerRelativeUrl('" + folderRel +
    "')/Files/add(url='" + encodeURIComponent(fileName) + "',overwrite=true)";
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'X-RequestDigest': d },
    credentials: 'include',
    body: content,
  });
  if (!r.ok) throw new Error('保存失敗: ' + r.status);
}

export async function spPost(url: string, body: unknown): Promise<boolean> {
  const d = await getDigest();
  const r = await fetch(SITE + url, {
    method: 'POST',
    headers: {
      Accept: 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
      'X-RequestDigest': d,
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  return r.ok;
}

export async function createFolder(path: string): Promise<void> {
  const ok = await spPost('/_api/web/folders', {
    __metadata: { type: 'SP.Folder' },
    ServerRelativeUrl: FOLDER + '/' + path,
  });
  if (!ok) throw new Error('フォルダ作成失敗');
}

export async function deleteFolderApi(path: string): Promise<void> {
  const d = await getDigest();
  const url = SITE + "/_api/web/GetFolderByServerRelativeUrl('" + FOLDER + '/' + path + "')";
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'X-RequestDigest': d, 'X-HTTP-Method': 'DELETE', 'If-Match': '*' },
    credentials: 'include',
  });
  if (!r.ok) throw new Error('削除失敗: ' + r.status);
}

export async function ensureFolder(): Promise<boolean> {
  const r = await fetch(SITE + "/_api/web/GetFolderByServerRelativeUrl('" + FOLDER + "')", {
    headers: { Accept: 'application/json;odata=verbose' },
    credentials: 'include',
  });
  if (r.ok) return true;
  return spPost('/_api/web/folders', {
    __metadata: { type: 'SP.Folder' },
    ServerRelativeUrl: FOLDER,
  });
}
