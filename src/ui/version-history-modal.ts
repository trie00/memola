// Page version history viewer modal.
//
// Lists all SP-side versions of the current page (newest first), with
// an inline preview and a "この版に戻す" button. Restoration goes
// through the regular save path so it gets the usual conflict guard +
// watermark refresh.
//
// Built on the shared `subscriberModal` helper for ESC capture +
// backdrop dismissal — no per-modal listener bookkeeping.

import { S } from '../state';
import { toast, setLoad } from './ui-helpers';
import { blocksToHtml } from '../lib/blocks-html';
import { parseBlocksJson } from '../api/pages';
import { listPageVersions, type PageVersion } from '../api/version-history';
import { escapeHtml } from '../lib/html-escape';
import { subscriberModal } from './lib/modal';

const MODAL_ID = 'memola-versions-md';
const PREVIEW_ID = 'memola-versions-preview';

const _modal = subscriberModal({
  id: MODAL_ID,
  className: 'memola-versions-md',
  onEscape: () => _modal.close(),
  onBackdropClick: () => _modal.close(),
});

const _previewModal = subscriberModal({
  id: PREVIEW_ID,
  className: 'memola-versions-md',
  onEscape: () => _previewModal.close(),
  onBackdropClick: () => _previewModal.close(),
});

function formatDateTime(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const da = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${y}/${mo}/${da} ${hh}:${mm}`;
}

export async function openVersionHistory(pageId: string, pageTitle: string): Promise<void> {
  // Open with a loading shell first so the user gets immediate feedback.
  _modal.render(
    '<div class="memola-versions-box">' +
      '<div class="memola-versions-hd">' +
        '<span class="memola-versions-title">📜 バージョン履歴: ' + escapeHtml(pageTitle) + '</span>' +
        '<button class="memola-versions-close" title="閉じる">×</button>' +
      '</div>' +
      '<div class="memola-versions-body"><div class="memola-versions-loading">読み込み中…</div></div>' +
    '</div>',
    (root) => {
      root.querySelector<HTMLElement>('.memola-versions-close')?.addEventListener('click', () => _modal.close());
    },
  );

  let versions: PageVersion[] = [];
  try {
    versions = await listPageVersions(pageId);
  } catch (e) {
    rerender(pageTitle, '<div class="memola-versions-error">取得失敗: ' + escapeHtml((e as Error).message) + '</div>');
    return;
  }
  if (versions.length === 0) {
    rerender(pageTitle,
      '<div class="memola-versions-empty">バージョン履歴がありません。<br>' +
      '<span style="font-size:11px;color:var(--ink-3)">SP リストの「バージョン管理設定」がオフの可能性があります。</span></div>');
    return;
  }

  const itemsHtml = versions.map((v, idx) => {
    const preview = (v.body || '').replace(/\s+/g, ' ').slice(0, 120);
    const isCurrent = idx === 0;
    return '<div class="memola-versions-item' + (isCurrent ? ' current' : '') + '" data-idx="' + idx + '">' +
      '<div class="memola-versions-itemhd">' +
        '<span class="memola-versions-label">v' + escapeHtml(v.versionLabel) + (isCurrent ? ' (現在)' : '') + '</span>' +
        '<span class="memola-versions-time">' + formatDateTime(v.created) + '</span>' +
        '<span class="memola-versions-editor">' + escapeHtml(v.editor || '不明') + '</span>' +
      '</div>' +
      '<div class="memola-versions-preview">' + escapeHtml(preview || '(本文なし)') + '</div>' +
      '<div class="memola-versions-actions">' +
        '<button class="memola-btn s" data-act="preview">プレビュー</button>' +
        (isCurrent ? '' : '<button class="memola-btn p" data-act="restore">この版に戻す</button>') +
      '</div>' +
    '</div>';
  }).join('');

  rerender(pageTitle, itemsHtml, (root) => {
    root.querySelectorAll<HTMLElement>('.memola-versions-item').forEach((itemEl) => {
      const idx = parseInt(itemEl.dataset.idx || '-1', 10);
      if (idx < 0) return;
      itemEl.addEventListener('click', async (e) => {
        const btn = (e.target as HTMLElement).closest<HTMLElement>('button[data-act]');
        if (!btn) return;
        const act = btn.dataset.act;
        const v = versions[idx];
        if (!v) return;
        if (act === 'preview') showPreview(v);
        else if (act === 'restore') await restoreVersion(pageId, v);
      });
    });
  });
}

function rerender(
  pageTitle: string,
  bodyHtml: string,
  onMounted?: (root: HTMLElement) => void,
): void {
  _modal.render(
    '<div class="memola-versions-box">' +
      '<div class="memola-versions-hd">' +
        '<span class="memola-versions-title">📜 バージョン履歴: ' + escapeHtml(pageTitle) + '</span>' +
        '<button class="memola-versions-close" title="閉じる">×</button>' +
      '</div>' +
      '<div class="memola-versions-body">' + bodyHtml + '</div>' +
    '</div>',
    (root) => {
      root.querySelector<HTMLElement>('.memola-versions-close')?.addEventListener('click', () => _modal.close());
      if (onMounted) onMounted(root);
    },
  );
}

function showPreview(v: PageVersion): void {
  _previewModal.render(
    '<div class="memola-versions-box" style="max-width:760px">' +
      '<div class="memola-versions-hd">' +
        '<span class="memola-versions-title">v' + escapeHtml(v.versionLabel) + ' プレビュー</span>' +
        '<button class="memola-versions-close">×</button>' +
      '</div>' +
      // v.body is the block-tree JSON snapshot from the version row.
      // Convert directly to HTML for the preview pane.
      '<div class="memola-versions-fullpreview">' + blocksToHtml(parseBlocksJson(v.body)) + '</div>' +
    '</div>',
    (root) => {
      root.querySelector<HTMLElement>('.memola-versions-close')
        ?.addEventListener('click', () => _previewModal.close());
    },
  );
}

async function restoreVersion(pageId: string, v: PageVersion): Promise<void> {
  if (!confirm(
    'v' + v.versionLabel + ' (' + formatDateTime(v.created) + ' / ' + (v.editor || '不明') + ') の内容で現在の本文を上書きします。\n\n' +
    '現在の版は SP のバージョン履歴に残るので、後で元に戻すことも可能です。\n\n' +
    '続行しますか？',
  )) return;
  try {
    setLoad(true, '復元中…');
    // Phase 2: v.body is already block-tree JSON (the version row's
    // Body_blocks snapshot). Save it directly via apiSavePageBlocks
    // — converting through markdown would lossy-roundtrip table/etc.
    const { apiSavePageBlocks } = await import('../api/pages');
    const result = await apiSavePageBlocks(pageId, v.title || '無題', v.body);
    if (!result.ok) {
      toast('復元失敗: 競合を検出しました。再度お試しください', 'err');
      return;
    }
    toast('v' + v.versionLabel + ' に復元しました');
    _modal.close();
    if (S.currentId === pageId) {
      const { doSelect } = await import('./views');
      await doSelect(pageId);
    }
  } catch (e) {
    toast('復元失敗: ' + (e as Error).message, 'err');
  } finally { setLoad(false); }
}
