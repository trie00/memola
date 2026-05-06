// Presence UI — renders avatars of users currently viewing this page in
// the top bar. Pings every PING_MS and refreshes the avatar list.

import { S } from '../state';
import {
  startPresence, pingPresence, leavePresence, listPresence,
  attachUnloadCleanup, PING_MS, type PresenceUser,
} from '../api/presence';
import { escapeHtml } from '../lib/html-escape';
import { prefPresenceEnabled } from '../lib/prefs';

/** Read the on/off pref. Default '1' (on) preserves prior behaviour. */
function isPresenceEnabled(): boolean {
  const v = prefPresenceEnabled.get();
  return v !== '0';
}

let _timer: ReturnType<typeof setInterval> | null = null;
let _currentPageId: string | null = null;

function initials(name: string): string {
  if (!name) return '?';
  // For Japanese names (no spaces), take first 1 char; for spaced names,
  // take first letter of each token (max 2).
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 1);
}

/** Stable color from name (HSL hue derived from string hash). */
function colorFor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return `hsl(${h % 360}, 55%, 55%)`;
}

function renderAvatars(users: PresenceUser[]): void {
  const el = document.getElementById('memola-presence');
  if (!el) return;
  // Hide self when alone — single-user case is uninteresting and
  // saves screen real-estate.
  const others = users.filter((u) => !u.isSelf);
  if (others.length === 0) {
    el.style.display = 'none';
    return;
  }
  el.style.display = '';
  // Cap visible avatars at 5; collapse the rest into +N
  const MAX_SHOWN = 5;
  const visible = others.slice(0, MAX_SHOWN);
  const overflow = others.length - visible.length;
  el.innerHTML = visible.map((u) => {
    return '<span class="memola-presence-av" style="background:' + colorFor(u.userName) + '"' +
      ' title="' + escapeHtml(u.userName) + ' が閲覧中">' +
      escapeHtml(initials(u.userName)) + '</span>';
  }).join('') +
  (overflow > 0
    ? '<span class="memola-presence-more" title="他 ' + overflow + ' 名">+' + overflow + '</span>'
    : '');
}

async function refresh(): Promise<void> {
  if (!_currentPageId) return;
  try {
    const users = await listPresence(_currentPageId);
    renderAvatars(users);
  } catch { /* ignore */ }
}

/** Begin tracking presence for the given page. Idempotent — calling with
 *  a different page id transparently switches over (leaves the old). */
export async function setPresencePage(pageId: string | null): Promise<void> {
  if (_currentPageId === pageId) return;

  if (_currentPageId) {
    // Best-effort leave the previous page's row even when presence is now
    // disabled — we want OUR row (from when it was enabled) to disappear
    // for other viewers, not linger until STALE_MS expires.
    void leavePresence();
  }
  _currentPageId = pageId;
  if (_timer) { clearInterval(_timer); _timer = null; }
  if (!pageId) {
    renderAvatars([]);
    return;
  }
  // Pref off → don't write to SP, don't read avatars. Hide the strip.
  if (!isPresenceEnabled()) {
    renderAvatars([]);
    return;
  }
  try {
    await startPresence(pageId);
    await refresh();
    _timer = setInterval(() => {
      void pingPresence();
      void refresh();
    }, PING_MS);
  } catch { /* ignore */ }
}

/** Wire one-time setup (unload handler). Called from boot. Idempotent
 *  — guarded by a body dataset flag so repeated bookmarklet presses
 *  don't pile up `visibilitychange` listeners (each carrying a stale
 *  closure over `_timer` / `_currentPageId`). */
export function attachPresence(): void {
  const body = document.body as HTMLElement & { dataset: DOMStringMap };
  if (body.dataset.memolaPresenceWired === '1') return;
  body.dataset.memolaPresenceWired = '1';
  attachUnloadCleanup();
  // Also leave on tab hide / reload
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && _currentPageId) {
      // Don't actively leave on hide — just stop pinging.
      // Other clients will see us go stale within STALE_MS.
      if (_timer) { clearInterval(_timer); _timer = null; }
    } else if (!document.hidden && _currentPageId && !_timer && isPresenceEnabled()) {
      // Resume pings on visible (pref still on)
      void pingPresence();
      void refresh();
      _timer = setInterval(() => {
        void pingPresence();
        void refresh();
      }, PING_MS);
    }
  });
}

/** Tear down presence state. Called when the bookmarklet is pressed
 *  again to "close" the app — without this, the OLD module's _timer
 *  keeps pinging SP from the now-detached instance. We also synchronously
 *  best-effort delete the presence row via sendBeacon so other users
 *  don't see a phantom "viewing" entry until STALE_MS expires. */
export function shutdownPresence(): void {
  if (_timer) { clearInterval(_timer); _timer = null; }
  _currentPageId = null;
  void leavePresence();
}

/** Update presence whenever the active page changes. Hook this from
 *  doSelect / doSelectDb / showView('empty'). */
export function syncPresenceForCurrent(): void {
  // Only track regular pages — DB views and row-pages are noisy and not
  // particularly interesting.
  if (S.currentType === 'page' && S.currentId && !S.currentRow) {
    void setPresencePage(S.currentId);
  } else {
    void setPresencePage(null);
  }
}
