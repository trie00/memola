// Backlinks scanner.
//
// Scans every memola-pages row's block-tree (Body_blocks) for
// `pagelink` inlines pointing at a target page. Used by the editor's
// "リンク元" panel so the user can see which other pages link back to
// the page they're viewing.
//
// We walk the parsed Block[] directly rather than serialising to
// markdown and regex-matching `[[id]]`: it's exact (no false matches on
// e.g. literal `[[id]]` inside a code block), counts true link inlines,
// and the snippet is already clean prose via `inlineToPlainText` — no
// markdown/HTML stripping pipeline needed.
//
// The full-body scan is heavier than typical SP queries, so we cache
// results per session and invalidate on page-body writes (the call sites
// in api/pages.ts hook `invalidateBacklinkCache` after every save / move /
// delete).

import { spListUrl, spGetD } from './sp-rest';
import { ORG_PAGES_LIST, getMyPagesList, parseBlocksJson, pageIdForListItem } from './pages';
import { inlineToPlainText } from '../lib/blocks';
import type { Block, Inline } from '../lib/blocks';

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
  /** Which SP list this row was read from (org-shared vs per-user). Used
   *  to mint the canonical pageId via `pageIdForListItem` so the panel's
   *  click → doSelect navigates (bare numeric ids collide across lists). */
  _srcList?: string;
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
    for (const r of d.results) { r._srcList = listTitle; rows.push(r); }
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

/** Find every page whose block-tree contains a `pagelink` inline
 *  pointing at `targetId`. Returns one entry per source page —
 *  multiple links within the same body are coalesced into `count`.
 *  Drafts (PageType='draft' or OriginPageId set) are excluded so the
 *  user doesn't see scratch pages as backlinks.
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
  const out: BacklinkEntry[] = [];
  for (const row of rows) {
    // Canonical pageId (composite-aware) so the panel's click → doSelect
    // can find the page in S.pages. `_srcList` is set by loadBodiesFromList.
    const pageId = pageIdForListItem(row._srcList || ORG_PAGES_LIST, row.Id);
    if (pageId === targetId) continue;                     // skip self
    if (row.PageType === 'draft') continue;               // skip drafts
    if (row.OriginPageId) continue;                        // legacy drafts
    if (row.PageType === 'row') continue;                  // skip DB row bodies (still findable via parent DB)
    const blocksJson = row.Body_blocks || '';
    if (!blocksJson) continue;
    let blocks: Block[];
    try { blocks = parseBlocksJson(blocksJson); }
    catch { continue; }
    const { count, snippet } = scanBlocks(blocks, targetId);
    if (count === 0) continue;
    out.push({
      pageId,
      pageTitle: pageTitleResolver?.(pageId) || row.Title || '無題',
      snippet,
      count,
    });
  }
  // Sort by count desc then by title for stable display
  out.sort((a, b) => b.count - a.count || a.pageTitle.localeCompare(b.pageTitle, 'ja'));
  return out;
}

/** Walk a block-tree counting `pagelink` inlines that target `targetId`,
 *  and capture a one-line prose snippet from the first block that
 *  contains such a link. `inlineToPlainText` renders the surrounding
 *  text (and the link's own alias / id) as clean prose — no markdown /
 *  HTML stripping required. Exported for unit tests. */
export function scanBlocks(blocks: Block[], targetId: string): { count: number; snippet: string } {
  let count = 0;
  let snippet = '';

  const countInRun = (run: Inline[]): number => {
    let n = 0;
    for (const node of run) {
      if (node.kind === 'pagelink' && node.pageId === targetId) n++;
      else if (node.kind === 'bold' || node.kind === 'italic'
        || node.kind === 'strike' || node.kind === 'link') {
        n += countInRun(node.children);
      }
    }
    return n;
  };

  const visit = (bs: Block[]): void => {
    for (const b of bs) {
      // Inline-bearing blocks: paragraph / heading / todo (and any
      // future kind carrying an `inline` field).
      if ('inline' in b && Array.isArray(b.inline)) {
        const n = countInRun(b.inline);
        if (n > 0) {
          count += n;
          if (!snippet) snippet = oneLine(inlineToPlainText(b.inline));
        }
      }
      // Table cells: rows × cols × inline run.
      if (b.kind === 'table') {
        for (const r of b.rows) for (const cell of r) {
          const n = countInRun(cell);
          if (n > 0) {
            count += n;
            if (!snippet) snippet = oneLine(inlineToPlainText(cell));
          }
        }
      }
      // Container children (quote / callout) and list items.
      if (b.kind === 'quote' || b.kind === 'callout') visit(b.children);
      if (b.kind === 'list') for (const item of b.items) visit(item);
    }
  };
  visit(blocks);
  return { count, snippet };
}

/** Trim a plain-text run to a single one-line preview (~100 chars). */
function oneLine(text: string): string {
  const t = text.replace(/\s+/g, ' ').trim();
  return t.length > 100 ? t.substring(0, 100).trimEnd() + '…' : t;
}
