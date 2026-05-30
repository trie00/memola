// Table row/column reordering (tableMoveRow / tableMoveCol) — the
// feature-parity gap vs 別アプリ's note-editor table.

import { describe, it, expect } from 'vitest';
import {
  tableMoveRow, tableMoveCol, emptyTable, type EditorState,
} from '../src/ui/editor2/editor-state';
import type { Block, Inline } from '../src/lib/blocks';

const txt = (t: string): Inline[] => [{ kind: 'text', text: t }];

/** 2×2 table with labelled cells r{row}c{col}. */
function grid(): Block {
  const t = emptyTable(2, 2) as Block & { rows: Inline[][][]; colWidths?: number[] };
  t.rows = [
    [txt('r0c0'), txt('r0c1')],
    [txt('r1c0'), txt('r1c1')],
  ];
  t.colWidths = [100, 200];
  return t;
}
const st = (b: Block): EditorState => ({ blocks: [b], selection: null } as unknown as EditorState);
const cell = (b: Block, r: number, c: number): string =>
  ((b as unknown as { rows: Inline[][][] }).rows[r][c][0] as { text: string }).text;

describe('tableMoveRow', () => {
  it('moves a row down', () => {
    const s = st(grid());
    const out = tableMoveRow(s, s.blocks[0].id, 0, +1);
    const tbl = out.blocks[0];
    expect([cell(tbl, 0, 0), cell(tbl, 1, 0)]).toEqual(['r1c0', 'r0c0']);
  });
  it('is a no-op past the edges', () => {
    const s = st(grid());
    expect(tableMoveRow(s, s.blocks[0].id, 0, -1)).toBe(s);   // already top
    expect(tableMoveRow(s, s.blocks[0].id, 1, +1)).toBe(s);   // already bottom
  });
});

describe('tableMoveCol', () => {
  it('moves a column right and carries its width', () => {
    const s = st(grid());
    const out = tableMoveCol(s, s.blocks[0].id, 0, +1);
    const tbl = out.blocks[0] as Block & { colWidths: number[] };
    expect([cell(tbl, 0, 0), cell(tbl, 0, 1)]).toEqual(['r0c1', 'r0c0']);
    expect(cell(tbl, 1, 0)).toBe('r1c1');
    expect(tbl.colWidths).toEqual([200, 100]);               // width followed the column
  });
  it('is a no-op past the edges', () => {
    const s = st(grid());
    expect(tableMoveCol(s, s.blocks[0].id, 0, -1)).toBe(s);
    expect(tableMoveCol(s, s.blocks[0].id, 1, +1)).toBe(s);
  });
});
