// Foreground polling: while a page is open, check every N seconds whether
// somebody else updated the row. Surface a toast with a "今すぐ反映" link.

import { S } from '../state';
import { apiLoadFileMeta } from '../api/pages';
import { getListItemEditor, getCurrentUser } from '../api/sync';
import { setSave } from './ui-helpers';
import { doSelect } from './views';
import { escapeHtml } from '../lib/html-escape';
import { prefSyncPollMs } from '../lib/prefs';

const DEFAULT_POLL_INTERVAL_MS = 30_000;
/** Suppress the "別タブで更新" banner for this long after any local write
 *  to the watched row. Bigger than the default poll interval so at least
 *  one cycle is always covered, with a healthy margin for SP propagation
 *  lag and zombie pre-fix instances writing identical etags. */
const QUIET_AFTER_WRITE_MS = 60_000;

/** Resolve the user-configured poll interval. '0' = poller disabled.
 *  Empty / invalid pref falls back to DEFAULT_POLL_INTERVAL_MS so we
 *  preserve prior behaviour for users who never visit settings. */
function resolvePollIntervalMs(): number {
  const raw = prefSyncPollMs.get();
  const n = raw ? parseInt(raw, 10) : DEFAULT_POLL_INTERVAL_MS;
  if (!isFinite(n) || n < 0) return DEFAULT_POLL_INTERVAL_MS;
  return n;          // 0 means "disabled" — caller skips setInterval
}

export function startWatching(pageId: string, modified: string, etag: string): void {
  S.sync.pageId = pageId;
  S.sync.loadedModified = modified;
  S.sync.loadedEtag = etag;
  // New page opened — reset the recent-write window so the first save on
  // the new page gets the full QUIET_AFTER_WRITE_MS grace.
  S.sync.lastLocalWriteTs = null;
  hideStaleBanner();
  if (S.sync.pollTimer) clearInterval(S.sync.pollTimer);
  // Honour the user's "off / 30s / 1m / 5m" preference. When 0, we still
  // track pageId/etag/modified so save-time conflict detection works (it
  // uses S.sync.loadedEtag), we just don't poll for foreign updates.
  const ms = resolvePollIntervalMs();
  if (ms > 0) S.sync.pollTimer = setInterval(checkOnce, ms);
}

export function stopWatching(): void {
  if (S.sync.pollTimer) clearInterval(S.sync.pollTimer);
  S.sync.pollTimer = null;
  S.sync.pageId = null;
  S.sync.loadedModified = null;
  S.sync.loadedEtag = null;
  S.sync.lastLocalWriteTs = null;
  hideStaleBanner();
}

async function checkOnce(): Promise<void> {
  if (document.hidden) return;                          // tab not visible — skip
  if (S.sync.suppressBannerUntilFocus) return;          // user opted out for this visit
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
    // Defence-in-depth: a write from THIS tab in the very recent past is
    // overwhelmingly more likely to be the source of an etag advance than
    // a real foreign edit appearing within the same window. Suppress the
    // banner and silently align. This catches:
    //   - Zombie pre-fix bookmarklet instances that still poll/write
    //     because their main.ts didn't have a shutdown handler.
    //   - Any future race where the post-save read-back fetched a
    //     different etag string format than what the poll fetch returns.
    //   - SP eventual-consistency lag between write ack and read-back.
    if (
      S.sync.lastLocalWriteTs != null &&
      Date.now() - S.sync.lastLocalWriteTs < QUIET_AFTER_WRITE_MS
    ) {
      S.sync.loadedEtag = meta.etag;
      S.sync.loadedModified = meta.modified;
      // Remember this etag too — next poll comparison will short-circuit.
      const { rememberOurEtag } = await import('../api/pages');
      rememberOurEtag(meta.etag);
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
    '<button id="memola-sync-dismiss">後で</button>' +
    '<button id="memola-sync-mute" title="このブラウザタブを離れるまで再表示しません">タブを離れるまで非表示</button>';
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
  document.getElementById('memola-sync-mute')?.addEventListener('click', () => {
    // "Don't show again until tab refocus": set the flag, hide the
    // banner. visibilitychange (in attachStaleBannerSuppressionReset)
    // clears the flag when the user comes back from another browser tab.
    S.sync.suppressBannerUntilFocus = true;
    hideStaleBanner();
  });
}

function hideStaleBanner(): void {
  const bn = document.getElementById('memola-sync-banner');
  if (bn) bn.remove();
}

/** One-time setup: clear `suppressBannerUntilFocus` whenever the user
 *  switches BACK to this browser tab. The mute button is meant to last
 *  for the current "visit"; coming back from another tab is the
 *  natural moment to start showing notifications again. Idempotent —
 *  guarded by a dataset flag on document.body so repeated calls don't
 *  pile up listeners. */
export function attachStaleBannerSuppressionReset(): void {
  const body = document.body as HTMLElement & { dataset: DOMStringMap };
  if (body.dataset.memolaStaleResetWired === '1') return;
  body.dataset.memolaStaleResetWired = '1';
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      S.sync.suppressBannerUntilFocus = false;
    }
  });
}

