// Notion-style multi-field AND filter.
//   - "+ フィルター" chip opens a popover listing un-filtered fields.
//   - Pick a field → push filter; render as a chip with field-name + value input + ×.
//   - Multiple chips = AND condition.

import { S, type ListField } from '../state';
import { renderDbTable } from './views';

function getEl<T extends HTMLElement = HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

export function renderFilterChips(): void {
  const wrap = getEl('n365-filter-chips');
  if (!wrap) return;
  wrap.innerHTML = '';
  S.dbFilters.forEach((flt, idx) => {
    const field = S.dbFields.find((f) => f.InternalName === flt.field);
    if (!field) return;
    const chip = document.createElement('div');
    chip.className = 'n365-flt-chip';

    const lbl = document.createElement('span');
    lbl.className = 'n365-flt-chip-label';
    lbl.textContent = field.Title;
    chip.appendChild(lbl);

    chip.appendChild(makeValueEditor(field, flt, idx));

    const xbtn = document.createElement('button');
    xbtn.className = 'n365-flt-chip-x';
    xbtn.title = '削除';
    xbtn.textContent = '×';
    xbtn.addEventListener('click', () => {
      S.dbFilters.splice(idx, 1);
      renderFilterChips();
      renderDbTable();
    });
    chip.appendChild(xbtn);

    wrap.appendChild(chip);
  });
}

function makeValueEditor(
  field: ListField,
  flt: { field: string; op: string; value: string },
  idx: number,
): HTMLElement {
  // Choice → dropdown
  if (field.FieldTypeKind === 6 && field.Choices) {
    const sel = document.createElement('select');
    sel.className = 'n365-flt-chip-val';
    const empty = document.createElement('option');
    empty.value = ''; empty.textContent = '—';
    sel.appendChild(empty);
    field.Choices.forEach((c) => {
      const o = document.createElement('option');
      o.value = c; o.textContent = c;
      if (flt.value === c) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', () => {
      S.dbFilters[idx].op = 'equals';
      S.dbFilters[idx].value = sel.value;
      renderDbTable();
    });
    return sel;
  }
  // Boolean → dropdown
  if (field.FieldTypeKind === 8) {
    const sel = document.createElement('select');
    sel.className = 'n365-flt-chip-val';
    [['', '—'], ['true', 'チェック済み'], ['false', '未チェック']].forEach(([v, t]) => {
      const o = document.createElement('option');
      o.value = v; o.textContent = t;
      if (flt.value === v) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', () => {
      S.dbFilters[idx].op = 'equals';
      S.dbFilters[idx].value = sel.value;
      renderDbTable();
    });
    return sel;
  }
  // Text / number / date / multi-line → text input (contains)
  const inp = document.createElement('input');
  inp.type = 'text';
  inp.className = 'n365-flt-chip-val';
  inp.placeholder = '値…';
  inp.value = flt.value || '';
  inp.addEventListener('input', () => {
    S.dbFilters[idx].op = 'contains';
    S.dbFilters[idx].value = inp.value;
    renderDbTable();
  });
  inp.addEventListener('keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Escape') inp.blur();
  });
  return inp;
}

export function showFilterPopover(): void {
  const popMaybe = getEl('n365-filter-popover');
  const btn = getEl('n365-db-filter-btn');
  if (!popMaybe || !btn) return;
  const pop: HTMLElement = popMaybe;
  // Toggle off if already open
  if (pop.classList.contains('on')) { pop.classList.remove('on'); return; }

  pop.innerHTML = '';

  // Search input
  const inpWrap = document.createElement('div');
  inpWrap.className = 'n365-flt-pop-inpwrap';
  const inp = document.createElement('input');
  inp.type = 'text';
  inp.className = 'n365-flt-pop-inp';
  inp.placeholder = 'フィルター対象…';
  inpWrap.appendChild(inp);
  pop.appendChild(inpWrap);

  const list = document.createElement('div');
  list.className = 'n365-flt-pop-list';
  pop.appendChild(list);

  function renderList(q: string): void {
    list.innerHTML = '';
    const used = new Set(S.dbFilters.map((f) => f.field));
    const ql = q.toLowerCase();
    const candidates = S.dbFields.filter((f) => !used.has(f.InternalName))
      .filter((f) => !ql || f.Title.toLowerCase().includes(ql));
    if (candidates.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'n365-flt-pop-empty';
      empty.textContent = used.size === S.dbFields.length ? '全項目に既に条件が設定済み' : '一致する項目なし';
      list.appendChild(empty);
      return;
    }
    candidates.forEach((f) => {
      const item = document.createElement('div');
      item.className = 'n365-flt-pop-item';
      const ic = document.createElement('span');
      ic.className = 'n365-flt-pop-ic';
      ic.textContent = iconFor(f.FieldTypeKind);
      const lbl = document.createElement('span');
      lbl.textContent = f.Title;
      item.append(ic, lbl);
      item.addEventListener('click', () => {
        S.dbFilters.push({ field: f.InternalName, op: 'contains', value: '' });
        pop.classList.remove('on');
        renderFilterChips();
        renderDbTable();
        // Auto-focus the new chip's value editor
        setTimeout(() => {
          const wrap = getEl('n365-filter-chips');
          const chips = wrap?.querySelectorAll<HTMLElement>('.n365-flt-chip-val');
          if (chips && chips.length > 0) chips[chips.length - 1].focus();
        }, 50);
      });
      list.appendChild(item);
    });
  }

  inp.addEventListener('input', () => renderList(inp.value));

  // Position below the button
  const r = btn.getBoundingClientRect();
  pop.style.left = r.left + 'px';
  pop.style.top = (r.bottom + 6) + 'px';
  pop.classList.add('on');

  renderList('');
  setTimeout(() => inp.focus(), 30);
}

function iconFor(kind: number): string {
  switch (kind) {
    case 2:  return 'Aa';
    case 3:  return '¶';
    case 4:  return '📅';
    case 6:  return '◉';
    case 8:  return '☐';
    case 9:  return '#';
    default: return '·';
  }
}

export function attachFilterPopoverOutsideClick(): void {
  document.addEventListener('click', (e) => {
    const pop = getEl('n365-filter-popover');
    const btn = getEl('n365-db-filter-btn');
    if (!pop || !pop.classList.contains('on')) return;
    const t = e.target as Node;
    if (pop && pop.contains(t)) return;
    if (btn && btn.contains(t)) return;
    pop.classList.remove('on');
  });
}

/** AND filter against all current dbFilters. Returns true if item passes. */
export function passesFilters(item: Record<string, unknown>): boolean {
  for (const flt of S.dbFilters) {
    if (!flt.value && flt.op !== 'empty' && flt.op !== 'not_empty') continue;
    const raw = item[flt.field];
    const s = raw == null ? '' : String(raw);
    switch (flt.op) {
      case 'equals':
        if (flt.value === 'true' || flt.value === 'false') {
          // boolean
          if ((s === 'true') !== (flt.value === 'true')) return false;
        } else if (s !== flt.value) return false;
        break;
      case 'not_empty': if (!s) return false; break;
      case 'empty':     if (s) return false; break;
      case 'contains':
      default:
        if (!s.toLowerCase().includes(flt.value.toLowerCase())) return false;
    }
  }
  return true;
}
