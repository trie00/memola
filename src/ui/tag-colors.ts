// 選択肢(Choice)/リレーション列のタグ色管理。
// 全員共通の設定として SharePoint(memola-db-config の tagColors)に保存する。
// 旧バージョンは localStorage(prefDbTagColors)だったため、読み取りはローカルへ
// フォールバックし、初回ロード時にローカル設定を共有側へ移行する。

import { prefDbTagColors } from '../lib/prefs';
import { loadDbConfig, patchDbConfig } from '../api/db-config';

type ListColors = Record<string, Record<string, string>>;   // field → value → color
const _shared = new Map<string, ListColors>();              // listTitle → colors

/** 未指定の選択肢に割り当たるプリセット色(CSS memola-sc-0..5 と同値)。 */
export const TAG_PRESETS = ['#e8e4d8', '#dde6dc', '#dce2e6', '#e8dccf', '#f0d8d2', '#f0e3ef'];

/** DBを開いた時に呼ぶ: 共有設定からタグ色を読み込む。共有側が空でローカルに
 *  設定が残っている場合は一度だけ共有へ移行する(旧localStorage版からの引継ぎ)。 */
export async function loadTagColors(listTitle: string): Promise<void> {
  try {
    const cfg = await loadDbConfig(listTitle);
    let colors = (cfg.tagColors || {}) as ListColors;
    const local = prefDbTagColors.get()[listTitle];
    if (Object.keys(colors).length === 0 && local && Object.keys(local).length > 0) {
      colors = local;
      await patchDbConfig(listTitle, { tagColors: colors }).catch(() => undefined);
    }
    _shared.set(listTitle, colors);
  } catch { _shared.set(listTitle, _shared.get(listTitle) || {}); }
}

/** 選択肢の実効色: 上書き色 > プリセット(選択肢の並び順で決定)。 */
export function resolveTagColor(listTitle: string, field: string, value: string, choices: string[]): string {
  return getTagColor(listTitle, field, value) || TAG_PRESETS[Math.max(0, choices.indexOf(value)) % 6];
}

/** 列×選択肢の色を取得(未設定なら ''). 共有設定→旧ローカル設定の順で見る。 */
export function getTagColor(listTitle: string, field: string, value: string): string {
  const shared = _shared.get(listTitle)?.[field]?.[value];
  if (shared) return shared;
  return prefDbTagColors.get()[listTitle]?.[field]?.[value] || '';
}

/** 列×選択肢の色を設定(全員共通)。空文字でクリア(プリセットに戻す)。 */
export function setTagColor(listTitle: string, field: string, value: string, color: string): void {
  const colors = _shared.get(listTitle) || {};
  const f = colors[field] || (colors[field] = {});
  if (color) f[value] = color; else delete f[value];
  _shared.set(listTitle, colors);
  void patchDbConfig(listTitle, { tagColors: colors }).catch(() => undefined);
}
