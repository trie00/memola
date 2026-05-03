// Trash modal: list soft-deleted pages with restore / permanent-delete actions.

import { S } from '../state';
import { g } from './dom';
import { getTrashedPages, apiRestorePage, apiPurgePage, apiGetPages } from '../api/pages';
import { renderTree } from './tree';
import { toast, setLoad } from './ui-helpers';
import { escapeHtml } from '../lib/html-escape';

export function openTrash(): void {
  const md = g('trash-md');
  md.classList.add('on');
  renderTrashList();
  // Wire the empty-trash button (idempotent — uses dataset flag so we
  // don't pile up handlers on each open).
  const emptyBtn = document.getElementById('memola-trash-empty');
  if (emptyBtn && !emptyBtn.dataset.wired) {
    emptyBtn.dataset.wired = '1';
    emptyBtn.addEventListener('click', emptyTrash);
  }
}

export function closeTrash(): void {
  g('trash-md').classList.remove('on');
}

/** Permanently delete EVERY trashed entry. Confirms first because the
 *  operation is irreversible — SP doesn't keep its own recycle bin for
 *  these (we soft-delete via the Trashed column, then this hard-deletes
 *  every row, including DB lists). */
async function emptyTrash(): Promise<void> {
  const items = getTrashedPages();
  if (items.length === 0) {
    toast('ゴミ箱は空です');
    return;
  }
  if (!confirm(items.length + ' 件をすべて完全削除します。元に戻せません。\nよろしいですか?')) return;
  setLoad(true, '完全削除中...');
  let ok = 0, ng = 0;
  for (const it of items) {
    try {
      await apiPurgePage(it.id);
      ok++;
    } catch { ng++; }
  }
  setLoad(false);
  renderTrashList();
  toast(ok + ' 件削除しました' + (ng > 0 ? ' (失敗 ' + ng + ' 件)' : ''));
}

function renderTrashList(): void {
  const list = g('trash-list');
  const items = getTrashedPages();
  list.innerHTML = '';
  if (items.length === 0) {
    list.innerHTML = '<div class="memola-trash-empty">ゴミ箱は空です</div>';
    return;
  }
  items.forEach((it) => {
    const row = document.createElement('div');
    row.className = 'memola-trash-row';
    const time = new Date(it.trashed).toLocaleString('ja-JP');
    row.innerHTML =
      '<div class="memola-trash-info">' +
        '<div class="memola-trash-title">' + escapeHtml(it.title || '(無題)') + '</div>' +
        '<div class="memola-trash-meta">' + (it.type === 'database' ? '🗃 DB · ' : '📄 ページ · ') + time + ' に削除</div>' +
      '</div>' +
      '<button class="memola-trash-btn memola-trash-restore" title="復元">↺</button>' +
      '<button class="memola-trash-btn memola-trash-purge" title="完全削除">🗑</button>';
    row.querySelector('.memola-trash-restore')!.addEventListener('click', async () => {
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
    row.querySelector('.memola-trash-purge')!.addEventListener('click', async () => {
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

