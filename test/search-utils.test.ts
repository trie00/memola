import { describe, it, expect } from 'vitest';
import { escHtml, renderSnippet, pageFromSPPath } from '../src/lib/search-utils';
import type { AppState, Page } from '../src/state';

describe('escHtml', () => {
  it('escapes ampersand', () => {
    expect(escHtml('a & b')).toBe('a &amp; b');
  });

  it('escapes less-than and greater-than', () => {
    expect(escHtml('<div>')).toBe('&lt;div&gt;');
  });

  it('escapes double quotes', () => {
    expect(escHtml('a "b" c')).toBe('a &quot;b&quot; c');
  });

  it('escapes all of <, >, &, " in one string', () => {
    expect(escHtml('<a href="x&y">')).toBe('&lt;a href=&quot;x&amp;y&quot;&gt;');
  });

  it('coerces non-strings via String()', () => {
    expect(escHtml(123 as unknown as string)).toBe('123');
  });
});

describe('renderSnippet', () => {
  it('converts <c0> to <mark class="n365-qs-hit">', () => {
    expect(renderSnippet('hi <c0>match</c0> there'))
      .toBe('hi <mark class="n365-qs-hit">match</mark> there');
  });

  it('converts <ddd/> to ellipsis', () => {
    expect(renderSnippet('start<ddd/>end')).toBe('start…end');
  });

  it('escapes other HTML before reintroducing markers', () => {
    expect(renderSnippet('<script>x</script>')).toBe('&lt;script&gt;x&lt;/script&gt;');
  });

  it('handles combined markers and escaping', () => {
    const out = renderSnippet('<c0>a&b</c0> <ddd/> <c0>c</c0>');
    expect(out).toBe('<mark class="n365-qs-hit">a&amp;b</mark> … <mark class="n365-qs-hit">c</mark>');
  });
});

describe('pageFromSPPath', () => {
  const meta: AppState['meta'] = {
    pages: [
      { id: '111', title: 'Foo', parent: '', path: '111' },
      { id: '222', title: 'Bar', parent: '111', path: '111/222' },
    ],
  };
  const pages: Page[] = [
    { Id: '111', Title: 'Foo', ParentId: '' },
    { Id: '222', Title: 'Bar', ParentId: '111' },
  ];

  it('extracts page from a SharePoint URL containing /n365-pages/', () => {
    const url = 'https://contoso.sharepoint.com/sites/x/Shared Documents/n365-pages/111/index.md';
    const p = pageFromSPPath(url, meta, pages);
    expect(p?.Id).toBe('111');
  });

  it('handles nested page paths', () => {
    const url = 'https://contoso.sharepoint.com/sites/x/Shared Documents/n365-pages/111/222/index.md';
    const p = pageFromSPPath(url, meta, pages);
    expect(p?.Id).toBe('222');
  });

  it('returns null when path is outside n365-pages', () => {
    expect(pageFromSPPath('https://x/Documents/other/index.md', meta, pages)).toBeNull();
  });

  it('returns null when meta entry is missing', () => {
    const url = 'https://contoso.sharepoint.com/sites/x/Shared Documents/n365-pages/999/index.md';
    expect(pageFromSPPath(url, meta, pages)).toBeNull();
  });

  it('decodes percent-encoded path segments', () => {
    const metaP: AppState['meta'] = {
      pages: [{ id: '1', title: 'My Page', parent: '', path: 'My Page' }],
    };
    const pagesP: Page[] = [{ Id: '1', Title: 'My Page', ParentId: '' }];
    const url = 'https://x/n365-pages/My%20Page/index.md';
    const p = pageFromSPPath(url, metaP, pagesP);
    expect(p?.Id).toBe('1');
  });
});
