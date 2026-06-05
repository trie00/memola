// 選択肢(Choice)列のタグ色の上書き管理(localStorage)。
// 未設定の選択肢はプリセット(memola-sc-N)を使う。ここで設定すると個別に上書き。

import { prefDbTagColors } from '../lib/prefs';

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
