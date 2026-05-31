// Comment pure helpers — thread grouping, open-thread marker counts,
// orphan selection for lazy GC.

import { describe, it, expect } from 'vitest';
import {
  groupThreads, openThreadCountByBlock, selectOrphans, type CommentRow,
} from '../src/api/comments';

function c(partial: Partial<CommentRow> & { Id: number }): CommentRow {
  return {
    PageId: 'p1', BlockId: '', ThreadId: '', Body: 'x', Resolved: 0,
    Scope: 'org', AuthorId: 1, Created: '2026-01-01T00:00:0' + partial.Id + 'Z',
    ...partial,
  } as CommentRow;
}

describe('groupThreads', () => {
  it('groups replies under their root by ThreadId', () => {
    const rows = [
      c({ Id: 1, BlockId: 'b1' }),
      c({ Id: 2, BlockId: 'b1', ThreadId: '1' }),
      c({ Id: 3, BlockId: 'b1', ThreadId: '1' }),
      c({ Id: 4, BlockId: 'b2' }),
    ];
    const threads = groupThreads(rows);
    expect(threads.length).toBe(2);
    const t1 = threads.find((t) => t.root.Id === 1)!;
    expect(t1.replies.map((r) => r.Id)).toEqual([2, 3]);
    expect(t1.blockId).toBe('b1');
    const t4 = threads.find((t) => t.root.Id === 4)!;
    expect(t4.replies.length).toBe(0);
  });

  it('marks a thread resolved from the root', () => {
    const threads = groupThreads([c({ Id: 1, Resolved: 1 }), c({ Id: 2, ThreadId: '1' })]);
    expect(threads[0].resolved).toBe(true);
  });

  it('drops replies whose root is missing', () => {
    const threads = groupThreads([c({ Id: 2, ThreadId: '99' })]);
    expect(threads.length).toBe(0);
  });

  it('sorts roots and replies by created time', () => {
    const rows = [
      c({ Id: 3, Created: '2026-01-03T00:00:00Z' }),
      c({ Id: 1, Created: '2026-01-01T00:00:00Z' }),
      c({ Id: 2, Created: '2026-01-02T00:00:00Z' }),
    ];
    expect(groupThreads(rows).map((t) => t.root.Id)).toEqual([1, 2, 3]);
  });
});

describe('openThreadCountByBlock', () => {
  it('counts only unresolved threads, keyed by block (page-level under "")', () => {
    const threads = groupThreads([
      c({ Id: 1, BlockId: 'b1' }),
      c({ Id: 2, BlockId: 'b1' }),
      c({ Id: 3, BlockId: 'b2', Resolved: 1 }),   // resolved → not counted
      c({ Id: 4, BlockId: '' }),                   // page-level
    ]);
    const counts = openThreadCountByBlock(threads);
    expect(counts.get('b1')).toBe(2);
    expect(counts.get('b2')).toBeUndefined();
    expect(counts.get('')).toBe(1);
  });
});

describe('selectOrphans', () => {
  it('returns comments whose page is not in the live set', () => {
    const rows = [c({ Id: 1, PageId: 'alive' }), c({ Id: 2, PageId: 'dead' })];
    const orphans = selectOrphans(rows, new Set(['alive']));
    expect(orphans.map((r) => r.Id)).toEqual([2]);
  });
});
