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
  const ed = getEd();
  if (!(e.target instanceof Node) || !ed.contains(e.target)) return;
  e.preventDefault();
  // Find the top-level block under the cursor
  let cur: Node | null = e.target;
  while (cur && cur !== ed && (cur as HTMLElement).parentElement !== ed) {
    cur = (cur as HTMLElement).parentElement;
  }
  if (!cur || cur === ed) return;
  const block = cur as HTMLElement;
  if (block === _dragging || block === _placeholder) return;
  const rect = block.getBoundingClientRect();
  const before = e.clientY < rect.top + rect.height / 2;
  if (before) ed.insertBefore(_placeholder, block);
  else ed.insertBefore(_placeholder, block.nextSibling);
}

function onDrop(e: DragEvent): void {
  if (!_dragging || !_placeholder || !_placeholder.parentNode) { onDragEnd(); return; }
  e.preventDefault();
  _placeholder.parentNode.replaceChild(_dragging, _placeholder);
  _placeholder = null;
  S.dirty = true; setSave('未保存'); schedSave();
  onDragEnd();
}

export function attachBlockDrag(): void {
  const ed = getEd();

  ed.addEventListener('mousemove', (e) => {
    if (_dragging) return;
    const target = e.target as HTMLElement;
    let cur: Node | null = target;
    while (cur && cur !== ed && (cur as HTMLElement).parentElement !== ed) {
      cur = (cur as HTMLElement).parentElement;
    }
    if (!cur || cur === ed) { hideHandle(); return; }
    const block = cur as HTMLElement;
    if (!isTopLevelBlock(block)) { hideHandle(); return; }
    if (block !== _hoveredBlock) {
      _hoveredBlock = block;
      positionHandle(block);
    }
  });

  ed.addEventListener('mouseleave', (e) => {
    // Don't hide if cursor moved to the handle itself or any of its descendants
    const rt = e.relatedTarget as HTMLElement | null;
    if (rt && rt.closest && rt.closest('#n365-block-handle')) return;
    hideHandle();
  });
}
