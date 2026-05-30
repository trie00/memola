// Library — a Notion-style "all pages" view. Lists every non-draft page
// and database as a database-like table with clickable links, plus a
// client-side title filter. Reached from the 「📚 ライブラリ」 sidebar entry.

import { S } from '../state';
import { g } from './dom';
import { doSelect, showView, renderBcCustom } from './views';
import { renderTree } from './tree';
import { stopWatching } from './sync-watch';
import { flushPendingSave } from './save-control';
import { metaById } from '../lib/page-store';
import { escapeHtml } from '../lib/html-escape';

let _filter = '';

interface LibRow {
  id: string;
  title: string;
  icon: string;
  type: 'page' | 'database';
  scope: 'org' | 'user';
  parentTitle: string;
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
}

function collectRows(): LibRow[] {
  return S.pages
    .filter((p) => !p.IsDraft)
    .map((p): LibRow => {
      const m = metaById(p.Id);
      const parent = p.ParentId ? metaById(p.ParentId) : null;
      return {
        id: p.Id,
        title: p.Title || '無題',
        icon: m?.icon || (p.Type === 'database' ? '🗂' : '📄'),
        type: p.Type === 'database' ? 'database' : 'page',
        scope: m?.scope === 'org' ? 'org' : 'user',
        parentTitle: parent?.title || '',
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title, 'ja'));
}

/** Render the static shell (header + search + empty table). Built once
 *  per open so the search input keeps focus across keystroke re-renders
 *  (only the tbody + count update on input). */
function renderShell(): void {
  const el = g('lib');
  el.innerHTML =
    '<div class="memola-lib-inner">' +
      '<div class="memola-lib-hd">' +
        '<span class="memola-lib-icon">📚</span>' +
        '<h1 class="memola-lib-title">ライブラリ</h1>' +
      '</div>' +
      '<div class="memola-lib-tb">' +
        '<input id="memola-lib-search" class="memola-lib-search" type="text" ' +
          'placeholder="ページを検索…" value="' + escapeHtml(_filter) + '">' +
        '<span class="memola-lib-count" id="memola-lib-count"></span>' +
      '</div>' +
      '<table class="memola-lib-table">' +
        '<thead><tr>' +
          '<th>タイトル</th><th>種別</th><th>スコープ</th><th>親ページ</th>' +
        '</tr></thead>' +
        '<tbody id="memola-lib-tbody"></tbody>' +
      '</table>' +
    '</div>';
  const search = document.getElementById('memola-lib-search') as HTMLInputElement | null;
  search?.addEventListener('input', () => {
    _filter = search.value;
    renderRows();                        // tbody-only; input retains focus
  });
}

/** Render / refresh just the table body + count for the current filter. */
function renderRows(): void {
  const tbody = document.getElementById('memola-lib-tbody');
  const count = document.getElementById('memola-lib-count');
  if (!tbody) return;
  const q = _filter.trim().toLowerCase();
  const rows = collectRows();
  const filtered = q
    ? rows.filter((r) => r.title.toLowerCase().includes(q)
        || r.parentTitle.toLowerCase().includes(q))
    : rows;
  if (count) count.textContent = filtered.length + ' ページ';
  tbody.innerHTML = filtered.length
    ? filtered.map((r) =>
        '<tr class="memola-lib-row" data-page-id="' + escapeHtml(r.id) + '">' +
          '<td class="memola-lib-c-title">' +
            '<span class="memola-lib-c-ic">' + escapeHtml(r.icon) + '</span>' +
            '<a class="memola-lib-link">' + escapeHtml(r.title) + '</a>' +
          '</td>' +
          '<td>' + (r.type === 'database' ? 'データベース' : 'ページ') + '</td>' +
          '<td>' + (r.scope === 'org' ? '🌐 組織' : '🔒 プライベート') + '</td>' +
          '<td class="memola-lib-c-parent">' + escapeHtml(r.parentTitle) + '</td>' +
        '</tr>').join('')
    : '<tr><td colspan="4" class="memola-lib-empty">該当するページがありません</td></tr>';
  tbody.querySelectorAll<HTMLElement>('.memola-lib-row').forEach((tr) => {
    tr.addEventListener('click', () => {
      const pid = tr.dataset.pageId || '';
      if (pid) void doSelect(pid);
    });
  });
}

/** Wire the sidebar 「ライブラリ」 entry. Idempotent. */
export function attachLibrary(): void {
  document.getElementById('memola-sb-library')?.addEventListener('click', () => {
    void openLibrary();
  });
}
