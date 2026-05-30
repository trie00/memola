// Block-handle "turn into" — converting a block's kind while preserving
// its text across shapes (paragraph ↔ heading ↔ todo ↔ list/quote/callout/code).

import { describe, it, expect } from 'vitest';
import { turnIntoBlock, type EditorState } from '../src/ui/editor2/editor-state';
import type { Block, Inline } from '../src/lib/blocks';

const INLINE: Inline[] = [{ kind: 'text', text: 'hello' }];
const para = (id = 'b1'): Block => ({ id, kind: 'p', inline: INLINE } as Block);
function stateWith(block: Block): EditorState {
  return { blocks: [block], selection: null } as unknown as EditorState;
}
function only(s: EditorState): Block {
  return s.blocks[0];
}

describe('turnIntoBlock', () => {
  it('paragraph → heading keeps the same block id and inline', () => {
    const out = turnIntoBlock(stateWith(para('b1')), 'b1', 'h2');
    const b = only(out) as Block & { kind: string; id: string; inline: Inline[] };
    expect(b.kind).toBe('h2');
    expect(b.id).toBe('b1');                       // id preserved (changeBlockKind)
    expect(b.inline).toEqual(INLINE);
  });

  it('paragraph → todo keeps inline and sets unchecked', () => {
    const b = only(turnIntoBlock(stateWith(para()), 'b1', 'todo')) as Block & { kind: string; checked: boolean; inline: Inline[] };
    expect(b.kind).toBe('todo');
    expect(b.checked).toBe(false);
    expect(b.inline).toEqual(INLINE);
  });

  it('paragraph → bullet list moves the text into the first item', () => {
    const b = only(turnIntoBlock(stateWith(para()), 'b1', 'ul')) as Block & { kind: string; items: Block[][] };
    expect(b.kind).toBe('list');
    const firstItemFirstBlock = b.items[0][0] as Block & { inline: Inline[] };
    expect(firstItemFirstBlock.inline).toEqual(INLINE);
  });

  it('paragraph → callout puts the text in the callout body', () => {
    const b = only(turnIntoBlock(stateWith(para()), 'b1', 'callout')) as Block & { kind: string; children: Block[] };
    expect(b.kind).toBe('callout');
    expect((b.children[0] as Block & { inline: Inline[] }).inline).toEqual(INLINE);
  });

  it('paragraph → code flattens inline to plain text', () => {
    const b = only(turnIntoBlock(stateWith(para()), 'b1', 'pre')) as Block & { kind: string; text: string };
    expect(b.kind).toBe('code');
    expect(b.text).toBe('hello');
  });

  it('list → paragraph recovers the first item text', () => {
    const list = turnIntoBlock(stateWith(para('b1')), 'b1', 'ul');
    const listId = only(list).id;
    const back = turnIntoBlock(list, listId, 'p');
    const b = only(back) as Block & { kind: string; inline: Inline[] };
    expect(b.kind).toBe('p');
    expect(b.inline).toEqual(INLINE);
  });

  it('paragraph → divider produces a rule', () => {
    const b = only(turnIntoBlock(stateWith(para()), 'b1', 'hr')) as Block & { kind: string };
    expect(b.kind).toBe('rule');
  });

  it('is a no-op for an unknown block id', () => {
    const s = stateWith(para('b1'));
    expect(turnIntoBlock(s, 'nope', 'h1')).toBe(s);
  });
});
