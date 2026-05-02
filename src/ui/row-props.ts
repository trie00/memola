// Notion-style row properties panel rendered between the title and the body
// when a DB row is opened as a page (row-page mode).
//
// Each property maps to one editable control matching its column type:
//   text       → contenteditable span
//   multiline  → contenteditable textarea
//   date       → input[type=date] (JST)
//   choice     → select
//   bool       → checkbox
//   number     → input[type=number]
//
// Edits commit via apiUpdateDbRow on blur / change. Local cache (S.dbItems +
// the open row reference) is kept in sync so the table view reflects updates
// when the user navigates back.

import { type ListField, type ListItem } from '../state';
import { apiUpdateDbRow } from '../api/db';
import { toast } from './ui-helpers';
import { formatDateJST, parseFlexibleDate } from '../lib/date-utils';
import { recordCellChange } from './db-history';
import { openChoicePopover } from './choice-popover';

/** Commit a single-cell change, capturing the previous value for undo. */
async function commit(
  listTitle: string,
  itemId: number,
  field: ListField,
  newValue: unknown,
  item: ListItem,
): Promise<void> {
  const oldValue = item[field.InternalName];
  const oldStr = oldValue == null ? '' : String(oldValue);
  const newStr = newValue == null ? '' : String(newValue);
  if (oldStr === newStr) return;
  // validateUpdateListItem accepts both Internal and Display name, but the
  // Display Title is the safer choice for Japanese-named columns whose
  // InternalName has the `_x30b9_…` encoded form (especially Choice fields).
  const fieldKey = field.Title || field.InternalName;
  try {
    await apiUpdateDbRow(listTitle, itemId, { [fieldKey]: newValue });
    item[field.InternalName] = newValue;
    recordCellChange(listTitle, itemId, field.InternalName, field.Title, oldValue, newValue);
  } catch (e) {
    toast('保存失敗: ' + (e as Error).message, 'err');
  }
}

function buildEditor(
  field: ListField,
  item: ListItem,
  listTitle: string,
): HTMLElement {
  const value = item[field.InternalName];
  switch (field.FieldTypeKind) {
    case 4: { // Date — flexible text input + native calendar picker.
              // Text accepts YYYYMMDD / YYYY-MM-DD / YYYY/MM/DD / YYYY.MM.DD.
      const wrap = document.createElement('div');
      wrap.className = 'n365-rp-date-wrap';
      const inp = document.createElement('input');
      inp.type = 'text';
      inp.className = 'n365-rp-input n365-rp-date';
      inp.placeholder = 'YYYY-MM-DD';
      inp.value = formatDateJST(value as string);
      const pick = document.createElement('input');
      pick.type = 'date';
      pick.className = 'n365-rp-date-pick';
      pick.value = formatDateJST(value as string);
      pick.tabIndex = -1;
      pick.title = 'カレンダーから選択';
      wrap.append(inp, pick);

      const save = (norm: string): void => {
        inp.classList.remove('n365-rp-invalid');
        inp.value = norm;
        pick.value = norm;
        void commit(listTitle, item.Id, field, norm, item);
      };
      inp.addEventListener('blur', () => {
        const trimmed = inp.value.trim();
        if (!trimmed) {
          inp.classList.remove('n365-rp-invalid');
          pick.value = '';
          void commit(listTitle, item.Id, field, '', item);
          return;
        }
        const norm = parseFlexibleDate(trimmed);
        if (!norm) {
          inp.classList.add('n365-rp-invalid');
          toast('日付形式が無効です: ' + trimmed, 'err');
          return;
        }
        save(norm);
      });
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); inp.blur(); }
        if (e.key === 'Escape') { inp.value = formatDateJST(item[field.InternalName] as string); inp.blur(); }
      });
      pick.addEventListener('change', () => {
        if (pick.value) save(pick.value);
        else { inp.value = ''; void commit(listTitle, item.Id, field, '', item); }
      });
      return wrap;
    }
    case 6: { // Choice — custom popover (matches the create-menu styling).
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'n365-rp-input n365-rp-choice';
      const choices = field.Choices || [];
      const renderLabel = (): void => {
        const v = (item[field.InternalName] as string) || '';
        if (v) {
          const idx = choices.indexOf(v);
          btn.innerHTML = '<span class="n365-select-chip n365-sc-' + (idx >= 0 ? idx % 6 : 0) + '">' +
            v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</span>';
        } else {
          btn.innerHTML = '<span class="n365-rp-placeholder">—</span>';
        }
      };
      renderLabel();
      btn.addEventListener('click', () => {
        const cur = (item[field.InternalName] as string) || '';
        const items = [{ value: '', label: '—' }, ...choices.map((c) => ({ value: c, label: c }))];
        openChoicePopover(btn, items, cur, (v) => {
          void commit(listTitle, item.Id, field, v, item).then(renderLabel);
        });
      });
      return btn;
    }
    case 8: { // Bool
      const lab = document.createElement('label');
      lab.className = 'n365-rp-checkbox';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = value === true || value === 'true' || value === 1 || value === '1';
      cb.addEventListener('change', () => {
        void commit(listTitle, item.Id, field, cb.checked ? '1' : '0', item);
      });
      lab.appendChild(cb);
      return lab;
    }
    case 9: { // Number
      const inp = document.createElement('input');
      inp.type = 'number';
      inp.className = 'n365-rp-input';
      inp.value = value == null ? '' : String(value);
      inp.addEventListener('blur', () => {
        const v = inp.value.trim() === '' ? '' : Number(inp.value);
        void commit(listTitle, item.Id, field, v, item);
      });
      return inp;
    }
    case 3: { // Multiline
      const ta = document.createElement('textarea');
      ta.className = 'n365-rp-input n365-rp-multi';
      ta.rows = 2;
      ta.value = value == null ? '' : String(value);
      ta.addEventListener('blur', () => {
        void commit(listTitle, item.Id, field, ta.value, item);
      });
      return ta;
    }
    default: { // Text (kind 2) and fallback
      const inp = document.createElement('input');
      inp.type = 'text';
      inp.className = 'n365-rp-input';
      inp.value = value == null ? '' : String(value);
      inp.addEventListener('blur', () => {
        void commit(listTitle, item.Id, field, inp.value, item);
      });
      return inp;
    }
  }
}

/** Render the row properties panel. Title is excluded — it's edited via the
 *  page title textarea above. */
export function renderRowProperties(
  container: HTMLElement,
  fields: ListField[],
  item: ListItem,
  listTitle: string,
): void {
  container.innerHTML = '';
  const visible = fields.filter((f) => f.InternalName !== 'Title');
  if (visible.length === 0) return;

  for (const f of visible) {
    const row = document.createElement('div');
    row.className = 'n365-rp-row';
    const lbl = document.createElement('div');
    lbl.className = 'n365-rp-label';
    lbl.textContent = f.Title;
    const val = document.createElement('div');
    val.className = 'n365-rp-value';
    val.appendChild(buildEditor(f, item, listTitle));
    row.append(lbl, val);
    container.appendChild(row);
  }
}


