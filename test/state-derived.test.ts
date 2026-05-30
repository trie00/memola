// Tests that S.pages is a derived view of S.meta.pages.

import { describe, it, expect, beforeEach } from 'vitest';
import { S, resetAppState } from '../src/state';

beforeEach(() => resetAppState());

describe('S.pages derived view', () => {
  it('reflects meta.pages additions', () => {
    expect(S.pages).toEqual([]);
    S.meta.pages.push({ id: '7', title: 'New', parent: '' });
    expect(S.pages).toEqual([{
      Id: '7', Title: 'New', ParentId: '', Type: 'page', IsDraft: false,
    }]);
  });

  it('excludes trashed entries', () => {
    S.meta.pages.push(
      { id: '1', title: 'live', parent: '' },
      { id: '2', title: 'trashed', parent: '', trashed: 1234567890 },
    );
    expect(S.pages.map((p) => p.Id)).toEqual(['1']);
  });

  it('marks drafts via IsDraft', () => {
    S.meta.pages.push(
      { id: '1', title: 'page', parent: '' },
      { id: '2', title: 'draft', parent: '', originPageId: '1' },
    );
    const draft = S.pages.find((p) => p.Id === '2');
    expect(draft?.IsDraft).toBe(true);
  });

  it('preserves type (page vs database)', () => {
    S.meta.pages.push(
      { id: '1', title: 'p', parent: '', type: 'page' },
      { id: '2', title: 'd', parent: '', type: 'database' },
    );
    expect(S.pages.find((p) => p.Id === '1')?.Type).toBe('page');
    expect(S.pages.find((p) => p.Id === '2')?.Type).toBe('database');
  });

  it('default Type is page when meta.type is unset (legacy)', () => {
    S.meta.pages.push({ id: '1', title: 'p', parent: '' });
    expect(S.pages[0].Type).toBe('page');
  });

  // `S.pages` is read-only (no setter) — `S.pages = …` is a compile
  // error, enforced by the type system rather than a runtime test.

  it('returns a fresh array each access (so callers can safely .filter/.map)', () => {
    S.meta.pages.push({ id: '1', title: 'p', parent: '' });
    const a = S.pages;
    const b = S.pages;
    // Different array identities — caller mutations don't survive
    expect(a).not.toBe(b);
    a.length = 0;
    expect(S.pages).toHaveLength(1);     // unchanged
  });
});

describe('resetAppState', () => {
  it('clears meta.pages, which clears the derived S.pages', () => {
    S.meta.pages.push({ id: '1', title: 'p', parent: '' });
    expect(S.pages).toHaveLength(1);
    resetAppState();
    expect(S.meta.pages).toEqual([]);
    expect(S.pages).toEqual([]);
  });
});
