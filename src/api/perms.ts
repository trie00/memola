// 現在ユーザーのサイトに対する実効権限。参照のみのユーザーを検出して警告するため。

import { SITE } from '../config';
import { spGetD } from './sp-rest';

let _cache: { high: number; low: number } | null = null;

/** /_api/web/effectiveBasePermissions を取得(High/Low の 64bit マスク)。 */
async function getPerms(): Promise<{ high: number; low: number } | null> {
  if (_cache) return _cache;
  const d = await spGetD<{ High?: string | number; Low?: string | number }>(SITE + '/_api/web/effectiveBasePermissions');
  if (!d) return null;
  _cache = { high: Number(d.High || 0), low: Number(d.Low || 0) };
  return _cache;
}

// SP PermissionKind(1始まり)。has() は kind-1 のビットを Low/High で見る。
function has(p: { high: number; low: number }, kind: number): boolean {
  const idx = kind - 1;
  if (idx < 0) return false;
  if (idx < 32) return (p.low & (1 << idx)) !== 0;
  return (p.high & (1 << (idx - 32))) !== 0;
}

/** 書き込み(項目の追加/編集)が可能か。false = 参照のみ。
 *  取得失敗時は true(=ブロックしない/フェイルオープン)。 */
export async function canWrite(): Promise<boolean> {
  const p = await getPerms();
  if (!p) return true;
  // AddListItems = 2, EditListItems = 3(いずれも Low のビット)
  return has(p, 2) || has(p, 3);
}
