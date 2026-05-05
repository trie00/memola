// HTML ↔ block-tree conversion tests. Uses happy-dom (vitest default).

import { describe, it, expect, beforeEach } from 'vitest';
import { htmlToBlocks, blocksToHtml } from '../src/lib/blocks-html';
import { _resetBlockIdsForTesting, type Block, type Inline } from '../src/lib/blocks';

beforeEach(() => _resetBlockIdsForTesting());

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

describe('htmlToBlocks — basic', () => {
  it('parses an empty container to no blocks', () => {
    expect(htmlToBlocks('')).toEqual([]);
  });

  it('parses headings h1/h2/h3', () => {
    expect(stripIds(htmlToBlocks('<h1>A</h1><h2>B</h2><h3>C</h3>'))).toEqual([
      { kind: 'h1', inline: [txt('A')] },
      { kind: 'h2', inline: [txt('B')] },
      { kind: 'h3', inline: [txt('C')] },
    ]);
  });

  it('parses a paragraph with inline emphasis', () => {
    const html = '<p>go <strong>fast</strong> <em>now</em></p>';
    expect(stripIds(htmlToBlocks(html))).toEqual([
      {
        kind: 'p',
        inline: [
          txt('go '),
          { kind: 'bold', children: [txt('fast')] },
          txt(' '),
          { kind: 'italic', children: [txt('now')] },
        ],
      },
    ]);
  });

  it('parses a markdown link', () => {
    const html = '<p>see <a href="https://x.example">docs</a></p>';
    expect(stripIds(htmlToBlocks(html))).toEqual([
      {
        kind: 'p',
        inline: [
          txt('see '),
          { kind: 'link', href: 'https://x.example', children: [txt('docs')] },
        ],
      },
    ]);
  });

  it('parses a page-link chip with alias', () => {
    const html = '<p>go to <a class="memola-page-link" data-page-id="42">My Page</a></p>';
    expect(stripIds(htmlToBlocks(html))).toEqual([
      {
        kind: 'p',
        inline: [
          txt('go to '),
          { kind: 'pagelink', pageId: '42', alias: 'My Page' },
        ],
      },
    ]);
  });

  it('parses a code block with language', () => {
    const html = '<pre><code class="language-ts">const x = 1;</code></pre>';
    expect(stripIds(htmlToBlocks(html))).toEqual([
      { kind: 'code', lang: 'ts', text: 'const x = 1;' },
    ]);
  });

  it('parses a horizontal rule', () => {
    expect(stripIds(htmlToBlocks('<hr>'))).toEqual([{ kind: 'rule' }]);
  });

  it('parses a blockquote', () => {
    const html = '<blockquote><p>quoted</p></blockquote>';
    const blocks = stripIds(htmlToBlocks(html));
    expect(blocks).toHaveLength(1);
    const q = blocks[0] as { kind: 'quote'; children: Block[] };
    expect(q.kind).toBe('quote');
    expect(stripIds(q.children)).toEqual([{ kind: 'p', inline: [txt('quoted')] }]);
  });

  it('parses a todo (checked / unchecked)', () => {
    const html =
      '<div class="memola-todo">' +
        '<input type="checkbox" class="memola-todo-cb">' +
        '<span class="memola-todo-txt">do it</span>' +
      '</div>' +
      '<div class="memola-todo">' +
        '<input type="checkbox" class="memola-todo-cb" checked>' +
        '<span class="memola-todo-txt">done</span>' +
      '</div>';
    expect(stripIds(htmlToBlocks(html))).toEqual([
      { kind: 'todo', checked: false, inline: [txt('do it')] },
      { kind: 'todo', checked: true, inline: [txt('done')] },
    ]);
  });

  it('parses a callout with emoji and body', () => {
    const html =
      '<div class="memola-callout">' +
        '<span class="memola-callout-ic">💡</span>' +
        '<div class="memola-callout-body"><p>hint</p></div>' +
      '</div>';
    const blocks = stripIds(htmlToBlocks(html));
    const c = blocks[0] as { kind: 'callout'; emoji: string; children: Block[] };
    expect(c.kind).toBe('callout');
    expect(c.emoji).toBe('💡');
    expect(stripIds(c.children)).toEqual([{ kind: 'p', inline: [txt('hint')] }]);
  });

  it('parses a bulleted list', () => {
    const html = '<ul><li>a</li><li>b</li></ul>';
    const blocks = stripIds(htmlToBlocks(html));
    expect(blocks).toHaveLength(1);
    const l = blocks[0] as { kind: 'list'; ordered: boolean; items: Block[][] };
    expect(l.ordered).toBe(false);
    expect(l.items).toHaveLength(2);
    expect(stripIds(l.items[0])).toEqual([{ kind: 'p', inline: [txt('a')] }]);
  });

  it('parses an ordered list', () => {
    const html = '<ol><li>1</li><li>2</li></ol>';
    const blocks = stripIds(htmlToBlocks(html));
    const l = blocks[0] as { kind: 'list'; ordered: boolean };
    expect(l.ordered).toBe(true);
  });

  it('handles <br> as inline break', () => {
    const html = '<p>a<br>b</p>';
    expect(stripIds(htmlToBlocks(html))).toEqual([
      { kind: 'p', inline: [txt('a'), { kind: 'br' }, txt('b')] },
    ]);
  });
});

describe('blocksToHtml', () => {
  it('emits paragraph + heading', () => {
    expect(blocksToHtml([
      { id: 'a', kind: 'h1', inline: [txt('Title')] },
      { id: 'b', kind: 'p',  inline: [txt('Body')] },
    ])).toBe('<h1>Title</h1><p>Body</p>');
  });

  it('emits a todo', () => {
    expect(blocksToHtml([
      { id: 'a', kind: 'todo', checked: true, inline: [txt('done')] },
    ])).toBe(
      '<div class="memola-todo">' +
        '<input type="checkbox" class="memola-todo-cb" checked>' +
        '<span class="memola-todo-txt">done</span>' +
      '</div>'
    );
  });

  it('emits a callout', () => {
    expect(blocksToHtml([
      { id: 'a', kind: 'callout', emoji: '💡', children: [
        { id: 'b', kind: 'p', inline: [txt('hint')] },
      ] },
    ])).toBe(
      '<div class="memola-callout">' +
        '<span class="memola-callout-ic">💡</span>' +
        '<div class="memola-callout-body"><p>hint</p></div>' +
      '</div>'
    );
  });

  it('escapes HTML special chars in text', () => {
    expect(blocksToHtml([
      { id: 'a', kind: 'p', inline: [txt('a < b & c > d')] },
    ])).toBe('<p>a &lt; b &amp; c &gt; d</p>');
  });

  it('emits a page-link chip', () => {
    expect(blocksToHtml([
      { id: 'a', kind: 'p', inline: [{ kind: 'pagelink', pageId: '42', alias: 'P' }] },
    ])).toBe('<p><a class="memola-page-link" data-page-id="42">P</a></p>');
  });
});

describe('round-trip via htmlToBlocks → blocksToHtml', () => {
  it('preserves a mixed document\'s structure', () => {
    const html =
      '<h1>T</h1>' +
      '<p>para with <strong>bold</strong> and <a href="x">link</a></p>' +
      '<div class="memola-todo"><input type="checkbox" class="memola-todo-cb" checked><span class="memola-todo-txt">done</span></div>' +
      '<ul><li>a</li><li>b</li></ul>' +
      '<pre><code class="language-ts">x</code></pre>' +
      '<hr>' +
      '<blockquote><p>q</p></blockquote>';
    const blocks = htmlToBlocks(html);
    const tripped = blocksToHtml(blocks);
    // Re-parse the tripped HTML — structure should match
    const reblocks = htmlToBlocks(tripped);
    expect(stripIds(reblocks)).toEqual(stripIds(blocks));
  });

  it('preserves a callout with nested todo', () => {
    const html =
      '<div class="memola-callout">' +
        '<span class="memola-callout-ic">⚠️</span>' +
        '<div class="memola-callout-body">' +
          '<p>warning</p>' +
          '<div class="memola-todo"><input type="checkbox" class="memola-todo-cb"><span class="memola-todo-txt">handle me</span></div>' +
        '</div>' +
      '</div>';
    const blocks = htmlToBlocks(html);
    const tripped = blocksToHtml(blocks);
    expect(stripIds(htmlToBlocks(tripped))).toEqual(stripIds(blocks));
  });
});
