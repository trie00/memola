// Foreground polling: while a page is open, check every N seconds whether
// somebody else updated the row. Surface a toast with a "今すぐ反映" link.

import { S } from '../state';
import { apiLoadFileMeta, apiLoadBlocksBody, serializeBlocks, apiRestorePage } from '../api/pages';
import { getListItemEditor, getCurrentUser } from '../api/sync';
import { doSelect, showView } from './views';
import { escapeHtml } from '../lib/html-escape';
import { prefSyncPollMs, prefLastSeenEtag } from '../lib/prefs';
import { listenPageSaved, closeCrossTabChannel } from '../lib/cross-tab-sync';
import { saver } from '../lib/saver';
import { planLiveSync } from '../lib/live-sync';
import { getBlocks, reconcileEditorBlocks, isEditorComposing } from './editor2/editor2-bridge';
import { toast } from './ui-helpers';
import { removePages } from '../lib/page-store';
import { renderTree } from './tree';
import { saveDraft } from './draft-store';

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
  if (S.saving) return;                                  // local save in flight — skip
  // Note: we DON'T skip when dirty. A foreign edit to a DIFFERENT block
  // can be folded into my unsaved edits live (tryLiveSync); only a
  // same-block clash falls back to the banner.
  const page = S.pages.find((p) => p.Id === id);
  if (!page || page.Type === 'database') return;
  try {
    const meta = await apiLoadFileMeta(id);
    if (S.currentId !== id) return;        // navigated away during await
    // The page we're editing was removed by someone else. Editing /
    // saving into a deleted row is pointless — prompt the user instead of
    // silently continuing (hard delete) or writing into a trashed row
    // (soft delete).
    if (!meta) { await handlePageRemoved(id, 'purged'); return; }
    if (meta.trashed > 0) { await handlePageRemoved(id, 'trashed'); return; }
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
    // Foreign edit detected. Try to fold it into the live editor
    // block-by-block (C). Only a same-block clash (or a non-structural
    // body) falls through.
    const applied = await tryLiveSync(id, meta.etag, meta.modified);
    if (applied) return;
    // 編集中(dirty)の同一ブロック衝突: どうせ自動保存(≦10秒)が412→競合モーダルに
    // なるので、バナーで予告せず保存フローを前倒しして即モーダルを出す
    // (バナー→数秒後モーダルの二段通知をなくす)。
    if (saver.isDirty(id)) {
      const { flushPendingSave } = await import('./save-control');
      await flushPendingSave().catch(() => undefined);   // 412 → saver が conflict 状態に遷移しモーダル表示
      return;
    }
    // 編集していないのに自動反映できない稀なケースのみ、お知らせバナー。
    const editor = await getListItemEditor(id).catch(() => '');
    const me = await getCurrentUser().catch(() => '');
    if (S.currentId !== id) return;        // and again before painting
    const sameUser = !!editor && !!me && editor === me;
    showStaleBanner(editor, meta.modified, id, sameUser);
  } catch { /* ignore transient errors */ }
}

/** Re-entrancy guard so the 30s poll doesn't stack deletion prompts while
 *  a confirm() dialog is already open. */
let _removalPromptOpen = false;

/** The page currently open was removed by another user. Prompt the user:
 *    - 'trashed' (soft delete): offer to RESTORE it and keep editing, or
 *      bail (saving unsaved edits to a draft first).
 *    - 'purged' (hard delete / migrated to a new id — unrecoverable):
 *      offer to save the in-progress edits as a draft, then close.
 *  Saving into a deleted row is pointless, so we never just continue. */
async function handlePageRemoved(id: string, mode: 'trashed' | 'purged'): Promise<void> {
  if (_removalPromptOpen) return;
  const st = saver.state();
  // Only act when the Saver is loaded on THIS page with a base snapshot
  // (idle / dirty). Mid-conflict / mid-merge states resolve on their own.
  if (st.kind !== 'idle' && st.kind !== 'dirty') return;
  if (st.base.pageId !== id) return;
  _removalPromptOpen = true;
  try {
    const dirty = saver.isDirty();
    const title = (st.kind === 'dirty' ? st.title : st.base.title) || '無題';
    const editorBody = serializeBlocks(getBlocks());

    if (mode === 'trashed') {
      const ok = window.confirm(
        'このページは他のユーザーによって削除（ゴミ箱へ移動）されました。\n\n' +
        '「OK」: 元に戻して編集を続けます。\n' +
        '「キャンセル」: ' + (dirty ? '編集内容を下書きに退避して' : '') + 'このページを閉じます。',
      );
      if (ok) {
        await apiRestorePage(id);
        const m = await apiLoadFileMeta(id).catch(() => null);
        if (m) { S.sync.loadedEtag = m.etag; S.sync.loadedModified = m.modified; }
        toast('ページを復元しました。編集を続けられます');
        return;
      }
      if (dirty) {
        stashDraft(id, title, editorBody, st.base.body, st.base.etag);
        toast('編集内容を下書きに保存しました（📝 下書き から開けます）');
      }
      leaveRemovedPage(id);
      return;
    }

    // purged — unrecoverable.
    const save = window.confirm(
      'このページは完全に削除されました。元に戻せません。\n\n' +
      '編集内容を下書きとして保存しますか?\n（📝 下書き から後で開けます）',
    );
    if (save) {
      stashDraft(id, title, editorBody, st.base.body, st.base.etag);
      toast('下書きに保存しました（📝 下書き から開けます）');
    }
    leaveRemovedPage(id);
  } finally {
    _removalPromptOpen = false;
  }
}

function stashDraft(id: string, title: string, body: string, baseBody: string, baseEtag: string): void {
  try {
    saveDraft({ pageId: id, pageTitle: title, title, body, baseBody, baseEtag, reason: 'page-deleted' });
    void import('./drafts-modal').then((m) => m.refreshDraftsBadge()).catch(() => undefined);
  } catch { /* draft save is best-effort */ }
}

/** Detach from a removed page: stop polling, unload the Saver, drop the
 *  stale row from the local cache, and show the empty state. */
function leaveRemovedPage(id: string): void {
  stopWatching();
  saver.unload();
  removePages([id]);
  S.currentId = null;
  S.currentRow = null;
  renderTree();
  showView('empty');
}

/** Attempt a live block-level merge of a detected foreign edit into the
 *  mounted editor (C). Returns true when handled (merged in, or nothing
 *  to do) so the caller skips the banner; false when the caller should
 *  fall back to the manual "今すぐ反映" banner (same-block conflict,
 *  non-structural body, or saver mid-flow).
 *
 *  Flow: 3-way merge base/ours/theirs by block id →
 *    - no conflict → reconcile the editor (caret-preserving) + rebase
 *      the Saver onto theirs so the watermark/etag advance and any
 *      unsaved edits stay dirty against the new base.
 *    - conflict / unmergeable → false (banner). */
async function tryLiveSync(
  id: string,
  theirsEtag: string,
  theirsModified: string,
): Promise<boolean> {
  const st = saver.state();
  // Only fold in when a page is loaded and we're not mid-save/merge.
  if (st.kind !== 'idle' && st.kind !== 'dirty') return false;
  if (st.base.pageId !== id) return false;
  if (isEditorComposing()) return true;   // skip this tick; retry next poll (no banner)

  const theirsBody = await apiLoadBlocksBody(id).catch(() => null);
  if (theirsBody === null) return false;
  if (S.currentId !== id) return true;    // navigated away during fetch

  const baseBody = st.base.body;
  const oursBody = serializeBlocks(getBlocks());
  const editorTitle = st.kind === 'dirty' ? st.title : st.base.title;

  const plan = planLiveSync(baseBody, oursBody, theirsBody);
  if (plan.kind === 'conflict' || plan.kind === 'noop') return false;   // → banner

  // Clean merge. Fold into the editor only if the visible content
  // actually changed (avoids a no-op reconcile).
  if (plan.changed) {
    reconcileEditorBlocks(plan.merged);
    // Tint the blocks the other user added/updated so the change is visible.
    void import('./merge-highlight').then((m) => m.highlightIncomingBlocks(oursBody, plan.mergedBody))
      .catch(() => undefined);
  }
  saver.rebaseOnto(
    { pageId: id, body: theirsBody, title: editorTitle, etag: theirsEtag, modified: theirsModified },
    plan.mergedBody,
    editorTitle,
  );
  // The user has now SEEN this remote version (folded in live), so
  // advance the since-last-view marker — a later revisit shouldn't
  // re-notify about an edit already shown.
  prefLastSeenEtag(id).set(theirsEtag);
  return true;
}

function showStaleBanner(editor: string, modified: string, pageId: string, sameUser = false): void {
  // 競合モーダル(統合/上書き/相手の版)が出ている間は重複通知になるので出さない。
  // 同じリモート更新イベントに2系統(ポーリング通知とセーバ412)が反応するため、
  // モーダルが主・バナーは従とする。
  if (saver.state().kind === 'conflict' || saver.state().kind === 'merging') return;
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
let _crossTabUnsub: (() => void) | null = null;

/** Teardown: drop the cross-tab listener, close the channel, and clear the
 *  wired-flag so a bookmarklet re-press re-wires cleanly on a FRESH channel.
 *  Otherwise the old instance's channel stays open and echoes the new
 *  instance's own saves (different tabId) → bogus "別のタブ" banner with
 *  only one physical tab open. */
export function detachCrossTabSync(): void {
  if (_crossTabUnsub) { _crossTabUnsub(); _crossTabUnsub = null; }
  closeCrossTabChannel();
  const body = document.body as HTMLElement & { dataset: DOMStringMap };
  delete body.dataset.memolaCrossTabWired;
}

export function attachCrossTabSync(): void {
  const body = document.body as HTMLElement & { dataset: DOMStringMap };
  if (body.dataset.memolaCrossTabWired === '1') return;
  body.dataset.memolaCrossTabWired = '1';
  _crossTabUnsub = listenPageSaved((msg) => {
    if (S.currentId !== msg.pageId) return;
    if (msg.etag && msg.etag === S.sync.loadedEtag) return;
    if (S.sync.suppressBannerUntilFocus) return;
    if (S.saving) return;
    void (async () => {
      // Same as the poll path: try to fold the sibling-tab edit into the
      // live editor block-by-block; only fall back to the banner on a
      // same-block clash. BroadcastChannel is same-user-same-browser, so
      // the banner is always the "別のタブ (あなた)" flavour.
      const applied = await tryLiveSync(msg.pageId, msg.etag, msg.modified);
      if (applied) return;
      if (S.currentId !== msg.pageId) return;
      // ポーリング経路と同じ: 編集中なら保存フローを前倒しして即競合モーダルへ
      // (バナー→すぐモーダルの二段通知を避ける)。
      if (saver.isDirty(msg.pageId)) {
        const { flushPendingSave } = await import('./save-control');
        await flushPendingSave().catch(() => undefined);
        return;
      }
      showStaleBanner('', msg.modified, msg.pageId, /*sameUser*/ true);
    })();
  });
}

