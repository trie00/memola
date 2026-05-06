// Auto-refresh on browser-tab refocus.
//
// When the user switches to another browser tab and comes back, the
// 30-second sync-watch poll might leave them seeing data that's up to
// 30 seconds stale. Even worse, the sidebar tree only refreshes on
// explicit operations — page additions / deletions made by other users
// while the tab was hidden are invisible until something triggers a
// reload.
//
// This module hooks `visibilitychange` and refreshes BOTH:
//   - the page tree (S.pages / S.meta.pages)
//   - the currently-open page or DB view
//
// Safety:
//   - Skip when there are unsaved local edits (S.dirty) — re-fetching
//     the body would clobber them. The since-last-view banner / sync
//     banner still alerts the user to remote changes.
//   - Skip during a save (S.saving) or while resolving a merge
//     (S.sync.mergeInProgress) — the user is mid-flow.
//   - Throttle: at most one refresh per 3 s to avoid spamming SP when
//     the user rapid-switches tabs.

import { S } from '../state';
import { apiGetPages } from '../api/pages';
import { saver } from '../lib/saver';

const MIN_INTERVAL_MS = 3000;
let _lastRefreshTs = 0;
let _inFlight = false;

async function refresh(): Promise<void> {
  if (_inFlight) return;
  if (Date.now() - _lastRefreshTs < MIN_INTERVAL_MS) return;
  if (saver.isBusy()) return;
  // Skip refresh entirely when the user has unsaved local edits.
  // apiGetPages replaces S.meta.pages with the SP snapshot, which clobbers
  // any in-memory title edits (= the live tree update from title-wiring).
  // The user perceives this as "the page I just typed a title for shows up
  // as 無題 again after switching tabs", and worse, when their newly-created
  // page hasn't propagated to SP yet, the refreshed list may not include it
  // — leaving the tree in a confusing state. The next save naturally
  // un-dirties the saver and a future tab refocus picks up cross-tab edits.
  if (saver.isDirty()) return;
  _inFlight = true;
  try {
    // Refresh the tree only — page additions / deletions in other tabs
    // should reflect immediately. The body is intentionally NOT
    // re-loaded here: aggressive `doSelect` on every tab refocus was
    // racing with the BroadcastChannel sync (and other in-flight
    // events) and intermittently left the editor showing an empty
    // body even when SP had content. Cross-tab same-user updates are
    // surfaced via the cross-tab banner in `sync-watch.ts`; the 30 s
    // polling still picks up other-user edits as a slower fallback.
    try {
      await apiGetPages();
      const { renderTree } = await import('./tree');
      renderTree();
    } catch { /* tolerate */ }
    // DB views still need re-render because S.dbItems is a snapshot of
    // the list view at open time; without this, deletions / additions
    // in other tabs leave the UI showing ghost rows. The page editor
    // path doesn't have that problem (its body is the Saver baseline,
    // updated on every save).
    if (!S.currentId) return;
    if (S.currentType === 'database' && !S.currentRow) {
      const dbPage = S.pages.find((p) => p.Id === S.currentId);
      if (dbPage) {
        const v = await import('./views');
        await v.doSelectDb(S.currentId, dbPage);
      } else {
        S.currentId = null;
        const { showView } = await import('./views');
        showView('empty');
      }
    }
  } finally {
    _lastRefreshTs = Date.now();
    _inFlight = false;
  }
}

/** Wire the visibilitychange handler. Idempotent — guarded by a body
 *  dataset flag so attachAll's per-bookmarklet-cycle calls don't pile
 *  up listeners. */
export function attachTabRefocusRefresh(): void {
  const body = document.body as HTMLElement & { dataset: DOMStringMap };
  if (body.dataset.memolaTabRefocusWired === '1') return;
  body.dataset.memolaTabRefocusWired = '1';
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return;
    void refresh();
  });
}
