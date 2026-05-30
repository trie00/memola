// URL link inline — wrapping a selection (applyLink), unlinking, and
// inserting a bare URL at the caret (insertLinkText). UNC paths are stored
// verbatim; the renderer (not tested here) converts them for the anchor.

import { describe, it, expect } from 'vitest';
import {
  applyLink, insertLinkText, paragraph, type EditorState,
} from '../src/ui/editor2/editor-state';
import type { Block, Inline } from '../src/lib/blocks';

function stateWith(block: Block): EditorState {
  return { blocks: [block], selection: null } as unknown as EditorState;
}
function inlineOf(s: EditorState): Inline[] {
  return (s.blocks[0] as Block & { inline: Inline[] }).inline;
}
const p = (text: string): Block =>
  ({ id: 'p1', kind: 'p', inline: [{ kind: 'text', text }] } as Block);

describe('applyLink', () => {
  it('wraps the selected range in a link', () => {
    const out = applyLink(stateWith(p('see google here')), 'p1', 4, 10, 'https://g.co');
    const inl = inlineOf(out);
    // 'see ' + link('google') + ' here'
    expect(inl[0]).toEqual({ kind: 'text', text: 'see ' });
    expect(inl[1]).toEqual({ kind: 'link', href: 'https://g.co', children: [{ kind: 'text', text: 'google' }] });
    expect(inl[2]).toEqual({ kind: 'text', text: ' here' });
  });

  it('keeps a UNC href verbatim', () => {
    const out = applyLink(stateWith(p('open share')), 'p1', 0, 4, '\\\\srv\\share\\d');
    const link = inlineOf(out)[0] as Extract<Inline, { kind: 'link' }>;
    expect(link.kind).toBe('link');
    expect(link.href).toBe('\\\\srv\\share\\d');
  });

  it('re-linking replaces the existing href (strips inner link)', () => {
    const linked = applyLink(stateWith(p('abcd')), 'p1', 0, 4, 'https://a');
    const relinked = applyLink(linked, 'p1', 0, 4, 'https://b');
    const inl = inlineOf(relinked);
    expect(inl.length).toBe(1);
    expect((inl[0] as Extract<Inline, { kind: 'link' }>).href).toBe('https://b');
  });

  it('empty href unlinks the range', () => {
    const linked = applyLink(stateWith(p('abcd')), 'p1', 0, 4, 'https://a');
    const unlinked = applyLink(linked, 'p1', 0, 4, '');
    expect(inlineOf(unlinked)).toEqual([{ kind: 'text', text: 'abcd' }]);
  });

  it('is a no-op for a collapsed range', () => {
    const out = applyLink(stateWith(p('abcd')), 'p1', 2, 2, 'https://a');
    expect(inlineOf(out)).toEqual([{ kind: 'text', text: 'abcd' }]);
  });
});

describe('insertLinkText', () => {
  it('inserts the href as link text at the caret and advances the caret', () => {
    const start = stateWith({ id: 'p1', kind: 'p', inline: [] } as Block);
    const out = insertLinkText(start, 'p1', 0, 'https://x.io');
    const inl = inlineOf(out);
    expect(inl[0]).toEqual({ kind: 'link', href: 'https://x.io', children: [{ kind: 'text', text: 'https://x.io' }] });
    expect(out.selection).toEqual({ kind: 'caret', blockId: 'p1', offset: 'https://x.io'.length });
  });

  it('does nothing with an empty href', () => {
    const start = stateWith(p('hi'));
    const out = insertLinkText(start, 'p1', 2, '');
    expect(inlineOf(out)).toEqual([{ kind: 'text', text: 'hi' }]);
  });
});

// Silence unused-import lint for paragraph (kept for parity with sibling tests).
void paragraph;
