// Block drag handle for editor2 — Notion-style ⋮⋮ on hover, drag
// to reorder. Compared to the legacy `block-drag.ts` (deleted), the
// drop logic mutates state via `editor.applyMutation(moveBlock(...))`
// instead of swapping DOM nodes directly. The editor's render then
// produces the new DOM in one shot.

import type { Editor } from './editor2';
import { moveBlock, turnIntoBlock, insertBlockAfter, paragraph, type TurnIntoKind } from './editor-state';

/** Block kinds offered by the handle menu's 「種類を変更」 section. */
const TURN_INTO_TYPES: Array<{ cmd: TurnIntoKind; label: string }> = [
  { cmd: 'p', label: 'テキスト' },
  { cmd: 'h1', label: '見出し1' },
  { cmd: 'h2', label: '見出し2' },
  { cmd: 'h3', label: '見出し3' },
  { cmd: 'todo', label: 'ToDo リスト' },
  { cmd: 'ul', label: '箇条書きリスト' },
  { cmd: 'ol', label: '番号付きリスト' },
  { cmd: 'quote', label: '引用' },
  { cmd: 'callout', label: 'コールアウト' },
  { cmd: 'pre', label: 'コードブロック' },
  { cmd: 'hr', label: '区切り線' },
];

/** Viewport rect of a block's FIRST text line. Uses a Range over the
 *  block's contents — `getClientRects()` returns one rect per line box,
 *  so the first non-empty one is the first line at its true rendered
 *  height (which scales with font size / line-height). Falls back to the
 *  block's own rect (clamped to its computed line-height) when the block
 *  has no text lines (e.g. an empty or replaced-element block). */
function firstLineRect(block: HTMLElement): { top: number; height: number } {
  try {
    const range = document.createRange();
    range.selectNodeContents(block);
    const rects = range.getClientRects();
    for (let i = 0; i < rects.length; i++) {
      if (rects[i].height > 0) return { top: rects[i].top, height: rects[i].height };
    }
  } catch { /* selectNodeContents can throw on detached nodes — fall through */ }
  const r = block.getBoundingClientRect();
  const lh = parseFloat(window.getComputedStyle(block).lineHeight);
  const h = isFinite(lh) && lh > 0 ? Math.min(lh, r.height) : r.height;
  return { top: r.top, height: h };
}

/** Public API — wire / unwire the drag behaviour. */
export function attachBlockDrag(editor: Editor, rootEl: HTMLElement): () => void {
  // Floating handle DOM
  const handle = document.createElement('div');
  handle.className = 'memola-block-handle';
  handle.style.cssText = 'position:absolute; cursor:grab; user-select:none; opacity:0; pointer-events:none; z-index:2147483646; padding:2px 4px; color:#9b9a97; font-size:18px; line-height:1; transition:opacity 0.1s;';
  handle.textContent = '⋮⋮';
  handle.draggable = true;
  handle.title = 'ドラッグで移動 / クリックでメニュー';
  (document.getElementById('memola-overlay') || document.body).appendChild(handle);

  let hoveredBlock: HTMLElement | null = null;
  let dragSourceId: string | null = null;
  let placeholder: HTMLElement | null = null;
  let menu: HTMLElement | null = null;
  let dragged = false;       // set on dragstart so the trailing click doesn't open the menu

  const showHandle = (block: HTMLElement): void => {
    if (block === hoveredBlock) return;
    hoveredBlock = block;
    const rect = block.getBoundingClientRect();
    const handleH = handle.offsetHeight || 22;
    // Vertically center the handle on the block's FIRST text line — not a
    // fixed offset from the top. This keeps it centered whatever the font
    // size (large headings, todo rows, callouts), instead of riding high
    // on tall lines. `rule` has no text line, so center on the whole rule.
    let lineTop: number;
    let lineH: number;
    if (block.dataset.blockKind === 'rule') {
      lineTop = rect.top; lineH = rect.height;
    } else {
      const fl = firstLineRect(block);
      lineTop = fl.top; lineH = fl.height;
    }
    handle.style.top = (lineTop + window.scrollY + (lineH - handleH) / 2) + 'px';
    handle.style.left = (rect.left + window.scrollX - 28) + 'px';
    handle.style.opacity = '1';
    handle.style.pointerEvents = 'auto';
  };

  const hideHandle = (): void => {
    if (menu) return;          // keep the handle while its menu is open
    hoveredBlock = null;
    handle.style.opacity = '0';
    handle.style.pointerEvents = 'none';
  };

  // ── Block menu (click the handle) ───────────────────────

  const onMenuOutside = (e: MouseEvent): void => {
    if (menu && !menu.contains(e.target as Node) && e.target !== handle) closeMenu();
  };
  const onMenuKey = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') { e.preventDefault(); closeMenu(); }
  };
  function closeMenu(): void {
    if (menu) { menu.remove(); menu = null; }
    document.removeEventListener('mousedown', onMenuOutside, true);
    document.removeEventListener('keydown', onMenuKey, true);
  }

  const addMenuItem = (label: string, run: () => void): HTMLElement => {
    const b = document.createElement('button');
    b.className = 'memola-blk-menu-item';
    b.textContent = label;
    // mousedown (not click) so we act before the editor loses/refocuses
    // selection; preventDefault keeps the editor's caret intact.
    b.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeMenu();
      run();
    });
    return b;
  };

  const openMenu = (block: HTMLElement): void => {
    const blockId = block.dataset.blockId;
    if (!blockId) return;
    closeMenu();
    menu = document.createElement('div');
    menu.className = 'memola-blk-menu';
    menu.appendChild(addMenuItem('＋ 下にブロックを追加', () => {
      editor.applyMutation((s) => insertBlockAfter(s, blockId, paragraph('')), 'structural');
    }));
    menu.appendChild(addMenuItem('💬 コメント', () => {
      void import('../comments-ui').then((m) => {
        const target = m.currentCommentTarget();
        if (target) m.openCommentPopover(target.pageId, blockId);
      });
    }));
    const hd = document.createElement('div');
    hd.className = 'memola-blk-menu-hd';
    hd.textContent = '種類を変更';
    menu.appendChild(hd);
    for (const t of TURN_INTO_TYPES) {
      menu.appendChild(addMenuItem(t.label, () => {
        editor.applyMutation((s) => turnIntoBlock(s, blockId, t.cmd), 'structural');
      }));
    }
    (document.getElementById('memola-overlay') || document.body).appendChild(menu);
    // Anchor to the right of the handle; flip / clamp to stay on-screen.
    const hr = handle.getBoundingClientRect();
    menu.style.left = (hr.right + window.scrollX + 4) + 'px';
    menu.style.top = (hr.top + window.scrollY) + 'px';
    const mr = menu.getBoundingClientRect();
    if (mr.right > window.innerWidth) {
      menu.style.left = (hr.left + window.scrollX - mr.width - 4) + 'px';
    }
    if (mr.bottom > window.innerHeight) {
      menu.style.top = (window.innerHeight - mr.height - 8 + window.scrollY) + 'px';
    }
    setTimeout(() => {
      document.addEventListener('mousedown', onMenuOutside, true);
      document.addEventListener('keydown', onMenuKey, true);
    }, 0);
  };

  const onHandleClick = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (dragged) { dragged = false; return; }   // trailing click after a drag
    if (menu) { closeMenu(); return; }           // toggle
    if (hoveredBlock) openMenu(hoveredBlock);
  };
  handle.addEventListener('click', onHandleClick);

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
    dragged = true;            // suppress the trailing click → menu
    closeMenu();
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
    // Clear the click-suppress flag after the (possible) trailing click
    // has been dispatched, so the next genuine click opens the menu.
    setTimeout(() => { dragged = false; }, 0);
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
    closeMenu();
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('selectionchange', onSelectionChange);
    document.removeEventListener('dragover', onDragOver);
    document.removeEventListener('drop', onDrop);
    handle.remove();
  };
}
