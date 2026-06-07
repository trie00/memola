// DB行の本文アクセス。本文は **その行自身の `Body_blocks` 列にインライン保存**する
// (通常ページと同じ構造 = 「タイトル＋本文を1レコードに持つ行」)。
//
// 以前は memola-pages に `PageType='row'` の別レコードを作って本文を分離保存して
// いたが、「本文だけ別リスト/別レコード」という二重管理が混乱とバグ(タイトル混入等)
// の温床だった。これを廃し、通常ページ・DB行ともに「Body_blocks を持つリストの行」に
// 統一する。getRowBody/setRowBody は全消費者(行ページ・AI・履歴・CSV・デイリー)が
// 使う共通アクセサで、実体は対象リストの行の Body_blocks 1か所のみ。

import { updateListItem, ensureBodyBlocksColumn } from './sp-list';
import { spListUrl, spGetD } from './sp-rest';
import { mdToBlocks, blocksToMd } from '../lib/blocks-md';

/** DB行の本文を markdown 文字列で読む(行の Body_blocks 列から)。 */
export async function getRowBody(listTitle: string, dbRowId: number): Promise<string> {
  const url = spListUrl(listTitle, '/items(' + dbRowId + ')?$select=Body_blocks');
  const d = await spGetD<{ Body_blocks?: string }>(url);
  return blocksJsonToMd(d?.Body_blocks);
}

/** DB行の本文を block-tree JSON で読む(行ページのエディタ往復用)。 */
export async function getRowBodyBlocks(listTitle: string, dbRowId: number): Promise<string> {
  const url = spListUrl(listTitle, '/items(' + dbRowId + ')?$select=Body_blocks');
  const d = await spGetD<{ Body_blocks?: string }>(url);
  const raw = d?.Body_blocks;
  if (!raw) return '[]';
  try { if (!Array.isArray(JSON.parse(raw))) return '[]'; } catch { return '[]'; }
  return raw;
}

/** DB行の (title, body) を行自身に書き込む(インライン)。`body` は markdown でも
 *  Block[] JSON でも可。保存形式は常に block-tree JSON。`_parentDbId` は旧シグネチャ
 *  互換のため残置(未使用)。 */
export async function setRowBody(
  listTitle: string,
  dbRowId: number,
  _parentDbId: string,
  title: string,
  body: string,
): Promise<void> {
  await ensureBodyBlocksColumn(listTitle);
  await updateListItem(listTitle, dbRowId, { Title: title, Body_blocks: normalizeRowBody(body) });
}

/** 本文は行に内包されるため、別レコードの削除は不要(行を消せば本文も消える)。
 *  旧API互換のため no-op で残す。 */
export async function deleteRowEntry(_listTitle: string, _dbRowId: number): Promise<void> { /* no-op */ }
export async function deleteAllRowEntriesForList(_listTitle: string): Promise<void> { /* no-op */ }

/** Sniff: looks like a JSON-blocks payload (starts with `[`)?
 *  Anything else is assumed markdown and converted. Empty → '[]'. */
function normalizeRowBody(body: string): string {
  const trimmed = (body || '').trim();
  if (!trimmed) return '[]';
  if (trimmed.startsWith('[')) {
    try { if (Array.isArray(JSON.parse(trimmed))) return trimmed; } catch { /* fall through */ }
  }
  return JSON.stringify(mdToBlocks(body));
}

/** 保存済み block-tree JSON → markdown(レガシー consumer 用)。 */
function blocksJsonToMd(json: string | undefined | null): string {
  if (!json) return '';
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return '';
    return blocksToMd(parsed);
  } catch { return ''; }
}
