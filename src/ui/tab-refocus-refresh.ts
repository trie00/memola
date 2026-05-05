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
  // Sensitive states — skip everything (= save / conflict / merge in flight)
  if (saver.isBusy()) return;
  _inFlight = true;
  try {
    // 1. Always refresh the tree — adding / deleting / renaming a page
    //    in another tab while we were away should reflect immediately.
    //    This doesn't touch the editor and is safe regardless of dirty.
    try {
      await apiGetPages();
      const { renderTree } = await import('./tree');
      renderTree();
    } catch { /* tolerate */ }

    // 2. Refresh the current view body — but ONLY if no unsaved edits.
    //    Reloading would clobber the user's typing. They get the
    //    since-last-view banner / sync banner instead.
    if (saver.isDirty()) return;
    if (!S.currentId) return;

    if (S.currentType === 'page' && !S.currentRow) {
      const v = await import('./views');
      await v.doSelect(S.currentId);
    } else if (S.currentType === 'database') {
      const dbPage = S.pages.find((p) => p.Id === S.currentId);
      if (dbPage) {
        const v = await import('./views');
        await v.doSelectDb(S.currentId, dbPage);
      } else {
        // The DB itself was deleted in another tab while we were away.
        S.currentId = null;
        const { showView } = await import('./views');
        showView('empty');
      }
    } else if (S.currentRow) {
      // Row-as-page: reload via parent DB to pick up row deletions /
      // edits cleanly.
      const dbId = S.currentRow.dbId;
      const dbPage = S.pages.find((p) => p.Id === dbId);
      if (dbPage) {
        const rowId = S.currentRow.itemId;
        const listTitle = S.currentRow.listTitle;
        S.currentRow = null;
        const v = await import('./views');
        await v.doSelectDb(dbId, dbPage);
        // Try to re-open the row if it still exists post-refresh
        const item = S.dbItems.find((i) => i.Id === rowId);
        if (item) {
          const r = await import('./row-page');
          await r.openRowAsPage(dbId, item);
        }
        void listTitle;          // captured for symmetry; unused here
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
