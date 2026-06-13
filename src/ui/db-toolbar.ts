// DB グリッドのツールバー配線。
//   - ビュー切替は動的な「ビューバー」(db-views-bar.ts)に移行。ここは描画の
//     実体 applyViewType() を提供する。
//   - CSV 取込/書出, 「＋新規」行, フィルターポップオーバーの外側クリック。

import { g } from './dom';
import { renderKanban } from './views';
import { exportCsv, importCsv } from './csv-io';
import { doNewDbRow } from './actions';
import { renderDbTable } from './views-table';
import { prefDbFullWidth, prefDbWrapText, type DbViewType } from '../lib/prefs';

let _attached = false;

/** 全幅・全文の表示状態を #memola-dv に反映(独立トグル)。DBを開いた時/切替時に呼ぶ。 */
export function applyDbDisplayMode(): void {
  const dv = document.getElementById('memola-dv');
  const fw = prefDbFullWidth.get(); const wr = prefDbWrapText.get();
  dv?.classList.toggle('db-fullwidth', fw);
  dv?.classList.toggle('db-wrap', wr);
  document.getElementById('memola-db-fullwidth')?.classList.toggle('on', fw);
  document.getElementById('memola-db-wraptext')?.classList.toggle('on', wr);
}
/** 旧名互換。 */
export function applyDbFullWidth(): void { applyDbDisplayMode(); }

/** DB切替時に行検索をリセット(検索状態は一時的・DBをまたいで持ち越さない)。 */
export function resetDbSearch(): void {
  const inp = document.getElementById('memola-db-search-inp') as HTMLInputElement | null;
  if (inp) { inp.value = ''; inp.style.display = 'none'; }
  document.getElementById('memola-db-search-btn')?.classList.remove('on');
  void import('./views-table').then((m) => m.setDbSearchQuery('', false));
}

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
  document.getElementById('memola-db-fullwidth')?.addEventListener('click', () => {
    prefDbFullWidth.set(!prefDbFullWidth.get());
    applyDbDisplayMode();
  });
  document.getElementById('memola-db-wraptext')?.addEventListener('click', () => {
    prefDbWrapText.set(!prefDbWrapText.get());
    applyDbDisplayMode();
  });
  // ▽ フィルター: 列の選択ポップオーバー(既存 showFilterPopover が
  // #memola-db-filter-btn を基準に表示する)。
  document.getElementById('memola-db-filter-btn')?.addEventListener('click', () => {
    void import('./filter-ui').then((m) => m.showFilterPopover());
  });
  // 🔎 検索: 入力欄をトグルして、入力で行を絞り込み(全データ列を contains)。
  const searchBtn = document.getElementById('memola-db-search-btn');
  const searchInp = document.getElementById('memola-db-search-inp') as HTMLInputElement | null;
  searchBtn?.addEventListener('click', () => {
    if (!searchInp) return;
    const show = searchInp.style.display === 'none';
    searchInp.style.display = show ? '' : 'none';
    searchBtn.classList.toggle('on', show);
    if (show) { searchInp.focus(); }
    else { searchInp.value = ''; void import('./views-table').then((m) => m.setDbSearchQuery('')); }
  });
  searchInp?.addEventListener('input', () => {
    void import('./views-table').then((m) => m.setDbSearchQuery(searchInp.value));
  });
  searchInp?.addEventListener('keydown', (e) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      searchInp.value = '';
      searchInp.style.display = 'none';
      searchBtn?.classList.remove('on');
      void import('./views-table').then((m) => m.setDbSearchQuery(''));
    }
  });
  document.getElementById('memola-db-new-row')?.addEventListener('click', doNewDbRow);
  document.getElementById('memola-db-add-formula')?.addEventListener('click', (e) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    void import('./db-formulas').then((m) => m.openNewFormula(r.left, r.bottom + 4));
  });

  // フィルターは列ヘッダのメニューから開く(ツールバーの＋フィルターは廃止)。
  void import('./filter-ui').then((m) => m.attachFilterPopoverOutsideClick());
}
