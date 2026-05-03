// Page version history viewer modal.
//
// Lists all SP-side versions of the current page (newest first), with an
// inline preview and a "この版に戻す" button. Restoration goes through
// the regular save path so it gets the usual conflict guard and watermark
// refresh.

import { S } from '../state';
import { toast, setLoad } from './ui-helpers';
import { mdToHtml } from '../lib/markdown';
import { listPageVersions, type PageVersion } from '../api/version-history';
import { escapeHtml } from '../lib/html-escape';

const MODAL_ID = 'memola-versions-md';

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

function ensureModal(): HTMLElement {
  let el = document.getElementById(MODAL_ID);
  if (el) return el;
  el = document.createElement('div');
  el.id = MODAL_ID;
  el.className = 'memola-versions-md';
  el.style.display = 'none';
  el.innerHTML =
    '<div class="memola-versions-box">' +
      '<div class="memola-versions-hd">' +
        '<span class="memola-versions-title">📜 バージョン履歴</span>' +
        '<button class="memola-versions-close" title="閉じる">×</button>' +
      '</div>' +
      '<div class="memola-versions-body"></div>' +
    '</div>';
  (document.getElementById('memola-overlay') || document.body).appendChild(el);
  el.addEventListener('click', (e) => {
    if (e.target === el) close();
  });
  el.querySelector<HTMLElement>('.memola-versions-close')?.addEventListener('click', close);
  return el;
}

function close(): void {
  const el = document.getElementById(MODAL_ID);
  if (el) el.style.display = 'none';
  document.removeEventListener('keydown', onKey, true);
}

function onKey(e: KeyboardEvent): void {
  if (e.key === 'Escape') {
    e.preventDefault();
    e.stopPropagation();
    close();
  }
}

export async function openVersionHistory(pageId: string, pageTitle: string): Promise<void> {
  const el = ensureModal();
  const body = el.querySelector<HTMLElement>('.memola-versions-body');
  const titleEl = el.querySelector<HTMLElement>('.memola-versions-title');
  if (titleEl) titleEl.textContent = '📜 バージョン履歴: ' + pageTitle;
  if (!body) return;
  body.innerHTML = '<div class="memola-versions-loading">読み込み中…</div>';
  el.style.display = 'flex';
  document.addEventListener('keydown', onKey, true);

  let versions: PageVersion[] = [];
  try {
    versions = await listPageVersions(pageId);
  } catch (e) {
    body.innerHTML = '<div class="memola-versions-error">取得失敗: ' + escapeHtml((e as Error).message) + '</div>';
    return;
  }
  if (versions.length === 0) {
    body.innerHTML = '<div class="memola-versions-empty">バージョン履歴がありません。<br><span style="font-size:11px;color:var(--ink-3)">SP リストの「バージョン管理設定」がオフの可能性があります。</span></div>';
    return;
  }

  body.innerHTML = versions.map((v, idx) => {
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

  body.querySelectorAll<HTMLElement>('.memola-versions-item').forEach((itemEl) => {
    const idx = parseInt(itemEl.dataset.idx || '-1', 10);
    if (idx < 0) return;
    itemEl.addEventListener('click', async (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>('button[data-act]');
      if (!btn) return;
      const act = btn.dataset.act;
      const v = versions[idx];
      if (!v) return;
      if (act === 'preview') {
        showPreview(v);
      } else if (act === 'restore') {
        await restoreVersion(pageId, v);
      }
    });
  });
}

function showPreview(v: PageVersion): void {
  const w = document.createElement('div');
  w.className = 'memola-versions-md on';
  w.style.zIndex = '2147483649';
  w.innerHTML =
    '<div class="memola-versions-box" style="max-width:760px">' +
      '<div class="memola-versions-hd">' +
        '<span class="memola-versions-title">v' + v.versionLabel + ' プレビュー</span>' +
        '<button class="memola-versions-close">×</button>' +
      '</div>' +
      '<div class="memola-versions-fullpreview">' + mdToHtml(v.body) + '</div>' +
    '</div>';
  (document.getElementById('memola-overlay') || document.body).appendChild(w);
  const c = (): void => { w.remove(); };
  w.addEventListener('click', (e) => { if (e.target === w) c(); });
  w.querySelector<HTMLElement>('.memola-versions-close')?.addEventListener('click', c);
}

async function restoreVersion(pageId: string, v: PageVersion): Promise<void> {
  if (!confirm(
    'v' + v.versionLabel + ' (' + formatDateTime(v.created) + ' / ' + (v.editor || '不明') + ') の内容で現在の本文を上書きします。\n\n' +
    '現在の版は SP のバージョン履歴に残るので、後で元に戻すことも可能です。\n\n' +
    '続行しますか？',
  )) return;
  try {
    setLoad(true, '復元中…');
    const { apiSavePageMd } = await import('../api/pages');
    const result = await apiSavePageMd(pageId, v.title || '無題', v.body);
    if (!result.ok) {
      toast('復元失敗: 競合を検出しました。再度お試しください', 'err');
      return;
    }
    toast('v' + v.versionLabel + ' に復元しました');
    close();
    // Reload the page so the editor shows the restored content
    if (S.currentId === pageId) {
      const { doSelect } = await import('./views');
      await doSelect(pageId);
    }
  } catch (e) {
    toast('復元失敗: ' + (e as Error).message, 'err');
  } finally { setLoad(false); }
}
