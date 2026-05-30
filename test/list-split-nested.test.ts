// splitBlock inside a NESTED list item (Enter creates a new sub-item).
// Regression: previously splitBlock only scanned top-level lists, so Enter
// in a sub-list item was a no-op.

import { describe, it, expect } from 'vitest';
import { splitBlock, type EditorState } from '../src/ui/editor2/editor-state';
import type { Block, Inline } from '../src/lib/blocks';

const txt = (t: string): Inline[] => [{ kind: 'text', text: t }];
const para = (id: string, t: string): Block => ({ id, kind: 'p', inline: txt(t) } as Block);

/** Outer bullet list: item A = [para 'A', nested list[ item 'sub' ]]. */
function nestedList(): Block {
  return {
    id: 'L', kind: 'list', ordered: false,
    items: [
      [para('a', 'A'), {
        id: 'L2', kind: 'list', ordered: false,
        items: [[para('sub', 'subitem')]],
      } as Block],
    ],
  } as Block;
}
const st = (b: Block): EditorState => ({ blocks: [b], selection: null } as unknown as EditorState);

describe('splitBlock in a nested list item', () => {
  it('Enter at end of a sub-item creates a new sub-item in the inner list', () => {
    const out = splitBlock(st(nestedList()), 'sub', 'subitem'.length);
    const outerList = out.blocks[0] as Block & { items: Block[][] };
    // Outer list still has 1 item (the nesting parent).
    expect(outerList.items.length).toBe(1);
    const innerList = outerList.items[0][1] as Block & { kind: string; items: Block[][] };
    expect(innerList.kind).toBe('list');
    // Inner list now has 2 items: the original + a fresh empty one.
    expect(innerList.items.length).toBe(2);
    expect((innerList.items[0][0] as { inline: { text: string }[] }).inline[0].text).toBe('subitem');
    expect((innerList.items[1][0] as { inline: unknown[] }).inline.length).toBe(0);
    // Caret moved to the new (second) sub-item.
    expect(out.selection?.kind).toBe('caret');
    const newId = (innerList.items[1][0] as Block).id;
    expect(out.selection && 'blockId' in out.selection ? out.selection.blockId : null).toBe(newId);
  });

  it('splits mid-text in a sub-item (before/after halves)', () => {
    const out = splitBlock(st(nestedList()), 'sub', 3);   // "sub|item"
    const innerList = (out.blocks[0] as Block & { items: Block[][] }).items[0][1] as Block & { items: Block[][] };
    expect((innerList.items[0][0] as { inline: { text: string }[] }).inline[0].text).toBe('sub');
    expect((innerList.items[1][0] as { inline: { text: string }[] }).inline[0].text).toBe('item');
  });
});
