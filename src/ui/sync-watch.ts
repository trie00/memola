// Foreground polling: while a page is open, check every N seconds whether
// somebody else updated the row. Surface a toast with a "今すぐ反映" link.

import { S } from '../state';
import { apiLoadFileMeta } from '../api/pages';
import { getListItemEditor, getCurrentUser } from '../api/sync';
import { setSave } from './ui-helpers';
import { doSelect } from './views';
import { escapeHtml } from '../lib/html-escape';

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
    // Self-edit guard: any etag THIS tab produced via its own save lives
    // in `ourSavedEtags`. If the SP-side etag matches one of those, the
    // mismatch is a stale watermark on our side, not a foreign change.
    // Silently align so we stop noticing it next time.
    if (meta.etag && S.sync.ourSavedEtags.indexOf(meta.etag) >= 0) {
      S.sync.loadedEtag = meta.etag;
      S.sync.loadedModified = meta.modified;
      return;
    }
    // Row advanced from somewhere other than this tab — could be another
    // tab of this user, or a different user altogether. Distinguish so
    // the banner can say "別のタブ (あなた)" vs "○○さん".
    const editor = await getListItemEditor(id).catch(() => '');
    const me = await getCurrentUser().catch(() => '');
    const sameUser = !!editor && !!me && editor === me;
    showStaleBanner(editor, meta.modified, meta.etag, id, sameUser);
  } catch { /* ignore transient errors */ }
}

function showStaleBanner(editor: string, modified: string, etag: string, pageId: string, sameUser = false): void {
  let bn = document.getElementById('memola-sync-banner');
  if (!bn) {
    bn = document.createElement('div');
    bn.id = 'memola-sync-banner';
    document.getElementById('memola-overlay')?.appendChild(bn);
  }
  const time = new Date(modified).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  // Same-user case is almost certainly "another tab of yours". We say so
  // explicitly so the user doesn't get confused about who edited.
  const who = sameUser
    ? '別のタブ (あなた)'
    : '<strong>' + escapeHtml(editor || '誰か') + '</strong>さん';
  bn.innerHTML =
    '<span>🔔 ' + who + 'が ' + time + ' に更新しました</span>' +
    '<button id="memola-sync-reload">今すぐ反映</button>' +
    '<button id="memola-sync-dismiss">後で</button>';
  bn.classList.add('on');
  document.getElementById('memola-sync-reload')?.addEventListener('click', async () => {
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
  document.getElementById('memola-sync-dismiss')?.addEventListener('click', () => {
    hideStaleBanner();
  });
}

function hideStaleBanner(): void {
  const bn = document.getElementById('memola-sync-banner');
  if (bn) bn.remove();
}

