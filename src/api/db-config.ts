// DB ごとの共有設定(数式列など)を SharePoint に保存する。
// 専用リスト `memola-db-config` に「DBリスト名 → 設定JSON」を1行ずつ持つ。
// ブラウザローカルではなく全員で共有される(DBスキーマと同じ扱い)。

import { ensureList, getListItems, createListItem, updateListItem, type FieldSpec } from './sp-list';
import type { DbFormulaDef, DbLookupDef, DbRollupDef } from '../lib/prefs';

const LIST = 'memola-db-config';
const FIELDS: FieldSpec[] = [
  { name: 'ListKey', kind: 2, indexed: true },   // 対象DBリスト名(キー)
  { name: 'ConfigJson', kind: 3 },               // 設定JSON(Note)
];

export interface DbConfig {
  formulas?: DbFormulaDef[];
  lookups?: DbLookupDef[];
  rollups?: DbRollupDef[];
  /** タグ(チップ)の色。field内部名 → 選択肢値 → 色。全員共通。 */
  tagColors?: Record<string, Record<string, string>>;
}

let _ensured = false;
async function ensure(): Promise<void> {
  if (_ensured) return;
  await ensureList({ title: LIST, fields: FIELDS });
  _ensured = true;
}

async function findItem(listKey: string): Promise<{ Id: number; ConfigJson?: string } | null> {
  const items = await getListItems(LIST);   // 設定リストは小さい(DB数ぶん)ので全取得で十分
  const it = items.find((i) => (i as Record<string, unknown>).ListKey === listKey);
  return (it as unknown as { Id: number; ConfigJson?: string }) || null;
}

export async function loadDbConfig(listKey: string): Promise<DbConfig> {
  await ensure();
  const it = await findItem(listKey);
  if (!it?.ConfigJson) return {};
  try { return JSON.parse(it.ConfigJson) as DbConfig; } catch { return {}; }
}

/** DBの設定行ごと削除(DB本体を完全削除した時の掃除用)。 */
export async function deleteDbConfig(listKey: string): Promise<void> {
  await ensure();
  const it = await findItem(listKey);
  if (it) {
    const { deleteListItem } = await import('./sp-list');
    await deleteListItem(LIST, it.Id).catch(() => undefined);
  }
}

/** 設定の部分更新(他キーを保持したままマージ保存)。 */
export async function patchDbConfig(listKey: string, patch: Partial<DbConfig>): Promise<void> {
  await ensure();
  const it = await findItem(listKey);
  const cur: DbConfig = it?.ConfigJson ? (() => { try { return JSON.parse(it.ConfigJson!) as DbConfig; } catch { return {}; } })() : {};
  const next = { ...cur, ...patch };
  const json = JSON.stringify(next);
  if (it) await updateListItem(LIST, it.Id, { ConfigJson: json });
  else await createListItem(LIST, { Title: listKey.slice(0, 255), ListKey: listKey, ConfigJson: json });
}
