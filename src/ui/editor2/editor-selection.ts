// Selection mapping — logical (block id + char offset) ↔ DOM Range.
//
// The editor's caret is a *logical* position (`{blockId, offset}`). On
// every render we map it down to a real DOM Range so the browser
// shows the caret where the user expects. On every selection change
// (clicks, arrow keys, drag-select) we map the DOM Range back up to
// a logical position so the next mutation operates on the right
// place.
//
// `offset` is in *plain-text characters* of the block (matching
// `inlineToPlainText`), not in DOM text-node offsets. This insulates
// the editor's logical model from inline-render structure: bolding a
// word doesn't change the offset; toggling a code span doesn't
// change the offset.
//
// Caveats:
//   - Inline formatting boundaries (e.g. start of `<strong>`) don't
//     have a unique logical offset — both "inside the strong" and
//     "right before it" map to the same offset. We always map to
//     "rightmost" (= inside) on the way down, which matches what
//     contenteditable does naturally with arrow keys.
//   - `<br>` counts as 1 offset character (see `inlineNodeLength`).
//   - Page-link chips are atomic — a caret can land before or after
//     the chip, but never inside it (they're contenteditable=false).
//   - `contenteditable=false` islands (table, linkdb, ai) are
//     skipped: a click inside them is mapped to "before the island".

import type { EditorSelection } from './editor-state';

/** Find the block element that contains `node`. Returns the
 *  HTMLElement carrying `data-block-id`, or null if `node` isn't
 *  inside a rendered block. */
function findBlockElement(node: Node): HTMLElement | null {
  let cur: Node | null = node;
  while (cur) {
    if (cur.nodeType === 1) {
      const el = cur as HTMLElement;
      if (el.dataset?.blockId) return el;
    }
    cur = cur.parentNode;
  }
  return null;
}

/** Walk the inline content of a block element, accumulating
 *  plain-text characters and stopping when (node, offset) is reached.
 *  Returns the plain-text offset, or -1 if the target wasn't found. */
function domOffsetToLogical(
  blockEl: HTMLElement,
  targetNode: Node,
  targetOffset: number,
): number {
  let acc = 0;
  let found = -1;

  const visit = (n: Node): boolean => {           // true = stop
    if (n === targetNode) {
      // Text node: targetOffset is character offset within the text.
      if (n.nodeType === 3) {
        found = acc + Math.min(targetOffset, (n.textContent || '').length);
        return true;
      }
      // Element: targetOffset is a child index. Walk children up to
      // that index, then stop.
      let i = 0;
      for (const child of Array.from(n.childNodes)) {
        if (i === targetOffset) { found = acc; return true; }
        if (visit(child)) return true;
        i++;
      }
      found = acc;
      return true;
    }
    if (n.nodeType === 3) {
      acc += (n.textContent || '').length;
      return false;
    }
    if (n.nodeType !== 1) return false;
    const el = n as HTMLElement;
    const tag = el.tagName.toLowerCase();
    if (tag === 'br') { acc += 1; return false; }
    if (el.classList.contains('memola-page-link')) {
      acc += (el.textContent || '').length;
      return false;
    }
    for (const c of Array.from(el.childNodes)) {
      if (visit(c)) return true;
    }
    return false;
  };

  for (const child of Array.from(blockEl.childNodes)) {
    if (visit(child)) break;
  }
  return found;
}

/** Capture the current browser selection as an EditorSelection.
 *  Returns null when the selection is outside the editor or when no
 *  selection exists. */
export function captureSelection(editorEl: HTMLElement): EditorSelection | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  const range = sel.getRangeAt(0);
  if (!editorEl.contains(range.startContainer)) return null;

  const startBlock = findBlockElement(range.startContainer);
  const endBlock = findBlockElement(range.endContainer);
  if (!startBlock || !endBlock) return null;

  const startOffset = domOffsetToLogical(startBlock, range.startContainer, range.startOffset);
  const endOffset = domOffsetToLogical(endBlock, range.endContainer, range.endOffset);
  if (startOffset < 0 || endOffset < 0) return null;

  if (range.collapsed) {
    return { kind: 'caret', blockId: startBlock.dataset.blockId!, offset: startOffset };
  }
  return {
    kind: 'range',
    anchorBlockId: startBlock.dataset.blockId!,
    anchorOffset: startOffset,
    focusBlockId: endBlock.dataset.blockId!,
    focusOffset: endOffset,
  };
}

/** Walk a block's inline DOM looking for the position corresponding
 *  to plain-text offset `target`. Returns (node, nodeOffset) for use
 *  in a Range. */
function logicalToDomOffset(
  blockEl: HTMLElement,
  target: number,
): { node: Node; offset: number } | null {
  let acc = 0;
  let result: { node: Node; offset: number } | null = null;

  const visit = (n: Node): boolean => {
    if (result) return true;
    if (n.nodeType === 3) {
      const len = (n.textContent || '').length;
      if (acc + len >= target) {
        result = { node: n, offset: target - acc };
        return true;
      }
      acc += len;
      return false;
    }
    if (n.nodeType !== 1) return false;
    const el = n as HTMLElement;
    const tag = el.tagName.toLowerCase();
    if (tag === 'br') {
      if (acc + 1 > target) {
        // Caret right before the <br>
        const parent = el.parentNode!;
        const idx = Array.from(parent.childNodes).indexOf(el);
        result = { node: parent, offset: idx };
        return true;
      }
      if (acc + 1 === target) {
        // Caret right after the <br> — parent slot past the br.
        // Without this the "past-end" fallback would land in the
        // last text node (= BEFORE the br), so a Shift+Enter
        // followed by typing would insert the new text on the
        // wrong side of the line break.
        const parent = el.parentNode!;
        const idx = Array.from(parent.childNodes).indexOf(el);
        result = { node: parent, offset: idx + 1 };
        return true;
      }
      acc += 1;
      return false;
    }
    if (el.classList.contains('memola-page-link')) {
      const len = (el.textContent || '').length;
      if (acc + len >= target) {
        // Page-links are atomic — clamp to start or end of chip
        const parent = el.parentNode!;
        const idx = Array.from(parent.childNodes).indexOf(el);
        result = { node: parent, offset: target - acc <= len / 2 ? idx : idx + 1 };
        return true;
      }
      acc += len;
      return false;
    }
    for (const c of Array.from(el.childNodes)) {
      if (visit(c)) return true;
    }
    return false;
  };

  for (const child of Array.from(blockEl.childNodes)) {
    if (visit(child)) break;
  }
  if (!result) {
    // Past the end: place at the very end of the block's inline
    // content. Find the last text node or the block itself.
    const blockInner = blockEl.firstElementChild ?? blockEl;
    const lastText = lastTextNodeIn(blockInner);
    if (lastText) {
      result = { node: lastText, offset: (lastText.textContent || '').length };
    } else {
      result = { node: blockInner, offset: blockInner.childNodes.length };
    }
  }
  return result;
}

function lastTextNodeIn(el: Node): Node | null {
  let last: Node | null = null;
  const walk = (n: Node): void => {
    if (n.nodeType === 3) { last = n; return; }
    if (n.nodeType === 1) {
      for (const c of Array.from(n.childNodes)) walk(c);
    }
  };
  walk(el);
  return last;
}

/** Apply an EditorSelection to the browser's selection so the caret
 *  appears in the right place. Idempotent — safe to call after every
 *  render. */
export function applySelection(
  editorEl: HTMLElement,
  selection: EditorSelection | null,
): void {
  if (!selection) return;
  const sel = window.getSelection();
  if (!sel) return;
  if (selection.kind === 'caret') {
    const block = editorEl.querySelector<HTMLElement>(
      '[data-block-id="' + cssEscape(selection.blockId) + '"]',
    );
    if (!block) return;
    const at = logicalToDomOffset(block, selection.offset);
    if (!at) return;
    const range = document.createRange();
    range.setStart(at.node, at.offset);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    return;
  }
  // range
  const aBlock = editorEl.querySelector<HTMLElement>(
    '[data-block-id="' + cssEscape(selection.anchorBlockId) + '"]',
  );
  const fBlock = editorEl.querySelector<HTMLElement>(
    '[data-block-id="' + cssEscape(selection.focusBlockId) + '"]',
  );
  if (!aBlock || !fBlock) return;
  const a = logicalToDomOffset(aBlock, selection.anchorOffset);
  const f = logicalToDomOffset(fBlock, selection.focusOffset);
  if (!a || !f) return;
  const range = document.createRange();
  // setStart/setEnd require start ≤ end in document order — the
  // browser's setBaseAndExtent handles either direction.
  if (typeof sel.setBaseAndExtent === 'function') {
    sel.setBaseAndExtent(a.node, a.offset, f.node, f.offset);
  } else {
    range.setStart(a.node, a.offset);
    range.setEnd(f.node, f.offset);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

/** Tiny CSS.escape polyfill — happy-dom may not have it. */
function cssEscape(s: string): string {
  if (typeof CSS !== 'undefined' && CSS.escape) return CSS.escape(s);
  return s.replace(/[^a-zA-Z0-9_-]/g, (ch) => '\\' + ch);
}

// Exported for tests
export const _internal = { domOffsetToLogical, logicalToDomOffset };
