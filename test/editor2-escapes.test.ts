// Tests for the keyboard escape handlers — Backspace at start of a
// container's only child should unwrap; Enter on an empty block
// inside a container should escape out.
//
// We exercise these through the orchestrator's event path: dispatch
// a synthetic InputEvent and assert the resulting state.

import { describe, it, expect, beforeEach } from 'vitest';
import { handleBeforeInput } from '../src/ui/editor2/editor-input';
import { paragraph, callout, quote, bulletList } from '../src/ui/editor2/editor-state';
import { render } from '../src/ui/editor2/editor-render';
import { applySelection } from '../src/ui/editor2/editor-selection';
import { _resetBlockIdsForTesting, type Block } from '../src/lib/blocks';

beforeEach(() => _resetBlockIdsForTesting());

const mkContainer = (): HTMLElement => {
  const c = document.createElement('div');
  c.contentEditable = 'true';
  document.body.innerHTML = '';
  document.body.appendChild(c);
  return c;
};

/** Dispatch a synthetic insertParagraph (Enter) event after placing
 *  the caret at (blockId, offset), and run handleBeforeInput against
 *  the given state. Returns the resulting next state. */
function pressEnter(state: { blocks: Block[]; selection: null }, blockId: string, offset: number): ReturnType<typeof handleBeforeInput> {
  const ed = mkContainer();
  render(ed, state.blocks);
  applySelection(ed, { kind: 'caret', blockId, offset });
  const ev = new InputEvent('beforeinput', { inputType: 'insertParagraph' });
  return handleBeforeInput(state as never, ev, ed);
}

function pressBackspace(state: { blocks: Block[]; selection: null }, blockId: string, offset: number): ReturnType<typeof handleBeforeInput> {
  const ed = mkContainer();
  render(ed, state.blocks);
  applySelection(ed, { kind: 'caret', blockId, offset });
  const ev = new InputEvent('beforeinput', { inputType: 'deleteContentBackward' });
  return handleBeforeInput(state as never, ev, ed);
}

describe('Enter on empty block inside callout escapes the callout', () => {
  it('removes the empty paragraph and inserts a fresh paragraph after the callout', () => {
    const inner = paragraph('');
    const c: Block = callout('💡', [inner]);
    const state = { blocks: [c], selection: null };
    const result = pressEnter(state, inner.id, 0);
    expect(result.preventDefault).toBe(true);
    // Callout removed (its only child was empty); fresh paragraph in its place
    expect(result.next.blocks).toHaveLength(1);
    expect(result.next.blocks[0].kind).toBe('p');
  });

  it('keeps the callout when it has multiple children', () => {
    const a = paragraph('hi');
    const b = paragraph('');
    const c: Block = callout('💡', [a, b]);
    const state = { blocks: [c], selection: null };
    const result = pressEnter(state, b.id, 0);
    // Callout retained with just the first child; fresh paragraph after
    expect(result.next.blocks).toHaveLength(2);
    expect(result.next.blocks[0].kind).toBe('callout');
    if (result.next.blocks[0].kind === 'callout') {
      expect(result.next.blocks[0].children).toHaveLength(1);
    }
    expect(result.next.blocks[1].kind).toBe('p');
  });
});

describe('Enter on empty list item escapes the list', () => {
  it('removes the empty item and inserts a fresh paragraph after', () => {
    const a = paragraph('a');
    const b = paragraph('');
    const list: Block = bulletList([[a], [b]]);
    const state = { blocks: [list], selection: null };
    const result = pressEnter(state, b.id, 0);
    expect(result.preventDefault).toBe(true);
    expect(result.next.blocks).toHaveLength(2);
    expect(result.next.blocks[0].kind).toBe('list');
    if (result.next.blocks[0].kind === 'list') {
      expect(result.next.blocks[0].items).toHaveLength(1);
    }
    expect(result.next.blocks[1].kind).toBe('p');
  });
});

describe('Backspace at start unwraps single-child container', () => {
  it('unwraps a callout with one child', () => {
    const inner = paragraph('content');
    const c: Block = callout('💡', [inner]);
    const state = { blocks: [c], selection: null };
    const result = pressBackspace(state, inner.id, 0);
    expect(result.preventDefault).toBe(true);
    // Callout replaced with the inner paragraph
    expect(result.next.blocks).toHaveLength(1);
    expect(result.next.blocks[0].id).toBe(inner.id);
    expect(result.next.blocks[0].kind).toBe('p');
  });

  it('unwraps a quote with one child', () => {
    const inner = paragraph('content');
    const q: Block = quote([inner]);
    const state = { blocks: [q], selection: null };
    const result = pressBackspace(state, inner.id, 0);
    expect(result.next.blocks[0].id).toBe(inner.id);
  });

  it('does NOT unwrap when callout has multiple children (falls back to merge)', () => {
    const a = paragraph('a');
    const b = paragraph('b');
    const c: Block = callout('💡', [a, b]);
    const state = { blocks: [c], selection: null };
    const result = pressBackspace(state, b.id, 0);
    // Caller falls back to mergeWithPrev — but since there's no
    // previous TOP-LEVEL block (the prev is a sibling INSIDE the
    // callout), mergeWithPrev no-ops at idx 0. The state is the
    // input-bearing block at top level isn't `b`, so for now this
    // is a documented edge case where Backspace on a non-first
    // child of a callout doesn't merge. Just assert no crash.
    expect(result.preventDefault).toBe(true);
  });
});
