// block-stamp tests — per-block last-editor/last-edit-time (D2).

import { describe, it, expect } from 'vitest';
import { stampBodyForSave, bodiesContentEqual, stampReplacer } from '../src/lib/block-stamp';
import { serializeBlocks, parseBlocksJson } from '../src/api/pages';
import type { Block } from '../src/lib/blocks';

const P = (id: string, text: string, extra: Partial<Block> = {}): Block =>
  ({ id, kind: 'p', inline: [{ kind: 'text', text }], ...extra } as Block);
const body = (...bs: Block[]): string => serializeBlocks(bs);

describe('stampBodyForSave', () => {
  it('stamps a changed block with the given user + time', () => {
    const base = body(P('1', 'old'), P('2', 'b'));
    const next = body(P('1', 'new'), P('2', 'b'));
    const out = parseBlocksJson(stampBodyForSave(next, base, 42, 1000));
    expect(out[0].lastBy).toBe(42);
    expect(out[0].lastAt).toBe(1000);
    // unchanged block 2 was never stamped in base → stays unstamped
    expect(out[1].lastBy).toBeUndefined();
  });

  it('carries an unchanged block’s existing stamp forward', () => {
    const base = body(P('1', 'a', { lastBy: 7, lastAt: 500 }), P('2', 'b'));
    const next = body(P('1', 'a'), P('2', 'CHANGED'));   // block 1 unchanged
    const out = parseBlocksJson(stampBodyForSave(next, base, 42, 1000));
    // block 1 keeps the OLD stamp (content didn't change)
    expect(out[0].lastBy).toBe(7);
    expect(out[0].lastAt).toBe(500);
    // block 2 changed → new stamp
    expect(out[1].lastBy).toBe(42);
    expect(out[1].lastAt).toBe(1000);
  });

  it('stamps a brand-new block', () => {
    const base = body(P('1', 'a'));
    const next = body(P('1', 'a'), P('2', 'new block'));
    const out = parseBlocksJson(stampBodyForSave(next, base, 9, 2000));
    expect(out[1].lastBy).toBe(9);
  });

  it('passes non-block bodies through unchanged', () => {
    expect(stampBodyForSave('hello world', '', 1, 1)).toBe('hello world');
    expect(stampBodyForSave('', '', 1, 1)).toBe('');
  });
});

describe('bodiesContentEqual', () => {
  it('treats bodies differing only by stamps as equal', () => {
    const a = body(P('1', 'x'));
    const b = body(P('1', 'x', { lastBy: 5, lastAt: 99 }));
    expect(a).not.toBe(b);                 // raw strings differ
    expect(bodiesContentEqual(a, b)).toBe(true);
  });

  it('detects real content differences', () => {
    expect(bodiesContentEqual(body(P('1', 'x')), body(P('1', 'y')))).toBe(false);
  });

  it('falls back to raw equality for non-block bodies', () => {
    expect(bodiesContentEqual('abc', 'abc')).toBe(true);
    expect(bodiesContentEqual('abc', 'abd')).toBe(false);
  });
});

describe('stampReplacer', () => {
  it('drops lastBy/lastAt from JSON', () => {
    const json = JSON.stringify(P('1', 'x', { lastBy: 3, lastAt: 7 }), stampReplacer);
    expect(json).not.toContain('lastBy');
    expect(json).not.toContain('lastAt');
    expect(json).toContain('"x"');
  });
});
