// Controlled-rendering editor — state model + pure mutations.
//
// The editor's canonical state is `EditorState` (Block[] + selection).
// Every user input becomes a state mutation; the renderer derives the
// DOM from state. This is the inverse of the legacy `attachEditor`
// which manipulated the DOM directly and parsed it back to blocks at
// save time.
//
// Mutations are PURE — they take a state and return a new one.
// Effects (DOM update, save scheduling, undo push) live in the
// orchestrator (`editor2.ts`).

import type { Block, BlockId, Inline } from '../../lib/blocks';
import { newBlockId, plainInline, inlineToPlainText } from '../../lib/blocks';

// ── Selection types ────────────────────────────────────────

/** Logical caret / range position. Kept separate from DOM Range so
 *  re-renders can restore the same logical position even when the
 *  underlying DOM nodes were replaced. */
export type EditorSelection =
  | {
      kind: 'caret';
      blockId: BlockId;
      /** Offset into the block's *plain text* (= `inlineToPlainText`).
       *  Inline structure boundaries don't matter — the offset is in
       *  user-visible characters. */
      offset: number;
    }
  | {
      kind: 'range';
      anchorBlockId: BlockId;
      anchorOffset: number;
      focusBlockId: BlockId;
      focusOffset: number;
    }
  | {
      /** Cell-range selection inside a `table` block (Notion-style
       *  drag-select across multiple cells). The renderer uses this to
       *  highlight the rectangle anchor↔focus; cell-range copy and
       *  Delete/Backspace are dispatched against the same shape. */
      kind: 'table-cells';
      blockId: BlockId;
      anchor: { row: number; col: number };
      focus: { row: number; col: number };
    };

export interface EditorState {
  blocks: Block[];
  selection: EditorSelection | null;
}

export const EMPTY_STATE: EditorState = { blocks: [], selection: null };

// ── Helpers (pure) ─────────────────────────────────────────

/** Find a block by id. Returns the index + block, or null.
 *  Top-level only — for nested-aware lookup use `findBlockPath`. */
export function findBlock(state: EditorState, id: BlockId): { idx: number; block: Block } | null {
  const idx = state.blocks.findIndex((b) => b.id === id);
  if (idx < 0) return null;
  return { idx, block: state.blocks[idx] };
}

/** Recursive block locator. Returns the path of indices through
 *  containers (callout/quote/list) to reach the target block, plus
 *  the block itself. Top-level blocks have a single-element path.
 *
 *  Codex review E1: most mutations were top-level only, silently
 *  failing for blocks inside callout/quote/list items. This + the
 *  helpers below let mutations operate on nested blocks too. */
export interface BlockPathResult {
  path: number[];
  block: Block;
}

export function findBlockPath(state: EditorState, id: BlockId): BlockPathResult | null {
  return walkPath(state.blocks, id, []);
}

function walkPath(blocks: Block[], id: BlockId, prefix: number[]): BlockPathResult | null {
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.id === id) return { path: [...prefix, i], block: b };
    if (b.kind === 'callout' || b.kind === 'quote') {
      const inner = walkPath(b.children, id, [...prefix, i]);
      if (inner) return inner;
    } else if (b.kind === 'list') {
      for (let j = 0; j < b.items.length; j++) {
        const inner = walkPath(b.items[j], id, [...prefix, i, j]);
        if (inner) return inner;
      }
    }
  }
  return null;
}

/** Apply a transform to the block at `path`, returning a fresh
 *  blocks tree (the rest is structurally shared). Used by mutations
 *  to update nested blocks without imperatively rebuilding the path. */
function withBlockAtPath(
  blocks: Block[],
  path: number[],
  transform: (b: Block) => Block,
): Block[] {
  if (path.length === 0) return blocks;
  if (path.length === 1) {
    const idx = path[0];
    if (idx < 0 || idx >= blocks.length) return blocks;
    const next = blocks.slice();
    next[idx] = transform(blocks[idx]);
    return next;
  }
  const [headIdx, ...rest] = path;
  if (headIdx < 0 || headIdx >= blocks.length) return blocks;
  const head = blocks[headIdx];
  let updatedHead: Block;
  if (head.kind === 'callout' || head.kind === 'quote') {
    updatedHead = { ...head, children: withBlockAtPath(head.children, rest, transform) };
  } else if (head.kind === 'list') {
    // path[0] is list idx, path[1] is item idx, path[2..] is into the item
    const [itemIdx, ...inner] = rest;
    if (itemIdx < 0 || itemIdx >= head.items.length) return blocks;
    const updatedItems = head.items.slice();
    updatedItems[itemIdx] = withBlockAtPath(head.items[itemIdx], inner, transform);
    updatedHead = { ...head, items: updatedItems };
  } else {
    return blocks;     // unsupported container kind
  }
  const next = blocks.slice();
  next[headIdx] = updatedHead;
  return next;
}

/** Replace a block at idx with a fresh value. Returns a new state. */
export function replaceBlock(state: EditorState, idx: number, next: Block): EditorState {
  const blocks = state.blocks.slice();
  blocks[idx] = next;
  return { ...state, blocks };
}

/** Insert a fresh block at the given index, shifting later ones. */
export function insertBlock(state: EditorState, idx: number, block: Block): EditorState {
  const blocks = state.blocks.slice();
  blocks.splice(idx, 0, block);
  return { ...state, blocks };
}

/** Remove the block at idx. */
export function removeBlock(state: EditorState, idx: number): EditorState {
  const blocks = state.blocks.slice();
  blocks.splice(idx, 1);
  return { ...state, blocks };
}

// ── Inline-text mutations (the most common operation) ──────

/** Replace the inline content of a block. Works on top-level AND
 *  nested blocks (= a paragraph inside a callout / list / quote).
 *  Used by the input dispatcher when the user types / deletes
 *  characters. Codex review E1: previously top-level only. */
export function setBlockInline(
  state: EditorState,
  blockId: BlockId,
  inline: Inline[],
): EditorState {
  const found = findBlockPath(state, blockId);
  if (!found) return state;
  const { block } = found;
  if (block.kind !== 'p' && block.kind !== 'h1' && block.kind !== 'h2'
    && block.kind !== 'h3' && block.kind !== 'todo') {
    return state;
  }
  const blocks = withBlockAtPath(state.blocks, found.path, (b) => {
    if (b.kind !== 'p' && b.kind !== 'h1' && b.kind !== 'h2'
      && b.kind !== 'h3' && b.kind !== 'todo') return b;
    return { ...b, inline } as Block;
  });
  return { ...state, blocks };
}

/** Insert plain text at a caret position inside a block. The block's
 *  inline run is rebuilt by inserting the text into the appropriate
 *  text node (or splitting one if the offset lands inside it).
 *
 *  Returns a new state with the caret advanced past the inserted text. */
export function insertText(
  state: EditorState,
  blockId: BlockId,
  offset: number,
  text: string,
): EditorState {
  if (text === '') return state;
  const found = findBlockPath(state, blockId);
  if (!found) return state;
  const { block } = found;
  // Code block: opaque text leaf — splice into block.text.
  if (block.kind === 'code') {
    const newText = block.text.slice(0, offset) + text + block.text.slice(offset);
    const blocks = withBlockAtPath(state.blocks, found.path, (b) =>
      b.kind === 'code' ? { ...b, text: newText } : b,
    );
    return {
      ...state,
      blocks,
      selection: { kind: 'caret', blockId, offset: offset + text.length },
    };
  }
  if (!('inline' in block)) return state;
  const newInline = insertTextIntoInline(block.inline, offset, text);
  const next = setBlockInline(state, blockId, newInline);
  return {
    ...next,
    selection: { kind: 'caret', blockId, offset: offset + text.length },
  };
}

/** Insert a hard line break (`<br>` inline node) at the caret. Used
 *  by Shift+Enter to create an in-block line break without splitting
 *  the block. The br advances the caret by 1 logical position
 *  (`inlineNodeLength('br') === 1`). */
export function insertBr(
  state: EditorState,
  blockId: BlockId,
  offset: number,
): EditorState {
  const found = findBlockPath(state, blockId);
  if (!found) return state;
  const { block } = found;
  if (!('inline' in block)) return state;
  const before = sliceInline(block.inline, 0, offset);
  const after = sliceInline(block.inline, offset, Infinity);
  const merged = sliceInline(
    [...before, { kind: 'br' as const }, ...after],
    0, Infinity,
  );
  const next = setBlockInline(state, blockId, merged);
  return {
    ...next,
    selection: { kind: 'caret', blockId, offset: offset + 1 },
  };
}

/** Delete `count` characters starting at `offset`. If count is
 *  negative, deletes characters BEFORE the offset (= Backspace). */
export function deleteRange(
  state: EditorState,
  blockId: BlockId,
  offset: number,
  count: number,
): EditorState {
  if (count === 0) return state;
  const found = findBlockPath(state, blockId);
  if (!found) return state;
  const { block } = found;
  // Code block: splice characters from block.text directly. When
  // the deletion empties the code, convert the block to a fresh
  // paragraph in place (= "delete the code block once it's empty",
  // matching the user's expectation that a fully-cleared code block
  // shouldn't linger as a visible empty box).
  if (block.kind === 'code') {
    const start = count < 0 ? Math.max(0, offset + count) : offset;
    const end = count < 0 ? offset : Math.min(block.text.length, offset + count);
    if (start === end) return state;
    const newText = block.text.slice(0, start) + block.text.slice(end);
    if (newText === '') {
      const blocks = withBlockAtPath(state.blocks, found.path, () =>
        ({ id: block.id, kind: 'p', inline: [] } as Block),
      );
      return {
        ...state,
        blocks,
        selection: { kind: 'caret', blockId: block.id, offset: 0 },
      };
    }
    const blocks = withBlockAtPath(state.blocks, found.path, (b) =>
      b.kind === 'code' ? { ...b, text: newText } : b,
    );
    return {
      ...state,
      blocks,
      selection: { kind: 'caret', blockId, offset: start },
    };
  }
  if (!('inline' in block)) return state;
  const start = count < 0 ? offset + count : offset;
  const end = count < 0 ? offset : offset + count;
  if (start === end) return state;
  const newInline = deleteRangeInInline(block.inline, start, end);
  const next = setBlockInline(state, blockId, newInline);
  return {
    ...next,
    selection: { kind: 'caret', blockId, offset: start },
  };
}

/** Split the block at `offset` into two consecutive blocks. The first
 *  retains the original kind/id; the second is a fresh paragraph
 *  (or, for `todo`, another empty todo so list-style continuation
 *  works without an extra `setBlockKind` round-trip).
 *  Caret moves to the start of the new block.
 *
 *  Also handles blocks NESTED inside list items / quote / callout —
 *  splits in-place at the same nesting depth. For list items in
 *  particular, the second half lands in a NEW list item rather than
 *  the same one (Notion-style "Enter creates a new bullet"). */
export function splitBlock(
  state: EditorState,
  blockId: BlockId,
  offset: number,
): EditorState {
  // Top-level fast path.
  const top = findBlock(state, blockId);
  if (top) {
    const { idx, block } = top;
    if (!('inline' in block)) return state;
    return splitInlineBlockTopLevel(state, idx, block, offset);
  }
  // Nested — locate inside a container.
  const list = splitInsideList(state, blockId, offset);
  if (list) return list;
  const container = splitInsideCalloutOrQuote(state, blockId, offset);
  if (container) return container;
  return state;
}

function splitInlineBlockTopLevel(
  state: EditorState,
  idx: number,
  block: Block,
  offset: number,
): EditorState {
  if (!('inline' in block)) return state;
  const before = sliceInline(block.inline, 0, offset);
  const after = sliceInline(block.inline, offset, Infinity);
  const updatedFirst: Block = { ...block, inline: before };
  const newId = newBlockId();
  const second = continuationBlock(block, newId, after);
  let next = replaceBlock(state, idx, updatedFirst);
  next = insertBlock(next, idx + 1, second);
  return {
    ...next,
    selection: { kind: 'caret', blockId: newId, offset: 0 },
  };
}

/** Decide what kind of block the second half of a split should be.
 *  Notion-style continuation:
 *    - todo  → another empty todo (so Enter on a todo continues the list)
 *    - h1/h2/h3 → paragraph (heading splits drop you into body text)
 *    - p / others → paragraph */
function continuationBlock(prev: Block, newId: BlockId, inline: Inline[]): Block {
  if (prev.kind === 'todo') {
    return { id: newId, kind: 'todo', checked: false, inline } as Block;
  }
  return { id: newId, kind: 'p', inline } as Block;
}

/** Split an inner block that lives inside a list item. The first half
 *  stays in the original item; the second half goes into a NEW list
 *  item inserted immediately after. Any sibling blocks that followed
 *  the split target within the original item are migrated to the new
 *  item (so they stay attached to the same logical list entry). */
function splitInsideList(
  state: EditorState,
  innerId: BlockId,
  offset: number,
): EditorState | null {
  for (let i = 0; i < state.blocks.length; i++) {
    const list = state.blocks[i];
    if (list.kind !== 'list') continue;
    for (let j = 0; j < list.items.length; j++) {
      const item = list.items[j];
      const innerIdx = item.findIndex((b) => b.id === innerId);
      if (innerIdx < 0) continue;
      const inner = item[innerIdx];
      if (!('inline' in inner)) return null;
      const before = sliceInline(inner.inline, 0, offset);
      const after = sliceInline(inner.inline, offset, Infinity);
      const newId = newBlockId();
      const updatedInner: Block = { ...inner, inline: before } as Block;
      // Preserve the block kind on continuation. Splitting a todo
      // item inside a list should produce another todo, not a plain
      // paragraph (mirrors the top-level + callout/quote split paths
      // which already use `continuationBlock`).
      const newPara: Block = continuationBlock(inner, newId, after);
      const newCurrentItem = [...item.slice(0, innerIdx), updatedInner];
      const newNextItem = [newPara, ...item.slice(innerIdx + 1)];
      const newItems = [
        ...list.items.slice(0, j),
        newCurrentItem,
        newNextItem,
        ...list.items.slice(j + 1),
      ];
      const updatedList: Block = { ...list, items: newItems };
      const blocks = state.blocks.slice();
      blocks[i] = updatedList;
      return {
        ...state,
        blocks,
        selection: { kind: 'caret', blockId: newId, offset: 0 },
      };
    }
  }
  return null;
}

/** Split an inner block inside a callout / quote. Splits in place —
 *  the second half is added as a new sibling within the same
 *  container's children. */
function splitInsideCalloutOrQuote(
  state: EditorState,
  innerId: BlockId,
  offset: number,
): EditorState | null {
  for (let i = 0; i < state.blocks.length; i++) {
    const c = state.blocks[i];
    if (c.kind !== 'callout' && c.kind !== 'quote') continue;
    const innerIdx = c.children.findIndex((b) => b.id === innerId);
    if (innerIdx < 0) continue;
    const inner = c.children[innerIdx];
    if (!('inline' in inner)) return null;
    const before = sliceInline(inner.inline, 0, offset);
    const after = sliceInline(inner.inline, offset, Infinity);
    const newId = newBlockId();
    const updatedInner: Block = { ...inner, inline: before } as Block;
    const second = continuationBlock(inner, newId, after);
    const newChildren = [
      ...c.children.slice(0, innerIdx),
      updatedInner,
      second,
      ...c.children.slice(innerIdx + 1),
    ];
    const blocks = state.blocks.slice();
    blocks[i] = { ...c, children: newChildren } as Block;
    return {
      ...state,
      blocks,
      selection: { kind: 'caret', blockId: newId, offset: 0 },
    };
  }
  return null;
}

/** Merge a block with its predecessor — the typical Backspace-at-block-start
 *  behaviour. The previous block keeps its kind and id; the current block's
 *  inline content is appended; the current block is removed. Caret lands at
 *  the join point. Adjacent text nodes at the join coalesce so the
 *  resulting inline tree stays canonical. */
export function mergeWithPrev(
  state: EditorState,
  blockId: BlockId,
): EditorState {
  const found = findBlock(state, blockId);
  if (!found || found.idx === 0) return state;
  const cur = found.block;
  const prev = state.blocks[found.idx - 1];
  if (!('inline' in cur) || !('inline' in prev)) return state;
  const joinOffset = inlineLength(prev.inline);
  // Re-slice through the join point so adjacent text nodes coalesce.
  const merged: Block = {
    ...prev,
    inline: sliceInline(prev.inline.concat(cur.inline), 0, Infinity),
  };
  let next = replaceBlock(state, found.idx - 1, merged);
  next = removeBlock(next, found.idx);
  return {
    ...next,
    selection: { kind: 'caret', blockId: prev.id, offset: joinOffset },
  };
}

/** Change a block's kind in place (e.g. paragraph → heading), keeping
 *  its inline content and id. Used by slash commands and toolbar. */
export function changeBlockKind(
  state: EditorState,
  blockId: BlockId,
  kind: 'p' | 'h1' | 'h2' | 'h3' | 'todo',
): EditorState {
  const found = findBlockPath(state, blockId);
  if (!found) return state;
  const { block } = found;
  if (!('inline' in block)) return state;
  const inline = block.inline;
  const blocks = withBlockAtPath(state.blocks, found.path, () => {
    if (kind === 'todo') {
      return { id: block.id, kind: 'todo', checked: false, inline } as Block;
    }
    return { id: block.id, kind, inline } as Block;
  });
  return { ...state, blocks };
}

/** Toggle a todo's checked flag. Works on nested todos too. */
export function toggleTodo(state: EditorState, blockId: BlockId): EditorState {
  const found = findBlockPath(state, blockId);
  if (!found || found.block.kind !== 'todo') return state;
  const blocks = withBlockAtPath(state.blocks, found.path, (b) => {
    if (b.kind !== 'todo') return b;
    return { ...b, checked: !b.checked };
  });
  return { ...state, blocks };
}

// ── Inline-level helpers (operate on Inline[]) ─────────────

/** Length of an inline run in plain-text characters. */
export function inlineLength(inline: Inline[]): number {
  return inlineToPlainText(inline).length;
}

/** Slice an inline run by plain-text character offset.
 *  Preserves inline formatting nodes that are entirely inside the
 *  range; splits text / code nodes that straddle the boundary. */
export function sliceInline(inline: Inline[], from: number, to: number): Inline[] {
  if (from >= to) return [];
  const out: Inline[] = [];
  let pos = 0;
  for (const i of inline) {
    const len = inlineNodeLength(i);
    if (pos + len <= from) { pos += len; continue; }
    if (pos >= to) break;
    const localFrom = Math.max(0, from - pos);
    const localTo = Math.min(len, to - pos);
    if (localFrom === 0 && localTo === len) {
      out.push(i);
    } else {
      const sliced = sliceInlineNode(i, localFrom, localTo);
      if (sliced) out.push(sliced);
    }
    pos += len;
  }
  return mergeAdjacentText(out);
}

/** Insert text into an inline run at offset, INHERITING the format
 *  that surrounds the caret (Notion-style "left-wins" boundary).
 *
 *  Rules:
 *   - Strictly INSIDE a bold/italic/strike/link wrapper → recurse so
 *     the new text becomes part of that span.
 *   - At the boundary right AFTER a wrapper → extend the wrapper.
 *   - At the boundary right BEFORE a wrapper (= start of a node /
 *     after a non-extending node like br/pagelink) → insert plain.
 *   - Inside `text` / `code` leaves → splice into that leaf.
 *   - Atomic nodes (br/pagelink/dailylink) at strict-inside positions
 *     fall back to plain text (= demote the atom; rare in practice
 *     since the caret normally lands at boundaries). */
function insertTextIntoInline(inline: Inline[], offset: number, text: string): Inline[] {
  if (text === '') return inline;
  return insertTextRec(inline, offset, text);
}

function insertTextRec(inline: Inline[], offset: number, text: string): Inline[] {
  let pos = 0;
  for (let i = 0; i < inline.length; i++) {
    const node = inline[i];
    const len = inlineNodeLength(node);

    // Boundary at START of this node — caller's "left side" was a
    // non-extending node (br / pagelink / dailylink) or this is the
    // very first node. Insert plain text BEFORE this node.
    if (offset === pos) {
      return mergeAdjacentText([
        ...inline.slice(0, i),
        { kind: 'text', text },
        ...inline.slice(i),
      ]);
    }

    // Strictly INSIDE this node — recurse / splice.
    if (offset < pos + len) {
      const local = offset - pos;
      if (node.kind === 'bold' || node.kind === 'italic' || node.kind === 'strike') {
        return [
          ...inline.slice(0, i),
          { ...node, children: insertTextRec(node.children, local, text) },
          ...inline.slice(i + 1),
        ];
      }
      if (node.kind === 'link') {
        return [
          ...inline.slice(0, i),
          { ...node, children: insertTextRec(node.children, local, text) },
          ...inline.slice(i + 1),
        ];
      }
      if (node.kind === 'text') {
        return mergeAdjacentText([
          ...inline.slice(0, i),
          { kind: 'text', text: node.text.slice(0, local) + text + node.text.slice(local) },
          ...inline.slice(i + 1),
        ]);
      }
      if (node.kind === 'code') {
        return [
          ...inline.slice(0, i),
          { kind: 'code', text: node.text.slice(0, local) + text + node.text.slice(local) },
          ...inline.slice(i + 1),
        ];
      }
      // br / pagelink / dailylink: caret in middle is degenerate.
      // Demote to plain text (= split the atom around the insertion).
      const visible = node.kind === 'pagelink' ? (node.alias || node.pageId)
        : node.kind === 'dailylink' ? (node.alias || node.date)
        : '';
      const before = visible.slice(0, local);
      const after = visible.slice(local);
      const parts: Inline[] = [];
      if (before) parts.push({ kind: 'text', text: before });
      parts.push({ kind: 'text', text });
      if (after) parts.push({ kind: 'text', text: after });
      return mergeAdjacentText([
        ...inline.slice(0, i),
        ...parts,
        ...inline.slice(i + 1),
      ]);
    }

    // Boundary at END of this node — extend the LEFT side's format.
    if (offset === pos + len) {
      if (node.kind === 'bold' || node.kind === 'italic' || node.kind === 'strike') {
        return [
          ...inline.slice(0, i),
          { ...node, children: insertTextRec(node.children, len, text) },
          ...inline.slice(i + 1),
        ];
      }
      if (node.kind === 'link') {
        return [
          ...inline.slice(0, i),
          { ...node, children: insertTextRec(node.children, len, text) },
          ...inline.slice(i + 1),
        ];
      }
      if (node.kind === 'text') {
        return mergeAdjacentText([
          ...inline.slice(0, i),
          { kind: 'text', text: node.text + text },
          ...inline.slice(i + 1),
        ]);
      }
      if (node.kind === 'code') {
        return [
          ...inline.slice(0, i),
          { kind: 'code', text: node.text + text },
          ...inline.slice(i + 1),
        ];
      }
      // br / pagelink / dailylink: don't extend — fall through to
      // the next iteration, where the START-boundary check inserts
      // plain text before the next node (or, if this was the last
      // node, the past-end fallback below).
    }

    pos += len;
  }
  // Past the end — append as plain text.
  return mergeAdjacentText([...inline, { kind: 'text', text }]);
}

function deleteRangeInInline(inline: Inline[], start: number, end: number): Inline[] {
  const before = sliceInline(inline, 0, start);
  const after = sliceInline(inline, end, Infinity);
  return mergeAdjacentText([...before, ...after]);
}

/** Length of a single inline node in plain-text characters. */
function inlineNodeLength(i: Inline): number {
  switch (i.kind) {
    case 'text': return i.text.length;
    case 'code': return i.text.length;
    case 'br':   return 1;        // hard break renders as one position
    case 'pagelink': return (i.alias || i.pageId).length;
    case 'dailylink': return (i.alias || i.date).length;
    case 'bold': case 'italic': case 'strike':
      return i.children.reduce((s, c) => s + inlineNodeLength(c), 0);
    case 'link':
      return i.children.reduce((s, c) => s + inlineNodeLength(c), 0);
  }
}

function sliceInlineNode(i: Inline, from: number, to: number): Inline | null {
  switch (i.kind) {
    case 'text': return { kind: 'text', text: i.text.slice(from, to) };
    case 'code': return { kind: 'code', text: i.text.slice(from, to) };
    case 'br':   return null;     // partial slice of a br = drop
    case 'pagelink': {
      // Page links are atomic — slicing a partial range turns them
      // into plain text of the visible portion.
      const visible = i.alias || i.pageId;
      const text = visible.slice(from, to);
      return text ? { kind: 'text', text } : null;
    }
    case 'dailylink': {
      const visible = i.alias || i.date;
      const text = visible.slice(from, to);
      return text ? { kind: 'text', text } : null;
    }
    case 'bold':
    case 'italic':
    case 'strike': {
      const inner = sliceInline(i.children, from, to);
      if (inner.length === 0) return null;
      return { kind: i.kind, children: inner };
    }
    case 'link': {
      const inner = sliceInline(i.children, from, to);
      if (inner.length === 0) return null;
      return { kind: 'link', href: i.href, children: inner };
    }
  }
}

/** Coalesce adjacent inline nodes that share the same shape — keeps
 *  the inline tree canonical so equality / round-trip checks behave.
 *  Also covers a Backspace-merge user issue: when two paragraphs
 *  whose last/first child are the SAME format (e.g. two <code>
 *  spans) get concatenated, the browser renders a hairline gap
 *  between them that looks like a stray space. Coalescing fuses
 *  them into a single span so the gap goes away.
 *
 *  Cases:
 *   - text + text → text (concatenate)
 *   - code + code → code (concatenate; code is a leaf)
 *   - bold/italic/strike + same kind → recurse into merged children
 *   - link + link with same href → recurse into merged children */
function mergeAdjacentText(inline: Inline[]): Inline[] {
  const out: Inline[] = [];
  for (const i of inline) {
    const last = out[out.length - 1];
    if (last && i.kind === 'text' && last.kind === 'text') {
      out[out.length - 1] = { kind: 'text', text: last.text + i.text };
      continue;
    }
    if (last && i.kind === 'code' && last.kind === 'code') {
      out[out.length - 1] = { kind: 'code', text: last.text + i.text };
      continue;
    }
    if (last && (i.kind === 'bold' || i.kind === 'italic' || i.kind === 'strike')
      && last.kind === i.kind) {
      out[out.length - 1] = {
        kind: i.kind,
        children: mergeAdjacentText([...last.children, ...i.children]),
      } as Inline;
      continue;
    }
    if (last && i.kind === 'link' && last.kind === 'link' && last.href === i.href) {
      out[out.length - 1] = {
        kind: 'link', href: i.href,
        children: mergeAdjacentText([...last.children, ...i.children]),
      };
      continue;
    }
    out.push(i);
  }
  return out;
}

// ── Inline formatting ─────────────────────────────────────

export type InlineFormatKind = 'bold' | 'italic' | 'strike' | 'code';

/** Apply or remove an inline format (bold / italic / strike / inline
 *  code) to the range `[fromOffset, toOffset)` within a single block.
 *  If the range is already entirely formatted with `kind`, the format
 *  is removed; otherwise it's applied uniformly.
 *
 *  For Phase 2c-3 we only support same-block ranges. Multi-block
 *  range formatting is a future pass. */
export function applyInlineFormat(
  state: EditorState,
  blockId: BlockId,
  fromOffset: number,
  toOffset: number,
  kind: InlineFormatKind,
): EditorState {
  if (fromOffset >= toOffset) return state;
  const found = findBlockPath(state, blockId);
  if (!found) return state;
  const { block } = found;
  if (!('inline' in block)) return state;
  const before = sliceInline(block.inline, 0, fromOffset);
  const middle = sliceInline(block.inline, fromOffset, toOffset);
  const after = sliceInline(block.inline, toOffset, Infinity);
  const alreadyFormatted = isUniformlyFormatted(middle, kind);
  let newMiddle: Inline[];
  if (alreadyFormatted) {
    newMiddle = stripFormat(middle, kind);
  } else {
    newMiddle = wrapFormat(middle, kind);
  }
  // Re-slice the concat through `sliceInline` so adjacent text nodes
  // at the boundaries coalesce after stripping a format.
  const merged = sliceInline([...before, ...newMiddle, ...after], 0, Infinity);
  return setBlockInline(state, blockId, merged);
}

/** True when every leaf inline node in `inline` is wrapped in (or
 *  equals) the given format. Empty input → false (nothing to toggle). */
function isUniformlyFormatted(inline: Inline[], kind: InlineFormatKind): boolean {
  if (inline.length === 0) return false;
  return inline.every((i) => isFormatted(i, kind));
}

function isFormatted(i: Inline, kind: InlineFormatKind): boolean {
  if (kind === 'code') return i.kind === 'code';
  if (i.kind === kind) return true;
  return false;
}

/** Wrap the inline run with the given format. For 'code' the children
 *  are flattened to plain text since `code` is a leaf node. */
function wrapFormat(inline: Inline[], kind: InlineFormatKind): Inline[] {
  if (kind === 'code') {
    const text = inlineToPlainText(inline);
    return text ? [{ kind: 'code', text }] : [];
  }
  if (inline.length === 0) return [];
  return [{ kind, children: inline } as Inline];
}

/** Strip the given format from the inline run. */
function stripFormat(inline: Inline[], kind: InlineFormatKind): Inline[] {
  const out: Inline[] = [];
  for (const i of inline) {
    if (kind === 'code' && i.kind === 'code') {
      out.push({ kind: 'text', text: i.text });
      continue;
    }
    if (i.kind === kind && (i.kind === 'bold' || i.kind === 'italic' || i.kind === 'strike')) {
      out.push(...i.children);
      continue;
    }
    out.push(i);
  }
  // Coalesce adjacent text after stripping
  return mergeAdjacentTextLocal(out);
}

function mergeAdjacentTextLocal(inline: Inline[]): Inline[] {
  const out: Inline[] = [];
  for (const i of inline) {
    const last = out[out.length - 1];
    if (i.kind === 'text' && last && last.kind === 'text') {
      out[out.length - 1] = { kind: 'text', text: last.text + i.text };
    } else {
      out.push(i);
    }
  }
  return out;
}

/** Insert a `[[pageId]]` page-link at the caret. The caller (page
 *  picker) is responsible for resolving the alias. */
export function insertPagelink(
  state: EditorState,
  blockId: BlockId,
  offset: number,
  pageId: string,
  alias?: string,
): EditorState {
  const found = findBlockPath(state, blockId);
  if (!found) return state;
  const { block } = found;
  if (!('inline' in block)) return state;
  const before = sliceInline(block.inline, 0, offset);
  const after = sliceInline(block.inline, offset, Infinity);
  const link: Inline = alias
    ? { kind: 'pagelink', pageId, alias }
    : { kind: 'pagelink', pageId };
  const merged = [...before, link, ...after];
  const next = setBlockInline(state, blockId, merged);
  const advance = (alias || pageId).length;
  return {
    ...next,
    selection: { kind: 'caret', blockId, offset: offset + advance },
  };
}

/** Move a block to a new index, leaving the rest in their original
 *  relative order. Caller picks the destination by index in the
 *  *post-removal* sequence (= "drop before block at index N"). */
export function moveBlock(
  state: EditorState,
  blockId: BlockId,
  toIdx: number,
): EditorState {
  const found = findBlock(state, blockId);
  if (!found) return state;
  const blocks = state.blocks.slice();
  const [moved] = blocks.splice(found.idx, 1);
  // Clamp to valid range against the post-removal length
  const target = Math.max(0, Math.min(toIdx, blocks.length));
  blocks.splice(target, 0, moved);
  return { ...state, blocks };
}

/** Insert a fresh block AFTER the given block id. Caret moves to
 *  the start of the new block. Used by slash menu, paste, and
 *  drag-drop. */
export function insertBlockAfter(
  state: EditorState,
  afterBlockId: BlockId,
  block: Block,
): EditorState {
  const found = findBlock(state, afterBlockId);
  if (!found) {
    // Append to the end if we can't find the anchor
    return {
      blocks: [...state.blocks, block],
      selection: { kind: 'caret', blockId: block.id, offset: 0 },
    };
  }
  const next = insertBlock(state, found.idx + 1, block);
  return {
    ...next,
    selection: { kind: 'caret', blockId: block.id, offset: 0 },
  };
}

// ── Convenience constructors ──────────────────────────────

export function paragraph(text = ''): Block {
  return { id: newBlockId(), kind: 'p', inline: plainInline(text) };
}

export function heading(level: 1 | 2 | 3, text = ''): Block {
  return { id: newBlockId(), kind: ('h' + level) as 'h1' | 'h2' | 'h3', inline: plainInline(text) };
}

export function todo(text = '', checked = false): Block {
  return { id: newBlockId(), kind: 'todo', checked, inline: plainInline(text) };
}

export function codeBlock(text = '', lang = ''): Block {
  return { id: newBlockId(), kind: 'code', text, lang };
}

export function rule(): Block {
  return { id: newBlockId(), kind: 'rule' };
}

export function callout(emoji = '💡', children: Block[] = [paragraph('')]): Block {
  return { id: newBlockId(), kind: 'callout', emoji, children };
}

export function bulletList(items: Block[][] = [[paragraph('')]]): Block {
  return { id: newBlockId(), kind: 'list', ordered: false, items };
}

export function orderedList(items: Block[][] = [[paragraph('')]]): Block {
  return { id: newBlockId(), kind: 'list', ordered: true, items };
}

export function quote(children: Block[] = [paragraph('')]): Block {
  return { id: newBlockId(), kind: 'quote', children };
}

export function image(src: string, alt = ''): Block {
  return { id: newBlockId(), kind: 'image', src, alt };
}

// ── Table mutations ──────────────────────────────────────

/** Insert a row into the given table block. `at` is the row index to
 *  insert BEFORE (0 = first row); pass `rows.length` to append. */
export function tableAddRow(
  state: EditorState,
  blockId: BlockId,
  at: number,
): EditorState {
  const found = findBlock(state, blockId);
  if (!found || found.block.kind !== 'table') return state;
  const tbl = found.block;
  const cols = tbl.rows[0]?.length || 0;
  const empty: Inline[][] = [];
  for (let c = 0; c < cols; c++) empty.push([]);
  const rows = tbl.rows.slice();
  rows.splice(Math.max(0, Math.min(at, rows.length)), 0, empty);
  return replaceBlock(state, found.idx, { ...tbl, rows });
}

/** Insert a column at index `at` (insert BEFORE existing column at
 *  that index; pass current width to append). */
export function tableAddCol(
  state: EditorState,
  blockId: BlockId,
  at: number,
): EditorState {
  const found = findBlock(state, blockId);
  if (!found || found.block.kind !== 'table') return state;
  const tbl = found.block;
  const cur = tbl.rows[0]?.length || 0;
  const insertAt = Math.max(0, Math.min(at, cur));
  const rows = tbl.rows.map((r) => {
    const next = r.slice();
    next.splice(insertAt, 0, []);
    return next;
  });
  return replaceBlock(state, found.idx, { ...tbl, rows });
}

/** Remove the row at `at`. No-op when only one row remains (always
 *  keep the table structurally non-empty). */
export function tableRemoveRow(
  state: EditorState,
  blockId: BlockId,
  at: number,
): EditorState {
  const found = findBlock(state, blockId);
  if (!found || found.block.kind !== 'table') return state;
  const tbl = found.block;
  if (tbl.rows.length <= 1) return state;
  if (at < 0 || at >= tbl.rows.length) return state;
  const rows = tbl.rows.slice();
  rows.splice(at, 1);
  return replaceBlock(state, found.idx, { ...tbl, rows });
}

/** Remove the column at `at`. No-op when only one column remains. */
export function tableRemoveCol(
  state: EditorState,
  blockId: BlockId,
  at: number,
): EditorState {
  const found = findBlock(state, blockId);
  if (!found || found.block.kind !== 'table') return state;
  const tbl = found.block;
  const cur = tbl.rows[0]?.length || 0;
  if (cur <= 1 || at < 0 || at >= cur) return state;
  const rows = tbl.rows.map((r) => {
    const next = r.slice();
    next.splice(at, 1);
    return next;
  });
  return replaceBlock(state, found.idx, { ...tbl, rows });
}

/** Update one cell's inline content. */
export function tableSetCell(
  state: EditorState,
  blockId: BlockId,
  rowIdx: number,
  colIdx: number,
  inline: Inline[],
): EditorState {
  const found = findBlock(state, blockId);
  if (!found || found.block.kind !== 'table') return state;
  const tbl = found.block;
  if (rowIdx < 0 || rowIdx >= tbl.rows.length) return state;
  const row = tbl.rows[rowIdx];
  if (colIdx < 0 || colIdx >= row.length) return state;
  const newRow = row.slice();
  newRow[colIdx] = inline;
  const rows = tbl.rows.slice();
  rows[rowIdx] = newRow;
  return replaceBlock(state, found.idx, { ...tbl, rows });
}

/** Construct a fresh empty table (default 2 rows × 3 cols). */
export function emptyTable(rows = 2, cols = 3): Block {
  const grid: Inline[][][] = [];
  for (let r = 0; r < rows; r++) {
    const row: Inline[][] = [];
    for (let c = 0; c < cols; c++) row.push([]);
    grid.push(row);
  }
  return { id: newBlockId(), kind: 'table', hrow: true, hcol: false, rows: grid };
}

/** Linked-DB embed pointing at the given DB page id. */
export function linkedDb(dbId: string): Block {
  return { id: newBlockId(), kind: 'linkdb', dbId, view: 'table', filter: '', sort: '' };
}
