// Block drag handle for editor2 — Notion-style ⋮⋮ on hover, drag
// to reorder. Compared to the legacy `block-drag.ts` (deleted), the
// drop logic mutates state via `editor.applyMutation(moveBlock(...))`
// instead of swapping DOM nodes directly. The editor's render then
// produces the new DOM in one shot.

import type { Editor } from './editor2';
import { moveBlock } from './editor-state';

/** Public API — wire / unwire the drag behaviour. */
export function attachBlockDrag(editor: Editor, rootEl: HTMLElement): () => void {
  // Floating handle DOM
  const handle = document.createElement('div');
  handle.className = 'memola-block-handle';
  handle.style.cssText = 'position:absolute; cursor:grab; user-select:none; opacity:0; pointer-events:none; z-index:2147483646; padding:2px 4px; color:#9b9a97; font-size:18px; line-height:1; transition:opacity 0.1s;';
  handle.textContent = '⋮⋮';
  handle.draggable = true;
  handle.title = 'ドラッグして並べ替え';
  (document.getElementById('memola-overlay') || document.body).appendChild(handle);

  let hoveredBlock: HTMLElement | null = null;
  let dragSourceId: string | null = null;
  let placeholder: HTMLElement | null = null;

  const showHandle = (block: HTMLElement): void => {
    if (block === hoveredBlock) return;
    hoveredBlock = block;
    const rect = block.getBoundingClientRect();
    // Default vertical anchor: 4px from the block's top so the
    // handle aligns with the FIRST line of multi-line blocks
    // (paragraphs, headings, lists). Short atomic blocks (hr) look
    // off — center the handle on the rule instead.
    const handleH = handle.offsetHeight || 22;
    const top = block.dataset.blockKind === 'rule'
      ? rect.top + window.scrollY + (rect.height - handleH) / 2
      : rect.top + window.scrollY + 4;
    handle.style.top = top + 'px';
    handle.style.left = (rect.left + window.scrollX - 28) + 'px';
    handle.style.opacity = '1';
    handle.style.pointerEvents = 'auto';
  };

  const hideHandle = (): void => {
    hoveredBlock = null;
    handle.style.opacity = '0';
    handle.style.pointerEvents = 'none';
  };

  const blockUnderCursor = (clientX: number, clientY: number): HTMLElement | null => {
    // Find a top-level block whose bounding rect contains (x,y), with a
    // small leftward extension so the handle area itself counts as
    // "still on the block" (= prevents flicker).
    const blocks = Array.from(rootEl.children) as HTMLElement[];
    for (const block of blocks) {
      if (!block.dataset.blockId) continue;
      const r = block.getBoundingClientRect();
      const extLeft = r.left - 32;     // include the handle gutter
      if (clientX >= extLeft && clientX <= r.right
        && clientY >= r.top && clientY <= r.bottom) {
        return block;
      }
    }
    return null;
  };

  /** Walk up from a node to the top-level block element (= direct
   *  child of rootEl carrying `data-block-id`). Returns null when
   *  the node isn't inside the editor. */
  const blockOf = (node: Node | null): HTMLElement | null => {
    while (node && node !== rootEl) {
      const el = node as HTMLElement;
      if (el.parentElement === rootEl && el.dataset?.blockId) return el;
      node = node.parentNode;
    }
    return null;
  };

  /** Top-level block currently containing the caret, or null when the
   *  selection is outside the editor. */
  const caretBlock = (): HTMLElement | null => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;
    const range = sel.getRangeAt(0);
    if (!rootEl.contains(range.startContainer)) return null;
    return blockOf(range.startContainer);
  };

  // Track hover via mousemove (= robust against children with their own
  // pointer-events behaviour, like contenteditable cells).
  const onMove = (e: MouseEvent): void => {
    if (dragSourceId) return;
    const target = e.target as HTMLElement | null;
    if (target === handle) return;     // already over the handle
    const block = blockUnderCursor(e.clientX, e.clientY);
    if (block) { showHandle(block); return; }
    // Mouse not over a block. If the caret is still in the editor,
    // keep the handle anchored to the caret block instead of hiding.
    if (target && !rootEl.contains(target)) {
      const caret = caretBlock();
      if (caret) showHandle(caret); else hideHandle();
    }
  };
  document.addEventListener('mousemove', onMove);

  // Move the handle to follow the caret as it travels between blocks
  // (clicks, arrow keys, Enter inserting a fresh paragraph). Without
  // this the handle only repositions on hover, so a typing user has
  // to manually wave the mouse to keep it on the active block.
  const onSelectionChange = (): void => {
    if (dragSourceId) return;
    const caret = caretBlock();
    if (caret) showHandle(caret);
  };
  document.addEventListener('selectionchange', onSelectionChange);

  // ── Drag start / end ─────────────────────────────────

  const onDragStart = (e: DragEvent): void => {
    if (!hoveredBlock) { e.preventDefault(); return; }
    dragSourceId = hoveredBlock.dataset.blockId || null;
    if (!dragSourceId) { e.preventDefault(); return; }
    hoveredBlock.classList.add('memola-block-dragging');
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', '');     // some browsers require this
    }
    placeholder = document.createElement('div');
    placeholder.className = 'memola-block-placeholder';
    placeholder.style.cssText = 'height:2px; background:#2383e2; margin:0 0 0 0; border-radius:1px;';
    document.addEventListener('dragover', onDragOver);
    document.addEventListener('drop', onDrop);
  };

  const onDragEnd = (): void => {
    if (dragSourceId && hoveredBlock) {
      hoveredBlock.classList.remove('memola-block-dragging');
    }
    if (placeholder?.parentNode) placeholder.parentNode.removeChild(placeholder);
    placeholder = null;
    dragSourceId = null;
    document.removeEventListener('dragover', onDragOver);
    document.removeEventListener('drop', onDrop);
  };
  handle.addEventListener('dragstart', onDragStart);
  handle.addEventListener('dragend', onDragEnd);

  // ── Drag over / drop (DOM-side preview, state-side commit) ──

  const onDragOver = (e: DragEvent): void => {
    if (!dragSourceId || !placeholder) return;
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
    const blocks = (Array.from(rootEl.children) as HTMLElement[])
      .filter((b) => b.dataset.blockId && b.dataset.blockId !== dragSourceId
        && b !== placeholder);
    if (blocks.length === 0) {
      rootEl.appendChild(placeholder);
      return;
    }
    const firstRect = blocks[0].getBoundingClientRect();
    if (e.clientY < firstRect.top) {
      if (placeholder !== rootEl.firstElementChild) rootEl.insertBefore(placeholder, blocks[0]);
      return;
    }
    const lastBlock = blocks[blocks.length - 1];
    const lastRect = lastBlock.getBoundingClientRect();
    if (e.clientY > lastRect.bottom) {
      if (placeholder !== rootEl.lastElementChild) rootEl.appendChild(placeholder);
      return;
    }
    for (const block of blocks) {
      const rect = block.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const before = e.clientY < rect.top + rect.height / 2;
        const target = before ? block : block.nextSibling;
        if (placeholder.nextSibling !== target && placeholder !== target) {
          rootEl.insertBefore(placeholder, target);
        }
        return;
      }
    }
  };

  const onDrop = (e: DragEvent): void => {
    if (!dragSourceId || !placeholder?.parentNode) { onDragEnd(); return; }
    e.preventDefault();
    // Compute the destination index in editor state from the
    // placeholder's position among data-block-id siblings.
    const blocks = Array.from(rootEl.children) as HTMLElement[];
    let toIdx = 0;
    for (const b of blocks) {
      if (b === placeholder) break;
      // Skip the source block — moveBlock's `toIdx` is in the
      // post-removal sequence.
      if (b.dataset.blockId && b.dataset.blockId !== dragSourceId) toIdx++;
    }
    const sourceId = dragSourceId;
    editor.applyMutation((s) => moveBlock(s, sourceId, toIdx), 'structural');
    onDragEnd();
  };

  return (): void => {
    // Codex review U4: if destroy is called mid-drag, run the same
    // cleanup the drag-end handler would (placeholder removal, class
    // strip, document listener removal). Otherwise the placeholder
    // and `.memola-block-dragging` class linger in the DOM.
    onDragEnd();
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('selectionchange', onSelectionChange);
    document.removeEventListener('dragover', onDragOver);
    document.removeEventListener('drop', onDrop);
    handle.remove();
  };
}
