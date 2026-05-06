// Block-tree ↔ markdown conversion.
//
// `mdToBlocks(md)` parses markdown into a structured block tree.
// `blocksToMd(blocks)` serializes back to markdown.
//
// Round-trip property: `blocksToMd(mdToBlocks(md))` produces
// equivalent markdown for the editor's authored subset
// (paragraphs, headings, todos, lists, code, hr, quotes, callouts,
// inline emphasis / links / page-links). Pixel-perfect equality
// isn't guaranteed (whitespace normalisation, e.g. `*x*` → `*x*`).
//
// Block-tree is the storage model going forward (Phase 2). Markdown
// remains the I/O boundary for AI tools, exports, and paste-from-
// elsewhere.
//
// Not yet handled (deferred to Phase 2 editor rewrite):
//   - Inline tables (`<!-- memola-table -->` sentinel) — currently
//     passed through as a paragraph carrying the raw markdown so the
//     existing editor still renders them. Tests document this.
//   - Linked-DB / AI blocks — same passthrough.
//
// The parser is intentionally minimal — pure markdown without
// extensions. Existing markdown.ts handles the HTML-comment sentinels
// and editor-specific DOM structures; this module is the new clean
// path that block-aware editor code will use.

import type {
  Block,
  Inline,
  ParagraphBlock,
  HeadingBlock,
  TodoBlock,
  CodeBlock,
  RuleBlock,
  QuoteBlock,
  ListBlock,
  CalloutBlock,
  BlockId,
} from './blocks';
import { newBlockId } from './blocks';

// ── Parsing: markdown → blocks ────────────────────────────

export function mdToBlocks(md: string): Block[] {
  const lines = md.replace(/\r\n?/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line — eat it
    if (/^\s*$/.test(line)) { i++; continue; }

    // Block sentinel for table / linkdb / ai (encoded by blocksToMd to
    // survive the markdown round-trip used by the line-based merge UI).
    const sentinel = parseBlockSentinel(line);
    if (sentinel) {
      blocks.push(sentinel);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^\s*---+\s*$/.test(line) || /^\s*\*\*\*+\s*$/.test(line)) {
      const b: RuleBlock = { id: newBlockId(), kind: 'rule' };
      blocks.push(b);
      i++;
      continue;
    }

    // Code fence
    const fence = line.match(/^```(\S*)\s*$/);
    if (fence) {
      const lang = fence[1] || '';
      const text: string[] = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        text.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++;     // consume closing fence
      const b: CodeBlock = { id: newBlockId(), kind: 'code', lang, text: text.join('\n') };
      blocks.push(b);
      continue;
    }

    // Headings (h1/h2/h3)
    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length as 1 | 2 | 3;
      const inline = parseInline(heading[2]);
      const kind = ('h' + level) as 'h1' | 'h2' | 'h3';
      const b: HeadingBlock = { id: newBlockId(), kind, inline };
      blocks.push(b);
      i++;
      continue;
    }

    // Todo line  - [ ] / - [x]  — must come before the bullet-list rule
    const todo = line.match(/^\s*-\s+\[([ xX])\]\s*(.*)$/);
    if (todo) {
      const checked = todo[1].toLowerCase() === 'x';
      const b: TodoBlock = {
        id: newBlockId(), kind: 'todo', checked, inline: parseInline(todo[2]),
      };
      blocks.push(b);
      i++;
      continue;
    }

    // Callout — first line `> [emoji] ...`, continuation `> ...`.
    // Restrict the bracket content to a single non-ASCII glyph (= an
    // emoji or pictograph). Without this, ordinary bracketed quotes
    // like `> [RFC] foo` were misparsed as callouts with emoji='RFC'.
    const calloutHead = line.match(/^>\s*\[([^\sA-Za-z0-9][^\]]*)\]\s*(.*)$/);
    if (calloutHead) {
      const emoji = calloutHead[1];
      const bodyLines = [calloutHead[2]];
      i++;
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        bodyLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      const innerBlocks = mdToBlocks(bodyLines.join('\n'));
      const b: CalloutBlock = {
        id: newBlockId(), kind: 'callout', emoji, children: innerBlocks,
      };
      blocks.push(b);
      continue;
    }

    // Plain blockquote (>) without a callout emoji
    if (/^>\s?/.test(line)) {
      const bodyLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        bodyLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      const innerBlocks = mdToBlocks(bodyLines.join('\n'));
      const b: QuoteBlock = { id: newBlockId(), kind: 'quote', children: innerBlocks };
      blocks.push(b);
      continue;
    }

    // Bulleted list (`- ` / `* ` / `+ `)
    const bullet = line.match(/^(\s*)([-*+])\s+(.*)$/);
    // Ordered list (`1. ` etc.)
    const ordered = line.match(/^(\s*)(\d+)\.\s+(.*)$/);
    if (bullet || ordered) {
      const isOrdered = !!ordered;
      const items: Block[][] = [];
      // Greedy collect contiguous list items at the same indent level
      const baseIndent = (bullet ?? ordered)![1].length;
      while (i < lines.length) {
        const m = isOrdered
          ? lines[i].match(/^(\s*)(\d+)\.\s+(.*)$/)
          : lines[i].match(/^(\s*)([-*+])\s+(.*)$/);
        if (!m) break;
        if (m[1].length !== baseIndent) break;
        // Skip todos — handled separately above (and they'd otherwise
        // be eaten here as bullet items)
        if (!isOrdered && /^\s*\[[ xX]\]/.test(m[3])) break;
        const itemLines = [m[3]];
        i++;
        // Continuation lines: indented further than the marker
        while (i < lines.length) {
          const cont = lines[i];
          if (/^\s*$/.test(cont)) {
            // Blank line might end the item OR introduce a continuation
            // paragraph. Look ahead — if next non-blank line is still
            // indented past base, treat as continuation.
            const next = lines[i + 1];
            if (next != null && /^\s+/.test(next) && next.search(/\S/) > baseIndent) {
              itemLines.push('');
              i++;
              continue;
            }
            break;
          }
          if (cont.search(/\S/) <= baseIndent) break;     // de-dent → end
          itemLines.push(cont.replace(new RegExp('^\\s{' + (baseIndent + 2) + '}'), ''));
          i++;
        }
        items.push(mdToBlocks(itemLines.join('\n')));
      }
      const b: ListBlock = { id: newBlockId(), kind: 'list', ordered: isOrdered, items };
      blocks.push(b);
      continue;
    }

    // Codex review B4: a line that's just `![alt](src)` is a
    // block-level image. Without this branch the line was treated
    // as a paragraph containing a malformed link, losing the
    // ImageBlock on round-trip.
    const imgLine = line.match(/^\s*!\[([^\]]*)\]\(([^)]+)\)\s*$/);
    if (imgLine) {
      blocks.push({ id: newBlockId(), kind: 'image', src: imgLine[2], alt: imgLine[1] });
      i++;
      continue;
    }

    // Otherwise — paragraph. Collect contiguous non-blank lines.
    const paraLines = [line];
    i++;
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !isBlockStart(lines[i])) {
      paraLines.push(lines[i]);
      i++;
    }
    const text = paraLines.join('\n');
    const b: ParagraphBlock = {
      id: newBlockId(), kind: 'p', inline: parseInline(text),
    };
    blocks.push(b);
  }

  return blocks;
}

/** Heuristic: does this line start a new block? Used to terminate
 *  paragraph collection. */
function isBlockStart(line: string): boolean {
  if (/^#{1,3}\s+/.test(line)) return true;
  if (/^```/.test(line)) return true;
  if (/^\s*---+\s*$/.test(line)) return true;
  if (/^\s*\*\*\*+\s*$/.test(line)) return true;
  if (/^\s*-\s+\[[ xX]\]/.test(line)) return true;
  if (/^>\s?/.test(line)) return true;
  if (/^(\s*)[-*+]\s+/.test(line)) return true;
  if (/^(\s*)\d+\.\s+/.test(line)) return true;
  return false;
}

// ── Inline parser ─────────────────────────────────────────

/** Parse markdown inline content into Inline[]. Handles:
 *  - **bold** / __bold__
 *  - *italic* / _italic_
 *  - ~~strike~~
 *  - `code`
 *  - [text](url)
 *  - [[pageId]] / [[pageId|alias]]
 *  - hard breaks (trailing two spaces or `<br>`)
 *  Anything else becomes plain text. The parser is greedy / left-to-right
 *  with simple recursion for nested emphasis. */
export function parseInline(text: string): Inline[] {
  if (!text) return [];
  // Preserve hard breaks as `<br>` markers we'll convert below.
  text = text.replace(/  +\n/g, '<br>\n').replace(/<br\s*\/?>/gi, '<br>');
  return parseInlineRange(text, 0, text.length);
}

function parseInlineRange(text: string, start: number, end: number): Inline[] {
  const out: Inline[] = [];
  let buf = '';
  let i = start;
  const flushText = (): void => {
    if (buf) { out.push({ kind: 'text', text: buf }); buf = ''; }
  };
  while (i < end) {
    const ch = text[i];
    // Hard break marker
    if (text.startsWith('<br>', i)) {
      flushText();
      out.push({ kind: 'br' });
      i += 4;
      // Drop a trailing newline if present (we inserted <br>\n above)
      if (text[i] === '\n') i++;
      continue;
    }
    // Wiki page-link [[id]] or [[id|alias]]
    // Codex review B2: `[[daily:YYYY-MM-DD]]` is a daily-note link.
    if (ch === '[' && text[i + 1] === '[') {
      const close = text.indexOf(']]', i + 2);
      if (close >= 0 && close < end) {
        const inner = text.substring(i + 2, close);
        const pipe = inner.indexOf('|');
        const target = pipe < 0 ? inner : inner.substring(0, pipe);
        const alias = pipe < 0 ? undefined : inner.substring(pipe + 1);
        flushText();
        const dailyMatch = target.match(/^daily:(\d{4}-\d{2}-\d{2})$/);
        if (dailyMatch) {
          out.push({ kind: 'dailylink', date: dailyMatch[1], ...(alias !== undefined ? { alias } : {}) });
        } else {
          out.push({ kind: 'pagelink', pageId: target, ...(alias !== undefined ? { alias } : {}) });
        }
        i = close + 2;
        continue;
      }
    }
    // Markdown link [text](url)
    if (ch === '[') {
      const closeBracket = findUnescaped(text, ']', i + 1, end);
      if (closeBracket >= 0 && text[closeBracket + 1] === '(') {
        const closeParen = findUnescaped(text, ')', closeBracket + 2, end);
        if (closeParen >= 0) {
          const linkText = text.substring(i + 1, closeBracket);
          const href = text.substring(closeBracket + 2, closeParen);
          flushText();
          out.push({ kind: 'link', href, children: parseInline(linkText) });
          i = closeParen + 1;
          continue;
        }
      }
    }
    // Inline code `…`
    if (ch === '`') {
      const close = text.indexOf('`', i + 1);
      if (close >= 0 && close < end) {
        flushText();
        out.push({ kind: 'code', text: text.substring(i + 1, close) });
        i = close + 1;
        continue;
      }
    }
    // ~~strike~~
    if (text.startsWith('~~', i)) {
      const close = text.indexOf('~~', i + 2);
      if (close >= 0 && close < end) {
        flushText();
        out.push({ kind: 'strike', children: parseInlineRange(text, i + 2, close) });
        i = close + 2;
        continue;
      }
    }
    // **bold** / __bold__
    if (text.startsWith('**', i) || text.startsWith('__', i)) {
      const marker = text.substr(i, 2);
      const close = text.indexOf(marker, i + 2);
      if (close >= 0 && close < end) {
        flushText();
        out.push({ kind: 'bold', children: parseInlineRange(text, i + 2, close) });
        i = close + 2;
        continue;
      }
    }
    // *italic* / _italic_  (single)
    if ((ch === '*' || ch === '_') && text[i + 1] !== ch) {
      const close = text.indexOf(ch, i + 1);
      if (close >= 0 && close < end && text[close - 1] !== ch) {
        flushText();
        out.push({ kind: 'italic', children: parseInlineRange(text, i + 1, close) });
        i = close + 1;
        continue;
      }
    }
    // Codex review B7: escape sequence — backslash followed by an
    // ASCII-punct char yields the literal char without markup
    // interpretation. Matches CommonMark's escape rule.
    if (ch === '\\' && i + 1 < end && /[!-/:-@[-`{-~]/.test(text[i + 1])) {
      buf += text[i + 1];
      i += 2;
      continue;
    }
    // Default: plain char
    buf += ch;
    i++;
  }
  flushText();
  return out;
}

/** Codex review B7: escape markdown meta chars in plain text so
 *  round-tripping `*literal*` through serialize → parse stays literal
 *  (without escape, the parser would re-interpret it as italic). */
function escapeMdText(s: string): string {
  return s.replace(/([\\`*_~[\]])/g, '\\$1');
}

function findUnescaped(text: string, ch: string, from: number, end: number): number {
  for (let i = from; i < end; i++) {
    if (text[i] === '\\') { i++; continue; }
    if (text[i] === ch) return i;
  }
  return -1;
}

// ── Serialisation: blocks → markdown ──────────────────────

export function blocksToMd(blocks: Block[]): string {
  // Consecutive same-kind "tight" blocks (todos, lists) join with a
  // single newline; everything else gets a blank line between for
  // readability and to make round-trip parsing unambiguous.
  let out = '';
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const md = blockToMd(b).replace(/\n+$/, '');
    if (out) {
      const prev = blocks[i - 1];
      const tight = (prev.kind === 'todo' && b.kind === 'todo');
      out += tight ? '\n' : '\n\n';
    }
    out += md;
  }
  return out ? out + '\n' : '';
}

function blockToMd(b: Block): string {
  switch (b.kind) {
    case 'p':
      return inlineToMd(b.inline) + '\n';
    case 'h1':
      return '# ' + inlineToMd(b.inline) + '\n';
    case 'h2':
      return '## ' + inlineToMd(b.inline) + '\n';
    case 'h3':
      return '### ' + inlineToMd(b.inline) + '\n';
    case 'todo':
      return '- [' + (b.checked ? 'x' : ' ') + '] ' + inlineToMd(b.inline) + '\n';
    case 'rule':
      return '---\n';
    case 'code':
      return '```' + b.lang + '\n' + b.text + '\n```\n';
    case 'quote': {
      // Codex review B8: strip trailing newline from inner before
      // splitting — `blocksToMd` always appends `\n`, which used to
      // produce a stray `> ` line at the end. Empty intermediate lines
      // become bare `>` (= GFM blockquote continuation) rather than `> `.
      const inner = blocksToMd(b.children).replace(/\n+$/, '');
      return inner.split('\n').map((l) => l === '' ? '>' : '> ' + l).join('\n') + '\n';
    }
    case 'callout': {
      const inner = blocksToMd(b.children).trim();
      const lines = inner.split('\n');
      let out = '> [' + b.emoji + '] ' + (lines[0] || '') + '\n';
      for (let i = 1; i < lines.length; i++) {
        out += '> ' + lines[i] + '\n';
      }
      return out;
    }
    case 'list': {
      let out = '';
      b.items.forEach((item, idx) => {
        const marker = b.ordered ? (idx + 1) + '.' : '-';
        const itemMd = blocksToMd(item).trim();
        const itemLines = itemMd.split('\n');
        out += marker + ' ' + itemLines[0] + '\n';
        for (let k = 1; k < itemLines.length; k++) {
          out += '  ' + itemLines[k] + '\n';
        }
      });
      return out;
    }
    case 'image':
      return '![' + b.alt + '](' + b.src + ')\n';
    case 'table':
    case 'linkdb':
    case 'ai':
      // These atomic islands have no clean markdown representation,
      // but they DO have to round-trip through `blocksToMd` →
      // `mdToBlocks` (= the line-based merge UI converts via markdown,
      // and we'd otherwise lose table rows / linkdb config / ai
      // prompts on every save-time conflict). Encode the full block
      // as a JSON sentinel inside an HTML comment; mdToBlocks decodes
      // it back to the original block. Base64 keeps the content safe
      // from `--` collapse + line-break artefacts.
      return encodeBlockSentinel(b) + '\n';
  }
}

/** Encode a `table` / `linkdb` / `ai` block as a self-describing
 *  HTML-comment sentinel. The body is base64-encoded JSON so the comment
 *  survives markdown serialisation (no `--` artefacts, no line break
 *  surprises). Decoded by `parseBlockSentinel`. */
function encodeBlockSentinel(b: Block): string {
  const json = JSON.stringify(b);
  let b64: string;
  try { b64 = btoa(unescape(encodeURIComponent(json))); }
  catch { b64 = ''; }
  return '<!-- memola-block:' + b64 + ' -->';
}

/** Inverse of `encodeBlockSentinel`. Returns the decoded block, or
 *  null when the line isn't a sentinel or decoding fails. */
function parseBlockSentinel(line: string): Block | null {
  const m = line.match(/^\s*<!--\s*memola-block:([A-Za-z0-9+/=]*)\s*-->\s*$/);
  if (!m) return null;
  try {
    const json = decodeURIComponent(escape(atob(m[1])));
    const block = JSON.parse(json) as Block;
    if (!block || typeof block !== 'object' || !('kind' in block) || !('id' in block)) return null;
    if (block.kind !== 'table' && block.kind !== 'linkdb' && block.kind !== 'ai') return null;
    return block;
  } catch { return null; }
}

function inlineToMd(inline: Inline[]): string {
  let out = '';
  for (const i of inline) {
    out += inlineOneToMd(i);
  }
  return out;
}

function inlineOneToMd(i: Inline): string {
  switch (i.kind) {
    case 'text':     return escapeMdText(i.text);
    case 'bold':     return '**' + inlineToMd(i.children) + '**';
    case 'italic':   return '*' + inlineToMd(i.children) + '*';
    case 'strike':   return '~~' + inlineToMd(i.children) + '~~';
    case 'code':     return '`' + i.text + '`';
    case 'link':     return '[' + inlineToMd(i.children) + '](' + i.href + ')';
    case 'pagelink': return '[[' + i.pageId + (i.alias != null ? '|' + i.alias : '') + ']]';
    case 'dailylink': return '[[daily:' + i.date + (i.alias != null ? '|' + i.alias : '') + ']]';
    case 'br':       return '  \n';
  }
}
