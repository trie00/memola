// threeWayMergeBlocks tests — block-id-aware 3-way merge.

import { describe, it, expect } from 'vitest';
import { threeWayMergeBlocks, applyBlockMergeChoices } from '../src/lib/three-way-merge-blocks';
import type { Block } from '../src/lib/blocks';

/** Build a paragraph block with explicit id and text. */
const P = (id: string, text: string): Block => ({
  id, kind: 'p', inline: [{ kind: 'text', text }],
});

const H1 = (id: string, text: string): Block => ({
  id, kind: 'h1', inline: [{ kind: 'text', text }],
});

describe('threeWayMergeBlocks — clean cases', () => {
  it('returns base unchanged when no edits', () => {
    const base = [P('1', 'a'), P('2', 'b')];
    const r = threeWayMergeBlocks(base, base, base);
    expect(r.merged).toEqual(base);
    expect(r.conflicts).toEqual([]);
    expect(r.autoMergedCount).toBe(0);
  });

  it('takes yours when only yours changed', () => {
    const base = [P('1', 'old')];
    const yours = [P('1', 'new')];
    const theirs = base;
    const r = threeWayMergeBlocks(base, yours, theirs);
    expect(r.merged).toEqual(yours);
    expect(r.conflicts).toEqual([]);
    expect(r.autoMergedCount).toBe(1);
  });

  it('takes theirs when only theirs changed', () => {
    const base = [P('1', 'old')];
    const yours = base;
    const theirs = [P('1', 'remote')];
    const r = threeWayMergeBlocks(base, yours, theirs);
    expect(r.merged).toEqual(theirs);
    expect(r.autoMergedCount).toBe(1);
  });

  it('auto-merges when both sides made the same edit', () => {
    const base = [P('1', 'old')];
    const yours = [P('1', 'new')];
    const theirs = [P('1', 'new')];
    const r = threeWayMergeBlocks(base, yours, theirs);
    expect(r.merged).toEqual(yours);
    expect(r.conflicts).toEqual([]);
    expect(r.autoMergedCount).toBe(1);
  });
});

describe('threeWayMergeBlocks — conflicts', () => {
  it('reports modify-modify when both sides edit the same block', () => {
    const base = [P('1', 'old')];
    const yours = [P('1', 'mine')];
    const theirs = [P('1', 'theirs')];
    const r = threeWayMergeBlocks(base, yours, theirs);
    expect(r.conflicts).toHaveLength(1);
    expect(r.conflicts[0].kind).toBe('modify-modify');
    expect(r.conflicts[0].id).toBe('1');
    // Tentative resolution = yours
    expect(r.merged).toEqual(yours);
  });

  it('reports modify-delete when yours edits and theirs deletes', () => {
    const base = [P('1', 'old')];
    const yours = [P('1', 'mine')];
    const theirs: Block[] = [];
    const r = threeWayMergeBlocks(base, yours, theirs);
    expect(r.conflicts).toHaveLength(1);
    expect(r.conflicts[0].kind).toBe('modify-delete');
    expect(r.conflicts[0].theirs).toBeNull();
  });

  it('reports delete-modify when yours deletes and theirs edits', () => {
    const base = [P('1', 'old')];
    const yours: Block[] = [];
    const theirs = [P('1', 'remote')];
    const r = threeWayMergeBlocks(base, yours, theirs);
    expect(r.conflicts).toHaveLength(1);
    expect(r.conflicts[0].kind).toBe('delete-modify');
    expect(r.conflicts[0].yours).toBeNull();
  });

  it('auto-merges when one side deletes a block the other side did not modify', () => {
    const base = [P('1', 'old')];
    const yours = base;
    const theirs: Block[] = [];
    const r = threeWayMergeBlocks(base, yours, theirs);
    expect(r.conflicts).toEqual([]);
    expect(r.merged).toEqual([]);
    expect(r.autoMergedCount).toBe(1);
  });

  it('auto-merges when both sides delete the block', () => {
    const base = [P('1', 'old')];
    const yours: Block[] = [];
    const theirs: Block[] = [];
    const r = threeWayMergeBlocks(base, yours, theirs);
    expect(r.merged).toEqual([]);
    expect(r.conflicts).toEqual([]);
  });
});

describe('threeWayMergeBlocks — concurrent edits to different blocks', () => {
  it('auto-merges when each side edits a different block', () => {
    const base = [P('1', 'a'), P('2', 'b'), P('3', 'c')];
    const yours = [P('1', 'A'), P('2', 'b'), P('3', 'c')];
    const theirs = [P('1', 'a'), P('2', 'b'), P('3', 'C')];
    const r = threeWayMergeBlocks(base, yours, theirs);
    expect(r.conflicts).toEqual([]);
    expect(r.autoMergedCount).toBe(2);
    expect(r.merged).toEqual([P('1', 'A'), P('2', 'b'), P('3', 'C')]);
  });
});

describe('threeWayMergeBlocks — insertions', () => {
  it('keeps a block added on yours side', () => {
    const base = [P('1', 'a')];
    const yours = [P('1', 'a'), P('NEW', 'new')];
    const theirs = base;
    const r = threeWayMergeBlocks(base, yours, theirs);
    expect(r.merged.map((b) => b.id)).toEqual(['1', 'NEW']);
  });

  it('keeps a block added on theirs side', () => {
    const base = [P('1', 'a')];
    const yours = base;
    const theirs = [P('1', 'a'), P('REMOTE', 'r')];
    const r = threeWayMergeBlocks(base, yours, theirs);
    expect(r.merged.map((b) => b.id)).toEqual(['1', 'REMOTE']);
  });

  it('keeps additions from both sides', () => {
    const base = [P('1', 'a')];
    const yours = [P('1', 'a'), P('Y', 'y')];
    const theirs = [P('1', 'a'), P('T', 't')];
    const r = threeWayMergeBlocks(base, yours, theirs);
    expect(r.merged.map((b) => b.id).sort()).toEqual(['1', 'T', 'Y']);
    expect(r.conflicts).toEqual([]);
  });
});

describe('threeWayMergeBlocks — moves', () => {
  it('preserves a block moved on yours side', () => {
    const base = [P('1', 'a'), P('2', 'b'), P('3', 'c')];
    const yours = [P('3', 'c'), P('1', 'a'), P('2', 'b')];
    const theirs = base;
    const r = threeWayMergeBlocks(base, yours, theirs);
    // Yours's order wins; no conflicts
    expect(r.merged.map((b) => b.id)).toEqual(['3', '1', '2']);
    expect(r.conflicts).toEqual([]);
  });

  it('handles edited-on-yours + moved-on-theirs (no conflict — different concerns)', () => {
    const base = [P('1', 'a'), P('2', 'b')];
    const yours = [P('1', 'EDITED'), P('2', 'b')];
    const theirs = [P('2', 'b'), P('1', 'a')];      // theirs moved
    const r = threeWayMergeBlocks(base, yours, theirs);
    expect(r.conflicts).toEqual([]);
    // Block 1 has yours's EDITED content, ordering follows yours
    const block1 = r.merged.find((b) => b.id === '1') as unknown as { kind: 'p'; inline: [{ text: string }] };
    expect(block1.inline[0].text).toBe('EDITED');
  });
});

describe('threeWayMergeBlocks — block-kind diversity', () => {
  it('merges heading edits like paragraph edits', () => {
    const base = [H1('1', 'Title')];
    const yours = [H1('1', 'New Title')];
    const theirs = base;
    const r = threeWayMergeBlocks(base, yours, theirs);
    expect(r.merged).toEqual(yours);
  });

  it('content equality strips ids when comparing', () => {
    // base + theirs have id 1 but with same content (under different
    // structural positions). yours edited it. Should auto-merge.
    const base = [P('1', 'old')];
    const yours = [P('1', 'new')];
    const theirs = [P('1', 'old')];   // explicit "no change"
    const r = threeWayMergeBlocks(base, yours, theirs);
    expect(r.merged).toEqual(yours);
    expect(r.autoMergedCount).toBe(1);
  });
});

describe('applyBlockMergeChoices', () => {
  const base = [P('1', 'old'), P('2', 'b')];
  const yours = [P('1', 'mine'), P('2', 'b')];
  const theirs = [P('1', 'theirs'), P('2', 'b')];

  it('takes yours by default', () => {
    const r = threeWayMergeBlocks(base, yours, theirs);
    const final = applyBlockMergeChoices(r, {});
    const block = final.find((b) => b.id === '1') as unknown as { inline: [{ text: string }] };
    expect(block.inline[0].text).toBe('mine');
  });

  it('takes theirs when chosen', () => {
    const r = threeWayMergeBlocks(base, yours, theirs);
    const final = applyBlockMergeChoices(r, { '1': 'theirs' });
    const block = final.find((b) => b.id === '1') as unknown as { inline: [{ text: string }] };
    expect(block.inline[0].text).toBe('theirs');
  });

  it('drops the conflicted block when chosen', () => {
    const r = threeWayMergeBlocks(base, yours, theirs);
    const final = applyBlockMergeChoices(r, { '1': 'drop' });
    expect(final.find((b) => b.id === '1')).toBeUndefined();
    expect(final.find((b) => b.id === '2')).toBeDefined();
  });
});
