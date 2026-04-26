// Notion-like inline table block.
//   - Inserted via slash menu /table
//   - Default 3 cols × 2 rows (1 header + 1 body)
//   - Each cell is contenteditable
//   - Tab / Shift+Tab moves caret across cells
//   - Hover row → "+" at right end to insert row below
//   - Hover col header → "+" below to insert col after
//   - Row/col delete via context-style buttons on hover
//   - Markdown roundtrip: GFM pipe table

import { S } from '../state';
import { setSave } from './ui-helpers';
import { schedSave } from './actions';
import { getEd } from './dom';

/** Build a fresh table DOM (no header by default; 3 cols × 2 body rows). */
export function buildTable(cols = 3, rows = 2): HTMLDivElement {
  const wrap = document.createElement('div');
  wrap.className = 'n365-itbl-wrap';
  wrap.contentEditable = 'false';
  const tbl = document.createElement('table');
  tbl.className = 'n365-itbl';
  // colgroup for column widths
  const cg = document.createElement('colgroup');
  for (let i = 0; i < cols; i++) cg.appendChild(document.createElement('col'));
  tbl.appendChild(cg);
  // body rows only — no thead by default
  const tbody = document.createElement('tbody');
  for (let r = 0; r < rows; r++) {
    const tr = document.createElement('tr');
    for (let c = 0; c < cols; c++) {
      const td = document.createElement('td');
      td.contentEditable = 'true';
      td.appendChild(document.createElement('br'));
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  tbl.appendChild(tbody);
  wrap.appendChild(tbl);
  attachTableHandlers(wrap);
  return wrap;
}

/** Add Tab/Shift+Tab navigation, hover +/- buttons. */
export function attachTableHandlers(wrap: HTMLElement): void {
  if (wrap.dataset.itblWired === '1') return;
  wrap.dataset.itblWired = '1';

  const tbl = wrap.querySelector('table.n365-itbl') as HTMLTableElement | null;
  if (!tbl) return;

  // Tab navigation across cells
  tbl.addEventListener('keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.isComposing || ke.keyCode === 229) return;
    const cell = (e.target as HTMLElement).closest('th,td') as HTMLTableCellElement | null;
    if (!cell) return;
    if (ke.key === 'Tab') {
      e.preventDefault();
      moveCell(cell, ke.shiftKey ? -1 : 1);
      return;
    }
    if (ke.key === 'Enter' && !ke.shiftKey && !ke.metaKey && !ke.ctrlKey) {
      // Enter: move to cell below; if last row, add a row
      e.preventDefault();
      const tr = cell.parentElement as HTMLTableRowElement;
      const tbody = tr.parentElement;
      if (tbody && tbody.tagName === 'TBODY' && tr === tbody.lastElementChild) {
        addRowAfter(tr);
      } else {
        moveDown(cell);
      }
    }
  });

  // Bubble input → mark dirty
  tbl.addEventListener('input', () => {
    S.dirty = true; setSave('未保存'); schedSave();
  });

  // Hover row/col buttons (lightweight: rebuild on each enter)
  installHoverButtons(wrap);
  // Notion-style: column resize via drag on cell right edge
  installColumnResize(tbl);
  // Notion-style: cell range selection via drag
  installRangeSelection(tbl);
}

// ── Column resize ──────────────────────────────────────
function installColumnResize(tbl: HTMLTableElement): void {
  if (tbl.dataset.itblResize === '1') return;
  tbl.dataset.itblResize = '1';
  // pointermove for cursor hint + mousedown on right edge → drag
  tbl.addEventListener('mousedown', (e) => {
    const cell = (e.target as HTMLElement).closest('th,td') as HTMLTableCellElement | null;
    if (!cell) return;
    const rect = cell.getBoundingClientRect();
    const fromRight = rect.right - e.clientX;
    if (fromRight > 6 || fromRight < -2) return;
    e.preventDefault();
    e.stopPropagation();
    const colIdx = Array.from(cell.parentElement!.children).indexOf(cell);
    const cg = tbl.querySelector('colgroup');
    if (!cg) return;
    const maybeColEl = cg.children[colIdx];
    if (!maybeColEl) return;
    const colEl: HTMLTableColElement = maybeColEl as HTMLTableColElement;
    const startW = cell.offsetWidth;
    const startX = e.clientX;
    document.body.style.cursor = 'col-resize';
    function onMove(ev: MouseEvent): void {
      const dx = ev.clientX - startX;
      const w = Math.max(60, startW + dx);
      colEl.style.width = w + 'px';
    }
    function onUp(): void {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      S.dirty = true; setSave('未保存'); schedSave();
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
  tbl.addEventListener('mousemove', (e) => {
    const cell = (e.target as HTMLElement).closest('th,td') as HTMLTableCellElement | null;
    if (!cell) return;
    const rect = cell.getBoundingClientRect();
    const fromRight = rect.right - e.clientX;
    cell.style.cursor = (fromRight > 6 || fromRight < -2) ? '' : 'col-resize';
  });
}

// ── Cell range selection ───────────────────────────────
function installRangeSelection(tbl: HTMLTableElement): void {
  if (tbl.dataset.itblRangeSel === '1') return;
  tbl.dataset.itblRangeSel = '1';
  let anchor: HTMLTableCellElement | null = null;
  let dragging = false;
  function clearSel(): void {
    tbl.querySelectorAll('.n365-itbl-selected').forEach((c) => c.classList.remove('n365-itbl-selected'));
  }
  function applyRange(a: HTMLTableCellElement, b: HTMLTableCellElement): void {
    const aRow = (a.parentElement as HTMLTableRowElement).rowIndex;
    const bRow = (b.parentElement as HTMLTableRowElement).rowIndex;
    const aCol = a.cellIndex;
    const bCol = b.cellIndex;
    const r0 = Math.min(aRow, bRow), r1 = Math.max(aRow, bRow);
    const c0 = Math.min(aCol, bCol), c1 = Math.max(aCol, bCol);
    clearSel();
    for (let r = r0; r <= r1; r++) {
      const row = tbl.rows[r];
      if (!row) continue;
      for (let c = c0; c <= c1; c++) {
        const cell = row.children[c];
        if (cell) cell.classList.add('n365-itbl-selected');
      }
    }
  }
  tbl.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    // Skip if it's a resize-edge mousedown
    const cell = (e.target as HTMLElement).closest('th,td') as HTMLTableCellElement | null;
    if (!cell) return;
    const rect = cell.getBoundingClientRect();
    const fromRight = rect.right - e.clientX;
    if (fromRight <= 6 && fromRight >= -2) return;        // resize takes precedence
    anchor = cell;
    dragging = false;
    clearSel();
  });
  tbl.addEventListener('mousemove', (e) => {
    if (!anchor) return;
    if ((e.buttons & 1) === 0) { anchor = null; return; }
    const cell = (e.target as HTMLElement).closest('th,td') as HTMLTableCellElement | null;
    if (!cell || cell === anchor && !dragging) return;
    if (cell !== anchor) {
      dragging = true;
      // Once we start range-selecting, prevent the contenteditable text-selection
      const sel = window.getSelection();
      if (sel) sel.removeAllRanges();
      e.preventDefault();
      applyRange(anchor, cell);
    }
  });
  document.addEventListener('mouseup', () => {
    anchor = null;
    // dragging stays: kept until next mousedown so user can copy
  });
  // Click outside the table clears the selection
  document.addEventListener('mousedown', (e) => {
    if (!tbl.contains(e.target as Node)) clearSel();
  });
  // Copy selected range as TSV
  tbl.addEventListener('copy', (e) => {
    const cells = Array.from(tbl.querySelectorAll<HTMLTableCellElement>('.n365-itbl-selected'));
    if (cells.length === 0) return;
    const rows = new Map<number, HTMLTableCellElement[]>();
    cells.forEach((c) => {
      const ri = (c.parentElement as HTMLTableRowElement).rowIndex;
      if (!rows.has(ri)) rows.set(ri, []);
      rows.get(ri)!.push(c);
    });
    const sorted = Array.from(rows.entries()).sort((a, b) => a[0] - b[0]);
    const tsv = sorted.map(([, rcells]) =>
      rcells.sort((a, b) => a.cellIndex - b.cellIndex)
        .map((c) => (c.textContent || '').replace(/\t/g, ' ').replace(/\n/g, ' ')).join('\t'),
    ).join('\n');
    e.preventDefault();
    e.clipboardData?.setData('text/plain', tsv);
    e.clipboardData?.setData('text/html',
      '<table>' + sorted.map(([, rcells]) =>
        '<tr>' + rcells.map((c) => '<td>' + (c.textContent || '') + '</td>').join('') + '</tr>',
      ).join('') + '</table>',
    );
  });
}

function moveCell(cell: HTMLTableCellElement, dir: 1 | -1): void {
  const tr = cell.parentElement as HTMLTableRowElement;
  const cells = Array.from(tr.children) as HTMLTableCellElement[];
  const idx = cells.indexOf(cell);
  let next: HTMLTableCellElement | null = cells[idx + dir] || null;
  if (!next) {
    // Wrap to next/prev row
    const sibRow = (dir === 1 ? tr.nextElementSibling : tr.previousElementSibling) as HTMLTableRowElement | null;
    if (sibRow) {
      const sibCells = Array.from(sibRow.children) as HTMLTableCellElement[];
      next = dir === 1 ? sibCells[0] : sibCells[sibCells.length - 1];
    } else if (dir === 1) {
      // last cell in last row → add row
      const tbody = tr.parentElement;
      if (tbody && tbody.tagName === 'TBODY') {
        const newTr = addRowAfter(tr);
        next = newTr.firstElementChild as HTMLTableCellElement;
      }
    }
  }
  if (next) focusCell(next);
}

function moveDown(cell: HTMLTableCellElement): void {
  const tr = cell.parentElement as HTMLTableRowElement;
  const cells = Array.from(tr.children) as HTMLTableCellElement[];
  const idx = cells.indexOf(cell);
  const nextRow = tr.nextElementSibling as HTMLTableRowElement | null;
  if (!nextRow) return;
  const target = nextRow.children[idx] as HTMLTableCellElement | undefined;
  if (target) focusCell(target);
}

function focusCell(cell: HTMLTableCellElement): void {
  cell.focus();
  // Place caret at end of cell content
  const sel = window.getSelection();
  const r = document.createRange();
  r.selectNodeContents(cell);
  r.collapse(false);
  if (sel) { sel.removeAllRanges(); sel.addRange(r); }
}

function addRowAfter(tr: HTMLTableRowElement): HTMLTableRowElement {
  const cols = tr.children.length;
  const newTr = document.createElement('tr');
  for (let i = 0; i < cols; i++) {
    const td = document.createElement('td');
    td.contentEditable = 'true';
    td.appendChild(document.createElement('br'));
    newTr.appendChild(td);
  }
  tr.parentElement!.insertBefore(newTr, tr.nextSibling);
  S.dirty = true; setSave('未保存'); schedSave();
  return newTr;
}

function addColAfter(tbl: HTMLTableElement, colIdx: number): void {
  const cg = tbl.querySelector('colgroup');
  if (cg) {
    const col = document.createElement('col');
    cg.insertBefore(col, cg.children[colIdx + 1] || null);
  }
  Array.from(tbl.rows).forEach((row) => {
    const ref = row.children[colIdx + 1] || null;
    const isHeaderRow = row.parentElement?.tagName === 'THEAD';
    const cell = document.createElement(isHeaderRow ? 'th' : 'td');
    cell.contentEditable = 'true';
    cell.appendChild(document.createElement('br'));
    row.insertBefore(cell, ref);
  });
  S.dirty = true; setSave('未保存'); schedSave();
}

function deleteRow(tr: HTMLTableRowElement): void {
  const parent = tr.parentElement;
  if (!parent) return;
  // 最低 1 行残す
  const tbl = tr.closest('table');
  const totalRows = tbl ? tbl.rows.length : 1;
  if (totalRows <= 1) return;
  tr.remove();
  S.dirty = true; setSave('未保存'); schedSave();
}

function deleteCol(tbl: HTMLTableElement, colIdx: number): void {
  const cols = (tbl.rows[0]?.children.length) || 0;
  if (cols <= 1) return;                                   // 最低 1 列残す
  const cg = tbl.querySelector('colgroup');
  if (cg && cg.children[colIdx]) cg.children[colIdx].remove();
  Array.from(tbl.rows).forEach((row) => {
    const c = row.children[colIdx];
    if (c) c.remove();
  });
  S.dirty = true; setSave('未保存'); schedSave();
}

function installHoverButtons(wrap: HTMLElement): void {
  const tbl = wrap.querySelector('table.n365-itbl') as HTMLTableElement | null;
  if (!tbl) return;
  const rowBtn  = document.createElement('button');
  rowBtn.className = 'n365-itbl-addrow';
  rowBtn.type = 'button';
  rowBtn.textContent = '＋';
  rowBtn.title = '行を追加';
  const colBtn  = document.createElement('button');
  colBtn.className = 'n365-itbl-addcol';
  colBtn.type = 'button';
  colBtn.textContent = '＋';
  colBtn.title = '列を追加';
  wrap.append(rowBtn, colBtn);

  rowBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const lastRow = tbl.tBodies[0]?.lastElementChild as HTMLTableRowElement | null
      || tbl.tHead?.rows[0] as HTMLTableRowElement | null;
    if (lastRow) {
      const newTr = addRowAfter(lastRow);
      focusCell(newTr.firstElementChild as HTMLTableCellElement);
    }
  });
  colBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const cols = tbl.tHead?.rows[0]?.children.length || 0;
    addColAfter(tbl, cols - 1);
  });

  // Right-click cell → simple delete menu
  tbl.addEventListener('contextmenu', (e) => {
    const cell = (e.target as HTMLElement).closest('th,td') as HTMLTableCellElement | null;
    if (!cell) return;
    e.preventDefault();
    showCellMenu(cell, e.clientX, e.clientY);
  });
}

function showCellMenu(cell: HTMLTableCellElement, x: number, y: number): void {
  const tbl = cell.closest('table.n365-itbl') as HTMLTableElement;
  const tr = cell.parentElement as HTMLTableRowElement;
  const colIdx = Array.from(tr.children).indexOf(cell);

  const menu = document.createElement('div');
  menu.className = 'n365-itbl-menu';
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';

  function makeItem(label: string, fn: () => void, danger = false): HTMLDivElement {
    const it = document.createElement('div');
    it.className = 'n365-itbl-menu-item' + (danger ? ' danger' : '');
    it.textContent = label;
    it.addEventListener('click', () => { fn(); menu.remove(); });
    return it;
  }
  menu.appendChild(makeItem('↑ 上に行を追加', () => {
    const newTr = document.createElement('tr');
    const cols = tr.children.length;
    for (let i = 0; i < cols; i++) {
      const td = document.createElement('td');
      td.contentEditable = 'true';
      td.appendChild(document.createElement('br'));
      newTr.appendChild(td);
    }
    tr.parentElement!.insertBefore(newTr, tr);
    S.dirty = true; setSave('未保存'); schedSave();
  }));
  menu.appendChild(makeItem('↓ 下に行を追加', () => addRowAfter(tr)));
  menu.appendChild(makeItem('行を削除', () => deleteRow(tr), true));
  menu.appendChild(makeItem('← 左に列を追加', () => addColAfter(tbl, colIdx - 1)));
  menu.appendChild(makeItem('→ 右に列を追加', () => addColAfter(tbl, colIdx)));
  menu.appendChild(makeItem('列を削除', () => deleteCol(tbl, colIdx), true));

  const overlay = document.getElementById('n365-overlay') || document.body;
  overlay.appendChild(menu);
  function dismiss(ev: MouseEvent): void {
    if (!menu.contains(ev.target as Node)) {
      menu.remove();
      document.removeEventListener('mousedown', dismiss, true);
    }
  }
  setTimeout(() => document.addEventListener('mousedown', dismiss, true), 0);
}

/** Insert a fresh inline table at current selection inside the editor. */
export function insertInlineTable(cols = 3, rows = 1): void {
  const ed = getEd();
  const sel = window.getSelection();
  const wrap = buildTable(cols, rows);
  if (sel && sel.rangeCount) {
    const r = sel.getRangeAt(0);
    // Replace current empty block with the table
    const block = curBlockSelf();
    if (block && block !== ed && (block.textContent || '').trim() === '') {
      block.parentNode!.replaceChild(wrap, block);
    } else {
      r.deleteContents();
      r.insertNode(wrap);
    }
    // Add a trailing paragraph so caret can leave the table
    const tailP = document.createElement('p');
    tailP.appendChild(document.createElement('br'));
    if (wrap.parentNode) wrap.parentNode.insertBefore(tailP, wrap.nextSibling);
    // Focus first body cell
    const firstBody = wrap.querySelector('tbody td') as HTMLTableCellElement | null;
    if (firstBody) focusCell(firstBody);
  }
  S.dirty = true; setSave('未保存'); schedSave();
}

function curBlockSelf(): HTMLElement | null {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return null;
  let n: Node | null = sel.getRangeAt(0).startContainer;
  const ed = getEd();
  while (n && n !== ed) {
    if (n.nodeType === 1 && /^(P|H[1-6]|DIV)$/.test((n as Element).tagName)) {
      return n as HTMLElement;
    }
    n = n.parentNode;
  }
  return null;
}

/** Build a table DOM from a 2D string array (rows × cols). First row = header. */
export function buildTableFromGrid(grid: string[][]): HTMLDivElement {
  const cols = Math.max(...grid.map((r) => r.length), 1);
  const wrap = document.createElement('div');
  wrap.className = 'n365-itbl-wrap';
  wrap.contentEditable = 'false';
  const tbl = document.createElement('table');
  tbl.className = 'n365-itbl';
  const cg = document.createElement('colgroup');
  for (let i = 0; i < cols; i++) cg.appendChild(document.createElement('col'));
  tbl.appendChild(cg);
  // header
  const thead = document.createElement('thead');
  const trh = document.createElement('tr');
  const headRow = grid[0] || [];
  for (let i = 0; i < cols; i++) {
    const th = document.createElement('th');
    th.contentEditable = 'true';
    th.textContent = headRow[i] || '';
    if (!th.textContent) th.appendChild(document.createElement('br'));
    trh.appendChild(th);
  }
  thead.appendChild(trh);
  tbl.appendChild(thead);
  // body
  const tbody = document.createElement('tbody');
  for (let r = 1; r < Math.max(grid.length, 2); r++) {
    const row = grid[r] || [];
    const tr = document.createElement('tr');
    for (let c = 0; c < cols; c++) {
      const td = document.createElement('td');
      td.contentEditable = 'true';
      const v = row[c] || '';
      if (v) td.textContent = v;
      else td.appendChild(document.createElement('br'));
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  tbl.appendChild(tbody);
  wrap.appendChild(tbl);
  attachTableHandlers(wrap);
  return wrap;
}

/** Try to extract a 2D grid from clipboard. Returns null if not table-like. */
export function gridFromClipboard(cd: DataTransfer): string[][] | null {
  // 1) HTML with <table>
  const html = cd.getData('text/html');
  if (html && /<table[\s\S]*?<\/table>/i.test(html)) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const tbl = tmp.querySelector('table');
    if (tbl) {
      const rows = Array.from(tbl.querySelectorAll('tr'));
      const grid: string[][] = rows.map((tr) =>
        Array.from(tr.children).map((c) => ((c as HTMLElement).textContent || '').replace(/\s+/g, ' ').trim()),
      );
      if (grid.length > 0 && grid.some((r) => r.length > 0)) return grid;
    }
  }
  // 2) Plain TSV
  const text = cd.getData('text/plain');
  if (!text) return null;
  // split CRLF or LF; trim trailing empty line
  const lines = text.replace(/\r\n/g, '\n').replace(/\n+$/, '').split('\n');
  if (lines.length === 0) return null;
  const grid = lines.map((ln) => ln.split('\t'));
  // Treat as a table only if there are multiple cells (rows>=2 OR any row with cols>=2)
  const isTable = grid.length >= 2 || grid.some((r) => r.length >= 2);
  return isTable ? grid : null;
}

/** Insert a table built from a grid at the current selection. */
export function insertTableFromGrid(grid: string[][]): void {
  const ed = getEd();
  const sel = window.getSelection();
  const wrap = buildTableFromGrid(grid);
  if (sel && sel.rangeCount) {
    const r = sel.getRangeAt(0);
    const block = curBlockSelf();
    if (block && block !== ed && (block.textContent || '').trim() === '') {
      block.parentNode!.replaceChild(wrap, block);
    } else {
      r.deleteContents();
      r.insertNode(wrap);
    }
    const tailP = document.createElement('p');
    tailP.appendChild(document.createElement('br'));
    if (wrap.parentNode) wrap.parentNode.insertBefore(tailP, wrap.nextSibling);
  }
  S.dirty = true; setSave('未保存'); schedSave();
}

/** Attach a global paste handler to the editor — Excel/Sheets range → inline table. */
export function attachTablePaste(): void {
  const ed = getEd();
  if (ed.dataset.itblPasteWired === '1') return;
  ed.dataset.itblPasteWired = '1';
  ed.addEventListener('paste', (e) => {
    const cd = e.clipboardData;
    if (!cd) return;
    // Skip if caret is inside an existing table cell — let the default behavior insert text into the cell
    const sel = window.getSelection();
    if (sel && sel.rangeCount) {
      const node = sel.getRangeAt(0).startContainer;
      let n: Node | null = node;
      while (n && n !== ed) {
        if ((n as Element).tagName === 'TABLE') return;
        n = n.parentNode;
      }
    }
    const grid = gridFromClipboard(cd);
    if (!grid) return;
    e.preventDefault();
    insertTableFromGrid(grid);
  }, true);
}

/** After loading saved HTML, re-attach handlers to existing tables. */
export function reattachInlineTables(root: HTMLElement): void {
  root.querySelectorAll<HTMLDivElement>('.n365-itbl-wrap').forEach((w) => {
    w.contentEditable = 'false';
    // Make sure nested cells stay editable
    w.querySelectorAll<HTMLElement>('th,td').forEach((c) => { c.contentEditable = 'true'; });
    attachTableHandlers(w);
  });
}
