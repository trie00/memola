// Input dispatcher — translate keystrokes / beforeinput / paste into
// state mutations.
//
// The editor's contenteditable element receives `beforeinput` events
// for every kind of user input (typing, paste, delete, formatting,
// drag-drop). We listen for `beforeinput` instead of `input` because
// it fires BEFORE the browser mutates the DOM, letting us
// `preventDefault()` and apply our own state mutation cleanly. The
// browser's own DOM mutation would conflict with controlled
// rendering — every typed character would race the next render.
//
// IME composition is special: while a composition is in progress
// (compositionstart → compositionend) we DON'T preventDefault — the
// browser owns the composition state and intervening would break IME
// candidates. We wait until compositionend then capture the result.

import {
  insertText, insertBr, deleteRange, splitBlock, mergeWithPrev,
  paragraph, inlineLength, sliceInline,
  type EditorState,
} from './editor-state';
import type { Block } from '../../lib/blocks';
import { newBlockId, inlineToPlainText } from '../../lib/blocks';
import { captureSelection } from './editor-selection';

/** Apply a beforeinput event to the current state, returning the
 *  next state and whether the browser's default action should be
 *  suppressed. The event types we recognise:
 *
 *    - `insertText` (typing single chars)
 *    - `insertParagraph` (Enter)
 *    - `insertLineBreak` (Shift+Enter)
 *    - `deleteContentBackward` (Backspace)
 *    - `deleteContentForward` (Delete)
 *    - `deleteByCut` / `insertFromPaste` (handled by separate paths)
 *
 *  Anything else (formatting, drag-drop) is left to the orchestrator
 *  for now. */
export function handleBeforeInput(
  state: EditorState,
  ev: InputEvent,
  editorEl: HTMLElement,
): { next: EditorState; preventDefault: boolean } {
  // Codex review E3: when the active range lives inside a
  // contenteditable=false island (table cell, AI block body), we
  // must NOT call preventDefault — the browser's native handling
  // (or the island's own per-element handlers) owns that input.
  // Otherwise typing into a table cell would no-op.
  const target = ev.target as HTMLElement | null;
  const island = target?.closest?.('[contenteditable="false"]');
  if (island && editorEl.contains(island)) {
    // Inside an island — let the browser handle it natively.
    return { next: state, preventDefault: false };
  }
  const sel = captureSelection(editorEl);
  if (!sel) return { next: state, preventDefault: false };

  switch (ev.inputType) {
    case 'insertText': {
      const data = ev.data ?? '';
      if (sel.kind === 'caret') {
        const next = insertText(state, sel.blockId, sel.offset, data);
        return { next, preventDefault: true };
      }
      // Range — delete the range first, then insert
      const after = deleteSelectionRange(state, sel);
      if (!after.cursor) return { next: state, preventDefault: false };
      const next = insertText(after.state, after.cursor.blockId, after.cursor.offset, data);
      return { next, preventDefault: true };
    }
    case 'insertParagraph': {
      // Code-block specific Enter handling. Two cases:
      //   - caret at end of an empty trailing line (= text === '' OR
      //     text endsWith '\n') AND offset === text.length:
      //       exit the code block. Strip the trailing '\n' (if any)
      //       and insert a fresh paragraph after the code.
      //   - Otherwise: insert '\n' at the caret. (= multi-line code)
      if (sel.kind === 'caret' && isCodeBlock(state, sel.blockId)) {
        const exitCode = enterExitCodeOnEmptyLine(state, sel.blockId, sel.offset);
        if (exitCode) return { next: exitCode, preventDefault: true };
        const next = insertText(state, sel.blockId, sel.offset, '\n');
        return { next, preventDefault: true };
      }
      if (sel.kind !== 'caret') {
        const after = deleteSelectionRange(state, sel);
        if (!after.cursor) return { next: state, preventDefault: false };
        const next = splitBlock(after.state, after.cursor.blockId, after.cursor.offset);
        return { next, preventDefault: true };
      }
      // Special case: Enter at end of EMPTY block inside a list item /
      // callout / quote → exit the container into a fresh paragraph
      // sibling at the top level. Mirrors Notion's "two Enters to
      // escape" pattern.
      const escape = enterEscapeContainer(state, sel.blockId);
      if (escape) return { next: escape, preventDefault: true };
      // Notion-style continuation exit: Enter on a top-level EMPTY
      // todo converts it to a plain paragraph (= "stop bulleting").
      // Without this, the user would be stuck in a todo loop.
      const exitTodo = enterExitEmptyTodo(state, sel.blockId);
      if (exitTodo) return { next: exitTodo, preventDefault: true };
      const next = splitBlock(state, sel.blockId, sel.offset);
      return { next, preventDefault: true };
    }
    case 'insertLineBreak': {
      // Shift+Enter inside a code block also inserts a newline (same
      // as plain Enter — the distinction collapses for multi-line
      // text inside <pre>).
      if (sel.kind === 'caret' && isCodeBlock(state, sel.blockId)) {
        const next = insertText(state, sel.blockId, sel.offset, '\n');
        return { next, preventDefault: true };
      }
      // Shift+Enter inserts a hard line break as a `<br>` inline node.
      // (Plain text "\n" wouldn't render as a visible break in HTML.)
      if (sel.kind === 'caret') {
        const next = insertBr(state, sel.blockId, sel.offset);
        return { next, preventDefault: true };
      }
      // Range selection — delete the range first, then insert br.
      const after = deleteSelectionRange(state, sel);
      if (!after.cursor) return { next: state, preventDefault: false };
      const next = insertBr(after.state, after.cursor.blockId, after.cursor.offset);
      return { next, preventDefault: true };
    }
    case 'deleteContentBackward': {
      if (sel.kind === 'caret') {
        if (sel.offset > 0) {
          // If the inline node ENDING at the caret is atomic (page-
          // link / daily-link), Backspace deletes the whole link
          // rather than slicing through it (= no half-link "Welcom"
          // left behind). Fall back to single-char delete otherwise.
          const atomicLen = atomicNodeEndingAt(state, sel.blockId, sel.offset);
          const count = atomicLen > 0 ? -atomicLen : -1;
          const next = deleteRange(state, sel.blockId, sel.offset, count);
          return { next, preventDefault: true };
        }
        // At start of block — sequence of fallbacks:
        //   1. Unwrap a single-child container (callout / quote / list
        //      with one item / one block).
        //   2. Remove an empty inner block from a list / quote / callout
        //      (= the bullet "・" or empty quote-continuation line).
        //   3. Convert an empty code block to a plain paragraph (so a
        //      mistakenly-inserted code block can be undone with one
        //      Backspace).
        //   4. Merge with the previous block, including reaching INTO
        //      a list's last item to land at its tail.
        // Atomic image blocks have no inline content, so the normal
        // merge-with-prev path can't remove them. Handle them first:
        // Backspace on the image itself, or at the start of the block
        // after an image, deletes the image.
        const delImg = backspaceDeleteImage(state, sel.blockId);
        if (delImg) return { next: delImg, preventDefault: true };
        const unwrap = backspaceUnwrapContainer(state, sel.blockId);
        if (unwrap) return { next: unwrap, preventDefault: true };
        const removeItem = backspaceRemoveEmptyInner(state, sel.blockId);
        if (removeItem) return { next: removeItem, preventDefault: true };
        const exitCode = backspaceExitEmptyCode(state, sel.blockId);
        if (exitCode) return { next: exitCode, preventDefault: true };
        const merged = backspaceMergeWithPrev(state, sel.blockId);
        if (merged) return { next: merged, preventDefault: true };
        return { next: state, preventDefault: true };
      }
      const after = deleteSelectionRange(state, sel);
      return { next: after.state, preventDefault: true };
    }
    case 'deleteContentForward': {
      if (sel.kind === 'caret') {
        // Mirror Backspace's atomic-link guard for forward delete: if
        // the inline node STARTING at the caret is atomic
        // (pagelink/dailylink), delete the whole chip rather than
        // slicing through it. Falls back to single-char otherwise.
        const atomicLen = atomicNodeStartingAt(state, sel.blockId, sel.offset);
        const count = atomicLen > 0 ? atomicLen : 1;
        const next = deleteRange(state, sel.blockId, sel.offset, count);
        return { next, preventDefault: true };
      }
      const after = deleteSelectionRange(state, sel);
      return { next: after.state, preventDefault: true };
    }
    default:
      // Unknown input type — let the browser do its thing. The
      // orchestrator's render-after-input pass will reconcile.
      return { next: state, preventDefault: false };
  }
}

/** Delete a range selection from the state. Returns the new state
 *  plus the caret position to land at after deletion (= the
 *  collapsed range start). For now we only handle ranges that stay
 *  inside a single block; cross-block ranges are left to a later
 *  pass (delete-content-with-merge is non-trivial). */
function deleteSelectionRange(
  state: EditorState,
  sel: Extract<ReturnType<typeof captureSelection>, { kind: 'range' }> | NonNullable<ReturnType<typeof captureSelection>>,
): { state: EditorState; cursor: { blockId: string; offset: number } | null } {
  if (sel.kind !== 'range') return { state, cursor: null };
  // Same-block range
  if (sel.anchorBlockId === sel.focusBlockId) {
    const start = Math.min(sel.anchorOffset, sel.focusOffset);
    const end = Math.max(sel.anchorOffset, sel.focusOffset);
    const next = deleteRange(state, sel.anchorBlockId, start, end - start);
    return { state: next, cursor: { blockId: sel.anchorBlockId, offset: start } };
  }
  // Cross-block range — order start/end by document position, take the
  // prefix of the start block + the suffix of the end block, drop every
  // block between them, and merge prefix+suffix into the start block
  // (= same semantics as a contenteditable native cross-block backspace).
  // Top-level blocks only; nested-block ranges fall through unchanged
  // (= a separate hairy case).
  const blocks = state.blocks;
  const aIdx = blocks.findIndex((b) => b.id === sel.anchorBlockId);
  const fIdx = blocks.findIndex((b) => b.id === sel.focusBlockId);
  if (aIdx < 0 || fIdx < 0) return { state, cursor: null };
  const startIdx = Math.min(aIdx, fIdx);
  const endIdx = Math.max(aIdx, fIdx);
  const startOffset = aIdx <= fIdx ? sel.anchorOffset : sel.focusOffset;
  const endOffset = aIdx <= fIdx ? sel.focusOffset : sel.anchorOffset;
  const startBlock = blocks[startIdx];
  const endBlock = blocks[endIdx];
  if (!('inline' in startBlock) || !('inline' in endBlock)) {
    // Range crosses an atomic block (table/linkdb/ai/rule/image) — leave
    // it to the browser. We pass `preventDefault: false` upstream by
    // returning a null cursor; orchestrator already handles this.
    return { state, cursor: null };
  }
  const mergedInline = [
    ...sliceInlineLocal(startBlock.inline, 0, startOffset),
    ...sliceInlineLocal(endBlock.inline, endOffset, Number.POSITIVE_INFINITY),
  ];
  const mergedBlock = { ...startBlock, inline: mergedInline } as typeof startBlock;
  const nextBlocks = [
    ...blocks.slice(0, startIdx),
    mergedBlock,
    ...blocks.slice(endIdx + 1),
  ];
  return {
    state: { ...state, blocks: nextBlocks },
    cursor: { blockId: mergedBlock.id, offset: startOffset },
  };
}

/** Local slice helper that delegates to the canonical `sliceInline`
 *  from editor-state. Re-exported with an alias to keep the cross-block
 *  range delete self-contained while reusing the offset math. */
function sliceInlineLocal(
  inline: import('../../lib/blocks').Inline[],
  from: number,
  to: number,
): import('../../lib/blocks').Inline[] {
  return sliceInline(inline, from, to);
}

/** When the user presses Enter on an EMPTY block that lives inside a
 *  callout / quote / list item, escape out of the container by
 *  removing the empty block from inside and inserting a fresh
 *  paragraph after the container at top level. Returns the new state,
 *  or null when the Enter should split normally.
 *
 *  Algorithm:
 *    - Walk top-level blocks looking for the inner block by id
 *    - If found inside a callout/quote: remove the inner block from
 *      the container's `children`. If the container's children become
 *      empty, drop the container too. Insert a fresh paragraph AFTER
 *      the container (or at the container's slot if it was dropped).
 *    - If found inside a list: remove the empty item. If the list
 *      becomes empty, drop it. Insert a fresh paragraph AFTER. */
function enterEscapeContainer(state: EditorState, innerId: string): EditorState | null {
  // Block must be an inline-bearing kind that's currently empty
  const innerLoc = locateInsideContainer(state, innerId);
  if (!innerLoc) return null;
  const innerBlock = innerLoc.inner;
  if (!('inline' in innerBlock)) return null;
  if (inlineLength(innerBlock.inline) > 0) return null;
  // Build the new top-level blocks array.
  const blocks = state.blocks.slice();
  const container = blocks[innerLoc.outerIdx];
  let newContainer: Block | null = null;
  if (container.kind === 'callout' || container.kind === 'quote') {
    const newChildren = container.children.filter((c) => c.id !== innerId);
    if (newChildren.length > 0) {
      newContainer = { ...container, children: newChildren };
    }
  } else if (container.kind === 'list') {
    const newItems = container.items
      .map((item) => item.filter((b) => b.id !== innerId))
      .filter((item) => item.length > 0);
    if (newItems.length > 0) {
      newContainer = { ...container, items: newItems };
    }
  } else {
    return null;
  }
  if (newContainer) {
    blocks[innerLoc.outerIdx] = newContainer;
  } else {
    blocks.splice(innerLoc.outerIdx, 1);
  }
  const fresh = paragraph('');
  // Insert AFTER the container's slot (or where it was)
  const insertAt = newContainer ? innerLoc.outerIdx + 1 : innerLoc.outerIdx;
  blocks.splice(insertAt, 0, fresh);
  return {
    ...state,
    blocks,
    selection: { kind: 'caret', blockId: fresh.id, offset: 0 },
  };
}

/** When the inline node ENDING exactly at the given offset is an
 *  atomic atom (`pagelink` / `dailylink`), return its visible length.
 *  Returns 0 when the offset doesn't fall right after such an atom.
 *  Used by Backspace to delete the whole link in one keystroke. */
function atomicNodeEndingAt(state: EditorState, blockId: string, offset: number): number {
  const top = state.blocks.find((b) => b.id === blockId);
  // Top-level only — atomic-link Backspace inside nested blocks is
  // a rare edge case and already handled correctly by the
  // recursive sliceInline path.
  if (!top || !('inline' in top)) return 0;
  let pos = 0;
  for (const node of top.inline) {
    let len = 0;
    if (node.kind === 'text') len = node.text.length;
    else if (node.kind === 'code') len = node.text.length;
    else if (node.kind === 'br') len = 1;
    else if (node.kind === 'pagelink') len = (node.alias || node.pageId).length;
    else if (node.kind === 'dailylink') len = (node.alias || node.date).length;
    else if ('children' in node) {
      // Format wrappers (bold/italic/strike/link) — accumulate length
      // by recursing once. Keep it simple: just sum inline lengths.
      len = sumInlineLength(node.children);
    }
    if (pos + len === offset) {
      // Caret is right after `node`. Atomic only if pagelink/dailylink.
      if (node.kind === 'pagelink' || node.kind === 'dailylink') {
        return len;
      }
      return 0;
    }
    if (pos + len > offset) return 0;     // caret is INSIDE this node
    pos += len;
  }
  return 0;
}

/** Mirror of `atomicNodeEndingAt` for forward delete: when the inline
 *  node STARTING exactly at the given offset is an atomic atom
 *  (`pagelink` / `dailylink`), return its visible length. Returns 0
 *  when the offset doesn't fall right before such an atom. */
function atomicNodeStartingAt(state: EditorState, blockId: string, offset: number): number {
  const top = state.blocks.find((b) => b.id === blockId);
  if (!top || !('inline' in top)) return 0;
  let pos = 0;
  for (const node of top.inline) {
    let len = 0;
    if (node.kind === 'text') len = node.text.length;
    else if (node.kind === 'code') len = node.text.length;
    else if (node.kind === 'br') len = 1;
    else if (node.kind === 'pagelink') len = (node.alias || node.pageId).length;
    else if (node.kind === 'dailylink') len = (node.alias || node.date).length;
    else if ('children' in node) len = sumInlineLength(node.children);
    if (pos === offset) {
      if (node.kind === 'pagelink' || node.kind === 'dailylink') return len;
      return 0;
    }
    if (pos > offset) return 0;
    pos += len;
  }
  return 0;
}

function sumInlineLength(inline: import('../../lib/blocks').Inline[]): number {
  let total = 0;
  for (const i of inline) {
    if (i.kind === 'text') total += i.text.length;
    else if (i.kind === 'code') total += i.text.length;
    else if (i.kind === 'br') total += 1;
    else if (i.kind === 'pagelink') total += (i.alias || i.pageId).length;
    else if (i.kind === 'dailylink') total += (i.alias || i.date).length;
    else if ('children' in i) total += sumInlineLength(i.children);
  }
  return total;
}

/** Notion-style "two Enters to exit code block": when the user hits
 *  Enter at the end of an EMPTY trailing line of a code block, exit
 *  the code (= drop that trailing '\n' AND append a fresh paragraph
 *  AFTER the code, with caret on the new paragraph). Returns null
 *  when the conditions don't match. */
function enterExitCodeOnEmptyLine(
  state: EditorState,
  blockId: string,
  offset: number,
): EditorState | null {
  const idx = state.blocks.findIndex((b) => b.id === blockId);
  if (idx < 0) return null;
  const block = state.blocks[idx];
  if (block.kind !== 'code') return null;
  // Must be at the very end of the code's text.
  if (offset !== block.text.length) return null;
  // Current line is empty: either the text itself is empty (= empty
  // code block), or the last char before the caret is '\n'.
  const isEmptyLine = block.text === '' || block.text.endsWith('\n');
  if (!isEmptyLine) return null;
  // Strip the trailing '\n' (if any) so the code doesn't carry a
  // dangling empty line into persistence.
  const newText = block.text.endsWith('\n')
    ? block.text.slice(0, -1)
    : block.text;
  const newId = newBlockId();
  const fresh: Block = { id: newId, kind: 'p', inline: [] };
  const blocks = state.blocks.slice();
  blocks[idx] = { ...block, text: newText } as Block;
  blocks.splice(idx + 1, 0, fresh);
  return {
    ...state,
    blocks,
    selection: { kind: 'caret', blockId: newId, offset: 0 },
  };
}

/** True iff the block carrying `blockId` is a `code` block. Used to
 *  swap Enter / Shift+Enter from "split block" to "insert newline
 *  in the code text". */
function isCodeBlock(state: EditorState, blockId: string): boolean {
  // Top-level fast path; nested code blocks are uncommon but the
  // recursive `findBlockPath` covers them.
  const top = state.blocks.find((b) => b.id === blockId);
  if (top?.kind === 'code') return true;
  // Fall back to a recursive search if the id wasn't found at top
  // level (shouldn't happen in current design but be defensive).
  const stack: import('./editor-state').EditorState['blocks'] = state.blocks.slice();
  while (stack.length) {
    const b = stack.shift()!;
    if (b.id === blockId) return b.kind === 'code';
    if (b.kind === 'callout' || b.kind === 'quote') stack.push(...b.children);
    else if (b.kind === 'list') for (const item of b.items) stack.push(...item);
  }
  return false;
}

/** Convert an empty top-level code block into a paragraph at the
 *  same position. The user typically lands here after creating a
 *  code block via slash menu / toolbar by mistake — without this,
 *  Backspace on the empty code block was a no-op and the user
 *  was stuck with a code block they couldn't remove. Non-empty
 *  code blocks are left alone (= avoid destructive single-key delete
 *  of typed content). */
function backspaceExitEmptyCode(state: EditorState, blockId: string): EditorState | null {
  const idx = state.blocks.findIndex((b) => b.id === blockId);
  if (idx < 0) return null;
  const block = state.blocks[idx];
  if (block.kind !== 'code') return null;
  if (block.text !== '') return null;
  const blocks = state.blocks.slice();
  blocks[idx] = { id: block.id, kind: 'p', inline: [] };
  return {
    ...state,
    blocks,
    selection: { kind: 'caret', blockId: block.id, offset: 0 },
  };
}

/** Convert an empty top-level todo into a paragraph (= the user
 *  pressed Enter to "stop the todo list"). Returns null when the
 *  block isn't a top-level empty todo. */
function enterExitEmptyTodo(state: EditorState, blockId: string): EditorState | null {
  const idx = state.blocks.findIndex((b) => b.id === blockId);
  if (idx < 0) return null;
  const block = state.blocks[idx];
  if (block.kind !== 'todo') return null;
  if (inlineLength(block.inline) > 0) return null;
  const blocks = state.blocks.slice();
  blocks[idx] = { id: block.id, kind: 'p', inline: [] };
  return {
    ...state,
    blocks,
    selection: { kind: 'caret', blockId: block.id, offset: 0 },
  };
}

/** Backspace on an empty inner block of a container (list / quote /
 *  callout). Removes that block from the container's children; lands
 *  the caret at the end of the previous sibling. When the container
 *  becomes empty as a result, replaces it with a fresh top-level
 *  paragraph so the user can keep typing.
 *
 *  Skips when the inner block isn't empty (= caller should fall
 *  through to merge-with-prev) or when the single-child unwrap path
 *  earlier in the chain has already handled the case. */
function backspaceRemoveEmptyInner(state: EditorState, innerId: string): EditorState | null {
  for (let i = 0; i < state.blocks.length; i++) {
    const container = state.blocks[i];
    if (container.kind === 'list') {
      const r = removeFromList(state, container, i, innerId);
      if (r) return r;
    } else if (container.kind === 'quote' || container.kind === 'callout') {
      const r = removeFromChildren(state, container, i, innerId);
      if (r) return r;
    }
  }
  return null;
}

function removeFromList(
  state: EditorState,
  list: Extract<Block, { kind: 'list' }>,
  listIdx: number,
  innerId: string,
): EditorState | null {
  for (let j = 0; j < list.items.length; j++) {
    const item = list.items[j];
    const innerIdx = item.findIndex((b) => b.id === innerId);
    if (innerIdx < 0) continue;
    const inner = item[innerIdx];
    if (!('inline' in inner)) return null;
    if (inlineLength(inner.inline) > 0) return null;
    // Item has multiple blocks — drop just this one block.
    if (item.length > 1) {
      const newItem = item.filter((b) => b.id !== innerId);
      const newItems = list.items.slice();
      newItems[j] = newItem;
      const blocks = state.blocks.slice();
      blocks[listIdx] = { ...list, items: newItems } as Block;
      const prevBlock = newItem[Math.max(0, innerIdx - 1)];
      if (!('inline' in prevBlock)) return null;
      return {
        ...state, blocks,
        selection: { kind: 'caret', blockId: prevBlock.id, offset: inlineLength(prevBlock.inline) },
      };
    }
    // Single-block item — drop the whole item.
    const newItems = list.items.filter((_, k) => k !== j);
    const blocks = state.blocks.slice();
    if (newItems.length === 0) {
      // List empty — replace with a fresh paragraph.
      const fresh: Block = { id: innerId, kind: 'p', inline: [] };
      blocks.splice(listIdx, 1, fresh);
      return {
        ...state, blocks,
        selection: { kind: 'caret', blockId: innerId, offset: 0 },
      };
    }
    blocks[listIdx] = { ...list, items: newItems } as Block;
    if (j > 0) {
      const prevItem = newItems[j - 1];
      const prevBlock = prevItem[prevItem.length - 1];
      if ('inline' in prevBlock) {
        return {
          ...state, blocks,
          selection: { kind: 'caret', blockId: prevBlock.id, offset: inlineLength(prevBlock.inline) },
        };
      }
    }
    const firstBlock = newItems[0][0];
    return {
      ...state, blocks,
      selection: { kind: 'caret', blockId: firstBlock.id, offset: 0 },
    };
  }
  return null;
}

function removeFromChildren(
  state: EditorState,
  container: Extract<Block, { kind: 'quote' | 'callout' }>,
  containerIdx: number,
  innerId: string,
): EditorState | null {
  const innerIdx = container.children.findIndex((b) => b.id === innerId);
  if (innerIdx < 0) return null;
  const inner = container.children[innerIdx];
  if (!('inline' in inner)) return null;
  if (inlineLength(inner.inline) > 0) return null;
  const newChildren = container.children.filter((b) => b.id !== innerId);
  const blocks = state.blocks.slice();
  if (newChildren.length === 0) {
    // Container empty — replace with a fresh paragraph (= the
    // single-child unwrap handled this earlier; this branch is the
    // belt-and-braces fallback).
    const fresh: Block = { id: innerId, kind: 'p', inline: [] };
    blocks.splice(containerIdx, 1, fresh);
    return {
      ...state, blocks,
      selection: { kind: 'caret', blockId: innerId, offset: 0 },
    };
  }
  blocks[containerIdx] = { ...container, children: newChildren } as Block;
  // Land the caret at the end of the previous sibling, or at the
  // start of the new first child if we deleted index 0.
  if (innerIdx > 0) {
    const prev = newChildren[innerIdx - 1];
    if ('inline' in prev) {
      return {
        ...state, blocks,
        selection: { kind: 'caret', blockId: prev.id, offset: inlineLength(prev.inline) },
      };
    }
  }
  const first = newChildren[0];
  return {
    ...state, blocks,
    selection: { kind: 'caret', blockId: first.id, offset: 0 },
  };
}

/** Backspace handling for atomic image blocks (which carry no inline
 *  content, so `mergeWithPrev` can't touch them). Two cases at a block
 *  boundary:
 *    A. the caret is ON the image block itself → delete the image,
 *       landing the caret at the end of the previous block (or the start
 *       of the next, or a fresh empty paragraph if it was the only block).
 *    B. the caret is at the start of a normal block whose predecessor is
 *       an image → delete that image, keeping the caret where it is.
 *  Returns null when neither applies (so the normal chain continues). */
function backspaceDeleteImage(state: EditorState, blockId: string): EditorState | null {
  const idx = state.blocks.findIndex((b) => b.id === blockId);
  if (idx < 0) return null;
  // Case A — the current block is the image.
  if (state.blocks[idx].kind === 'image') {
    const blocks = state.blocks.slice();
    blocks.splice(idx, 1);
    if (blocks.length === 0) {
      const p = paragraph('');
      return { ...state, blocks: [p], selection: { kind: 'caret', blockId: p.id, offset: 0 } };
    }
    const target = idx > 0 ? blocks[idx - 1] : blocks[idx];
    const offset = 'inline' in target ? inlineLength(target.inline) : 0;
    return { ...state, blocks, selection: { kind: 'caret', blockId: target.id, offset } };
  }
  // Case B — the previous block is an image.
  if (idx > 0 && state.blocks[idx - 1].kind === 'image') {
    const blocks = state.blocks.slice();
    blocks.splice(idx - 1, 1);
    return { ...state, blocks, selection: { kind: 'caret', blockId, offset: 0 } };
  }
  return null;
}

/** Backspace at start of a block — merge with the previous block.
 *  Extends the legacy `mergeWithPrev` (top-level only) with two more
 *  cases:
 *    - Top-level block whose predecessor is a list: append into the
 *      tail of the last item's last block (= merging out of a list).
 *    - Inner block (callout/quote/list-item) whose predecessor is a
 *      sibling at the same nesting depth: merge in place. */
function backspaceMergeWithPrev(state: EditorState, blockId: string): EditorState | null {
  // Top-level fast path.
  const idx = state.blocks.findIndex((b) => b.id === blockId);
  if (idx > 0) {
    const cur = state.blocks[idx];
    const prev = state.blocks[idx - 1];
    if (!('inline' in cur)) return null;
    // Predecessor is a code block — append cur's text into the code,
    // adding a newline separator if the code doesn't already end with
    // one. (= "the line below code falls into the code block", which
    // is what the user expects when they Backspace at the boundary.)
    if (prev.kind === 'code') {
      // Code is opaque text — strip cur's inline formatting.
      const curText = inlineToPlainText(cur.inline);
      const sep = (prev.text === '' || prev.text.endsWith('\n')) ? '' : '\n';
      const newText = prev.text + sep + curText;
      const blocks = state.blocks.slice();
      blocks[idx - 1] = { ...prev, text: newText } as Block;
      blocks.splice(idx, 1);
      return {
        ...state,
        blocks,
        selection: {
          kind: 'caret',
          blockId: prev.id,
          offset: prev.text.length + sep.length,
        },
      };
    }
    // Predecessor is a list — splice cur's content onto the tail of
    // the last item's last block.
    if (prev.kind === 'list' && prev.items.length > 0) {
      const lastItem = prev.items[prev.items.length - 1];
      const lastBlock = lastItem[lastItem.length - 1];
      if (!('inline' in lastBlock)) return null;
      const joinOffset = inlineLength(lastBlock.inline);
      const mergedInline = sliceInline(
        lastBlock.inline.concat(cur.inline), 0, Infinity,
      );
      const newLastBlock: Block = { ...lastBlock, inline: mergedInline } as Block;
      const newLastItem = [...lastItem.slice(0, -1), newLastBlock];
      const newItems = [...prev.items.slice(0, -1), newLastItem];
      const updatedList: Block = { ...prev, items: newItems } as Block;
      const blocks = state.blocks.slice();
      blocks[idx - 1] = updatedList;
      blocks.splice(idx, 1);
      return {
        ...state,
        blocks,
        selection: { kind: 'caret', blockId: lastBlock.id, offset: joinOffset },
      };
    }
    if ('inline' in prev) {
      const joinOffset = inlineLength(prev.inline);
      const merged: Block = {
        ...prev,
        inline: sliceInline(prev.inline.concat(cur.inline), 0, Infinity),
      } as Block;
      const blocks = state.blocks.slice();
      blocks[idx - 1] = merged;
      blocks.splice(idx, 1);
      return {
        ...state,
        blocks,
        selection: { kind: 'caret', blockId: prev.id, offset: joinOffset },
      };
    }
  }
  return null;
}

/** Backspace at the start of a block — try to unwrap if the block is
 *  the SOLE child of a callout / quote, replacing the container with
 *  the inner block at top level. Returns null when no unwrap applies
 *  (caller falls back to mergeWithPrev). */
function backspaceUnwrapContainer(state: EditorState, innerId: string): EditorState | null {
  const loc = locateInsideContainer(state, innerId);
  if (!loc) return null;
  const container = state.blocks[loc.outerIdx];
  // Only unwrap when the inner block is the SOLE child / item — partial
  // unwrap (extracting one of many) is too surprising.
  if (container.kind === 'callout' || container.kind === 'quote') {
    if (container.children.length !== 1) return null;
    const blocks = state.blocks.slice();
    blocks.splice(loc.outerIdx, 1, loc.inner);
    return {
      ...state,
      blocks,
      selection: { kind: 'caret', blockId: loc.inner.id, offset: 0 },
    };
  }
  if (container.kind === 'list') {
    if (container.items.length !== 1) return null;
    if (container.items[0].length !== 1) return null;
    const blocks = state.blocks.slice();
    blocks.splice(loc.outerIdx, 1, loc.inner);
    return {
      ...state,
      blocks,
      selection: { kind: 'caret', blockId: loc.inner.id, offset: 0 },
    };
  }
  return null;
}

interface ContainerLocation {
  outerIdx: number;
  inner: Block;
}

/** Find the (outer block index, inner block) pair for a block that
 *  lives inside a callout / quote / list item. Returns null if the
 *  block id is at the top level (or unknown). */
function locateInsideContainer(state: EditorState, innerId: string): ContainerLocation | null {
  for (let i = 0; i < state.blocks.length; i++) {
    const b = state.blocks[i];
    if (b.id === innerId) return null;     // top-level — not in a container
    if (b.kind === 'callout' || b.kind === 'quote') {
      const child = b.children.find((c) => c.id === innerId);
      if (child) return { outerIdx: i, inner: child };
    }
    if (b.kind === 'list') {
      for (const item of b.items) {
        const inner = item.find((c) => c.id === innerId);
        if (inner) return { outerIdx: i, inner };
      }
    }
  }
  return null;
}

