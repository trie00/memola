// pageId minting / resolution across the org + per-user list union.
//
// Each SP list numbers its items from 1, so the org-shared list and a
// user's private list almost always share numeric ids (both have an
// item 1, 2, …). `buildSourceListMap` mints COMPOSITE pageIds
// (`<list>:<num>`) for those collisions so `S.meta.pages` ids stay
// unique. `resolvePageId` is the inverse — used by the backlinks scan to
// turn a (source list, numeric id) back into the SAME id S.pages holds,
// so the panel's click → doSelect actually navigates.
//
// These tests pin the round-trip: a colliding row must resolve to its
// composite id (NOT the bare numeric id the old backlinks code emitted,
// which is why clicking a backlink did nothing).

import { describe, it, expect } from 'vitest';
import { buildSourceListMap, resolvePageId } from '../src/api/pages';
import type { PageRow } from '../src/api/pages';

const ORG = 'memola-pages';
const MINE = 'memola-pages-user-7';
const row = (Id: number): PageRow => ({ Id } as PageRow);

describe('buildSourceListMap', () => {
  it('mints composite ids for numeric ids that collide across lists', () => {
    const { sourceListByPageId } = buildSourceListMap([
      { list: ORG, rows: [row(1), row(5)] },
      { list: MINE, rows: [row(1), row(9)] },
    ]);
    // id 1 exists in BOTH lists → composite for each
    expect(sourceListByPageId.get(ORG + ':1')).toBe(ORG);
    expect(sourceListByPageId.get(MINE + ':1')).toBe(MINE);
    expect(sourceListByPageId.has('1')).toBe(false);
    // ids unique to one list → bare numeric id
    expect(sourceListByPageId.get('5')).toBe(ORG);
    expect(sourceListByPageId.get('9')).toBe(MINE);
  });

  it('rowToPageId agrees with sourceListByPageId', () => {
    const r1org = row(1), r1mine = row(1), r5 = row(5);
    const { rowToPageId } = buildSourceListMap([
      { list: ORG, rows: [r1org, r5] },
      { list: MINE, rows: [r1mine] },
    ]);
    expect(rowToPageId.get(r1org)).toBe(ORG + ':1');
    expect(rowToPageId.get(r1mine)).toBe(MINE + ':1');
    expect(rowToPageId.get(r5)).toBe('5');
  });
});

describe('resolvePageId (backlinks → doSelect id)', () => {
  it('returns the composite id for a collided row (the bug fix)', () => {
    const { sourceListByPageId } = buildSourceListMap([
      { list: ORG, rows: [row(1)] },
      { list: MINE, rows: [row(1)] },
    ]);
    // A backlink whose source is the org-list item 1 must navigate to
    // 'memola-pages:1' — exactly what S.pages holds. The old code
    // emitted bare '1', which S.pages doesn't contain → dead click.
    expect(resolvePageId(sourceListByPageId, ORG, 1)).toBe(ORG + ':1');
    expect(resolvePageId(sourceListByPageId, MINE, 1)).toBe(MINE + ':1');
  });

  it('returns the bare id when there is no collision', () => {
    const { sourceListByPageId } = buildSourceListMap([
      { list: ORG, rows: [row(5)] },
      { list: MINE, rows: [row(9)] },
    ]);
    expect(resolvePageId(sourceListByPageId, ORG, 5)).toBe('5');
    expect(resolvePageId(sourceListByPageId, MINE, 9)).toBe('9');
  });

  it('falls back to the bare id for a row not in the union view', () => {
    const empty = new Map<string, string>();
    expect(resolvePageId(empty, ORG, 42)).toBe('42');
  });
});
