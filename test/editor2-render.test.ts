// Tests for editor2's render + selection mapping under happy-dom.

import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '../src/ui/editor2/editor-render';
import { applySelection, captureSelection } from '../src/ui/editor2/editor-selection';
import { paragraph } from '../src/ui/editor2/editor-state';
import {
  _resetBlockIdsForTesting, type Block, type Inline,
} from '../src/lib/blocks';

beforeEach(() => _resetBlockIdsForTesting());

const mkContainer = (): HTMLElement => {
  const c = document.createElement('div');
  c.contentEditable = 'true';
  document.body.innerHTML = '';
  document.body.appendChild(c);
  return c;
};

const txt = (s: string): Inline => ({ kind: 'text', text: s });

describe('render — block kinds', () => {
  it('renders a paragraph', () => {
    const c = mkContainer();
    render(c, [paragraph('hello')]);
    expect(c.children).toHaveLength(1);
    const blk = c.firstElementChild as HTMLElement;
    expect(blk.dataset.blockKind).toBe('p');
    expect(blk.textContent).toBe('hello');
  });

  it('renders headings h1/h2/h3', () => {
    const c = mkContainer();
    const blocks: Block[] = [
      { id: 'a', kind: 'h1', inline: [txt('A')] },
      { id: 'b', kind: 'h2', inline: [txt('B')] },
      { id: 'c', kind: 'h3', inline: [txt('C')] },
    ];
    render(c, blocks);
    expect(c.children[0].querySelector('h1')?.textContent).toBe('A');
    expect(c.children[1].querySelector('h2')?.textContent).toBe('B');
    expect(c.children[2].querySelector('h3')?.textContent).toBe('C');
  });

  it('renders a todo with the checkbox state', () => {
    const c = mkContainer();
    render(c, [{ id: 't', kind: 'todo', checked: true, inline: [txt('done')] }]);
    const cb = c.querySelector<HTMLInputElement>('.memola-todo-cb');
    expect(cb?.checked).toBe(true);
    expect(c.querySelector('.memola-todo-txt')?.textContent).toBe('done');
  });

  it('renders code block with language', () => {
    const c = mkContainer();
    render(c, [{ id: 'c', kind: 'code', lang: 'ts', text: 'const x = 1;' }]);
    const code = c.querySelector('code');
    expect(code?.className).toBe('language-ts');
    expect(code?.textContent).toBe('const x = 1;');
  });

  it('renders an empty paragraph as <p><br></p>', () => {
    const c = mkContainer();
    render(c, [paragraph('')]);
    const p = c.querySelector('p');
    expect(p?.querySelector('br')).not.toBeNull();
  });

  it('renders a bulleted list', () => {
    const c = mkContainer();
    const list: Block = {
      id: 'l1', kind: 'list', ordered: false,
      items: [
        [paragraph('a')],
        [paragraph('b')],
      ],
    };
    render(c, [list]);
    const ul = c.querySelector('ul');
    expect(ul?.children).toHaveLength(2);
    expect(ul?.children[0].textContent).toBe('a');
  });

  it('renders inline emphasis correctly', () => {
    const c = mkContainer();
    const blocks: Block[] = [{
      id: 'p', kind: 'p',
      inline: [
        txt('a '),
        { kind: 'bold', children: [txt('b')] },
        txt(' '),
        { kind: 'italic', children: [txt('c')] },
        txt(' '),
        { kind: 'strike', children: [txt('d')] },
      ],
    }];
    render(c, blocks);
    expect(c.querySelector('strong')?.textContent).toBe('b');
    expect(c.querySelector('em')?.textContent).toBe('c');
    expect(c.querySelector('s')?.textContent).toBe('d');
  });

  it('renders a page-link chip', () => {
    const c = mkContainer();
    render(c, [{
      id: 'p', kind: 'p',
      inline: [{ kind: 'pagelink', pageId: '42', alias: 'My Page' }],
    }]);
    const a = c.querySelector<HTMLElement>('.memola-page-link');
    expect(a?.dataset.pageId).toBe('42');
    expect(a?.contentEditable).toBe('false');
    expect(a?.textContent).toBe('My Page');
  });
});

describe('render — incremental update', () => {
  it('reuses existing block elements when ids match', () => {
    const c = mkContainer();
    const a = paragraph('a');
    const b = paragraph('b');
    render(c, [a, b]);
    const aEl = c.children[0];
    const bEl = c.children[1];
    // Edit a's content
    const aEdited: Block = { id: a.id, kind: 'p', inline: [txt('a-edited')] };
    render(c, [aEdited, b]);
    // Same DOM node reused
    expect(c.children[0]).toBe(aEl);
    expect(c.children[1]).toBe(bEl);
    expect(c.children[0].textContent).toBe('a-edited');
  });

  it('inserts a new block at the right position', () => {
    const c = mkContainer();
    const a = paragraph('a');
    const b = paragraph('b');
    render(c, [a, b]);
    const aEl = c.children[0];
    const bEl = c.children[1];
    const inserted = paragraph('NEW');
    render(c, [a, inserted, b]);
    expect(c.children).toHaveLength(3);
    expect(c.children[0]).toBe(aEl);
    expect(c.children[2]).toBe(bEl);
    expect(c.children[1].textContent).toBe('NEW');
  });

  it('removes blocks no longer in the list', () => {
    const c = mkContainer();
    const a = paragraph('a');
    const b = paragraph('b');
    const cBlock = paragraph('c');
    render(c, [a, b, cBlock]);
    render(c, [a, cBlock]);            // dropped b
    expect(c.children).toHaveLength(2);
    expect(c.children[0].textContent).toBe('a');
    expect(c.children[1].textContent).toBe('c');
  });

  it('replaces the element when the kind changes', () => {
    const c = mkContainer();
    const p = paragraph('text');
    render(c, [p]);
    const heading: Block = { id: p.id, kind: 'h1', inline: [txt('text')] };
    render(c, [heading]);
    expect(c.children).toHaveLength(1);
    const blk = c.firstElementChild as HTMLElement;
    expect(blk.dataset.blockKind).toBe('h1');
    expect(blk.querySelector('h1')?.textContent).toBe('text');
  });
});

describe('selection round-trip', () => {
  it('apply then capture preserves a caret position', () => {
    const c = mkContainer();
    const p = paragraph('hello');
    render(c, [p]);
    applySelection(c, { kind: 'caret', blockId: p.id, offset: 3 });
    const cap = captureSelection(c);
    expect(cap).toEqual({ kind: 'caret', blockId: p.id, offset: 3 });
  });

  it('caret at offset 0 (start of block)', () => {
    const c = mkContainer();
    const p = paragraph('hello');
    render(c, [p]);
    applySelection(c, { kind: 'caret', blockId: p.id, offset: 0 });
    const cap = captureSelection(c);
    expect(cap?.kind).toBe('caret');
    if (cap?.kind === 'caret') expect(cap.offset).toBe(0);
  });

  it('caret at end of block', () => {
    const c = mkContainer();
    const p = paragraph('hello');
    render(c, [p]);
    applySelection(c, { kind: 'caret', blockId: p.id, offset: 5 });
    const cap = captureSelection(c);
    expect(cap?.kind).toBe('caret');
    if (cap?.kind === 'caret') expect(cap.offset).toBe(5);
  });

  it('caret across multiple blocks', () => {
    const c = mkContainer();
    const a = paragraph('first');
    const b = paragraph('second');
    render(c, [a, b]);
    applySelection(c, { kind: 'caret', blockId: b.id, offset: 2 });
    const cap = captureSelection(c);
    expect(cap?.kind).toBe('caret');
    if (cap?.kind === 'caret') {
      expect(cap.blockId).toBe(b.id);
      expect(cap.offset).toBe(2);
    }
  });

  it('caret position survives across re-render with same block ids', () => {
    const c = mkContainer();
    const p = paragraph('hello');
    render(c, [p]);
    applySelection(c, { kind: 'caret', blockId: p.id, offset: 3 });
    // Re-render with the same content
    render(c, [p]);
    // ...and the caret survives because the DOM nodes were reused
    const cap = captureSelection(c);
    expect(cap).toEqual({ kind: 'caret', blockId: p.id, offset: 3 });
  });

  it('range selection captures correctly', () => {
    const c = mkContainer();
    const p = paragraph('helloworld');
    render(c, [p]);
    applySelection(c, {
      kind: 'range',
      anchorBlockId: p.id, anchorOffset: 2,
      focusBlockId: p.id, focusOffset: 7,
    });
    const cap = captureSelection(c);
    expect(cap?.kind).toBe('range');
    if (cap?.kind === 'range') {
      expect(cap.anchorOffset).toBe(2);
      expect(cap.focusOffset).toBe(7);
    }
  });
});
