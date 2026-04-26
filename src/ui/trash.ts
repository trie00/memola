// Trash modal: list soft-deleted pages with restore / permanent-delete actions.

import { S } from '../state';
import { g } from './dom';
import { getTrashedPages, apiRestorePage, apiPurgePage, apiGetPages } from '../api/pages';
import { renderTree } from './tree';
import { toast, setLoad } from './ui-helpers';

export function openTrash(): void {
  const md = g('trash-md');
  md.classList.add('on');
  renderTrashList();
}

export function closeTrash(): void {
  g('trash-md').classList.remove('on');
}

function renderTrashList(): void {
  const list = g('trash-list');
  const items = getTrashedPages();
  list.innerHTML = '';
  if (items.length === 0) {
    list.innerHTML = '<div class="n365-trash-empty">ゴミ箱は空です</div>';
    return;
  }
  items.forEach((it) => {
    const row = document.createElement('div');
    row.className = 'n365-trash-row';
    const time = new Date(it.trashed).toLocaleString('ja-JP');
    row.innerHTML =
      '<div class="n365-trash-info">' +
        '<div class="n365-trash-title">' + escapeHtml(it.title || '(無題)') + '</div>' +
        '<div class="n365-trash-meta">' + (it.type === 'database' ? '🗃 DB · ' : '📄 ページ · ') + time + ' に削除</div>' +
      '</div>' +
      '<button class="n365-trash-btn n365-trash-restore" title="復元">↺</button>' +
      '<button class="n365-trash-btn n365-trash-purge" title="完全削除">🗑</button>';
    row.querySelector('.n365-trash-restore')!.addEventListener('click', async () => {
      try {
        setLoad(true, '復元中...');
        await apiRestorePage(it.id);
        S.pages = await apiGetPages();
        renderTree();
        renderTrashList();
        toast('復元しました');
      } catch (e) { toast('復元失敗: ' + (e as Error).message, 'err'); }
      finally { setLoad(false); }
    });
    row.querySelector('.n365-trash-purge')!.addEventListener('click', async () => {
      if (!confirm('完全に削除します。元に戻せません。')) return;
      try {
        setLoad(true, '削除中...');
        await apiPurgePage(it.id);
        renderTrashList();
        toast('完全に削除しました');
      } catch (e) { toast('削除失敗: ' + (e as Error).message, 'err'); }
      finally { setLoad(false); }
    });
    list.appendChild(row);
  });
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
