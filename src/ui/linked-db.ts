// Linked-DB inline embed.
//
// Renders an existing DB inline in a page. The page Markdown only stores
// the embed reference (`<!-- n365-linkdb dbId="..." view="table" -->`); the
// actual rows + fields are fetched from SP at view time.
//
// Read mostly. Click-through for navigation (open the row as a page, or
// open the full DB), but not editing — for that the user opens the full DB.

import { S, type ListField, type ListItem } from '../state';
import { toast } from './ui-helpers';

const MAX_ROWS_INLINE = 50;     // hard cap so embedding a huge DB stays usable
const VISIBLE_COLS = 4;         // Title + first 3 user columns

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
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
  const meta = S.meta.pages.find((p) => p.id === dbId);
  if (!meta || meta.type !== 'database' || !meta.list) {
    blockEl.innerHTML =
      '<div class="n365-linkdb-broken">⚠ DB が見つかりません'
      + (dbId ? ' (id=' + escapeHtml(dbId) + ')' : '')
      + '</div>';
    return;
  }
  const listTitle = meta.list;

  // Skeleton while loading
  blockEl.innerHTML = '<div class="n365-linkdb-loading">読み込み中…</div>';

  let fields: ListField[] = [];
  let items: ListItem[] = [];
  try {
    const sp = await import('../api/sp-list');
    [fields, items] = await Promise.all([
      sp.getListFields(listTitle),
      sp.getListItems(listTitle),
    ]);
  } catch (e) {
    blockEl.innerHTML =
      '<div class="n365-linkdb-error">読み込み失敗: '
      + escapeHtml((e as Error).message) + '</div>';
    return;
  }

  // Pick columns: Title + first N user fields (skip system / hidden)
  const sysFields = new Set(['Title', 'ContentType', 'Attachments', '_n365_body']);
  const userFields = fields.filter(
    (f) => !sysFields.has(f.InternalName) && !f.InternalName.startsWith('_'),
  );
  const cols: Array<{ field: ListField | null; label: string; key: string }> = [
    { field: null, label: 'タイトル', key: 'Title' },
    ...userFields.slice(0, VISIBLE_COLS - 1).map((f) => ({
      field: f, label: f.Title, key: f.InternalName,
    })),
  ];

  // Build the mini-table HTML
  const total = items.length;
  const shown = Math.min(total, MAX_ROWS_INLINE);
  const truncated = total > MAX_ROWS_INLINE;

  const head = '<thead><tr>'
    + cols.map((c) => '<th>' + escapeHtml(c.label) + '</th>').join('')
    + '</tr></thead>';
  const body = '<tbody>'
    + items.slice(0, shown).map((it) => {
      const cells = cols.map((c) => {
        if (c.key === 'Title') {
          return '<td class="n365-linkdb-title-cell" data-row-id="'
            + (it.Id) + '">'
            + escapeHtml(String(it.Title || '無題'))
            + '</td>';
        }
        const f = c.field as ListField;
        return '<td>' + escapeHtml(fmtCell(it[c.key], f)) + '</td>';
      }).join('');
      return '<tr data-row-id="' + (it.Id) + '">' + cells + '</tr>';
    }).join('')
    + '</tbody>';

  const icon = meta.icon || '🗃';
  const header =
    '<div class="n365-linkdb-header">'
    + '<span class="n365-linkdb-icon">' + escapeHtml(icon) + '</span>'
    + '<span class="n365-linkdb-name">' + escapeHtml(meta.title) + '</span>'
    + '<span class="n365-linkdb-count">' + total + ' 件'
    + (truncated ? ' (上位 ' + shown + ' 件を表示)' : '')
    + '</span>'
    + '<button class="n365-linkdb-open" type="button" title="DB を開く">↗ 開く</button>'
    + '</div>';

  blockEl.innerHTML = header
    + '<div class="n365-linkdb-tablewrap"><table class="n365-linkdb-table">'
    + head + body
    + '</table></div>';

  // ── Wire interactions
  // 1) ↗ button → navigate to the full DB
  const openBtn = blockEl.querySelector<HTMLElement>('.n365-linkdb-open');
  openBtn?.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    void import('./views').then((m) => m.doSelect(dbId));
  });

  // 2) Title cell click → open the row as a page
  blockEl.querySelectorAll<HTMLElement>('.n365-linkdb-title-cell').forEach((td) => {
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
  const blocks = root.querySelectorAll<HTMLElement>('.n365-linkdb');
  blocks.forEach((b) => { void renderOne(b); });
}

/** Insert a fresh linked-DB block at the current caret position. Used by
 *  the slash command after the user picks a DB from the picker. */
export function insertLinkedDb(dbId: string, view: 'table' = 'table'): void {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;
  const wrap = document.createElement('div');
  wrap.className = 'n365-linkdb';
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
