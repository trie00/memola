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
  insertText, deleteRange, splitBlock, mergeWithPrev,
  paragraph, inlineLength, sliceInline,
  type EditorState,
} from './editor-state';
import type { Block } from '../../lib/blocks';
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
      // Shift+Enter inserts a hard break inline. For now treat as
      // insertText with newline; a future pass can swap to a real br
      // inline node.
      if (sel.kind === 'caret') {
        const next = insertText(state, sel.blockId, sel.offset, '\n');
        return { next, preventDefault: true };
      }
      return { next: state, preventDefault: false };
    }
    case 'deleteContentBackward': {
      if (sel.kind === 'caret') {
        if (sel.offset > 0) {
          const next = deleteRange(state, sel.blockId, sel.offset, -1);
          return { next, preventDefault: true };
        }
        // At start of block — sequence of fallbacks:
        //   1. Unwrap a single-child container (callout / quote / list
        //      with one item / one block).
        //   2. Remove an empty list item (= bullet "・" only).
        //   3. Merge with the previous block, including reaching INTO
        //      a list's last item to land at its tail.
        const unwrap = backspaceUnwrapContainer(state, sel.blockId);
        if (unwrap) return { next: unwrap, preventDefault: true };
        const removeItem = backspaceRemoveEmptyListItem(state, sel.blockId);
        if (removeItem) return { next: removeItem, preventDefault: true };
        const merged = backspaceMergeWithPrev(state, sel.blockId);
        if (merged) return { next: merged, preventDefault: true };
        return { next: state, preventDefault: true };
      }
      const after = deleteSelectionRange(state, sel);
      return { next: after.state, preventDefault: true };
    }
    case 'deleteContentForward': {
      if (sel.kind === 'caret') {
        const next = deleteRange(state, sel.blockId, sel.offset, 1);
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
  // Cross-block range — delete the tail of the start block, all
  // intermediate blocks, the head of the end block, then merge the
  // start and end blocks.
  // For now this is unsupported — return the state unchanged.
  return { state, cursor: null };
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

/** Backspace on an empty inner block of a list item: remove the item
 *  entirely (the bullet line vanishes). Cursor lands at the end of
 *  the previous item's last block; if there's no previous item, lands
 *  at the start of a fresh paragraph in place of the dropped list.
 *
 *  Skips when the inner block isn't empty (= caller should fall
 *  through to a content-merge path) or when the unwrap path already
 *  handles the single-child case (handled earlier in the chain). */
function backspaceRemoveEmptyListItem(state: EditorState, innerId: string): EditorState | null {
  for (let i = 0; i < state.blocks.length; i++) {
    const list = state.blocks[i];
    if (list.kind !== 'list') continue;
    for (let j = 0; j < list.items.length; j++) {
      const item = list.items[j];
      const innerIdx = item.findIndex((b) => b.id === innerId);
      if (innerIdx < 0) continue;
      const inner = item[innerIdx];
      if (!('inline' in inner)) return null;
      if (inlineLength(inner.inline) > 0) return null;
      // Item has multiple blocks — drop just this one block from the item.
      if (item.length > 1) {
        const newItem = item.filter((b) => b.id !== innerId);
        const newItems = list.items.slice();
        newItems[j] = newItem;
        const blocks = state.blocks.slice();
        blocks[i] = { ...list, items: newItems } as Block;
        // Land caret at end of previous block in same item.
        const prevBlock = newItem[Math.max(0, innerIdx - 1)];
        if (!('inline' in prevBlock)) return null;
        return {
          ...state,
          blocks,
          selection: {
            kind: 'caret',
            blockId: prevBlock.id,
            offset: inlineLength(prevBlock.inline),
          },
        };
      }
      // Single-block item — drop the whole item.
      const newItems = list.items.filter((_, k) => k !== j);
      const blocks = state.blocks.slice();
      if (newItems.length === 0) {
        // List is now empty — drop the list itself; insert a fresh
        // paragraph in its place so the user can keep typing.
        const fresh: Block = { id: innerId, kind: 'p', inline: [] };
        blocks.splice(i, 1, fresh);
        return {
          ...state,
          blocks,
          selection: { kind: 'caret', blockId: innerId, offset: 0 },
        };
      }
      blocks[i] = { ...list, items: newItems } as Block;
      // Cursor: end of previous item's last block. If no previous
      // item (= we removed the first), land on first remaining
      // item's first block at offset 0.
      if (j > 0) {
        const prevItem = newItems[j - 1];
        const prevBlock = prevItem[prevItem.length - 1];
        if ('inline' in prevBlock) {
          return {
            ...state,
            blocks,
            selection: {
              kind: 'caret',
              blockId: prevBlock.id,
              offset: inlineLength(prevBlock.inline),
            },
          };
        }
      }
      const firstItem = newItems[0];
      const firstBlock = firstItem[0];
      return {
        ...state,
        blocks,
        selection: { kind: 'caret', blockId: firstBlock.id, offset: 0 },
      };
    }
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

/** Convenience for keydown handlers that want to convert simple key
 *  events into mutations. The orchestrator wires `beforeinput` for
 *  the heavy lifting; this is for keys browsers don't deliver as
 *  beforeinput (= mostly app-level shortcuts). */
export interface KeyAction {
  kind: 'mutate';
  next: EditorState;
}

export function handleArrowsAndShortcuts(
  state: EditorState,
  ev: KeyboardEvent,
  editorEl: HTMLElement,
): KeyAction | null {
  // For Phase 2c-1 the orchestrator handles ⌘B / ⌘I / ⌘Z directly.
  // Arrow keys are left to the browser (caret moves via browser
  // selection; our captureSelection picks up the new position on the
  // next mutation).
  void state;
  void ev;
  void editorEl;
  return null;
}
