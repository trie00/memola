// Privacy filter tests for `filterVisiblePages` — the function that
// trims the raw union-read SP rows down to what the current user
// should see (org-shared + their own private + their own drafts).
//
// Pure-function test: no SP / state mocking needed.

import { describe, it, expect } from 'vitest';
import { filterVisiblePages, type PageRow } from '../src/api/pages';

const ME = 42;
const OTHER = 99;

const row = (over: Partial<PageRow>): PageRow => ({
  Id: over.Id ?? 1,
  PageType: 'page',
  ...over,
});

describe('filterVisiblePages', () => {
  describe('row entries (internal metadata)', () => {
    it('drops PageType=row regardless of scope or author', () => {
      const items = [
        row({ Id: 1, PageType: 'row', AuthorId: ME, Scope: 'org' }),
        row({ Id: 2, PageType: 'row', AuthorId: ME, Scope: 'user' }),
        row({ Id: 3, PageType: 'row', AuthorId: OTHER }),
      ];
      expect(filterVisiblePages(items, ME)).toEqual([]);
    });
  });

  describe('drafts', () => {
    it('shows my own drafts (PageType=draft)', () => {
      const items = [row({ Id: 1, PageType: 'draft', AuthorId: ME })];
      expect(filterVisiblePages(items, ME).map((r) => r.Id)).toEqual([1]);
    });

    it('hides other users\' drafts', () => {
      const items = [
        row({ Id: 1, PageType: 'draft', AuthorId: ME }),
        row({ Id: 2, PageType: 'draft', AuthorId: OTHER }),
      ];
      expect(filterVisiblePages(items, ME).map((r) => r.Id)).toEqual([1]);
    });

    it('treats legacy drafts (PageType=page + OriginPageId) the same way', () => {
      const items = [
        row({ Id: 1, PageType: 'page', OriginPageId: '7', AuthorId: ME }),
        row({ Id: 2, PageType: 'page', OriginPageId: '7', AuthorId: OTHER }),
      ];
      expect(filterVisiblePages(items, ME).map((r) => r.Id)).toEqual([1]);
    });
  });

  describe('user-scope pages', () => {
    it('shows my own user-scope pages', () => {
      const items = [row({ Id: 1, PageType: 'page', Scope: 'user', AuthorId: ME })];
      expect(filterVisiblePages(items, ME).map((r) => r.Id)).toEqual([1]);
    });

    it('hides other users\' user-scope pages', () => {
      const items = [
        row({ Id: 1, PageType: 'page', Scope: 'user', AuthorId: ME }),
        row({ Id: 2, PageType: 'page', Scope: 'user', AuthorId: OTHER }),
      ];
      expect(filterVisiblePages(items, ME).map((r) => r.Id)).toEqual([1]);
    });
  });

  describe('org-scope pages', () => {
    it('shows everyone\'s org-scope pages', () => {
      const items = [
        row({ Id: 1, PageType: 'page', Scope: 'org', AuthorId: ME }),
        row({ Id: 2, PageType: 'page', Scope: 'org', AuthorId: OTHER }),
      ];
      expect(filterVisiblePages(items, ME).map((r) => r.Id)).toEqual([1, 2]);
    });
  });

  describe('legacy rows without Scope column', () => {
    it('treats no-Scope as user-scope (= private to author)', () => {
      // Codex review PS5: pre-launch convention — empty Scope is
      // treated as user-scope for safety. Without this, legacy rows
      // leaked across users.
      const items = [
        row({ Id: 1, PageType: 'page', AuthorId: ME }),
        row({ Id: 2, PageType: 'page', AuthorId: OTHER }),
      ];
      expect(filterVisiblePages(items, ME).map((r) => r.Id)).toEqual([1]);
    });
  });

  describe('myUserId = 0 (self resolution failed)', () => {
    it('leaks user-scope pages from other authors rather than lose data', () => {
      const items = [
        row({ Id: 1, PageType: 'page', Scope: 'user', AuthorId: ME }),
        row({ Id: 2, PageType: 'page', Scope: 'user', AuthorId: OTHER }),
      ];
      expect(filterVisiblePages(items, 0).map((r) => r.Id)).toEqual([1, 2]);
    });

    it('leaks other users\' drafts too', () => {
      const items = [row({ Id: 1, PageType: 'draft', AuthorId: OTHER })];
      expect(filterVisiblePages(items, 0).map((r) => r.Id)).toEqual([1]);
    });
  });

  describe('mixed', () => {
    it('passes through every category at once', () => {
      const items: PageRow[] = [
        row({ Id: 1, PageType: 'row', AuthorId: ME }),                            // dropped (internal)
        row({ Id: 2, PageType: 'page', Scope: 'org', AuthorId: ME }),              // visible (org)
        row({ Id: 3, PageType: 'page', Scope: 'org', AuthorId: OTHER }),           // visible (org)
        row({ Id: 4, PageType: 'page', Scope: 'user', AuthorId: ME }),             // visible (mine)
        row({ Id: 5, PageType: 'page', Scope: 'user', AuthorId: OTHER }),          // dropped (other)
        row({ Id: 6, PageType: 'draft', AuthorId: ME }),                            // visible (mine)
        row({ Id: 7, PageType: 'draft', AuthorId: OTHER }),                         // dropped (other)
        row({ Id: 8, PageType: 'page', AuthorId: OTHER }),                          // dropped (legacy=user-scope, other's)
        row({ Id: 9, PageType: 'database', Scope: 'user', AuthorId: OTHER }),       // dropped (other's user-scope)
      ];
      const ids = filterVisiblePages(items, ME).map((r) => r.Id).sort((a, b) => a - b);
      expect(ids).toEqual([2, 3, 4, 6]);
    });
  });
});
