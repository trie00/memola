// Additional DB views: list, gallery, calendar, gantt.
// All operate on S.dbItems / S.dbFields and reuse the existing data flow.

import { S } from '../state';
import type { ListItem, ListField } from '../state';
import { g } from './dom';
import {
  doSelect, mkOpenRowBtn, reorderRows, isManualRowOrderActive,
  attachCardSelectionHandlers, attachCardDragHandlers,
  showCardDropLine, hideCardDropLine,
} from './views';
import { loadGanttConfig, saveGanttConfig, type GanttConfig } from '../lib/db-order';

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function getProp(item: ListItem, name: string): string {
  const v = item[name];
  return v == null ? '' : String(v);
}

function findField(kind: number): ListField | undefined {
  return S.dbFields.find((f) => f.FieldTypeKind === kind);
}

/** Wire a vertical/horizontal drag-reorder onto a card/row element.
 *  `axis` controls whether before/after is decided by clientY (vertical) or X. */
function attachItemDrag(el: HTMLElement, item: ListItem, axis: 'y' | 'x'): void {
  if (!isManualRowOrderActive()) return;
  el.draggable = true;
  const dragKey = 'text/n365-row';
  el.addEventListener('dragstart', (e) => {
    if (!e.dataTransfer) return;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData(dragKey, String(item.Id));
    // Multi-select drag: fade every selected item if this one is part of it.
    const ids = S.dbSelected.has(item.Id) ? Array.from(S.dbSelected) : [item.Id];
    document.querySelectorAll<HTMLElement>('[data-id]').forEach((n) => {
      const id = parseInt(n.dataset.id || '0', 10);
      if (ids.indexOf(id) >= 0) n.classList.add('n365-item-dragging');
    });
  });
  el.addEventListener('dragend', () => {
    document.querySelectorAll('.n365-item-dragging').forEach((n) =>
      n.classList.remove('n365-item-dragging'));
  });
  el.addEventListener('dragover', (e) => {
    const dt = e.dataTransfer;
    if (!dt || Array.from(dt.types).indexOf(dragKey) < 0) return;
    e.preventDefault();
    dt.dropEffect = 'move';
    const r = el.getBoundingClientRect();
    const after = axis === 'y'
      ? e.clientY > r.top + r.height / 2
      : e.clientX > r.left + r.width / 2;
    el.classList.toggle('n365-item-drop-before', !after);
    el.classList.toggle('n365-item-drop-after', after);
  });
  el.addEventListener('dragleave', () => {
    el.classList.remove('n365-item-drop-before', 'n365-item-drop-after');
  });
  el.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    if (!dt) return;
    const fromIdStr = dt.getData(dragKey);
    if (!fromIdStr) return;
    e.preventDefault();
    const r = el.getBoundingClientRect();
    const after = axis === 'y'
      ? e.clientY > r.top + r.height / 2
      : e.clientX > r.left + r.width / 2;
    el.classList.remove('n365-item-drop-before', 'n365-item-drop-after');
    const fromId = parseInt(fromIdStr, 10);
    // If the source row is part of the multi-selection, move all selected.
    const ids = S.dbSelected.has(fromId) ? Array.from(S.dbSelected) : [fromId];
    if (ids.indexOf(item.Id) >= 0) return;        // dropping on a dragged item
    reorderRows(ids, item.Id, after);
  });
}

// ── List view ────────────────────────────────────────────
export function renderListView(): void {
  const root = g('list-view');
  root.innerHTML = '';
  const fields = S.dbFields.filter((f) => [2, 4, 6, 8, 9].includes(f.FieldTypeKind)).slice(0, 4);
  S.dbItems.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'n365-lv-row';
    const main = document.createElement('div');
    main.className = 'n365-lv-title';
    main.textContent = item.Title || '(無題)';
    row.appendChild(main);
    const sub = document.createElement('div');
    sub.className = 'n365-lv-sub';
    sub.innerHTML = fields
      .filter((f) => f.InternalName !== 'Title')
      .map((f) => '<span class="n365-lv-field">' + escapeHtml(f.Title) + ': ' + escapeHtml(getProp(item, f.InternalName)) + '</span>')
      .join('');
    row.appendChild(sub);
    row.appendChild(mkOpenRowBtn(item));
    if (S.dbSelected.has(item.Id)) row.classList.add('n365-card-sel');
    attachCardSelectionHandlers(row, item.Id);
    attachItemDrag(row, item, 'y');
    root.appendChild(row);
  });
}

// ── Gallery view ─────────────────────────────────────────
export function renderGalleryView(): void {
  const root = g('gallery-view');
  root.innerHTML = '';
  const fields = S.dbFields.filter((f) => [2, 4, 6, 8, 9].includes(f.FieldTypeKind));
  S.dbItems.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'n365-gv-card';
    if (S.dbSelected.has(item.Id)) card.classList.add('n365-card-sel');
    card.dataset.id = String(item.Id);
    card.draggable = isManualRowOrderActive();
    card.innerHTML =
      '<div class="n365-gv-cover">' + (item.Title || '?').slice(0, 1) + '</div>' +
      '<div class="n365-gv-title">' + escapeHtml(item.Title || '(無題)') + '</div>' +
      '<div class="n365-gv-meta">' +
        fields
          .filter((f) => f.InternalName !== 'Title')
          .slice(0, 3)
          .map((f) => '<div class="n365-gv-prop">' + escapeHtml(f.Title) + ': ' + escapeHtml(getProp(item, f.InternalName)) + '</div>')
          .join('') +
      '</div>';
    card.appendChild(mkOpenRowBtn(item));
    attachCardSelectionHandlers(card, item.Id);
    attachCardDragHandlers(card, item.Id);
    root.appendChild(card);
  });
  // Grid-level dragover/drop for reordering (uses card-drop-line indicator)
  if (isManualRowOrderActive()) attachGalleryGridDrop(root);
}

function attachGalleryGridDrop(root: HTMLElement): void {
  root.addEventListener('dragover', (e) => {
    const dt = e.dataTransfer;
    if (!dt || Array.from(dt.types).indexOf('text/n365-kb') < 0) return;
    e.preventDefault();
    dt.dropEffect = 'move';
    // Find the nearest card to the cursor (gallery is a 2-D grid; pick the
    // card whose horizontal centre is closest to clientX within the same row band).
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.n365-gv-card'));
    if (cards.length === 0) { hideCardDropLine(); return; }
    let nearest: HTMLElement = cards[0];
    let bestDist = Infinity;
    for (const c of cards) {
      const cr = c.getBoundingClientRect();
      // Same row if cursor Y overlaps card vertical extent
      const sameRow = e.clientY >= cr.top && e.clientY <= cr.bottom;
      const dx = Math.abs(e.clientX - (cr.left + cr.width / 2));
      const score = (sameRow ? 0 : 1e6) + dx;
      if (score < bestDist) { bestDist = score; nearest = c; }
    }
    const cr = nearest.getBoundingClientRect();
    const placeAfter = e.clientX > cr.left + cr.width / 2;
    const line = document.querySelector<HTMLElement>('.n365-card-drop-line') || (() => {
      const overlay = document.getElementById('n365-overlay') || document.body;
      const el = document.createElement('div');
      el.className = 'n365-card-drop-line vertical';
      overlay.appendChild(el);
      return el;
    })();
    line.classList.add('vertical');
    line.style.top = cr.top + 'px';
    line.style.height = cr.height + 'px';
    line.style.left = ((placeAfter ? cr.right : cr.left) - 1) + 'px';
    line.style.width = '2px';
    line.classList.add('on');
    nearest.dataset.dropAfter = placeAfter ? '1' : '0';
  });
  root.addEventListener('dragleave', (e) => {
    const rt = (e as DragEvent).relatedTarget as Node | null;
    if (!rt || !root.contains(rt)) hideCardDropLine();
  });
  root.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    if (!dt) return;
    const idStr = dt.getData('text/n365-kb');
    if (!idStr) return;
    e.preventDefault();
    hideCardDropLine();
    const fromId = parseInt(idStr, 10);
    const ids = S.dbSelected.has(fromId) ? Array.from(S.dbSelected) : [fromId];
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.n365-gv-card'));
    let nearest: HTMLElement | null = null;
    let bestDist = Infinity;
    for (const c of cards) {
      const cr = c.getBoundingClientRect();
      const sameRow = e.clientY >= cr.top && e.clientY <= cr.bottom;
      const dx = Math.abs(e.clientX - (cr.left + cr.width / 2));
      const score = (sameRow ? 0 : 1e6) + dx;
      if (score < bestDist) { bestDist = score; nearest = c; }
    }
    if (!nearest) return;
    const targetId = parseInt(nearest.dataset.id || '0', 10);
    if (!targetId || ids.indexOf(targetId) >= 0) return;
    const cr = nearest.getBoundingClientRect();
    const placeAfter = e.clientX > cr.left + cr.width / 2;
    reorderRows(ids, targetId, placeAfter);
  });
}

// ── Calendar view (month grid) ──────────────────────────
export function renderCalendarView(): void {
  const root = g('calendar-view');
  root.innerHTML = '';
  const dateField = findField(4);
  if (!dateField) {
    root.innerHTML = '<div class="n365-altview-empty">日付列がありません</div>';
    return;
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startDay = first.getDay();
  const totalDays = last.getDate();

  // group items by date
  const byDate: Record<string, ListItem[]> = {};
  S.dbItems.forEach((item) => {
    const v = getProp(item, dateField.InternalName);
    if (!v) return;
    const d = new Date(v);
    const key = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    (byDate[key] ||= []).push(item);
  });

  const wrap = document.createElement('div');
  wrap.className = 'n365-cal';

  const head = document.createElement('div');
  head.className = 'n365-cal-head';
  head.textContent = year + '年 ' + (month + 1) + '月';
  wrap.appendChild(head);

  const dayHead = document.createElement('div');
  dayHead.className = 'n365-cal-grid n365-cal-dayhead';
  ['日', '月', '火', '水', '木', '金', '土'].forEach((d) => {
    const cell = document.createElement('div');
    cell.className = 'n365-cal-cell';
    cell.textContent = d;
    dayHead.appendChild(cell);
  });
  wrap.appendChild(dayHead);

  const grid = document.createElement('div');
  grid.className = 'n365-cal-grid';
  for (let i = 0; i < startDay; i++) grid.appendChild(document.createElement('div'));
  for (let d = 1; d <= totalDays; d++) {
    const cell = document.createElement('div');
    cell.className = 'n365-cal-cell n365-cal-day';
    if (d === today.getDate()) cell.classList.add('today');
    const num = document.createElement('div');
    num.className = 'n365-cal-num';
    num.textContent = String(d);
    cell.appendChild(num);
    const key = year + '-' + (month + 1) + '-' + d;
    (byDate[key] || []).forEach((item) => {
      const e = document.createElement('div');
      e.className = 'n365-cal-event';
      if (S.dbSelected.has(item.Id)) e.classList.add('n365-card-sel');
      const t = document.createElement('span');
      t.className = 'n365-cal-event-title';
      t.textContent = item.Title || '(無題)';
      e.appendChild(t);
      e.appendChild(mkOpenRowBtn(item));
      attachCardSelectionHandlers(e, item.Id);
      cell.appendChild(e);
    });
    grid.appendChild(cell);
  }
  wrap.appendChild(grid);
  root.appendChild(wrap);
}

// ── Gantt view (simple horizontal bars) ─────────────────
export function renderGanttView(): void {
  const root = g('gantt-view');
  root.innerHTML = '';
  const dateFields = S.dbFields.filter((f) => f.FieldTypeKind === 4);
  if (dateFields.length === 0) {
    root.innerHTML = '<div class="n365-altview-empty">日付列がありません</div>';
    return;
  }

  // Resolve the start/end columns: saved config takes precedence,
  // otherwise fall back to "first date column → start, second → end".
  const saved = loadGanttConfig(S.dbList);
  const startInternal = saved && dateFields.some((f) => f.InternalName === saved.start)
    ? saved.start
    : dateFields[0].InternalName;
  const endInternal = saved
    ? (saved.end && dateFields.some((f) => f.InternalName === saved.end) ? saved.end : null)
    : (dateFields[1]?.InternalName ?? null);

  // Config bar — let user pick start / end columns
  const cfgBar = document.createElement('div');
  cfgBar.className = 'n365-gantt-cfg';
  cfgBar.innerHTML = '<span>開始</span>';
  const startSel = document.createElement('select');
  startSel.className = 'n365-gantt-cfg-sel';
  dateFields.forEach((f) => {
    const o = document.createElement('option');
    o.value = f.InternalName; o.textContent = f.Title;
    if (f.InternalName === startInternal) o.selected = true;
    startSel.appendChild(o);
  });
  cfgBar.appendChild(startSel);
  const endLbl = document.createElement('span');
  endLbl.textContent = '終了';
  cfgBar.appendChild(endLbl);
  const endSel = document.createElement('select');
  endSel.className = 'n365-gantt-cfg-sel';
  const noneOpt = document.createElement('option');
  noneOpt.value = ''; noneOpt.textContent = '(単日バー)';
  endSel.appendChild(noneOpt);
  dateFields.forEach((f) => {
    const o = document.createElement('option');
    o.value = f.InternalName; o.textContent = f.Title;
    if (f.InternalName === endInternal) o.selected = true;
    endSel.appendChild(o);
  });
  if (!endInternal) noneOpt.selected = true;
  cfgBar.appendChild(endSel);
  function persist(): void {
    const cfg: GanttConfig = {
      start: startSel.value,
      end: endSel.value || null,
    };
    saveGanttConfig(S.dbList, cfg);
    renderGanttView();
  }
  startSel.addEventListener('change', persist);
  endSel.addEventListener('change', persist);
  root.appendChild(cfgBar);

  const startField = dateFields.find((f) => f.InternalName === startInternal) || dateFields[0];
  const endField = endInternal
    ? (dateFields.find((f) => f.InternalName === endInternal) || startField)
    : startField;

  // Determine min/max date
  const items = S.dbItems
    .map((item) => {
      const s = getProp(item, startField.InternalName);
      const e = getProp(item, endField.InternalName) || s;
      if (!s) return null;
      return { item, start: new Date(s), end: new Date(e) };
    })
    .filter(Boolean) as Array<{ item: ListItem; start: Date; end: Date }>;
  if (items.length === 0) {
    const note = document.createElement('div');
    note.className = 'n365-altview-empty';
    note.textContent = '日付データがありません';
    root.appendChild(note);
    return;
  }
  const minD = new Date(Math.min(...items.map((i) => i.start.getTime())));
  const maxD = new Date(Math.max(...items.map((i) => i.end.getTime())));
  const totalDays = Math.max(1, Math.ceil((maxD.getTime() - minD.getTime()) / 86400000) + 1);
  const dayW = 28; // px per day

  const wrap = document.createElement('div');
  wrap.className = 'n365-gantt';

  const header = document.createElement('div');
  header.className = 'n365-gantt-header';
  header.style.width = (totalDays * dayW) + 'px';
  for (let i = 0; i < totalDays; i++) {
    const d = new Date(minD.getTime() + i * 86400000);
    const cell = document.createElement('div');
    cell.className = 'n365-gantt-day';
    if (d.getDay() === 0 || d.getDay() === 6) cell.classList.add('weekend');
    cell.textContent = String(d.getDate());
    cell.title = d.toLocaleDateString('ja-JP');
    header.appendChild(cell);
  }
  wrap.appendChild(header);

  items.forEach((it) => {
    const row = document.createElement('div');
    row.className = 'n365-gantt-row';
    if (S.dbSelected.has(it.item.Id)) row.classList.add('n365-card-sel');
    const label = document.createElement('div');
    label.className = 'n365-gantt-label';
    const labelText = document.createElement('span');
    labelText.className = 'n365-gantt-label-text';
    labelText.textContent = it.item.Title || '(無題)';
    label.appendChild(labelText);
    label.appendChild(mkOpenRowBtn(it.item));
    attachCardSelectionHandlers(row, it.item.Id);
    row.appendChild(label);
    const track = document.createElement('div');
    track.className = 'n365-gantt-track';
    track.style.width = (totalDays * dayW) + 'px';
    const bar = document.createElement('div');
    const offset = Math.floor((it.start.getTime() - minD.getTime()) / 86400000);
    const span = Math.max(1, Math.ceil((it.end.getTime() - it.start.getTime()) / 86400000) + 1);
    bar.className = 'n365-gantt-bar';
    bar.style.left = (offset * dayW) + 'px';
    bar.style.width = (span * dayW - 2) + 'px';
    bar.title = it.item.Title || '';
    track.appendChild(bar);
    row.appendChild(track);
    wrap.appendChild(row);
  });

  root.appendChild(wrap);
}

// ── View dispatcher ─────────────────────────────────────
export function renderActiveView(view: string): void {
  if (view === 'list') renderListView();
  else if (view === 'gallery') renderGalleryView();
  else if (view === 'calendar') renderCalendarView();
  else if (view === 'gantt') renderGanttView();
}

// Helper used by row items in any view to open the row as a "page" (placeholder)
export function openItem(itemId: string): void {
  void doSelect(itemId);
}
