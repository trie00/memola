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
import { stopWatching } from './sync-watch';
import { flushPendingSave } from './save-control';
import { metaById } from '../lib/page-store';
import { escapeHtml } from '../lib/html-escape';
import {
  ORG_PAGES_LIST, getMyPagesList, pageIdForListItem, type PageScope,
} from '../api/pages';
import { spListUrl, spGetD } from '../api/sp-rest';

let _filter = '';
let _scope: PageScope = 'user';
const _expanded = new Set<string>();
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
  renderTree();                          // clear the tree's selected-row highlight
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
          '<th>タイトル</th><th>種別</th><th>更新者</th><th>更新日</th>' +
        '</tr></thead>' +
        '<tbody id="memola-lib-tbody"></tbody>' +
      '</table>' +
    '</div>';
  el.querySelectorAll<HTMLElement>('.memola-lib-tab').forEach((tab) => {
    if (tab.dataset.scope === _scope) tab.classList.add('on');
    tab.addEventListener('click', () => {
      _scope = (tab.dataset.scope as PageScope) || 'user';
      el.querySelectorAll('.memola-lib-tab').forEach((t) =>
        t.classList.toggle('on', (t as HTMLElement).dataset.scope === _scope));
      renderRows();
    });
  });
  const search = document.getElementById('memola-lib-search') as HTMLInputElement | null;
  search?.addEventListener('input', () => { _filter = search.value; renderRows(); });
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
    : '<tr><td colspan="4" class="memola-lib-empty">' +
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
  // Row clicks → navigate.
  tbody.querySelectorAll<HTMLElement>('.memola-lib-row').forEach((tr) => {
    tr.addEventListener('click', () => {
      const pid = tr.dataset.pageId || '';
      if (pid) void doSelect(pid);
    });
  });
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
  return '<tr class="memola-lib-row" data-page-id="' + escapeHtml(p.Id) + '">' +
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

/** Wire the sidebar 「ライブラリ」 entry. Idempotent. */
export function attachLibrary(): void {
  document.getElementById('memola-sb-library')?.addEventListener('click', () => {
    void openLibrary();
  });
}
