// Table-block UX: hover-revealed +row / +col / -row / -col buttons,
// plus per-cell input → state.tableSetCell synchronisation.
//
// Tables in editor2 render as `contenteditable=false` islands with
// internal `contenteditable=true` cells. The browser handles cell
// typing natively (caret / IME / undo all just work). On blur of a
// cell we capture its inline content and push it into state via
// `tableSetCell` so the canonical Block[] stays in sync.

import type { Editor } from './editor2';
import {
  tableAddRow, tableAddCol, tableRemoveRow, tableRemoveCol, tableSetCell,
} from './editor-state';
import type { Inline } from '../../lib/blocks';

/** Wire per-table hover buttons + cell-blur state sync. Returns a
 *  destroy fn; idempotent — calling twice on the same root re-binds. */
export function attachTableHandlers(editor: Editor, rootEl: HTMLElement): () => void {
  // Single document-level mouseover delegate so we don't re-bind on
  // every render. The table elements live inside rootEl as
  // memola-itbl-wrap descendants of `[data-block-id]` blocks.
  // Codex review U2: when the cursor moves OVER the +/× buttons
  // themselves they are not inside any `.memola-itbl-wrap`, so the
  // previous code immediately hid them — making them un-clickable.
  // Treat the button itself as "still hovering the active table".
  const onMouseOver = (e: MouseEvent): void => {
    const t = e.target as HTMLElement | null;
    if (!t) return;
    if (t.closest('.memola-tbl-btn')) return;     // hovering a button — keep current state
    const wrap = t.closest<HTMLElement>('.memola-itbl-wrap');
    if (!wrap) {
      hideButtons();
      return;
    }
    if (!rootEl.contains(wrap)) return;
    showButtons(wrap, e.clientX, e.clientY);
  };

  const onCellBlur = (e: FocusEvent): void => {
    const cell = e.target as HTMLElement | null;
    if (!cell || cell.tagName !== 'TD') return;
    const tr = cell.parentElement as HTMLElement | null;
    const tbody = tr?.parentElement as HTMLElement | null;
    const tbl = tbody?.parentElement as HTMLElement | null;
    const blockEl = tbl?.closest<HTMLElement>('[data-block-id]');
    if (!blockEl || !blockEl.dataset.blockId || !tr) return;
    const blockId = blockEl.dataset.blockId;
    const rowIdx = Array.from(tbody!.children).indexOf(tr);
    const colIdx = Array.from(tr.children).indexOf(cell);
    if (rowIdx < 0 || colIdx < 0) return;
    const inline = readCellInline(cell);
    // Codex review U5: skip the mutation when the cell value didn't
    // change. Without this, every focus shift (clicking another cell,
    // tabbing away) creates an undo entry and bumps the autosave
    // scheduler with an effectively no-op edit.
    const blocks = editor.getBlocks();
    const cur = blocks.find((b) => b.id === blockId);
    if (cur && cur.kind === 'table') {
      const prev = cur.rows[rowIdx]?.[colIdx];
      if (prev && JSON.stringify(prev) === JSON.stringify(inline)) return;
    }
    editor.applyMutation((s) => tableSetCell(s, blockId, rowIdx, colIdx, inline), 'typing');
  };

  document.addEventListener('mouseover', onMouseOver);
  rootEl.addEventListener('blur', onCellBlur, true);

  return (): void => {
    document.removeEventListener('mouseover', onMouseOver);
    rootEl.removeEventListener('blur', onCellBlur, true);
    // Codex review U8: hide isn't enough — the elements would
    // accumulate in the overlay across editor remounts. Remove them.
    ['add-row', 'add-col', 'rm-row', 'rm-col'].forEach((cls) => {
      document.getElementById('memola-tbl-' + cls)?.remove();
    });
  };

  // ── hover button rendering ─────────────────────────

  function ensureButton(cls: string, label: string, title: string): HTMLElement {
    let btn = document.getElementById('memola-tbl-' + cls);
    if (btn) return btn;
    btn = document.createElement('button');
    btn.id = 'memola-tbl-' + cls;
    btn.className = 'memola-tbl-btn memola-tbl-' + cls;
    btn.style.cssText = 'position:absolute; z-index:2147483646; background:#fff; border:1px solid #e9e9e7; border-radius:4px; cursor:pointer; padding:2px 6px; font-size:14px; line-height:1; color:#9b9a97; box-shadow:0 1px 3px rgba(0,0,0,0.08); display:none;';
    btn.textContent = label;
    btn.title = title;
    (document.getElementById('memola-overlay') || document.body).appendChild(btn);
    return btn;
  }

  function hideButtons(): void {
    ['add-row', 'add-col', 'rm-row', 'rm-col'].forEach((cls) => {
      const b = document.getElementById('memola-tbl-' + cls);
      if (b) b.style.display = 'none';
    });
  }

  function showButtons(wrap: HTMLElement, x: number, y: number): void {
    const blockEl = wrap.closest<HTMLElement>('[data-block-id]');
    const blockId = blockEl?.dataset.blockId;
    if (!blockId) return;
    const tbl = wrap.querySelector<HTMLElement>('table');
    if (!tbl) return;
    const tbody = tbl.querySelector<HTMLElement>('tbody');
    if (!tbody) return;

    // Find which row/col the cursor is over (or the closest if between)
    const trs = Array.from(tbody.children) as HTMLElement[];
    let rowIdx = -1;
    for (let r = 0; r < trs.length; r++) {
      const rect = trs[r].getBoundingClientRect();
      if (y >= rect.top && y <= rect.bottom) { rowIdx = r; break; }
    }
    const firstRow = trs[0];
    const cells = firstRow ? Array.from(firstRow.children) as HTMLElement[] : [];
    let colIdx = -1;
    for (let c = 0; c < cells.length; c++) {
      const rect = cells[c].getBoundingClientRect();
      if (x >= rect.left && x <= rect.right) { colIdx = c; break; }
    }

    // +col button: appears at the right edge of the table, vertically
    // centred on the hovered row. Geometric intuition: extending
    // horizontally → adds a column to the right of the hovered column.
    const addColBtn = ensureButton('add-col', '+', '列を追加');
    if (rowIdx >= 0 && colIdx >= 0 && trs[rowIdx] && cells[colIdx]) {
      const rr = trs[rowIdx].getBoundingClientRect();
      const tr = tbl.getBoundingClientRect();
      addColBtn.style.top = (rr.top + window.scrollY + (rr.height - 20) / 2) + 'px';
      addColBtn.style.left = (tr.right + window.scrollX + 4) + 'px';
      addColBtn.style.display = 'block';
      addColBtn.onclick = () => {
        editor.applyMutation((s) => tableAddCol(s, blockId, colIdx + 1), 'structural');
        hideButtons();
      };
    } else {
      addColBtn.style.display = 'none';
    }

    // +row button: appears at the bottom of the table, horizontally
    // centred on the hovered column. Geometric intuition: extending
    // vertically → adds a row below the hovered row.
    const addRowBtn = ensureButton('add-row', '+', '行を追加');
    if (rowIdx >= 0 && colIdx >= 0 && cells[colIdx]) {
      const cr = cells[colIdx].getBoundingClientRect();
      const tr = tbl.getBoundingClientRect();
      addRowBtn.style.top = (tr.bottom + window.scrollY + 4) + 'px';
      addRowBtn.style.left = (cr.left + window.scrollX + (cr.width - 20) / 2) + 'px';
      addRowBtn.style.display = 'block';
      addRowBtn.onclick = () => {
        editor.applyMutation((s) => tableAddRow(s, blockId, rowIdx + 1), 'structural');
        hideButtons();
      };
    } else {
      addRowBtn.style.display = 'none';
    }

    // -row / -col buttons: small ✕ in the row/col header. Only show
    // when there's more than one row/col (else the action is a no-op).
    const rmRowBtn = ensureButton('rm-row', '✕', '行を削除');
    if (rowIdx >= 0 && trs.length > 1) {
      const rr = trs[rowIdx].getBoundingClientRect();
      rmRowBtn.style.top = (rr.top + window.scrollY + (rr.height - 18) / 2) + 'px';
      rmRowBtn.style.left = (rr.left + window.scrollX - 22) + 'px';
      rmRowBtn.style.display = 'block';
      rmRowBtn.onclick = () => {
        editor.applyMutation((s) => tableRemoveRow(s, blockId, rowIdx), 'structural');
        hideButtons();
      };
    } else {
      rmRowBtn.style.display = 'none';
    }

    const rmColBtn = ensureButton('rm-col', '✕', '列を削除');
    if (colIdx >= 0 && cells.length > 1) {
      const cr = cells[colIdx].getBoundingClientRect();
      rmColBtn.style.top = (cr.top + window.scrollY - 22) + 'px';
      rmColBtn.style.left = (cr.left + window.scrollX + (cr.width - 16) / 2) + 'px';
      rmColBtn.style.display = 'block';
      rmColBtn.onclick = () => {
        editor.applyMutation((s) => tableRemoveCol(s, blockId, colIdx), 'structural');
        hideButtons();
      };
    } else {
      rmColBtn.style.display = 'none';
    }
  }
}

/** Walk a `<td>`'s child nodes back into Inline[]. Mirrors
 *  `renderInlineInto` in editor-render.ts but inverse.
 *
 *  Critical normalisation: `renderInlineInto` appends a placeholder
 *  `<br>` to empty inline targets so the line stays selectable. That
 *  placeholder is purely visual — it is NOT meant to round-trip into
 *  the block model. Without this filter, a click on a cell whose
 *  content is empty would blur the previously-focused cell (also
 *  empty), `walkChildren` would read its `<br>` placeholder as
 *  `[{kind:'br'}]`, `tableSetCell` would persist that, and the next
 *  render would treat the cell as non-empty: `renderInlineInto`'s
 *  trailing-br branch appends a SECOND `<br>` after the existing one,
 *  visibly inserting a line break. Repeated clicks would accumulate
 *  more brs. The user sees this as "clicking on the table inserts a
 *  line break in the top-left header". */
function readCellInline(cell: HTMLElement): Inline[] {
  const out = walkChildren(cell);
  if (out.length === 1 && out[0].kind === 'br') return [];
  return out;
}

function walkChildren(parent: Node): Inline[] {
  const out: Inline[] = [];
  for (const n of Array.from(parent.childNodes)) {
    if (n.nodeType === 3) {
      const t = n.textContent || '';
      if (t) out.push({ kind: 'text', text: t });
      continue;
    }
    if (n.nodeType !== 1) continue;
    const el = n as HTMLElement;
    const tag = el.tagName.toLowerCase();
    if (tag === 'br') { out.push({ kind: 'br' }); continue; }
    if (tag === 'strong' || tag === 'b') {
      out.push({ kind: 'bold', children: walkChildren(el) }); continue;
    }
    if (tag === 'em' || tag === 'i') {
      out.push({ kind: 'italic', children: walkChildren(el) }); continue;
    }
    if (tag === 's' || tag === 'strike' || tag === 'del') {
      out.push({ kind: 'strike', children: walkChildren(el) }); continue;
    }
    if (tag === 'code') {
      out.push({ kind: 'code', text: el.textContent || '' }); continue;
    }
    if (tag === 'a' && el.classList.contains('memola-page-link')) {
      const pid = el.getAttribute('data-page-id') || '';
      const alias = (el.textContent || '').trim();
      if (pid) {
        out.push({ kind: 'pagelink', pageId: pid,
          ...(alias && alias !== pid ? { alias } : {}) });
        continue;
      }
    }
    // Generic — recurse into children, flattening
    out.push(...walkChildren(el));
  }
  return out;
}
