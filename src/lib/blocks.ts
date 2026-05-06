// Block-tree types — Phase 2 internal storage model.
//
// Goal: replace markdown-as-storage with a structured tree, while
// keeping markdown as the I/O boundary format (AI tools, exports,
// paste-from-elsewhere, copy-out-as-MD). Today the editor stores
// markdown and re-parses it on every render; structural blocks (table,
// linked-DB, AI) are smuggled in via HTML comments that are easy to
// corrupt during merge / paste / round-trip.
//
// Round-trip property: `blocksToMd(mdToBlocks(md)) === md`
//   — within the markdown subset that the editor authors. Markdown
//   features outside that subset (footnotes, math, raw HTML besides
//   our sentinels) are tolerated by mdToBlocks (passthrough as
//   paragraph) but not guaranteed pixel-perfect on round-trip.
//
// Stable block IDs allow:
//   - 3-way merge on block-id units (instead of line-based diff)
//   - Stable [[block-id]] links into specific paragraphs
//   - React-like keyed re-renders
//
// IDs are short opaque strings ("blk_" + 8 random chars). Ids only
// matter for blocks that survive across saves; ephemeral re-parses
// can reuse ids by content match heuristic, but that's the parser's
// concern, not the type's.

export type BlockId = string;

// ── Inline content ────────────────────────────────────────

/** A leaf in inline content — text or a structural inline element. */
export type Inline =
  | { kind: 'text'; text: string }
  /** Bold span. Children are themselves inline (so bold-italic nests). */
  | { kind: 'bold'; children: Inline[] }
  | { kind: 'italic'; children: Inline[] }
  | { kind: 'strike'; children: Inline[] }
  /** Inline code (backtick). Always a flat string — no nesting. */
  | { kind: 'code'; text: string }
  /** Markdown link [text](url). Children carry the visible text. */
  | { kind: 'link'; href: string; children: Inline[] }
  /** Wiki-style page link `[[<pageId>]]` or `[[<pageId>|alias]]`.
   *  Used by [[...]] picker and back-links scan. */
  | { kind: 'pagelink'; pageId: string; alias?: string }
  /** Codex review B2: dedicated daily-note link `[[daily:YYYY-MM-DD]]`.
   *  Distinct from `pagelink` because daily notes are addressed by date,
   *  not page id — round-trip through markdown / HTML preserves the
   *  date instead of corrupting it into a broken pagelink. */
  | { kind: 'dailylink'; date: string; alias?: string }
  /** Hard line break inside a paragraph (markdown two-trailing-spaces
   *  or `<br>`). */
  | { kind: 'br' };

// ── Block types ───────────────────────────────────────────

export interface BlockBase {
  id: BlockId;
}

/** Paragraph, heading, todo — flat blocks with one inline run each. */
export interface ParagraphBlock extends BlockBase {
  kind: 'p';
  inline: Inline[];
}

export interface HeadingBlock extends BlockBase {
  kind: 'h1' | 'h2' | 'h3';
  inline: Inline[];
}

export interface TodoBlock extends BlockBase {
  kind: 'todo';
  checked: boolean;
  inline: Inline[];
}

/** Code fence — opaque text + language tag. */
export interface CodeBlock extends BlockBase {
  kind: 'code';
  lang: string;     // '' = no language
  text: string;     // verbatim, includes trailing newline if present
}

/** Horizontal rule (`---`). */
export interface RuleBlock extends BlockBase {
  kind: 'rule';
}

/** Blockquote — children are themselves blocks (recursive). */
export interface QuoteBlock extends BlockBase {
  kind: 'quote';
  children: Block[];
}

/** List (bulleted or ordered). Each item is a list of blocks so
 *  multi-paragraph items work (item with paragraph + nested list). */
export interface ListBlock extends BlockBase {
  kind: 'list';
  ordered: boolean;
  items: Block[][];
}

/** Callout block — emoji + nested blocks. */
export interface CalloutBlock extends BlockBase {
  kind: 'callout';
  emoji: string;
  children: Block[];
}

/** Inline table.
 *  - hrow=true means the first row is a header
 *  - hcol=true means the first column is a header
 *  - cells store inline content (so bold / italic / links survive,
 *    fixing a current round-trip loss in markdown.ts) */
export interface TableBlock extends BlockBase {
  kind: 'table';
  hrow: boolean;
  hcol: boolean;
  rows: Inline[][][];   // rows × cols × inline run
}

/** Linked-DB embed. Renders as a live table view of another DB. */
export interface LinkedDbBlock extends BlockBase {
  kind: 'linkdb';
  dbId: string;
  view: 'table' | 'board' | 'list' | 'gallery' | 'calendar' | 'gantt';
  filter: string;       // serialized filter expression
  sort: string;         // serialized sort spec
}

/** AI block — prompt + last result. Currently lost on save in the
 *  markdown-as-storage model; block-tree round-trips it as JSON. */
export interface AiBlock extends BlockBase {
  kind: 'ai';
  prompt: string;
  result: string;
}

/** Block-level image. The src is the URL the browser fetches (typically
 *  a SP attachment URL); alt is the alt text (usually the original
 *  filename). Inserted via paste / drop / explicit insert command. */
export interface ImageBlock extends BlockBase {
  kind: 'image';
  src: string;
  alt: string;
}

export type Block =
  | ParagraphBlock
  | HeadingBlock
  | TodoBlock
  | CodeBlock
  | RuleBlock
  | QuoteBlock
  | ListBlock
  | CalloutBlock
  | TableBlock
  | LinkedDbBlock
  | AiBlock
  | ImageBlock;

// ── Helpers ────────────────────────────────────────────────

let _idCounter = 0;

/** Generate a fresh block id. Ids collide-free within a session;
 *  persistence assigns globally-unique ids on save. The counter is
 *  module-level so two calls in the same tick don't collide even
 *  when Math.random would. */
export function newBlockId(): BlockId {
  _idCounter += 1;
  const rnd = Math.random().toString(36).slice(2, 8);
  return 'blk_' + rnd + _idCounter.toString(36);
}

/** Reset the id counter — for tests that want deterministic ids. */
export function _resetBlockIdsForTesting(): void {
  _idCounter = 0;
}

/** Plain inline run from a string — used by callers that don't need
 *  formatting (and by mdToBlocks for the trivial case). */
export function plainInline(text: string): Inline[] {
  return text === '' ? [] : [{ kind: 'text', text }];
}

/** Concatenate inline runs into a flat plain string — used for
 *  outline / search / title fields. Drops formatting. */
export function inlineToPlainText(inline: Inline[]): string {
  let out = '';
  for (const i of inline) {
    if (i.kind === 'text') out += i.text;
    else if (i.kind === 'code') out += i.text;
    else if (i.kind === 'br') out += '\n';
    else if (i.kind === 'pagelink') out += i.alias || i.pageId;
    else if (i.kind === 'dailylink') out += i.alias || i.date;
    else if (i.kind === 'bold' || i.kind === 'italic' || i.kind === 'strike' || i.kind === 'link') {
      out += inlineToPlainText(i.children);
    }
  }
  return out;
}
