// Comments UI — right-side pane (default-open) + gutter markers.
//
// Notion-style: each comment row shows an avatar, name, relative time and
// body; hovering reveals a top-right action bar with リアクション + 解決
// buttons and a ⋯ menu (編集 / 削除) for everything else. Threads group a
// root with its replies (connector line). The pane lists all of the open
// page's threads; the ⋮⋮ handle / toolbar 💬 / a gutter marker open it and
// target a specific block for the composer.

import { S } from '../state';
import { getEd } from './dom';
import { toast } from './ui-helpers';
import { escapeHtml } from '../lib/html-escape';
import { formatRelativeTime } from '../lib/date-utils';
import { metaById } from '../lib/page-store';
import { getUserNameById } from '../api/sync';
import {
  apiListComments, apiAddComment, apiEditComment, apiDeleteComment,
  apiResolveThread, apiToggleReaction, hydrateAuthorNames, groupThreads,
  openThreadCountByBlock, parseReactions,
  type CommentRow, type CommentThread, type CommentScope,
} from '../api/comments';

let _pageId = '';
let _scopeDefault: CommentScope = 'user';
let _threads: CommentThread[] = [];
const _markers: HTMLElement[] = [];
let _paneOpen = true;
let _composeBlockId = '';
let _composeScope: CommentScope = 'user';
let _editingId = 0;
let _listenersBound = false;
let _paneWired = false;

/** Resolved display names for reactor / author ids (for chip tooltips). */
const _userNames = new Map<number, string>();

const REACTION_EMOJIS = ['👍', '❤️', '🎉', '😄', '🙏', '👀'];
const AVATAR_COLORS = ['#e07a5f', '#3d82c4', '#5a9e6f', '#b06fb0', '#c99a3b', '#4aa3a3', '#c4677b', '#7a82c4'];

export function currentCommentTarget(): { pageId: string; scope: CommentScope } | null {
  if (S.currentRow) {
    const db = metaById(S.currentRow.dbId);
    return {
      pageId: 'row:' + S.currentRow.listTitle + ':' + S.currentRow.itemId,
      scope: db?.scope === 'org' ? 'org' : 'user',
    };
  }
  if (S.currentType === 'page' && S.currentId) {
    const meta = metaById(S.currentId);
    return { pageId: S.currentId, scope: meta?.scope === 'org' ? 'org' : 'user' };
  }
  return null;
}

function overlay(): HTMLElement {
  return document.getElementById('memola-overlay') || document.body;
}
function pane(): HTMLElement | null { return document.getElementById('memola-comments-pane'); }
function paneList(): HTMLElement | null { return document.getElementById('memola-comments-list'); }

function avatarColor(id: number): string { return AVATAR_COLORS[Math.abs(id || 0) % AVATAR_COLORS.length]; }
function initialOf(name: string): string { return (name || '？').trim().charAt(0).toUpperCase() || '？'; }
function cssEscape(s: string): string { return s.replace(/"/g, '\\"'); }

// ── Load / clear ─────────────────────────────────────────

export async function loadCommentsFor(pageId: string, scopeDefault: CommentScope): Promise<void> {
  _pageId = pageId;
  _scopeDefault = scopeDefault;
  _composeScope = scopeDefault;
  _composeBlockId = '';
  _editingId = 0;
  wirePane();
  try {
    const rows = await apiListComments(pageId);
    await hydrateAuthorNames(rows);
    await resolveReactorNames(rows);
    if (_pageId !== pageId) return;
    _threads = groupThreads(rows);
  } catch { _threads = []; }
  renderMarkers();
  renderPane();
  bindReposition();
}

export function clearComments(): void {
  _pageId = '';
  _threads = [];
  removeMarkers();
  closeFloat();
  const p = pane();
  if (p) p.classList.remove('on');
}

async function refresh(): Promise<void> {
  if (!_pageId) return;
  const rows = await apiListComments(_pageId);
  await hydrateAuthorNames(rows);
  await resolveReactorNames(rows);
  _threads = groupThreads(rows);
  renderMarkers();
  renderPane();
}

/** Resolve all reactor ids → display names (for chip tooltips). Authors
 *  are seeded from the denormalized AuthorName; reactors are looked up
 *  (session-cached). */
async function resolveReactorNames(rows: CommentRow[]): Promise<void> {
  const ids = new Set<number>();
  for (const c of rows) {
    if (c.AuthorId && c.AuthorName) _userNames.set(c.AuthorId, c.AuthorName);
    const map = parseReactions(c);
    for (const users of Object.values(map)) for (const u of users) ids.add(u);
  }
  await Promise.all(Array.from(ids).map(async (id) => {
    if (_userNames.has(id)) return;
    _userNames.set(id, await getUserNameById(id).catch(() => '') || ('ユーザー#' + id));
  }));
}

function reactorNames(users: number[]): string {
  const me = S.meta.myUserId || -1;
  return users.map((id) => id === me ? 'あなた' : (_userNames.get(id) || ('ユーザー#' + id))).join(', ');
}

// ── Pane wiring / toggle ─────────────────────────────────

function wirePane(): void {
  const p = pane();
  if (!p) return;
  if (!_paneWired) {
    _paneWired = true;
    p.querySelector('#memola-comments-x')?.addEventListener('click', () => { _paneOpen = false; renderPane(); });
    const list = paneList();
    list?.addEventListener('click', onPaneClick);
    // Enter in a reply input sends the reply.
    list?.addEventListener('keydown', (e) => {
      const ke = e as KeyboardEvent;
      const inp = (ke.target as HTMLElement).closest<HTMLElement>('.memola-cmt-reply-inp');
      if (inp && ke.key === 'Enter' && !ke.shiftKey) {
        ke.preventDefault();
        const root = inp.closest<HTMLElement>('.memola-cmt-thread')?.dataset.root || '';
        void doReply(root);
      }
    });
    const composeBtn = p.querySelector('#memola-comments-add');
    composeBtn?.addEventListener('click', () => void doAddFromComposer());
    const ta = p.querySelector('#memola-comments-ta');
    ta?.addEventListener('keydown', (e) => {
      const ke = e as KeyboardEvent;
      // Enter submits; Shift+Enter inserts a newline (chat-style, matches
      // the reply box so a plain Enter never leaves a stray blank line).
      if (ke.key === 'Enter' && !ke.shiftKey) { ke.preventDefault(); void doAddFromComposer(); }
    });
    p.querySelector('#memola-comments-scope-org')?.addEventListener('click', () => { _composeScope = 'org'; syncComposer(); });
    p.querySelector('#memola-comments-scope-user')?.addEventListener('click', () => { _composeScope = 'user'; syncComposer(); });
    p.querySelector('#memola-comments-target-x')?.addEventListener('click', () => { _composeBlockId = ''; syncComposer(); });
  }
}

/** Open the pane and target `blockId` for the composer (handle menu /
 *  toolbar 💬 / gutter marker). Scrolls to the block's threads if any. */
export function openCommentPopover(pageId: string, blockId: string): void {
  if (pageId !== _pageId) return;
  _paneOpen = true;
  _composeBlockId = blockId;
  _composeScope = _scopeDefault;
  renderPane();
  const list = paneList();
  if (blockId && list) {
    const t = list.querySelector<HTMLElement>('[data-block-id="' + cssEscape(blockId) + '"]');
    t?.scrollIntoView({ block: 'center' });
  }
  (pane()?.querySelector('#memola-comments-ta') as HTMLTextAreaElement | null)?.focus();
}

export function closePopover(): void { closeFloat(); }

// ── Markers ──────────────────────────────────────────────

function removeMarkers(): void { for (const m of _markers) m.remove(); _markers.length = 0; }

function renderMarkers(): void {
  removeMarkers();
  const counts = openThreadCountByBlock(_threads);
  for (const [blockId, n] of counts) {
    if (!blockId) continue;
    const el = document.createElement('div');
    el.className = 'memola-cmt-marker';
    el.dataset.blockId = blockId;
    el.textContent = n > 1 ? '💬' + n : '💬';
    el.title = 'コメント ' + n + ' 件';
    el.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); openCommentPopover(_pageId, blockId); });
    overlay().appendChild(el);
    _markers.push(el);
  }
  positionMarkers();
}

function positionMarkers(): void {
  const ed = getEd();
  for (const m of _markers) {
    const block = ed.querySelector<HTMLElement>('[data-block-id="' + cssEscape(m.dataset.blockId || '') + '"]');
    if (!block) { m.style.display = 'none'; continue; }
    m.style.display = '';
    const rect = block.getBoundingClientRect();
    const fl = firstLineRect(block);
    const h = m.offsetHeight || 20;
    m.style.top = (fl.top + window.scrollY + (fl.height - h) / 2) + 'px';
    m.style.left = (rect.right + window.scrollX + 8) + 'px';
  }
}

function firstLineRect(block: HTMLElement): { top: number; height: number } {
  try {
    const range = document.createRange();
    range.selectNodeContents(block);
    const rects = range.getClientRects();
    for (let i = 0; i < rects.length; i++) if (rects[i].height > 0) return { top: rects[i].top, height: rects[i].height };
  } catch { /* ignore */ }
  const r = block.getBoundingClientRect();
  const lh = parseFloat(window.getComputedStyle(block).lineHeight);
  return { top: r.top, height: isFinite(lh) && lh > 0 ? Math.min(lh, r.height) : r.height };
}

let _repoTimer: number | null = null;
function scheduleReposition(): void {
  if (_repoTimer != null) return;
  _repoTimer = window.requestAnimationFrame(() => { _repoTimer = null; positionMarkers(); });
}
function bindReposition(): void {
  if (_listenersBound) return;
  _listenersBound = true;
  window.addEventListener('scroll', scheduleReposition, true);
  window.addEventListener('resize', scheduleReposition);
  getEd().addEventListener('input', scheduleReposition);
}

// ── Pane render ──────────────────────────────────────────

function reactionChips(c: CommentRow): string {
  const map = parseReactions(c);
  const me = S.meta.myUserId || -1;
  const chips = Object.entries(map).filter(([, u]) => u.length > 0).map(([emoji, users]) => {
    const mine = users.includes(me) ? ' mine' : '';
    const who = escapeHtml(reactorNames(users));
    return '<button class="memola-cmt-react-chip' + mine + '" data-act="react-toggle" data-id="' + c.Id +
      '" data-emoji="' + escapeHtml(emoji) + '" title="' + who + '">' +
      emoji + ' ' + users.length + '</button>';
  });
  return chips.length ? '<div class="memola-cmt-reacts">' + chips.join('') + '</div>' : '';
}

function commentHtml(c: CommentRow, isRoot: boolean, withHover = true): string {
  const mine = c.AuthorId === (S.meta.myUserId || -1);
  const when = c.Created ? formatRelativeTime(Date.parse(c.Created)) : '';
  if (c.Deleted) {
    return '<div class="memola-cmt-c deleted"><div class="memola-cmt-main"><div class="memola-cmt-body muted">（削除されたコメント）</div></div></div>';
  }
  if (_editingId === c.Id) {
    return '<div class="memola-cmt-c editing" data-id="' + c.Id + '">' +
      '<div class="memola-cmt-avatar" style="background:' + avatarColor(c.AuthorId) + '">' + escapeHtml(initialOf(c.AuthorName || '')) + '</div>' +
      '<div class="memola-cmt-main">' +
        '<textarea class="memola-cmt-edit-ta">' + escapeHtml(c.Body) + '</textarea>' +
        '<div class="memola-cmt-editacts">' +
          '<button class="memola-btn s" data-act="edit-save" data-id="' + c.Id + '">保存</button>' +
          '<button class="memola-btn ghost" data-act="edit-cancel">取消</button>' +
        '</div>' +
      '</div></div>';
  }
  const scopeBadge = isRoot && c.Scope === 'user' ? '<span class="memola-cmt-badge priv">🔒</span>' : '';
  const bodyHtml = escapeHtml((c.Body || '').replace(/\r\n?/g, '\n').trim()).replace(/\n/g, '<br>');
  const edited = c.Edited ? '<span class="memola-cmt-edited">編集済み</span>' : '';
  const hover = withHover
    ? '<div class="memola-cmt-hover">' +
        '<button class="memola-cmt-hbtn" data-act="react" data-id="' + c.Id + '" title="リアクション">🙂<sup>+</sup></button>' +
        (isRoot ? '<button class="memola-cmt-hbtn" data-act="resolve" data-root="' + c.Id + '" title="解決">✓</button>' : '') +
        (mine ? '<button class="memola-cmt-hbtn" data-act="more" data-id="' + c.Id + '" title="その他">⋯</button>' : '') +
      '</div>'
    : '';
  const avatar = '<div class="memola-cmt-avatar" style="background:' + avatarColor(c.AuthorId) + '">' +
    escapeHtml(initialOf(c.AuthorName || '')) + '</div>';
  if (!isRoot) {
    // Compact reply: name + body inline on one line (time on hover).
    return '<div class="memola-cmt-c reply" data-id="' + c.Id + '" title="' + escapeHtml(when) + '">' +
      avatar +
      '<div class="memola-cmt-main">' +
        '<div class="memola-cmt-replyline">' +
          '<span class="memola-cmt-author">' + escapeHtml(c.AuthorName || '誰か') + '</span> ' +
          '<span class="memola-cmt-body inline">' + bodyHtml + '</span> ' + edited +
        '</div>' +
        reactionChips(c) +
      '</div>' + hover +
    '</div>';
  }
  return '<div class="memola-cmt-c" data-id="' + c.Id + '">' +
    avatar +
    '<div class="memola-cmt-main">' +
      '<div class="memola-cmt-line1">' +
        '<span class="memola-cmt-author">' + escapeHtml(c.AuthorName || '誰か') + '</span>' +
        '<span class="memola-cmt-time">' + escapeHtml(when) + '</span>' + edited + scopeBadge +
      '</div>' +
      '<div class="memola-cmt-body">' + bodyHtml + '</div>' +
      reactionChips(c) +
    '</div>' + hover +
  '</div>';
}

function threadHtml(t: CommentThread): string {
  const anchor = t.blockId
    ? '<div class="memola-cmt-anchor">' + escapeHtml(t.root.AnchorText || '（ブロック）') + '</div>' : '';
  const replies = t.replies.length
    ? '<div class="memola-cmt-replies">' + t.replies.map((r) => commentHtml(r, false, true)).join('') + '</div>' : '';
  const rootMine = t.root.AuthorId === (S.meta.myUserId || -1);
  // Single thread-level action bar (top-right of the whole thread): acts on
  // the PARENT comment — リアクション / 解決 / ⋯(編集・削除).
  const threadHover =
    '<div class="memola-cmt-thread-hover">' +
      '<button class="memola-cmt-hbtn" data-act="react" data-id="' + t.root.Id + '" title="リアクション">🙂<sup>+</sup></button>' +
      '<button class="memola-cmt-hbtn" data-act="resolve" data-root="' + t.root.Id + '" title="解決">✓</button>' +
      (rootMine ? '<button class="memola-cmt-hbtn" data-act="more" data-id="' + t.root.Id + '" title="その他">⋯</button>' : '') +
    '</div>';
  return '<div class="memola-cmt-thread' + (t.resolved ? ' resolved' : '') + '" data-root="' + t.root.Id + '"' +
    (t.blockId ? ' data-block-id="' + escapeHtml(t.blockId) + '"' : '') + '>' +
    threadHover +
    (t.resolved ? '<div class="memola-cmt-resolved-tag">✓ 解決済み</div>' : '') +
    anchor + commentHtml(t.root, true, false) + replies +
    '<div class="memola-cmt-replybar">' +
      '<input class="memola-cmt-reply-inp" type="text" placeholder="返信...">' +
      '<button class="memola-cmt-reply-send" data-act="reply" data-root="' + t.root.Id + '">↵</button>' +
    '</div>' +
  '</div>';
}

function renderPane(): void {
  const p = pane();
  const list = paneList();
  if (!p || !list) return;
  if (!_paneOpen || !_pageId) { p.classList.remove('on'); return; }
  p.classList.add('on');
  const open = _threads.filter((t) => !t.resolved);
  const resolved = _threads.filter((t) => t.resolved);
  list.innerHTML =
    (open.length || resolved.length
      ? open.map(threadHtml).join('') +
        (resolved.length ? '<div class="memola-cmt-resolved-sep">解決済み</div>' + resolved.map(threadHtml).join('') : '')
      : '<div class="memola-cmt-empty">まだコメントはありません。<br>ブロックの ⋮⋮ から「💬 コメント」、またはツールバーの 💬 で追加できます。</div>');
  syncComposer();
}

function syncComposer(): void {
  const p = pane();
  if (!p) return;
  const orgB = p.querySelector('#memola-comments-scope-org');
  const userB = p.querySelector('#memola-comments-scope-user');
  orgB?.classList.toggle('on', _composeScope === 'org');
  userB?.classList.toggle('on', _composeScope === 'user');
  const targetWrap = p.querySelector<HTMLElement>('#memola-comments-target');
  const targetLbl = p.querySelector<HTMLElement>('#memola-comments-target-lbl');
  if (targetWrap && targetLbl) {
    if (_composeBlockId) {
      targetWrap.style.display = '';
      targetLbl.textContent = '↳ ' + (anchorTextFor(_composeBlockId) || 'このブロック');
    } else {
      targetWrap.style.display = 'none';
    }
  }
}

function anchorTextFor(blockId: string): string {
  if (!blockId) return '';
  const el = getEd().querySelector<HTMLElement>('[data-block-id="' + cssEscape(blockId) + '"]');
  return (el?.textContent || '').trim().slice(0, 80);
}

// ── Events ───────────────────────────────────────────────

function findComment(id: number): CommentRow | null {
  for (const t of _threads) {
    if (t.root.Id === id) return t.root;
    const r = t.replies.find((x) => x.Id === id);
    if (r) return r;
  }
  return null;
}

function onPaneClick(e: Event): void {
  const t = e.target as HTMLElement;
  const btn = t.closest<HTMLElement>('[data-act]');
  if (!btn) return;
  const act = btn.dataset.act;
  const id = Number(btn.dataset.id || 0);
  if (act === 'resolve') { void doResolve(btn.dataset.root || ''); return; }
  if (act === 'reply') { void doReply(btn.dataset.root || ''); return; }
  if (act === 'react') { openReactionPalette(btn, id); return; }
  if (act === 'react-toggle') { void doReact(id, btn.dataset.emoji || ''); return; }
  if (act === 'more') { openMoreMenu(btn, id); return; }
  if (act === 'edit') { _editingId = id; closeFloat(); renderPane(); return; }
  if (act === 'edit-cancel') { _editingId = 0; renderPane(); return; }
  if (act === 'edit-save') { void doEditSave(id); return; }
  if (act === 'del') { closeFloat(); void doDelete(id); return; }
}

async function doAddFromComposer(): Promise<void> {
  const ta = pane()?.querySelector('#memola-comments-ta') as HTMLTextAreaElement | null;
  const body = (ta?.value || '').trim();
  if (!body) return;
  try {
    await apiAddComment({ pageId: _pageId, blockId: _composeBlockId, body, scope: _composeScope, anchorText: anchorTextFor(_composeBlockId) });
    if (ta) ta.value = '';
    _composeBlockId = '';
    await refresh();
  } catch (e) { toast('コメント追加失敗: ' + (e as Error).message, 'err'); }
}

async function doReply(rootId: string): Promise<void> {
  const root = findComment(Number(rootId));
  if (!root) return;
  const inp = paneList()?.querySelector<HTMLInputElement>('.memola-cmt-thread[data-root="' + rootId + '"] .memola-cmt-reply-inp');
  const body = (inp?.value || '').trim();
  if (!body) return;
  try {
    await apiAddComment({ pageId: _pageId, blockId: root.BlockId, body, scope: root.Scope, threadRootId: rootId });
    await refresh();
  } catch (e) { toast('返信失敗: ' + (e as Error).message, 'err'); }
}

async function doResolve(rootId: string): Promise<void> {
  const root = findComment(Number(rootId));
  if (!root) return;
  try { await apiResolveThread(root, !(root.Resolved > 0)); await refresh(); }
  catch (e) { toast('解決状態の変更失敗: ' + (e as Error).message, 'err'); }
}

async function doReact(id: number, emoji: string): Promise<void> {
  const c = findComment(id);
  if (!c || !emoji) return;
  try { await apiToggleReaction(c, emoji); await refresh(); }
  catch (e) { toast('リアクション失敗: ' + (e as Error).message, 'err'); }
}

async function doEditSave(id: number): Promise<void> {
  const c = findComment(id);
  if (!c) return;
  const ta = paneList()?.querySelector<HTMLTextAreaElement>('.memola-cmt-c.editing[data-id="' + id + '"] .memola-cmt-edit-ta');
  const body = (ta?.value || '').trim();
  if (!body) return;
  try { await apiEditComment({ ...c, Body: body }); _editingId = 0; await refresh(); }
  catch (e) { toast('編集失敗: ' + (e as Error).message, 'err'); }
}

async function doDelete(id: number): Promise<void> {
  const c = findComment(id);
  if (!c) return;
  if (!confirm('このコメントを削除しますか?')) return;
  const thread = _threads.find((t) => t.root.Id === id);
  const hasReplies = !!thread && thread.replies.length > 0;
  try { await apiDeleteComment(c, hasReplies); await refresh(); }
  catch (e) { toast('削除失敗: ' + (e as Error).message, 'err'); }
}

// ── Floating sub-menus (reaction palette / more) ─────────

let _float: HTMLElement | null = null;
function closeFloat(): void {
  if (_float) { _float.remove(); _float = null; }
  document.removeEventListener('mousedown', onFloatOutside, true);
}
function onFloatOutside(e: MouseEvent): void {
  if (_float && !_float.contains(e.target as Node)) closeFloat();
}
function showFloat(anchor: HTMLElement, el: HTMLElement): void {
  closeFloat();
  _float = el;
  overlay().appendChild(el);
  const r = anchor.getBoundingClientRect();
  el.style.left = Math.min(r.left + window.scrollX, window.scrollX + window.innerWidth - (el.offsetWidth || 180) - 8) + 'px';
  el.style.top = (r.bottom + window.scrollY + 4) + 'px';
  setTimeout(() => document.addEventListener('mousedown', onFloatOutside, true), 0);
}

function openReactionPalette(anchor: HTMLElement, id: number): void {
  const el = document.createElement('div');
  el.className = 'memola-cmt-float memola-cmt-react-palette';
  for (const emoji of REACTION_EMOJIS) {
    const b = document.createElement('button');
    b.className = 'memola-cmt-react-opt';
    b.textContent = emoji;
    b.addEventListener('mousedown', (e) => { e.preventDefault(); closeFloat(); void doReact(id, emoji); });
    el.appendChild(b);
  }
  showFloat(anchor, el);
}

function openMoreMenu(anchor: HTMLElement, id: number): void {
  const el = document.createElement('div');
  el.className = 'memola-cmt-float memola-cmt-more';
  const mk = (label: string, act: string): HTMLElement => {
    const b = document.createElement('button');
    b.className = 'memola-cmt-more-item';
    b.textContent = label;
    b.dataset.act = act;
    b.dataset.id = String(id);
    b.addEventListener('mousedown', (e) => {
      e.preventDefault();
      closeFloat();
      if (act === 'edit') { _editingId = id; renderPane(); }
      else if (act === 'del') void doDelete(id);
    });
    return b;
  };
  el.appendChild(mk('編集', 'edit'));
  el.appendChild(mk('削除', 'del'));
  showFloat(anchor, el);
}
