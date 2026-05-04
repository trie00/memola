// Debug-grade reset utilities.
//
// THREE distinct reset modes — each is permanent (= unrecoverable, also
// purges from SP's site-collection recycle bin) so callers MUST confirm
// with the user before invoking. Designed for development resets and
// "I want a clean slate" scenarios; no undo path.
//
//   - resetMyPrivateData   → only my personal (scope='user', author=me)
//                            pages/DBs. Org and other users' data
//                            untouched. localStorage preserved.
//   - resetOthersData      → org-shared + OTHER users' personal data.
//                            My private stuff preserved. localStorage
//                            preserved.
//   - resetAll             → everything (every memola-* SP list +
//                            every memola.* localStorage key).
//                            Factory reset.

import { S } from '../state';
import { getCurrentUserId } from './sync';
import { getListItems, deleteList } from './sp-list';
import { spGetD } from './sp-rest';
import { SITE } from '../config';
import { getDigest } from './digest';
import { PAGES_LIST, apiGetPages, apiPurgePage } from './pages';

export interface ResetSummary {
  pagesDeleted: number;
  dbsDeleted: number;
  spListsDeleted: number;
  recycleBinPurged: number;
  errors: string[];
}

interface PageRow {
  Id: number;
  Title?: string;
  PageType?: string;
  Scope?: string;
  AuthorId?: number;
  ListTitle?: string;
}

interface RecycleBinEntry {
  Id: string;            // GUID
  Title?: string;
}

/** Enumerate every SP list in this site whose Title starts with `memola-`. */
async function listAllMemolaLists(): Promise<string[]> {
  const url = SITE +
    "/_api/web/lists?$select=Title&$filter=" +
    encodeURIComponent("startswith(Title,'memola-')") +
    '&$top=500';
  const d = await spGetD<{ results: Array<{ Title: string }> }>(url).catch(() => null);
  return d?.results?.map((l) => l.Title) || [];
}

/** Permanently purge SP recycle bin entries matching our naming
 *  convention. Walks both first-stage (`/web/recycleBin`) and
 *  second-stage (`/site/recycleBin`) so nothing lingers for the 30-day
 *  retention window.
 *
 *  Filter strategy for catching every relevant entry:
 *    - LISTS themselves (e.g. `memola-db-1234` deleted)  → matched by Title prefix
 *    - LIST ITEMS (page rows we hard-deleted from `memola-pages`)
 *      → matched by DirName containing the parent list name (= 'memola-')
 *
 *  `onlyMyDeletions=true`: also restrict to entries where `DeletedById
 *  eq <myId>` (= safer for partial resets — we won't touch trash
 *  entries other users created). Effectively "what I just deleted".
 *  `onlyMyDeletions=false`: nuke all matches regardless of deleter
 *  (= for the full factory reset where we own everything anyway). */
async function purgeMemolaRecycleBin(
  myId: number,
  onlyMyDeletions: boolean,
): Promise<{ count: number; errors: string[] }> {
  const errors: string[] = [];
  let count = 0;
  // Match either the entry's Title (= deleted list) OR its DirName (=
  // deleted list-item whose parent path contains 'memola-').
  // SP REST uses OData v3 — `substringof(needle, haystack)` is the
  // case-sensitive contains operator.
  const nameFilter =
    "(startswith(Title,'memola-') or substringof('memola-',DirName))";
  const filterClauses = [nameFilter];
  if (onlyMyDeletions && myId) {
    filterClauses.push('DeletedById eq ' + myId);
  }
  const filter = filterClauses.join(' and ');
  let digest = await getDigest().catch(() => '');
  if (!digest) {
    errors.push('digest 取得失敗 (recycle bin スキップ)');
    return { count, errors };
  }
  // First-stage bin lives under /web, second-stage under /site
  for (const stage of ['web', 'site'] as const) {
    const url = SITE + '/_api/' + stage + '/recycleBin?$select=Id,Title,DirName&$filter=' +
      encodeURIComponent(filter) + '&$top=5000';
    const d = await spGetD<{ results: RecycleBinEntry[] }>(url).catch((e) => {
      errors.push(`${stage} bin 取得失敗: ${(e as Error).message || e}`);
      return null;
    });
    if (!d?.results) continue;
    let processed = 0;
    for (const item of d.results) {
      // Refresh the digest every 50 items — it expires after ~30 min
      // and we might be mid-loop on a long bin clean.
      if (processed > 0 && processed % 50 === 0) {
        digest = await getDigest().catch(() => digest);
      }
      processed++;
      try {
        const r = await fetch(
          SITE + '/_api/' + stage + "/RecycleBin('" + item.Id + "')/DeleteObject()",
          {
            method: 'POST',
            headers: { 'X-RequestDigest': digest, Accept: 'application/json;odata=verbose' },
            credentials: 'include',
          },
        );
        // 404 = already gone (race with another tab / earlier op); treat as success.
        if (r.ok || r.status === 404) {
          count++;
          continue;
        }
        // 403 = digest expired or perms; refresh digest and retry once.
        if (r.status === 401 || r.status === 403) {
          digest = await getDigest().catch(() => digest);
          const r2 = await fetch(
            SITE + '/_api/' + stage + "/RecycleBin('" + item.Id + "')/DeleteObject()",
            {
              method: 'POST',
              headers: { 'X-RequestDigest': digest, Accept: 'application/json;odata=verbose' },
              credentials: 'include',
            },
          );
          if (r2.ok || r2.status === 404) { count++; continue; }
          errors.push((item.Title || item.Id) + ': ' + r2.status + ' (権限不足? 再試行も失敗)');
          continue;
        }
        errors.push((item.Title || item.Id) + ': HTTP ' + r.status);
      } catch (e) {
        errors.push((item.Title || item.Id) + ': ' + (e as Error).message);
      }
    }
  }
  return { count, errors };
}

/** Hard-delete daily-note rows (= entries in `memola-daily`) whose
 *  author matches the requested side. The daily DB *registration* row
 *  in memola-pages is NEVER deleted by this function — it's protected
 *  infrastructure, removing it makes 「今日のノート」 stop working
 *  until ensureDailyDb re-bootstraps. Reset 1 / 2 use this to wipe
 *  individual daily entries while keeping the DB intact.
 *
 *  Returns the number of rows successfully removed (errors collected
 *  in the supplied array). */
async function purgeDailyRowsByAuthor(
  myId: number,
  mode: 'mine' | 'others',
  errors: string[],
): Promise<number> {
  const { deleteListItem } = await import('./sp-list');
  const { deleteRowEntry } = await import('./pages');
  let removed = 0;
  let rows: Array<{ Id: number; AuthorId?: number }> = [];
  try {
    rows = (await getListItems('memola-daily')) as unknown as Array<{ Id: number; AuthorId?: number }>;
  } catch (e) {
    // memola-daily may not exist yet (first-time user on this site).
    // That's fine — there are no daily rows to clean up.
    if ((e as Error).message?.includes('404')) return 0;
    errors.push('memola-daily 取得失敗: ' + (e as Error).message);
    return 0;
  }
  for (const row of rows) {
    const authorId = row.AuthorId || 0;
    const matches = mode === 'mine' ? authorId === myId : authorId !== myId;
    if (!matches) continue;
    try {
      await deleteListItem('memola-daily', row.Id);
      await deleteRowEntry('memola-daily', row.Id).catch(() => undefined);
      removed++;
    } catch (e) {
      errors.push('memola-daily row #' + row.Id + ': ' + (e as Error).message);
    }
  }
  return removed;
}

/** Pre-flight count helper. Returns the number of pages and DBs that a
 *  reset would target — used to give the user an informed confirm. The
 *  page count includes daily-note rows (which are individually
 *  deleted while their parent DB is kept). */
export async function countResetTargets(
  mode: 'mine' | 'others' | 'all',
): Promise<{ pages: number; dbs: number; dailyRows: number }> {
  const myId = S.meta.myUserId || (await getCurrentUserId().catch(() => 0));
  let items: PageRow[] = [];
  try {
    items = (await getListItems(PAGES_LIST)) as unknown as PageRow[];
  } catch {
    return { pages: 0, dbs: 0, dailyRows: 0 };
  }
  const matches = items.filter((it) => {
    if (it.PageType === 'row') return false;            // row bodies cascade
    // The daily DB itself is undeletable — exclude it from the page/db
    // tally regardless of mode (rows are tallied separately below).
    if (mode !== 'all'
      && it.PageType === 'database'
      && it.ListTitle === 'memola-daily') return false;
    if (mode === 'all') return true;
    if (mode === 'mine') {
      return it.Scope === 'user' && it.AuthorId === myId;
    }
    // mode === 'others'
    return it.Scope === 'org'
      || (it.Scope === 'user' && it.AuthorId !== myId)
      || (!it.Scope && it.AuthorId !== myId);
  });
  let pages = 0, dbs = 0;
  for (const m of matches) {
    if (m.PageType === 'database') dbs++;
    else pages++;
  }
  // For mine/others, also count daily rows for the chosen author side.
  let dailyRows = 0;
  if (mode === 'mine' || mode === 'others') {
    try {
      const rows = (await getListItems('memola-daily')) as unknown as Array<{ AuthorId?: number }>;
      for (const r of rows) {
        const authorId = r.AuthorId || 0;
        const m = mode === 'mine' ? authorId === myId : authorId !== myId;
        if (m) dailyRows++;
      }
    } catch { /* daily list may not exist yet */ }
  }
  return { pages, dbs, dailyRows };
}

/** Reset 1: hard-delete only the current user's private (scope='user'
 *  + AuthorId=me) pages and DBs. Keeps org-shared, other users', and
 *  every localStorage pref intact. SP lists + recycle bin are wiped
 *  for the deleted items. */
export async function resetMyPrivateData(): Promise<ResetSummary> {
  const summary: ResetSummary = {
    pagesDeleted: 0, dbsDeleted: 0, spListsDeleted: 0,
    recycleBinPurged: 0, errors: [],
  };
  const myId = S.meta.myUserId || (await getCurrentUserId().catch(() => 0));
  if (!myId) {
    summary.errors.push('SP ユーザ ID を解決できません — 中止');
    return summary;
  }
  // Pull raw rows from SP — apiGetPages filters by visibility and we
  // need to see ALL our entries here, including any pre-Scope-column
  // legacy data.
  const items = (await getListItems(PAGES_LIST)) as unknown as PageRow[];
  const targets = items.filter((it) =>
    it.PageType !== 'row' &&
    it.Scope === 'user' &&
    it.AuthorId === myId &&
    // Daily DB itself is undeletable — its rows are pruned separately.
    !(it.PageType === 'database' && it.ListTitle === 'memola-daily'),
  );
  for (const target of targets) {
    try {
      await apiPurgePage(String(target.Id));
      if (target.PageType === 'database') summary.dbsDeleted++;
      else summary.pagesDeleted++;
    } catch (e) {
      summary.errors.push((e as Error).message);
    }
  }
  // Always purge MY daily rows (regardless of who owns the daily DB
  // registration). Each row's AuthorId is the user who created that
  // day's note.
  summary.pagesDeleted += await purgeDailyRowsByAuthor(myId, 'mine', summary.errors);
  // Purge ONLY trash entries we just created (= DeletedById === me).
  // Other users' deletions stay in their own trash for them to manage.
  const recycle = await purgeMemolaRecycleBin(myId, /* onlyMyDeletions */ true);
  summary.recycleBinPurged = recycle.count;
  summary.errors.push(...recycle.errors);
  // Refresh local state
  try { S.pages = await apiGetPages(); } catch { /* tolerate */ }
  return summary;
}

/** Reset 2: hard-delete org-shared + every OTHER user's data. My own
 *  private items are preserved. localStorage preserved. */
export async function resetOthersData(): Promise<ResetSummary> {
  const summary: ResetSummary = {
    pagesDeleted: 0, dbsDeleted: 0, spListsDeleted: 0,
    recycleBinPurged: 0, errors: [],
  };
  const myId = S.meta.myUserId || (await getCurrentUserId().catch(() => 0));
  const items = (await getListItems(PAGES_LIST)) as unknown as PageRow[];
  const targets = items.filter((it) =>
    it.PageType !== 'row' &&
    (
      it.Scope === 'org'
      || (it.Scope === 'user' && it.AuthorId !== myId)
      // Pre-Scope-column legacy data: treat as 'org' (= shared) per the
      // visibility-filter convention. If author is me, leave alone.
      || (!it.Scope && it.AuthorId !== myId)
    ) &&
    // Daily DB itself stays — rows are pruned separately.
    !(it.PageType === 'database' && it.ListTitle === 'memola-daily'),
  );
  for (const target of targets) {
    try {
      await apiPurgePage(String(target.Id));
      if (target.PageType === 'database') summary.dbsDeleted++;
      else summary.pagesDeleted++;
    } catch (e) {
      summary.errors.push((e as Error).message);
    }
  }
  // Purge OTHER users' daily rows (keep mine).
  summary.pagesDeleted += await purgeDailyRowsByAuthor(myId, 'others', summary.errors);
  // Purge OUR deletions only (the just-created trash).
  const recycle = await purgeMemolaRecycleBin(myId, /* onlyMyDeletions */ true);
  summary.recycleBinPurged = recycle.count;
  summary.errors.push(...recycle.errors);
  try { S.pages = await apiGetPages(); } catch { /* tolerate */ }
  return summary;
}

/** Reset 3: factory wipe. Every memola-* SP list and every memola.*
 *  localStorage key is removed. After this returns, the user is in a
 *  pristine first-time-install state. App should be reloaded. */
export async function resetAll(): Promise<ResetSummary> {
  const summary: ResetSummary = {
    pagesDeleted: 0, dbsDeleted: 0, spListsDeleted: 0,
    recycleBinPurged: 0, errors: [],
  };
  // 1. Walk every SP list with our naming convention and delete it.
  //    deleteList sends to first-stage bin; we'll empty that next.
  const lists = await listAllMemolaLists();
  for (const lt of lists) {
    try {
      await deleteList(lt);
      summary.spListsDeleted++;
    } catch (e) {
      summary.errors.push(lt + ': ' + (e as Error).message);
    }
  }
  // 2. Empty the recycle bin of all memola-* entries (any deleter).
  //    This is the "ゴミ箱からも戻せないように" guarantee.
  const recycle = await purgeMemolaRecycleBin(0, /* onlyMyDeletions */ false);
  summary.recycleBinPurged = recycle.count;
  summary.errors.push(...recycle.errors);
  // 3. Wipe every localStorage key in our namespace.
  try {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('memola.')) keys.push(k);
    }
    for (const k of keys) localStorage.removeItem(k);
  } catch (e) {
    summary.errors.push('localStorage: ' + (e as Error).message);
  }
  return summary;
}
