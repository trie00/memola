// "前回の表示以降に更新されました" passive banner.
//
// Shown above the editor when the user opens a page whose etag has
// changed since the last time they viewed it (= someone — possibly the
// user themselves on another device — edited it while this tab had it
// closed). Notion's equivalent is the "Updates" feed; without realtime
// sync we can't push edits live, so this is the closest analog: an
// after-the-fact passive notification that's auto-dismissed and
// non-blocking.
//
// Distinct from `sync-watch.ts`'s "別タブで更新" banner:
//   - sync-watch fires WHILE the user is viewing the page (= polled
//     remote change discovered live). User decides whether to reload.
//   - this banner fires WHEN THE PAGE IS LOADED. The new content is
//     already on screen — the banner just acknowledges the delta so
//     edits don't feel invisible.

import { prefLastSeenEtag } from '../lib/prefs';
import { getListItemEditor } from '../api/sync';
import { escapeHtml } from '../lib/html-escape';

const BANNER_ID = 'memola-since-banner';
const AUTO_DISMISS_MS = 12_000;

/** Compare the just-loaded `etag` against `prefLastSeenEtag(pageId)`.
 *  When they differ — and the user has previously opened this page —
 *  pop a small banner near the top of the editor. Always updates the
 *  saved last-seen etag at the end so subsequent loads only fire on
 *  fresh changes. */
export async function maybeShowSinceLastView(
  pageId: string,
  modified: string,
  etag: string,
): Promise<void> {
  const pref = prefLastSeenEtag(pageId);
  const previous = pref.get();
  // Always advance the marker so the next load fires only on genuinely
  // new edits. We do this BEFORE the network lookup for editor name —
  // even if that fails, we don't want to keep firing indefinitely.
  pref.set(etag);
  if (!previous) return;            // first time opening — nothing to compare
  if (previous === etag) return;    // unchanged
  // Lazy-fetch the editor name so we can phrase the banner properly.
  const editor = await getListItemEditor(pageId).catch(() => '');
  showBanner(modified, editor);
}

function showBanner(modified: string, editor: string): void {
  // Replace any previous banner — only the most recent change matters.
  const existing = document.getElementById(BANNER_ID);
  if (existing) existing.remove();

  const overlay = document.getElementById('memola-overlay') || document.body;
  const bn = document.createElement('div');
  bn.id = BANNER_ID;
  const time = new Date(modified).toLocaleString('ja-JP', {
    month: 'numeric', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
  const who = editor ? '<b>' + escapeHtml(editor) + '</b>さん' : '別の誰か';
  bn.innerHTML =
    '<span class="memola-since-ic">🔔</span>' +
    '<span class="memola-since-msg">前回の表示以降に ' + who + ' が ' + escapeHtml(time) + ' に更新しました</span>' +
    '<button class="memola-since-close" title="閉じる">×</button>';
  overlay.appendChild(bn);

  // Trigger CSS slide-in
  requestAnimationFrame(() => bn.classList.add('on'));

  const dismiss = (): void => {
    if (!bn.parentNode) return;
    bn.classList.remove('on');
    // Wait for the CSS transition to finish before detaching.
    setTimeout(() => bn.remove(), 250);
  };
  bn.querySelector<HTMLButtonElement>('.memola-since-close')
    ?.addEventListener('click', dismiss);

  // Auto-dismiss
  setTimeout(dismiss, AUTO_DISMISS_MS);
}
