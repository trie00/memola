import { describe, it, expect } from 'vitest';
import { escHtml } from '../src/lib/search-utils';

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
