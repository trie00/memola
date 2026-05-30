// Block-tree ↔ HTML conversion (DOM-based).
//
// Companion to `blocks-md.ts` for the editor side: the editor renders
// HTML in a contenteditable, so save-time we walk the DOM directly into
// blocks instead of round-tripping through markdown (which is lossy
// for inline table cells, linked-DB embed attrs, etc.).
//
// Coverage (Phase 2 foundation):
//   ✅ headings h1/h2/h3
//   ✅ paragraphs (with inline emphasis, links, page links, code)
//   ✅ todos (`.memola-todo` with checkbox + text)
//   ✅ callouts (`.memola-callout` with emoji + nested children)
//   ✅ lists (ul/ol)
//   ✅ code (pre > code)
//   ✅ horizontal rule
//   ✅ blockquote
//
// Deferred (preserved as opaque HTML inside a special block kind so the
// editor still round-trips them — Phase 2 editor rewrite will replace
// the passthrough with proper block kinds):
//   ⏳ inline tables (`.memola-itbl-wrap`)
//   ⏳ linked-DB embed (`.memola-linkdb`)
//   ⏳ AI block (`.memola-ai`)

import type {
  Block, Inline,
  ParagraphBlock, HeadingBlock, TodoBlock, CodeBlock,
  RuleBlock, QuoteBlock, ListBlock, CalloutBlock,
} from './blocks';
import { newBlockId } from './blocks';
import { mdToBlocks } from './blocks-md';

// ── DOM → Block[] ─────────────────────────────────────────

export function htmlToBlocks(html: string): Block[] {
  const div = document.createElement('div');
  div.innerHTML = html;
  return childrenToBlocks(div);
}

/** Walk an element's children into blocks. Whitespace-only text nodes
 *  between blocks are ignored. Codex review B3: `elementToBlock`
 *  returns at most one block, so generic wrappers (`<div>` containing
 *  multiple paragraphs) used to silently drop siblings. We now flatten
 *  by inlining the wrapper's children directly. */
function childrenToBlocks(parent: Element): Block[] {
  const out: Block[] = [];
  for (const node of Array.from(parent.childNodes)) {
    if (node.nodeType === 3) {
      // Bare text at block level — wrap in a paragraph.
      const text = (node.textContent || '').trim();
      if (text) {
        const b: ParagraphBlock = {
          id: newBlockId(), kind: 'p', inline: [{ kind: 'text', text }],
        };
        out.push(b);
      }
      continue;
    }
    if (node.nodeType !== 1) continue;
    const el = node as Element;
    const tag = el.tagName.toLowerCase();
    // Codex review B3: flatten generic wrappers so paste of
    // `<div><p>a</p><p>b</p></div>` keeps both paragraphs.
    if ((tag === 'div' || tag === 'section') && !isRecognisedBlockClass(el)) {
      out.push(...childrenToBlocks(el));
      continue;
    }
    const blk = elementToBlock(el);
    if (blk) out.push(blk);
  }
  return out;
}

/** True when the wrapper class corresponds to a block kind we render
 *  with `data-block-id` and a known structural class. We must NOT
 *  flatten these — `elementToBlock` knows what to do with them. */
function isRecognisedBlockClass(el: Element): boolean {
  const cl = el.classList;
  return cl.contains('memola-todo') || cl.contains('memola-callout')
    || cl.contains('memola-itbl-wrap') || cl.contains('memola-linkdb')
    || cl.contains('memola-ai-block');
}

function elementToBlock(el: Element): Block | null {
  const tag = el.tagName.toLowerCase();

  // Codex review B1: round-trip the special blocks that
  // `blocksToHtml` produces. Without these branches, paste / migrate
  // through HTML silently lost image / table / linkdb / ai blocks.
  if (tag === 'img') {
    const src = el.getAttribute('src') || '';
    const alt = el.getAttribute('alt') || '';
    return { id: newBlockId(), kind: 'image', src, alt };
  }
  if (tag === 'div' && el.classList.contains('memola-itbl-wrap')) {
    const tblEl = el.querySelector<HTMLTableElement>('table.memola-itbl');
    if (!tblEl) return null;
    const hrow = tblEl.dataset.hrow === '1';
    const hcol = tblEl.dataset.hcol === '1';
    const rows: { kind: 'text'; text: string }[][][] = [];
    void rows;
    const cells: import('./blocks').Inline[][][] = [];
    for (const tr of Array.from(tblEl.querySelectorAll('tr'))) {
      const row: import('./blocks').Inline[][] = [];
      for (const td of Array.from(tr.children)) {
        row.push(walkInline(td));
      }
      cells.push(row);
    }
    return { id: newBlockId(), kind: 'table', hrow, hcol, rows: cells };
  }
  if (tag === 'div' && el.classList.contains('memola-linkdb')) {
    const dbId = el.getAttribute('data-db-id') || '';
    const view = (el.getAttribute('data-view') || 'table') as
      'table' | 'board' | 'list' | 'gallery' | 'calendar' | 'gantt';
    const filter = el.getAttribute('data-filter') || '';
    const sort = el.getAttribute('data-sort') || '';
    return { id: newBlockId(), kind: 'linkdb', dbId, view, filter, sort };
  }
  if (tag === 'div' && el.classList.contains('memola-ai-block')) {
    const action = el.getAttribute('data-aib-action') || '';
    const result = el.getAttribute('data-aib-result') || '';
    return { id: newBlockId(), kind: 'ai', prompt: action, result };
  }

  // ── Editor-specific block classes (checked before generic tag fallback) ──
  if (tag === 'div' && el.classList.contains('memola-todo')) {
    const cb = el.querySelector<HTMLInputElement>('.memola-todo-cb');
    const txt = el.querySelector('.memola-todo-txt');
    const b: TodoBlock = {
      id: newBlockId(),
      kind: 'todo',
      checked: !!(cb && cb.checked),
      inline: txt ? walkInline(txt) : [],
    };
    return b;
  }

  if (tag === 'div' && el.classList.contains('memola-callout')) {
    const ic = el.querySelector('.memola-callout-ic');
    const body = el.querySelector('.memola-callout-body');
    const b: CalloutBlock = {
      id: newBlockId(),
      kind: 'callout',
      emoji: (ic?.textContent || '💡').trim(),
      children: body ? childrenToBlocks(body) : [],
    };
    return b;
  }

  // ── Standard tags ──────────────────────────────────────
  if (tag === 'h1' || tag === 'h2' || tag === 'h3') {
    const b: HeadingBlock = {
      id: newBlockId(), kind: tag as 'h1' | 'h2' | 'h3', inline: walkInline(el),
    };
    return b;
  }

  if (tag === 'p') {
    const inline = walkInline(el);
    const b: ParagraphBlock = { id: newBlockId(), kind: 'p', inline };
    return b;
  }

  if (tag === 'pre') {
    // Editor wraps code in <pre><code class="language-…">…</code></pre>
    const codeEl = el.querySelector('code');
    const lang = codeEl?.className.replace(/^language-/, '') || '';
    const text = (codeEl?.textContent ?? el.textContent ?? '');
    const b: CodeBlock = { id: newBlockId(), kind: 'code', lang, text };
    return b;
  }

  if (tag === 'hr') {
    const b: RuleBlock = { id: newBlockId(), kind: 'rule' };
    return b;
  }

  if (tag === 'blockquote') {
    const b: QuoteBlock = {
      id: newBlockId(), kind: 'quote', children: childrenToBlocks(el),
    };
    return b;
  }

  if (tag === 'ul' || tag === 'ol') {
    const items: Block[][] = [];
    for (const li of Array.from(el.children)) {
      if (li.tagName.toLowerCase() !== 'li') continue;
      // Each <li> may contain block children OR raw inline content.
      // If it contains any block-level element, treat its children as
      // blocks; otherwise wrap the inline content in a single paragraph.
      const hasBlock = Array.from(li.children).some(
        (c) => /^(p|h\d|ul|ol|pre|blockquote|hr|div)$/i.test(c.tagName),
      );
      if (hasBlock) {
        items.push(childrenToBlocks(li));
      } else {
        const inline = walkInline(li);
        items.push([{ id: newBlockId(), kind: 'p', inline }]);
      }
    }
    const b: ListBlock = {
      id: newBlockId(), kind: 'list', ordered: tag === 'ol', items,
    };
    return b;
  }

  if (tag === 'div' || tag === 'section') {
    // Generic wrappers are flattened by `childrenToBlocks` (Codex
    // review B3) before reaching here. If we still see one (= came
    // through a path that bypassed the flattening), descend and
    // return the first child to avoid hitting the inline fallback.
    const inner = childrenToBlocks(el);
    return inner[0] || null;
  }

  // Unknown tag — treat as inline-bearing paragraph.
  const inline = walkInline(el);
  if (inline.length === 0) return null;
  const fallback: ParagraphBlock = { id: newBlockId(), kind: 'p', inline };
  return fallback;
}

// ── Inline walker ──────────────────────────────────────────

/** Walk a node's children producing inline tree. Handles emphasis,
 *  links, page links (`<a class="memola-page-link" data-page-id="…">`),
 *  inline code, and `<br>`. Unknown tags fall through to their text
 *  content. */
function walkInline(parent: Node): Inline[] {
  const out: Inline[] = [];
  for (const node of Array.from(parent.childNodes)) {
    if (node.nodeType === 3) {
      const t = node.textContent || '';
      if (t) out.push({ kind: 'text', text: t });
      continue;
    }
    if (node.nodeType !== 1) continue;
    const el = node as Element;
    const tag = el.tagName.toLowerCase();

    if (tag === 'br') {
      out.push({ kind: 'br' });
      continue;
    }

    if (tag === 'strong' || tag === 'b') {
      out.push({ kind: 'bold', children: walkInline(el) });
      continue;
    }
    if (tag === 'em' || tag === 'i') {
      out.push({ kind: 'italic', children: walkInline(el) });
      continue;
    }
    if (tag === 's' || tag === 'strike' || tag === 'del') {
      out.push({ kind: 'strike', children: walkInline(el) });
      continue;
    }
    if (tag === 'code') {
      out.push({ kind: 'code', text: el.textContent || '' });
      continue;
    }

    if (tag === 'a') {
      // Codex review B2: daily-note chip — distinguished by
      // `data-daily-date` (the legacy editor double-classes the chip
      // with both `memola-page-link` and `memola-daily-link`, so
      // sniff the data attribute, not just the class).
      const dailyDate = el.getAttribute('data-daily-date');
      if (dailyDate) {
        const alias = (el.textContent || '').trim() || undefined;
        out.push({ kind: 'dailylink', date: dailyDate, ...(alias ? { alias } : {}) });
        continue;
      }
      // Page-link chip: `<a class="memola-page-link" data-page-id="42">…</a>`
      if (el.classList.contains('memola-page-link')) {
        const pid = el.getAttribute('data-page-id') || '';
        const alias = (el.textContent || '').trim() || undefined;
        out.push({ kind: 'pagelink', pageId: pid, ...(alias ? { alias } : {}) });
        continue;
      }
      // Regular markdown link
      const href = el.getAttribute('href') || '';
      out.push({ kind: 'link', href, children: walkInline(el) });
      continue;
    }

    // Unknown tag → recurse into children (treat as transparent wrapper).
    out.push(...walkInline(el));
  }
  return out;
}

// ── Block[] → HTML ─────────────────────────────────────────

export function blocksToHtml(blocks: Block[]): string {
  return blocks.map(blockToHtml).join('');
}

/** Render a markdown string straight to HTML for read-only previews /
 *  exports (merge preview, drafts preview, page export, published Site
 *  Page). Combinator over `mdToBlocks` + `blocksToHtml` — previously
 *  re-declared identically in four call sites. NOT for the live editor
 *  (which renders from Block[] via controlled-rendering). */
export function mdToHtml(md: string): string {
  return blocksToHtml(mdToBlocks(md));
}

function blockToHtml(b: Block): string {
  switch (b.kind) {
    case 'p':
      return '<p>' + inlineToHtml(b.inline) + '</p>';
    case 'h1':
      return '<h1>' + inlineToHtml(b.inline) + '</h1>';
    case 'h2':
      return '<h2>' + inlineToHtml(b.inline) + '</h2>';
    case 'h3':
      return '<h3>' + inlineToHtml(b.inline) + '</h3>';
    case 'todo': {
      const checked = b.checked ? ' checked' : '';
      return '<div class="memola-todo">' +
        '<input type="checkbox" class="memola-todo-cb"' + checked + '>' +
        '<span class="memola-todo-txt">' + inlineToHtml(b.inline) + '</span>' +
        '</div>';
    }
    case 'rule':
      return '<hr>';
    case 'code': {
      const langAttr = b.lang ? ' class="language-' + b.lang + '"' : '';
      return '<pre><code' + langAttr + '>' + escapeHtmlText(b.text) + '</code></pre>';
    }
    case 'quote':
      return '<blockquote>' + blocksToHtml(b.children) + '</blockquote>';
    case 'callout':
      return '<div class="memola-callout">' +
        '<span class="memola-callout-ic">' + escapeHtmlText(b.emoji) + '</span>' +
        '<div class="memola-callout-body">' + blocksToHtml(b.children) + '</div>' +
        '</div>';
    case 'list': {
      const tag = b.ordered ? 'ol' : 'ul';
      const items = b.items.map((it) => {
        // If item contains exactly one paragraph, inline its content;
        // otherwise emit each child block.
        if (it.length === 1 && it[0].kind === 'p') {
          return '<li>' + inlineToHtml(it[0].inline) + '</li>';
        }
        return '<li>' + blocksToHtml(it) + '</li>';
      }).join('');
      return '<' + tag + '>' + items + '</' + tag + '>';
    }
    case 'image':
      return '<img src="' + escapeAttr(b.src) + '" alt="' + escapeAttr(b.alt) + '" class="memola-img">';
    case 'table':
    case 'linkdb':
    case 'ai':
      // Phase 2 editor-rewrite deferred — emit a stable HTML comment
      // marker so DOM round-trip stays predictable. The editor's
      // existing renderer (markdown.ts) handles the real rendering.
      return '<!-- block-tree:' + b.kind + ' id=' + b.id + ' -->';
  }
}

function inlineToHtml(inline: Inline[]): string {
  let out = '';
  for (const i of inline) {
    out += inlineOneToHtml(i);
  }
  return out;
}

function inlineOneToHtml(i: Inline): string {
  switch (i.kind) {
    case 'text':     return escapeHtmlText(i.text);
    case 'bold':     return '<strong>' + inlineToHtml(i.children) + '</strong>';
    case 'italic':   return '<em>' + inlineToHtml(i.children) + '</em>';
    case 'strike':   return '<s>' + inlineToHtml(i.children) + '</s>';
    case 'code':     return '<code>' + escapeHtmlText(i.text) + '</code>';
    case 'link':     return '<a href="' + escapeAttr(i.href) + '">' + inlineToHtml(i.children) + '</a>';
    case 'pagelink': {
      const txt = i.alias || i.pageId;
      return '<a class="memola-page-link" data-page-id="' + escapeAttr(i.pageId) + '">' +
        escapeHtmlText(txt) + '</a>';
    }
    case 'dailylink': {
      const txt = i.alias || i.date;
      return '<a class="memola-page-link memola-daily-link" data-daily-date="' + escapeAttr(i.date) + '">' +
        escapeHtmlText(txt) + '</a>';
    }
    case 'br':       return '<br>';
  }
}

function escapeHtmlText(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escapeAttr(s: string): string {
  return escapeHtmlText(s).replace(/"/g, '&quot;');
}
