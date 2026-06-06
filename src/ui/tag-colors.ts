// 選択肢(Choice)列のタグ色の上書き管理(localStorage)。
// 未設定の選択肢はプリセット(memola-sc-N)を使う。ここで設定すると個別に上書き。

import { prefDbTagColors } from '../lib/prefs';

/** 未指定の選択肢に割り当たるプリセット色(CSS memola-sc-0..5 と同値)。 */
export const TAG_PRESETS = ['#e8e4d8', '#dde6dc', '#dce2e6', '#e8dccf', '#f0d8d2', '#f0e3ef'];

/** 選択肢の実効色: 上書き色 > プリセット(選択肢の並び順で決定)。 */
export function resolveTagColor(listTitle: string, field: string, value: string, choices: string[]): string {
  return getTagColor(listTitle, field, value) || TAG_PRESETS[Math.max(0, choices.indexOf(value)) % 6];
}

/** 列×選択肢の色を取得(未設定なら ''). */
export function getTagColor(listTitle: string, field: string, value: string): string {
  return prefDbTagColors.get()[listTitle]?.[field]?.[value] || '';
}

/** 列×選択肢の色を設定。空文字でクリア(プリセットに戻す)。 */
export function setTagColor(listTitle: string, field: string, value: string, color: string): void {
  const all = prefDbTagColors.get();
  const list = all[listTitle] || (all[listTitle] = {});
  const f = list[field] || (list[field] = {});
  if (color) f[value] = color; else delete f[value];
  prefDbTagColors.set(all);
}
