// publish.ts unit tests — observable state side-effects + the
// updatePageRow column writes that mirror them. The raw SP REST
// dance (CheckoutPage → MERGE → Publish) is mocked at the fetch
// layer so we test the orchestration without hitting SP.

import { describe, it, expect, beforeEach, vi } from 'vitest';

const updatePageRow = vi.fn();
const getDigest = vi.fn();

vi.mock('../src/api/pages', () => ({
  updatePageRow: (...a: unknown[]) => updatePageRow(...a),
}));

vi.mock('../src/api/digest', () => ({
  getDigest: () => getDigest(),
}));

vi.mock('../src/lib/markdown', () => ({
  mdToHtml: (md: string) => '<p>' + md + '</p>',
}));

let pub: typeof import('../src/api/publish');
let stateMod: typeof import('../src/state');

interface MockResponse {
  ok: boolean;
  status: number;
  json?: () => Promise<unknown>;
  text?: () => Promise<string>;
}

let fetchQueue: Array<(url: string, init?: RequestInit) => MockResponse | Promise<MockResponse>>;

beforeEach(async () => {
  vi.resetModules();
  updatePageRow.mockReset();
  // `updatePageRow` is awaited and `.catch()`-chained at call sites,
  // so it must return a thenable. Default to resolved.
  updatePageRow.mockResolvedValue(undefined);
  getDigest.mockReset();
  getDigest.mockResolvedValue('digest-token');
  fetchQueue = [];
  const fetchSpy = vi.fn(async (url: unknown, init?: RequestInit) => {
    if (fetchQueue.length === 0) {
      throw new Error('unexpected fetch: ' + String(url));
    }
    const handler = fetchQueue.shift()!;
    return handler(String(url), init);
  });
  vi.stubGlobal('fetch', fetchSpy);
  pub = await import('../src/api/publish');
  stateMod = await import('../src/state');
});

const ok = (body?: unknown): MockResponse => ({
  ok: true,
  status: 200,
  json: async () => body ?? {},
  text: async () => '',
});

describe('publishedUrlFor / isPagePublished — pure state lookups', () => {
  it('publishedUrlFor returns the cached URL', () => {
    stateMod.S.meta.pages = [
      { id: '1', title: 'p', parent: '', publishedUrl: 'https://x.example/p.aspx' },
    ];
    expect(pub.publishedUrlFor('1')).toBe('https://x.example/p.aspx');
  });

  it('publishedUrlFor returns empty when not published', () => {
    stateMod.S.meta.pages = [{ id: '1', title: 'p', parent: '' }];
    expect(pub.publishedUrlFor('1')).toBe('');
  });

  it('publishedUrlFor returns empty for unknown page', () => {
    stateMod.S.meta.pages = [];
    expect(pub.publishedUrlFor('zzz')).toBe('');
  });

  it('isPagePublished mirrors meta.published', () => {
    stateMod.S.meta.pages = [
      { id: '1', title: 'p', parent: '', published: true },
      { id: '2', title: 'p', parent: '' },
    ];
    expect(pub.isPagePublished('1')).toBe(true);
    expect(pub.isPagePublished('2')).toBe(false);
    expect(pub.isPagePublished('999')).toBe(false);
  });
});

describe('publishPage — first-time publish', () => {
  it('creates a Site Page, persists state, clears dirty', async () => {
    stateMod.S.meta.pages = [{ id: '42', title: 'My Page', parent: '' }];
    // Sequence the publish path expects:
    //   1. POST /_api/sitepages/pages              → 201, { d: { Id: 7 } }
    //   2. POST /_api/sitepages/pages(7)/CheckoutPage → 200
    //   3. POST /_api/sitepages/pages(7) (MERGE)   → 200 (saveDraft step 2)
    //   4. POST /_api/sitepages/pages(7)/Publish   → 200
    //   5. GET  /_api/sitepages/pages(7)           → 200 with AbsoluteUrl
    fetchQueue = [
      () => ok({ d: { Id: 7 } }),                                    // create
      () => ok(),                                                     // checkout
      () => ok(),                                                     // merge
      () => ok(),                                                     // publish
      () => ok({ d: { AbsoluteUrl: 'https://x.example/p.aspx' } }),  // read
    ];
    const url = await pub.publishPage('42', 'My Page', 'body');
    expect(url).toBe('https://x.example/p.aspx');
    // Meta updated in-place
    const m = stateMod.S.meta.pages[0];
    expect(m.published).toBe(true);
    expect(m.publishedUrl).toBe('https://x.example/p.aspx');
    expect(m.publishedSitePageId).toBe(7);
    expect(m.publishedDirty).toBe(false);
    // updatePageRow called with the matching column writes
    expect(updatePageRow).toHaveBeenCalledWith('42', {
      Published: 1,
      PublishedUrl: 'https://x.example/p.aspx',
      PublishedPageId: 7,
      PublishedDirty: 0,
    });
  });

  it('reuses existing publishedSitePageId on re-publish (no new create)', async () => {
    stateMod.S.meta.pages = [{
      id: '42', title: 'My Page', parent: '',
      published: true,
      publishedUrl: 'https://x.example/old.aspx',
      publishedSitePageId: 7,
      publishedDirty: true,
    }];
    fetchQueue = [
      () => ok(),                                                       // checkout
      () => ok(),                                                       // merge
      () => ok(),                                                       // publishDraft
      () => ok({ d: { AbsoluteUrl: 'https://x.example/p.aspx' } }),    // read
    ];
    const url = await pub.publishPage('42', 'My Page', 'body');
    expect(url).toBe('https://x.example/p.aspx');
    expect(stateMod.S.meta.pages[0].publishedSitePageId).toBe(7);
    expect(stateMod.S.meta.pages[0].publishedDirty).toBe(false);
  });
});

describe('unpublishPage', () => {
  it('clears all publish-related meta and writes columns', async () => {
    stateMod.S.meta.pages = [{
      id: '42', title: 'p', parent: '',
      published: true,
      publishedUrl: 'https://x.example/p.aspx',
      publishedSitePageId: 7,
      publishedDirty: true,
    }];
    fetchQueue = [
      () => ok(),     // delete site page
    ];
    await pub.unpublishPage('42');
    const m = stateMod.S.meta.pages[0];
    expect(m.published).toBe(false);
    expect(m.publishedUrl).toBeUndefined();
    expect(m.publishedSitePageId).toBeUndefined();
    expect(m.publishedDirty).toBeUndefined();
    expect(updatePageRow).toHaveBeenCalledWith('42', {
      Published: 0,
      PublishedUrl: '',
      PublishedPageId: 0,
      PublishedDirty: 0,
    });
  });

  it('still resets state when no Site Page id is recorded', async () => {
    stateMod.S.meta.pages = [{
      id: '42', title: 'p', parent: '',
      published: true,
    }];
    // No fetch expected — sitePageId=0 means deleteSitePage is skipped
    await pub.unpublishPage('42');
    expect(stateMod.S.meta.pages[0].published).toBe(false);
  });
});

describe('syncPublishedPage', () => {
  it('throws when the page isn\'t marked published', async () => {
    stateMod.S.meta.pages = [{ id: '42', title: 'p', parent: '' }];
    await expect(pub.syncPublishedPage('42', 'p', 'body')).rejects.toThrow('not_published');
  });

  it('saves draft + publishes + clears dirty when sitePageId exists', async () => {
    stateMod.S.meta.pages = [{
      id: '42', title: 'p', parent: '',
      published: true,
      publishedSitePageId: 7,
      publishedDirty: true,
    }];
    fetchQueue = [
      () => ok(),                                                  // checkout
      () => ok(),                                                  // merge
      () => ok(),                                                  // publish
      () => ok({ d: { AbsoluteUrl: 'https://x.example/p.aspx' } }), // read (publishDraft inner)
    ];
    await pub.syncPublishedPage('42', 'p', 'updated body');
    expect(stateMod.S.meta.pages[0].publishedDirty).toBe(false);
    expect(updatePageRow).toHaveBeenCalledWith('42', { PublishedDirty: 0 });
  });
});
