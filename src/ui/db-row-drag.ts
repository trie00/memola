// DB row drag handle (Notion-style ⋮⋮ on hover, drag to reorder).
//
// Mirrors block-drag.ts: a single floating handle follows mouse hover over
// table rows. Dragging the handle is the actual drag source; rows themselves
// are not `draggable`, so cell text selection / inline editing aren't disrupted.
//
// Uses the shared `lib/floating-handle` scaffold for the handle DOM /
// positioning / hover tracking. The drop indicator + reorder logic stays
// here (it's table-specific — line element under the dropped row, then a
// `reorderRows` call).

import { S } from '../state';
import { reorderRows, isManualRowOrderActive } from './views';
import {
  createFloatingHandle, isCursorOverWithExtend, type FloatingHandle,
} from '../lib/floating-handle';

let _handle: FloatingHandle | null = null;
let _hoveredRow: HTMLTableRowElement | null = null;
let _draggingId: number | null = null;
let _draggingIds: number[] = [];          // all rows being dragged (multi-select)
let _draggingRow: HTMLTableRowElement | null = null;

function ensureHandle(): FloatingHandle {
  if (_handle) return _handle;
  _handle = createFloatingHandle({
    id: 'memola-row-handle',
    title: 'クリックでメニュー / ドラッグで並べ替え',
    centred: true,                         // 18px high, centred on row
    onDragStart: onDragStart,
    onDragEnd: onDragEnd,
    onMouseLeave: (e) => {
      const rt = (e as MouseEvent).relatedTarget as HTMLElement | null;
      if (rt && _hoveredRow && _hoveredRow.contains(rt)) return;
      hideHandle();
    },
  });
  // クリック(ドラッグでない)→ 行メニュー(コメント/開く/削除)。
  _handle.el.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    if (_hoveredRow) openRowMenu(_hoveredRow, _handle!.el);
  });
  return _handle;
}

function hideHandle(): void {
  if (_handle) _handle.hide();
  _hoveredRow = null;
}

function findRowAt(clientY: number): HTMLTableRowElement | null {
  const tbody = document.getElementById('memola-dtb');
  if (!tbody) return null;
  const rows = Array.from(tbody.querySelectorAll<HTMLTableRowElement>('tr'));
  for (const r of rows) {
    const rect = r.getBoundingClientRect();
    if (clientY >= rect.top && clientY <= rect.bottom) return r;
  }
  return null;
}

// ── Single floating drop-line indicator (DB rows have no hierarchy, so we
//    only ever need one line at the drop Y position). ──
let _line: HTMLElement | null = null;
function ensureLine(): HTMLElement {
  if (_line && document.body.contains(_line)) return _line;
  const el = document.createElement('div');
  el.className = 'memola-row-drop-line';
  document.getElementById('memola-overlay')?.appendChild(el);
  _line = el;
  return el;
}
function showLine(row: HTMLTableRowElement, after: boolean): void {
  const line = ensureLine();
  const r = row.getBoundingClientRect();
  line.style.top = ((after ? r.bottom : r.top) - 1) + 'px';
  line.style.left = r.left + 'px';
  line.style.width = r.width + 'px';
  line.classList.add('on');
}
function hideLine(): void { if (_line) _line.classList.remove('on'); }

function onDragStart(e: DragEvent): void {
  // ドラッグ並べ替えは手動順の時のみ(ソート/フィルター中は不可)。
  if (!isManualRowOrderActive()) { e.preventDefault(); return; }
  if (!_hoveredRow) { e.preventDefault(); return; }
  const idStr = _hoveredRow.dataset.id;
  if (!idStr) { e.preventDefault(); return; }
  _draggingId = parseInt(idStr, 10);
  _draggingRow = _hoveredRow;
  // If the dragged row is part of the multi-selection, drag ALL selected rows.
  // Otherwise just this one.
  _draggingIds = S.dbSelected.has(_draggingId)
    ? Array.from(S.dbSelected)
    : [_draggingId];
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/memola-row', idStr);
  }
  // Fade every dragged row (including non-hovered selected ones)
  const tbody = document.getElementById('memola-dtb');
  if (tbody) {
    tbody.querySelectorAll<HTMLTableRowElement>('tr').forEach((r) => {
      const id = parseInt(r.dataset.id || '0', 10);
      if (_draggingIds.indexOf(id) >= 0) r.classList.add('memola-tr-dragging');
    });
  }
  document.addEventListener('dragover', onDragOver);
  document.addEventListener('drop', onDrop);
}

function onDragEnd(): void {
  const tbody = document.getElementById('memola-dtb');
  if (tbody) {
    tbody.querySelectorAll('.memola-tr-dragging').forEach((r) => {
      r.classList.remove('memola-tr-dragging');
    });
  }
  _draggingId = null;
  _draggingIds = [];
  _draggingRow = null;
  hideLine();
  document.removeEventListener('dragover', onDragOver);
  document.removeEventListener('drop', onDrop);
}

function onDragOver(e: DragEvent): void {
  if (_draggingId === null) return;
  e.preventDefault();
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
  const row = findRowAt(e.clientY);
  if (!row) { hideLine(); return; }
  const targetId = parseInt(row.dataset.id || '0', 10);
  if (_draggingIds.indexOf(targetId) >= 0) { hideLine(); return; }   // dropping on a dragged row
  const r = row.getBoundingClientRect();
  const after = e.clientY > r.top + r.height / 2;
  showLine(row, after);
}

function onDrop(e: DragEvent): void {
  if (_draggingId === null) { onDragEnd(); return; }
  e.preventDefault();
  const row = findRowAt(e.clientY);
  if (!row) { onDragEnd(); return; }
  const targetId = parseInt(row.dataset.id || '0', 10);
  if (!targetId || _draggingIds.indexOf(targetId) >= 0) { onDragEnd(); return; }
  const r = row.getBoundingClientRect();
  const after = e.clientY > r.top + r.height / 2;
  reorderRows(_draggingIds.length > 0 ? _draggingIds : [_draggingId], targetId, after);
  onDragEnd();
}

function rowUnderCursor(clientX: number, clientY: number): HTMLTableRowElement | null {
  const tbody = document.getElementById('memola-dtb');
  if (!tbody) return null;
  const rows = Array.from(tbody.querySelectorAll<HTMLTableRowElement>('tr'));
  for (const r of rows) {
    if (isCursorOverWithExtend(r, clientX, clientY)) return r;
  }
  return null;
}

// ── 行ハンドルのクリックメニュー(コメント / 開く / 削除) ──
let _rowMenu: HTMLElement | null = null;
function closeRowMenu(): void {
  if (_rowMenu) { _rowMenu.remove(); _rowMenu = null; }
  document.removeEventListener('mousedown', onRowMenuOutside, true);
}
function onRowMenuOutside(e: MouseEvent): void {
  if (_rowMenu && !_rowMenu.contains(e.target as Node)) closeRowMenu();
}
function openRowMenu(row: HTMLTableRowElement, anchor: HTMLElement): void {
  closeRowMenu();
  const itemId = parseInt(row.dataset.id || '0', 10);
  if (!itemId) return;
  const menu = document.createElement('div');
  menu.className = 'memola-blk-menu';   // ESC/外側クリックで閉じる既存スタイルを流用
  const add = (label: string, run: () => void): void => {
    const b = document.createElement('button');
    b.className = 'memola-blk-menu-item';
    b.textContent = label;
    b.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); closeRowMenu(); run(); });
    menu.appendChild(b);
  };

  add('💬 コメント', () => {
    void (async () => {
      const { metaById } = await import('../lib/page-store');
      const scope = metaById(S.currentId)?.scope === 'org' ? 'org' : 'user';
      const m = await import('./comments-ui');
      await m.openRowComment(S.dbList, scope, itemId);
    })();
  });
  add('↗ 行を開く', () => {
    const item = S.dbItems.find((i) => i.Id === itemId);
    if (item) void import('./row-page').then((m) => m.openRowAsPage(S.currentId || '', item));
  });
  const sep = document.createElement('div'); sep.className = 'memola-blk-menu-sep'; menu.appendChild(sep);
  add('🗑 削除', () => {
    if (!confirm('この行を削除しますか？(⌘Z で復元可能)')) return;
    void import('./db-history').then((m) => m.deleteRowWithUndo(S.dbList, itemId)).then(() => {
      void import('./views').then((m) => m.renderDbTable());
    });
  });

  (document.getElementById('memola-overlay') || document.body).appendChild(menu);
  const r = anchor.getBoundingClientRect();
  menu.style.left = (r.right + window.scrollX + 4) + 'px';
  menu.style.top = (r.top + window.scrollY) + 'px';
  const mr = menu.getBoundingClientRect();
  if (mr.right > window.innerWidth) menu.style.left = (r.left + window.scrollX - mr.width - 4) + 'px';
  if (mr.bottom > window.innerHeight) menu.style.top = (window.innerHeight - mr.height - 8 + window.scrollY) + 'px';
  _rowMenu = menu;
  setTimeout(() => document.addEventListener('mousedown', onRowMenuOutside, true), 0);
}

let _attached = false;
export function attachDbRowDrag(): void {
  if (_attached) return;
  _attached = true;
  document.addEventListener('mousemove', (e) => {
    if (_draggingId !== null) return;
    // Only active when viewing a DB table. ハンドル自体は常に出す(クリックで
    // 行メニューを開けるように)。ドラッグ並べ替えは手動順の時だけ有効(onDragStartで制御)。
    if (S.currentType !== 'database') { hideHandle(); return; }
    const dt = document.getElementById('memola-dt');
    if (!dt) { hideHandle(); return; }

    // If the cursor is on the handle itself, keep current state
    if (_handle && _handle.isCursorOnHandle(e.clientX, e.clientY)) return;
    const row = rowUnderCursor(e.clientX, e.clientY);
    if (row) {
      if (row !== _hoveredRow) {
        _hoveredRow = row;
        ensureHandle().positionAt(row);
      }
    } else {
      hideHandle();
    }
  });
}
// Suppress unused-symbol warnings — `_draggingRow` is kept as a debug aid.
void _draggingRow;
