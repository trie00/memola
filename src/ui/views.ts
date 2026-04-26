// Page / database view switching, table & kanban rendering.

import { S, type ListField, type ListItem, type Page } from '../state';
import { g, getEd } from './dom';
import { setLoad, setSave, toast, autoR } from './ui-helpers';
import { renderTree, ancs, renderBc } from './tree';
import { apiLoadContent, apiLoadFileMeta } from '../api/pages';
import { startWatching, stopWatching } from './sync-watch';
import { applyOutlineState } from './outline';
import { applyPropertiesState } from './properties-panel';
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

/** Render the breadcrumb from a custom list of {label, onClick?} segments. */
export function renderBcCustom(segments: { label: string; onClick?: () => void }[]): void {
  const bc = g('bc');
  bc.innerHTML = '';
  segments.forEach((seg, i) => {
    const s = document.createElement('span');
    s.className = 'n365-bi';
    s.textContent = seg.label;
    if (seg.onClick) s.addEventListener('click', seg.onClick);
    else s.style.cursor = 'default';
    bc.appendChild(s);
    if (i < segments.length - 1) {
      const sep = document.createElement('span');
      sep.textContent = '/';
      sep.style.color = '#e9e9e7';
      sep.style.margin = '0 4px';
      bc.appendChild(sep);
    }
  });
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
  S.currentRow = null;          // 別のページ/DB 選択時は行ページモードを解除
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
      // Re-bind inline-table cell handlers (Tab nav, hover buttons) after load
      void import('./inline-table').then((m) => m.reattachInlineTables(getEd()));
      // Track file meta so we can detect remote updates and conflicts on save
      const fm = await apiLoadFileMeta(id);
      if (fm) startWatching(id, fm.modified, fm.etag);
      else stopWatching();
      applyOutlineState();
      applyPropertiesState();
    } catch (e) {
      getEd().innerHTML = '';
      toast('読み込み失敗: ' + (e as Error).message, 'err');
      stopWatching();
    } finally { setLoad(false); }
    setSave(''); S.dirty = false;
  }
}

export async function doSelectDb(id: string, page: Page): Promise<void> {
  S.currentType = 'database';
  stopWatching();
  applyOutlineState();
  applyPropertiesState();
  const meta = S.meta.pages.find((p) => p.id === id);
  if (!meta || !meta.list) { toast('DBメタ情報が見つかりません', 'err'); return; }
  showView('db');
  g('dv-ttl').textContent = page.Title || '無題';

  const dvIcon = g('dv-pg-icon');
  const dvAddIcon = g('dv-add-icon');
  if (meta.icon) {
    dvIcon.textContent = meta.icon;
    dvIcon.style.display = 'inline-block';
    dvAddIcon.style.display = 'none';
  } else {
    dvIcon.style.display = 'none';
    dvAddIcon.style.display = 'inline-flex';
  }

  setLoad(true, 'データを読み込み中...');
  try {
    // 既存DBに本文用の隠し列が無ければ追加 (errorは無視)
    void import('../api/db').then((m) => m.ensureRowBodyField(meta.list as string));
    const results = await Promise.all([getListFields(meta.list), getListItems(meta.list)]);
    S.dbFields = results[0];
    S.dbItems  = results[1];
    S.dbList   = meta.list;
    S.dbFilter = '';
    S.dbFilters = [];
    S.dbSort   = { field: null, asc: true };
    void import('./filter-ui').then((m) => m.renderFilterChips());
    renderDbTable();
  } catch (e) { toast('DB読み込み失敗: ' + (e as Error).message, 'err'); }
  finally { setLoad(false); }
}

export function getDbFields(): ListField[] {
  return S.dbFields.filter((f) => [2, 4, 6, 8, 9].indexOf(f.FieldTypeKind) >= 0);
}

function getSortedFilteredItems(): ListItem[] {
  let items = S.dbItems.slice();
  // 旧 single-text filter（後方互換）
  if (S.dbFilter) {
    const q = S.dbFilter.toLowerCase();
    items = items.filter((item) => !item.Title || item.Title.toLowerCase().includes(q));
  }
  // Notion 風の複数フィールド AND フィルター
  if (S.dbFilters.length > 0) {
    // 動的import回避のため inline 評価（filter-ui.ts と同等ロジック）
    items = items.filter((item) => {
      for (const flt of S.dbFilters) {
        if (!flt.value && flt.op !== 'empty' && flt.op !== 'not_empty') continue;
        const raw = item[flt.field];
        const s = raw == null ? '' : String(raw);
        if (flt.op === 'equals') {
          if (s !== flt.value) return false;
        } else if (flt.op === 'not_empty') {
          if (!s) return false;
        } else if (flt.op === 'empty') {
          if (s) return false;
        } else {
          if (!s.toLowerCase().includes(flt.value.toLowerCase())) return false;
        }
      }
      return true;
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
    const headerSpan = document.createElement('span');
    headerSpan.className = 'n365-th-label';
    headerSpan.innerHTML = f.Title + (isSorted ? '<span class="sort-arrow">' + (S.dbSort.asc ? '▲' : '▼') + '</span>' : '');
    th.appendChild(headerSpan);
    th.dataset.field = f.InternalName;
    const savedW = S.dbColumnWidths[f.InternalName];
    if (savedW) th.style.width = savedW + 'px';
    headerSpan.addEventListener('click', () => {
      if (S.dbSort.field === f.InternalName) {
        S.dbSort.asc = !S.dbSort.asc;
      } else {
        S.dbSort.field = f.InternalName;
        S.dbSort.asc = true;
      }
      renderDbTable();
    });
    // Resize handle
    const handle = document.createElement('div');
    handle.className = 'n365-col-resize';
    handle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const startX = e.clientX;
      const startW = th.offsetWidth;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      function onMove(ev: MouseEvent): void {
        const newW = Math.max(60, startW + ev.clientX - startX);
        th.style.width = newW + 'px';
        S.dbColumnWidths[f.InternalName] = newW;
      }
      function onUp(): void {
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
    th.appendChild(handle);
    thead.appendChild(th);
  });

  // Delete column header (icon column)
  const thDel = document.createElement('th'); thDel.className = 'n365-th-del'; thead.appendChild(thDel);
  // "+" column right after the data columns
  const thAdd = document.createElement('th'); thAdd.className = 'n365-th-add';
  thAdd.textContent = '+'; thAdd.title = '列を追加';
  thAdd.addEventListener('click', () => {
    (g('col-name') as HTMLInputElement).value = '';
    // Reset grid type selection by clicking the first tile (syncs _colTypeKind in wiring.ts)
    const tiles = document.querySelectorAll<HTMLDivElement>('#n365-col-type-grid .n365-col-type');
    if (tiles[0]) tiles[0].click();
    // Reset choices & SP map fields
    const choicesEl = document.getElementById('n365-col-choices') as HTMLTextAreaElement | null;
    if (choicesEl) choicesEl.value = '';
    g('col-choices-row').classList.remove('on');
    const spmap = document.getElementById('n365-col-spmap') as HTMLInputElement | null;
    if (spmap) spmap.value = '';
    g('col-md').classList.add('on');
    (g('col-name') as HTMLInputElement).focus();
  });
  thead.appendChild(thAdd);
  // Spacer column to absorb remaining horizontal space (so + stays adjacent to last data column)
  const thSpacer = document.createElement('th');
  thSpacer.className = 'n365-th-spacer';
  thead.appendChild(thSpacer);

  getSortedFilteredItems().forEach((item) => { tbody.appendChild(mkDbRow(item, fields)); });
}

// ── Date helpers (JST) ─────────────────────────────────
// SP は UTC ISO を返すので、JST に変換して YYYY-MM-DD で表示。
// 入力 (YYYY-MM-DD) は JST 0時として UTC ISO に戻して保存。
function formatDateJST(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  const y = jst.getUTCFullYear();
  const m = String(jst.getUTCMonth() + 1).padStart(2, '0');
  const day = String(jst.getUTCDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
}
function parseDateJSTToISO(yyyymmdd: string): string | null {
  if (!yyyymmdd) return null;
  // "2025-11-16" → JST 0時 → UTC ISO
  const t = new Date(yyyymmdd + 'T00:00:00+09:00');
  if (isNaN(t.getTime())) return null;
  return t.toISOString();
}

export function mkDbRow(item: ListItem, fields: ListField[]): HTMLTableRowElement {
  const tr = document.createElement('tr');
  tr.dataset.id = String(item.Id);
  fields.forEach((f) => {
    const td = document.createElement('td');

    if (f.FieldTypeKind === 4) {
      // ── Date cell (JST display, JST 0時 → UTC ISO で保存) ──
      const wrapper = document.createElement('div');
      wrapper.className = 'n365-dc-date';
      let raw = (item[f.InternalName] as string) || '';
      function renderText(): void {
        const txt = formatDateJST(raw);
        wrapper.innerHTML = '';
        const span = document.createElement('span');
        span.textContent = txt || '—';
        if (!txt) span.style.color = 'var(--ink-4)';
        wrapper.appendChild(span);
      }
      function showInput(): void {
        wrapper.innerHTML = '';
        const inp = document.createElement('input');
        inp.type = 'date';
        inp.className = 'n365-dc-date-inp';
        inp.value = formatDateJST(raw);
        wrapper.appendChild(inp);
        inp.focus();
        let committing = false;
        function commit(val: string): void {
          if (committing) return;
          committing = true;
          const newIso = parseDateJSTToISO(val);
          if (newIso === raw || (!newIso && !raw)) { renderText(); return; }
          const oldIso = raw;
          raw = newIso || '';
          item[f.InternalName] = newIso;
          setSave('保存中...');
          const data: Record<string, unknown> = {};
          data[f.InternalName] = newIso;
          apiUpdateDbRow(S.dbList, item.Id, data)
            .then(() => { setSave(''); renderText(); })
            .catch((e: Error) => {
              toast('更新失敗: ' + e.message, 'err');
              raw = oldIso; item[f.InternalName] = oldIso; renderText();
            });
        }
        inp.addEventListener('change', () => commit(inp.value));
        inp.addEventListener('blur', () => commit(inp.value));
        inp.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') { e.preventDefault(); commit(inp.value); }
          if (e.key === 'Escape') { renderText(); }
        });
      }
      wrapper.addEventListener('click', () => {
        if (!wrapper.querySelector('input')) showInput();
      });
      renderText();
      td.appendChild(wrapper);
    } else if (f.FieldTypeKind === 6 && f.Choices) {
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
      const isMulti = f.FieldTypeKind === 3;
      const span = document.createElement('span');
      span.className = 'n365-dc' + (isMulti ? ' multi' : '');
      span.contentEditable = 'true';
      span.textContent = item[f.InternalName] != null ? String(item[f.InternalName]) : '';
      span.dataset.field = f.InternalName;
      let orig = span.textContent || '';
      span.addEventListener('focus', () => { orig = span.textContent || ''; });
      span.addEventListener('keydown', (e) => {
        const ke = e as KeyboardEvent;
        if (ke.isComposing || ke.keyCode === 229) return;
        if (ke.key === 'Escape') { span.textContent = orig; span.blur(); return; }
        if (ke.key === 'Enter') {
          if (isMulti) {
            // 複数行: Cmd/Ctrl+Enter で確定。普通の Enter は改行 (default)
            if (ke.metaKey || ke.ctrlKey) { e.preventDefault(); span.blur(); }
          } else {
            // 単行: Enter で確定、Shift+Enter で改行（テキスト型なので保存時に \n は trim 推奨）
            if (!ke.shiftKey) { e.preventDefault(); span.blur(); }
          }
        }
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
      // タイトル列にホバー時「↗」を表示し、行をページとして開く
      if (f.InternalName === 'Title') {
        td.style.position = 'relative';
        span.style.fontWeight = '500';
        const openBtn = document.createElement('button');
        openBtn.className = 'n365-row-open';
        openBtn.title = '行を開く（ページ表示）';
        openBtn.textContent = '↗';
        openBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          void import('./row-page').then((m) => m.openRowAsPage(S.currentId || '', item));
        });
        td.appendChild(openBtn);
      }
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
  // Add empty cells for "+" column and spacer column to keep alignment
  tr.appendChild(document.createElement('td'));
  const spacerTd = document.createElement('td');
  spacerTd.className = 'n365-td-spacer';
  tr.appendChild(spacerTd);
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
