// Page/block comments — Notion-style discussion + private memos.
//
// Storage (option A, mirrors the pages privacy model):
//   - ORG comments  → shared list `memola-comments`.
//   - PRIVATE memos → per-user `memola-user-{id}-comments`, ACL-locked to
//     the owner so they're hidden at the SharePoint layer (not just in the
//     app). On page open we union-read the org list + the current user's
//     private list, exactly like apiGetPages does for pages.
//
// A comment is anchored to a top-level block (`BlockId`) or to the whole
// page (`BlockId=''`). Threads group by `ThreadId` (= the root comment's
// id; '' on a root). Resolve state lives on the root. Comment SCOPE is
// independent of the page's scope: making a page org-shared never promotes
// a private memo (that would leak it).
//
// No notifications in this version (deferred with @mentions).

import { S } from '../state';
import {
  ensureList,
  applyOwnerOnlyAcl,
  createListItem,
  updateListItem,
  deleteListItem,
  type FieldSpec,
} from './sp-list';
import { spListUrl, spGetD } from './sp-rest';
import { getCurrentUserId, getCurrentUser, getUserNameById } from './sync';

export const ORG_COMMENTS_LIST = 'memola-comments';

/** Per-user private-comments list, or null before the user id is known
 *  (no private comments can be read/written until then). */
export function getMyCommentsList(): string | null {
  const id = S.meta.myUserId;
  return id ? 'memola-user-' + id + '-comments' : null;
}

export type CommentScope = 'org' | 'user';

export interface CommentRow {
  Id: number;
  PageId: string;
  BlockId: string;          // '' = page-level
  ThreadId: string;         // '' = a root comment; else the root's id
  Body: string;
  Resolved: number;         // 0 / 1 (meaningful on roots)
  ResolvedBy?: number;
  ResolvedAt?: number;
  AnchorText?: string;      // snapshot of the anchored block's text
  Scope: CommentScope;
  AuthorId: number;
  AuthorName?: string;
  Edited?: number;          // 1 = edited after creation
  Deleted?: number;         // 1 = tombstone (kept because it has replies)
  Reactions?: string;       // JSON: { [emoji]: number[] of SP user ids }
  Created?: string;         // SP ISO timestamp
}

/** Parse a comment's Reactions JSON into a map of emoji → user ids. */
export function parseReactions(c: CommentRow): Record<string, number[]> {
  if (!c.Reactions) return {};
  try {
    const o = JSON.parse(c.Reactions) as Record<string, number[]>;
    return o && typeof o === 'object' ? o : {};
  } catch { return {}; }
}

export interface CommentThread {
  root: CommentRow;
  replies: CommentRow[];
  blockId: string;
  resolved: boolean;
}

const COMMENT_FIELDS: FieldSpec[] = [
  { name: 'PageId', kind: 2, indexed: true },   // high-selectivity filter → scales past LVT
  { name: 'BlockId', kind: 2 },
  { name: 'ThreadId', kind: 2 },
  { name: 'Body', kind: 3 },
  { name: 'Resolved', kind: 9 },
  { name: 'ResolvedBy', kind: 9 },
  { name: 'ResolvedAt', kind: 9 },
  { name: 'AnchorText', kind: 2 },
  { name: 'Scope', kind: 2 },
  { name: 'AuthorId', kind: 9 },
  { name: 'AuthorName', kind: 2 },
  { name: 'Edited', kind: 9 },
  { name: 'Deleted', kind: 9 },
  { name: 'Reactions', kind: 3 },
];

const SELECT = 'Id,PageId,BlockId,ThreadId,Body,Resolved,ResolvedBy,ResolvedAt,' +
  'AnchorText,Scope,AuthorId,AuthorName,Edited,Deleted,Reactions,Created';

// ── Provisioning ─────────────────────────────────────────

let _ensurePromise: Promise<void> | null = null;

async function provisionOne(listTitle: string, isUserList: boolean): Promise<void> {
  await ensureList({ title: listTitle, fields: COMMENT_FIELDS });
  if (isUserList) {
    const m = listTitle.match(/^memola-user-(\d+)-comments$/);
    if (m) await applyOwnerOnlyAcl(listTitle, parseInt(m[1], 10)).catch(() => undefined);
  }
}

/** Idempotently provision the org + current-user comment lists. */
export async function ensureCommentsLists(): Promise<void> {
  if (_ensurePromise) return _ensurePromise;
  _ensurePromise = (async () => {
    if (!S.meta.myUserId) S.meta.myUserId = await getCurrentUserId().catch(() => 0);
    await provisionOne(ORG_COMMENTS_LIST, false);
    const mine = getMyCommentsList();
    if (mine) await provisionOne(mine, true);
  })().catch((e) => { _ensurePromise = null; throw e; });
  return _ensurePromise;
}

// ── Pure helpers (unit-tested) ───────────────────────────

/** Group flat comment rows into threads (root + replies), sorted by
 *  creation time. Roots are rows with empty ThreadId; replies attach to
 *  the root whose id equals their ThreadId. Replies whose root is missing
 *  are dropped (defensive). */
export function groupThreads(rows: CommentRow[]): CommentThread[] {
  const byCreated = (a: CommentRow, b: CommentRow): number =>
    (a.Created || '').localeCompare(b.Created || '') || (a.Id - b.Id);
  const roots = rows.filter((r) => !r.ThreadId).sort(byCreated);
  const repliesByRoot = new Map<string, CommentRow[]>();
  for (const r of rows) {
    if (!r.ThreadId) continue;
    const arr = repliesByRoot.get(r.ThreadId) || [];
    arr.push(r);
    repliesByRoot.set(r.ThreadId, arr);
  }
  return roots.map((root) => ({
    root,
    replies: (repliesByRoot.get(String(root.Id)) || []).sort(byCreated),
    blockId: root.BlockId || '',
    resolved: (root.Resolved || 0) > 0,
  }));
}

/** Count of OPEN (unresolved) threads per anchor block id. Page-level
 *  threads land under the '' key. Used to place the 💬 gutter markers. */
export function openThreadCountByBlock(threads: CommentThread[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const t of threads) {
    if (t.resolved) continue;
    m.set(t.blockId, (m.get(t.blockId) || 0) + 1);
  }
  return m;
}

/** Comments whose PageId is not in `liveIds` — orphans to garbage-collect
 *  from the current user's private list after pages were hard-deleted. */
export function selectOrphans(rows: CommentRow[], liveIds: Set<string>): CommentRow[] {
  return rows.filter((r) => !liveIds.has(r.PageId));
}

// ── Fetch ────────────────────────────────────────────────

function mapRow(r: Record<string, unknown>): CommentRow {
  return {
    Id: Number(r.Id),
    PageId: String(r.PageId || ''),
    BlockId: String(r.BlockId || ''),
    ThreadId: String(r.ThreadId || ''),
    Body: String(r.Body || ''),
    Resolved: Number(r.Resolved || 0),
    ResolvedBy: r.ResolvedBy ? Number(r.ResolvedBy) : undefined,
    ResolvedAt: r.ResolvedAt ? Number(r.ResolvedAt) : undefined,
    AnchorText: r.AnchorText ? String(r.AnchorText) : undefined,
    Scope: (r.Scope === 'org' ? 'org' : 'user'),
    AuthorId: Number(r.AuthorId || 0),
    AuthorName: r.AuthorName ? String(r.AuthorName) : undefined,
    Edited: r.Edited ? Number(r.Edited) : 0,
    Deleted: r.Deleted ? Number(r.Deleted) : 0,
    Reactions: r.Reactions ? String(r.Reactions) : undefined,
    Created: r.Created ? String(r.Created) : undefined,
  };
}

async function fetchFromList(listTitle: string, pageId: string): Promise<CommentRow[]> {
  const filter = "PageId eq '" + pageId.replace(/'/g, "''") + "'";
  const url = spListUrl(listTitle,
    '/items?$select=' + encodeURIComponent(SELECT) +
    '&$filter=' + encodeURIComponent(filter) +
    '&$orderby=Created&$top=500');
  const d = await spGetD<{ results: Array<Record<string, unknown>> }>(url).catch(() => null);
  return (d?.results || []).map(mapRow);
}

const _cache = new Map<string, CommentRow[]>();

export function invalidateComments(pageId?: string): void {
  if (pageId) _cache.delete(pageId); else _cache.clear();
}

/** Union read: org comments + the current user's private comments for a
 *  page. Cached per pageId; invalidated on any mutation. */
export async function apiListComments(pageId: string): Promise<CommentRow[]> {
  if (!pageId) return [];
  const cached = _cache.get(pageId);
  if (cached) return cached;
  await ensureCommentsLists();
  const lists: string[] = [ORG_COMMENTS_LIST];
  const mine = getMyCommentsList();
  if (mine) lists.push(mine);
  const batches = await Promise.all(lists.map((l) => fetchFromList(l, pageId)));
  const all = batches.flat();
  _cache.set(pageId, all);
  return all;
}

// ── Mutations ────────────────────────────────────────────

function listForScope(scope: CommentScope): string {
  if (scope === 'org') return ORG_COMMENTS_LIST;
  return getMyCommentsList() || ORG_COMMENTS_LIST;
}

async function currentAuthor(): Promise<{ id: number; name: string }> {
  const id = S.meta.myUserId || (await getCurrentUserId().catch(() => 0));
  const name = await getCurrentUser().catch(() => '');
  return { id, name };
}

/** Add a new root comment or a reply.
 *  - root: pass `threadRootId = ''`.
 *  - reply: pass the root comment's id; the reply inherits the root's scope. */
export async function apiAddComment(opts: {
  pageId: string;
  blockId: string;
  body: string;
  scope: CommentScope;
  threadRootId?: string;
  anchorText?: string;
}): Promise<CommentRow> {
  await ensureCommentsLists();
  const { id, name } = await currentAuthor();
  const data: Record<string, unknown> = {
    PageId: opts.pageId,
    BlockId: opts.blockId || '',
    ThreadId: opts.threadRootId || '',
    Body: opts.body,
    Scope: opts.scope,
    AuthorId: id,
    AuthorName: name,
    Resolved: 0,
    Edited: 0,
    Deleted: 0,
  };
  if (opts.anchorText) data.AnchorText = opts.anchorText.slice(0, 255);
  const created = await createListItem(listForScope(opts.scope), data);
  invalidateComments(opts.pageId);
  return mapRow(created as unknown as Record<string, unknown>);
}

/** Edit a comment's body (author only — enforced by the caller). */
export async function apiEditComment(c: CommentRow): Promise<void> {
  await updateListItem(listForScope(c.Scope), c.Id, { Body: c.Body, Edited: 1 });
  invalidateComments(c.PageId);
}

/** Hard-delete a comment row. (Deleting a thread root cascades to its
 *  replies in the caller — see comments-ui doDelete.) */
export async function apiDeleteComment(c: CommentRow): Promise<void> {
  await deleteListItem(listForScope(c.Scope), c.Id);
  invalidateComments(c.PageId);
}

/** Resolve / re-open a thread (state lives on the root). Anyone with
 *  access may resolve. */
export async function apiResolveThread(root: CommentRow, resolved: boolean): Promise<void> {
  const { id } = await currentAuthor();
  await updateListItem(listForScope(root.Scope), root.Id, {
    Resolved: resolved ? 1 : 0,
    ResolvedBy: resolved ? id : 0,
    ResolvedAt: resolved ? Date.now() : 0,
  });
  invalidateComments(root.PageId);
}

/** Toggle the current user's `emoji` reaction on a comment. Stored as a
 *  JSON map on the row (emoji → user ids). Concurrent reactions are
 *  last-write-wins on the JSON field (accepted; rare). */
export async function apiToggleReaction(c: CommentRow, emoji: string): Promise<void> {
  const { id } = await currentAuthor();
  if (!id) return;
  const map = parseReactions(c);
  const users = map[emoji] || [];
  const idx = users.indexOf(id);
  if (idx >= 0) users.splice(idx, 1); else users.push(id);
  if (users.length) map[emoji] = users; else delete map[emoji];
  await updateListItem(listForScope(c.Scope), c.Id, { Reactions: JSON.stringify(map) });
  invalidateComments(c.PageId);
}

// ── Lifecycle hooks (delete / scope-change / GC) ─────────

/** Hard-delete every reachable comment for a purged page (org list + the
 *  current user's private list). Other users' private comments can't be
 *  reached here; `gcMyOrphanComments` cleans those up lazily per-user. */
export async function purgeCommentsForPage(pageId: string): Promise<void> {
  await ensureCommentsLists().catch(() => undefined);
  const lists = [ORG_COMMENTS_LIST, getMyCommentsList()].filter(Boolean) as string[];
  for (const list of lists) {
    const rows = await fetchFromList(list, pageId).catch(() => [] as CommentRow[]);
    for (const r of rows) await deleteListItem(list, r.Id).catch(() => undefined);
  }
  invalidateComments(pageId);
}

/** Remap comment PageIds after a scope change reminted page ids
 *  (apiSetScope's idMap). Only the reachable lists are updated; other
 *  users' private comments orphan and are GC'd lazily. */
export async function remapCommentsPageId(idMap: Map<string, string>): Promise<void> {
  if (idMap.size === 0) return;
  await ensureCommentsLists().catch(() => undefined);
  const lists = [ORG_COMMENTS_LIST, getMyCommentsList()].filter(Boolean) as string[];
  for (const list of lists) {
    for (const [oldId, newId] of idMap) {
      if (oldId === newId) continue;
      const rows = await fetchFromList(list, oldId).catch(() => [] as CommentRow[]);
      for (const r of rows) {
        await updateListItem(list, r.Id, { PageId: newId }).catch(() => undefined);
      }
      invalidateComments(oldId);
      invalidateComments(newId);
    }
  }
}

/** Best-effort GC of the current user's private comments whose page no
 *  longer exists (e.g. another user hard-deleted a shared page). Mirrors
 *  the self-healing `gcDbColors` pattern. */
export async function gcMyOrphanComments(livePageIds: Set<string>): Promise<void> {
  const mine = getMyCommentsList();
  if (!mine) return;
  const url = spListUrl(mine, '/items?$select=Id,PageId&$top=500&$orderby=Id');
  const d = await spGetD<{ results: Array<{ Id: number; PageId: string }> }>(url).catch(() => null);
  if (!d?.results) return;
  // Skip `row:` keys — DB-row detail pages aren't in the page id set, so we
  // can't tell liveness here without extra lookups; leave them for now.
  const orphans = d.results.filter(
    (r) => r.PageId && !r.PageId.startsWith('row:') && !livePageIds.has(r.PageId),
  );
  for (const o of orphans) await deleteListItem(mine, o.Id).catch(() => undefined);
}

/** Resolve display names for comment authors that didn't denormalize a
 *  name at creation time (best-effort, session-cached via getUserNameById). */
export async function hydrateAuthorNames(rows: CommentRow[]): Promise<void> {
  await Promise.all(rows.map(async (r) => {
    if (!r.AuthorName && r.AuthorId) r.AuthorName = await getUserNameById(r.AuthorId).catch(() => '');
  }));
}
