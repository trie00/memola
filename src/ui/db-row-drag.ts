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
    title: 'ドラッグして行を並べ替え',
    centred: true,                         // 18px high, centred on row
    onDragStart: onDragStart,
    onDragEnd: onDragEnd,
    onMouseLeave: (e) => {
      const rt = (e as MouseEvent).relatedTarget as HTMLElement | null;
      if (rt && _hoveredRow && _hoveredRow.contains(rt)) return;
      hideHandle();
    },
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

let _attached = false;
export function attachDbRowDrag(): void {
  if (_attached) return;
  _attached = true;
  document.addEventListener('mousemove', (e) => {
    if (_draggingId !== null) return;
    // Only active when viewing a DB table
    if (S.currentType !== 'database') { hideHandle(); return; }
    if (!isManualRowOrderActive()) { hideHandle(); return; }
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
