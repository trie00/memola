// DB のビューバー(#memola-db-views を動的描画)。
//   - 各ビューをチップ表示。クリックで切替、アクティブを再クリックでメニュー。
//   - 「＋」でビュー追加(タイプ選択)。メニューで 名前変更 / タイプ変更 / 削除。
// 既定ビュー(テーブル)は削除・タイプ変更不可。

import { S } from '../state';
import { g } from './dom';
import { ICONS } from '../icons';
import type { DbViewType } from '../lib/prefs';
import {
  listViews, getView, setActiveViewId, addView, renameView, changeViewType,
  deleteView, isDefaultView, VIEW_TYPE_LABEL, getActiveViewId,
} from './db-views-model';
import { applyViewType } from './db-toolbar';

const TYPE_ICON: Record<DbViewType, string> = {
  table: ICONS.table, board: ICONS.board, list: ICONS.ul,
  gallery: ICONS.codeBlock, calendar: ICONS.info, gantt: ICONS.sort,
};
const ALL_TYPES: DbViewType[] = ['table', 'board', 'list', 'gallery', 'calendar', 'gantt'];

let _pop: HTMLElement | null = null;
function closePop(): void { if (_pop) { _pop.remove(); _pop = null; } }

/** active ビューの保存内容(filters/sort/type)を画面に反映。 */
export function applyActiveView(): void {
  const view = getView(S.dbList, S.dbViewId);
  S.dbFilters = view.filters.map((f) => ({ ...f }));
  S.dbSort = { field: view.sort.field, asc: view.sort.asc };
  void import('./filter-ui').then((m) => m.renderFilterChips());
  applyViewType(view.type);
}

export function switchView(id: string): void {
  S.dbViewId = id;
  setActiveViewId(S.dbList, id);
  renderViewBar();
  applyActiveView();
}

/** DB を開いた時/ビュー変更時にバーを描画。 */
export function renderViewBar(): void {
  const bar = document.getElementById('memola-db-views');
  if (!bar) return;
  closePop();
  if (!S.dbViewId) S.dbViewId = getActiveViewId(S.dbList);
  bar.innerHTML = '';

  for (const v of listViews(S.dbList)) {
    const active = v.id === S.dbViewId;
    const btn = document.createElement('button');
    btn.className = 'memola-db-vbtn' + (active ? ' on' : '');
    btn.innerHTML = TYPE_ICON[v.type] + '<span class="memola-vname"></span>';
    (btn.querySelector('.memola-vname') as HTMLElement).textContent = v.name;
    btn.addEventListener('click', (e) => {
      if (active) openViewMenu(v.id, btn, e);
      else switchView(v.id);
    });
    bar.appendChild(btn);
  }

  const add = document.createElement('button');
  add.className = 'memola-db-vadd';
  add.title = 'ビューを追加';
  add.innerHTML = ICONS.plus;
  add.addEventListener('click', () => openAddMenu(add));
  bar.appendChild(add);
}

function popover(anchor: HTMLElement): HTMLElement {
  closePop();
  const r = anchor.getBoundingClientRect();
  const pop = document.createElement('div');
  pop.className = 'memola-colmenu';
  pop.style.left = Math.round(r.left) + 'px';
  pop.style.top = Math.round(r.bottom + 4) + 'px';
  (document.getElementById('memola-overlay') || document.body).appendChild(pop);
  const onOut = (e: MouseEvent): void => {
    if (_pop && !_pop.contains(e.target as Node) && !anchor.contains(e.target as Node)) {
      closePop(); document.removeEventListener('mousedown', onOut, true);
    }
  };
  setTimeout(() => document.addEventListener('mousedown', onOut, true), 0);
  _pop = pop;
  return pop;
}

function menuItem(label: string, icon: string, onClick: () => void, danger = false): HTMLElement {
  const el = document.createElement('div');
  el.className = 'memola-colmenu-item' + (danger ? ' danger' : '');
  el.style.cssText = 'display:flex;align-items:center;gap:8px';
  el.innerHTML = (icon ? '<span class="memola-mi-ic">' + icon + '</span>' : '') + '<span></span>';
  (el.querySelector('span:last-child') as HTMLElement).textContent = label;
  el.addEventListener('click', () => { closePop(); onClick(); });
  return el;
}

function openAddMenu(anchor: HTMLElement): void {
  const pop = popover(anchor);
  const hdr = document.createElement('div');
  hdr.className = 'memola-colmenu-item';
  hdr.style.cssText = 'font-weight:600;color:var(--ink-3);cursor:default';
  hdr.textContent = 'ビューを追加';
  pop.appendChild(hdr);
  pop.appendChild(Object.assign(document.createElement('div'), { className: 'memola-colmenu-sep' }));
  for (const t of ALL_TYPES) {
    pop.appendChild(menuItem(VIEW_TYPE_LABEL[t], TYPE_ICON[t], () => {
      const v = addView(S.dbList, t);
      switchView(v.id);
    }));
  }
}

function openViewMenu(viewId: string, anchor: HTMLElement, _e: MouseEvent): void {
  const pop = popover(anchor);
  const isDef = isDefaultView(viewId);

  pop.appendChild(menuItem('名前を変更', ICONS.gear, () => startRename(viewId, anchor)));

  if (!isDef) {
    const hdr = document.createElement('div');
    hdr.className = 'memola-colmenu-item';
    hdr.style.cssText = 'font-weight:600;color:var(--ink-3);cursor:default;font-size:var(--fs-xs)';
    hdr.textContent = 'タイプを変更';
    pop.appendChild(Object.assign(document.createElement('div'), { className: 'memola-colmenu-sep' }));
    pop.appendChild(hdr);
    const cur = getView(S.dbList, viewId).type;
    for (const t of ALL_TYPES) {
      pop.appendChild(menuItem((t === cur ? '● ' : '○ ') + VIEW_TYPE_LABEL[t], TYPE_ICON[t], () => {
        changeViewType(S.dbList, viewId, t);
        renderViewBar();
        if (viewId === S.dbViewId) applyActiveView();
      }));
    }
    pop.appendChild(Object.assign(document.createElement('div'), { className: 'memola-colmenu-sep' }));
    pop.appendChild(menuItem('このビューを削除', ICONS.trash, () => {
      if (!confirm('このビューを削除しますか？')) return;
      const wasActive = viewId === S.dbViewId;
      deleteView(S.dbList, viewId);
      if (wasActive) switchView(getActiveViewId(S.dbList));
      else renderViewBar();
    }, true));
  } else {
    const note = document.createElement('div');
    note.className = 'memola-colmenu-item';
    note.style.cssText = 'color:var(--ink-4);cursor:default;font-size:var(--fs-xs)';
    note.textContent = '既定ビュー(テーブル・削除不可)';
    pop.appendChild(note);
  }
}

/** チップをその場でインライン編集して改名(上部の入力ボックスは使わない)。 */
function startRename(viewId: string, anchor: HTMLElement): void {
  const cur = getView(S.dbList, viewId).name;
  anchor.innerHTML = '';
  const inp = document.createElement('input');
  inp.className = 'memola-vname-edit';
  inp.value = cur;
  anchor.appendChild(inp);
  inp.focus(); inp.select();
  const commit = (): void => { renameView(S.dbList, viewId, inp.value); renderViewBar(); };
  inp.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); inp.blur(); }
    if (e.key === 'Escape') { e.preventDefault(); renderViewBar(); }
  });
  inp.addEventListener('blur', commit);
}
