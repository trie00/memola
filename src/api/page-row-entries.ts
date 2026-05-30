// "Row entries" — internal memola-pages rows backing each DB row's
// markdown body / title mirror. Stored with `PageType='row'`,
// `ListTitle=<db list>`, `DbRowId=<row item id>`. The canonical title
// lives on the DB row itself; the row entry mirrors it for display in
// SP UI.
//
// Row entries deliberately stay in `ORG_PAGES_LIST` regardless of the
// parent DB's scope — they're internal metadata, not user-facing
// pages, so the per-user list split (Phase 3) doesn't apply. Privacy
// for user-scope DB rows is enforced by the trash modal / view filter
// reading `Scope` and `AuthorId`, not by storage location.
//
// Race handling: SP has no unique constraint on (ListTitle, DbRowId),
// so a concurrent caller could create a parallel `PageType='row'`
// entry between our find and create. We mitigate by:
//   1. Re-fetching after create and deduplicating to the lowest-Id entry.
//   2. Keeping `findRowEntries` deterministic (orderby Id asc) so
//      subsequent getters consistently pick the same canonical row.

import { S } from '../state';
import {
  createListItem,
  updateListItem,
  deleteListItem,
} from './sp-list';
import { spListUrl, spGetD } from './sp-rest';
import { ORG_PAGES_LIST, ensurePagesList, type PageScope } from './pages';
import { mdToBlocks, blocksToMd } from '../lib/blocks-md';
import { metaById } from '../lib/page-store';

/** Find every row-entry matching (PageType='row', listTitle, dbRowId).
 *  Returns multiple in case a prior race created duplicates; callers
 *  pick a canonical winner and clean up the rest. Sorted by Id asc. */
async function findRowEntries(
  listTitle: string,
  dbRowId: number,
): Promise<Array<{ id: number; etag: string }>> {
  const filter = "PageType eq 'row' and ListTitle eq '" + listTitle.replace(/'/g, "''") +
    "' and DbRowId eq " + dbRowId;
  const url = spListUrl(ORG_PAGES_LIST,
    '/items?$select=Id&$filter=' + encodeURIComponent(filter) + '&$orderby=Id&$top=20');
  const d = await spGetD<{ results: Array<{ Id: number; __metadata?: { etag?: string } }> }>(url);
  if (!d) return [];
  return d.results.map((r) => ({ id: r.Id, etag: r.__metadata?.etag || '' }));
}

async function findRowEntry(listTitle: string, dbRowId: number): Promise<{ id: number; etag: string } | null> {
  const all = await findRowEntries(listTitle, dbRowId);
  return all[0] || null;
}

/** Read the body for a DB row from its row entry as a markdown
 *  string (derived from the stored block-tree JSON). Markdown is the
 *  format row-page editor / AI tools / export consumers expect. */
export async function getRowBody(listTitle: string, dbRowId: number): Promise<string> {
  await ensurePagesList();
  const hit = await findRowEntry(listTitle, dbRowId);
  if (!hit) return '';
  const url = spListUrl(ORG_PAGES_LIST, '/items(' + hit.id + ')?$select=Body_blocks');
  const d = await spGetD<{ Body_blocks?: string }>(url);
  return blocksJsonToMd(d?.Body_blocks);
}

/** Read the body as block-tree JSON (Phase 2 canonical form).
 *  Used by the row-page editor's save/load wiring so the round-trip
 *  doesn't lose structure to markdown's lossy edges. */
export async function getRowBodyBlocks(listTitle: string, dbRowId: number): Promise<string> {
  await ensurePagesList();
  const hit = await findRowEntry(listTitle, dbRowId);
  if (!hit) return '';
  const url = spListUrl(ORG_PAGES_LIST, '/items(' + hit.id + ')?$select=Body_blocks');
  const d = await spGetD<{ Body_blocks?: string }>(url);
  return d?.Body_blocks || '';
}

/** Upsert (title, body) for a DB row's page entry. `body` may be
 *  either markdown (legacy callers) or a Block[] JSON string (Phase 2
 *  canonical). We sniff: a string starting with `[` is treated as
 *  JSON, else converted via mdToBlocks at the boundary. The stored
 *  value is always block-tree JSON. */
export async function setRowBody(
  listTitle: string,
  dbRowId: number,
  parentDbId: string,
  title: string,
  body: string,
): Promise<void> {
  await ensurePagesList();
  const blocksJson = normalizeRowBody(body);
  const hits = await findRowEntries(listTitle, dbRowId);
  if (hits.length >= 1) {
    // Update canonical (lowest Id) entry. Direct write — bypasses the
    // `updatePageRow` funnel since row entries aren't real pages.
    await updateListItem(ORG_PAGES_LIST, hits[0].id, { Title: title, Body_blocks: blocksJson });
    // Best-effort cleanup of any duplicates accumulated by past races.
    for (let i = 1; i < hits.length; i++) {
      await deleteListItem(ORG_PAGES_LIST, hits[i].id).catch(() => undefined);
    }
    return;
  }
  // DB row body inherits the parent DB's scope so a row in an org DB
  // is org-scoped, and a row in a personal DB is personal-scoped.
  // Storage stays in ORG_PAGES_LIST regardless — Scope is metadata
  // for the trash modal's filter, not a routing key.
  const parentMeta = parentDbId ? metaById(parentDbId) : null;
  const inheritScope: PageScope = parentMeta?.scope || 'user';
  await createListItem(ORG_PAGES_LIST, {
    Title: title,
    ParentId: parentDbId || '',
    PageType: 'row',
    ListTitle: listTitle,
    DbRowId: dbRowId,
    Body_blocks: blocksJson,
    Scope: inheritScope,
  });
  // Post-create reconciliation: if a concurrent caller raced us, multiple
  // entries now exist. Keep the lowest Id (deterministic across tabs) and
  // delete the rest.
  const after = await findRowEntries(listTitle, dbRowId);
  if (after.length > 1) {
    // Make sure the surviving canonical entry has our latest body —
    // the older entry might be stale.
    await updateListItem(ORG_PAGES_LIST, after[0].id, { Title: title, Body_blocks: blocksJson }).catch(() => undefined);
    for (let i = 1; i < after.length; i++) {
      await deleteListItem(ORG_PAGES_LIST, after[i].id).catch(() => undefined);
    }
  }
}

/** Sniff: looks like a JSON-blocks payload (starts with `[`)?
 *  Anything else is assumed markdown and converted. Empty / whitespace
 *  → '[]' (empty block tree). */
function normalizeRowBody(body: string): string {
  const trimmed = (body || '').trim();
  if (!trimmed) return '[]';
  if (trimmed.startsWith('[')) {
    // Best-effort validation — if parse fails, fall back to md path
    // so the data isn't lost.
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return trimmed;
    } catch { /* fall through */ }
  }
  // Markdown path — convert to blocks
  return JSON.stringify(mdToBlocks(body));
}

/** Convert stored block-tree JSON to markdown for legacy callers
 *  (row-page editor's md-based save flow, AI tools, export). */
function blocksJsonToMd(json: string | undefined | null): string {
  if (!json) return '';
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return '';
    return blocksToMd(parsed);
  } catch { return ''; }
}

/** Delete the row entry for a DB row, if present. Removes ALL matching
 *  entries in case duplicates accumulated. */
export async function deleteRowEntry(listTitle: string, dbRowId: number): Promise<void> {
  const hits = await findRowEntries(listTitle, dbRowId);
  for (const h of hits) {
    await deleteListItem(ORG_PAGES_LIST, h.id).catch(() => undefined);
  }
}

/** Delete every row entry that points at a given DB list (used when
 *  the DB itself is removed). */
export async function deleteAllRowEntriesForList(listTitle: string): Promise<void> {
  await ensurePagesList();
  const filter = "PageType eq 'row' and ListTitle eq '" + listTitle.replace(/'/g, "''") + "'";
  const url = spListUrl(ORG_PAGES_LIST, '/items?$select=Id&$filter=' + encodeURIComponent(filter) + '&$top=500');
  const d = await spGetD<{ results: Array<{ Id: number }> }>(url);
  if (!d) return;
  for (const it of d.results) {
    await deleteListItem(ORG_PAGES_LIST, it.Id).catch(() => undefined);
  }
}
