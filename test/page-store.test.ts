// page-store helper tests — addPage / removePages / setPageTitle
// keep S.pages and S.meta.pages in lockstep.

import { describe, it, expect, beforeEach } from 'vitest';
import { addPage, removePages, setPageTitle } from '../src/lib/page-store';
import { S, type Page } from '../src/state';

const PAGE = (over: Partial<Page> = {}): Page => ({
  Id: '1', Title: 'P', ParentId: '', Type: 'page', ...over,
});

beforeEach(() => {
  S.pages = [];
  S.meta.pages = [];
});

describe('addPage', () => {
  it('adds to both S.pages and S.meta.pages', () => {
    addPage(PAGE({ Id: '7', Title: 'New' }));
    expect(S.pages.map((p) => p.Id)).toEqual(['7']);
    expect(S.meta.pages.map((p) => p.id)).toEqual(['7']);
    expect(S.meta.pages[0].title).toBe('New');
  });

  it('forwards extras to the meta entry', () => {
    addPage(PAGE({ Id: '7', Type: 'database' }), {
      icon: '🌟', scope: 'user', list: 'memola-db-1',
    });
    const m = S.meta.pages[0];
    expect(m.icon).toBe('🌟');
    expect(m.scope).toBe('user');
    expect(m.list).toBe('memola-db-1');
  });

  it('is idempotent — repeating skips duplicates on each side', () => {
    addPage(PAGE({ Id: '7' }));
    addPage(PAGE({ Id: '7', Title: 'changed' }));
    expect(S.pages).toHaveLength(1);
    expect(S.meta.pages).toHaveLength(1);
    // Title from the first call wins (idempotency, not "last write")
    expect(S.pages[0].Title).toBe('P');
  });

  it('repairs partial state — e.g. meta exists but page row missing', () => {
    S.meta.pages.push({ id: '7', title: 'preexisting', parent: '' });
    addPage(PAGE({ Id: '7' }));
    expect(S.pages.map((p) => p.Id)).toEqual(['7']);
    expect(S.meta.pages).toHaveLength(1);     // still just one meta entry
  });
});

describe('removePages', () => {
  beforeEach(() => {
    addPage(PAGE({ Id: '1' }));
    addPage(PAGE({ Id: '2' }));
    addPage(PAGE({ Id: '3' }));
  });

  it('removes from both arrays', () => {
    removePages(['1', '3']);
    expect(S.pages.map((p) => p.Id)).toEqual(['2']);
    expect(S.meta.pages.map((p) => p.id)).toEqual(['2']);
  });

  it('accepts a Set', () => {
    removePages(new Set(['2']));
    expect(S.pages.map((p) => p.Id)).toEqual(['1', '3']);
  });

  it('is a no-op for empty / unknown ids', () => {
    removePages([]);
    expect(S.pages).toHaveLength(3);
    removePages(['999']);
    expect(S.pages).toHaveLength(3);
  });
});

describe('setPageTitle', () => {
  beforeEach(() => {
    addPage(PAGE({ Id: '7', Title: 'old' }));
  });

  it('updates both arrays', () => {
    setPageTitle('7', 'new');
    expect(S.pages[0].Title).toBe('new');
    expect(S.meta.pages[0].title).toBe('new');
  });

  it('is a no-op for unknown ids', () => {
    setPageTitle('999', 'whatever');
    expect(S.pages[0].Title).toBe('old');
    expect(S.meta.pages[0].title).toBe('old');
  });
});
