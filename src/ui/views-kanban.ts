// Kanban view rendering + shared card drag/selection helpers.
//
// The card helpers (showCardDropLine, attachCardSelectionHandlers,
// attachCardDragHandlers, hideCardDropLine) are shared by both the
// kanban board view and the gallery view (db-views-extra.ts).

import { S } from '../state';
import { g } from './dom';
import { toast } from './ui-helpers';
import { apiUpdateDbRow } from '../api/db';
import { recordCellChange } from './db-history';
import { getSortedFilteredItems, mkOpenRowBtn } from './views-table';

export function renderKanban(): void {
  const kb = g('kb');
  kb.innerHTML = '';

  const choiceField = S.dbFields.find((f) => f.FieldTypeKind === 6 && f.Choices);
  if (!choiceField || !choiceField.Choices) {
    const msg = document.createElement('div');
    msg.style.cssText = 'padding:40px;color:#9b9a97;font-size:14px;';
    msg.textContent = '選択肢列を追加してください';
    kb.appendChild(msg);
    return;
  }

  const choices = choiceField.Choices.concat(['未設定']);
  choices.forEach((choice) => {
    const col = document.createElement('div');
    col.className = 'memola-kb-col';
    col.dataset.choice = choice;
    const hd = document.createElement('div');
    hd.className = 'memola-kb-col-hd';
    hd.textContent = choice;
    col.appendChild(hd);

    const colItems = getSortedFilteredItems().filter((item) => {
      const val = (item[choiceField.InternalName] as string) || '';
      return choice === '未設定' ? !val : val === choice;
    });

    colItems.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'memola-kb-card';
      if (S.dbSelected.has(item.Id)) card.classList.add('memola-card-sel');
      card.draggable = true;
      card.dataset.id = String(item.Id);
      const titleSpan = document.createElement('span');
      titleSpan.className = 'memola-kb-card-title';
      titleSpan.textContent = item.Title || '(無題)';
      card.appendChild(titleSpan);
      card.appendChild(mkOpenRowBtn(item));
      attachCardSelectionHandlers(card, item.Id);
      attachCardDragHandlers(card, item.Id);
      col.appendChild(card);
    });

    // Column accepts kanban-card drops → change row's choice value
    col.addEventListener('dragover', (e) => {
      const dt = e.dataTransfer;
      if (!dt || Array.from(dt.types).indexOf('text/memola-kb') < 0) return;
      e.preventDefault();
      dt.dropEffect = 'move';
      // Show line indicator: between cards (insert position) within this column
      showCardDropLine(col, e.clientY);
    });
    col.addEventListener('dragleave', (e) => {
      const rt = (e as DragEvent).relatedTarget as Node | null;
      if (!rt || !col.contains(rt)) hideCardDropLine();
    });
    col.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (!dt) return;
      const idStr = dt.getData('text/memola-kb');
      if (!idStr) return;
      e.preventDefault();
      hideCardDropLine();
      const rowId = parseInt(idStr, 10);
      const item = S.dbItems.find((i) => i.Id === rowId);
      if (!item) return;
      // If multi-selection includes the dragged row, move all selected rows.
      // Otherwise just the one being dragged.
      const draggedIds = S.dbSelected.has(rowId) ? Array.from(S.dbSelected) : [rowId];
      const newVal = choice === '未設定' ? '' : choice;
      // Move every dragged row whose current value differs from the target column.
      const updates: Promise<unknown>[] = [];
      const reverts: Array<() => void> = [];
      for (const id of draggedIds) {
        const it = S.dbItems.find((i) => i.Id === id);
        if (!it) continue;
        const oldVal = (it[choiceField.InternalName] as string) || '';
        if (newVal === oldVal) continue;
        it[choiceField.InternalName] = newVal;
        reverts.push(() => { it[choiceField.InternalName] = oldVal; });
        updates.push(
          apiUpdateDbRow(S.dbList, id, { [choiceField.InternalName]: newVal })
            .then(() => recordCellChange(S.dbList, id, choiceField.InternalName, choiceField.Title, oldVal, newVal)),
        );
      }
      if (updates.length === 0) return;
      // Defer the re-render so the browser's drag cleanup completes first;
      // calling renderKanban() synchronously inside the drop handler can
      // destroy the source card before `dragend` fires, leaving a stale
      // dragging state that breaks the next drag-from-the-same-column.
      Promise.all(updates)
        .then(() => requestAnimationFrame(() => renderKanban()))
        .catch((err: Error) => {
          reverts.forEach((r) => r());
          toast('変更失敗: ' + err.message, 'err');
          requestAnimationFrame(() => renderKanban());
        });
    });

    kb.appendChild(col);
  });
}

// ── Card drag / selection helpers (shared by kanban + gallery) ─────────

let _cardDropLine: HTMLElement | null = null;
function ensureCardDropLine(): HTMLElement {
  const overlay = document.getElementById('memola-overlay') || document.body;
  if (_cardDropLine && overlay.contains(_cardDropLine)) return _cardDropLine;
  const el = document.createElement('div');
  el.className = 'memola-card-drop-line';
  overlay.appendChild(el);
  _cardDropLine = el;
  return el;
}

/** Place a horizontal line indicator at the nearest card-gap to clientY
 *  inside `container`. Used by kanban columns. */
export function showCardDropLine(container: HTMLElement, clientY: number): void {
  const cards = Array.from(container.querySelectorAll<HTMLElement>('.memola-kb-card, .memola-gv-card'));
  if (cards.length === 0) {
    // Empty column → place line just under the column header
    const r = container.getBoundingClientRect();
    const line = ensureCardDropLine();
    line.style.top = (r.top + 36) + 'px';
    line.style.left = (r.left + 8) + 'px';
    line.style.width = (r.width - 16) + 'px';
    line.classList.add('on');
    return;
  }
  let target: HTMLElement = cards[0];
  let placeAfter = false;
  for (const c of cards) {
    const cr = c.getBoundingClientRect();
    if (clientY < cr.top + cr.height / 2) { target = c; placeAfter = false; break; }
    target = c; placeAfter = true;
  }
  const tr = target.getBoundingClientRect();
  const line = ensureCardDropLine();
  line.style.top = ((placeAfter ? tr.bottom : tr.top) - 1) + 'px';
  line.style.left = tr.left + 'px';
  line.style.width = tr.width + 'px';
  line.classList.add('on');
}

export function hideCardDropLine(): void {
  if (_cardDropLine) _cardDropLine.classList.remove('on');
  // Defensive: gallery view creates its own drop-line element (different
  // module-local ref); clear every line in the DOM so a stray one doesn't
  // linger after a kanban → gallery transition.
  document.querySelectorAll<HTMLElement>('.memola-card-drop-line').forEach((el) => {
    el.classList.remove('on');
  });
}

/** Click + Shift+click handlers for card selection. Mirrors table checkbox
 *  selection (uses the same S.dbSelected set so the bulk toolbar appears). */
export function attachCardSelectionHandlers(card: HTMLElement, itemId: number): void {
  card.addEventListener('click', (e) => {
    // Ignore clicks on the open-row (↗) button
    if ((e.target as HTMLElement).closest('.memola-row-open')) return;
    const me = e as MouseEvent;
    if (me.shiftKey) {
      if (S.dbSelected.has(itemId)) S.dbSelected.delete(itemId);
      else S.dbSelected.add(itemId);
      card.classList.toggle('memola-card-sel', S.dbSelected.has(itemId));
      void import('./db-bulk').then((m) => m.renderBulkBar());
    }
  });
}

/** Standard drag handlers for kanban / gallery cards. */
export function attachCardDragHandlers(card: HTMLElement, itemId: number): void {
  card.addEventListener('dragstart', (e) => {
    if (!e.dataTransfer) return;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/memola-kb', String(itemId));
    // Fade every selected card if this drag is part of a multi-selection
    const ids = S.dbSelected.has(itemId) ? Array.from(S.dbSelected) : [itemId];
    document.querySelectorAll<HTMLElement>('.memola-kb-card[data-id], .memola-gv-card[data-id]').forEach((n) => {
      const id = parseInt(n.dataset.id || '0', 10);
      if (ids.indexOf(id) >= 0) n.classList.add('memola-kb-card-dragging');
    });
  });
  card.addEventListener('dragend', () => {
    document.querySelectorAll('.memola-kb-card-dragging').forEach((n) =>
      n.classList.remove('memola-kb-card-dragging'));
    hideCardDropLine();
  });
}
