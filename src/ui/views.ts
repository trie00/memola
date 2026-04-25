// Page / database view switching, table & kanban rendering.

import { S, type ListField, type ListItem, type Page } from '../state';
import { g, getEd } from './dom';
import { setLoad, setSave, toast, autoR } from './ui-helpers';
import { renderTree, ancs, renderBc } from './tree';
import { apiLoadContent } from '../api/pages';
import { apiUpdateDbRow } from '../api/db';
import { deleteListItem, getListFields, getListItems } from '../api/sp-list';

// doSave is imported lazily to avoid circular load issues.
import { doSave } from './actions';

export function showView(mode: 'page' | 'db' | 'empty'): void {
  g('ea').style.display = mode !== 'db'    ? 'flex'  : 'none';
  g('em').style.display = mode === 'empty' ? 'flex'  : 'none';
  g('ct').style.display = mode === 'page'  ? 'block' : 'none';
  g('tb').style.display = mode === 'page'  ? 'flex'  : 'none';
  g('dv').style.display = mode === 'db'    ? 'flex'  : 'none';
}

export function renderPageIcon(id: string): void {
  const metaPage = S.meta.pages.find((p) => p.id === id);
  const icon = metaPage ? (metaPage.icon || '') : '';
  const pgIcon = g('pg-icon');
  const addIcon = g('add-icon');
  if (icon) {
    pgIcon.textContent = icon;
    pgIcon.style.display = 'inline-block';
    addIcon.style.display = 'none';
  } else {
    pgIcon.style.display = 'none';
    addIcon.style.display = 'inline-block';
  }
}

export async function doSelect(id: string): Promise<void> {
  if (S.dirty && S.currentType !== 'database') await doSave();
  S.currentId = id;
  const page = S.pages.find((p) => p.Id === id);
  if (!page) return;
  ancs(id).forEach((p) => { S.expanded.add(p.Id); });
  renderTree(); renderBc(id);
  if (page.Type === 'database') {
    await doSelectDb(id, page);
  } else {
    S.currentType = 'page';
    showView('page');
    const te = g('ttl') as HTMLTextAreaElement;
    te.value = page.Title || '';
    autoR(te);
    renderPageIcon(id);
    setLoad(true, 'ページを読み込み中...');
    try {
      getEd().innerHTML = await apiLoadContent(id);
    } catch (e) {
      getEd().innerHTML = '';
      toast('読み込み失敗: ' + (e as Error).message, 'err');
    } finally { setLoad(false); }
    setSave(''); S.dirty = false;
  }
}

export async function doSelectDb(id: string, page: Page): Promise<void> {
  S.currentType = 'database';
  const meta = S.meta.pages.find((p) => p.id === id);
  if (!meta || !meta.list) { toast('DBメタ情報が見つかりません', 'err'); return; }
  showView('db');
  g('dv-ttl').textContent = page.Title || '無題';

  const dvIcon = g('dv-pg-icon');
  if (meta.icon) {
    dvIcon.textContent = meta.icon;
    dvIcon.style.display = 'inline-block';
  } else {
    dvIcon.style.display = 'none';
  }

  setLoad(true, 'データを読み込み中...');
  try {
    const results = await Promise.all([getListFields(meta.list), getListItems(meta.list)]);
    S.dbFields = results[0];
    S.dbItems  = results[1];
    S.dbList   = meta.list;
    S.dbFilter = '';
    S.dbSort   = { field: null, asc: true };
    (g('filter-inp') as HTMLInputElement).value = '';
    g('filter-bar').classList.remove('on');
    renderDbTable();
  } catch (e) { toast('DB読み込み失敗: ' + (e as Error).message, 'err'); }
  finally { setLoad(false); }
}

export function getDbFields(): ListField[] {
  return S.dbFields.filter((f) => [2, 4, 6, 8, 9].indexOf(f.FieldTypeKind) >= 0);
}

function getSortedFilteredItems(): ListItem[] {
  let items = S.dbItems.slice();
  if (S.dbFilter) {
    const q = S.dbFilter.toLowerCase();
    items = items.filter((item) => {
      return !item.Title || item.Title.toLowerCase().includes(q);
    });
  }
  if (S.dbSort.field) {
    const field = S.dbSort.field;
    const asc = S.dbSort.asc;
    items.sort((a, b) => {
      const av = a[field] != null ? String(a[field]) : '';
      const bv = b[field] != null ? String(b[field]) : '';
      if (av < bv) return asc ? -1 : 1;
      if (av > bv) return asc ? 1 : -1;
      return 0;
    });
  }
  return items;
}

export function renderDbTable(): void {
  const thead = g('dth-row');
  const tbody = g('dtb');
  thead.innerHTML = ''; tbody.innerHTML = '';
  const fields = getDbFields();

  fields.forEach((f) => {
    const th = document.createElement('th');
    const isSorted = S.dbSort.field === f.InternalName;
    th.innerHTML = f.Title + (isSorted ? '<span class="sort-arrow">' + (S.dbSort.asc ? '▲' : '▼') + '</span>' : '');
    th.dataset.field = f.InternalName;
    th.addEventListener('click', () => {
      if (S.dbSort.field === f.InternalName) {
        S.dbSort.asc = !S.dbSort.asc;
      } else {
        S.dbSort.field = f.InternalName;
        S.dbSort.asc = true;
      }
      renderDbTable();
    });
    thead.appendChild(th);
  });

  const thDel = document.createElement('th'); thDel.className = 'n365-th-del'; thead.appendChild(thDel);
  const thAdd = document.createElement('th'); thAdd.className = 'n365-th-add';
  thAdd.textContent = '+'; thAdd.title = '列を追加';
  thAdd.addEventListener('click', () => {
    (g('col-name') as HTMLInputElement).value = '';
    (g('col-type') as HTMLSelectElement).value = '2';
    g('col-choices-row').classList.remove('on');
    g('col-md').classList.add('on');
    (g('col-name') as HTMLInputElement).focus();
  });
  thead.appendChild(thAdd);

  getSortedFilteredItems().forEach((item) => { tbody.appendChild(mkDbRow(item, fields)); });
}

export function mkDbRow(item: ListItem, fields: ListField[]): HTMLTableRowElement {
  const tr = document.createElement('tr');
  tr.dataset.id = String(item.Id);
  fields.forEach((f) => {
    const td = document.createElement('td');

    if (f.FieldTypeKind === 6 && f.Choices) {
      const wrapper = document.createElement('div');
      wrapper.style.padding = '4px 12px';
      const sel = document.createElement('select');
      sel.style.cssText = 'border:none;background:transparent;font-size:14px;font-family:inherit;outline:none;cursor:pointer;max-width:140px;';
      const emptyOpt = document.createElement('option');
      emptyOpt.value = ''; emptyOpt.textContent = '—';
      sel.appendChild(emptyOpt);
      f.Choices.forEach((choice) => {
        const opt = document.createElement('option');
        opt.value = choice; opt.textContent = choice;
        if (item[f.InternalName] === choice) opt.selected = true;
        sel.appendChild(opt);
      });

      const choices = f.Choices;
      function renderChip(val: string): void {
        wrapper.innerHTML = '';
        if (val) {
          const idx = choices.indexOf(val) % 6;
          const chip = document.createElement('span');
          chip.className = 'n365-select-chip n365-sc-' + idx;
          chip.textContent = val;
          chip.style.cursor = 'pointer';
          chip.addEventListener('click', () => {
            wrapper.innerHTML = '';
            wrapper.appendChild(sel);
            sel.focus();
          });
          wrapper.appendChild(chip);
        } else {
          wrapper.appendChild(sel);
        }
      }

      sel.addEventListener('change', () => {
        const nv = sel.value;
        const data: Record<string, unknown> = {};
        data[f.InternalName] = nv;
        item[f.InternalName] = nv;
        apiUpdateDbRow(S.dbList, item.Id, data)
          .then(() => { renderChip(nv); })
          .catch((e: Error) => { toast('更新失敗: ' + e.message, 'err'); });
      });
      sel.addEventListener('blur', () => { renderChip(sel.value); });

      renderChip((item[f.InternalName] as string) || '');
      td.appendChild(wrapper);
    } else {
      const span = document.createElement('span');
      span.className = 'n365-dc';
      span.contentEditable = 'true';
      span.textContent = item[f.InternalName] != null ? String(item[f.InternalName]) : '';
      span.dataset.field = f.InternalName;
      let orig = span.textContent || '';
      span.addEventListener('focus', () => { orig = span.textContent || ''; });
      span.addEventListener('keydown', (e) => {
        const ke = e as KeyboardEvent;
        if (ke.key === 'Enter' && !ke.shiftKey) { e.preventDefault(); span.blur(); }
        if (ke.key === 'Escape') { span.textContent = orig; span.blur(); }
      });
      span.addEventListener('blur', () => {
        const nv = (span.textContent || '').trim();
        if (nv === orig.trim()) return;
        const data: Record<string, unknown> = {};
        data[f.InternalName] = nv;
        item[f.InternalName] = nv;
        orig = nv;
        setSave('保存中...');
        apiUpdateDbRow(S.dbList, item.Id, data)
          .then(() => { setSave(''); })
          .catch((e: Error) => { toast('更新失敗: ' + e.message, 'err'); span.textContent = orig; });
      });
      td.appendChild(span);
    }
    tr.appendChild(td);
  });

  const delTd = document.createElement('td');
  delTd.className = 'n365-td-del';
  const delBtn = document.createElement('button');
  delBtn.className = 'n365-del-btn';
  delBtn.title = '行を削除';
  delBtn.textContent = '🗑';
  delBtn.addEventListener('click', () => {
    if (!confirm('この行を削除しますか？')) return;
    setLoad(true, '削除中...');
    deleteListItem(S.dbList, item.Id)
      .then(() => {
        S.dbItems = S.dbItems.filter((i) => i.Id !== item.Id);
        tr.remove();
        toast('削除しました');
      })
      .catch((e: Error) => { toast('削除失敗: ' + e.message, 'err'); })
      .finally(() => { setLoad(false); });
  });
  delTd.appendChild(delBtn);
  tr.appendChild(delTd);
  return tr;
}

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
    col.className = 'n365-kb-col';
    const hd = document.createElement('div');
    hd.className = 'n365-kb-col-hd';
    hd.textContent = choice;
    col.appendChild(hd);

    const colItems = getSortedFilteredItems().filter((item) => {
      const val = (item[choiceField.InternalName] as string) || '';
      return choice === '未設定' ? !val : val === choice;
    });

    colItems.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'n365-kb-card';
      card.textContent = item.Title || '(無題)';
      card.addEventListener('click', () => {
        toast((item.Title || '(無題)') + ' — ' + ((item[choiceField.InternalName] as string) || '未設定'));
      });
      col.appendChild(card);
    });

    kb.appendChild(col);
  });
}
