import { describe, it, expect, beforeEach } from 'vitest';
import { createEditor } from '../src/ui/editor2/editor2';
import { _resetBlockIdsForTesting, type Block } from '../src/lib/blocks';

beforeEach(() => _resetBlockIdsForTesting());

const mkRoot = (): HTMLElement => {
  document.body.innerHTML = '';
  const r = document.createElement('div');
  document.body.appendChild(r);
  return r;
};

const fire = (r: HTMLElement, inputType: string, data?: string): void => {
  r.dispatchEvent(new InputEvent('beforeinput', {
    inputType, data, bubbles: true, cancelable: true,
  }));
};

const setCaret = (node: Node, offset: number): void => {
  const range = document.createRange();
  range.setStart(node, offset);
  range.collapse(true);
  const sel = window.getSelection()!;
  sel.removeAllRanges();
  sel.addRange(range);
};

describe('Backspace inside a quote', () => {
  it('removes an empty quote-continuation paragraph', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    // quote with two paragraphs: 'hello' + ''
    const inner1: Block = { id: 'q1p1', kind: 'p', inline: [{ kind: 'text', text: 'hello' }] };
    const inner2: Block = { id: 'q1p2', kind: 'p', inline: [] };
    const quote: Block = { id: 'Q1', kind: 'quote', children: [inner1, inner2] };
    ed.setBlocks([quote]);
    // Place caret at start of empty p2
    const p2 = r.querySelector('[data-block-id="q1p2"] p')!;
    setCaret(p2, 0);
    // Backspace should drop p2, leaving the quote with just p1
    fire(r, 'deleteContentBackward');
    const blocks = ed.getBlocks();
    expect(blocks.length).toBe(1);
    const q = blocks[0] as Block & { children?: Block[] };
    expect(q.children).toHaveLength(1);
    expect((q.children![0] as { inline: { text: string }[] }).inline[0].text).toBe('hello');
    ed.destroy();
  });

  it('Enter on a non-empty inner paragraph creates a new empty paragraph in the same quote', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    const inner: Block = { id: 'q1p1', kind: 'p', inline: [{ kind: 'text', text: 'hello' }] };
    const quote: Block = { id: 'Q1', kind: 'quote', children: [inner] };
    ed.setBlocks([quote]);
    // Caret at end of "hello"
    const txt = r.querySelector('[data-block-id="q1p1"] p')!.firstChild!;
    setCaret(txt, 5);
    fire(r, 'insertParagraph');
    const q = ed.getBlocks()[0] as Block & { children?: Block[] };
    expect(q.children).toHaveLength(2);
    expect((q.children![1] as { inline: unknown[] }).inline).toEqual([]);
    ed.destroy();
  });

  it('Quote → Enter → Backspace round-trip lands back on the original tail', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    const inner: Block = { id: 'q1p1', kind: 'p', inline: [{ kind: 'text', text: 'hello' }] };
    const quote: Block = { id: 'Q1', kind: 'quote', children: [inner] };
    ed.setBlocks([quote]);
    const txt = r.querySelector('[data-block-id="q1p1"] p')!.firstChild!;
    setCaret(txt, 5);
    fire(r, 'insertParagraph');
    fire(r, 'deleteContentBackward');
    // Quote should have just the original 'hello' again
    const q = ed.getBlocks()[0] as Block & { children?: Block[] };
    expect(q.children).toHaveLength(1);
    expect((q.children![0] as { inline: { text: string }[] }).inline[0].text).toBe('hello');
    ed.destroy();
  });
});

describe('Backspace inside a callout', () => {
  it('removes an empty callout-continuation paragraph', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    const inner1: Block = { id: 'c1p1', kind: 'p', inline: [{ kind: 'text', text: 'tip' }] };
    const inner2: Block = { id: 'c1p2', kind: 'p', inline: [] };
    const callout: Block = { id: 'C1', kind: 'callout', emoji: '💡', children: [inner1, inner2] };
    ed.setBlocks([callout]);
    const p2 = r.querySelector('[data-block-id="c1p2"] p')!;
    setCaret(p2, 0);
    fire(r, 'deleteContentBackward');
    const c = ed.getBlocks()[0] as Block & { children?: Block[] };
    expect(c.children).toHaveLength(1);
    expect((c.children![0] as { inline: { text: string }[] }).inline[0].text).toBe('tip');
    ed.destroy();
  });
});
