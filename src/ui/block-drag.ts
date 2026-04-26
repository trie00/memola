// Block-level drag handle (Notion-style ⋮⋮ on hover, drag to reorder).
// Lightweight implementation: HTML5 drag API on top-level editor children.

import { S } from '../state';
import { getEd } from './dom';
import { setSave } from './ui-helpers';
import { schedSave } from './actions';

let _dragging: HTMLElement | null = null;
let _placeholder: HTMLElement | null = null;
let _handle: HTMLElement | null = null;
let _hoveredBlock: HTMLElement | null = null;

const DRAGGABLE_TAGS = /^(P|H1|H2|H3|H4|H5|H6|UL|OL|BLOCKQUOTE|PRE|HR|DIV)$/;

function isTopLevelBlock(el: Element): boolean {
  if (!getEd().contains(el)) return false;
  if (el.parentElement !== getEd()) return false;
  return DRAGGABLE_TAGS.test(el.tagName);
}

function ensureHandle(): HTMLElement {
  if (_handle) return _handle;
  const h = document.createElement('div');
  h.id = 'n365-block-handle';
  h.draggable = true;
  h.title = 'ドラッグして並べ替え / クリックでメニュー';
  h.innerHTML = '<svg viewBox="0 0 10 16" width="10" height="16" fill="currentColor" style="pointer-events:none"><circle cx="2" cy="3" r="1.3"/><circle cx="2" cy="8" r="1.3"/><circle cx="2" cy="13" r="1.3"/><circle cx="8" cy="3" r="1.3"/><circle cx="8" cy="8" r="1.3"/><circle cx="8" cy="13" r="1.3"/></svg>';
  h.addEventListener('dragstart', onDragStart);
  h.addEventListener('dragend', onDragEnd);
  // ハンドル自身から完全に外れた時のみ hide (block 側へ戻るときは維持)
  h.addEventListener('mouseleave', (e) => {
    const rt = (e as MouseEvent).relatedTarget as HTMLElement | null;
    const ed = getEd();
    if (rt && ed.contains(rt)) return;       // editor へ戻る → 維持
    hideHandle();
  });
  document.getElementById('n365-overlay')?.appendChild(h);
  _handle = h;
  return h;
}

function positionHandle(block: HTMLElement): void {
  const h = ensureHandle();
  const rect = block.getBoundingClientRect();
  h.style.top = (rect.top + window.scrollY) + 'px';
  h.style.left = (rect.left + window.scrollX - 24) + 'px';
  h.style.height = Math.max(20, Math.min(rect.height, 32)) + 'px';
  h.style.display = 'flex';
}

function hideHandle(): void {
  if (_handle) _handle.style.display = 'none';
  _hoveredBlock = null;
}

function onDragStart(e: DragEvent): void {
  if (!_hoveredBlock) { e.preventDefault(); return; }
  _dragging = _hoveredBlock;
  _dragging.classList.add('n365-block-dragging');
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
    // Some browsers refuse drag without setting data
    e.dataTransfer.setData('text/plain', '');
  }
  // Create a thin placeholder
  _placeholder = document.createElement('div');
  _placeholder.className = 'n365-block-placeholder';
  document.addEventListener('dragover', onDragOver);
  document.addEventListener('drop', onDrop);
}

function onDragEnd(): void {
  if (_dragging) _dragging.classList.remove('n365-block-dragging');
  _dragging = null;
  if (_placeholder && _placeholder.parentNode) _placeholder.parentNode.removeChild(_placeholder);
  _placeholder = null;
  document.removeEventListener('dragover', onDragOver);
  document.removeEventListener('drop', onDrop);
}

function onDragOver(e: DragEvent): void {
  if (!_dragging || !_placeholder) return;
  e.preventDefault();                                           // drop を常に許可
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
  const ed = getEd();
  // Y 座標で top-level block を直接検索 (e.target は drag 中信頼性が低い)
  const blocks = (Array.from(ed.children) as HTMLElement[])
    .filter((b) => b !== _dragging && b !== _placeholder && isTopLevelBlock(b));
  if (blocks.length === 0) { ed.appendChild(_placeholder); return; }
  // 最初のブロックより上 / 最後のブロックより下
  const firstRect = blocks[0].getBoundingClientRect();
  if (e.clientY < firstRect.top) {
    if (_placeholder !== ed.firstElementChild) ed.insertBefore(_placeholder, blocks[0]);
    return;
  }
  const lastBlock = blocks[blocks.length - 1];
  const lastRect = lastBlock.getBoundingClientRect();
  if (e.clientY > lastRect.bottom) {
    if (_placeholder !== ed.lastElementChild) ed.appendChild(_placeholder);
    return;
  }
  // どこかのブロック上 → 中央線で前後判定
  for (const block of blocks) {
    const rect = block.getBoundingClientRect();
    if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
      const before = e.clientY < rect.top + rect.height / 2;
      const target = before ? block : block.nextSibling;
      if (_placeholder.nextSibling !== target && _placeholder !== target) {
        ed.insertBefore(_placeholder, target);
      }
      return;
    }
  }
}

function onDrop(e: DragEvent): void {
  if (!_dragging || !_placeholder || !_placeholder.parentNode) { onDragEnd(); return; }
  e.preventDefault();
  _placeholder.parentNode.replaceChild(_dragging, _placeholder);
  _placeholder = null;
  S.dirty = true; setSave('未保存'); schedSave();
  onDragEnd();
}

// Hit-detection extends 42px to the LEFT of each block so the gap between
// block and handle (24px) plus the handle width (18px) all count as "still
// hovering". Without this, the editor's mouseleave would hide the handle
// the moment the cursor crosses the editor's left edge to reach it.
const HIT_LEFT_EXTEND = 44;
const HIT_VERT_PAD = 2;

function blockUnderCursor(clientX: number, clientY: number): HTMLElement | null {
  const ed = getEd();
  const blocks = Array.from(ed.children) as HTMLElement[];
  for (const block of blocks) {
    if (!isTopLevelBlock(block)) continue;
    const rect = block.getBoundingClientRect();
    if (clientY >= rect.top - HIT_VERT_PAD && clientY <= rect.bottom + HIT_VERT_PAD &&
        clientX >= rect.left - HIT_LEFT_EXTEND && clientX <= rect.right) {
      return block;
    }
  }
  return null;
}

export function attachBlockDrag(): void {
  // Global mousemove — works regardless of which element receives the event,
  // so the handle stays visible while the cursor is in the gap between block
  // and handle, or directly over the handle, or just to the left.
  document.addEventListener('mousemove', (e) => {
    if (_dragging) return;
    const ed = getEd();
    if (!ed) return;
    // If the cursor is over the handle itself, just keep current state
    const handle = _handle;
    if (handle && handle.style.display !== 'none') {
      const hr = handle.getBoundingClientRect();
      if (e.clientX >= hr.left - 2 && e.clientX <= hr.right + 2 &&
          e.clientY >= hr.top - 2 && e.clientY <= hr.bottom + 2) return;
    }
    const block = blockUnderCursor(e.clientX, e.clientY);
    if (block) {
      if (block !== _hoveredBlock) {
        _hoveredBlock = block;
        positionHandle(block);
      }
    } else {
      hideHandle();
    }
  });
}
