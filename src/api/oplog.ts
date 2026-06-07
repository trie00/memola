// 操作ログ(変更系のみ)。ページの作成/削除、権限変更を SharePoint の共有リスト
// `memola-oplog` に記録する。参照系・AIチャット自体は記録しない(AIがページを
// 作成/削除した場合のみ Source='ai' で記録)。各エントリには実行した REST API の
// メソッド/URL を残し、どのコマンドが走ったか分かるようにする(別アプリと同形式)。

import { ensureList, createListItem, getListItems, type FieldSpec } from './sp-list';
import type { ListItem } from '../state';

const LIST = 'memola-oplog';
const FIELDS: FieldSpec[] = [
  { name: 'Action', kind: 2, indexed: true },  // page.create / page.delete / acl.change 等
  { name: 'Target', kind: 2 },                 // 対象(ページタイトル/ID, リスト名 等)
  { name: 'Method', kind: 2 },                 // REST メソッド(POST 等)
  { name: 'Url', kind: 3 },                     // REST エンドポイント
  { name: 'Detail', kind: 3 },                  // 補足(body 要約など)
  { name: 'Source', kind: 2 },                  // user / ai
];

let _ensured = false;
let _src: 'user' | 'ai' = 'user';
/** 以降のログの発生源を切り替える(AIツール実行中は 'ai')。 */
export function setLogSource(s: 'user' | 'ai'): void { _src = s; }
export function getLogSource(): 'user' | 'ai' { return _src; }

async function ensure(): Promise<void> {
  if (_ensured) return;
  await ensureList({ title: LIST, fields: FIELDS });
  _ensured = true;
}

export interface OpLogEntry { action: string; target?: string; method?: string; url?: string; detail?: string }

/** 変更を1件記録(ベストエフォート・失敗しても本処理は止めない)。 */
export async function logOp(e: OpLogEntry): Promise<void> {
  const src = _src;   // 呼び出し時点の発生源を確定(後で reset されても固定)
  try {
    await ensure();
    await createListItem(LIST, {
      Title: (e.action + ' ' + (e.target || '')).slice(0, 255),
      Action: e.action,
      Target: (e.target || '').slice(0, 255),
      Method: e.method || '',
      Url: e.url || '',
      Detail: e.detail || '',
      Source: src,
    });
  } catch { /* ログ失敗は無視 */ }
}

/** 直近のログを新しい順に取得(設定画面のビューア用)。 */
export async function listOps(limit = 100): Promise<ListItem[]> {
  await ensure();
  const items = await getListItems(LIST, 'Id,Action,Target,Method,Url,Detail,Source,Created');
  items.sort((a, b) => String(b.Created || '').localeCompare(String(a.Created || '')));
  return items.slice(0, limit);
}
