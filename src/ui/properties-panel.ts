// Right-side panel showing the current page's metadata (parent, created,
// editor, file path). For DB rows opened as pages this would also list the
// row's properties — that integration is future work.

import { S } from '../state';
import { g } from './dom';
import { ancs } from './tree';
import { apiLoadFileMeta, listForPageId } from '../api/pages';
import { getBacklinksFor } from '../api/backlinks';
import { getListItemEditor } from '../api/sync';
import { escapeHtml } from '../lib/html-escape';
import { prefPropertiesOpen } from '../lib/prefs';
import { metaById } from '../lib/page-store';

export function isPropertiesOpen(): boolean {
  return prefPropertiesOpen.get() === '1';
}

export function setPropertiesOpen(open: boolean): void {
  if (open) prefPropertiesOpen.set('1');
  else prefPropertiesOpen.clear();
  applyPropertiesState();
}

export function togglePropertiesPanel(): void { setPropertiesOpen(!isPropertiesOpen()); }

export function applyPropertiesState(): void {
  const panel = g('props');
  const btn = document.getElementById('memola-props-btn');
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
    '<div class="memola-prop-row">' +
      '<div class="memola-prop-label">' + escapeHtml(label) + '</div>' +
      '<div class="memola-prop-value">' + escapeHtml(value) + '</div>' +
    '</div>'
  );
}


export async function renderProperties(): Promise<void> {
  if (!isPropertiesOpen() || !S.currentId) return;
  const list = g('props-list');
  const id = S.currentId;
  const page = S.pages.find((p) => p.Id === id);
  const meta = metaById(id);
  if (!page || !meta) { list.innerHTML = ''; return; }

  const path = ancs(id).slice(0, -1).map((p) => p.Title || '無題').join(' / ') || '(ルート)';
  const type = page.Type === 'database' ? 'データベース' : 'ページ';

  list.innerHTML =
    row('種類', type) +
    row('親', path) +
    row('アイコン', meta.icon || '-') +
    row('ID', id) +
    (page.Type === 'database' && meta.list ? row('SP リスト', meta.list) : '') +
    (page.Type !== 'database' ? row('リスト項目', listForPageId(id) + ' #' + id) : '') +
    '<div class="memola-prop-row memola-prop-loading">最終更新者を取得中...</div>';

  if (page.Type !== 'database') {
    try {
      // Prefer the IN-MEMORY loadedModified — it's kept in sync with the
      // editor body across save / sync-watch / accept-banner paths, so
      // the displayed time always matches what the user actually has on
      // screen. Falls back to a fresh SP fetch only when we don't have a
      // cached value (e.g. panel opened before doSelect finished).
      let modified = '';
      let editor = '';
      if (S.sync.pageId === id && S.sync.loadedModified) {
        modified = S.sync.loadedModified;
      } else {
        const fm = await apiLoadFileMeta(id);
        if (fm) modified = fm.modified;
      }
      editor = await getListItemEditor(id).catch(() => '');
      const loading = list.querySelector('.memola-prop-loading');
      if (loading) loading.remove();
      if (modified) {
        const time = new Date(modified).toLocaleString('ja-JP');
        list.insertAdjacentHTML('beforeend', row('最終更新', time));
        list.insertAdjacentHTML('beforeend', row('編集者', editor || '不明'));
      }
    } catch { /* ignore */ }
  } else {
    const loading = list.querySelector('.memola-prop-loading');
    if (loading) loading.remove();
    list.insertAdjacentHTML('beforeend', row('行数', String(S.dbItems.length)));
    list.insertAdjacentHTML('beforeend', row('列数', String(S.dbFields.length)));
    // ＋ プロパティ追加 (DB 限定)
    list.insertAdjacentHTML('beforeend',
      '<div class="memola-prop-add" id="memola-prop-add">＋ プロパティ追加</div>',
    );
    list.querySelector('#memola-prop-add')?.addEventListener('click', () => {
      document.getElementById('memola-col-md')?.classList.add('on');
    });
  }

  // バックリンク — body に `[[<id>...]]` で参照しているページを列挙。
  // backlinks.ts のキャッシュ機構を経由するので、再描画でも追加 fetch は
  // 走らない (page-body 保存時に invalidateBacklinkCache が走る)。
  list.insertAdjacentHTML('beforeend', '<div class="memola-prop-sep"></div>');
  list.insertAdjacentHTML('beforeend', '<div class="memola-prop-section">バックリンク</div>');
  const placeholder = document.createElement('div');
  placeholder.className = 'memola-prop-empty';
  placeholder.textContent = '読み込み中...';
  list.appendChild(placeholder);
  // Snapshot the page id we're rendering for — by the time the async
  // backlinks fetch resolves the user may have navigated elsewhere, in
  // which case we should drop the result instead of clobbering the
  // newer page's panel.
  const renderedFor = id;
  void getBacklinksFor(id, (pid) => metaById(pid)?.title || null)
    .then((entries) => {
      if (S.currentId !== renderedFor) return;
      placeholder.remove();
      if (entries.length === 0) {
        list.insertAdjacentHTML('beforeend',
          '<div class="memola-prop-empty">参照しているページはありません</div>');
        return;
      }
      for (const e of entries) {
        const div = document.createElement('div');
        div.className = 'memola-prop-backlink';
        div.dataset.pid = e.pageId;
        div.innerHTML =
          '<div class="memola-prop-backlink-title">→ ' + escapeHtml(e.pageTitle) + '</div>' +
          (e.snippet
            ? '<div class="memola-prop-backlink-snippet">' + escapeHtml(e.snippet) + '</div>'
            : '');
        list.appendChild(div);
      }
    })
    .catch(() => {
      if (S.currentId !== renderedFor) return;
      placeholder.textContent = 'バックリンクの取得に失敗しました';
    });
}
