// Linked-DB inline embed.
//
// Renders an existing DB inline in a page. The page Markdown only stores
// the embed reference (`<!-- memola-linkdb dbId="..." view="table"
// filter="..." -->`); the actual rows + fields are fetched from SP at view
// time. Filter conditions are applied client-side after the fetch.
//
// Read mostly. Click-through for navigation (open the row as a page, or
// open the full DB), but not editing — for that the user opens the full DB.

import { S, type ListField, type ListItem } from '../state';
import { toast } from './ui-helpers';
import { schedSave } from './save-control';
import { escapeHtml } from '../lib/html-escape';
import { metaById } from '../lib/page-store';

const MAX_ROWS_INLINE = 50;     // hard cap so embedding a huge DB stays usable
const VISIBLE_COLS = 4;         // Title + first 3 user columns

/** A single filter condition. Same shape as `S.dbFilters` so the UI
 *  vocabulary stays consistent with the main DB view filter. */
export interface LinkedDbFilter {
  field: string;        // InternalName of the column
  op: 'contains' | 'equals' | 'not_empty' | 'empty';
  value: string;
}

/** Parse the `data-filter` attribute (JSON-encoded LinkedDbFilter[]). */
function parseFilters(raw: string): LinkedDbFilter[] {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.filter((f) =>
      f && typeof f.field === 'string' && typeof f.op === 'string',
    ) as LinkedDbFilter[];
  } catch { return []; }
}

/** Apply AND-combined filters to the rows. Mirrors `getSortedFilteredItems`
 *  in views.ts so the inline embed feels the same as the full DB view. */
function applyFilters(items: ListItem[], filters: LinkedDbFilter[]): ListItem[] {
  if (filters.length === 0) return items;
  return items.filter((item) => {
    for (const flt of filters) {
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

/** この linkdb の編集 state 上のブロックid。 */
function linkdbBlockId(block: HTMLElement): string | null {
  return block.closest<HTMLElement>('[data-block-id]')?.dataset.blockId || null;
}

/** DOM属性の変更を編集 state にも反映する。保存は state(getBlocks)から行われる
 *  ため、属性だけ変えてもページに永続しない(リロードで消える)。 */
function syncBlockState(block: HTMLElement, patch: { filter?: string; cols?: string }): void {
  const id = linkdbBlockId(block);
  if (!id) return;
  void import('./editor2/editor2-bridge').then((m) => m.updateLinkdbProps(id, patch));
}

/** Update the block's `data-filter` attribute and trigger an autosave so
 *  the new filter persists into the page Markdown. Re-renders the block. */
function persistFilters(block: HTMLElement, filters: LinkedDbFilter[]): void {
  if (filters.length === 0) {
    block.removeAttribute('data-filter');
  } else {
    block.setAttribute('data-filter', JSON.stringify(filters));
  }
  // 編集 state にも反映(これが無いと保存されずリロードで元に戻る)。
  syncBlockState(block, { filter: filters.length === 0 ? '' : JSON.stringify(filters) });
  schedSave();
  // Defer to next tick so the DOM mutation observer in the editor has
  // flushed before we re-render.
  setTimeout(() => { void renderOne(block); }, 0);
}

/** 表示列の選択を保存して再描画。names=InternalName配列(空=非表示なし=既定)。 */
function persistCols(block: HTMLElement, names: string[]): void {
  const v = names.length === 0 ? '-' : names.join(',');   // '-' = ユーザー列なし(タイトルのみ)
  block.setAttribute('data-cols', v);
  syncBlockState(block, { cols: v });
  schedSave();
  setTimeout(() => { void renderOne(block); }, 0);
}

/** 表示列の選択ポップオーバー。チェックの増減が即保存・即反映される。
 *  ポップはオーバーレイ直下に置くので、テーブル再描画でも消えない。 */
function showColsEditor(
  block: HTMLElement,
  anchor: HTMLElement,
  allFields: ListField[],
  current: string[],
): void {
  document.getElementById('memola-linkdb-cols-pop')?.remove();
  const overlay = document.getElementById('memola-overlay') || document.body;
  const pop = document.createElement('div');
  pop.id = 'memola-linkdb-cols-pop';
  pop.className = 'memola-colmenu memola-colprops';
  const r0 = anchor.getBoundingClientRect();
  pop.style.left = Math.round(r0.left) + 'px';
  pop.style.top = Math.round(r0.bottom + 4) + 'px';
  const hdr = document.createElement('div');
  hdr.className = 'memola-colmenu-item';
  hdr.style.cssText = 'font-weight:600;color:var(--ink-3);cursor:default';
  hdr.textContent = '⚙ 表示する列';
  pop.appendChild(hdr);
  const checked = new Set(current);
  const fixed = document.createElement('label');
  fixed.className = 'memola-colprops-row';
  fixed.style.cssText = 'align-items:center;opacity:.6;cursor:default';
  fixed.innerHTML = '<input type="checkbox" checked disabled> <span>タイトル（固定）</span>';
  pop.appendChild(fixed);
  for (const f of allFields) {
    const row = document.createElement('label');
    row.className = 'memola-colprops-row';
    row.style.cssText = 'align-items:center;cursor:pointer;gap:8px';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = checked.has(f.InternalName);
    cb.addEventListener('change', () => {
      if (cb.checked) checked.add(f.InternalName); else checked.delete(f.InternalName);
      // allFields の並び順を保って保存(チェック順に並ばないように)。
      persistCols(block, allFields.filter((x) => checked.has(x.InternalName)).map((x) => x.InternalName));
    });
    const lb = document.createElement('span');
    lb.textContent = f.Title;
    row.append(cb, lb);
    pop.appendChild(row);
  }
  overlay.appendChild(pop);
  const r = pop.getBoundingClientRect();
  if (r.right > window.innerWidth - 8) pop.style.left = Math.max(8, window.innerWidth - r.width - 8) + 'px';
  if (r.bottom > window.innerHeight - 8) pop.style.top = Math.max(8, r0.top - r.height - 4) + 'px';
  const onOut = (e: MouseEvent): void => {
    if (!pop.contains(e.target as Node)) { pop.remove(); document.removeEventListener('mousedown', onOut, true); }
  };
  setTimeout(() => document.addEventListener('mousedown', onOut, true), 0);
}

/** Format a single cell value for display. Mirrors a subset of the main DB
 *  table renderer — kept simple to avoid pulling in heavy dependencies. */
function fmtCell(value: unknown, field: ListField): string {
  if (value == null || value === '') return '';
  // Date — already handled as YYYY-MM-DD elsewhere; trim time
  if (field.FieldTypeKind === 4) {
    const s = String(value);
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.substring(0, 10);
    return s;
  }
  if (field.FieldTypeKind === 8) {
    return value ? '☑' : '☐';
  }
  if (typeof value === 'object') {
    const o = value as { results?: unknown[]; Title?: string };
    if (Array.isArray(o.results)) return o.results.map(String).join(', ');
    if (typeof o.Title === 'string') return o.Title;
    return '';
  }
  return String(value);
}

async function renderOne(blockEl: HTMLElement): Promise<void> {
  const dbId = blockEl.getAttribute('data-db-id') || '';
  const meta = metaById(dbId);
  if (!meta || meta.type !== 'database' || !meta.list) {
    blockEl.innerHTML =
      '<div class="memola-linkdb-broken">⚠ DB が見つかりません'
      + (dbId ? ' (id=' + escapeHtml(dbId) + ')' : '')
      + '</div>';
    return;
  }
  const listTitle = meta.list;
  const filters = parseFilters(blockEl.getAttribute('data-filter') || '');

  // Skeleton while loading
  blockEl.innerHTML = '<div class="memola-linkdb-loading">読み込み中…</div>';

  let fields: ListField[] = [];
  let allItems: ListItem[] = [];
  try {
    const sp = await import('../api/sp-list');
    [fields, allItems] = await Promise.all([
      sp.getListFields(listTitle),
      sp.getListItems(listTitle),
    ]);
    // 管理用の内部列(Trashed/TrashedBy/Body_blocks)は表示しない(DB一覧と同じ扱い)。
    const { stripInternalDbFields } = await import('../api/db');
    fields = stripInternalDbFields(fields);
    // ゴミ箱(ソフト削除)行も除外。
    allItems = allItems.filter((it) => !(typeof it.Trashed === 'number' && it.Trashed > 0));
  } catch (e) {
    blockEl.innerHTML =
      '<div class="memola-linkdb-error">読み込み失敗: '
      + escapeHtml((e as Error).message) + '</div>';
    return;
  }

  // Pick columns: Title + first N user fields (skip Title-the-column since
  // it's rendered separately, plus a few SP-built-ins).
  // NOTE: Don't filter by `startsWith('_')` — SP encodes Japanese (and any
  // non-ASCII) field titles into InternalNames like `_x65e5__x4ed8_` for
  // 「日付」, so a blanket underscore-prefix filter silently hides every
  // Japanese-named user column (the bug that left only Title visible).
  const sysFields = new Set(['Title', 'ContentType', 'Attachments', '_memola_body']);
  const userFields = fields.filter(
    (f) => !sysFields.has(f.InternalName) && !sysFields.has(f.Title),
  );
  // Filter columns include Title at the front. The filter UI offers
  // selecting any visible column (including Title) as a filter target.
  const filterableFields: Array<{ internal: string; title: string }> = [
    { internal: 'Title', title: 'タイトル' },
    ...userFields.map((f) => ({ internal: f.InternalName, title: f.Title })),
  ];
  // 表示列: data-cols(InternalNameカンマ区切り)があればそれに従う。
  // '-' はユーザー列なし(タイトルのみ)。未指定は既定(先頭N列)。
  const colsAttr = (blockEl.getAttribute('data-cols') || '').trim();
  const selectedFields = colsAttr === '-' ? []
    : colsAttr
      ? colsAttr.split(',').map((s) => s.trim()).filter(Boolean)
          .map((n) => userFields.find((f) => f.InternalName === n))
          .filter((f): f is ListField => !!f)
      : userFields.slice(0, VISIBLE_COLS - 1);
  const cols: Array<{ field: ListField | null; label: string; key: string }> = [
    { field: null, label: 'タイトル', key: 'Title' },
    ...selectedFields.map((f) => ({
      field: f, label: f.Title, key: f.InternalName,
    })),
  ];

  // Apply filters AFTER fetching everything (SP $filter could be used to
  // server-filter, but client-side keeps the implementation small and
  // works for `contains` semantics that OData filters express awkwardly).
  const items = applyFilters(allItems, filters);

  // Build the mini-table HTML
  const total = items.length;
  const totalUnfiltered = allItems.length;
  const shown = Math.min(total, MAX_ROWS_INLINE);
  const truncated = total > MAX_ROWS_INLINE;

  const head = '<thead><tr>'
    + cols.map((c) => '<th>' + escapeHtml(c.label) + '</th>').join('')
    + '</tr></thead>';
  const body = '<tbody>'
    + items.slice(0, shown).map((it) => {
      const cells = cols.map((c) => {
        if (c.key === 'Title') {
          return '<td class="memola-linkdb-title-cell" data-row-id="'
            + (it.Id) + '">'
            + escapeHtml(String(it.Title || '無題'))
            + '</td>';
        }
        const f = c.field as ListField;
        return '<td class="memola-linkdb-cell" data-rid="' + it.Id + '" data-f="'
          + escapeHtml(c.key) + '">' + escapeHtml(fmtCell(it[c.key], f)) + '</td>';
      }).join('');
      return '<tr data-row-id="' + (it.Id) + '">' + cells + '</tr>';
    }).join('')
    + '</tbody>';

  const icon = meta.icon || '🗃';
  const filterBtnLabel = filters.length > 0
    ? '🔎 フィルタ (' + filters.length + ')'
    : '🔎 フィルタ';
  const countText = filters.length > 0
    ? total + ' / ' + totalUnfiltered + ' 件'
    : total + ' 件';
  const header =
    '<div class="memola-linkdb-header">'
    + '<span class="memola-linkdb-icon">' + escapeHtml(icon) + '</span>'
    + '<span class="memola-linkdb-name">' + escapeHtml(meta.title) + '</span>'
    + '<span class="memola-linkdb-count">' + countText
    + (truncated ? ' (上位 ' + shown + ' 件を表示)' : '')
    + '</span>'
    + '<button class="memola-linkdb-cols" type="button" title="表示する列を選択">⚙ 列</button>'
    + '<button class="memola-linkdb-filter" type="button" title="フィルタ条件を編集">'
    + escapeHtml(filterBtnLabel) + '</button>'
    + '<button class="memola-linkdb-open" type="button" title="DB を開く">↗ 開く</button>'
    + '</div>';

  // Filter chip strip (visible only when filters exist) — read-only summary
  // for at-a-glance "what's filtered". Click any chip to reopen the editor.
  const fieldTitleOf = (internal: string): string => {
    const f = filterableFields.find((x) => x.internal === internal);
    return f ? f.title : internal;
  };
  const opLabel = (op: LinkedDbFilter['op']): string => {
    if (op === 'contains') return '含む';
    if (op === 'equals') return '＝';
    if (op === 'not_empty') return '空でない';
    if (op === 'empty') return '空';
    return op;
  };
  const filterStrip = filters.length > 0
    ? '<div class="memola-linkdb-filterchips">'
      + filters.map((f) => '<span class="memola-linkdb-chip">'
        + escapeHtml(fieldTitleOf(f.field)) + ' ' + escapeHtml(opLabel(f.op))
        + (f.op === 'empty' || f.op === 'not_empty' ? '' : ': ' + escapeHtml(f.value))
        + '</span>').join('')
      + '</div>'
    : '';

  blockEl.innerHTML = header + filterStrip
    + '<div class="memola-linkdb-tablewrap"><table class="memola-linkdb-table">'
    + head + body
    + '</table></div>';

  // ── Wire interactions
  // 1) ↗ button → navigate to the full DB
  const openBtn = blockEl.querySelector<HTMLElement>('.memola-linkdb-open');
  openBtn?.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    void import('./views').then((m) => m.doSelect(dbId));
  });

  // 1a) ⚙ 列 button → 表示列の選択ポップオーバー
  const colsBtn = blockEl.querySelector<HTMLElement>('.memola-linkdb-cols');
  colsBtn?.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    showColsEditor(blockEl, colsBtn, userFields, selectedFields.map((f) => f.InternalName));
  });

  // 1b) 🔎 filter button → open inline filter editor popover
  const filterBtn = blockEl.querySelector<HTMLElement>('.memola-linkdb-filter');
  filterBtn?.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    showFilterEditor(blockEl, filterBtn, filterableFields, filters);
  });
  // Click on a chip in the strip also opens the editor
  blockEl.querySelectorAll<HTMLElement>('.memola-linkdb-chip').forEach((chip) => {
    chip.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      showFilterEditor(blockEl, filterBtn || chip, filterableFields, filters);
    });
  });

  // 1c) セル編集(非タイトル列)。型に応じて テキスト/数値/日付=インライン入力、
  //     選択肢=ピッカー、チェック=トグル。コミットは apiUpdateDbRow(本体DBと同経路)。
  const commitCell = (td: HTMLElement, f: ListField, it: ListItem, nv: unknown): void => {
    const old = it[f.InternalName];
    if (String(old ?? '') === String(nv ?? '')) { td.textContent = fmtCell(old, f); return; }
    const data: Record<string, unknown> = {};
    data[f.Title || f.InternalName] = nv;
    void import('../api/db').then((m) => m.apiUpdateDbRow(listTitle, it.Id, data))
      .then(() => {
        it[f.InternalName] = nv;
        td.textContent = fmtCell(nv, f);
        void import('./db-history')
          .then((h) => h.recordCellChange(listTitle, it.Id, f.InternalName, f.Title, old, nv))
          .catch(() => undefined);
      })
      .catch((err: Error) => {
        td.textContent = fmtCell(old, f);
        void import('./ui-helpers').then((u) => u.toast('保存失敗: ' + err.message, 'err'));
      });
  };
  blockEl.querySelectorAll<HTMLElement>('td.memola-linkdb-cell').forEach((td) => {
    td.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      if (td.querySelector('input')) return;        // 既に編集中
      const rid = parseInt(td.dataset.rid || '0', 10);
      const fkey = td.dataset.f || '';
      const it = items.find((x) => x.Id === rid);
      const col = cols.find((c) => c.key === fkey);
      const f = col?.field;
      if (!it || !f) return;
      if (f.FieldTypeKind === 8) {                  // チェック: クリックでトグル
        commitCell(td, f, it, it[f.InternalName] ? '0' : '1');
        return;
      }
      if (f.FieldTypeKind === 6 && f.Choices) {     // 選択肢: ピッカー(色付き)
        void Promise.all([import('./choice-popover'), import('./tag-colors')]).then(([cp, tc]) => {
          const choices = f.Choices || [];
          const itemsP = [
            { value: '', label: '—' },
            ...choices.map((c) => ({ value: c, label: c, color: tc.resolveTagColor(listTitle, f.InternalName, c, choices) })),
          ];
          cp.openChoicePopover(td, itemsP, String(it[f.InternalName] ?? ''), (nv) => commitCell(td, f, it, nv));
        });
        return;
      }
      // テキスト/複数行/数値/日付: インライン入力
      const inp = document.createElement('input');
      inp.type = 'text';
      inp.className = 'memola-linkdb-cellinp';
      inp.value = f.FieldTypeKind === 4 ? fmtCell(it[f.InternalName], f) : String(it[f.InternalName] ?? '');
      if (f.FieldTypeKind === 4) inp.placeholder = 'YYYY-MM-DD';
      td.textContent = '';
      td.appendChild(inp);
      inp.focus(); inp.select();
      let done = false;
      const finish = (commit: boolean): void => {
        if (done) return; done = true;
        const raw = inp.value.trim();
        if (!commit) { td.textContent = fmtCell(it[f.InternalName], f); return; }
        if (f.FieldTypeKind === 4 && raw) {
          void import('../lib/date-utils').then((d) => {
            const norm = d.parseFlexibleDate(raw);
            if (!norm) {
              void import('./ui-helpers').then((u) => u.toast('日付形式が無効です: ' + raw, 'err'));
              td.textContent = fmtCell(it[f.InternalName], f);
            } else commitCell(td, f, it, norm);
          });
          return;
        }
        commitCell(td, f, it, raw);
      };
      inp.addEventListener('blur', () => finish(true));
      inp.addEventListener('keydown', (ke) => {
        ke.stopPropagation();
        if (ke.key === 'Enter') { ke.preventDefault(); finish(true); }
        if (ke.key === 'Escape') { finish(false); }
      });
    });
  });

  // 2) Title cell click → open the row as a page
  blockEl.querySelectorAll<HTMLElement>('.memola-linkdb-title-cell').forEach((td) => {
    td.addEventListener('click', async (e) => {
      e.preventDefault(); e.stopPropagation();
      const rowId = parseInt(td.dataset.rowId || '0', 10);
      if (!rowId) return;
      const it = items.find((x) => x.Id === rowId);
      if (!it) return;
      try {
        // Switch to the DB first so S.dbList / S.dbItems / S.dbFields are
        // hydrated. openRowAsPage relies on those.
        const v = await import('./views');
        const dbPage = S.pages.find((p) => p.Id === dbId);
        if (!dbPage) { toast('DB ページが見つかりません', 'err'); return; }
        await v.doSelectDb(dbId, dbPage);
        const r = await import('./row-page');
        const live = S.dbItems.find((x) => x.Id === rowId) || it;
        // DB は1タブ、行は新しいタブで開く(openRowInActiveTab が未オープン→新タブ)。
        await r.openRowAsPage(dbId, live);
      } catch (err) {
        toast('行を開けませんでした: ' + (err as Error).message, 'err');
      }
    });
  });
}

/** Walk a rendered editor DOM and populate every linked-DB placeholder.
 *  Called from doSelect after `apiLoadContent` returns. Idempotent — calling
 *  twice on the same DOM just re-fetches and re-renders. */
export function renderAllLinkedDbs(root: Element): void {
  const blocks = root.querySelectorAll<HTMLElement>('.memola-linkdb');
  blocks.forEach((b) => { void renderOne(b); });
}

// ── Filter editor popover ───────────────────────────────────────────────
//
// Notion-style: anchored under the 🔎 button. Shows a list of current
// filters, each editable inline (field / op / value). "+ 追加" appends a
// blank row. "適用" persists to the block's data-filter attribute.

let _filterPopover: HTMLElement | null = null;

function closeFilterPopover(): void {
  if (_filterPopover) { _filterPopover.remove(); _filterPopover = null; }
  document.removeEventListener('mousedown', onPopoverOutsideClick, true);
}

function onPopoverOutsideClick(e: MouseEvent): void {
  if (!_filterPopover) return;
  if (_filterPopover.contains(e.target as Node)) return;
  closeFilterPopover();
}

function showFilterEditor(
  block: HTMLElement,
  anchor: HTMLElement,
  fields: Array<{ internal: string; title: string }>,
  initial: LinkedDbFilter[],
): void {
  closeFilterPopover();
  // Snapshot the current filter list — edits accumulate in here, only
  // committed on 適用 click.
  const draft: LinkedDbFilter[] = initial.map((f) => ({ ...f }));

  const pop = document.createElement('div');
  pop.className = 'memola-linkdb-fpop';
  pop.addEventListener('click', (e) => e.stopPropagation());

  function render(): void {
    const fieldOptions = fields.map((f) =>
      '<option value="' + escapeHtml(f.internal) + '">' + escapeHtml(f.title) + '</option>',
    ).join('');
    const opOptions = [
      ['contains', '含む'],
      ['equals', '＝ (完全一致)'],
      ['not_empty', '空でない'],
      ['empty', '空'],
    ].map(([v, l]) => '<option value="' + v + '">' + l + '</option>').join('');

    const rows = draft.map((f, idx) => {
      const needsValue = f.op !== 'empty' && f.op !== 'not_empty';
      return '<div class="memola-linkdb-frow" data-idx="' + idx + '">'
        + '<select class="memola-linkdb-ffield">' + fieldOptions + '</select>'
        + '<select class="memola-linkdb-fop">' + opOptions + '</select>'
        + (needsValue
          ? '<input class="memola-linkdb-fval" type="text" placeholder="値…" value="' + escapeHtml(f.value) + '">'
          : '<span class="memola-linkdb-fval-na">—</span>')
        + '<button class="memola-linkdb-frm" title="削除">×</button>'
        + '</div>';
    }).join('');
    const empty = draft.length === 0
      ? '<div class="memola-linkdb-fempty">フィルタ条件はありません。「+ 追加」で条件を加えてください。</div>'
      : '';
    pop.innerHTML =
      '<div class="memola-linkdb-fhd">' +
        '<span>🔎 フィルタ条件 (AND)</span>' +
        '<button class="memola-linkdb-fclose" title="閉じる">×</button>' +
      '</div>' +
      '<div class="memola-linkdb-fbody">' + empty + rows + '</div>' +
      '<div class="memola-linkdb-fft">' +
        '<button class="memola-linkdb-fadd">+ 追加</button>' +
        '<span style="flex:1"></span>' +
        '<button class="memola-linkdb-fclear">全クリア</button>' +
        '<button class="memola-linkdb-fapply">適用</button>' +
      '</div>';

    // Sync select values to draft (HTML 'selected' attribute on dynamic
    // option lists is unreliable across re-renders — set after innerHTML).
    pop.querySelectorAll<HTMLElement>('.memola-linkdb-frow').forEach((rowEl) => {
      const idx = parseInt(rowEl.dataset.idx || '-1', 10);
      if (idx < 0) return;
      const f = draft[idx];
      const fieldSel = rowEl.querySelector<HTMLSelectElement>('.memola-linkdb-ffield');
      const opSel = rowEl.querySelector<HTMLSelectElement>('.memola-linkdb-fop');
      if (fieldSel) fieldSel.value = f.field || fields[0]?.internal || '';
      if (opSel) opSel.value = f.op;
      // Wire change handlers
      fieldSel?.addEventListener('change', () => { f.field = fieldSel.value; });
      opSel?.addEventListener('change', () => {
        f.op = opSel.value as LinkedDbFilter['op'];
        // empty / not_empty don't take a value — re-render so the input
        // becomes a placeholder dash and value clears.
        if (f.op === 'empty' || f.op === 'not_empty') f.value = '';
        render();
      });
      const valInp = rowEl.querySelector<HTMLInputElement>('.memola-linkdb-fval');
      valInp?.addEventListener('input', () => { f.value = valInp.value; });
      const rmBtn = rowEl.querySelector<HTMLElement>('.memola-linkdb-frm');
      rmBtn?.addEventListener('click', () => {
        draft.splice(idx, 1);
        render();
      });
    });

    pop.querySelector<HTMLElement>('.memola-linkdb-fadd')?.addEventListener('click', () => {
      draft.push({ field: fields[0]?.internal || 'Title', op: 'contains', value: '' });
      render();
    });
    pop.querySelector<HTMLElement>('.memola-linkdb-fclear')?.addEventListener('click', () => {
      if (draft.length === 0) return;
      if (!confirm('全ての条件を削除します。よろしいですか?')) return;
      draft.length = 0;
      render();
    });
    pop.querySelector<HTMLElement>('.memola-linkdb-fapply')?.addEventListener('click', () => {
      // Drop empty value rows for ops that require a value
      const cleaned = draft.filter((f) => {
        if (!f.field) return false;
        if (f.op === 'empty' || f.op === 'not_empty') return true;
        return !!f.value;
      });
      persistFilters(block, cleaned);
      closeFilterPopover();
    });
    pop.querySelector<HTMLElement>('.memola-linkdb-fclose')?.addEventListener('click', () => {
      closeFilterPopover();
    });
  }
  render();

  // Position under the anchor button (right-aligned to it)
  const overlay = document.getElementById('memola-overlay') || document.body;
  overlay.appendChild(pop);
  const rect = anchor.getBoundingClientRect();
  pop.style.position = 'fixed';
  pop.style.top = (rect.bottom + 6) + 'px';
  // Prefer right-alignment unless that goes off-screen
  const popW = 380;
  let left = rect.right - popW;
  if (left < 8) left = 8;
  pop.style.left = left + 'px';
  pop.style.width = popW + 'px';

  _filterPopover = pop;
  // Capture-phase outside-click handler
  setTimeout(() => {
    document.addEventListener('mousedown', onPopoverOutsideClick, true);
  }, 0);
}

/** Insert a fresh linked-DB block at the current caret position. Used by
 *  the slash command after the user picks a DB from the picker. */
export function insertLinkedDb(dbId: string, view: 'table' = 'table'): void {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;
  const wrap = document.createElement('div');
  wrap.className = 'memola-linkdb';
  wrap.setAttribute('contenteditable', 'false');
  wrap.setAttribute('data-db-id', dbId);
  wrap.setAttribute('data-view', view);
  // Inserted as a block; create a following <p> so the caret can move past
  // the embed and the editor can keep accepting input.
  const trailer = document.createElement('p');
  trailer.appendChild(document.createElement('br'));

  const range = sel.getRangeAt(0);
  range.insertNode(trailer);
  range.insertNode(wrap);

  // Caret right after the embed
  const r = document.createRange();
  r.setStart(trailer, 0);
  r.collapse(true);
  sel.removeAllRanges();
  sel.addRange(r);

  // Render asynchronously
  void renderOne(wrap);
}
