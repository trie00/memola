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
import { inlineToPlainText } from '../../lib/blocks';
import { escapeHtml } from '../../lib/html-escape';

/** Visual gap between the table edge and the hover +row/+col buttons.
 *  Notion-style: buttons stay visually attached to the table (no big
 *  separation). Combined with the hot-zone buffer below, the user can
 *  comfortably move the cursor from a cell to the button without it
 *  disappearing mid-motion. */
const BUTTON_GAP_PX = 4;
/** Extra buffer around the table where the buttons stay visible even
 *  though the mouse has technically left the cell rect. Without a buffer,
 *  the user trying to move from a cell to the +row/+col button would
 *  cross "background" pixels, the hide handler would fire, and the
 *  button would be gone before they could click it. */
const HOVER_BUFFER_PX = 36;
/** Grace period after the mouse leaves the table+buffer zone before the
 *  buttons actually disappear. Same intent as `HOVER_BUFFER_PX`: gives
 *  the user a moment to land on the button after a slightly imprecise
 *  hover. Re-entering the table or the button cancels the timer. */
const HIDE_GRACE_MS = 250;

/** Wire per-table hover buttons + cell-blur state sync + cell-level
 *  keyboard navigation (Enter / Tab / Arrow). Returns a destroy fn;
 *  idempotent — calling twice on the same root re-binds. */
export function attachTableHandlers(editor: Editor, rootEl: HTMLElement): () => void {
  // Single document-level mousemove delegate so we don't re-bind on
  // every render. The table elements live inside rootEl as
  // memola-itbl-wrap descendants of `[data-block-id]` blocks.
  // Track by blockId (not DOM reference) so the hover state survives
  // across re-renders. Cell edits trigger `tableSetCell` → mutation →
  // full table re-render → the previous DOM nodes are detached. A
  // detached node's `getBoundingClientRect()` is {0,0,0,0}, which would
  // make the coordinate-based hot-zone check fail and the buttons
  // would disappear during normal cell-to-cell typing.
  let _activeBlockId: string | null = null;
  let _hideTimer: ReturnType<typeof setTimeout> | null = null;

  const cancelHide = (): void => {
    if (_hideTimer) { clearTimeout(_hideTimer); _hideTimer = null; }
  };
  const scheduleHide = (): void => {
    if (_hideTimer) return;
    _hideTimer = setTimeout(() => {
      _hideTimer = null;
      hideButtons();
      _activeBlockId = null;
    }, HIDE_GRACE_MS);
  };

  /** Resolve the currently-active table's wrap element by re-querying
   *  via `_activeBlockId`. Returns null when the block has been
   *  deleted / re-rendered without the wrap, signalling the caller to
   *  drop hover state. */
  const resolveActiveWrap = (): HTMLElement | null => {
    if (!_activeBlockId) return null;
    const blockEl = rootEl.querySelector<HTMLElement>(
      '[data-block-id="' + cssEscape(_activeBlockId) + '"]',
    );
    return blockEl?.querySelector<HTMLElement>('.memola-itbl-wrap') || null;
  };

  // Use mousemove (not just mouseover) so we can do coordinate-based
  // hot-zone checks: the buttons stay visible when the mouse is anywhere
  // within the table rect ± HOVER_BUFFER_PX, not only over an actual
  // descendant element. This is what makes "move from cell to button"
  // possible without the button vanishing mid-motion.
  const onMouseMove = (e: MouseEvent): void => {
    // Resolve the actual element under the cursor: e.target is the
    // element the listener is attached to during mousemove, but for
    // coordinate-based hit testing we want whatever's at (clientX,
    // clientY). This also makes the handler work for synthetically-
    // dispatched events whose target is `document` (which has no
    // `.closest`).
    const t = (typeof document.elementFromPoint === 'function'
      ? document.elementFromPoint(e.clientX, e.clientY)
      : (e.target as Element | null)) as HTMLElement | null;
    // Hovering the button itself — keep visible, no timer churn.
    if (t && typeof t.closest === 'function' && t.closest('.memola-tbl-btn')) {
      cancelHide();
      return;
    }
    // Mouse over a wrap descendant — refresh which row/col is active
    // and clear any pending hide.
    const overWrap = (t && typeof t.closest === 'function')
      ? t.closest<HTMLElement>('.memola-itbl-wrap')
      : null;
    if (overWrap && rootEl.contains(overWrap)) {
      const blockEl = overWrap.closest<HTMLElement>('[data-block-id]');
      const blockId = blockEl?.dataset.blockId;
      if (blockId) {
        cancelHide();
        _activeBlockId = blockId;
        showButtons(overWrap, e.clientX, e.clientY);
        return;
      }
    }
    // Coordinate-based hot zone: even when mouseover target is the page
    // background, treat (table.rect ± HOVER_BUFFER_PX) as "still hovering".
    // Re-resolve the wrap via blockId so a recent re-render (= cell blur
    // → tableSetCell mutation) doesn't leave us with a detached node.
    const wrap = resolveActiveWrap();
    if (wrap) {
      const r = wrap.getBoundingClientRect();
      const inHotZone =
        e.clientX >= r.left - HOVER_BUFFER_PX &&
        e.clientX <= r.right + HOVER_BUFFER_PX &&
        e.clientY >= r.top - HOVER_BUFFER_PX &&
        e.clientY <= r.bottom + HOVER_BUFFER_PX;
      if (inHotZone) {
        cancelHide();
        showButtons(wrap, e.clientX, e.clientY);
        return;
      }
    }
    // Truly out — start the grace timer (if not already running).
    scheduleHide();
  };

  // Cell-level keyboard navigation. Captures Enter / Tab / Arrow keys
  // BEFORE they reach the editor's beforeinput / native contenteditable
  // handlers so that:
  //   - Enter moves the caret to the cell directly below (Notion / Excel
  //     convention). At the last row a fresh row is appended first.
  //   - Tab / Shift+Tab walks cells left-to-right, wrapping rows; at the
  //     last cell of the table, Tab appends a new row.
  //   - Arrow keys (Up / Down / Left / Right) navigate between cells when
  //     the caret is at the corresponding edge of the cell content.
  // Shift+Enter falls through to the browser's native `<br>` insertion so
  // multi-line cells still work.
  const onCellKeydown = (e: KeyboardEvent): void => {
    // First: when a table-cells range is the active selection, intercept
    // Backspace / Delete to clear the cells in the range. Without this
    // the keystroke falls through to native and either does nothing
    // (cell is contenteditable=false at the wrap level) or deletes from
    // a single anchor cell, ignoring the range.
    const cur = editor.getSelection();
    if (cur && cur.kind === 'table-cells'
      && (e.key === 'Backspace' || e.key === 'Delete')) {
      e.preventDefault();
      e.stopPropagation();
      clearCellRange(cur);
      return;
    }

    const t = e.target as HTMLElement | null;
    if (!t || t.tagName !== 'TD') return;
    const cell = t;
    if (!rootEl.contains(cell)) return;
    const pos = findCellPos(cell);
    if (!pos) return;

    if (e.isComposing || e.keyCode === 229) return;        // IME — let the browser handle

    const k = e.key;
    if (k === 'Enter' && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      e.stopPropagation();
      moveToCell(cell, pos.row + 1, pos.col, /*createIfMissing*/ 'row');
      return;
    }
    if (k === 'Tab') {
      e.preventDefault();
      e.stopPropagation();
      if (e.shiftKey) {
        if (pos.col > 0) moveToCell(cell, pos.row, pos.col - 1);
        else if (pos.row > 0) moveToCell(cell, pos.row - 1, lastColOf(cell));
        // else: at top-left — no-op
      } else {
        const lastCol = lastColOf(cell);
        if (pos.col < lastCol) moveToCell(cell, pos.row, pos.col + 1);
        else moveToCell(cell, pos.row + 1, 0, 'row');
      }
      return;
    }
    // Notion-style: ArrowUp / ArrowDown ALWAYS jump to the adjacent
    // cell, regardless of where the caret sits inside the current cell.
    // The "stay in cell to navigate within multi-line content" pattern
    // is uncommon in Notion-style table cells (which are usually single-
    // line). It also makes the navigation predictable: pressing Down
    // never lands you in a "left/right neighbour" or "previous row's
    // last cell" by accident, which the browser's native vertical
    // navigation can do inside a contenteditable=false table.
    if (k === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      if (pos.row < lastRowOf(cell)) moveToCell(cell, pos.row + 1, pos.col);
      return;
    }
    if (k === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      if (pos.row > 0) moveToCell(cell, pos.row - 1, pos.col);
      return;
    }
    if (k === 'ArrowLeft' && atCellStart(cell)) {
      e.preventDefault();
      e.stopPropagation();
      if (pos.col > 0) moveToCell(cell, pos.row, pos.col - 1);
      else if (pos.row > 0) moveToCell(cell, pos.row - 1, lastColOf(cell));
      return;
    }
    if (k === 'ArrowRight' && atCellEnd(cell)) {
      e.preventDefault();
      e.stopPropagation();
      const lastCol = lastColOf(cell);
      if (pos.col < lastCol) moveToCell(cell, pos.row, pos.col + 1);
      else if (pos.row < lastRowOf(cell)) moveToCell(cell, pos.row + 1, 0);
      return;
    }
  };

  /** Find which row/column index `td` occupies inside its `<tbody>`. */
  function findCellPos(td: HTMLElement): { tbody: HTMLElement; row: number; col: number } | null {
    const tr = td.parentElement;
    if (!tr || tr.tagName !== 'TR') return null;
    const tbody = tr.parentElement;
    if (!tbody || tbody.tagName !== 'TBODY') return null;
    const row = Array.from(tbody.children).indexOf(tr);
    const col = Array.from(tr.children).indexOf(td);
    if (row < 0 || col < 0) return null;
    return { tbody: tbody as HTMLElement, row, col };
  }

  function lastColOf(td: HTMLElement): number {
    const tr = td.parentElement as HTMLElement | null;
    return tr ? tr.children.length - 1 : 0;
  }
  function lastRowOf(td: HTMLElement): number {
    const tbody = td.parentElement?.parentElement as HTMLElement | null;
    return tbody ? tbody.children.length - 1 : 0;
  }

  /** Place caret at the END of `cell` and focus it. */
  function focusCellEnd(cell: HTMLElement): void {
    cell.focus();
    const range = document.createRange();
    range.selectNodeContents(cell);
    range.collapse(false);
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  /** Move caret from `fromCell` to (row, col). When the destination
   *  doesn't exist, optionally append a new row first (so Enter-at-
   *  last-row creates a new row Notion-style). */
  function moveToCell(
    fromCell: HTMLElement,
    row: number,
    col: number,
    createIfMissing?: 'row',
  ): void {
    const tbody = fromCell.parentElement?.parentElement as HTMLElement | null;
    if (!tbody) return;
    const blockEl = fromCell.closest<HTMLElement>('[data-block-id]');
    const blockId = blockEl?.dataset.blockId;
    const targetTr = tbody.children[row] as HTMLElement | undefined;
    if (targetTr) {
      const targetCell = targetTr.children[col] as HTMLElement | undefined;
      if (targetCell) {
        focusCellEnd(targetCell);
        return;
      }
      return;
    }
    if (createIfMissing === 'row' && blockId) {
      // Append a fresh row at the end of the table, then focus the new
      // cell. The mutation re-renders the table synchronously inside
      // applyMutation (paint() runs before the call returns), so the
      // new cell is already in the DOM by the time we look for it. We
      // use a microtask hop (Promise.resolve().then) instead of RAF so
      // background-tab throttling can't delay the focus call. We also
      // run it AFTER paint's `applySelection` has restored caret based
      // on the old block-level offset (which would otherwise land us on
      // the wrong cell): both happen in the same task, so the microtask
      // queued from this synchronous code runs after paint completes.
      editor.applyMutation((s) => tableAddRow(s, blockId, row), 'structural');
      void Promise.resolve().then(() => {
        const stillBlock = rootEl.querySelector<HTMLElement>(
          '[data-block-id="' + cssEscape(blockId) + '"]',
        );
        const stillTbody = stillBlock?.querySelector<HTMLElement>('tbody');
        const newCell = stillTbody?.children[row]?.children[col] as HTMLElement | undefined;
        if (newCell) focusCellEnd(newCell);
      });
    }
  }

  // ── Cell caret-position helpers ────────────────────
  // These tell us whether the caret is at the very start / end / first
  // line / last line of a cell. For single-line cells (the common case)
  // first==last line is always true. For multi-line cells with
  // `<br>`-separated visual lines, we check the caret's vertical
  // position against the cell's first/last line bounds.

  function atCellStart(cell: HTMLElement): boolean {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return false;
    const r = sel.getRangeAt(0);
    if (!r.collapsed) return false;
    const probe = document.createRange();
    probe.selectNodeContents(cell);
    probe.setEnd(r.startContainer, r.startOffset);
    return probe.toString().length === 0;
  }
  function atCellEnd(cell: HTMLElement): boolean {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return false;
    const r = sel.getRangeAt(0);
    if (!r.collapsed) return false;
    const probe = document.createRange();
    probe.selectNodeContents(cell);
    probe.setStart(r.endContainer, r.endOffset);
    return probe.toString().length === 0;
  }
  /** True when `cell` has at most a single visual line of content
   *  — meaning Up/Down arrow should *always* jump to the adjacent cell
   *  (there's nowhere "above" or "below" within this cell to go to).
   *  Detected as: no `<br>` and the cell's measured height fits in
   *  about one line. This catches both empty cells and short text. */
  function isSingleLineCell(cell: HTMLElement): boolean {
    if (cell.querySelector('br')) return false;
    const lineH = parseFloat(getComputedStyle(cell).lineHeight) || 20;
    const cellRect = cell.getBoundingClientRect();
    // Allow some slack for cell padding.
    return cellRect.height <= lineH * 1.8;
  }
  function atCellFirstLine(cell: HTMLElement): boolean {
    if (isSingleLineCell(cell)) return true;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return false;
    const caretRect = sel.getRangeAt(0).getBoundingClientRect();
    // Empty/zero rects (= caret in an empty text node) — treat as
    // first line so Up navigates correctly even on the empty case.
    if (caretRect.top === 0 && caretRect.bottom === 0) return true;
    const cellRect = cell.getBoundingClientRect();
    const lineH = parseFloat(getComputedStyle(cell).lineHeight) || 20;
    return caretRect.top - cellRect.top < lineH;
  }
  function atCellLastLine(cell: HTMLElement): boolean {
    if (isSingleLineCell(cell)) return true;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return false;
    const caretRect = sel.getRangeAt(0).getBoundingClientRect();
    if (caretRect.top === 0 && caretRect.bottom === 0) return true;
    const cellRect = cell.getBoundingClientRect();
    const lineH = parseFloat(getComputedStyle(cell).lineHeight) || 20;
    return cellRect.bottom - caretRect.bottom < lineH;
  }

  function cssEscape(s: string): string {
    if (typeof CSS !== 'undefined' && CSS.escape) return CSS.escape(s);
    return s.replace(/[^a-zA-Z0-9_-]/g, (ch) => '\\' + ch);
  }

  /** Clear the contents of every cell inside a `table-cells`
   *  selection. Single mutation = one undo step; selection collapses
   *  to a caret in the anchor cell so the user can keep typing. */
  function clearCellRange(sel: { kind: 'table-cells'; blockId: string; anchor: { row: number; col: number }; focus: { row: number; col: number } }): void {
    const r0 = Math.min(sel.anchor.row, sel.focus.row);
    const r1 = Math.max(sel.anchor.row, sel.focus.row);
    const c0 = Math.min(sel.anchor.col, sel.focus.col);
    const c1 = Math.max(sel.anchor.col, sel.focus.col);
    editor.applyMutation((s) => {
      const idx = s.blocks.findIndex((b) => b.id === sel.blockId);
      if (idx < 0) return s;
      const cur = s.blocks[idx];
      if (cur.kind !== 'table') return s;
      const newRows = cur.rows.map((row, ri) => {
        if (ri < r0 || ri > r1) return row;
        return row.map((cell, ci) => (ci < c0 || ci > c1) ? cell : []);
      });
      const blocks = s.blocks.slice();
      blocks[idx] = { ...cur, rows: newRows };
      // Collapse selection to a caret in the anchor cell so subsequent
      // typing has a sensible target.
      return { ...s, blocks, selection: null };
    }, 'delete');
    // Refocus the anchor cell so typing continues there.
    void Promise.resolve().then(() => {
      const blockEl = rootEl.querySelector<HTMLElement>(
        '[data-block-id="' + cssEscape(sel.blockId) + '"]',
      );
      const tbody = blockEl?.querySelector<HTMLElement>('tbody');
      const cell = tbody?.children[sel.anchor.row]?.children[sel.anchor.col] as HTMLElement | undefined;
      if (cell) {
        cell.focus();
        const range = document.createRange();
        range.selectNodeContents(cell);
        range.collapse(true);
        const ws = window.getSelection();
        if (ws) { ws.removeAllRanges(); ws.addRange(range); }
      }
    });
  }

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

  // ── Column resize (drag the right edge of a cell) ────
  // Within ~6 px of a cell's right edge we treat the mousedown as a
  // resize operation. While the button is held, mousemove updates the
  // table's `colWidths[colIdx]` via `applyMutation` — the renderer
  // emits the new width into the <col> element on the next paint.
  // mouseup ends the drag (and persists via the autosave subscriber).
  const RESIZE_HOTSPOT_PX = 6;
  let _resizeState: {
    blockId: string;
    colIdx: number;
    startX: number;
    startW: number;
  } | null = null;

  /** Are we within the resize-hotspot strip on the right edge of `cell`?
   *  Used by both the cursor hint and the actual mousedown trigger. */
  function nearRightEdge(cell: HTMLElement, clientX: number): boolean {
    const r = cell.getBoundingClientRect();
    const fromRight = r.right - clientX;
    return fromRight <= RESIZE_HOTSPOT_PX && fromRight >= -2;
  }

  const onTableMousedownResize = (e: MouseEvent): boolean => {
    if (e.button !== 0) return false;
    const t = e.target as HTMLElement | null;
    if (!t || typeof t.closest !== 'function') return false;
    const cell = t.closest<HTMLElement>('td');
    if (!cell || !rootEl.contains(cell)) return false;
    if (!nearRightEdge(cell, e.clientX)) return false;
    const pos = findCellPos(cell);
    const blockId = cell.closest<HTMLElement>('[data-block-id]')?.dataset.blockId;
    if (!pos || !blockId) return false;
    e.preventDefault();
    e.stopPropagation();
    _resizeState = {
      blockId,
      colIdx: pos.col,
      startX: e.clientX,
      startW: cell.offsetWidth,
    };
    document.body.style.cursor = 'col-resize';
    return true;
  };

  const onResizeMove = (e: MouseEvent): void => {
    if (!_resizeState) return;
    if ((e.buttons & 1) === 0) { onResizeUp(); return; }
    const dx = e.clientX - _resizeState.startX;
    const w = Math.max(60, _resizeState.startW + dx);
    const { blockId, colIdx } = _resizeState;
    editor.applyMutation((s) => {
      const idx = s.blocks.findIndex((b) => b.id === blockId);
      if (idx < 0) return s;
      const cur = s.blocks[idx];
      if (cur.kind !== 'table') return s;
      const cols = cur.rows[0]?.length || 0;
      const widths = (cur.colWidths || []).slice();
      while (widths.length < cols) widths.push(0);
      widths[colIdx] = w;
      const blocks = s.blocks.slice();
      blocks[idx] = { ...cur, colWidths: widths };
      return { ...s, blocks };
    }, 'structural');
  };

  const onResizeUp = (): void => {
    if (!_resizeState) return;
    _resizeState = null;
    document.body.style.cursor = '';
  };

  // Cursor hint: subtle col-resize cursor when hovering the right edge.
  const onResizeCursorHint = (e: MouseEvent): void => {
    const t = e.target as HTMLElement | null;
    if (!t || typeof t.closest !== 'function') return;
    const cell = t.closest<HTMLElement>('td');
    if (!cell || !rootEl.contains(cell)) return;
    cell.style.cursor = nearRightEdge(cell, e.clientX) ? 'col-resize' : '';
  };

  // ── Cell range selection (drag across cells) ─────────
  // mousedown on a cell records an "anchor"; subsequent mousemove
  // events with button-1 held that LAND ON A DIFFERENT CELL trigger a
  // `table-cells` selection — overriding the browser's default text-
  // selection behaviour. Single-click without drag falls through and
  // the browser's caret placement runs as normal.
  let _dragAnchor: { blockId: string; row: number; col: number } | null = null;
  let _dragging = false;

  const onTableMousedown = (e: MouseEvent): void => {
    if (e.button !== 0) return;
    // Resize takes precedence: if the mousedown is on the right-edge
    // hotspot of a cell, hand off to the resize path and skip the
    // range-select setup.
    if (onTableMousedownResize(e)) return;
    const t = e.target as HTMLElement | null;
    if (!t || typeof t.closest !== 'function') return;
    const cell = t.closest<HTMLElement>('td');
    if (!cell || !rootEl.contains(cell)) return;
    const pos = findCellPos(cell);
    const blockId = cell.closest<HTMLElement>('[data-block-id]')?.dataset.blockId;
    if (!pos || !blockId) return;
    _dragAnchor = { blockId, row: pos.row, col: pos.col };
    _dragging = false;
  };

  const onTableMousemoveForRange = (e: MouseEvent): void => {
    if (!_dragAnchor) return;
    if ((e.buttons & 1) === 0) { _dragAnchor = null; _dragging = false; return; }
    const t = e.target as HTMLElement | null;
    if (!t || typeof t.closest !== 'function') return;
    const cell = t.closest<HTMLElement>('td');
    if (!cell || !rootEl.contains(cell)) return;
    const pos = findCellPos(cell);
    const blockId = cell.closest<HTMLElement>('[data-block-id]')?.dataset.blockId;
    if (!pos || !blockId || blockId !== _dragAnchor.blockId) return;
    const sameAsAnchor = pos.row === _dragAnchor.row && pos.col === _dragAnchor.col;
    if (sameAsAnchor && !_dragging) return;
    if (!_dragging) {
      _dragging = true;
      // Take over from the browser's text-selection. From this moment
      // forward we own the visual indicator via `.memola-itbl-selcel`.
      const ws = window.getSelection();
      if (ws) ws.removeAllRanges();
    }
    e.preventDefault();
    const anchor = { row: _dragAnchor.row, col: _dragAnchor.col };
    const focus = { row: pos.row, col: pos.col };
    editor.applyMutation((s) => ({
      ...s,
      selection: { kind: 'table-cells' as const, blockId: _dragAnchor!.blockId, anchor, focus },
    }), 'selection');
  };

  const onTableMouseup = (): void => {
    _dragAnchor = null;
    // Keep `_dragging` so the next click that lands outside any cell
    // can detect "we just finished a range select" if needed; reset
    // whenever a fresh mousedown starts.
  };

  // Copy: when a `table-cells` selection is active, serialise the
  // rectangle as TSV (text/plain) + as a minimal HTML <table>. Same
  // shape as Excel / Sheets / legacy inline-table.
  const onCopy = (e: ClipboardEvent): void => {
    const sel = editor.getSelection();
    if (!sel || sel.kind !== 'table-cells') return;
    const block = editor.getBlocks().find((b) => b.id === sel.blockId);
    if (!block || block.kind !== 'table') return;
    const r0 = Math.min(sel.anchor.row, sel.focus.row);
    const r1 = Math.max(sel.anchor.row, sel.focus.row);
    const c0 = Math.min(sel.anchor.col, sel.focus.col);
    const c1 = Math.max(sel.anchor.col, sel.focus.col);
    const grid: string[][] = [];
    for (let r = r0; r <= r1; r++) {
      const row: string[] = [];
      for (let c = c0; c <= c1; c++) {
        const inline = block.rows[r]?.[c] || [];
        const text = inlineToPlainText(inline).replace(/\t/g, ' ').replace(/\n/g, ' ');
        row.push(text);
      }
      grid.push(row);
    }
    const tsv = grid.map((r) => r.join('\t')).join('\n');
    const html = '<table>' + grid.map((r) =>
      '<tr>' + r.map((c) => '<td>' + escapeHtml(c) + '</td>').join('') + '</tr>',
    ).join('') + '</table>';
    e.preventDefault();
    e.clipboardData?.setData('text/plain', tsv);
    e.clipboardData?.setData('text/html', html);
  };

  document.addEventListener('mousemove', onMouseMove);
  rootEl.addEventListener('blur', onCellBlur, true);
  // Capture-phase keydown so we run BEFORE editor2's own beforeinput /
  // contenteditable native handlers (which would otherwise insert a
  // <br> for Enter, advance the focus to the next focusable element
  // for Tab, etc).
  rootEl.addEventListener('keydown', onCellKeydown, true);
  rootEl.addEventListener('mousedown', onTableMousedown);
  rootEl.addEventListener('mousemove', onTableMousemoveForRange);
  rootEl.addEventListener('mousemove', onResizeCursorHint);
  document.addEventListener('mousemove', onResizeMove);
  document.addEventListener('mouseup', onTableMouseup);
  document.addEventListener('mouseup', onResizeUp);
  // Copy is a document-level event so both the editor body and the
  // surrounding overlay can capture it. We attach to document with
  // capture so we run before the browser's native copy.
  document.addEventListener('copy', onCopy, true);

  return (): void => {
    document.removeEventListener('mousemove', onMouseMove);
    rootEl.removeEventListener('blur', onCellBlur, true);
    rootEl.removeEventListener('keydown', onCellKeydown, true);
    rootEl.removeEventListener('mousedown', onTableMousedown);
    rootEl.removeEventListener('mousemove', onTableMousemoveForRange);
    rootEl.removeEventListener('mousemove', onResizeCursorHint);
    document.removeEventListener('mousemove', onResizeMove);
    document.removeEventListener('mouseup', onTableMouseup);
    document.removeEventListener('mouseup', onResizeUp);
    document.removeEventListener('copy', onCopy, true);
    cancelHide();
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

    // Find which row/col the cursor is over. When the cursor sits in
    // the hover buffer (just outside the table — e.g., heading toward
    // the +row/+col button) we clamp to the nearest edge row/col so
    // the buttons stay visible and target the last-hovered region.
    // Without this, a cursor at `tableRect.right + 2 px` would yield
    // `colIdx = -1` and showButtons would silently hide everything,
    // making it impossible to actually reach the button.
    const trs = Array.from(tbody.children) as HTMLElement[];
    let rowIdx = -1;
    for (let r = 0; r < trs.length; r++) {
      const rect = trs[r].getBoundingClientRect();
      if (y >= rect.top && y <= rect.bottom) { rowIdx = r; break; }
    }
    if (rowIdx < 0 && trs.length > 0) {
      const firstRect = trs[0].getBoundingClientRect();
      const lastRect = trs[trs.length - 1].getBoundingClientRect();
      if (y < firstRect.top) rowIdx = 0;
      else if (y > lastRect.bottom) rowIdx = trs.length - 1;
    }
    const firstRow = trs[0];
    const cells = firstRow ? Array.from(firstRow.children) as HTMLElement[] : [];
    let colIdx = -1;
    for (let c = 0; c < cells.length; c++) {
      const rect = cells[c].getBoundingClientRect();
      if (x >= rect.left && x <= rect.right) { colIdx = c; break; }
    }
    if (colIdx < 0 && cells.length > 0) {
      const firstRect = cells[0].getBoundingClientRect();
      const lastRect = cells[cells.length - 1].getBoundingClientRect();
      if (x < firstRect.left) colIdx = 0;
      else if (x > lastRect.right) colIdx = cells.length - 1;
    }

    // +col button: appears at the right edge of the table, vertically
    // centred on the hovered row. Geometric intuition: extending
    // horizontally → adds a column to the right of the hovered column.
    // Uses BUTTON_GAP_PX (10px) gap; the mousemove hot-zone buffer
    // is large enough that the button stays visible while the user
    // moves from cell → button.
    const addColBtn = ensureButton('add-col', '+', '列を追加');
    if (rowIdx >= 0 && colIdx >= 0 && trs[rowIdx] && cells[colIdx]) {
      const rr = trs[rowIdx].getBoundingClientRect();
      const tr = tbl.getBoundingClientRect();
      addColBtn.style.top = (rr.top + window.scrollY + (rr.height - 20) / 2) + 'px';
      addColBtn.style.left = (tr.right + window.scrollX + BUTTON_GAP_PX) + 'px';
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
      addRowBtn.style.top = (tr.bottom + window.scrollY + BUTTON_GAP_PX) + 'px';
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
