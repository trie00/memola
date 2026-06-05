// DB table view: header rendering with column drag/resize, body rendering
// with editable cells (text / date / choice), shift-range row selection.
//
// `mkOpenRowBtn` lives here because it's the row's "↗" button used both
// by the table view (Title-column hover) and by the kanban / gallery
// card renderers.

import { S, type ListField, type ListItem } from '../state';
import { g } from './dom';
import { setLoad, setSave, toast } from './ui-helpers';
import { apiUpdateDbRow } from '../api/db';
import { formatDateJST, parseFlexibleDate } from '../lib/date-utils';
import {
  applyColOrder, saveColOrder, loadColOrder,
  applyRowOrder, saveRowOrder, loadRowOrder,
  moveItem,
} from '../lib/db-order';
import { recordCellChange, recordRowOrderChange, recordColOrderChange, deleteRowWithUndo } from './db-history';
import { renderBulkBar } from './db-bulk';
import {
  getDbColors, gcDbColors, cellOverlay,
} from './db-view-colors';
import { getTagColor } from './tag-colors';
import type { DbColorMap } from '../lib/prefs';

/** View-level colour overlay for the current render pass. Set at the top of
 *  renderDbTable so mkDbRow / header can read it without re-parsing prefs. */
let _renderColors: DbColorMap = {};

export function getDbFields(): ListField[] {
  // 2=text, 3=multiline, 4=date, 6=choice, 8=bool, 9=number
  const filtered = S.dbFields.filter((f) => [2, 3, 4, 6, 8, 9].indexOf(f.FieldTypeKind) >= 0);
  // Honour the user's saved column order (drag-reorder); new fields appended.
  return applyColOrder(filtered, S.dbList);
}

export function getSortedFilteredItems(): ListItem[] {
  let items = S.dbItems.slice();
  // Notion 風の複数フィールド AND フィルター
  if (S.dbFilters.length > 0) {
    // 動的import回避のため inline 評価（filter-ui.ts と同等ロジック）
    items = items.filter((item) => {
      for (const flt of S.dbFilters) {
        if (!flt.value && flt.op !== 'empty' && flt.op !== 'not_empty') continue;
        const raw = item[flt.field];
        const s = raw == null ? '' : String(raw);
        if (flt.op === 'equals') {
          if (s !== flt.value) return false;
        } else if (flt.op === 'not_empty') {
          if (!s) return false;
        } else if (flt.op === 'empty') {
          if (s) return false;
        } else {
          if (!s.toLowerCase().includes(flt.value.toLowerCase())) return false;
        }
      }
      return true;
    });
  }
  if (S.dbSort.field) {
    const field = S.dbSort.field;
    const asc = S.dbSort.asc;
    items.sort((a, b) => {
      const av = a[field] != null ? String(a[field]) : '';
      const bv = b[field] != null ? String(b[field]) : '';
      if (av < bv) return asc ? -1 : 1;
      if (av > bv) return asc ? 1 : -1;
      return 0;
    });
  } else {
    // No sort active → respect user's manual drag-reorder order
    items = applyRowOrder(items, S.dbList);
  }
  return items;
}

// True when manual row-drag is allowed (no sort applied).
export function isManualRowOrderActive(): boolean {
  return S.dbSort.field == null;
}

/** Move one or more rows to before/after `targetId` and persist the order.
 *  Accepts either a single id or an array; multi-row drags from selection. */
export function reorderRows(
  fromIds: number | number[],
  targetId: number,
  dropAfter: boolean,
): void {
  const ids = (Array.isArray(fromIds) ? fromIds : [fromIds]).filter((x) => x !== targetId);
  if (ids.length === 0) return;
  const prevOrder = loadRowOrder(S.dbList) || [];
  const visual = applyRowOrder(S.dbItems.slice(), S.dbList).map((i) => i.Id);
  // Preserve the source rows' visual order — sort ids by their current index
  const sortedIds = ids.slice().sort((a, b) => visual.indexOf(a) - visual.indexOf(b));
  // Remove all dragged ids
  for (const id of sortedIds) {
    const idx = visual.indexOf(id);
    if (idx >= 0) visual.splice(idx, 1);
  }
  let targetIdx = visual.indexOf(targetId);
  if (targetIdx < 0) targetIdx = visual.length;
  if (dropAfter) targetIdx += 1;
  // Insert in original order at the target position
  visual.splice(targetIdx, 0, ...sortedIds);
  saveRowOrder(S.dbList, visual);
  recordRowOrderChange(S.dbList, prevOrder, visual);
  renderDbTable();
  void import('./db-views-extra').then((m) => {
    if (g('list-view').classList.contains('on')) m.renderListView();
    if (g('gallery-view').classList.contains('on')) m.renderGalleryView();
    if (g('calendar-view').classList.contains('on')) m.renderCalendarView();
    if (g('gantt-view').classList.contains('on')) m.renderGanttView();
  });
}

// Anchor for shift-click range selection. Reset on DB switch / clear-all.
let _lastClickedId: number | null = null;
export function setSelectionAnchor(id: number | null): void { _lastClickedId = id; }

export function renderDbTable(): void {
  const thead = g('dth-row');
  const tbody = g('dtb');
  thead.innerHTML = ''; tbody.innerHTML = '';
  const fields = getDbFields();
  // View-level colour overlay (option A): read once per render, prune stale rows.
  _renderColors = getDbColors(S.dbList);
  gcDbColors(S.dbList, S.dbItems.map((it) => it.Id));

  // Reflect "any-selected" mode on the table so CSS can switch to always-show
  const dt = g('dt');
  dt.classList.toggle('memola-has-sel', S.dbSelected.size > 0);
  renderBulkBar();

  // Leading checkbox column (header) — selects/clears all visible rows
  const thCb = document.createElement('th');
  thCb.className = 'memola-th-cb';
  const headCb = document.createElement('input');
  headCb.type = 'checkbox';
  headCb.className = 'memola-cb';
  const visibleItems = getSortedFilteredItems();
  const visIds = visibleItems.map((it) => it.Id);
  const selVisCount = visIds.filter((id) => S.dbSelected.has(id)).length;
  if (selVisCount === 0) headCb.checked = false;
  else if (selVisCount === visIds.length) headCb.checked = true;
  else { headCb.indeterminate = true; }
  headCb.addEventListener('change', () => {
    if (headCb.checked) {
      visIds.forEach((id) => S.dbSelected.add(id));
    } else {
      visIds.forEach((id) => S.dbSelected.delete(id));
    }
    renderDbTable();
  });
  thCb.appendChild(headCb);
  thead.appendChild(thCb);

  fields.forEach((f, idx) => {
    const th = document.createElement('th');
    const isSorted = S.dbSort.field === f.InternalName;
    const headerSpan = document.createElement('span');
    headerSpan.className = 'memola-th-label';
    headerSpan.innerHTML = f.Title + (isSorted ? '<span class="sort-arrow">' + (S.dbSort.asc ? '▲' : '▼') + '</span>' : '');
    th.appendChild(headerSpan);
    th.dataset.field = f.InternalName;
    th.dataset.colIdx = String(idx);
    th.draggable = true;            // ← columns are drag-reorderable
    const savedW = S.dbColumnWidths[f.InternalName];
    if (savedW) th.style.width = savedW + 'px';
    // 列ヘッダのクリック → Notion 風の列操作メニュー(並べ替え/フィルター/選択肢追加/削除)。
    headerSpan.addEventListener('click', (e) => {
      e.stopPropagation();
      const r = headerSpan.getBoundingClientRect();
      void import('./col-menu').then((m) => m.openColumnMenu(f, r.left, r.bottom + 4));
    });
    // ── Column drag-reorder ─────────────────────────────
    th.addEventListener('dragstart', (e) => {
      if (!e.dataTransfer) return;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/memola-col', String(idx));
      th.classList.add('memola-th-dragging');
    });
    th.addEventListener('dragend', () => th.classList.remove('memola-th-dragging'));
    th.addEventListener('dragover', (e) => {
      const dt = e.dataTransfer;
      if (!dt) return;
      // Accept only column drags
      if (Array.from(dt.types).indexOf('text/memola-col') < 0) return;
      e.preventDefault();
      dt.dropEffect = 'move';
      const rect = th.getBoundingClientRect();
      const after = e.clientX > rect.left + rect.width / 2;
      th.classList.toggle('memola-th-drop-before', !after);
      th.classList.toggle('memola-th-drop-after', after);
    });
    th.addEventListener('dragleave', () => {
      th.classList.remove('memola-th-drop-before', 'memola-th-drop-after');
    });
    th.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (!dt) return;
      const fromStr = dt.getData('text/memola-col');
      if (!fromStr) return;
      e.preventDefault();
      const from = parseInt(fromStr, 10);
      const rect = th.getBoundingClientRect();
      const after = e.clientX > rect.left + rect.width / 2;
      const to = after ? idx + 1 : idx;
      th.classList.remove('memola-th-drop-before', 'memola-th-drop-after');
      const prevOrder = loadColOrder(S.dbList) || [];
      const newFields = moveItem(fields, from, to);
      const newOrder = newFields.map((x) => x.InternalName);
      saveColOrder(S.dbList, newOrder);
      recordColOrderChange(S.dbList, prevOrder, newOrder);
      renderDbTable();
    });
    // Resize handle
    const handle = document.createElement('div');
    handle.className = 'memola-col-resize';
    handle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const startX = e.clientX;
      const startW = th.offsetWidth;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      function onMove(ev: MouseEvent): void {
        const newW = Math.max(60, startW + ev.clientX - startX);
        th.style.width = newW + 'px';
        S.dbColumnWidths[f.InternalName] = newW;
      }
      function onUp(): void {
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
    th.appendChild(handle);
    thead.appendChild(th);
  });

  // Delete column header (icon column)
  const thDel = document.createElement('th'); thDel.className = 'memola-th-del'; thead.appendChild(thDel);
  // "+" column right after the data columns
  const thAdd = document.createElement('th'); thAdd.className = 'memola-th-add';
  thAdd.textContent = '+'; thAdd.title = '列を追加';
  thAdd.addEventListener('click', () => {
    (g('col-name') as HTMLInputElement).value = '';
    // Reset grid type selection by clicking the first tile (syncs _colTypeKind in wiring.ts)
    const tiles = document.querySelectorAll<HTMLDivElement>('#memola-col-type-grid .memola-col-type');
    if (tiles[0]) tiles[0].click();
    // Reset choices & SP map fields
    const choicesEl = document.getElementById('memola-col-choices') as HTMLTextAreaElement | null;
    if (choicesEl) choicesEl.value = '';
    g('col-choices-row').classList.remove('on');
    const spmap = document.getElementById('memola-col-spmap') as HTMLInputElement | null;
    if (spmap) spmap.value = '';
    g('col-md').classList.add('on');
    (g('col-name') as HTMLInputElement).focus();
  });
  thead.appendChild(thAdd);
  // Spacer column to absorb remaining horizontal space (so + stays adjacent to last data column)
  const thSpacer = document.createElement('th');
  thSpacer.className = 'memola-th-spacer';
  thead.appendChild(thSpacer);

  getSortedFilteredItems().forEach((item) => { tbody.appendChild(mkDbRow(item, fields)); });
}

/** Build the small "↗" link button that opens a DB row as a full page.
 *  Reusable across all DB view renderers (table / board / list / etc.). */
export function mkOpenRowBtn(item: ListItem): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = 'memola-row-open';
  btn.title = '行を開く（ページ表示）';
  btn.textContent = '↗';
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    // DB は1タブのまま、項目(行)は新しいタブで開く(openRowInActiveTab が未オープン→新タブ)。
    void import('./row-page').then((m) => m.openRowAsPage(S.currentId || '', item));
  });
  return btn;
}

export function mkDbRow(item: ListItem, fields: ListField[]): HTMLTableRowElement {
  const tr = document.createElement('tr');
  tr.dataset.id = String(item.Id);
  // Drag is initiated via the floating handle (db-row-drag.ts), not the row
  // itself. The row only carries dataset.id so the centralized handler can
  // identify it.

  // Shift+click anywhere on the row (except the checkbox / open / delete
  // buttons) → toggle the row's checkbox and prevent cell editing.
  // Capture phase so we run before the cell's own focus / contenteditable.
  tr.addEventListener('mousedown', (e) => {
    if (!e.shiftKey) return;
    const t = e.target as HTMLElement;
    if (!t) return;
    if (t.closest('.memola-cb')) return;            // shift-range on checkbox itself
    if (t.closest('.memola-row-open')) return;
    if (t.closest('.memola-del-btn')) return;
    e.preventDefault();
    e.stopPropagation();
    const cb = tr.querySelector<HTMLInputElement>('.memola-cb');
    if (!cb) return;
    cb.checked = !cb.checked;
    cb.dispatchEvent(new Event('change'));
  }, true);

  // Leading checkbox cell — visibility controlled via CSS (hover or any-selected)
  const cbTd = document.createElement('td');
  cbTd.className = 'memola-td-cb';
  const _rowBg = _renderColors.rows?.[String(item.Id)];
  if (_rowBg) cbTd.style.background = _rowBg;     // colour the whole row, incl. the cb cell
  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.className = 'memola-cb';
  cb.checked = S.dbSelected.has(item.Id);
  if (cb.checked) tr.classList.add('memola-tr-sel');
  cb.addEventListener('click', (e) => {
    const me = e as MouseEvent;
    e.stopPropagation();
    // Shift+click: select the range from the last anchor to this row, inclusive.
    if (me.shiftKey && _lastClickedId !== null && _lastClickedId !== item.Id) {
      e.preventDefault();
      const visible = getSortedFilteredItems().map((it) => it.Id);
      const a = visible.indexOf(_lastClickedId);
      const b = visible.indexOf(item.Id);
      if (a >= 0 && b >= 0) {
        const [from, to] = a < b ? [a, b] : [b, a];
        // The newly clicked row's intended state determines whether we add or remove.
        // Use opposite of *current* value (since browser default would also flip).
        const turnOn = !cb.checked;
        for (let i = from; i <= to; i++) {
          if (turnOn) S.dbSelected.add(visible[i]);
          else S.dbSelected.delete(visible[i]);
        }
        _lastClickedId = item.Id;
        renderDbTable();
      }
    }
  });
  cb.addEventListener('change', () => {
    if (cb.checked) S.dbSelected.add(item.Id);
    else S.dbSelected.delete(item.Id);
    _lastClickedId = item.Id;
    tr.classList.toggle('memola-tr-sel', cb.checked);
    g('dt').classList.toggle('memola-has-sel', S.dbSelected.size > 0);
    renderBulkBar();
    // Update header checkbox state without full re-render
    const head = document.querySelector<HTMLInputElement>('.memola-th-cb .memola-cb');
    if (head) {
      const visible = getSortedFilteredItems().map((it) => it.Id);
      const selCount = visible.filter((id) => S.dbSelected.has(id)).length;
      head.indeterminate = selCount > 0 && selCount < visible.length;
      head.checked = selCount > 0 && selCount === visible.length;
    }
  });
  cbTd.appendChild(cb);
  tr.appendChild(cbTd);
  fields.forEach((f) => {
    const td = document.createElement('td');
    // View-level highlight overlay (column colour wins over row colour).
    const _ovBg = cellOverlay(_renderColors, item.Id, f.InternalName);
    if (_ovBg) td.style.background = _ovBg;

    if (f.FieldTypeKind === 4) {
      // ── Date cell (JST display, JST 0時 → UTC ISO で保存) ──
      const wrapper = document.createElement('div');
      wrapper.className = 'memola-dc-date';
      let raw = (item[f.InternalName] as string) || '';
      function renderText(): void {
        const txt = formatDateJST(raw);
        wrapper.innerHTML = '';
        const span = document.createElement('span');
        span.textContent = txt || '—';
        if (!txt) span.style.color = 'var(--ink-4)';
        wrapper.appendChild(span);
      }
      function showInput(): void {
        wrapper.innerHTML = '';
        const wrap = document.createElement('span');
        wrap.className = 'memola-dc-date-wrap';
        const inp = document.createElement('input');
        inp.type = 'text';
        inp.className = 'memola-dc-date-inp';
        inp.placeholder = 'YYYY-MM-DD';
        inp.value = formatDateJST(raw);
        const pick = document.createElement('input');
        pick.type = 'date';
        pick.className = 'memola-dc-date-pick';
        pick.value = formatDateJST(raw);
        pick.tabIndex = -1;
        pick.title = 'カレンダーから選択';
        wrap.append(inp, pick);
        wrapper.appendChild(wrap);
        inp.focus();
        inp.select();

        let committing = false;
        function applyEmpty(): void {
          if (!raw) { renderText(); return; }
          committing = true;
          const oldRaw = raw;
          raw = '';
          item[f.InternalName] = '';
          setSave('保存中...');
          apiUpdateDbRow(S.dbList, item.Id, { [f.InternalName]: '' })
            .then(() => {
              setSave(''); renderText();
              recordCellChange(S.dbList, item.Id, f.InternalName, f.Title, oldRaw, '');
            })
            .catch((e: Error) => {
              toast(e.message, 'err');
              raw = oldRaw; item[f.InternalName] = oldRaw; renderText();
            });
        }
        function applyValue(norm: string): void {
          if (norm === raw) { renderText(); return; }
          committing = true;
          const oldRaw = raw;
          raw = norm;
          item[f.InternalName] = norm;
          setSave('保存中...');
          apiUpdateDbRow(S.dbList, item.Id, { [f.InternalName]: norm })
            .then(() => {
              setSave(''); renderText();
              recordCellChange(S.dbList, item.Id, f.InternalName, f.Title, oldRaw, norm);
            })
            .catch((e: Error) => {
              toast(e.message, 'err');
              raw = oldRaw; item[f.InternalName] = oldRaw; renderText();
            });
        }
        function commitText(val: string): void {
          if (committing) return;
          const trimmed = val.trim();
          if (!trimmed) { applyEmpty(); return; }
          const norm = parseFlexibleDate(trimmed);
          if (!norm) {
            toast('日付形式が無効です: ' + trimmed, 'err');
            inp.focus();
            return;
          }
          applyValue(norm);
        }
        inp.addEventListener('blur', (e) => {
          // Don't commit if focus moved to the calendar picker — wait for its change
          const next = (e as FocusEvent).relatedTarget as Element | null;
          if (next === pick) return;
          commitText(inp.value);
        });
        inp.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') { e.preventDefault(); commitText(inp.value); }
          if (e.key === 'Escape') { renderText(); }
        });
        pick.addEventListener('change', () => {
          if (pick.value) applyValue(pick.value);
          else applyEmpty();
        });
      }
      wrapper.addEventListener('click', () => {
        if (!wrapper.querySelector('input')) showInput();
      });
      renderText();
      td.appendChild(wrapper);
    } else if (f.FieldTypeKind === 6 && f.Choices) {
      const wrapper = document.createElement('div');
      wrapper.style.padding = '4px 12px';
      const sel = document.createElement('select');
      sel.style.cssText = 'border:none;background:transparent;font-size:14px;font-family:inherit;outline:none;cursor:pointer;max-width:140px;';
      const emptyOpt = document.createElement('option');
      emptyOpt.value = ''; emptyOpt.textContent = '—';
      sel.appendChild(emptyOpt);
      f.Choices.forEach((choice) => {
        const opt = document.createElement('option');
        opt.value = choice; opt.textContent = choice;
        if (item[f.InternalName] === choice) opt.selected = true;
        sel.appendChild(opt);
      });

      const choices = f.Choices;
      function renderChip(val: string): void {
        wrapper.innerHTML = '';
        if (val) {
          const idx = choices.indexOf(val) % 6;
          const chip = document.createElement('span');
          chip.className = 'memola-select-chip memola-sc-' + idx;
          chip.textContent = val;
          // 列メニューで設定したタグ色があれば上書き(未設定はプリセット sc-N)。
          const ov = getTagColor(S.dbList, f.InternalName, val);
          if (ov) { chip.style.background = ov; chip.style.color = '#2a2a26'; }
          chip.style.cursor = 'pointer';
          chip.addEventListener('click', () => {
            wrapper.innerHTML = '';
            wrapper.appendChild(sel);
            sel.focus();
          });
          wrapper.appendChild(chip);
        } else {
          wrapper.appendChild(sel);
        }
      }

      sel.addEventListener('change', () => {
        const nv = sel.value;
        const oldVal = (item[f.InternalName] as string) || '';
        if (nv === oldVal) return;
        // Send by Display Title — InternalName for Japanese choice columns is
        // the encoded `_x30b9_…` form which validateUpdateListItem may reject.
        const data: Record<string, unknown> = {};
        data[f.Title || f.InternalName] = nv;
        item[f.InternalName] = nv;
        apiUpdateDbRow(S.dbList, item.Id, data)
          .then(() => {
            renderChip(nv);
            recordCellChange(S.dbList, item.Id, f.InternalName, f.Title, oldVal, nv);
          })
          .catch((e: Error) => { toast(e.message, 'err'); });
      });
      sel.addEventListener('blur', () => { renderChip(sel.value); });

      renderChip((item[f.InternalName] as string) || '');
      td.appendChild(wrapper);
    } else {
      const isMulti = f.FieldTypeKind === 3;
      const span = document.createElement('span');
      span.className = 'memola-dc' + (isMulti ? ' multi' : '');
      span.contentEditable = 'true';
      span.textContent = item[f.InternalName] != null ? String(item[f.InternalName]) : '';
      span.dataset.field = f.InternalName;
      let orig = span.textContent || '';
      span.addEventListener('focus', () => { orig = span.textContent || ''; });
      span.addEventListener('keydown', (e) => {
        const ke = e as KeyboardEvent;
        if (ke.isComposing || ke.keyCode === 229) return;
        if (ke.key === 'Escape') { span.textContent = orig; span.blur(); return; }
        if (ke.key === 'Enter') {
          if (isMulti) {
            // 複数行: Cmd/Ctrl+Enter で確定。普通の Enter は改行 (default)
            if (ke.metaKey || ke.ctrlKey) { e.preventDefault(); span.blur(); }
          } else {
            // 単行: Enter で確定、Shift+Enter で改行（テキスト型なので保存時に \n は trim 推奨）
            if (!ke.shiftKey) { e.preventDefault(); span.blur(); }
          }
        }
      });
      span.addEventListener('blur', () => {
        const nv = (span.textContent || '').trim();
        const oldVal = orig.trim();
        if (nv === oldVal) return;
        const data: Record<string, unknown> = {};
        data[f.InternalName] = nv;
        item[f.InternalName] = nv;
        orig = nv;
        setSave('保存中...');
        apiUpdateDbRow(S.dbList, item.Id, data)
          .then(() => {
            setSave('');
            recordCellChange(S.dbList, item.Id, f.InternalName, f.Title, oldVal, nv);
          })
          .catch((e: Error) => { toast(e.message, 'err'); span.textContent = orig; });
      });
      td.appendChild(span);
      // タイトル列にホバー時「↗」を表示し、行をページとして開く
      if (f.InternalName === 'Title') {
        td.style.position = 'relative';
        span.style.fontWeight = '500';
        td.appendChild(mkOpenRowBtn(item));
      }
    }
    tr.appendChild(td);
  });

  const delTd = document.createElement('td');
  delTd.className = 'memola-td-del';
  const delBtn = document.createElement('button');
  delBtn.className = 'memola-del-btn';
  delBtn.title = '行を削除';
  delBtn.textContent = '🗑';
  delBtn.addEventListener('click', () => {
    if (!confirm('この行を削除しますか？')) return;
    setLoad(true, '削除中...');
    const listTitle = S.dbList;
    deleteRowWithUndo(listTitle, item.Id)
      .then(() => {
        tr.remove();
        toast('削除しました（⌘Z で復元可能）');
      })
      .catch((e: Error) => { toast('削除失敗: ' + e.message, 'err'); })
      .finally(() => { setLoad(false); });
  });
  delTd.appendChild(delBtn);
  tr.appendChild(delTd);
  // Add empty cells for "+" column and spacer column to keep alignment
  tr.appendChild(document.createElement('td'));
  const spacerTd = document.createElement('td');
  spacerTd.className = 'memola-td-spacer';
  tr.appendChild(spacerTd);
  return tr;
}
