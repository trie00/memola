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
