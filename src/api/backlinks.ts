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
import { ORG_PAGES_LIST, getMyPagesList, parseBlocksJson } from './pages';
import { blocksToMd } from '../lib/blocks-md';

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
  /** Phase 2 canonical body — JSON-blocks. Saves no longer write the
   *  legacy `Body` column at all, so we don't fetch it. */
  Body_blocks?: string;
  PageType?: string;
  OriginPageId?: string;
}

let _cache: CachedRow[] | null = null;
let _cachePromise: Promise<CachedRow[]> | null = null;

export function invalidateBacklinkCache(): void {
  _cache = null;
  _cachePromise = null;
}

/** Walk one pages list paginated, accumulating all rows. */
async function loadBodiesFromList(listTitle: string): Promise<CachedRow[]> {
  const rows: CachedRow[] = [];
  let next: string | undefined = spListUrl(
    listTitle,
    '/items?$select=Id,Title,Body_blocks,PageType,OriginPageId&$top=500&$orderby=Id',
  );
  let safety = 0;
  while (next && safety++ < 50) {
    const d: { results: CachedRow[]; __next?: string } | null =
      await spGetD<{ results: CachedRow[]; __next?: string }>(next);
    if (!d) break;
    for (const r of d.results) rows.push(r);
    next = d.__next;
  }
  return rows;
}

async function loadAllBodies(): Promise<CachedRow[]> {
  if (_cache) return _cache;
  if (_cachePromise) return _cachePromise;
  _cachePromise = (async (): Promise<CachedRow[]> => {
    // Phase 3 union read: bodies live in either the org-shared list
    // OR my per-user list. Other users' lists are SP-side inaccessible
    // — backlinks scan can't see them, which is the correct behaviour
    // (private notes shouldn't leak via backlinks panel either).
    const myList = getMyPagesList();
    const reads = [loadBodiesFromList(ORG_PAGES_LIST)];
    if (myList !== ORG_PAGES_LIST) {
      reads.push(loadBodiesFromList(myList).catch(() => []));
    }
    const buckets = await Promise.all(reads);
    const rows = buckets.flat();
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
    // Phase 2: canonical content lives in Body_blocks (JSON). Convert
    // to markdown so the existing `[[<id>` regex matches — pagelinks
    // are stored as { kind:'pagelink', pageId } in the block-tree, but
    // round-trip out as `[[<id>]]` markdown.
    const blocksJson = row.Body_blocks || '';
    if (!blocksJson) continue;
    let body: string;
    try { body = blocksToMd(parseBlocksJson(blocksJson)); }
    catch { continue; }
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
 *  can see WHY this page links back. Strips wiki-link syntax, raw HTML
 *  tags, HTML comments (Memola uses them as embed markers like
 *  `<!--linkdb …-->`), and common Markdown structural markers so the
 *  preview reads like prose, not source. */
function extractSnippet(body: string, re: RegExp): string {
  re.lastIndex = 0;
  const m = re.exec(body);
  if (!m) return '';
  const idx = m.index;
  // Pull a wider raw window before stripping — markup eats characters,
  // and we want the final snippet to still have ~80 chars of real text.
  const start = Math.max(0, idx - 80);
  const end = Math.min(body.length, idx + 120);
  let snip = body.substring(start, end);

  // 1. Drop HTML comments first (often multi-line; would leak `<!--…`).
  snip = snip.replace(/<!--[\s\S]*?-->/g, '');
  // 2. Drop fenced/inline code DELIMITERS (keep the content).
  snip = snip.replace(/`{1,3}/g, '');
  // 3. Strip every HTML tag — `<br>`, `<div style="…">`, `</span>`, etc.
  snip = snip.replace(/<\/?[a-zA-Z][^>]*>/g, ' ');
  // 4. Wiki-links: keep the alias / page id only.
  snip = snip.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
             .replace(/\[\[([^\]]+)\]\]/g, '$1');
  // 5. Markdown links `[text](url)` → just `text`.
  snip = snip.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  // 6. Leading-of-line markers (heading hashes, list bullets, blockquote,
  //    table pipes, definition-list colons, hr lines). These are noise
  //    inside a one-line preview.
  snip = snip.replace(/^\s*#{1,6}\s+/gm, '')        // ## heading
             .replace(/^\s*[-*+]\s+/gm, '')          // - list
             .replace(/^\s*\d+\.\s+/gm, '')          // 1. list
             .replace(/^\s*>\s?/gm, '')              // > quote
             .replace(/^\s*[:|]\s?/gm, '')           // : def-list / | table
             .replace(/^\s*-{3,}\s*$/gm, '');        // ---
  // 7. Inline emphasis markers (** __ ~~). Keep content.
  snip = snip.replace(/\*{1,3}|_{1,3}|~{1,2}/g, '');
  // 8. Collapse whitespace, trim.
  snip = snip.replace(/\s+/g, ' ').trim();

  // 9. Limit final length so a marker-rich source can't blow past the
  //    one-line panel even after stripping.
  if (snip.length > 100) snip = snip.substring(0, 100).trimEnd() + '…';

  if (start > 0) snip = '… ' + snip;
  if (end < body.length && !snip.endsWith('…')) snip = snip + ' …';
  return snip;
}
