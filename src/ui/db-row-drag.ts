// DB row drag handle (Notion-style ⋮⋮ on hover, drag to reorder).
//
// Mirrors block-drag.ts: a single floating handle follows mouse hover over
// table rows. Dragging the handle is the actual drag source; rows themselves
// are not `draggable`, so cell text selection / inline editing aren't disrupted.

import { S } from '../state';
import { reorderRows, isManualRowOrderActive } from './views';

let _handle: HTMLElement | null = null;
let _hoveredRow: HTMLTableRowElement | null = null;
let _draggingId: number | null = null;
let _draggingIds: number[] = [];          // all rows being dragged (multi-select)
let _draggingRow: HTMLTableRowElement | null = null;

const HANDLE_HTML =
  '<svg viewBox="0 0 10 16" width="10" height="16" fill="currentColor" style="pointer-events:none">' +
  '<circle cx="2" cy="3" r="1.3"/><circle cx="2" cy="8" r="1.3"/><circle cx="2" cy="13" r="1.3"/>' +
  '<circle cx="8" cy="3" r="1.3"/><circle cx="8" cy="8" r="1.3"/><circle cx="8" cy="13" r="1.3"/>' +
  '</svg>';

function ensureHandle(): HTMLElement {
  if (_handle && document.body.contains(_handle)) return _handle;
  const h = document.createElement('div');
  h.id = 'n365-row-handle';
  h.draggable = true;
  h.title = 'ドラッグして行を並べ替え';
  h.innerHTML = HANDLE_HTML;
  h.addEventListener('dragstart', onDragStart);
  h.addEventListener('dragend', onDragEnd);
  h.addEventListener('mouseleave', (e) => {
    const rt = (e as MouseEvent).relatedTarget as HTMLElement | null;
    if (rt && _hoveredRow && _hoveredRow.contains(rt)) return;
    hideHandle();
  });
  document.getElementById('n365-overlay')?.appendChild(h);
  _handle = h;
  return h;
}

function positionHandle(row: HTMLTableRowElement): void {
  const h = ensureHandle();
  const r = row.getBoundingClientRect();
  h.style.top = (r.top + window.scrollY) + 'px';
  h.style.left = (r.left + window.scrollX - 24) + 'px';
  h.style.height = Math.max(20, Math.min(r.height, 32)) + 'px';
  h.style.display = 'flex';
}

function hideHandle(): void {
  if (_handle) _handle.style.display = 'none';
  _hoveredRow = null;
}

function findRowAt(clientY: number): HTMLTableRowElement | null {
  const tbody = document.getElementById('n365-dtb');
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
  el.className = 'n365-row-drop-line';
  document.getElementById('n365-overlay')?.appendChild(el);
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
    e.dataTransfer.setData('text/n365-row', idStr);
  }
  // Fade every dragged row (including non-hovered selected ones)
  const tbody = document.getElementById('n365-dtb');
  if (tbody) {
    tbody.querySelectorAll<HTMLTableRowElement>('tr').forEach((r) => {
      const id = parseInt(r.dataset.id || '0', 10);
      if (_draggingIds.indexOf(id) >= 0) r.classList.add('n365-tr-dragging');
    });
  }
  document.addEventListener('dragover', onDragOver);
  document.addEventListener('drop', onDrop);
}

function onDragEnd(): void {
  const tbody = document.getElementById('n365-dtb');
  if (tbody) {
    tbody.querySelectorAll('.n365-tr-dragging').forEach((r) => {
      r.classList.remove('n365-tr-dragging');
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

// Hit-detection mirrors block-drag: extends 44px to the LEFT of each row to
// keep the handle visible across the gap between row and handle.
const HIT_LEFT_EXTEND = 44;
const HIT_VERT_PAD = 2;

function rowUnderCursor(clientX: number, clientY: number): HTMLTableRowElement | null {
  const tbody = document.getElementById('n365-dtb');
  if (!tbody) return null;
  const rows = Array.from(tbody.querySelectorAll<HTMLTableRowElement>('tr'));
  for (const r of rows) {
    const rect = r.getBoundingClientRect();
    if (clientY >= rect.top - HIT_VERT_PAD && clientY <= rect.bottom + HIT_VERT_PAD &&
        clientX >= rect.left - HIT_LEFT_EXTEND && clientX <= rect.right) {
      return r;
    }
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
    const dt = document.getElementById('n365-dt');
    if (!dt) { hideHandle(); return; }

    // If the cursor is on the handle itself, keep current state
    if (_handle && _handle.style.display !== 'none') {
      const hr = _handle.getBoundingClientRect();
      if (e.clientX >= hr.left - 2 && e.clientX <= hr.right + 2 &&
          e.clientY >= hr.top - 2 && e.clientY <= hr.bottom + 2) return;
    }
    const row = rowUnderCursor(e.clientX, e.clientY);
    if (row) {
      if (row !== _hoveredRow) {
        _hoveredRow = row;
        positionHandle(row);
      }
    } else {
      hideHandle();
    }
  });
}
