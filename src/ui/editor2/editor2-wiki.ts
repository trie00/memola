// Wiki-link trigger for editor2 — when the user types `[[…` in a
// paragraph, open the page picker filtered by the query. On select,
// the wiki trigger range (`[[query`) is replaced by a `pagelink`
// inline; on cancel the trigger is dropped (the literal `[[query`
// stays as plain text — same as the legacy behaviour).

import type { Editor } from './editor2';
import {
  showPagePicker, updatePagePickerQuery, hide as hidePagePicker,
  pagePickerActive,
} from '../page-picker';
import { insertPagelink, deleteRange, type EditorState } from './editor-state';
import type { BlockId } from '../../lib/blocks';
import { inlineToPlainText } from '../../lib/blocks';

interface ActiveTrigger {
  blockId: BlockId;
  /** Plain-text offset where the `[[` started in the block. */
  startOffset: number;
  /** Length of the trigger including `[[` (= 2 + query length). */
  triggerLength: number;
}

export function attachWikiTrigger(editor: Editor, rootEl: HTMLElement): { destroy(): void } {
  let active: ActiveTrigger | null = null;

  function close(): void {
    active = null;
    hidePagePicker();
  }

  /** Inspect current state to detect or update a `[[…]` trigger. */
  function detect(): void {
    const blocks = editor.getBlocks();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) { if (active) close(); return; }
    const range = sel.getRangeAt(0);
    if (!range.collapsed) { if (active) close(); return; }
    const blockEl = (range.startContainer as Element)?.parentElement?.closest<HTMLElement>('[data-block-id]');
    if (!blockEl) { if (active) close(); return; }
    const id = blockEl.dataset.blockId!;
    const block = blocks.find((b) => b.id === id);
    if (!block || !('inline' in block)) { if (active) close(); return; }
    const text = inlineToPlainText(block.inline);
    // Read the caret offset within the block from the rendered DOM.
    // This is the same logic as captureSelection but inline so we
    // don't pay an extra round-trip; offsets here are best-effort
    // since we just need an upper bound for the regex match.
    // Find caret offset by walking child nodes:
    const caretOffset = computeCaretOffset(blockEl);
    if (caretOffset < 0) { if (active) close(); return; }
    const before = text.slice(0, caretOffset);
    const m = before.match(/\[\[([^\[\]]*)$/);
    if (m) {
      const startOffset = caretOffset - m[0].length;
      const query = m[1] || '';
      if (!active) {
        active = { blockId: id, startOffset, triggerLength: m[0].length };
        const rect = range.getBoundingClientRect();
        showPagePicker({
          anchor: { bottom: rect.bottom, left: rect.left, top: rect.top },
          query,
          onSelect: (p) => {
            // Replace the `[[query` range with a pagelink inline.
            if (!active) return;
            const a = active;
            editor.applyMutation((s: EditorState): EditorState => {
              // Remove the trigger text first
              const after = deleteRange(s, a.blockId, a.startOffset + a.triggerLength, -a.triggerLength);
              return insertPagelink(after, a.blockId, a.startOffset, p.Id, p.Title || '');
            }, 'structural');
            close();
          },
          onCancel: () => close(),
        });
      } else {
        // Update the trigger metadata + query
        active = { blockId: id, startOffset, triggerLength: m[0].length };
        updatePagePickerQuery(query);
      }
    } else if (active) {
      close();
    }
  }

  // Re-detect on every state change + selection change.
  const unsub = editor.subscribe(() => detect());
  const onSelChange = (): void => { if (rootEl.contains(document.activeElement) || pagePickerActive()) detect(); };
  document.addEventListener('selectionchange', onSelChange);

  return {
    destroy(): void {
      unsub();
      document.removeEventListener('selectionchange', onSelChange);
      close();
    },
  };
}

/** Walk the block element to compute the plain-text offset of the
 *  current caret. Returns -1 if the caret isn't inside this block. */
function computeCaretOffset(blockEl: HTMLElement): number {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return -1;
  const range = sel.getRangeAt(0);
  if (!blockEl.contains(range.startContainer)) return -1;
  let offset = 0;
  let stop = false;
  const visit = (n: Node): void => {
    if (stop) return;
    if (n === range.startContainer) {
      if (n.nodeType === 3) {
        offset += Math.min(range.startOffset, (n.textContent || '').length);
      } else {
        // Element with offset = child index — count children up to that index
        const children = Array.from(n.childNodes);
        for (let i = 0; i < range.startOffset && i < children.length; i++) {
          visit(children[i]);
        }
      }
      stop = true;
      return;
    }
    if (n.nodeType === 3) {
      offset += (n.textContent || '').length;
      return;
    }
    if (n.nodeType !== 1) return;
    const el = n as HTMLElement;
    const tag = el.tagName.toLowerCase();
    if (tag === 'br') { offset += 1; return; }
    if (el.classList.contains('memola-page-link')) {
      offset += (el.textContent || '').length;
      return;
    }
    for (const c of Array.from(el.childNodes)) visit(c);
  };
  for (const c of Array.from(blockEl.childNodes)) visit(c);
  return stop ? offset : -1;
}
