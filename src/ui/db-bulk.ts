// Bulk actions toolbar for DB row selection (Notion-style floating bar).
//
// Appears at the bottom-center of the screen whenever S.dbSelected is non-empty.
// Provides: 削除 / 複製 / 解除 actions over the selected rows.

import { S } from '../state';
import { setLoad, toast } from './ui-helpers';
import { renderDbTable } from './views';
import { deleteRowWithUndo, addRowWithUndo } from './db-history';

let _bar: HTMLElement | null = null;

function ensureBar(): HTMLElement {
  if (_bar && document.body.contains(_bar)) return _bar;
  const overlay = document.getElementById('n365-overlay') || document.body;
  const el = document.createElement('div');
  el.id = 'n365-db-bulkbar';
  el.className = 'n365-db-bulkbar';
  el.innerHTML =
    '<span class="n365-db-bulkbar-count">0 件選択</span>' +
    '<button class="n365-db-bulkbar-btn" data-act="dup">複製</button>' +
    '<button class="n365-db-bulkbar-btn danger" data-act="del">削除</button>' +
    '<button class="n365-db-bulkbar-btn ghost" data-act="clr">解除</button>';
  overlay.appendChild(el);
  el.addEventListener('click', onClick);
  _bar = el;
  return el;
}

function onClick(e: Event): void {
  const t = e.target as HTMLElement;
  const act = t.dataset?.act;
  if (!act) return;
  if (act === 'clr') {
    S.dbSelected.clear();
    renderBulkBar();
    renderDbTable();
    return;
  }
  if (act === 'del') void doDelete();
  else if (act === 'dup') void doDuplicate();
}

async function doDelete(): Promise<void> {
  const ids = Array.from(S.dbSelected);
  if (ids.length === 0) return;
  if (!confirm(`${ids.length} 件の行を削除しますか？`)) return;
  setLoad(true, '削除中...');
  try {
    for (const id of ids) {
      await deleteRowWithUndo(S.dbList, id).catch((err: Error) => {
        toast('削除失敗 (id=' + id + '): ' + err.message, 'err');
      });
    }
    S.dbSelected.clear();
    renderBulkBar();
    renderDbTable();
    toast(`${ids.length} 件削除しました（⌘Z で復元可能）`);
  } finally { setLoad(false); }
}

async function doDuplicate(): Promise<void> {
  const ids = Array.from(S.dbSelected);
  if (ids.length === 0) return;
  setLoad(true, '複製中...');
  try {
    // Refresh schema right before the run so we aren't relying on a stale
    // S.dbFields cache (e.g. if AI just added a column).
    const { getListFields } = await import('../api/sp-list');
    const fresh = await getListFields(S.dbList);
    const userFields = new Set(fresh.map((f) => f.InternalName));
    // Cache the shape of choice values for sanity checks (not enforced; SP will
    // ultimately validate). Used only for tracing.
    let created = 0;
    const errors: string[] = [];
    // Lazy-import to avoid extending the static import graph; getRowBody is
    // only needed when row-as-page bodies exist for the selected rows.
    const { getRowBody } = await import('../api/pages');
    for (const id of ids) {
      const item = S.dbItems.find((i) => i.Id === id);
      if (!item) continue;
      const data: Record<string, unknown> = {};
      for (const k of Object.keys(item)) {
        if (!userFields.has(k)) continue;
        const v = item[k];
        if (v == null) continue;
        if (typeof v === 'object') continue;
        // Strings: SP can reject zero-length-after-trim values for required fields.
        if (typeof v === 'string' && v.trim() === '') continue;
        data[k] = v;
      }
      if (!data.Title) data.Title = (item.Title as string) || '無題';
      try {
        // Carry over the row-page markdown body (notes/details stored under
        // n365-pages with PageType='row'). Without this, duplicates of rows
        // with rich detail pages would silently lose all that content.
        const body = await getRowBody(S.dbList, id).catch(() => '');
        const newItem = await addRowWithUndo(S.dbList, data, body || undefined);
        S.dbItems.push(newItem);
        created++;
      } catch (err) {
        errors.push(`id=${id}: ${(err as Error).message}`);
      }
    }
    S.dbSelected.clear();
    renderBulkBar();
    renderDbTable();
    if (errors.length === 0) {
      toast(`${created} 件複製しました`);
    } else if (created === 0) {
      toast('複製失敗: ' + errors[0], 'err');
    } else {
      toast(`${created} 件成功 / ${errors.length} 件失敗 (${errors[0]})`, 'err');
    }
    // eslint-disable-next-line no-console
    if (errors.length > 0) console.warn('[n365 duplicate errors]', errors);
  } finally { setLoad(false); }
}

/** Reposition the bar just above the filter/sort/group toolbar. */
function updateBarPosition(): void {
  const bar = _bar;
  if (!bar || !bar.classList.contains('on')) return;
  const tb = document.getElementById('n365-db-tb');
  if (!tb) return;
  const r = tb.getBoundingClientRect();
  const barH = bar.offsetHeight || 44;
  bar.style.top = Math.max(8, r.top - barH - 8) + 'px';
  bar.style.left = (r.left + r.width / 2) + 'px';
}

/** Click-outside-to-clear: clicking anywhere except the toolbar, a checkbox,
 *  or while holding Shift clears the selection and dismisses the bar. */
function onOutsideClick(e: MouseEvent): void {
  if (S.dbSelected.size === 0) return;
  const t = e.target as HTMLElement;
  if (!t) return;
  if (t.closest('.n365-db-bulkbar')) return;          // inside the toolbar
  if (t.closest('.n365-cb')) return;                  // checkbox toggle
  if (t.closest('#n365-row-handle')) return;          // drag handle
  if (e.shiftKey) return;                              // shift+click extends selection
  clearSelectionUI();
}

/** Clear selection state + remove visual marks without a full re-render. */
function clearSelectionUI(): void {
  S.dbSelected.clear();
  document.querySelectorAll('.n365-card-sel, .n365-tr-sel').forEach((el) => {
    el.classList.remove('n365-card-sel', 'n365-tr-sel');
  });
  document.querySelectorAll<HTMLInputElement>('#n365-dt .n365-cb').forEach((cb) => {
    cb.checked = false; cb.indeterminate = false;
  });
  const dt = document.getElementById('n365-dt');
  if (dt) dt.classList.remove('n365-has-sel');
  renderBulkBar();
}

/** Show / hide the bar based on current selection size. Re-render the count. */
export function renderBulkBar(): void {
  const bar = ensureBar();
  const n = S.dbSelected.size;
  const count = bar.querySelector<HTMLElement>('.n365-db-bulkbar-count');
  if (count) count.textContent = n + ' 件選択';
  const visible = n > 0 && S.currentType === 'database';
  bar.classList.toggle('on', visible);
  if (visible) {
    requestAnimationFrame(updateBarPosition);
    window.addEventListener('scroll', updateBarPosition, true);
    window.addEventListener('resize', updateBarPosition);
    document.addEventListener('mousedown', onOutsideClick, true);
  } else {
    window.removeEventListener('scroll', updateBarPosition, true);
    window.removeEventListener('resize', updateBarPosition);
    document.removeEventListener('mousedown', onOutsideClick, true);
  }
}

/** Force-hide (e.g. when leaving DB view). */
export function hideBulkBar(): void {
  if (_bar) _bar.classList.remove('on');
  window.removeEventListener('scroll', updateBarPosition, true);
  window.removeEventListener('resize', updateBarPosition);
  document.removeEventListener('mousedown', onOutsideClick, true);
}
