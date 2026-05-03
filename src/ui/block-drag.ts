// Block-level drag handle (Notion-style ⋮⋮ on hover, drag to reorder).
// Lightweight: HTML5 drag API on top-level editor children.
//
// Uses the shared `lib/floating-handle` scaffold for the handle DOM /
// positioning / hover tracking. The drop logic (placeholder insertion,
// schedule-save) stays here because it's editor-specific.

import { S } from '../state';
import { getEd } from './dom';
import { setSave } from './ui-helpers';
import { schedSave } from './actions';
import {
  createFloatingHandle, isCursorOverWithExtend, type FloatingHandle,
} from '../lib/floating-handle';

let _dragging: HTMLElement | null = null;
let _placeholder: HTMLElement | null = null;
let _handle: FloatingHandle | null = null;
let _hoveredBlock: HTMLElement | null = null;

const DRAGGABLE_TAGS = /^(P|H1|H2|H3|H4|H5|H6|UL|OL|BLOCKQUOTE|PRE|HR|DIV)$/;

function isTopLevelBlock(el: Element): boolean {
  if (!getEd().contains(el)) return false;
  if (el.parentElement !== getEd()) return false;
  return DRAGGABLE_TAGS.test(el.tagName);
}

function ensureHandle(): FloatingHandle {
  if (_handle) return _handle;
  _handle = createFloatingHandle({
    id: 'memola-block-handle',
    title: 'ドラッグして並べ替え / クリックでメニュー',
    onDragStart: onDragStart,
    onDragEnd: onDragEnd,
    onMouseLeave: (e) => {
      // ハンドルから完全に外れた時のみ hide (block 側へ戻るときは維持)
      const rt = (e as MouseEvent).relatedTarget as HTMLElement | null;
      if (rt && getEd().contains(rt)) return;
      hideHandle();
    },
  });
  return _handle;
}

function hideHandle(): void {
  if (_handle) _handle.hide();
  _hoveredBlock = null;
}

function onDragStart(e: DragEvent): void {
  if (!_hoveredBlock) { e.preventDefault(); return; }
  _dragging = _hoveredBlock;
  _dragging.classList.add('memola-block-dragging');
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
    // Some browsers refuse drag without setting data
    e.dataTransfer.setData('text/plain', '');
  }
  // Create a thin placeholder
  _placeholder = document.createElement('div');
  _placeholder.className = 'memola-block-placeholder';
  document.addEventListener('dragover', onDragOver);
  document.addEventListener('drop', onDrop);
}

function onDragEnd(): void {
  if (_dragging) _dragging.classList.remove('memola-block-dragging');
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

function blockUnderCursor(clientX: number, clientY: number): HTMLElement | null {
  const ed = getEd();
  const blocks = Array.from(ed.children) as HTMLElement[];
  for (const block of blocks) {
    if (!isTopLevelBlock(block)) continue;
    if (isCursorOverWithExtend(block, clientX, clientY)) return block;
  }
  return null;
}

export function attachBlockDrag(): void {
  // Global mousemove — works regardless of which element receives the event,
  // so the handle stays visible while the cursor is in the gap between block
  // and handle, or directly over the handle, or just to the left.
  document.addEventListener('mousemove', (e) => {
    if (_dragging) return;
    if (!getEd()) return;
    // Cursor on the handle itself → keep current state
    if (_handle && _handle.isCursorOnHandle(e.clientX, e.clientY)) return;
    const block = blockUnderCursor(e.clientX, e.clientY);
    if (block) {
      if (block !== _hoveredBlock) {
        _hoveredBlock = block;
        ensureHandle().positionAt(block);
      }
    } else {
      hideHandle();
    }
  });
}
