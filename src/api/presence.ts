// Lightweight presence: who's looking at this page right now?
//
// Implementation: a dedicated SP list `memola-presence` with one row per
// (page, user, sessionId). Each tab pings every PING_MS to refresh its
// row's `LastSeen`. Other tabs poll the list and surface aliases of
// active users (LastSeen within STALE_MS).
//
// Trade-offs: this is roughly 30-second-granular, not real-time; we don't
// track cursor positions or selections. The goal is "see who's looking
// so you can avoid stepping on each other", not full collaborative
// editing.

import { createList, addListField, getListItems, createListItem, updateListItem, deleteListItem } from './sp-list';
import { spListUrl, spGetD } from './sp-rest';
import { getCurrentUser } from './sync';

export const PRESENCE_LIST = 'memola-presence';
export const PING_MS = 30_000;
export const STALE_MS = 90_000;       // older than this → user has left

let _ensurePromise: Promise<void> | null = null;

interface PresenceRow {
  Id: number;
  Title?: string;        // session id
  PageId?: string;
  UserName?: string;
  LastSeen?: string;     // ISO
}

async function ensurePresenceList(): Promise<void> {
  if (_ensurePromise) return _ensurePromise;
  _ensurePromise = (async () => {
    const exists = (await spGetD<unknown>(spListUrl(PRESENCE_LIST))) != null;
    if (!exists) await createList(PRESENCE_LIST);
    // Idempotent column adds
    try { await addListField(PRESENCE_LIST, 'PageId', 2); } catch { /* ignore */ }
    try { await addListField(PRESENCE_LIST, 'UserName', 2); } catch { /* ignore */ }
    try { await addListField(PRESENCE_LIST, 'LastSeen', 4); } catch { /* ignore */ }
  })().catch((e) => { _ensurePromise = null; throw e; });
  return _ensurePromise;
}

/** Stable per-tab session id — a random string generated once per page load. */
const _sessionId = 'sess-' + Math.random().toString(36).slice(2, 12) + '-' + Date.now();
let _myRowId: number | null = null;          // SP item id for this session's row
let _currentPageId: string | null = null;
let _userName = '';

/** Reset cached state (used on workspace switch — presence list lives
 *  in the now-stale site). */
export function clearPresenceCache(): void {
  _ensurePromise = null;
  _myRowId = null;
  _currentPageId = null;
}

export async function startPresence(pageId: string): Promise<void> {
  await ensurePresenceList();
  if (!_userName) _userName = await getCurrentUser().catch(() => '');
  if (!_userName) return;          // can't ping anonymously

  _currentPageId = pageId;
  const now = new Date().toISOString();
  // If we already had a row for this session, update it; else create one
  if (_myRowId) {
    await updateListItem(PRESENCE_LIST, _myRowId, {
      PageId: pageId, UserName: _userName, LastSeen: now,
    }).catch(() => undefined);
  } else {
    try {
      const created = await createListItem(PRESENCE_LIST, {
        Title: _sessionId, PageId: pageId, UserName: _userName, LastSeen: now,
      });
      _myRowId = created.Id;
    } catch { /* swallow — presence is best-effort */ }
  }
}

export async function pingPresence(): Promise<void> {
  if (!_currentPageId || !_myRowId) return;
  try {
    await updateListItem(PRESENCE_LIST, _myRowId, {
      LastSeen: new Date().toISOString(),
    });
  } catch { /* ignore */ }
}

export async function leavePresence(): Promise<void> {
  if (!_myRowId) return;
  const id = _myRowId;
  _myRowId = null;
  _currentPageId = null;
  try { await deleteListItem(PRESENCE_LIST, id); } catch { /* ignore */ }
}

export interface PresenceUser {
  userName: string;
  sessionId: string;
  lastSeen: number;     // ms
  isSelf: boolean;
}

/** Read the presence list and return the active viewers of `pageId`
 *  (LastSeen within STALE_MS). Self-rows are still included so the user
 *  sees their own ping (visualizes "they're online"). */
export async function listPresence(pageId: string): Promise<PresenceUser[]> {
  await ensurePresenceList();
  const items = (await getListItems(PRESENCE_LIST)) as unknown as PresenceRow[];
  const cutoff = Date.now() - STALE_MS;
  const out: PresenceUser[] = [];
  for (const it of items) {
    if (it.PageId !== pageId) continue;
    const ts = it.LastSeen ? new Date(it.LastSeen).getTime() : 0;
    if (!ts || ts < cutoff) continue;
    out.push({
      userName: it.UserName || '',
      sessionId: it.Title || '',
      lastSeen: ts,
      isSelf: it.Title === _sessionId,
    });
  }
  return out;
}

/** Tear down on browser unload (tab close, browser quit, navigation away).
 *
 *  Two responsibilities:
 *    1. **Warn the user** if there are unsaved edits. Without this, tab
 *       close silently drops anything typed since the last autosave
 *       (default 2 s window).
 *    2. **Best-effort presence-row cleanup**. We use `keepalive: true`
 *       so the request continues after the page unloads; SP custom
 *       lists need `X-HTTP-Method: DELETE` to actually delete, which
 *       `sendBeacon` can't send (POST/GET only). If digest expired or
 *       the request fails, no big deal — STALE_MS (90 s) self-heals
 *       on the SP side.
 *
 *  Note: a process-kill (force-quit, browser crash) bypasses both — no
 *  JS runs at all. STALE_MS handles cleanup; the in-flight typing is
 *  lost. By design (per the simplification request: no local-snapshot
 *  crash backup). */
export function attachUnloadCleanup(): void {
  window.addEventListener('beforeunload', (e) => {
    // 1. Warn about unsaved changes. Browsers ignore the message text
    //    in modern Chrome/Firefox/Safari and show a generic dialog —
    //    setting returnValue is what matters.
    //    Lazy-import the state module to avoid a hard cycle.
    void import('../state').then(({ S }) => {
      if (S.dirty && S.currentType !== 'database') {
        e.preventDefault();
        // Older browsers used returnValue as the message; modern ones
        // ignore the string but require it to be set to ANY value.
        e.returnValue = '';
      }
    }).catch(() => undefined);

    // 2. Try to delete the presence row before the tab dies.
    //    `keepalive: true` lets the request continue after unload.
    if (_myRowId) {
      try {
        // sendBeacon as a fallback ping (won't actually DELETE, but at
        // least signals SP that we touched the row — most useful as a
        // best-effort "I'm leaving" hint). Real cleanup happens via the
        // keepalive fetch below.
        navigator.sendBeacon?.(spListUrl(PRESENCE_LIST, '/items(' + _myRowId + ')'));
      } catch { /* ignore */ }
      // Keepalive DELETE — best-effort. If digest is missing/expired
      // this 401/403s silently and STALE_MS does the cleanup.
      try {
        fetch(spListUrl(PRESENCE_LIST, '/items(' + _myRowId + ')'), {
          method: 'POST',
          headers: {
            'X-HTTP-Method': 'DELETE',
            'IF-MATCH': '*',
          },
          credentials: 'include',
          keepalive: true,
        }).catch(() => undefined);
      } catch { /* ignore */ }
    }
  });
}
