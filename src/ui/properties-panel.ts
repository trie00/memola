// Right-side panel showing the current page's metadata (parent, created,
// editor, file path). For DB rows opened as pages this would also list the
// row's properties — that integration is future work.

import { S } from '../state';
import { g } from './dom';
import { ancs } from './tree';
import { apiLoadFileMeta, PAGES_LIST } from '../api/pages';
import { getListItemEditor } from '../api/sync';

const PANEL_KEY = 'n365.properties.open';

export function isPropertiesOpen(): boolean {
  return localStorage.getItem(PANEL_KEY) === '1';
}

export function setPropertiesOpen(open: boolean): void {
  if (open) localStorage.setItem(PANEL_KEY, '1');
  else localStorage.removeItem(PANEL_KEY);
  applyPropertiesState();
}

export function togglePropertiesPanel(): void { setPropertiesOpen(!isPropertiesOpen()); }

export function applyPropertiesState(): void {
  const panel = g('props');
  const btn = document.getElementById('n365-props-btn');
  if (isPropertiesOpen() && S.currentId) {
    panel.classList.add('on');
    btn?.classList.add('on');
    void renderProperties();
  } else {
    panel.classList.remove('on');
    btn?.classList.remove('on');
  }
}

function row(label: string, value: string): string {
  return (
    '<div class="n365-prop-row">' +
      '<div class="n365-prop-label">' + escapeHtml(label) + '</div>' +
      '<div class="n365-prop-value">' + escapeHtml(value) + '</div>' +
    '</div>'
  );
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function renderProperties(): Promise<void> {
  if (!isPropertiesOpen() || !S.currentId) return;
  const list = g('props-list');
  const id = S.currentId;
  const page = S.pages.find((p) => p.Id === id);
  const meta = S.meta.pages.find((p) => p.id === id);
  if (!page || !meta) { list.innerHTML = ''; return; }

  const path = ancs(id).slice(0, -1).map((p) => p.Title || '無題').join(' / ') || '(ルート)';
  const type = page.Type === 'database' ? 'データベース' : 'ページ';

  list.innerHTML =
    row('種類', type) +
    row('親', path) +
    row('アイコン', meta.icon || '-') +
    row('ID', id) +
    (page.Type === 'database' && meta.list ? row('SP リスト', meta.list) : '') +
    (page.Type !== 'database' ? row('リスト項目', PAGES_LIST + ' #' + id) : '') +
    '<div class="n365-prop-row n365-prop-loading">最終更新者を取得中...</div>';

  if (page.Type !== 'database') {
    try {
      const fm = await apiLoadFileMeta(id);
      const editor = await getListItemEditor(id).catch(() => '');
      const loading = list.querySelector('.n365-prop-loading');
      if (loading) loading.remove();
      if (fm) {
        const time = new Date(fm.modified).toLocaleString('ja-JP');
        list.insertAdjacentHTML('beforeend', row('最終更新', time));
        list.insertAdjacentHTML('beforeend', row('編集者', editor || '不明'));
      }
    } catch { /* ignore */ }
  } else {
    const loading = list.querySelector('.n365-prop-loading');
    if (loading) loading.remove();
    list.insertAdjacentHTML('beforeend', row('行数', String(S.dbItems.length)));
    list.insertAdjacentHTML('beforeend', row('列数', String(S.dbFields.length)));
    // ＋ プロパティ追加 (DB 限定)
    list.insertAdjacentHTML('beforeend',
      '<div class="n365-prop-add" id="n365-prop-add">＋ プロパティ追加</div>',
    );
    list.querySelector('#n365-prop-add')?.addEventListener('click', () => {
      document.getElementById('n365-col-md')?.classList.add('on');
    });
  }

  // バックリンクセクション (このページを参照しているページの簡易検出)
  list.insertAdjacentHTML('beforeend', '<div class="n365-prop-sep"></div>');
  list.insertAdjacentHTML('beforeend', '<div class="n365-prop-section">バックリンク</div>');
  const titleStr = (page.Title || '').toLowerCase();
  const backlinks = titleStr ? S.pages.filter((p) => {
    if (p.Id === id) return false;
    return false; // TODO: indexer がない為プレースホルダ
  }) : [];
  if (backlinks.length === 0) {
    list.insertAdjacentHTML('beforeend', '<div class="n365-prop-empty">参照しているページはありません</div>');
  } else {
    backlinks.forEach((bp) => {
      list.insertAdjacentHTML('beforeend',
        '<div class="n365-prop-backlink">→ ' + escapeHtml(bp.Title || '無題') + '</div>',
      );
    });
  }
}
