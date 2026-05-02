// Helpers for the "外部更新を検知してバナー" path.
//
// `getListItemEditor` returns the display name of whoever last modified an
// n365-pages row. `getCurrentUser` returns the signed-in user's display name
// (cached for the session). Together they let the watcher distinguish a real
// foreign edit from an echo of the current user's own write — needed because
// many side-channel writers (icon change, pin, Web 公開, AI tools, …) update
// the row without refreshing `S.sync.loadedModified`.

import { PAGES_LIST } from './pages';
import { SITE } from '../config';
import { spListUrl, spGetD } from './sp-rest';

export async function getListItemEditor(pageId: string): Promise<string> {
  const itemId = parseInt(pageId, 10);
  if (!itemId) return '';
  const d = await spGetD<{ Editor?: { Title?: string } }>(
    spListUrl(PAGES_LIST, '/items(' + itemId + ')?$select=Editor/Title&$expand=Editor'),
  );
  return d?.Editor?.Title || '';
}

let _currentUserPromise: Promise<string> | null = null;

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
