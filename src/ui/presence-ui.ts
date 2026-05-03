// Presence UI — renders avatars of users currently viewing this page in
// the top bar. Pings every PING_MS and refreshes the avatar list.

import { S } from '../state';
import {
  startPresence, pingPresence, leavePresence, listPresence,
  attachUnloadCleanup, PING_MS, type PresenceUser,
} from '../api/presence';

let _timer: ReturnType<typeof setInterval> | null = null;
let _currentPageId: string | null = null;

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

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
  const el = document.getElementById('n365-presence');
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
    return '<span class="n365-presence-av" style="background:' + colorFor(u.userName) + '"' +
      ' title="' + escapeHtml(u.userName) + ' が閲覧中">' +
      escapeHtml(initials(u.userName)) + '</span>';
  }).join('') +
  (overflow > 0
    ? '<span class="n365-presence-more" title="他 ' + overflow + ' 名">+' + overflow + '</span>'
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
    // Best-effort leave the previous page's row
    void leavePresence();
  }
  _currentPageId = pageId;
  if (_timer) { clearInterval(_timer); _timer = null; }
  if (!pageId) {
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

/** Wire one-time setup (unload handler). Called from boot. */
export function attachPresence(): void {
  attachUnloadCleanup();
  // Also leave on tab hide / reload
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && _currentPageId) {
      // Don't actively leave on hide — just stop pinging.
      // Other clients will see us go stale within STALE_MS.
      if (_timer) { clearInterval(_timer); _timer = null; }
    } else if (!document.hidden && _currentPageId && !_timer) {
      // Resume pings on visible
      void pingPresence();
      void refresh();
      _timer = setInterval(() => {
        void pingPresence();
        void refresh();
      }, PING_MS);
    }
  });
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
