// pageId minting / resolution across the org + per-user list union.
//
// IDs are assigned DETERMINISTICALLY by source list so they're STABLE
// (never flip as the other list gains/loses a row of the same number):
//   - org-list rows  → bare `num`   (shared list → same id for every user)
//   - per-user rows  → `<list>:num` (composite, always)
// The two id-spaces can't collide (number vs prefixed string). The old
// "composite only on collision" scheme re-keyed the OPEN page across
// refreshes, corrupting the live-sync / saver target.

import { describe, it, expect } from 'vitest';
import { buildSourceListMap, resolvePageId } from '../src/api/pages';
import type { PageRow } from '../src/api/pages';

const ORG = 'memola-pages';
const MINE = 'memola-user-7-pages';
const row = (Id: number): PageRow => ({ Id } as PageRow);

describe('buildSourceListMap', () => {
  it('org rows get bare ids; per-user rows get composite ids (always)', () => {
    const { sourceListByPageId } = buildSourceListMap([
      { list: ORG, rows: [row(1), row(5)] },
      { list: MINE, rows: [row(1), row(9)] },
    ]);
    // Org → bare numeric id (even though id 1 also exists in the per-user list).
    expect(sourceListByPageId.get('1')).toBe(ORG);
    expect(sourceListByPageId.get('5')).toBe(ORG);
    // Per-user → composite, always.
    expect(sourceListByPageId.get(MINE + ':1')).toBe(MINE);
    expect(sourceListByPageId.get(MINE + ':9')).toBe(MINE);
    // No bare id was minted for the per-user rows.
    expect(sourceListByPageId.has('9')).toBe(false);
  });

  it('rowToPageId agrees with sourceListByPageId', () => {
    const r1org = row(1), r1mine = row(1), r5 = row(5);
    const { rowToPageId } = buildSourceListMap([
      { list: ORG, rows: [r1org, r5] },
      { list: MINE, rows: [r1mine] },
    ]);
    expect(rowToPageId.get(r1org)).toBe('1');
    expect(rowToPageId.get(r5)).toBe('5');
    expect(rowToPageId.get(r1mine)).toBe(MINE + ':1');
  });
});

describe('resolvePageId (backlinks → doSelect id)', () => {
  it('org item → bare id, per-user item → composite id', () => {
    const { sourceListByPageId } = buildSourceListMap([
      { list: ORG, rows: [row(1)] },
      { list: MINE, rows: [row(1)] },
    ]);
    expect(resolvePageId(sourceListByPageId, ORG, 1)).toBe('1');
    expect(resolvePageId(sourceListByPageId, MINE, 1)).toBe(MINE + ':1');
  });

  it('falls back to the bare id for a row not in the union view', () => {
    const empty = new Map<string, string>();
    expect(resolvePageId(empty, ORG, 42)).toBe('42');
  });
});
