// List indent / outdent (Tab / Shift+Tab) — nesting a list item under its
// previous sibling and lifting it back out. Nested lists are `list` blocks
// inside an item's Block[].

import { describe, it, expect } from 'vitest';
import {
  indentListItem, outdentListItem, bulletList, paragraph,
  type EditorState,
} from '../src/ui/editor2/editor-state';
import type { Block } from '../src/lib/blocks';

const para = (id: string, text: string): Block =>
  ({ id, kind: 'p', inline: text ? [{ kind: 'text', text }] : [] } as Block);

/** Build a flat bullet list of paragraphs, one block per item. */
function listOf(...ps: Block[]): Block {
  const b = bulletList(ps.map((p) => [p])) as Block & { id: string };
  return b;
}

function stateWith(block: Block): EditorState {
  return { blocks: [block], selection: null } as unknown as EditorState;
}

describe('indentListItem', () => {
  it('nests item 2 under item 1 as a sub-list', () => {
    const list = listOf(para('a', 'A'), para('b', 'B')) as Block & { items: Block[][] };
    const out = indentListItem(stateWith(list), 'b');
    const root = out.blocks[0] as Block & { items: Block[][] };
    expect(root.items.length).toBe(1);                 // only item A remains at top
    // item A now has its paragraph + a nested list holding B
    const itemA = root.items[0];
    expect(itemA[0].id).toBe('a');
    const nested = itemA[1] as Block & { kind: string; items: Block[][] };
    expect(nested.kind).toBe('list');
    expect(nested.items[0][0].id).toBe('b');
  });

  it('appends to an existing nested list rather than making a new one', () => {
    // A has a nested list [B]; indenting C should append C to that nested list.
    const list = listOf(para('a', 'A'), para('c', 'C')) as Block & { items: Block[][] };
    const indented1 = indentListItem(stateWith(list), 'c');
    // Now top has just A (with nested [C]). Add another sibling D then indent it.
    const root1 = indented1.blocks[0] as Block & { items: Block[][] };
    root1.items.push([para('d', 'D')]);
    const indented2 = indentListItem({ ...indented1, blocks: [root1] } as EditorState, 'd');
    const root2 = indented2.blocks[0] as Block & { items: Block[][] };
    const nested = root2.items[0][1] as Block & { items: Block[][] };
    expect(nested.kind).toBe('list');
    expect(nested.items.map((i) => i[0].id)).toEqual(['c', 'd']);
  });

  it('is a no-op for the first item (nothing to nest under)', () => {
    const list = listOf(para('a', 'A'), para('b', 'B'));
    const st = stateWith(list);
    expect(indentListItem(st, 'a')).toBe(st);          // unchanged reference
  });

  it('is a no-op when the caret block is not in a list', () => {
    const st = stateWith(para('x', 'plain'));
    expect(indentListItem(st, 'x')).toBe(st);
  });
});

describe('outdentListItem', () => {
  it('lifts a nested sub-item back to the parent list after its parent', () => {
    const list = listOf(para('a', 'A'), para('b', 'B'));
    const indented = indentListItem(stateWith(list), 'b');   // B nested under A
    const out = outdentListItem(indented, 'b');
    const root = out.blocks[0] as Block & { items: Block[][] };
    // B is a top-level sibling again, right after A; nested list removed.
    expect(root.items.map((i) => i[0].id)).toEqual(['a', 'b']);
    expect(root.items[0].length).toBe(1);              // A no longer has a nested list
  });

  it('is a no-op for a top-level item (nothing to outdent)', () => {
    const list = listOf(para('a', 'A'), para('b', 'B'));
    const st = stateWith(list);
    expect(outdentListItem(st, 'b')).toBe(st);
  });
});
