// scanBlocks tests — the block-tree backlink scanner (replaces the old
// markdown-serialise + regex approach). Verifies exact pagelink counting
// across nesting, tables, and inline formatting, plus snippet extraction.

import { describe, it, expect } from 'vitest';
import { scanBlocks } from '../src/api/backlinks';
import type { Block } from '../src/lib/blocks';

const p = (id: string, ...inline: any[]): Block =>
  ({ id, kind: 'p', inline } as Block);
const txt = (text: string) => ({ kind: 'text', text });
const link = (pageId: string, alias?: string) =>
  ({ kind: 'pagelink', pageId, ...(alias ? { alias } : {}) });

describe('scanBlocks', () => {
  it('counts a direct pagelink in a paragraph', () => {
    const r = scanBlocks([p('b1', txt('see '), link('42'), txt(' here'))], '42');
    expect(r.count).toBe(1);
    expect(r.snippet).toContain('see');
  });

  it('returns 0 when no link targets the id', () => {
    const r = scanBlocks([p('b1', txt('hello'), link('99'))], '42');
    expect(r.count).toBe(0);
    expect(r.snippet).toBe('');
  });

  it('coalesces multiple links to the same target into a count', () => {
    const r = scanBlocks([
      p('b1', link('42'), txt(' and '), link('42')),
      p('b2', link('42')),
    ], '42');
    expect(r.count).toBe(3);
  });

  it('finds links nested inside callout / quote / list', () => {
    const blocks: Block[] = [
      { id: 'c1', kind: 'callout', emoji: '💡', children: [p('c1p', link('42'))] } as Block,
      { id: 'q1', kind: 'quote', children: [p('q1p', link('42'))] } as Block,
      { id: 'l1', kind: 'list', ordered: false, items: [[p('li', link('42'))]] } as Block,
    ];
    expect(scanBlocks(blocks, '42').count).toBe(3);
  });

  it('finds links inside table cells', () => {
    const table: Block = {
      id: 't1', kind: 'table', hrow: false, hcol: false,
      rows: [[[txt('x')], [link('42')]], [[link('42')], []]],
    } as Block;
    expect(scanBlocks([table], '42').count).toBe(2);
  });

  it('finds links wrapped in inline formatting', () => {
    const bold = { kind: 'bold', children: [link('42')] };
    expect(scanBlocks([p('b1', bold as any)], '42').count).toBe(1);
  });

  it('does NOT match literal [[id]] text in a code block', () => {
    const code: Block = { id: 'cb', kind: 'code', lang: '', text: 'link: [[42]]' } as Block;
    expect(scanBlocks([code], '42').count).toBe(0);
  });

  it('snippet comes from the first block containing a link and is one line', () => {
    const r = scanBlocks([
      p('b1', txt('intro with no link')),
      p('b2', txt('the  context\nline '), link('42', 'Target')),
    ], '42');
    // Whitespace collapsed, link rendered as its alias.
    expect(r.snippet).toBe('the context line Target');
  });
});
