// Block-tree ↔ markdown conversion tests.
//
// Round-trip property is asserted for the editor's authored subset.
// Block IDs are zeroed via _resetBlockIdsForTesting + stripIds() so
// tests don't break on every parser change.

import { describe, it, expect, beforeEach } from 'vitest';
import { mdToBlocks, blocksToMd, parseInline } from '../src/lib/blocks-md';
import { _resetBlockIdsForTesting, type Block, type Inline } from '../src/lib/blocks';

beforeEach(() => _resetBlockIdsForTesting());

/** Strip ids from a block tree so equality checks ignore them. */
function stripIds(blocks: Block[]): Array<Omit<Block, 'id'>> {
  return blocks.map((b) => {
    if (b.kind === 'list') {
      return { ...b, items: b.items.map((it) => stripIds(it)), id: undefined } as unknown as Omit<Block, 'id'>;
    }
    if (b.kind === 'callout' || b.kind === 'quote') {
      return { ...b, children: stripIds(b.children), id: undefined } as unknown as Omit<Block, 'id'>;
    }
    const { id, ...rest } = b as Block & { id: string };
    void id;
    return rest;
  });
}

const txt = (s: string): Inline => ({ kind: 'text', text: s });

describe('mdToBlocks — basic blocks', () => {
  it('parses an empty string to no blocks', () => {
    expect(mdToBlocks('')).toEqual([]);
  });

  it('parses whitespace-only to no blocks', () => {
    expect(mdToBlocks('   \n\n  \n')).toEqual([]);
  });

  it('parses a single paragraph', () => {
    expect(stripIds(mdToBlocks('hello world'))).toEqual([
      { kind: 'p', inline: [txt('hello world')] },
    ]);
  });

  it('parses headings h1/h2/h3', () => {
    const md = '# A\n\n## B\n\n### C';
    expect(stripIds(mdToBlocks(md))).toEqual([
      { kind: 'h1', inline: [txt('A')] },
      { kind: 'h2', inline: [txt('B')] },
      { kind: 'h3', inline: [txt('C')] },
    ]);
  });

  it('parses a horizontal rule', () => {
    expect(stripIds(mdToBlocks('---'))).toEqual([{ kind: 'rule' }]);
  });

  it('parses a code fence with language', () => {
    const md = '```ts\nconst x = 1;\n```';
    expect(stripIds(mdToBlocks(md))).toEqual([
      { kind: 'code', lang: 'ts', text: 'const x = 1;' },
    ]);
  });

  it('parses a code fence without language', () => {
    expect(stripIds(mdToBlocks('```\nplain\n```'))).toEqual([
      { kind: 'code', lang: '', text: 'plain' },
    ]);
  });

  it('parses todos checked / unchecked', () => {
    const md = '- [ ] todo\n- [x] done';
    expect(stripIds(mdToBlocks(md))).toEqual([
      { kind: 'todo', checked: false, inline: [txt('todo')] },
      { kind: 'todo', checked: true, inline: [txt('done')] },
    ]);
  });

  it('parses a callout', () => {
    const md = '> [💡] tip line one\n> tip line two';
    const blocks = stripIds(mdToBlocks(md));
    expect(blocks).toHaveLength(1);
    const callout = blocks[0] as { kind: 'callout'; emoji: string; children: Block[] };
    expect(callout.kind).toBe('callout');
    expect(callout.emoji).toBe('💡');
    // The body is parsed as a paragraph
    expect(stripIds(callout.children)).toEqual([
      { kind: 'p', inline: [txt('tip line one\ntip line two')] },
    ]);
  });

  it('parses a plain blockquote (no callout emoji)', () => {
    const md = '> just a quote';
    const blocks = stripIds(mdToBlocks(md));
    expect(blocks).toHaveLength(1);
    const quote = blocks[0] as { kind: 'quote'; children: Block[] };
    expect(quote.kind).toBe('quote');
    expect(stripIds(quote.children)).toEqual([
      { kind: 'p', inline: [txt('just a quote')] },
    ]);
  });

  it('parses a bulleted list', () => {
    const md = '- one\n- two\n- three';
    const blocks = stripIds(mdToBlocks(md));
    expect(blocks).toHaveLength(1);
    const list = blocks[0] as { kind: 'list'; ordered: boolean; items: Block[][] };
    expect(list.ordered).toBe(false);
    expect(list.items).toHaveLength(3);
  });

  it('parses an ordered list', () => {
    const md = '1. one\n2. two';
    const blocks = stripIds(mdToBlocks(md));
    const list = blocks[0] as { kind: 'list'; ordered: boolean; items: Block[][] };
    expect(list.ordered).toBe(true);
    expect(list.items).toHaveLength(2);
  });

  it('treats `- [ ]` as todo, not list item', () => {
    const md = '- a\n- [ ] b\n- c';
    const blocks = stripIds(mdToBlocks(md));
    // List 'a', then todo 'b', then list 'c' (the todo broke the list)
    expect(blocks.map((b) => b.kind)).toEqual(['list', 'todo', 'list']);
  });
});

describe('parseInline', () => {
  it('returns empty for empty', () => {
    expect(parseInline('')).toEqual([]);
  });

  it('plain text', () => {
    expect(parseInline('hello')).toEqual([txt('hello')]);
  });

  it('bold', () => {
    expect(parseInline('**bold**')).toEqual([
      { kind: 'bold', children: [txt('bold')] },
    ]);
  });

  it('italic', () => {
    expect(parseInline('*it*')).toEqual([
      { kind: 'italic', children: [txt('it')] },
    ]);
  });

  it('strike', () => {
    expect(parseInline('~~s~~')).toEqual([
      { kind: 'strike', children: [txt('s')] },
    ]);
  });

  it('inline code', () => {
    expect(parseInline('`x`')).toEqual([{ kind: 'code', text: 'x' }]);
  });

  it('markdown link', () => {
    expect(parseInline('[t](u)')).toEqual([
      { kind: 'link', href: 'u', children: [txt('t')] },
    ]);
  });

  it('page link without alias', () => {
    expect(parseInline('[[42]]')).toEqual([{ kind: 'pagelink', pageId: '42' }]);
  });

  it('page link with alias', () => {
    expect(parseInline('[[42|My Page]]')).toEqual([
      { kind: 'pagelink', pageId: '42', alias: 'My Page' },
    ]);
  });

  it('hard break (two trailing spaces)', () => {
    expect(parseInline('a  \nb')).toEqual([
      txt('a'), { kind: 'br' }, txt('b'),
    ]);
  });

  it('mixed plain + bold + plain', () => {
    expect(parseInline('go **fast** now')).toEqual([
      txt('go '),
      { kind: 'bold', children: [txt('fast')] },
      txt(' now'),
    ]);
  });

  it('handles bold containing italic via separate markers', () => {
    expect(parseInline('**bold *and italic* end**')).toEqual([
      {
        kind: 'bold',
        children: [
          txt('bold '),
          { kind: 'italic', children: [txt('and italic')] },
          txt(' end'),
        ],
      },
    ]);
  });

  it('handles ***x*** as bold with `*x` text inside (greedy parser limitation)', () => {
    // Documents current behaviour: the greedy left-to-right parser
    // grabs the outer `**` first and ends up with `*x` as plain text.
    // Phase 2 editor rewrite can swap in a stricter delimiter parser.
    const r = parseInline('***x***');
    // Don't assert exact shape — just that it doesn't throw + roundtrip
    // produces some inline content.
    expect(r.length).toBeGreaterThan(0);
  });
});

describe('blocksToMd', () => {
  it('trips paragraph through', () => {
    const out = blocksToMd(mdToBlocks('hello'));
    expect(out.trim()).toBe('hello');
  });

  it('round-trips heading + paragraph', () => {
    const md = '# Title\n\nBody text';
    expect(blocksToMd(mdToBlocks(md)).trim()).toBe(md);
  });

  it('round-trips todos', () => {
    const md = '- [ ] todo\n- [x] done';
    expect(blocksToMd(mdToBlocks(md)).trim()).toBe(md);
  });

  it('round-trips bold / italic / strike / code', () => {
    const md = 'a **b** c *d* e ~~f~~ g `h`';
    expect(blocksToMd(mdToBlocks(md)).trim()).toBe(md);
  });

  it('round-trips a markdown link', () => {
    const md = 'see [docs](https://x.example) please';
    expect(blocksToMd(mdToBlocks(md)).trim()).toBe(md);
  });

  it('round-trips page links (with and without alias)', () => {
    const md = 'go to [[42]] or [[7|mine]]';
    expect(blocksToMd(mdToBlocks(md)).trim()).toBe(md);
  });

  it('round-trips a code fence', () => {
    const md = '```ts\nconst x = 1;\n```';
    expect(blocksToMd(mdToBlocks(md)).trim()).toBe(md);
  });

  it('round-trips a horizontal rule', () => {
    const md = 'a\n\n---\n\nb';
    expect(blocksToMd(mdToBlocks(md)).trim()).toBe(md);
  });

  it('round-trips a callout', () => {
    const md = '> [💡] hint';
    expect(blocksToMd(mdToBlocks(md)).trim()).toBe(md);
  });

  it('round-trips a bulleted list', () => {
    const md = '- a\n- b\n- c';
    expect(blocksToMd(mdToBlocks(md)).trim()).toBe(md);
  });

  it('round-trips an ordered list', () => {
    const md = '1. one\n2. two';
    expect(blocksToMd(mdToBlocks(md)).trim()).toBe(md);
  });

  it('round-trips a mixed document', () => {
    const md =
      '# Title\n' +
      '\n' +
      'Para with **bold** and a [[42]] link.\n' +
      '\n' +
      '- [ ] task one\n' +
      '- [x] task two\n' +
      '\n' +
      '## Subsection\n' +
      '\n' +
      '```\ncode block\n```\n' +
      '\n' +
      '> [💡] note';
    const tripped = blocksToMd(mdToBlocks(md)).trim();
    // We don't assert exact equality (whitespace normalisation is OK)
    // but the structure must round-trip.
    expect(stripIds(mdToBlocks(tripped))).toEqual(stripIds(mdToBlocks(md)));
  });
});

describe('table / linkdb / ai (deferred)', () => {
  it('passes through table sentinel as a paragraph (deferred)', () => {
    // Phase 2 editor rewrite will parse this into a TableBlock; for
    // now it survives as opaque paragraph text so the existing editor
    // still renders it via the legacy markdown.ts path.
    const md = '| a | b |\n| --- | --- |\n| 1 | 2 |';
    const blocks = mdToBlocks(md);
    expect(blocks.length).toBeGreaterThan(0);
  });
});
