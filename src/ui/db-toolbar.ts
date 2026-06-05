// DB グリッドのツールバー配線。
//   - ビュー切替は動的な「ビューバー」(db-views-bar.ts)に移行。ここは描画の
//     実体 applyViewType() を提供する。
//   - CSV 取込/書出, 「＋新規」行, フィルターポップオーバーの外側クリック。

import { g } from './dom';
import { renderKanban } from './views';
import { exportCsv, importCsv } from './csv-io';
import { doNewDbRow } from './actions';
import { renderDbTable } from './views-table';
import type { DbViewType } from '../lib/prefs';

let _attached = false;

/** 指定タイプのビューを表示(コンテナの出し分け + 描画)。 */
export function applyViewType(type: DbViewType): void {
  g('dt-wrap').style.display = type === 'table' ? '' : 'none';
  g('dadd').style.display = type === 'table' ? '' : 'none';
  g('kb').classList.toggle('on', type === 'board');
  ['list', 'gallery', 'calendar', 'gantt'].forEach((v) => {
    g(v + '-view').classList.toggle('on', type === v);
  });
  if (type === 'table') renderDbTable();
  else if (type === 'board') renderKanban();
  else void import('./db-views-extra').then((m) => m.renderActiveView(type));
}

export function attachDbToolbar(): void {
  if (_attached) return;
  _attached = true;

  g('db-csv-export').addEventListener('click', exportCsv);
  g('db-csv-import').addEventListener('click', importCsv);
  document.getElementById('memola-db-new-row')?.addEventListener('click', doNewDbRow);

  // フィルターは列ヘッダのメニューから開く(ツールバーの＋フィルターは廃止)。
  void import('./filter-ui').then((m) => m.attachFilterPopoverOutsideClick());
}
