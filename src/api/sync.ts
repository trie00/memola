// Helpers for the "外部更新を検知してバナー" path.
//
// `getListItemEditor` returns the display name of whoever last modified an
// memola-pages row. `getCurrentUser` returns the signed-in user's display name
// (cached for the session). Together they let the watcher distinguish a real
// foreign edit from an echo of the current user's own write — needed because
// many side-channel writers (icon change, pin, Web 公開, AI tools, …) update
// the row without refreshing `S.sync.loadedModified`.

import { listForPageId, pageIdToItemId } from './pages';
import { SITE } from '../config';
import { spListUrl, spGetD } from './sp-rest';

export async function getListItemEditor(pageId: string): Promise<string> {
  const itemId = pageIdToItemId(pageId);
  if (!itemId) return '';
  // Resolve the list per-pageId so Phase 3 (per-user lists) routes correctly.
  const d = await spGetD<{ Editor?: { Title?: string } }>(
    spListUrl(listForPageId(pageId), '/items(' + itemId + ')?$select=Editor/Title&$expand=Editor'),
  );
  return d?.Editor?.Title || '';
}

let _currentUserPromise: Promise<string> | null = null;
let _currentUserIdPromise: Promise<number> | null = null;

/** Display name (Title) of the signed-in SharePoint user. Cached for the
 *  session — fetched lazily on first call. Returns '' on failure. */
export function getCurrentUser(): Promise<string> {
  if (_currentUserPromise) return _currentUserPromise;
  _currentUserPromise = (async () => {
    const d = await spGetD<{ Title?: string }>(SITE + '/_api/web/currentuser?$select=Title');
    return d?.Title || '';
  })().catch(() => '');
  return _currentUserPromise;
}

/** Numeric SP user Id of the signed-in user. Used to filter rows by
 *  AuthorId (e.g. hide other users' drafts from this user's UI).
 *  Returns 0 on failure. */
export function getCurrentUserId(): Promise<number> {
  if (_currentUserIdPromise) return _currentUserIdPromise;
  _currentUserIdPromise = (async () => {
    const d = await spGetD<{ Id?: number }>(SITE + '/_api/web/currentuser?$select=Id');
    return d?.Id || 0;
  })().catch(() => 0);
  return _currentUserIdPromise;
}

/** Cache user-id → display-name lookups so the trash modal can show
 *  「○○ さんが削除」 without a round-trip per row. */
const _userNameCache = new Map<number, string>();
const _userNameInflight = new Map<number, Promise<string>>();

/** Look up an SP user's display Title by their numeric Id. Returns ''
 *  on failure (= user removed, no permission, network blip).
 *  Session-cached + de-duplicated across concurrent callers. */
export function getUserNameById(userId: number): Promise<string> {
  if (!userId) return Promise.resolve('');
  const cached = _userNameCache.get(userId);
  if (cached !== undefined) return Promise.resolve(cached);
  const inflight = _userNameInflight.get(userId);
  if (inflight) return inflight;
  const p = (async (): Promise<string> => {
    const d = await spGetD<{ Title?: string }>(
      SITE + '/_api/web/getuserbyid(' + userId + ')?$select=Title',
    ).catch(() => null);
    const name = d?.Title || '';
    _userNameCache.set(userId, name);
    _userNameInflight.delete(userId);
    return name;
  })();
  _userNameInflight.set(userId, p);
  return p;
}
