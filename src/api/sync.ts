// Detect remote updates while a page is open. Polls the file's LastModified
// timestamp and compares it with the version we loaded. ETag-based conflict
// detection is layered on top of writeFile via writeFileIfMatch.

import { SITE, FOLDER } from '../config';
import { getDigest } from './digest';

export interface FileMeta {
  modified: string;            // ISO timestamp
  editorTitle: string;         // editor display name
  etag: string;                // SP file ETag (e.g. "\"5,3\"")
}

export async function getFileMeta(relPath: string): Promise<FileMeta | null> {
  const url =
    SITE +
    "/_api/web/GetFileByServerRelativeUrl('" + FOLDER + '/' + relPath + "')" +
    '/ListItemAllFields?$select=Modified,Editor/Title&$expand=Editor';
  const r = await fetch(url, {
    headers: { Accept: 'application/json;odata=verbose' },
    credentials: 'include',
  });
  if (!r.ok) return null;
  const j = (await r.json()) as {
    d: { Modified: string; Editor: { Title: string }; __metadata: { etag: string } };
  };
  return {
    modified: j.d.Modified,
    editorTitle: j.d.Editor?.Title || '',
    etag: j.d.__metadata?.etag || '',
  };
}

// Conflict-aware write. Returns 'ok' | 'conflict'. On conflict the caller
// should fetch the fresh file and merge / prompt the user.
export async function writeFileIfMatch(
  relPath: string,
  content: string,
  etag: string,
): Promise<'ok' | 'conflict'> {
  const d = await getDigest();
  const lastSlash = relPath.lastIndexOf('/');
  const folderRel = lastSlash >= 0 ? FOLDER + '/' + relPath.substring(0, lastSlash) : FOLDER;
  const fileName = lastSlash >= 0 ? relPath.substring(lastSlash + 1) : relPath;
  const url =
    SITE +
    "/_api/web/GetFolderByServerRelativeUrl('" + folderRel + "')/Files/add(url='" +
    encodeURIComponent(fileName) + "',overwrite=true)";
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'X-RequestDigest': d,
      ...(etag ? { 'If-Match': etag } : {}),
    },
    credentials: 'include',
    body: content,
  });
  if (r.status === 412) return 'conflict';
  if (!r.ok) throw new Error('保存失敗: ' + r.status);
  return 'ok';
}
