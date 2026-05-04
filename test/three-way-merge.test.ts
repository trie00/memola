import { describe, it, expect } from 'vitest';
import {
  threeWayMerge,
  resolveConflict,
  hasUnresolvedConflicts,
} from '../src/lib/three-way-merge';

describe('threeWayMerge', () => {
  it('returns base unchanged when neither side edited', () => {
    const base = 'a\nb\nc';
    const r = threeWayMerge(base, base, base);
    expect(r.merged).toBe(base);
    expect(r.conflicts).toHaveLength(0);
    expect(r.autoMergedCount).toBe(0);
  });

  it('auto-applies an edit made only by yours', () => {
    const base = 'a\nb\nc';
    const yours = 'a\nb-modified\nc';
    const theirs = base;
    const r = threeWayMerge(base, yours, theirs);
    expect(r.merged).toBe(yours);
    expect(r.conflicts).toHaveLength(0);
    expect(r.autoMergedCount).toBe(1);
  });

  it('auto-applies an edit made only by theirs', () => {
    const base = 'a\nb\nc';
    const yours = base;
    const theirs = 'a\nb\nc-modified';
    const r = threeWayMerge(base, yours, theirs);
    expect(r.merged).toBe(theirs);
    expect(r.conflicts).toHaveLength(0);
    expect(r.autoMergedCount).toBe(1);
  });

  it('auto-merges non-overlapping edits from both sides', () => {
    const base = 'a\nb\nc\nd\ne';
    const yours = 'a-yours\nb\nc\nd\ne';     // yours changes line 1
    const theirs = 'a\nb\nc\nd\ne-theirs';   // theirs changes line 5
    const r = threeWayMerge(base, yours, theirs);
    expect(r.merged).toBe('a-yours\nb\nc\nd\ne-theirs');
    expect(r.conflicts).toHaveLength(0);
    expect(r.autoMergedCount).toBe(2);
  });

  it('reports a conflict when both sides change the same line', () => {
    const base = 'a\nb\nc';
    const yours = 'a\nb-yours\nc';
    const theirs = 'a\nb-theirs\nc';
    const r = threeWayMerge(base, yours, theirs);
    expect(r.conflicts).toHaveLength(1);
    expect(r.conflicts[0].yours).toEqual(['b-yours']);
    expect(r.conflicts[0].theirs).toEqual(['b-theirs']);
    expect(r.conflicts[0].base).toEqual(['b']);
    expect(r.merged).toContain('<<<<<<< あなた #0');
    expect(r.merged).toContain('=======');
    expect(r.merged).toContain('>>>>>>> SP 最新 #0');
  });

  it('coalesces identical changes on both sides', () => {
    const base = 'a\nb\nc';
    const same = 'a\nb-same\nc';
    const r = threeWayMerge(base, same, same);
    expect(r.merged).toBe(same);
    expect(r.conflicts).toHaveLength(0);
    expect(r.autoMergedCount).toBe(1);
  });

  it('handles pure additions at the end', () => {
    const base = 'a\nb';
    const yours = 'a\nb\nyours-tail';
    const theirs = base;
    const r = threeWayMerge(base, yours, theirs);
    expect(r.merged).toBe(yours);
    expect(r.conflicts).toHaveLength(0);
  });

  it('handles tail conflict where both sides append different content', () => {
    const base = 'a\nb';
    const yours = 'a\nb\nyours-tail';
    const theirs = 'a\nb\ntheirs-tail';
    const r = threeWayMerge(base, yours, theirs);
    expect(r.conflicts).toHaveLength(1);
    expect(r.merged).toContain('yours-tail');
    expect(r.merged).toContain('theirs-tail');
  });
});

describe('resolveConflict', () => {
  const conflictText = [
    'context',
    '<<<<<<< あなた #0',
    'yours-line',
    '=======',
    'theirs-line',
    '>>>>>>> SP 最新 #0',
    'after',
  ].join('\n');

  it('resolves with yours', () => {
    const r = resolveConflict(conflictText, 0, 'yours');
    expect(r).toBe('context\nyours-line\nafter');
    expect(hasUnresolvedConflicts(r)).toBe(false);
  });

  it('resolves with theirs', () => {
    const r = resolveConflict(conflictText, 0, 'theirs');
    expect(r).toBe('context\ntheirs-line\nafter');
    expect(hasUnresolvedConflicts(r)).toBe(false);
  });

  it('resolves with both (yours then theirs)', () => {
    const r = resolveConflict(conflictText, 0, 'both');
    expect(r).toBe('context\nyours-line\ntheirs-line\nafter');
  });

  it('accepts an explicit replacement array', () => {
    const r = resolveConflict(conflictText, 0, ['custom-1', 'custom-2']);
    expect(r).toBe('context\ncustom-1\ncustom-2\nafter');
  });
});

describe('hasUnresolvedConflicts', () => {
  it('detects markers', () => {
    expect(hasUnresolvedConflicts('a\n<<<<<<< あなた #0\nx\n=======\ny\n>>>>>>> SP 最新 #0\nb')).toBe(true);
  });
  it('returns false for clean text', () => {
    expect(hasUnresolvedConflicts('a\nb\nc')).toBe(false);
  });
});
