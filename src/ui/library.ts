// Library — a Notion-style "all pages" view.
//
// Shows every non-draft page/DB for the selected scope (プライベート /
// 組織) as a database-like table. Parent/child pages render as a
// collapsible tree (toggle per row). Columns: タイトル(link) / 種別 /
// 更新者 / 更新日. A client-side title filter narrows the list.
//
// Last-editor / last-modified aren't kept in the page meta cache, so we
// fetch Id+Modified+Editor for both backing lists when the view opens
// and map each row to its canonical pageId via `pageIdForListItem`.

import { S, type Page } from '../state';
import { g } from './dom';
import { doSelect, showView, renderBcCustom } from './views';
import { renderTree } from './tree';
import { pushViewHistory } from './nav-history';
import { stopWatching } from './sync-watch';
import { flushPendingSave } from './save-control';
import { metaById } from '../lib/page-store';
import { escapeHtml } from '../lib/html-escape';
import { setLoad, toast } from './ui-helpers';
import {
  ORG_PAGES_LIST, getMyPagesList, pageIdForListItem, type PageScope,
} from '../api/pages';
import { spListUrl, spGetD } from '../api/sp-rest';

let _filter = '';
let _scope: PageScope = 'user';
const _expanded = new Set<string>();
/** Multi-select state (page ids) for bulk duplicate / delete — same UX as
 *  the DB table's leading-checkbox + bulk bar. */
const _selected = new Set<string>();
/** pageId → {modified, editor}; populated per-open from SP. */
let _meta = new Map<string, { modified: string; editor: string }>();

interface EditorMetaRow {
  Id: number;
  Modified?: string;
  Editor?: { Title?: string };
}

/** Open the library view. Leaves the current page cleanly (flush a dirty
 *  save + stop polling) so we don't strand an in-flight write. */
export async function openLibrary(): Promise<void> {
  if (S.currentType !== 'database') await flushPendingSave().catch(() => undefined);
  stopWatching();
  S.currentRow = null;
  S.currentId = null;
  S.currentType = 'page';
  _filter = '';
  _selected.clear();
  renderTree();                          // clear the tree's selected-row highlight
  pushViewHistory('library');            // record so the back button returns here
  renderBcCustom([{ label: '📚 ライブラリ' }]);
  showView('library');
  renderShell();
  renderRows();
  // Editor/Modified aren't in the meta cache — fetch them, then repaint.
  void loadEditorMeta().then(() => {
    if (S.currentId === null && document.getElementById('memola-lib-tbody')) renderRows();
  });
}

/** Fetch Id+Modified+Editor for both backing lists, keyed by canonical
 *  pageId (composite-aware via pageIdForListItem). */
async function loadEditorMeta(): Promise<void> {
  const lists = [ORG_PAGES_LIST];
  const my = getMyPagesList();
  if (my !== ORG_PAGES_LIST) lists.push(my);
  const map = new Map<string, { modified: string; editor: string }>();
  for (const list of lists) {
    let next: string | undefined = spListUrl(
      list, '/items?$select=Id,Modified,Editor/Title&$expand=Editor&$top=500&$orderby=Id',
    );
    let safety = 0;
    while (next && safety++ < 20) {
      const d: { results: EditorMetaRow[]; __next?: string } | null =
        await spGetD<{ results: EditorMetaRow[]; __next?: string }>(next).catch(() => null);
      if (!d) break;
      for (const r of d.results) {
        map.set(pageIdForListItem(list, r.Id), {
          modified: r.Modified || '',
          editor: r.Editor?.Title || '',
        });
      }
      next = d.__next;
    }
  }
  _meta = map;
}

/** Children of `parentId` within the current scope, sorted by title.
 *  Pages whose parent is outside the scope surface as roots (parentId ''). */
function childrenOf(parentId: string): Page[] {
  const inScope = (p: Page): boolean =>
    !p.IsDraft && !metaById(p.Id)?.isTemplate
    && ((metaById(p.Id)?.scope === 'org' ? 'org' : 'user') === _scope);
  const idsInScope = new Set(S.pages.filter(inScope).map((p) => p.Id));
  return S.pages
    .filter((p) => {
      if (!inScope(p)) return false;
      const eff = (p.ParentId && idsInScope.has(p.ParentId)) ? p.ParentId : '';
      return eff === parentId;
    })
    .sort((a, b) => (a.Title || '無題').localeCompare(b.Title || '無題', 'ja'));
}

/** Render the static shell (header + scope tabs + search + empty table).
 *  Built once per open so the search input keeps focus across keystroke
 *  re-renders (only the tbody updates on input). */
function renderShell(): void {
  const el = g('lib');
  el.innerHTML =
    '<div class="memola-lib-inner">' +
      '<div class="memola-lib-hd">' +
        '<span class="memola-lib-icon">📚</span>' +
        '<h1 class="memola-lib-title">ライブラリ</h1>' +
      '</div>' +
      '<div class="memola-lib-tabs">' +
        '<button class="memola-lib-tab" data-scope="user">🔒 プライベート</button>' +
        '<button class="memola-lib-tab" data-scope="org">🌐 組織</button>' +
      '</div>' +
      '<div class="memola-lib-tb">' +
        '<input id="memola-lib-search" class="memola-lib-search" type="text" ' +
          'placeholder="ページを検索…" value="' + escapeHtml(_filter) + '">' +
        '<span class="memola-lib-count" id="memola-lib-count"></span>' +
      '</div>' +
      '<table class="memola-lib-table">' +
        '<thead><tr>' +
          '<th class="memola-lib-sel-th"><input type="checkbox" id="memola-lib-cb-all" title="すべて選択"></th>' +
          '<th>タイトル</th><th>種別</th><th>更新者</th><th>更新日</th>' +
        '</tr></thead>' +
        '<tbody id="memola-lib-tbody"></tbody>' +
      '</table>' +
    '</div>';
  el.querySelectorAll<HTMLElement>('.memola-lib-tab').forEach((tab) => {
    if (tab.dataset.scope === _scope) tab.classList.add('on');
    tab.addEventListener('click', () => {
      _scope = (tab.dataset.scope as PageScope) || 'user';
      _selected.clear();                  // selection is scope-specific
      el.querySelectorAll('.memola-lib-tab').forEach((t) =>
        t.classList.toggle('on', (t as HTMLElement).dataset.scope === _scope));
      renderRows();
    });
  });
  const search = document.getElementById('memola-lib-search') as HTMLInputElement | null;
  search?.addEventListener('input', () => { _filter = search.value; renderRows(); });
  // Select-all header checkbox: toggles every currently-rendered row.
  document.getElementById('memola-lib-cb-all')?.addEventListener('change', (e) => {
    const on = (e.target as HTMLInputElement).checked;
    const ids = Array.from(document.querySelectorAll<HTMLElement>('#memola-lib-tbody .memola-lib-row'))
      .map((r) => r.dataset.pageId || '').filter(Boolean);
    if (on) ids.forEach((id) => _selected.add(id));
    else ids.forEach((id) => _selected.delete(id));
    renderRows();
  });
}

function fmtDate(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleString('ja-JP', {
    year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

/** Render / refresh the table body for the current scope + filter.
 *  When a filter is active the tree is flattened (all matches shown,
 *  ignoring collapse state) so deep matches aren't hidden. */
function renderRows(): void {
  const tbody = document.getElementById('memola-lib-tbody');
  const count = document.getElementById('memola-lib-count');
  if (!tbody) return;
  const q = _filter.trim().toLowerCase();
  const rowsHtml: string[] = [];
  let shown = 0;

  if (q) {
    // Flat filtered view (no hierarchy) so matches at any depth are visible.
    const matches = S.pages
      .filter((p) => !p.IsDraft && !metaById(p.Id)?.isTemplate
        && ((metaById(p.Id)?.scope === 'org' ? 'org' : 'user') === _scope)
        && (p.Title || '無題').toLowerCase().includes(q))
      .sort((a, b) => (a.Title || '無題').localeCompare(b.Title || '無題', 'ja'));
    matches.forEach((p) => { rowsHtml.push(rowHtml(p, 0, false, false)); shown++; });
  } else {
    // Hierarchical view honouring per-row expand state.
    const walk = (parentId: string, depth: number): void => {
      for (const p of childrenOf(parentId)) {
        const kids = childrenOf(p.Id);
        const hasKids = kids.length > 0;
        const open = _expanded.has(p.Id);
        rowsHtml.push(rowHtml(p, depth, hasKids, open));
        shown++;
        if (hasKids && open) walk(p.Id, depth + 1);
      }
    };
    walk('', 0);
  }

  if (count) count.textContent = shown + ' ページ';
  tbody.innerHTML = shown
    ? rowsHtml.join('')
    : '<tr><td colspan="5" class="memola-lib-empty">' +
      (q ? '該当するページがありません' : 'このスコープにページがありません') + '</td></tr>';

  // Toggle clicks (expand/collapse) — must not also navigate.
  tbody.querySelectorAll<HTMLElement>('.memola-lib-tog').forEach((tg) => {
    tg.addEventListener('click', (e) => {
      e.stopPropagation();
      const pid = tg.dataset.pageId || '';
      if (!pid) return;
      if (_expanded.has(pid)) _expanded.delete(pid); else _expanded.add(pid);
      renderRows();
    });
  });
  // Per-row checkbox + grip → toggle selection (no navigation).
  tbody.querySelectorAll<HTMLInputElement>('.memola-lib-cb').forEach((cb) => {
    cb.addEventListener('click', (e) => e.stopPropagation());
    cb.addEventListener('change', () => {
      const id = cb.dataset.id || '';
      if (cb.checked) _selected.add(id); else _selected.delete(id);
      syncSelectionUi();
    });
  });
  tbody.querySelectorAll<HTMLElement>('.memola-lib-grip').forEach((gr) => {
    gr.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = gr.dataset.id || '';
      if (_selected.has(id)) _selected.delete(id); else _selected.add(id);
      renderRows();
    });
  });
  // Row clicks → navigate (controls above stopPropagation so they don't).
  tbody.querySelectorAll<HTMLElement>('.memola-lib-row').forEach((tr) => {
    tr.addEventListener('click', () => {
      const pid = tr.dataset.pageId || '';
      if (pid) void doSelect(pid);
    });
  });
  syncSelectionUi();
}

/** Reflect `_selected` into the select-all header state + the bulk bar,
 *  without a full re-render. */
function syncSelectionUi(): void {
  const tbody = document.getElementById('memola-lib-tbody');
  const all = document.getElementById('memola-lib-cb-all') as HTMLInputElement | null;
  if (tbody && all) {
    const ids = Array.from(tbody.querySelectorAll<HTMLElement>('.memola-lib-row'))
      .map((r) => r.dataset.pageId || '').filter(Boolean);
    const sel = ids.filter((id) => _selected.has(id)).length;
    all.checked = ids.length > 0 && sel === ids.length;
    all.indeterminate = sel > 0 && sel < ids.length;
  }
  document.querySelector('.memola-lib-table')?.classList.toggle('has-sel', _selected.size > 0);
  renderLibBulkBar();
}

function rowHtml(p: Page, depth: number, hasKids: boolean, open: boolean): string {
  const m = metaById(p.Id);
  const icon = m?.icon || (p.Type === 'database' ? '🗂' : '📄');
  const em = _meta.get(p.Id);
  const tog = hasKids
    ? '<span class="memola-lib-tog" data-page-id="' + escapeHtml(p.Id) + '">' +
        (open ? '▾' : '▸') + '</span>'
    : '<span class="memola-lib-tog-sp"></span>';
  const indent = 'padding-left:' + (8 + depth * 18) + 'px;';
  const checked = _selected.has(p.Id);
  return '<tr class="memola-lib-row' + (checked ? ' on' : '') + '" data-page-id="' + escapeHtml(p.Id) + '">' +
    '<td class="memola-lib-sel">' +
      '<span class="memola-lib-grip" data-id="' + escapeHtml(p.Id) + '" title="選択">⠿</span>' +
      '<input type="checkbox" class="memola-lib-cb" data-id="' + escapeHtml(p.Id) + '"' +
        (checked ? ' checked' : '') + '>' +
    '</td>' +
    '<td class="memola-lib-c-title" style="' + indent + '">' +
      tog +
      '<span class="memola-lib-c-ic">' + escapeHtml(icon) + '</span>' +
      '<a class="memola-lib-link">' + escapeHtml(p.Title || '無題') + '</a>' +
    '</td>' +
    '<td>' + (p.Type === 'database' ? 'データベース' : 'ページ') + '</td>' +
    '<td class="memola-lib-c-editor">' + escapeHtml(em?.editor || '—') + '</td>' +
    '<td class="memola-lib-c-date">' + escapeHtml(em ? fmtDate(em.modified) : '…') + '</td>' +
  '</tr>';
}

// ── Bulk action bar (複製 / 削除 / 解除) — same chrome as the DB table ──

function renderLibBulkBar(): void {
  let bar = document.getElementById('memola-lib-bulkbar');
  const n = _selected.size;
  if (n === 0) { if (bar) bar.classList.remove('on'); return; }
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'memola-lib-bulkbar';
    bar.className = 'memola-db-bulkbar';     // reuse the DB bulk-bar styling
    bar.innerHTML =
      '<span class="memola-db-bulkbar-count"></span>' +
      '<button class="memola-db-bulkbar-btn" data-act="dup">複製</button>' +
      '<button class="memola-db-bulkbar-btn danger" data-act="del">削除</button>' +
      '<button class="memola-db-bulkbar-btn ghost" data-act="clr">解除</button>';
    (document.getElementById('memola-overlay') || document.body).appendChild(bar);
    bar.addEventListener('click', (e) => {
      const act = (e.target as HTMLElement).closest<HTMLElement>('[data-act]')?.dataset.act;
      if (act === 'dup') void bulkDuplicate();
      else if (act === 'del') void bulkDelete();
      else if (act === 'clr') { _selected.clear(); renderRows(); }
    });
  }
  const cnt = bar.querySelector<HTMLElement>('.memola-db-bulkbar-count');
  if (cnt) cnt.textContent = n + ' 件選択';
  bar.classList.add('on');
}

async function bulkDuplicate(): Promise<void> {
  const ids = Array.from(_selected);
  if (ids.length === 0) return;
  setLoad(true, '複製中...');
  let ok = 0; const errs: string[] = [];
  try {
    const pages = await import('../api/pages');
    const db = await import('../api/db');
    for (const id of ids) {
      const meta = metaById(id);
      try {
        if (meta?.type === 'database') await db.duplicateDb(id, { asTemplate: false });
        else await pages.apiDuplicatePage(id);
        ok++;
      } catch (e) { errs.push((e as Error).message); }
    }
    _selected.clear();
    renderTree();
    renderRows();
    if (ok) toast(ok + ' 件複製しました');
    if (errs.length) toast('一部複製失敗: ' + errs[0], 'err');
  } finally { setLoad(false); }
}

async function bulkDelete(): Promise<void> {
  const ids = Array.from(_selected);
  if (ids.length === 0) return;
  if (!confirm(ids.length + ' 件を削除(ゴミ箱へ移動)しますか?')) return;
  setLoad(true, '削除中...');
  let ok = 0; const errs: string[] = [];
  try {
    const pages = await import('../api/pages');
    for (const id of ids) {
      try { await pages.apiTrashPage(id); ok++; }
      catch (e) { errs.push((e as Error).message); }
    }
    _selected.clear();
    renderTree();
    renderRows();
    if (ok) toast(ok + ' 件削除しました（ゴミ箱から復元可能）');
    if (errs.length) toast('一部削除失敗: ' + errs[0], 'err');
  } finally { setLoad(false); }
}

/** Wire the sidebar 「ライブラリ」 entry. Idempotent. */
export function attachLibrary(): void {
  document.getElementById('memola-sb-library')?.addEventListener('click', () => {
    void openLibrary();
  });
}
