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

  // Markdown hard breaks (= shift+Enter in the editor → `  \n` after
  // serialisation) should NOT introduce a logical-line boundary. The
  // whole paragraph is one editable unit from the user's POV.
  it('treats hard-break (shift+Enter) lines as a single logical line', () => {
    // Both sides edit DIFFERENT paragraphs. Each paragraph contains a
    // hard break inside (= "  \n"). The diff should see 2 logical
    // lines per side, not 4, and auto-merge the two non-overlapping edits.
    const base = 'p1-line1  \np1-line2\n\np2-line1  \np2-line2';
    const yours = 'p1-EDITED  \np1-line2\n\np2-line1  \np2-line2';
    const theirs = 'p1-line1  \np1-line2\n\np2-line1  \np2-EDITED';
    const r = threeWayMerge(base, yours, theirs);
    // Both edits should auto-merge — different paragraphs touched.
    expect(r.conflicts).toHaveLength(0);
    expect(r.merged).toContain('p1-EDITED');
    expect(r.merged).toContain('p2-EDITED');
  });

  it('reports a conflict when both sides change WITHIN the same hard-break paragraph', () => {
    // Both sides edit different halves of a single paragraph (one with
    // a hard break inside). At the logical-line level, that's still
    // ONE block edited by both sides → a real conflict.
    const base = 'first  \nsecond';
    const yours = 'FIRST-edit  \nsecond';
    const theirs = 'first  \nSECOND-edit';
    const r = threeWayMerge(base, yours, theirs);
    expect(r.conflicts).toHaveLength(1);
    // The hard break must be preserved in the conflict-hunk strings so
    // the user sees the full block content for both sides.
    expect(r.conflicts[0].yours[0]).toContain('FIRST-edit');
    expect(r.conflicts[0].theirs[0]).toContain('SECOND-edit');
  });

  it('preserves the hard-break separator when re-joining merged output', () => {
    const base = 'a  \nb\n\nc';        // p1 = "a  \nb", p2 = "c"
    const yours = 'a  \nb\n\nC-EDIT';
    const theirs = base;
    const r = threeWayMerge(base, yours, theirs);
    expect(r.conflicts).toHaveLength(0);
    // The '  \n' inside the first paragraph must survive the merge.
    expect(r.merged).toBe('a  \nb\n\nC-EDIT');
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

// Regression: the merge modal must allow the user to flip their decision
// freely. Earlier the modal applied resolveConflict on top of the
// already-resolved text, which silently no-op'd because the conflict
// markers were gone after the first click. Re-resolving from the
// IMMUTABLE rawMerged via map replay (the new approach) handles the flip
// correctly.
describe('flipping a resolution by replaying from rawMerged', () => {
  const base = 'a\nb\nc';
  const yours = 'a\nb-yours\nc';
  const theirs = 'a\nb-theirs\nc';
  const r = threeWayMerge(base, yours, theirs);
  const raw = r.merged;

  function applyResolutions(map: Map<number, 'yours' | 'theirs' | 'both'>): string {
    let m = raw;
    for (const [id, choice] of map) m = resolveConflict(m, id, choice);
    return m;
  }

  it('first picks yours', () => {
    const m = applyResolutions(new Map([[0, 'yours']]));
    expect(m).toBe('a\nb-yours\nc');
  });

  it('flipping the same conflict to theirs yields theirs', () => {
    // Earlier bug: applying theirs to the already-yours-resolved text
    // would silently keep yours. Replaying from raw fixes this.
    const m = applyResolutions(new Map([[0, 'theirs']]));
    expect(m).toBe('a\nb-theirs\nc');
  });

  it('flipping back to both yields concatenation', () => {
    const m = applyResolutions(new Map([[0, 'both']]));
    expect(m).toBe('a\nb-yours\nb-theirs\nc');
  });
});
