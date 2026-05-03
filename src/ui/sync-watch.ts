// Foreground polling: while a page is open, check every N seconds whether
// somebody else updated the row. Surface a toast with a "今すぐ反映" link.

import { S } from '../state';
import { apiLoadFileMeta } from '../api/pages';
import { getListItemEditor, getCurrentUser } from '../api/sync';
import { setSave } from './ui-helpers';
import { doSelect } from './views';

const POLL_INTERVAL_MS = 30_000;

export function startWatching(pageId: string, modified: string, etag: string): void {
  S.sync.pageId = pageId;
  S.sync.loadedModified = modified;
  S.sync.loadedEtag = etag;
  hideStaleBanner();
  if (S.sync.pollTimer) clearInterval(S.sync.pollTimer);
  S.sync.pollTimer = setInterval(checkOnce, POLL_INTERVAL_MS);
}

export function stopWatching(): void {
  if (S.sync.pollTimer) clearInterval(S.sync.pollTimer);
  S.sync.pollTimer = null;
  S.sync.pageId = null;
  S.sync.loadedModified = null;
  S.sync.loadedEtag = null;
  hideStaleBanner();
}

async function checkOnce(): Promise<void> {
  if (document.hidden) return;                          // tab not visible — skip
  const id = S.sync.pageId;
  if (!id || S.currentId !== id) return;                // page changed — skip
  if (S.saving || S.dirty) return;                      // local save in flight — skip
  const page = S.pages.find((p) => p.Id === id);
  if (!page || page.Type === 'database') return;
  try {
    const meta = await apiLoadFileMeta(id);
    if (!meta) return;
    // ETag-based comparison is more reliable than Modified (string format
    // can vary). Only fall back to modified if ETag isn't returned.
    const etagSame = !!meta.etag && meta.etag === S.sync.loadedEtag;
    const modifiedSame = !!meta.modified && meta.modified === S.sync.loadedModified;
    if (etagSame || modifiedSame) return;
    // Row advanced — find out who did it. Watermark-refresh discipline
    // *should* keep our own writes from getting here, but we have a
    // backup self-edit filter just in case some path is missing the
    // refresh call (e.g. another tab of the same user).
    const [editor, me] = await Promise.all([
      getListItemEditor(id).catch(() => ''),
      getCurrentUser(),
    ]);
    if (editor && me && editor === me) {
      // Same user — could be: this tab missed a watermark update, OR
      // another tab/AI tool/side-channel from this user. Silently align
      // the watermark and don't pop a banner. (Multi-tab notifications
      // are deferred — same-user activity is usually self-aware.)
      S.sync.loadedModified = meta.modified;
      S.sync.loadedEtag = meta.etag;
      return;
    }
    showStaleBanner(editor, meta.modified, meta.etag, id);
  } catch { /* ignore transient errors */ }
}

function showStaleBanner(editor: string, modified: string, etag: string, pageId: string): void {
  let bn = document.getElementById('n365-sync-banner');
  if (!bn) {
    bn = document.createElement('div');
    bn.id = 'n365-sync-banner';
    document.getElementById('n365-overlay')?.appendChild(bn);
  }
  const time = new Date(modified).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  bn.innerHTML =
    '<span>🔔 <strong>' + escapeHtml(editor || '誰か') + '</strong>さんが ' + time + ' に更新しました</span>' +
    '<button id="n365-sync-reload">今すぐ反映</button>' +
    '<button id="n365-sync-dismiss">後で</button>';
  bn.classList.add('on');
  document.getElementById('n365-sync-reload')?.addEventListener('click', async () => {
    if (S.dirty) {
      if (!confirm('未保存の変更があります。リロードして上書きしますか？')) return;
    }
    S.dirty = false;
    setSave('');
    S.sync.loadedModified = modified;
    S.sync.loadedEtag = etag;
    hideStaleBanner();
    await doSelect(pageId);
  });
  document.getElementById('n365-sync-dismiss')?.addEventListener('click', () => {
    hideStaleBanner();
  });
}

function hideStaleBanner(): void {
  const bn = document.getElementById('n365-sync-banner');
  if (bn) bn.remove();
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
