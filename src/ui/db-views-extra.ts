// Additional DB views: list, gallery, calendar, gantt.
// All operate on S.dbItems / S.dbFields and reuse the existing data flow.

import { S } from '../state';
import type { ListItem, ListField } from '../state';
import { g } from './dom';
import { doSelect } from './views';

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
    root.appendChild(card);
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
      e.textContent = item.Title || '(無題)';
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
  const startField = dateFields[0];
  const endField = dateFields[1] || dateFields[0];

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
    root.innerHTML = '<div class="n365-altview-empty">日付データがありません</div>';
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
    const label = document.createElement('div');
    label.className = 'n365-gantt-label';
    label.textContent = it.item.Title || '(無題)';
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
