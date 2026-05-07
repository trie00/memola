// Page-menu (top-right "...") dispatcher. Wires the trigger button +
// the menu's click router, and exposes the helpers the actions need
// (publish toggle, duplicate-as-draft, version history, etc).
//
// `syncPublishMenuItem` runs every time the menu opens to update the
// per-item visibility (publish only for real pages, restore-daily only
// for converted pages, etc) and to flip the publish label between
// 「Web 公開」 / 「Web 公開を解除」.

import { S } from '../state';
import { g } from './dom';
import { setLoad, toast } from './ui-helpers';
import { renderTree } from './tree';
import { showView, doSelect } from './views';
import { syncPubTag } from './pub-tag';
import { toggleCurrentPageScope } from './scope-tag';
import { doDel } from './actions';
import { exportMd, exportHtml, printCurrent } from './page-export';
import {
  duplicateCurrent, copyPageLink, showPageInfo,
} from './page-actions';
import {
  togglePageMenu, hidePageMenu, attachPageMenuOutsideClick,
} from './page-menu';
import { restoreToDailyNote } from './daily-note-actions';
import { flushPendingSave } from './save-control';
import { refreshDraftsBadge } from './drafts-modal';

let _attached = false;

export function attachPageMenuWiring(opts: {
  /** Toggles the focus-mode CSS class on `#memola-overlay`. Provided
   *  by wiring.ts because the implementation lives in the same module
   *  scope as the focus-mode pref read. */
  toggleFocusMode: () => void;
}): void {
  if (_attached) return;
  _attached = true;

  // Trigger button
  g('pgm-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    syncPublishMenuItem();
    togglePageMenu(g('pgm-btn'));
  });

  // Item click router
  g('pgm').addEventListener('click', async (e) => {
    const item = (e.target as HTMLElement).closest<HTMLElement>('.memola-pgm-item');
    if (!item || !item.dataset.action) return;
    const action = item.dataset.action;
    hidePageMenu();
    switch (action) {
      case 'export-md':           await exportMd(); break;
      case 'export-html':         await exportHtml(); break;
      case 'duplicate':           await duplicateCurrent(); break;
      case 'duplicate-as-draft':  await duplicateAsDraftCurrent(); break;
      case 'version-history':     await openVersionHistoryForCurrent(); break;
      case 'copy-link':           await copyPageLink(); break;
      case 'toggle-scope':        await toggleCurrentPageScope(); break;
      case 'publish':             await togglePublish(); break;
      case 'copy-pub-url':        await copyPublishedUrl(); break;
      case 'restore-daily':       await restoreToDailyNote(); break;
      case 'print':               printCurrent(); break;
      case 'info':                showPageInfo(); break;
      case 'focus':               opts.toggleFocusMode(); break;
      case 'delete':
        // Row-as-page → delete the row, not the parent DB
        if (S.currentRow) {
          const row = S.currentRow;
          if (!confirm('この行を削除しますか？\n(⌘Z で復元可能)')) break;
          try {
            setLoad(true, '行を削除中...');
            const { deleteRowWithUndo } = await import('./db-history');
            await deleteRowWithUndo(row.listTitle, row.itemId);
            S.currentRow = null;
            const dbPage = S.pages.find((p) => p.Id === row.dbId);
            if (dbPage) {
              const v = await import('./views');
              await v.doSelectDb(row.dbId, dbPage);
            } else {
              showView('empty');
            }
            toast('行を削除しました（⌘Z で復元可能）');
          } catch (e) {
            toast('削除失敗: ' + (e as Error).message, 'err');
          } finally { setLoad(false); }
          break;
        }
        if (S.currentId) await doDel(S.currentId);
        break;
    }
  });

  attachPageMenuOutsideClick();
}

/** Refresh the publish/unpublish label every time the menu opens. */
function syncPublishMenuItem(): void {
  const lbl = document.querySelector('.memola-pgm-publish-label');
  const copyItem = document.querySelector<HTMLElement>('[data-action="copy-pub-url"]');
  const publishItem = document.querySelector<HTMLElement>('[data-action="publish"]');
  const restoreItem = document.querySelector<HTMLElement>('[data-action="restore-daily"]');

  // Only real pages (not DB views, not row-as-page) can be published.
  const isRealPage = !!S.currentId && S.currentType === 'page' && !S.currentRow;

  // Restore-to-daily only makes sense for pages that came from a
  // daily-note conversion (OriginDailyDate metadata is set).
  if (restoreItem) {
    const meta = isRealPage && S.currentId
      ? S.meta.pages.find((p) => p.id === S.currentId)
      : null;
    restoreItem.style.display = meta?.originDailyDate ? '' : 'none';
  }

  // Scope toggle: shown for both regular pages AND DBs (so the DB itself
  // can be classified as 個人 / 組織). Row-as-page, drafts, trashed, and
  // the daily DB are all hidden — the daily DB is locked to personal.
  const scopeItem = document.querySelector<HTMLElement>('[data-action="toggle-scope"]');
  if (scopeItem) {
    const isScopeable = !!S.currentId
      && (S.currentType === 'page' || S.currentType === 'database')
      && !S.currentRow;
    const meta = isScopeable && S.currentId
      ? S.meta.pages.find((p) => p.id === S.currentId)
      : null;
    const isDailyDb = meta?.type === 'database' && meta.list === 'memola-daily';
    const showScope = !!meta && !meta.originPageId && !meta.trashed && !isDailyDb;
    scopeItem.style.display = showScope ? '' : 'none';
    void import('./scope-tag').then((m) => m.syncScopeTag());
  }

  if (!isRealPage) {
    if (publishItem) publishItem.style.display = 'none';
    if (copyItem) copyItem.style.display = 'none';
    return;
  }
  if (publishItem) publishItem.style.display = '';
  void import('../api/publish').then((m) => {
    const pub = m.isPagePublished(S.currentId!);
    if (lbl) lbl.textContent = pub ? 'Web 公開を解除' : 'Web 公開';
    if (copyItem) copyItem.style.display = pub ? '' : 'none';
  });
}

async function togglePublish(): Promise<void> {
  const id = S.currentId;
  if (!id) return;
  const m = await import('../api/publish');
  if (m.isPagePublished(id)) {
    if (!confirm('Web 公開を解除します。SP 上の公開ページ（Site Page）も削除されます。よろしいですか？')) return;
    try {
      await m.unpublishPage(id);
      toast('公開を解除しました');
    } catch (e) { toast('解除失敗: ' + (e as Error).message, 'err'); }
    syncPubTag();
  } else {
    // Flush any pending edits via the Saver before the structural op so
    // the Site Page mirror can't diverge from the source row.
    await flushPendingSave();
    const titleEl = g('ttl') as HTMLTextAreaElement | null;
    const title = (titleEl?.value || '').trim() || '無題';
    // Pull body from editor2's canonical block state, not the live DOM.
    const { getBlocks } = await import('./editor2/editor2-bridge');
    const { blocksToMd } = await import('../lib/blocks-md');
    const bodyMd = blocksToMd(getBlocks());
    try {
      const url = await m.publishPage(id, title, bodyMd);
      try { await navigator.clipboard.writeText(url); } catch { /* ignore */ }
      toast('公開しました（URL をクリップボードにコピー）');
    } catch (e) { toast('公開失敗: ' + (e as Error).message, 'err'); }
    syncPubTag();
  }
}

async function copyPublishedUrl(): Promise<void> {
  const id = S.currentId;
  if (!id) return;
  const m = await import('../api/publish');
  const url = m.publishedUrlFor(id);
  try { await navigator.clipboard.writeText(url); toast('URL をコピーしました'); }
  catch { toast('コピー失敗', 'err'); }
}

/** Create a draft duplicate of the current page (preserves original's id
 *  so inbound page-links stay valid). User edits the draft, then hits
 *  "原本に適用" in the banner to write back. */
async function duplicateAsDraftCurrent(): Promise<void> {
  const id = S.currentId;
  if (!id) return;
  if (S.currentType !== 'page' || S.currentRow) {
    toast('このページは下書き複製に対応していません', 'err');
    return;
  }
  await flushPendingSave();
  try {
    setLoad(true, '下書きを複製中…');
    const { apiDuplicateAsDraft, apiGetPages } = await import('../api/pages');
    const draft = await apiDuplicateAsDraft(id);
    await apiGetPages();
    renderTree();
    refreshDraftsBadge();
    await doSelect(draft.Id);
    toast('下書きを作成しました。本ライブラリには表示されません — サイドバーの「📝 下書き」 から再度開けます');
  } catch (e) {
    toast('下書き複製失敗: ' + (e as Error).message, 'err');
  } finally { setLoad(false); }
}

async function openVersionHistoryForCurrent(): Promise<void> {
  const id = S.currentId;
  if (!id) return;
  const page = S.pages.find((p) => p.Id === id);
  if (!page) return;
  const { openVersionHistory } = await import('./version-history-modal');
  await openVersionHistory(id, page.Title || '無題');
}
