// Block[] → DOM render for the controlled-rendering editor.
//
// Each top-level block becomes a wrapper element with `data-block-id`
// so the input dispatcher and selection mapper can locate it. The
// inline content is rendered via `renderInline` which mirrors the
// markdown subset's emphasis / link / page-link shapes.
//
// Render is INCREMENTAL — we re-use existing DOM nodes when their
// block id matches what's already rendered, and only update inline
// text where it diverges. This keeps the caret stable across small
// edits (each typed character only mutates the affected text node)
// and avoids gratuitous re-creates that would wipe selection state
// inside contenteditable=false islands (table / linkdb / ai).
//
// For Phase 2c-1 we render plain content blocks (paragraph, heading,
// todo, code, rule, quote, callout, list). Special islands (table /
// linkdb / ai) are deferred to Phase 2c-4.

import type { Block, Inline } from '../../lib/blocks';

/** Render `blocks` into `container`. Existing children whose
 *  data-block-id matches a block in `blocks` are reused; others are
 *  removed; new blocks are inserted at the right position. */
export function render(container: HTMLElement, blocks: Block[]): void {
  // Build a map of existing block-id → DOM element for reuse.
  const existing = new Map<string, HTMLElement>();
  Array.from(container.children).forEach((el) => {
    const id = (el as HTMLElement).dataset?.blockId;
    if (id) existing.set(id, el as HTMLElement);
  });

  // Walk blocks in order, appending / re-using DOM nodes.
  const used = new Set<string>();
  let cursor = 0;        // next position in `container`
  for (const b of blocks) {
    used.add(b.id);
    const reused = existing.get(b.id);
    let node: HTMLElement;
    if (reused) {
      // Re-use the existing node, updating its content if the block
      // has changed since the last render. We check the kind first
      // (a kind change = full replace) and inline second.
      if (reused.dataset.blockKind === b.kind) {
        updateBlockContent(reused, b);
        node = reused;
      } else {
        node = renderBlock(b);
        reused.replaceWith(node);
      }
    } else {
      node = renderBlock(b);
    }
    // Move into the right position
    const at = container.children[cursor];
    if (at !== node) {
      container.insertBefore(node, at || null);
    }
    cursor++;
  }
  // Remove any leftover children whose block id no longer appears.
  Array.from(container.children).slice(cursor).forEach((el) => el.remove());
  for (const [id, el] of existing) {
    if (!used.has(id) && el.isConnected) el.remove();
  }
}

/** Render a single block into a fresh element. Caller decides where
 *  to attach it; the element carries `data-block-id` and
 *  `data-block-kind` so subsequent renders can identify it. */
export function renderBlock(b: Block): HTMLElement {
  const el = document.createElement('div');
  el.dataset.blockId = b.id;
  el.dataset.blockKind = b.kind;
  el.dataset.blockHash = JSON.stringify(b);
  el.className = 'memola-blk memola-blk-' + b.kind;
  paintBlockContent(el, b);
  return el;
}

/** Update an existing block element to match a (potentially edited)
 *  block. We hash the block content and compare against the last
 *  rendered hash stored on the element — if unchanged, skip the
 *  repaint entirely (= preserves text nodes, which preserves the
 *  user's caret across no-op re-renders).
 *
 *  This is the cheapest stability guarantee: it doesn't try to do
 *  fine-grained inline-diff (which would let typing avoid full
 *  block repaints), but it does ensure that a render call with
 *  the SAME state is a true no-op at the DOM level. */
function updateBlockContent(el: HTMLElement, b: Block): void {
  const hash = JSON.stringify(b);
  if (el.dataset.blockHash === hash) return;
  el.dataset.blockHash = hash;
  paintBlockContent(el, b);
}

function paintBlockContent(el: HTMLElement, b: Block): void {
  el.innerHTML = '';
  switch (b.kind) {
    case 'p':
    case 'h1':
    case 'h2':
    case 'h3': {
      const inner = document.createElement(b.kind);
      renderInlineInto(inner, b.inline);
      el.appendChild(inner);
      break;
    }
    case 'todo': {
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.className = 'memola-todo-cb';
      cb.checked = b.checked;
      const txt = document.createElement('span');
      txt.className = 'memola-todo-txt';
      renderInlineInto(txt, b.inline);
      el.appendChild(cb);
      el.appendChild(txt);
      break;
    }
    case 'code': {
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      if (b.lang) code.className = 'language-' + b.lang;
      // Render newlines as `<br>` rather than literal `\n` in a single
      // text node — the browser doesn't give the caret a landing slot
      // past a trailing `\n` inside <pre>, so an empty trailing line
      // looks invisible. With `<br>` (matching the same trick as
      // paragraphs), the caret can sit on the empty next line and the
      // user actually sees it move.
      const lines = b.text.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i]) code.appendChild(document.createTextNode(lines[i]));
        if (i < lines.length - 1) code.appendChild(document.createElement('br'));
      }
      // Trailing-line placeholder. Without this, "abc\n" renders as
      // "abc<br>" and Chrome refuses to put the caret past the br
      // (same reason paragraphs need a placeholder br). For "abc\n"
      // the user pressed Enter and expected to see line 2 with the
      // caret on it — without the placeholder the caret stays on
      // line 1 visually until they type a character.
      if (b.text === '' || b.text.endsWith('\n')) {
        code.appendChild(document.createElement('br'));
      }
      pre.appendChild(code);
      el.appendChild(pre);
      break;
    }
    case 'rule': {
      const hr = document.createElement('hr');
      el.appendChild(hr);
      break;
    }
    case 'quote': {
      const inner = document.createElement('blockquote');
      const sub = document.createElement('div');
      render(sub, b.children);
      // Lift children directly into the blockquote
      while (sub.firstChild) inner.appendChild(sub.firstChild);
      el.appendChild(inner);
      break;
    }
    case 'callout': {
      const ic = document.createElement('span');
      ic.className = 'memola-callout-ic';
      ic.textContent = b.emoji;
      const body = document.createElement('div');
      body.className = 'memola-callout-body';
      render(body, b.children);
      el.appendChild(ic);
      el.appendChild(body);
      break;
    }
    case 'list': {
      // Each item's blocks are rendered with their own data-block-id
      // wrappers so the selection mapper can find them. This keeps
      // the architectural invariant "every block in state has a
      // data-block-id wrapper in DOM" — essential for caret
      // round-trip to work for blocks nested inside containers
      // (callout / quote / list).
      const list = document.createElement(b.ordered ? 'ol' : 'ul');
      for (const item of b.items) {
        const li = document.createElement('li');
        render(li, item);
        list.appendChild(li);
      }
      el.appendChild(list);
      break;
    }
    case 'table': {
      // Inline-table island. Render as a contenteditable=false wrapper;
      // the cells inside become contenteditable=true so the user can
      // type into them. Each cell mutation is propagated back to state
      // via `tableSetCell` on cell blur.
      el.contentEditable = 'false';
      const tbl = document.createElement('table');
      tbl.className = 'memola-itbl';
      tbl.dataset.hrow = b.hrow ? '1' : '0';
      tbl.dataset.hcol = b.hcol ? '1' : '0';
      // colgroup: emit per-column widths from `b.colWidths` so user-
      // set widths persist across renders. Missing entries leave the
      // <col> width unset (= auto layout per natural cell content).
      const cols = b.rows[0]?.length || 0;
      if (cols > 0) {
        const cg = document.createElement('colgroup');
        for (let i = 0; i < cols; i++) {
          const colEl = document.createElement('col');
          const w = b.colWidths?.[i];
          if (typeof w === 'number' && w > 0) colEl.style.width = w + 'px';
          cg.appendChild(colEl);
        }
        tbl.appendChild(cg);
      }
      const tbody = document.createElement('tbody');
      for (const row of b.rows) {
        const tr = document.createElement('tr');
        for (const cell of row) {
          const td = document.createElement('td');
          td.contentEditable = 'true';
          renderInlineInto(td, cell);
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
      tbl.appendChild(tbody);
      const wrap = document.createElement('div');
      wrap.className = 'memola-itbl-wrap';
      wrap.appendChild(tbl);
      el.appendChild(wrap);
      break;
    }
    case 'linkdb': {
      el.contentEditable = 'false';
      const inner = document.createElement('div');
      inner.className = 'memola-linkdb';
      inner.dataset.dbId = b.dbId;
      inner.dataset.view = b.view;
      if (b.filter) inner.dataset.filter = b.filter;
      if (b.sort) inner.dataset.sort = b.sort;
      el.appendChild(inner);
      // Defer live data population to the existing renderer.
      void import('../linked-db').then((m) => m.renderAllLinkedDbs(el));
      break;
    }
    case 'ai': {
      el.contentEditable = 'false';
      const inner = document.createElement('div');
      inner.className = 'memola-ai-block';
      inner.dataset.aibAction = b.prompt;
      inner.dataset.aibResult = b.result;
      el.appendChild(inner);
      // Defer button binding to the existing reattach helper.
      void import('../ai-block').then((m) => m.reattachAiBlocks(el));
      break;
    }
    case 'image': {
      // Block-level image. contenteditable=false so the user can't
      // type INTO it — they navigate around it with arrow keys, and
      // delete it with Backspace at the start of the next block.
      el.contentEditable = 'false';
      const img = document.createElement('img');
      img.src = b.src;
      img.alt = b.alt;
      img.className = 'memola-img';
      el.appendChild(img);
      break;
    }
  }
}

// ── Inline rendering ──────────────────────────────────────

function renderInlineInto(target: HTMLElement, inline: Inline[]): void {
  if (inline.length === 0) {
    // Empty paragraph — insert a <br> so the line is selectable
    target.appendChild(document.createElement('br'));
    return;
  }
  for (const i of inline) {
    target.appendChild(renderInlineNode(i));
  }
  // Trailing-br placeholder. When the inline run ends with a hard
  // break, the browser's contenteditable doesn't give the caret a
  // landing spot AFTER the br — IME composition then writes into
  // the previous text node, putting the new line on the wrong row.
  // A second `<br>` after the inline br creates the missing slot.
  // (Notion / ProseMirror use the same trick.) The extra br is NOT
  // tracked in state — `domOffsetToLogical` accumulates `+1` per
  // br, so the final placeholder is implicitly past `inlineLength`
  // and won't be reachable via state offsets.
  if (inline[inline.length - 1].kind === 'br') {
    target.appendChild(document.createElement('br'));
  }
}

function renderInlineNode(i: Inline): Node {
  switch (i.kind) {
    case 'text':
      return document.createTextNode(i.text);
    case 'br':
      return document.createElement('br');
    case 'code': {
      const c = document.createElement('code');
      c.textContent = i.text;
      return c;
    }
    case 'bold': {
      const s = document.createElement('strong');
      renderInlineInto(s, i.children);
      return s;
    }
    case 'italic': {
      const e = document.createElement('em');
      renderInlineInto(e, i.children);
      return e;
    }
    case 'strike': {
      const s = document.createElement('s');
      renderInlineInto(s, i.children);
      return s;
    }
    case 'link': {
      const a = document.createElement('a');
      a.href = i.href;
      renderInlineInto(a, i.children);
      return a;
    }
    case 'pagelink': {
      const a = document.createElement('a');
      a.className = 'memola-page-link';
      a.dataset.pageId = i.pageId;
      a.contentEditable = 'false';
      a.textContent = i.alias || i.pageId;
      return a;
    }
    case 'dailylink': {
      const a = document.createElement('a');
      // Both classes — `memola-page-link` for click routing parity with
      // the legacy editor; `memola-daily-link` for HTML-roundtrip
      // detection (blocks-html.ts).
      a.className = 'memola-page-link memola-daily-link';
      a.dataset.dailyDate = i.date;
      a.contentEditable = 'false';
      a.textContent = i.alias || i.date;
      return a;
    }
  }
}
