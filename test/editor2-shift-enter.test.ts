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

const fireShiftEnter = (r: HTMLElement): void => {
  r.dispatchEvent(new InputEvent('beforeinput', {
    inputType: 'insertLineBreak', bubbles: true, cancelable: true,
  }));
};

describe('Shift+Enter', () => {
  it('inserts br at end', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    ed.setBlocks([{ id: 'p1', kind: 'p', inline: [{ kind: 'text', text: 'hello' }] }]);
    const sel = window.getSelection()!;
    const range = document.createRange();
    range.setStart(r.querySelector('p')!.firstChild!, 5);
    range.collapse(true);
    sel.removeAllRanges(); sel.addRange(range);
    fireShiftEnter(r);
    expect(r.querySelectorAll('br').length).toBeGreaterThan(0);
    ed.destroy();
  });
  
  it('inserts br in the middle, splitting visible text', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    ed.setBlocks([{ id: 'p1', kind: 'p', inline: [{ kind: 'text', text: 'hello' }] }]);
    const sel = window.getSelection()!;
    const range = document.createRange();
    range.setStart(r.querySelector('p')!.firstChild!, 2);
    range.collapse(true);
    sel.removeAllRanges(); sel.addRange(range);
    fireShiftEnter(r);
    const blocks = ed.getBlocks();
    expect((blocks[0] as any).inline).toEqual([
      { kind: 'text', text: 'he' },
      { kind: 'br' },
      { kind: 'text', text: 'llo' },
    ]);
    ed.destroy();
  });
  
  it('block remains as a single block (does not split)', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    ed.setBlocks([{ id: 'p1', kind: 'p', inline: [{ kind: 'text', text: 'foo' }] }]);
    const sel = window.getSelection()!;
    const range = document.createRange();
    range.setStart(r.querySelector('p')!.firstChild!, 3);
    range.collapse(true);
    sel.removeAllRanges(); sel.addRange(range);
    fireShiftEnter(r);
    expect(ed.getBlocks().length).toBe(1);
    ed.destroy();
  });

  it('renders a placeholder br after a trailing inline br (= IME landing slot)', () => {
    // Without the placeholder, Chrome's contenteditable has no caret
    // landing position past the inline br, so IME composition writes
    // into the previous text node — typed-on-the-wrong-line bug.
    const r = mkRoot();
    const ed = createEditor(r);
    ed.setBlocks([{ id: 'p1', kind: 'p', inline: [
      { kind: 'text', text: 'abc' },
      { kind: 'br' },
    ] }]);
    const p = r.querySelector('p')!;
    const brs = p.querySelectorAll('br');
    expect(brs.length).toBe(2);
  });

  it('drops the placeholder when text follows the br', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    ed.setBlocks([{ id: 'p1', kind: 'p', inline: [
      { kind: 'text', text: 'abc' },
      { kind: 'br' },
      { kind: 'text', text: 'def' },
    ] }]);
    const p = r.querySelector('p')!;
    const brs = p.querySelectorAll('br');
    expect(brs.length).toBe(1);     // only the inline br, no placeholder
    expect(p.innerHTML).toBe('abc<br>def');
  });

  it('typing after Shift+Enter lands AFTER the br (not before)', () => {
    // Regression for the editor-selection bug where logicalToDomOffset
    // didn't return the post-br DOM position; the next insertText
    // captured a stale caret in the last text node and the new
    // characters appeared on the WRONG side of the line break.
    const r = mkRoot();
    const ed = createEditor(r);
    ed.setBlocks([{ id: 'p1', kind: 'p', inline: [{ kind: 'text', text: 'abc' }] }]);
    const sel = window.getSelection()!;
    // Caret at end of "abc"
    const txt = r.querySelector('p')!.firstChild!;
    const r1 = document.createRange();
    r1.setStart(txt, 3); r1.collapse(true);
    sel.removeAllRanges(); sel.addRange(r1);
    fireShiftEnter(r);
    // Type "def" — should land AFTER the br, NOT before it
    r.dispatchEvent(new InputEvent('beforeinput', {
      inputType: 'insertText', data: 'def', bubbles: true, cancelable: true,
    }));
    const blocks = ed.getBlocks();
    expect((blocks[0] as { inline: unknown[] }).inline).toEqual([
      { kind: 'text', text: 'abc' },
      { kind: 'br' },
      { kind: 'text', text: 'def' },
    ]);
    ed.destroy();
  });
});
