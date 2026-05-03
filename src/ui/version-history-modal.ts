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

const MODAL_ID = 'n365-versions-md';

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

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
  el.className = 'n365-versions-md';
  el.style.display = 'none';
  el.innerHTML =
    '<div class="n365-versions-box">' +
      '<div class="n365-versions-hd">' +
        '<span class="n365-versions-title">📜 バージョン履歴</span>' +
        '<button class="n365-versions-close" title="閉じる">×</button>' +
      '</div>' +
      '<div class="n365-versions-body"></div>' +
    '</div>';
  (document.getElementById('n365-overlay') || document.body).appendChild(el);
  el.addEventListener('click', (e) => {
    if (e.target === el) close();
  });
  el.querySelector<HTMLElement>('.n365-versions-close')?.addEventListener('click', close);
  return el;
}

function close(): void {
  const el = document.getElementById(MODAL_ID);
  if (el) el.style.display = 'none';
  document.removeEventListener('keydown', onKey, true);
}

function onKey(e: KeyboardEvent): void {
  if (e.key === 'Escape') close();
}

export async function openVersionHistory(pageId: string, pageTitle: string): Promise<void> {
  const el = ensureModal();
  const body = el.querySelector<HTMLElement>('.n365-versions-body');
  const titleEl = el.querySelector<HTMLElement>('.n365-versions-title');
  if (titleEl) titleEl.textContent = '📜 バージョン履歴: ' + pageTitle;
  if (!body) return;
  body.innerHTML = '<div class="n365-versions-loading">読み込み中…</div>';
  el.style.display = 'flex';
  document.addEventListener('keydown', onKey, true);

  let versions: PageVersion[] = [];
  try {
    versions = await listPageVersions(pageId);
  } catch (e) {
    body.innerHTML = '<div class="n365-versions-error">取得失敗: ' + escapeHtml((e as Error).message) + '</div>';
    return;
  }
  if (versions.length === 0) {
    body.innerHTML = '<div class="n365-versions-empty">バージョン履歴がありません。<br><span style="font-size:11px;color:var(--ink-3)">SP リストの「バージョン管理設定」がオフの可能性があります。</span></div>';
    return;
  }

  body.innerHTML = versions.map((v, idx) => {
    const preview = (v.body || '').replace(/\s+/g, ' ').slice(0, 120);
    const isCurrent = idx === 0;
    return '<div class="n365-versions-item' + (isCurrent ? ' current' : '') + '" data-idx="' + idx + '">' +
      '<div class="n365-versions-itemhd">' +
        '<span class="n365-versions-label">v' + escapeHtml(v.versionLabel) + (isCurrent ? ' (現在)' : '') + '</span>' +
        '<span class="n365-versions-time">' + formatDateTime(v.created) + '</span>' +
        '<span class="n365-versions-editor">' + escapeHtml(v.editor || '不明') + '</span>' +
      '</div>' +
      '<div class="n365-versions-preview">' + escapeHtml(preview || '(本文なし)') + '</div>' +
      '<div class="n365-versions-actions">' +
        '<button class="n365-btn s" data-act="preview">プレビュー</button>' +
        (isCurrent ? '' : '<button class="n365-btn p" data-act="restore">この版に戻す</button>') +
      '</div>' +
    '</div>';
  }).join('');

  body.querySelectorAll<HTMLElement>('.n365-versions-item').forEach((itemEl) => {
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
  w.className = 'n365-versions-md on';
  w.style.zIndex = '2147483649';
  w.innerHTML =
    '<div class="n365-versions-box" style="max-width:760px">' +
      '<div class="n365-versions-hd">' +
        '<span class="n365-versions-title">v' + v.versionLabel + ' プレビュー</span>' +
        '<button class="n365-versions-close">×</button>' +
      '</div>' +
      '<div class="n365-versions-fullpreview">' + mdToHtml(v.body) + '</div>' +
    '</div>';
  (document.getElementById('n365-overlay') || document.body).appendChild(w);
  const c = (): void => { w.remove(); };
  w.addEventListener('click', (e) => { if (e.target === w) c(); });
  w.querySelector<HTMLElement>('.n365-versions-close')?.addEventListener('click', c);
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
