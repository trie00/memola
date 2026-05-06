// Foreground polling: while a page is open, check every N seconds whether
// somebody else updated the row. Surface a toast with a "今すぐ反映" link.

import { S } from '../state';
import { apiLoadFileMeta } from '../api/pages';
import { getListItemEditor, getCurrentUser } from '../api/sync';
import { doSelect } from './views';
import { escapeHtml } from '../lib/html-escape';
import { prefSyncPollMs } from '../lib/prefs';
import { listenPageSaved } from '../lib/cross-tab-sync';

const DEFAULT_POLL_INTERVAL_MS = 30_000;

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
    // ETag-based comparison is the source of truth for "did SP advance
    // beyond what we have?". The Saver atomically updates loadedEtag
    // after every successful save (via saver-bridge), so a mismatch
    // here genuinely means a foreign edit landed.
    //
    // Earlier this function carried two layers of silent-align
    // heuristics (ourSavedEtags + lastLocalWriteTs body-compare) to
    // defend against zombie pre-fix instances and SP eventual-
    // consistency. Both layers are gone:
    //   - Zombies are killed by the bookmarklet __memolaShutdown hook
    //   - Saver owns the watermark; post-save updates can't drift
    //   - The lastLocalWriteTs heuristic actively MASKED legitimate
    //     same-user-two-tab conflicts, causing silent overwrites
    //
    // Net: simpler, more correct, no false negatives.
    if (S.currentId !== id) return;        // user navigated during await
    const etagSame = !!meta.etag && meta.etag === S.sync.loadedEtag;
    const modifiedSame = !!meta.modified && meta.modified === S.sync.loadedModified;
    if (etagSame || modifiedSame) return;
    // Foreign edit detected — surface the banner. We distinguish
    // "another tab of this user" vs "another user" so the message can
    // be clearer.
    const editor = await getListItemEditor(id).catch(() => '');
    const me = await getCurrentUser().catch(() => '');
    if (S.currentId !== id) return;        // and again before painting
    const sameUser = !!editor && !!me && editor === me;
    showStaleBanner(editor, meta.modified, id, sameUser);
  } catch { /* ignore transient errors */ }
}

function showStaleBanner(editor: string, modified: string, pageId: string, sameUser = false): void {
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
    const { saver } = await import('../lib/saver');
    if (saver.isDirty()) {
      if (!confirm('未保存の変更があります。リロードして上書きしますか？')) return;
    }
    // doSelect re-loads the page → saver.loadPage transitions to 'idle';
    // saver-bridge updates the status bar and S.sync.loadedEtag/Modified.
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

/** Cross-tab broadcast receiver. When a sibling tab finishes saving
 *  the same page we have open, surface the existing stale-banner
 *  immediately instead of waiting up to 30 s for the polling tick.
 *
 *  Auto-reload was tried but produced a "body disappears on tab
 *  switch" race against `attachTabRefocusRefresh`'s visibilitychange
 *  handler — they both end up calling `doSelect` and one half-completes.
 *  Manual click on the banner is more predictable and never strands
 *  the editor in an inconsistent state.
 *
 *  Idempotent — guarded by a dataset flag. */
export function attachCrossTabSync(): void {
  const body = document.body as HTMLElement & { dataset: DOMStringMap };
  if (body.dataset.memolaCrossTabWired === '1') return;
  body.dataset.memolaCrossTabWired = '1';
  listenPageSaved((msg) => {
    if (S.currentId !== msg.pageId) return;
    if (msg.etag && msg.etag === S.sync.loadedEtag) return;
    if (S.sync.suppressBannerUntilFocus) return;
    // BroadcastChannel only delivers same-origin same-user same-browser
    // messages, so we can label the banner "別のタブ (あなた)" without
    // a network round-trip to confirm the editor identity. (The poll
    // path still asks SP because it sees real foreign-user edits too.)
    showStaleBanner('', msg.modified, msg.pageId, /*sameUser*/ true);
  });
}

