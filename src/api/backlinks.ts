// Backlinks scanner.
//
// Scans every memola-pages row's Body markdown for `[[<id>...]]` references
// to a given target page. Used by the editor's "リンク元" panel so the
// user can see which other pages link back to the page they're viewing.
//
// The full-body scan is heavier than typical SP queries, so we cache
// results per session and invalidate on page-body writes (the call sites
// in api/pages.ts hook `invalidateBacklinkCache` after every save / move /
// delete).

import { spListUrl, spGetD } from './sp-rest';
import { PAGES_LIST } from './pages';

export interface BacklinkEntry {
  pageId: string;
  pageTitle: string;
  /** Up to ~80 chars of context surrounding the first match — gives the
   *  user a "why does this page link here" hint without opening it. */
  snippet: string;
  /** Number of matches in this page (multiple `[[id]]` references count). */
  count: number;
}

// ── Body cache (one fetch per session, invalidated on writes) ──────────
//
// SP returns up to 5000 list rows per page. memola-pages is small (one row
// per user-visible page + per DB-row body), so a single fetch suffices.
// We $select only what we need to keep the payload small.

interface CachedRow {
  Id: number;
  Title: string;
  Body: string;
  PageType?: string;
  OriginPageId?: string;
}

let _cache: CachedRow[] | null = null;
let _cachePromise: Promise<CachedRow[]> | null = null;

export function invalidateBacklinkCache(): void {
  _cache = null;
  _cachePromise = null;
}

async function loadAllBodies(): Promise<CachedRow[]> {
  if (_cache) return _cache;
  if (_cachePromise) return _cachePromise;
  _cachePromise = (async (): Promise<CachedRow[]> => {
    const rows: CachedRow[] = [];
    let next: string | undefined = spListUrl(
      PAGES_LIST,
      '/items?$select=Id,Title,Body,PageType,OriginPageId&$top=500&$orderby=Id',
    );
    let safety = 0;
    while (next && safety++ < 50) {
      const d: { results: CachedRow[]; __next?: string } | null =
        await spGetD<{ results: CachedRow[]; __next?: string }>(next);
      if (!d) break;
      for (const r of d.results) rows.push(r);
      next = d.__next;
    }
    _cache = rows;
    _cachePromise = null;
    return rows;
  })().catch((e) => { _cachePromise = null; throw e; });
  return _cachePromise;
}

/** Find every page whose body markdown contains `[[<targetId>` (with
 *  optional `|alias` suffix). Returns one entry per source page —
 *  duplicates within the same body are coalesced into `count`. Drafts
 *  (PageType='draft' or OriginPageId set) are excluded from results so
 *  the user doesn't see scratch pages as backlinks.
 *
 *  `pageTitleResolver` is a hook that lets the caller supply the latest
 *  in-memory title (S.meta.pages cache) instead of the SP-cached one,
 *  which can be stale after a recent rename. */
export async function getBacklinksFor(
  targetId: string,
  pageTitleResolver?: (id: string) => string | null,
): Promise<BacklinkEntry[]> {
  if (!targetId) return [];
  const rows = await loadAllBodies();
  // Match `[[<id>` followed by `|`, `]`, or end. Anchor on the id to
  // avoid matching unrelated links that happen to share a prefix.
  const idEsc = targetId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('\\[\\[' + idEsc + '(?:\\||\\])', 'g');
  const out: BacklinkEntry[] = [];
  for (const row of rows) {
    if (String(row.Id) === targetId) continue;            // skip self
    if (row.PageType === 'draft') continue;               // skip drafts
    if (row.OriginPageId) continue;                        // legacy drafts
    if (row.PageType === 'row') continue;                  // skip DB row bodies (still findable via parent DB)
    const body = row.Body || '';
    if (!body) continue;
    const matches = body.match(re);
    if (!matches || matches.length === 0) continue;
    out.push({
      pageId: String(row.Id),
      pageTitle: pageTitleResolver?.(String(row.Id)) || row.Title || '無題',
      snippet: extractSnippet(body, re),
      count: matches.length,
    });
  }
  // Sort by count desc then by title for stable display
  out.sort((a, b) => b.count - a.count || a.pageTitle.localeCompare(b.pageTitle, 'ja'));
  return out;
}

/** Pull a short context window around the first occurrence so the user
 *  can see WHY this page links back. Stripped of the wiki-link syntax
 *  itself for readability. */
function extractSnippet(body: string, re: RegExp): string {
  re.lastIndex = 0;
  const m = re.exec(body);
  if (!m) return '';
  const idx = m.index;
  const start = Math.max(0, idx - 30);
  const end = Math.min(body.length, idx + 50);
  let snip = body.substring(start, end)
    .replace(/\s+/g, ' ')
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .trim();
  if (start > 0) snip = '… ' + snip;
  if (end < body.length) snip = snip + ' …';
  return snip;
}
