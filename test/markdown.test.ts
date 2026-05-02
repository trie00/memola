import { describe, it, expect } from 'vitest';
import { mdToHtml, htmlToMd } from '../src/lib/markdown';

// Helper: round-trip md -> html -> md and compare canonical forms.
function rt(md: string): string {
  return htmlToMd(mdToHtml(md)).trim();
}

describe('markdown', () => {
  describe('plain text', () => {
    it('round-trips a single line', () => {
      expect(rt('hello world')).toBe('hello world');
    });

    it('collapses internal whitespace gracefully', () => {
      const html = mdToHtml('hello world');
      expect(html).toContain('<p>');
      expect(html).toContain('hello world');
    });
  });

  describe('inline formatting', () => {
    it('round-trips bold', () => {
      expect(rt('**bold**')).toBe('**bold**');
    });

    it('round-trips italic', () => {
      expect(rt('*italic*')).toBe('*italic*');
    });

    it('round-trips strikethrough', () => {
      expect(rt('~~strike~~')).toBe('~~strike~~');
    });

    it('round-trips inline code', () => {
      expect(rt('`code`')).toBe('`code`');
    });
  });

  describe('headings', () => {
    it('round-trips h1', () => {
      expect(rt('# Heading 1')).toBe('# Heading 1');
    });

    it('round-trips h2', () => {
      expect(rt('## Heading 2')).toBe('## Heading 2');
    });

    it('round-trips h3', () => {
      expect(rt('### Heading 3')).toBe('### Heading 3');
    });
  });

  describe('lists', () => {
    it('round-trips an unordered list', () => {
      const md = '- one\n- two\n- three';
      const out = rt(md);
      expect(out).toContain('- one');
      expect(out).toContain('- two');
      expect(out).toContain('- three');
    });

    it('round-trips an ordered list', () => {
      const md = '1. one\n2. two\n3. three';
      const out = rt(md);
      expect(out).toContain('1. one');
      expect(out).toContain('2. two');
      expect(out).toContain('3. three');
    });
  });

  describe('blockquote', () => {
    it('round-trips a single-line blockquote', () => {
      expect(rt('> hi')).toBe('> hi');
    });
  });

  describe('hr', () => {
    it('round-trips a horizontal rule', () => {
      expect(rt('---')).toBe('---');
    });
  });

  describe('code block', () => {
    it('round-trips a fenced code block', () => {
      const md = '```\nconst x = 1;\n```';
      const out = rt(md);
      expect(out).toContain('```');
      expect(out).toContain('const x = 1;');
    });

    it('preserves code content as-is (no inline expansion)', () => {
      const html = mdToHtml('```\n*not italic*\n```');
      expect(html).toContain('<pre>');
      expect(html).toContain('*not italic*');
      expect(html).not.toContain('<em>');
    });
  });

  describe('todo', () => {
    it('round-trips an unchecked todo', () => {
      expect(rt('- [ ] task')).toBe('- [ ] task');
    });

    it('round-trips a checked todo', () => {
      expect(rt('- [x] done')).toBe('- [x] done');
    });
  });

  describe('callout', () => {
    it('round-trips a callout', () => {
      const out = rt('> [💡] tip');
      expect(out).toContain('💡');
      expect(out).toContain('tip');
      expect(out.startsWith('>')).toBe(true);
    });
  });

  describe('mixed content', () => {
    it('round-trips heading + paragraph + list', () => {
      const md = '# Title\n\npara text\n\n- a\n- b';
      const out = rt(md);
      expect(out).toContain('# Title');
      expect(out).toContain('para text');
      expect(out).toContain('- a');
      expect(out).toContain('- b');
    });
  });

  describe('internal page links', () => {
    it('round-trips a wiki-style page link with id', () => {
      // [[<id>|<title>]] is the canonical form persisted to SP
      expect(rt('see [[123|Project A]] for details')).toContain('[[123|Project A]]');
    });

    it('renders the link as an atomic anchor with data-page-id', () => {
      const html = mdToHtml('[[42|Foo]]');
      expect(html).toContain('class="n365-page-link"');
      expect(html).toContain('data-page-id="42"');
      expect(html).toContain('contenteditable="false"');
      expect(html).toContain('>Foo<');
    });

    it('round-trips bare title-only links (pending resolution)', () => {
      // [[title]] without an id is allowed for hand-typed links — the click
      // handler resolves and rewrites them on first navigation.
      expect(rt('hello [[Foo Bar]] world')).toContain('[[Foo Bar]]');
    });

    it('marks pending page links so the renderer can resolve later', () => {
      const html = mdToHtml('[[Pending]]');
      expect(html).toContain('data-pending="1"');
      expect(html).not.toContain('data-page-id=');
    });

    it('does not mistake a markdown link for a page link', () => {
      const html = mdToHtml('[label](https://example.com)');
      expect(html).toContain('<a href="https://example.com">label</a>');
      expect(html).not.toContain('n365-page-link');
    });

    it('round-trips a [[daily:YYYY-MM-DD]] deferred link', () => {
      // The daily-note prev/next-day links must survive round-trip even if
      // the target row doesn't exist yet — the date is the canonical key.
      expect(rt('see [[daily:2026-05-03]] for tomorrow')).toContain('[[daily:2026-05-03]]');
    });

    it('renders a daily link with daily-link class and date attribute', () => {
      const html = mdToHtml('[[daily:2026-05-02]]');
      expect(html).toContain('class="n365-page-link daily-link"');
      expect(html).toContain('data-daily-date="2026-05-02"');
      expect(html).toContain('>2026-05-02<');
    });

    it('does not match daily prefix in bare [[title]]', () => {
      // `daily:` must be parsed as the deferred-link prefix, not as a free
      // form title. No data-pending output expected here.
      const html = mdToHtml('[[daily:2026-05-02]]');
      expect(html).not.toContain('data-pending=');
    });
  });

  describe('linked-db embed', () => {
    it('round-trips a linked-db comment with dbId + view', () => {
      const md = '<!-- n365-linkdb dbId="123" view="table" -->';
      // mdToHtml emits a placeholder div, htmlToMd emits back the comment.
      // Compare the resulting markdown to ensure shape is stable.
      expect(rt(md)).toContain('n365-linkdb');
      expect(rt(md)).toContain('dbId="123"');
      expect(rt(md)).toContain('view="table"');
    });

    it('renders the linked-db marker as an empty atomic div', () => {
      const html = mdToHtml('<!-- n365-linkdb dbId="42" view="table" -->');
      expect(html).toContain('class="n365-linkdb"');
      expect(html).toContain('contenteditable="false"');
      expect(html).toContain('data-db-id="42"');
      expect(html).toContain('data-view="table"');
      // Body is empty — the renderer fills it in at view time
      expect(html).toMatch(/<div [^>]*data-view="table"[^>]*><\/div>/);
    });

    it('preserves filter / sort attributes when present', () => {
      const md = '<!-- n365-linkdb dbId="9" view="table" filter="status=open" sort="title" -->';
      const out = rt(md);
      expect(out).toContain('filter="status=open"');
      expect(out).toContain('sort="title"');
    });

    it('omits filter / sort attrs when not set', () => {
      const md = '<!-- n365-linkdb dbId="9" view="table" -->';
      const out = rt(md);
      expect(out).not.toContain('filter=');
      expect(out).not.toContain('sort=');
    });
  });

  describe('edge cases', () => {
    it('handles empty input', () => {
      expect(mdToHtml('')).toBe('');
      expect(htmlToMd('')).toBe('');
    });

    it('handles whitespace-only input', () => {
      expect(htmlToMd('   ').trim()).toBe('');
    });

    it('collapses multiple blank lines', () => {
      const out = rt('a\n\n\n\nb');
      // No three or more consecutive newlines after round-trip.
      expect(/\n{3,}/.test(out)).toBe(false);
    });
  });
});
