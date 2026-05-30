// Tests for the editor2 orchestrator + undo stack.

import { describe, it, expect, beforeEach } from 'vitest';
import { createEditor } from '../src/ui/editor2/editor2';
import { paragraph, insertText } from '../src/ui/editor2/editor-state';
import { UndoStack } from '../src/ui/editor2/editor-undo';
import { _resetBlockIdsForTesting, type Block } from '../src/lib/blocks';

beforeEach(() => _resetBlockIdsForTesting());

const mkRoot = (): HTMLElement => {
  document.body.innerHTML = '';
  const r = document.createElement('div');
  document.body.appendChild(r);
  return r;
};

describe('createEditor — basic lifecycle', () => {
  it('mounts with empty state', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    expect(ed.getBlocks()).toEqual([]);
    expect(r.contentEditable).toBe('true');
    expect(r.classList.contains('memola-editor2')).toBe(true);
    ed.destroy();
  });

  it('setBlocks renders the DOM', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    ed.setBlocks([paragraph('hello'), paragraph('world')]);
    expect(r.children).toHaveLength(2);
    expect(r.textContent).toBe('helloworld');
    ed.destroy();
  });

  it('subscribers are notified on state changes', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    const seen: Block[][] = [];
    ed.subscribe((b) => seen.push(b));
    ed.setBlocks([paragraph('a')]);
    expect(seen).toHaveLength(1);
    ed.applyMutation((s) => insertText(s, s.blocks[0].id, 1, 'X'), 'typing');
    expect(seen).toHaveLength(2);
    ed.destroy();
  });

  it('destroy detaches event listeners and removes the editor class', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    ed.setBlocks([paragraph('a')]);
    ed.destroy();
    expect(r.classList.contains('memola-editor2')).toBe(false);
  });
});

describe('createEditor — applyMutation', () => {
  it('applies a custom mutation and re-renders', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    const p = paragraph('hello');
    ed.setBlocks([p]);
    ed.applyMutation((s) => insertText(s, p.id, 5, '!'), 'typing');
    expect(r.textContent).toBe('hello!');
    ed.destroy();
  });

  it('toggleTodoBlock flips the checkbox', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    const todo: Block = {
      id: 't1', kind: 'todo', checked: false,
      inline: [{ kind: 'text', text: 'do' }],
    };
    ed.setBlocks([todo]);
    ed.toggleTodoBlock('t1');
    const cb = r.querySelector<HTMLInputElement>('.memola-todo-cb');
    expect(cb?.checked).toBe(true);
    ed.destroy();
  });

  it('setBlockKind changes the block kind', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    const p = paragraph('Title');
    ed.setBlocks([p]);
    ed.setBlockKind(p.id, 'h1');
    expect(r.querySelector('h1')).not.toBeNull();
    expect(r.querySelector('p')).toBeNull();
    ed.destroy();
  });
});

describe('createEditor — reconcile (caret-preserving remote merge fold-in)', () => {
  const B = (id: string, text: string): Block => ({
    id, kind: 'p', inline: [{ kind: 'text', text }],
  });

  it('replaces blocks and reflects them in getBlocks', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    ed.setBlocks([B('b1', 'one'), B('b2', 'two')]);
    ed.reconcile([B('b1', 'one (remote)'), B('b2', 'two')]);
    expect(ed.getBlocks().map((b) => (b as unknown as { inline: [{ text: string }] }).inline[0].text))
      .toEqual(['one (remote)', 'two']);
    expect(r.textContent).toBe('one (remote)two');
    ed.destroy();
  });

  it('preserves the caret in an unchanged block when another block merges in', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    ed.setBlocks([B('b1', 'one'), B('b2', 'two'), B('b3', 'three')]);
    // Put caret inside b2 at offset 3 ("two|")
    const b2 = r.querySelector('[data-block-id="b2"]')!;
    const textNode = b2.querySelector('p')!.firstChild!;
    const range = document.createRange();
    range.setStart(textNode, 3);
    range.collapse(true);
    const sel = window.getSelection()!;
    sel.removeAllRanges();
    sel.addRange(range);
    // Remote changed only b1; b2 (caret) untouched
    ed.reconcile([B('b1', 'ONE'), B('b2', 'two'), B('b3', 'three')]);
    // Caret should still be inside b2
    const after = window.getSelection()!;
    const caretBlock = (after.anchorNode as Node).parentElement?.closest('[data-block-id]');
    expect(caretBlock?.getAttribute('data-block-id')).toBe('b2');
    ed.destroy();
  });

  it('notifies subscribers so the Saver can re-sync', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    ed.setBlocks([B('b1', 'a')]);
    let count = 0;
    ed.subscribe(() => { count += 1; });
    ed.reconcile([B('b1', 'b')]);
    expect(count).toBe(1);
    ed.destroy();
  });

  it('does not add an undo entry for a reconciled remote change', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    ed.setBlocks([B('b1', 'local')]);
    // A reconcile (remote merge) should not be locally undoable.
    ed.reconcile([B('b1', 'remote')]);
    expect(ed.undo()).toBe(false);
    expect(r.textContent).toBe('remote');
    ed.destroy();
  });
});

describe('createEditor — undo / redo', () => {
  it('undoes a mutation', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    const p = paragraph('hello');
    ed.setBlocks([p]);
    ed.applyMutation((s) => insertText(s, p.id, 5, '!'), 'structural');
    expect(r.textContent).toBe('hello!');
    expect(ed.undo()).toBe(true);
    expect(r.textContent).toBe('hello');
  });

  it('redoes after undo', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    const p = paragraph('hi');
    ed.setBlocks([p]);
    ed.applyMutation((s) => insertText(s, p.id, 2, '!'), 'structural');
    ed.undo();
    expect(ed.redo()).toBe(true);
    expect(r.textContent).toBe('hi!');
  });

  it('undo returns false when nothing to undo', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    ed.setBlocks([paragraph('x')]);
    expect(ed.undo()).toBe(false);
  });

  it('redo returns false when nothing to redo', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    ed.setBlocks([paragraph('x')]);
    expect(ed.redo()).toBe(false);
  });

  it('a new mutation invalidates the redo stack', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    const p = paragraph('a');
    ed.setBlocks([p]);
    ed.applyMutation((s) => insertText(s, p.id, 1, 'b'), 'structural');
    ed.undo();
    ed.applyMutation((s) => insertText(s, p.id, 1, 'c'), 'structural');
    // Redo stack is now empty
    expect(ed.redo()).toBe(false);
  });
});

describe('createEditor — inline format', () => {
  it('toggleInlineFormat applies bold to a range selection', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    const p = paragraph('hello world');
    ed.setBlocks([p]);
    // Select "hello"
    const blockEl = r.querySelector<HTMLElement>('[data-block-id]')!;
    const textNode = blockEl.querySelector('p')!.firstChild!;
    const sel = window.getSelection()!;
    const range = document.createRange();
    range.setStart(textNode, 0);
    range.setEnd(textNode, 5);
    sel.removeAllRanges();
    sel.addRange(range);
    ed.toggleInlineFormat('bold');
    expect(r.querySelector('strong')?.textContent).toBe('hello');
    ed.destroy();
  });

  it('insertPagelink injects a chip at the caret', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    const p = paragraph('see ');
    ed.setBlocks([p]);
    // Caret at end (offset 4)
    const blockEl = r.querySelector<HTMLElement>('[data-block-id]')!;
    const textNode = blockEl.querySelector('p')!.firstChild!;
    const sel = window.getSelection()!;
    const range = document.createRange();
    range.setStart(textNode, 4);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    ed.insertPagelink('42', 'My Page');
    const chip = r.querySelector<HTMLElement>('.memola-page-link');
    expect(chip?.dataset.pageId).toBe('42');
    expect(chip?.textContent).toBe('My Page');
    ed.destroy();
  });

  it('insertBlockAfterCurrent appends after the current block', () => {
    const r = mkRoot();
    const ed = createEditor(r);
    const a = paragraph('a');
    const b = paragraph('b');
    ed.setBlocks([a, b]);
    // Place caret in `a`
    const blocks = r.querySelectorAll<HTMLElement>('[data-block-id]');
    const aText = blocks[0].querySelector('p')!.firstChild!;
    const sel = window.getSelection()!;
    const range = document.createRange();
    range.setStart(aText, 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    const inserted = paragraph('NEW');
    ed.insertBlockAfterCurrent(inserted);
    const order = ed.getBlocks().map((bb) => bb.id);
    expect(order).toEqual([a.id, inserted.id, b.id]);
    ed.destroy();
  });
});

describe('UndoStack', () => {
  it('coalesces consecutive same-tag pushes within the time window', () => {
    const u = new UndoStack();
    // Build blocks once and reuse so equality checks are stable
    // (paragraph() mints a fresh id each call).
    const ps = [0, 1, 2, 3].map((n) => paragraph(String(n)));
    const s = (n: number) => ({ blocks: [ps[n]], selection: null });
    u.reset(s(0));
    u.push(s(1), 'typing');
    u.push(s(2), 'typing');
    u.push(s(3), 'typing');
    // All three coalesced — undo should jump to s(0)
    expect(u.undo()).toEqual(s(0));
  });

  it('separates different tags into distinct entries', () => {
    const u = new UndoStack();
    // Build blocks once and reuse so equality checks are stable
    // (paragraph() mints a fresh id each call).
    const ps = [0, 1, 2, 3].map((n) => paragraph(String(n)));
    const s = (n: number) => ({ blocks: [ps[n]], selection: null });
    u.reset(s(0));
    u.push(s(1), 'typing');
    u.push(s(2), 'structural');
    u.push(s(3), 'typing');
    expect(u.undo()).toEqual(s(2));
    expect(u.undo()).toEqual(s(1));
    expect(u.undo()).toEqual(s(0));
  });

  it('redo brings back undone entries', () => {
    const u = new UndoStack();
    // Build blocks once and reuse so equality checks are stable
    // (paragraph() mints a fresh id each call).
    const ps = [0, 1, 2, 3].map((n) => paragraph(String(n)));
    const s = (n: number) => ({ blocks: [ps[n]], selection: null });
    u.reset(s(0));
    u.push(s(1), 'a');
    u.push(s(2), 'b');
    u.undo();
    u.undo();
    expect(u.redo()).toEqual(s(1));
    expect(u.redo()).toEqual(s(2));
    expect(u.redo()).toBeNull();
  });

  it('canUndo / canRedo accuracy', () => {
    const u = new UndoStack();
    // Build blocks once and reuse so equality checks are stable
    // (paragraph() mints a fresh id each call).
    const ps = [0, 1, 2, 3].map((n) => paragraph(String(n)));
    const s = (n: number) => ({ blocks: [ps[n]], selection: null });
    u.reset(s(0));
    expect(u.canUndo()).toBe(false);
    expect(u.canRedo()).toBe(false);
    u.push(s(1), 'a');
    expect(u.canUndo()).toBe(true);
    u.undo();
    expect(u.canUndo()).toBe(false);
    expect(u.canRedo()).toBe(true);
  });
});
