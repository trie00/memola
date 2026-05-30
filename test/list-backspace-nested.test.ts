// Backspace at the start of a nested list item → outdent one level.
// Regression: nested bullet items couldn't be deleted (the top-level
// merge/remove paths never saw them). The fix reuses outdentListItem,
// which is a no-op for top-level items.

import { describe, it, expect } from 'vitest';
import { outdentListItem, type EditorState } from '../src/ui/editor2/editor-state';
import type { Block, Inline } from '../src/lib/blocks';

const txt = (t: string): Inline[] => [{ kind: 'text', text: t }];
const para = (id: string, t: string): Block => ({ id, kind: 'p', inline: txt(t) } as Block);
const st = (b: Block): EditorState => ({ blocks: [b], selection: null } as unknown as EditorState);

describe('Backspace-outdent on a nested list item', () => {
  it('lifts a nested sub-item up to the parent list', () => {
    const list = {
      id: 'L', kind: 'list', ordered: false,
      items: [[para('a', '親'), {
        id: 'L2', kind: 'list', ordered: false, items: [[para('sub', '子')]],
      } as Block]],
    } as Block;
    const out = outdentListItem(st(list), 'sub');
    const root = out.blocks[0] as Block & { items: Block[][] };
    // 親 stays as item 0 (nested list removed), 子 becomes a top-level sibling.
    expect(root.items.map((it) => it[0].id)).toEqual(['a', 'sub']);
    expect(root.items[0].length).toBe(1);          // 親 no longer carries a nested list
  });

  it('is a no-op for a top-level item (handled by merge/remove instead)', () => {
    const list = {
      id: 'L', kind: 'list', ordered: false,
      items: [[para('a', 'A')], [para('b', 'B')]],
    } as Block;
    const s = st(list);
    expect(outdentListItem(s, 'b')).toBe(s);       // unchanged → falls through
  });
});
