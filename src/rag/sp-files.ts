// SharePoint Document Library ファイル操作 (RAG ベクトル配置用)。
// memola の既存 list REST とは別に、ベクトルセグメント (manifest.json / seg-*.json)
// を Document Library のテキストファイルとして読み書きする。外部ベクトル の
// SharePointClient のファイルメソッド群を memola の SITE/getDigest に合わせて移植。
//
// 認証はブラウザの Cookie (credentials:'include')。中継サーバは SPO に認証できない
// ため、ベクトルファイルの読み書きは常にブラウザ直 REST で行う。

import { SITE } from '../config';
import { getDigest } from '../api/digest';

const ACCEPT_VERBOSE = 'application/json;odata=verbose';

/** ETag 不一致 (412) を表すエラー。CAS リトライ判定に使う。 */
export class CasConflictError extends Error {
  code = 'PRECONDITION_FAILED' as const;
  constructor() { super('CAS conflict (412)'); }
}

function fileValueUrl(serverRel: string): string {
  return SITE + "/_api/web/GetFileByServerRelativeUrl('" + encodeURIComponent(serverRel) + "')/$value";
}
function fileUrl(serverRel: string): string {
  return SITE + "/_api/web/GetFileByServerRelativeUrl('" + encodeURIComponent(serverRel) + "')";
}
function folderUrl(serverRel: string, suffix = ''): string {
  return SITE + "/_api/web/GetFolderByServerRelativeUrl('" + encodeURIComponent(serverRel) + "')" + suffix;
}

/** フォルダが無ければ作成 (冪等)。serverRel は site 込み server-relative。
 *  親フォルダは作らない — 呼び出し側が親から順に ensure すること。 */
export async function ensureFolder(serverRel: string): Promise<void> {
  try {
    const check = await fetch(folderUrl(serverRel, '?$select=Exists'), {
      headers: { Accept: ACCEPT_VERBOSE }, credentials: 'include',
    });
    if (check.ok) {
      const j = (await check.json()) as { d?: { Exists?: boolean } };
      if (j.d?.Exists) return;
    }
  } catch { /* 確認失敗でも作成を試す */ }

  const d = await getDigest();
  const res = await fetch(SITE + '/_api/web/folders', {
    method: 'POST',
    headers: { Accept: ACCEPT_VERBOSE, 'Content-Type': ACCEPT_VERBOSE, 'X-RequestDigest': d },
    credentials: 'include',
    body: JSON.stringify({ __metadata: { type: 'SP.Folder' }, ServerRelativeUrl: serverRel }),
  });
  if (res.ok) return;
  const body = await res.text().catch(() => '');
  if (res.status === 409 || /exist|既に|already/i.test(body)) return;
  throw new Error('ensureFolder HTTP ' + res.status + ' ' + body.slice(0, 200));
}

/** ファイル本文をテキストで取得。存在しなければ null。 */
export async function readFileText(serverRel: string): Promise<string | null> {
  const res = await fetch(fileValueUrl(serverRel), { headers: { Accept: '*/*' }, credentials: 'include' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('readFile HTTP ' + res.status + ' (' + serverRel + ')');
  return res.text();
}

/** ファイル本文 + ETag を取得 (CAS 用)。存在しなければ null。 */
export async function readFileTextWithEtag(serverRel: string): Promise<{ text: string; etag: string } | null> {
  const res = await fetch(fileValueUrl(serverRel), { headers: { Accept: '*/*' }, credentials: 'include' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('readFile HTTP ' + res.status + ' (' + serverRel + ')');
  const text = await res.text();
  const etag = res.headers.get('ETag') || res.headers.get('etag') || '';
  return { text, etag };
}

/** テキストをファイルとしてアップロード (上書き)。folder は site 込み server-relative。 */
export async function uploadFileText(folder: string, name: string, text: string): Promise<void> {
  const d = await getDigest();
  const url = folderUrl(folder, "/Files/add(url='" + encodeURIComponent(name) + "',overwrite=true)");
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8', 'X-RequestDigest': d },
    credentials: 'include',
    body: text,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error('uploadFile(' + name + ') HTTP ' + res.status + ' ' + body.slice(0, 200));
  }
}

/** 既存ファイルを If-Match (ETag) で楽観ロック更新。412 で CasConflictError。
 *  etag が空文字なら通常の overwrite で書く (初回作成)。 */
export async function uploadFileTextCas(serverRel: string, text: string, ifMatch: string): Promise<void> {
  if (!ifMatch) {
    // 初回: フォルダ + ファイル名へ分解して overwrite 作成。
    const slash = serverRel.lastIndexOf('/');
    await uploadFileText(serverRel.slice(0, slash), serverRel.slice(slash + 1), text);
    return;
  }
  const d = await getDigest();
  const res = await fetch(fileValueUrl(serverRel), {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
      'X-RequestDigest': d,
      'X-HTTP-Method': 'PUT',
      'If-Match': ifMatch,
    },
    credentials: 'include',
    body: text,
  });
  if (res.status === 412) throw new CasConflictError();
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error('uploadFileTextCas HTTP ' + res.status + ' ' + body.slice(0, 200));
  }
}

/** 同名ファイルがあれば失敗するアップロード (segment 名衝突防止用)。
 *  作成成功なら true、既に存在なら false。 */
export async function uploadFileTextNoOverwrite(folder: string, name: string, text: string): Promise<boolean> {
  const d = await getDigest();
  const url = folderUrl(folder, "/Files/add(url='" + encodeURIComponent(name) + "',overwrite=false)");
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8', 'X-RequestDigest': d },
    credentials: 'include',
    body: text,
  });
  if (res.ok) return true;
  if (res.status === 409 || res.status === 400 || res.status === 500) {
    const body = await res.text().catch(() => '');
    if (/already exists|exists at|存在|already there/i.test(body)) return false;
  }
  const body = await res.text().catch(() => '');
  throw new Error('uploadFileTextNoOverwrite HTTP ' + res.status + ' ' + body.slice(0, 200));
}

/** ファイルを削除 (リセット用)。404 は成功扱い。 */
export async function deleteFile(serverRel: string): Promise<void> {
  const d = await getDigest();
  const res = await fetch(fileUrl(serverRel), {
    method: 'POST',
    headers: { 'X-RequestDigest': d, 'X-HTTP-Method': 'DELETE', 'IF-MATCH': '*' },
    credentials: 'include',
  });
  if (!res.ok && res.status !== 404) {
    const b = await res.text().catch(() => '');
    throw new Error('deleteFile HTTP ' + res.status + ' ' + b.slice(0, 200));
  }
}

/** フォルダ直下のファイル名一覧。フォルダが無ければ空配列。 */
export async function listFolderFileNames(folder: string): Promise<string[]> {
  const res = await fetch(folderUrl(folder, '/Files?$select=Name&$top=5000'), {
    headers: { Accept: ACCEPT_VERBOSE }, credentials: 'include',
  });
  if (!res.ok) return [];
  const json = (await res.json()) as { d?: { results?: { Name?: string }[] } };
  return (json.d?.results ?? []).map((f) => f.Name ?? '').filter(Boolean);
}
