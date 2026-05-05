// Tests for editor2's pure state mutations.

import { describe, it, expect, beforeEach } from 'vitest';
import {
  insertText, deleteRange, splitBlock, mergeWithPrev, changeBlockKind,
  toggleTodo, sliceInline, paragraph,
  applyInlineFormat as applyInlineFormatTest,
  insertPagelink as insertPagelinkTest,
  insertBlockAfter as insertBlockAfterTest,
  moveBlock,
  tableAddRow, tableAddCol, tableRemoveRow, tableRemoveCol, tableSetCell,
  emptyTable, image,
  type EditorState,
} from '../src/ui/editor2/editor-state';
import {
  _resetBlockIdsForTesting, plainInline, type Block, type Inline,
} from '../src/lib/blocks';

beforeEach(() => _resetBlockIdsForTesting());

const txt = (s: string): Inline => ({ kind: 'text', text: s });

const state = (blocks: Block[]): EditorState => ({ blocks, selection: null });

describe('insertText', () => {
  it('inserts at offset 0', () => {
    const p = paragraph('world');
    const next = insertText(state([p]), p.id, 0, 'hello ');
    expect((next.blocks[0] as { inline: Inline[] }).inline).toEqual([txt('hello world')]);
    expect(next.selection).toEqual({ kind: 'caret', blockId: p.id, offset: 6 });
  });

  it('inserts in the middle', () => {
    const p = paragraph('helo');
    const next = insertText(state([p]), p.id, 2, 'l');
    expect((next.blocks[0] as { inline: Inline[] }).inline).toEqual([txt('hello')]);
    expect(next.selection).toEqual({ kind: 'caret', blockId: p.id, offset: 3 });
  });

  it('inserts at the end', () => {
    const p = paragraph('hi');
    const next = insertText(state([p]), p.id, 2, '!');
    expect((next.blocks[0] as { inline: Inline[] }).inline).toEqual([txt('hi!')]);
  });

  it('preserves bold formatting around inserted text', () => {
    const p: Block = {
      id: 'b1', kind: 'p',
      inline: [
        txt('a '),
        { kind: 'bold', children: [txt('bold')] },
        txt(' c'),
      ],
    };
    // Insert "X" at offset 6 (= just after 'bold')
    const next = insertText(state([p]), 'b1', 6, 'X');
    const inline = (next.blocks[0] as { inline: Inline[] }).inline;
    // Expect: 'a ' + bold('bold') + 'X c'
    expect(inline.length).toBe(3);
    expect(inline[1]).toEqual({ kind: 'bold', children: [txt('bold')] });
  });

  it('no-op for empty text', () => {
    const p = paragraph('hi');
    const next = insertText(state([p]), p.id, 1, '');
    expect(next).toEqual(state([p]));
  });
});

describe('deleteRange', () => {
  it('deletes forward (positive count)', () => {
    const p = paragraph('hello');
    const next = deleteRange(state([p]), p.id, 1, 3);
    expect((next.blocks[0] as { inline: Inline[] }).inline).toEqual([txt('ho')]);
  });

  it('deletes backward (Backspace, negative count)', () => {
    const p = paragraph('hello');
    const next = deleteRange(state([p]), p.id, 5, -1);
    expect((next.blocks[0] as { inline: Inline[] }).inline).toEqual([txt('hell')]);
    expect(next.selection).toEqual({ kind: 'caret', blockId: p.id, offset: 4 });
  });

  it('no-op for count=0', () => {
    const p = paragraph('hi');
    expect(deleteRange(state([p]), p.id, 1, 0)).toEqual(state([p]));
  });
});

describe('splitBlock', () => {
  it('splits a paragraph at the middle', () => {
    const p = paragraph('helloworld');
    const next = splitBlock(state([p]), p.id, 5);
    expect(next.blocks).toHaveLength(2);
    expect((next.blocks[0] as { inline: Inline[] }).inline).toEqual([txt('hello')]);
    expect((next.blocks[1] as { inline: Inline[] }).inline).toEqual([txt('world')]);
    // Caret moves to start of new block
    expect(next.selection?.kind).toBe('caret');
    if (next.selection?.kind === 'caret') {
      expect(next.selection.blockId).toBe(next.blocks[1].id);
      expect(next.selection.offset).toBe(0);
    }
  });

  it('splits at offset 0 leaves first block empty', () => {
    const p = paragraph('hello');
    const next = splitBlock(state([p]), p.id, 0);
    expect((next.blocks[0] as { inline: Inline[] }).inline).toEqual([]);
    expect((next.blocks[1] as { inline: Inline[] }).inline).toEqual([txt('hello')]);
  });

  it('splits at end produces an empty new block', () => {
    const p = paragraph('hello');
    const next = splitBlock(state([p]), p.id, 5);
    expect((next.blocks[0] as { inline: Inline[] }).inline).toEqual([txt('hello')]);
    expect((next.blocks[1] as { inline: Inline[] }).inline).toEqual([]);
  });
});

describe('mergeWithPrev', () => {
  it('joins second paragraph onto first', () => {
    const a = paragraph('hello');
    const b = paragraph(' world');
    const next = mergeWithPrev(state([a, b]), b.id);
    expect(next.blocks).toHaveLength(1);
    expect((next.blocks[0] as { inline: Inline[] }).inline).toEqual([txt('hello world')]);
    expect(next.selection?.kind).toBe('caret');
    if (next.selection?.kind === 'caret') {
      expect(next.selection.blockId).toBe(a.id);
      expect(next.selection.offset).toBe(5);
    }
  });

  it('no-op for the first block', () => {
    const a = paragraph('hello');
    const next = mergeWithPrev(state([a]), a.id);
    expect(next).toEqual(state([a]));
  });
});

describe('changeBlockKind', () => {
  it('paragraph → heading', () => {
    const p = paragraph('Title');
    const next = changeBlockKind(state([p]), p.id, 'h1');
    expect(next.blocks[0].kind).toBe('h1');
    expect(next.blocks[0].id).toBe(p.id);     // id preserved
  });

  it('paragraph → todo (initially unchecked)', () => {
    const p = paragraph('do it');
    const next = changeBlockKind(state([p]), p.id, 'todo');
    expect(next.blocks[0].kind).toBe('todo');
    if (next.blocks[0].kind === 'todo') expect(next.blocks[0].checked).toBe(false);
  });
});

describe('toggleTodo', () => {
  it('flips checked', () => {
    const t: Block = { id: 't1', kind: 'todo', checked: false, inline: plainInline('do') };
    const next = toggleTodo(state([t]), 't1');
    if (next.blocks[0].kind === 'todo') expect(next.blocks[0].checked).toBe(true);
    const back = toggleTodo(next, 't1');
    if (back.blocks[0].kind === 'todo') expect(back.blocks[0].checked).toBe(false);
  });

  it('no-op for non-todo', () => {
    const p = paragraph('x');
    const next = toggleTodo(state([p]), p.id);
    expect(next).toEqual(state([p]));
  });
});

describe('applyInlineFormat', () => {
  it('wraps a range with bold', () => {
    const p = paragraph('hello world');
    const next = applyInlineFormatTest(state([p]), p.id, 0, 5, 'bold');
    const inline = (next.blocks[0] as { inline: Inline[] }).inline;
    expect(inline).toEqual([
      { kind: 'bold', children: [txt('hello')] },
      txt(' world'),
    ]);
  });

  it('toggles off when range is already entirely bold', () => {
    const p: Block = {
      id: 'b1', kind: 'p',
      inline: [
        { kind: 'bold', children: [txt('hello')] },
        txt(' world'),
      ],
    };
    const next = applyInlineFormatTest(state([p]), 'b1', 0, 5, 'bold');
    const inline = (next.blocks[0] as { inline: Inline[] }).inline;
    expect(inline).toEqual([txt('hello world')]);
  });

  it('inline code wraps as a leaf node', () => {
    const p = paragraph('x = 1');
    const next = applyInlineFormatTest(state([p]), p.id, 0, 5, 'code');
    const inline = (next.blocks[0] as { inline: Inline[] }).inline;
    expect(inline).toEqual([{ kind: 'code', text: 'x = 1' }]);
  });

  it('range from > to is a no-op', () => {
    const p = paragraph('hi');
    const next = applyInlineFormatTest(state([p]), p.id, 2, 0, 'bold');
    expect(next).toEqual(state([p]));
  });
});

describe('insertPagelink', () => {
  it('inserts a page-link at the caret', () => {
    const p = paragraph('see ');
    const next = insertPagelinkTest(state([p]), p.id, 4, '42', 'My Page');
    const inline = (next.blocks[0] as { inline: Inline[] }).inline;
    expect(inline).toEqual([
      txt('see '),
      { kind: 'pagelink', pageId: '42', alias: 'My Page' },
    ]);
    // Caret advances past the alias
    expect(next.selection).toEqual({ kind: 'caret', blockId: p.id, offset: 4 + 'My Page'.length });
  });

  it('inserts without alias', () => {
    const p = paragraph('hi');
    const next = insertPagelinkTest(state([p]), p.id, 2, '7');
    const inline = (next.blocks[0] as { inline: Inline[] }).inline;
    expect(inline).toEqual([
      txt('hi'),
      { kind: 'pagelink', pageId: '7' },
    ]);
  });
});

describe('insertBlockAfter', () => {
  it('inserts a fresh block after the anchor', () => {
    const a = paragraph('a');
    const b = paragraph('b');
    const fresh = paragraph('NEW');
    const next = insertBlockAfterTest(state([a, b]), a.id, fresh);
    expect(next.blocks.map((bb) => bb.id)).toEqual([a.id, fresh.id, b.id]);
    expect(next.selection).toEqual({ kind: 'caret', blockId: fresh.id, offset: 0 });
  });

  it('appends to the end when anchor not found', () => {
    const a = paragraph('a');
    const fresh = paragraph('NEW');
    const next = insertBlockAfterTest(state([a]), 'unknown', fresh);
    expect(next.blocks.map((bb) => bb.id)).toEqual([a.id, fresh.id]);
  });
});

describe('moveBlock', () => {
  it('moves a block to an earlier position', () => {
    const a = paragraph('a');
    const b = paragraph('b');
    const c = paragraph('c');
    const next = moveBlock(state([a, b, c]), c.id, 0);
    expect(next.blocks.map((bb) => bb.id)).toEqual([c.id, a.id, b.id]);
  });

  it('moves a block to a later position', () => {
    const a = paragraph('a');
    const b = paragraph('b');
    const c = paragraph('c');
    const next = moveBlock(state([a, b, c]), a.id, 2);
    expect(next.blocks.map((bb) => bb.id)).toEqual([b.id, c.id, a.id]);
  });

  it('clamps to valid range', () => {
    const a = paragraph('a');
    const b = paragraph('b');
    const next = moveBlock(state([a, b]), a.id, 999);
    expect(next.blocks.map((bb) => bb.id)).toEqual([b.id, a.id]);
  });

  it('no-op for unknown id', () => {
    const a = paragraph('a');
    const s = state([a]);
    expect(moveBlock(s, 'nope', 0)).toBe(s);
  });
});

describe('table mutations', () => {
  it('emptyTable creates a table with rows × cols empty cells', () => {
    const t = emptyTable(3, 4);
    expect(t.kind).toBe('table');
    if (t.kind === 'table') {
      expect(t.rows).toHaveLength(3);
      expect(t.rows[0]).toHaveLength(4);
      expect(t.rows[0][0]).toEqual([]);
    }
  });

  it('tableAddRow inserts at the given index', () => {
    const t = emptyTable(2, 2);
    const next = tableAddRow(state([t]), t.id, 1);
    const tbl = next.blocks[0];
    if (tbl.kind === 'table') {
      expect(tbl.rows).toHaveLength(3);
    }
  });

  it('tableAddCol inserts at the given index across all rows', () => {
    const t = emptyTable(2, 2);
    const next = tableAddCol(state([t]), t.id, 1);
    const tbl = next.blocks[0];
    if (tbl.kind === 'table') {
      expect(tbl.rows[0]).toHaveLength(3);
      expect(tbl.rows[1]).toHaveLength(3);
    }
  });

  it('tableRemoveRow drops the row', () => {
    const t = emptyTable(3, 2);
    const next = tableRemoveRow(state([t]), t.id, 1);
    const tbl = next.blocks[0];
    if (tbl.kind === 'table') expect(tbl.rows).toHaveLength(2);
  });

  it('tableRemoveRow no-op when only one row', () => {
    const t = emptyTable(1, 2);
    const next = tableRemoveRow(state([t]), t.id, 0);
    const tbl = next.blocks[0];
    if (tbl.kind === 'table') expect(tbl.rows).toHaveLength(1);
  });

  it('tableRemoveCol drops the column', () => {
    const t = emptyTable(2, 3);
    const next = tableRemoveCol(state([t]), t.id, 1);
    const tbl = next.blocks[0];
    if (tbl.kind === 'table') {
      expect(tbl.rows[0]).toHaveLength(2);
    }
  });

  it('tableSetCell updates one cell', () => {
    const t = emptyTable(2, 2);
    const next = tableSetCell(state([t]), t.id, 0, 1, [{ kind: 'text', text: 'hi' }]);
    const tbl = next.blocks[0];
    if (tbl.kind === 'table') {
      expect(tbl.rows[0][1]).toEqual([{ kind: 'text', text: 'hi' }]);
    }
  });
});

describe('image block', () => {
  it('image() constructs an ImageBlock', () => {
    const i = image('https://x.example/p.png', 'alt');
    expect(i.kind).toBe('image');
    if (i.kind === 'image') {
      expect(i.src).toBe('https://x.example/p.png');
      expect(i.alt).toBe('alt');
    }
  });
});

describe('sliceInline', () => {
  it('slices plain text', () => {
    expect(sliceInline([txt('hello')], 1, 4)).toEqual([txt('ell')]);
  });

  it('preserves bold node entirely inside the range', () => {
    const inline: Inline[] = [
      txt('a '),
      { kind: 'bold', children: [txt('b')] },
      txt(' c'),
    ];
    // Slice [2..3] is exactly the bold node
    expect(sliceInline(inline, 2, 3)).toEqual([
      { kind: 'bold', children: [txt('b')] },
    ]);
  });

  it('partial slice into bold returns sliced bold', () => {
    const inline: Inline[] = [
      { kind: 'bold', children: [txt('hello')] },
    ];
    expect(sliceInline(inline, 1, 4)).toEqual([
      { kind: 'bold', children: [txt('ell')] },
    ]);
  });

  it('drops a hard break that\'s only partially covered', () => {
    expect(sliceInline([{ kind: 'br' }], 0, 0)).toEqual([]);
  });

  it('merges adjacent text after slicing', () => {
    const inline: Inline[] = [txt('a'), txt('b'), txt('c')];
    // Manually constructed but should coalesce to single text
    expect(sliceInline(inline, 0, 3)).toEqual([txt('abc')]);
  });
});
