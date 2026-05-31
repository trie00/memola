// Mentions + inbox.
//
// - @mentions in comments target SharePoint site users that are real AD
//   accounts (PrincipalType=User with an email).
// - Mentioning someone creates an inbox row in the shared `memola-inbox`
//   list (RecipientId indexed). Each user reads their own rows. Read rows
//   auto-expire after a few days (Teams-activity style); unread persist.

import { S } from '../state';
import { SITE } from '../config';
import { spListUrl, spGetD } from './sp-rest';
import {
  ensureList, createListItem, updateListItem, deleteListItem,
  type FieldSpec,
} from './sp-list';
import { getCurrentUserId, getCurrentUser } from './sync';

export const INBOX_LIST = 'memola-inbox';
/** Read inbox rows older than this are GC'd on load. */
const READ_TTL_MS = 3 * 24 * 60 * 60 * 1000;

export interface SiteUser { id: number; title: string; email: string }

export interface InboxRow {
  Id: number;
  ActorId: number;
  ActorName: string;
  PageId: string;
  PageTitle: string;
  CommentId: number;
  BlockId: string;
  Snippet: string;
  Read: number;
  ReadAt?: number;
  Created?: string;
}

const INBOX_FIELDS: FieldSpec[] = [
  { name: 'RecipientId', kind: 9, indexed: true },
  { name: 'ActorId', kind: 9 },
  { name: 'ActorName', kind: 2 },
  { name: 'PageId', kind: 2 },
  { name: 'PageTitle', kind: 2 },
  { name: 'CommentId', kind: 9 },
  { name: 'BlockId', kind: 2 },
  { name: 'Snippet', kind: 3 },
  { name: 'Read', kind: 9 },
  { name: 'ReadAt', kind: 9 },
];

const INBOX_SELECT = 'Id,ActorId,ActorName,PageId,PageTitle,CommentId,BlockId,Snippet,Read,ReadAt,Created';

let _ensure: Promise<void> | null = null;
export function ensureInboxList(): Promise<void> {
  if (_ensure) return _ensure;
  _ensure = (async () => { await ensureList({ title: INBOX_LIST, fields: INBOX_FIELDS }); })()
    .catch((e) => { _ensure = null; throw e; });
  return _ensure;
}

// ── Site user search (@picker) ───────────────────────────

let _usersCache: SiteUser[] | null = null;
let _usersInflight: Promise<SiteUser[]> | null = null;

async function loadSiteUsers(): Promise<SiteUser[]> {
  if (_usersCache) return _usersCache;
  if (_usersInflight) return _usersInflight;
  _usersInflight = (async () => {
    // PrincipalType 1 = User. AD accounts have an Email; SharePoint system
    // accounts / groups don't — filter to those with a real email.
    const url = SITE + '/_api/web/siteusers?$select=Id,Title,Email,PrincipalType&$top=500';
    const d = await spGetD<{ results: Array<{ Id: number; Title: string; Email: string; PrincipalType: number }> }>(url)
      .catch(() => null);
    const users = (d?.results || [])
      .filter((u) => u.PrincipalType === 1 && u.Email)
      .map((u) => ({ id: u.Id, title: u.Title || u.Email, email: u.Email }));
    _usersCache = users;
    _usersInflight = null;
    return users;
  })();
  return _usersInflight;
}

/** Search site AD users by display name / email (case-insensitive prefix
 *  and substring). Returns up to 8, excluding the current user. */
export async function searchSiteUsers(query: string): Promise<SiteUser[]> {
  const users = await loadSiteUsers();
  const me = S.meta.myUserId || 0;
  const q = query.trim().toLowerCase();
  const matches = users.filter((u) => u.id !== me &&
    (!q || u.title.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)));
  // Prefix matches first.
  matches.sort((a, b) => {
    const ap = a.title.toLowerCase().startsWith(q) ? 0 : 1;
    const bp = b.title.toLowerCase().startsWith(q) ? 0 : 1;
    return ap - bp || a.title.localeCompare(b.title, 'ja');
  });
  return matches.slice(0, 8);
}

// ── Create mentions ──────────────────────────────────────

/** Create inbox notifications for each recipient (deduped, self excluded). */
export async function apiAddMentions(opts: {
  recipientIds: number[];
  pageId: string;
  pageTitle: string;
  commentId: number;
  blockId: string;
  snippet: string;
}): Promise<void> {
  const me = S.meta.myUserId || (await getCurrentUserId().catch(() => 0));
  const actorName = await getCurrentUser().catch(() => '');
  const recips = Array.from(new Set(opts.recipientIds)).filter((id) => id && id !== me);
  if (recips.length === 0) return;
  await ensureInboxList();
  for (const rid of recips) {
    await createListItem(INBOX_LIST, {
      RecipientId: rid,
      ActorId: me,
      ActorName: actorName,
      PageId: opts.pageId,
      PageTitle: opts.pageTitle.slice(0, 255),
      CommentId: opts.commentId,
      BlockId: opts.blockId || '',
      Snippet: opts.snippet.slice(0, 255),
      Read: 0,
    }).catch(() => undefined);
  }
}

// ── Read inbox ───────────────────────────────────────────

function mapInbox(r: Record<string, unknown>): InboxRow {
  return {
    Id: Number(r.Id),
    ActorId: Number(r.ActorId || 0),
    ActorName: String(r.ActorName || ''),
    PageId: String(r.PageId || ''),
    PageTitle: String(r.PageTitle || ''),
    CommentId: Number(r.CommentId || 0),
    BlockId: String(r.BlockId || ''),
    Snippet: String(r.Snippet || ''),
    Read: Number(r.Read || 0),
    ReadAt: r.ReadAt ? Number(r.ReadAt) : undefined,
    Created: r.Created ? String(r.Created) : undefined,
  };
}

/** Fetch the current user's inbox (newest first). GCs read rows older than
 *  READ_TTL_MS (Teams-style: read items disappear after a few days). */
export async function apiListInbox(): Promise<InboxRow[]> {
  const me = S.meta.myUserId || (await getCurrentUserId().catch(() => 0));
  if (!me) return [];
  await ensureInboxList();
  const url = spListUrl(INBOX_LIST,
    '/items?$select=' + encodeURIComponent(INBOX_SELECT) +
    '&$filter=' + encodeURIComponent('RecipientId eq ' + me) +
    '&$orderby=Created desc&$top=100');
  const d = await spGetD<{ results: Array<Record<string, unknown>> }>(url).catch(() => null);
  const rows = (d?.results || []).map(mapInbox);
  const now = Date.now();
  const live: InboxRow[] = [];
  for (const r of rows) {
    if (r.Read && r.ReadAt && (now - r.ReadAt) > READ_TTL_MS) {
      await deleteListItem(INBOX_LIST, r.Id).catch(() => undefined);   // expire old read
    } else {
      live.push(r);
    }
  }
  return live;
}

/** Count of unread inbox rows for the current user (for the badge). */
export async function apiUnreadMentionCount(): Promise<number> {
  const me = S.meta.myUserId || (await getCurrentUserId().catch(() => 0));
  if (!me) return 0;
  await ensureInboxList();
  const url = spListUrl(INBOX_LIST,
    '/items?$select=Id&$filter=' + encodeURIComponent('RecipientId eq ' + me + ' and Read eq 0') +
    '&$top=100');
  const d = await spGetD<{ results: Array<{ Id: number }> }>(url).catch(() => null);
  return d?.results?.length || 0;
}

export async function apiMarkMentionRead(id: number): Promise<void> {
  await updateListItem(INBOX_LIST, id, { Read: 1, ReadAt: Date.now() }).catch(() => undefined);
}
