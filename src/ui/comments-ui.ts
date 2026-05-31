// Comments UI — gutter markers + thread popover for page/block comments.
//
// Markers float in the right gutter next to each block that has an open
// thread; clicking one (or the ⋮⋮ handle menu's 「コメント」, or the
// toolbar 💬) opens a popover anchored to that block showing its threads,
// with reply / resolve / edit / delete and a new-comment composer whose
// scope toggle (全員 / 個人) defaults to the page's scope.

import { S } from '../state';
import { getEd } from './dom';
import { toast } from './ui-helpers';
import { escapeHtml } from '../lib/html-escape';
import { formatRelativeTime } from '../lib/date-utils';
import { metaById } from '../lib/page-store';
import {
  apiListComments, apiAddComment, apiEditComment, apiDeleteComment,
  apiResolveThread, hydrateAuthorNames, groupThreads, openThreadCountByBlock,
  type CommentRow, type CommentThread, type CommentScope,
} from '../api/comments';

let _pageId = '';
let _scopeDefault: CommentScope = 'user';
let _threads: CommentThread[] = [];
const _markers: HTMLElement[] = [];
let _pop: HTMLElement | null = null;
let _popBlockId = '';
let _editingId = 0;
let _composeScope: CommentScope = 'user';
let _listenersBound = false;

/** Resolve the comment target (pageId + default scope) for the open view.
 *  Normal pages key by their page id; DB row detail pages key by a stable
 *  `row:<list>:<itemId>` so they survive row reordering. */
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

// ── First-line rect (vertical centering, mirrors editor2-drag) ──
function firstLineRect(block: HTMLElement): { top: number; height: number } {
  try {
    const range = document.createRange();
    range.selectNodeContents(block);
    const rects = range.getClientRects();
    for (let i = 0; i < rects.length; i++) {
      if (rects[i].height > 0) return { top: rects[i].top, height: rects[i].height };
    }
  } catch { /* fall through */ }
  const r = block.getBoundingClientRect();
  const lh = parseFloat(window.getComputedStyle(block).lineHeight);
  const h = isFinite(lh) && lh > 0 ? Math.min(lh, r.height) : r.height;
  return { top: r.top, height: h };
}

function overlay(): HTMLElement {
  return document.getElementById('memola-overlay') || document.body;
}

// ── Load / clear ─────────────────────────────────────────

/** Load comments for the given page and render the gutter markers. */
export async function loadCommentsFor(pageId: string, scopeDefault: CommentScope): Promise<void> {
  _pageId = pageId;
  _scopeDefault = scopeDefault;
  _composeScope = scopeDefault;
  closePopover();
  try {
    const rows = await apiListComments(pageId);
    await hydrateAuthorNames(rows);
    if (_pageId !== pageId) return;          // navigated away during fetch
    _threads = groupThreads(rows);
  } catch {
    _threads = [];
  }
  renderMarkers();
  bindReposition();
}

/** Tear down markers + popover (page leave / editor unmount). */
export function clearComments(): void {
  _pageId = '';
  _threads = [];
  closePopover();
  removeMarkers();
}

async function refresh(): Promise<void> {
  if (!_pageId) return;
  const rows = await apiListComments(_pageId);
  await hydrateAuthorNames(rows);
  _threads = groupThreads(rows);
  renderMarkers();
  if (_pop) renderPopover();
}

// ── Markers ──────────────────────────────────────────────

function removeMarkers(): void {
  for (const m of _markers) m.remove();
  _markers.length = 0;
}

function renderMarkers(): void {
  removeMarkers();
  const counts = openThreadCountByBlock(_threads);
  for (const [blockId, n] of counts) {
    if (!blockId) continue;                  // page-level handled separately
    const el = document.createElement('div');
    el.className = 'memola-cmt-marker';
    el.dataset.blockId = blockId;
    el.textContent = n > 1 ? '💬' + n : '💬';
    el.title = 'コメント ' + n + ' 件';
    el.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      openCommentPopover(_pageId, blockId);
    });
    overlay().appendChild(el);
    _markers.push(el);
  }
  positionMarkers();
}

function positionMarkers(): void {
  const ed = getEd();
  for (const m of _markers) {
    const blockId = m.dataset.blockId || '';
    const block = ed.querySelector<HTMLElement>('[data-block-id="' + cssEscape(blockId) + '"]');
    if (!block) { m.style.display = 'none'; continue; }
    m.style.display = '';
    const rect = block.getBoundingClientRect();
    const fl = firstLineRect(block);
    const h = m.offsetHeight || 20;
    m.style.top = (fl.top + window.scrollY + (fl.height - h) / 2) + 'px';
    m.style.left = (rect.right + window.scrollX + 8) + 'px';
  }
}

function cssEscape(s: string): string {
  // Block ids are app-generated (safe chars), but guard quotes anyway.
  return s.replace(/"/g, '\\"');
}

let _repoTimer: number | null = null;
function scheduleReposition(): void {
  if (_repoTimer != null) return;
  _repoTimer = window.requestAnimationFrame(() => {
    _repoTimer = null;
    positionMarkers();
    if (_pop) positionPopover();
  });
}

function bindReposition(): void {
  if (_listenersBound) return;
  _listenersBound = true;
  window.addEventListener('scroll', scheduleReposition, true);
  window.addEventListener('resize', scheduleReposition);
  // Typing changes block heights → keep markers aligned. The editor root
  // (#memola-ed) is a stable element, so binding once is enough.
  getEd().addEventListener('input', scheduleReposition);
}

// ── Popover ──────────────────────────────────────────────

export function closePopover(): void {
  if (_pop) { _pop.remove(); _pop = null; }
  _popBlockId = '';
  _editingId = 0;
  document.removeEventListener('mousedown', onOutside, true);
  document.removeEventListener('keydown', onKey, true);
}

function onOutside(e: MouseEvent): void {
  const t = e.target as HTMLElement;
  if (_pop && !_pop.contains(t) && !t.closest('.memola-cmt-marker')) closePopover();
}
function onKey(e: KeyboardEvent): void {
  if (e.key === 'Escape') { e.preventDefault(); closePopover(); }
}

/** Open (or move) the thread popover for a block ('' = page-level). */
export function openCommentPopover(pageId: string, blockId: string): void {
  if (pageId !== _pageId) return;
  _popBlockId = blockId;
  _editingId = 0;
  _composeScope = _scopeDefault;
  if (!_pop) {
    _pop = document.createElement('div');
    _pop.className = 'memola-cmt-pop';
    _pop.addEventListener('click', onPopClick);
    overlay().appendChild(_pop);
    setTimeout(() => {
      document.addEventListener('mousedown', onOutside, true);
      document.addEventListener('keydown', onKey, true);
    }, 0);
  }
  renderPopover();
  positionPopover();
  const ta = _pop.querySelector<HTMLTextAreaElement>('.memola-cmt-compose textarea');
  ta?.focus();
}

function threadsForBlock(blockId: string): CommentThread[] {
  return _threads.filter((t) => t.blockId === blockId);
}

function commentHtml(c: CommentRow, isRoot: boolean): string {
  const mine = c.AuthorId === (S.meta.myUserId || -1);
  const when = c.Created ? formatRelativeTime(Date.parse(c.Created)) : '';
  const scopeBadge = c.Scope === 'user'
    ? '<span class="memola-cmt-badge priv">🔒 個人</span>'
    : '<span class="memola-cmt-badge org">組織</span>';
  if (c.Deleted) {
    return '<div class="memola-cmt-item deleted"><span class="memola-cmt-body muted">（削除されたコメント）</span></div>';
  }
  if (_editingId === c.Id) {
    return '<div class="memola-cmt-item editing" data-id="' + c.Id + '">' +
      '<textarea class="memola-cmt-edit-ta">' + escapeHtml(c.Body) + '</textarea>' +
      '<div class="memola-cmt-actions">' +
        '<button class="memola-btn s" data-act="edit-save" data-id="' + c.Id + '">保存</button>' +
        '<button class="memola-btn ghost" data-act="edit-cancel">取消</button>' +
      '</div></div>';
  }
  return '<div class="memola-cmt-item" data-id="' + c.Id + '">' +
    '<div class="memola-cmt-meta">' +
      '<span class="memola-cmt-author">' + escapeHtml(c.AuthorName || '誰か') + '</span>' +
      (isRoot ? ' ' + scopeBadge : '') +
      '<span class="memola-cmt-time">' + escapeHtml(when) + '</span>' +
      (c.Edited ? '<span class="memola-cmt-edited">(編集済み)</span>' : '') +
    '</div>' +
    '<div class="memola-cmt-body">' + escapeHtml(c.Body).replace(/\n/g, '<br>') + '</div>' +
    (mine
      ? '<div class="memola-cmt-rowacts">' +
          '<button class="memola-cmt-link" data-act="edit" data-id="' + c.Id + '">編集</button>' +
          '<button class="memola-cmt-link" data-act="del" data-id="' + c.Id + '">削除</button>' +
        '</div>'
      : '') +
    '</div>';
}

function threadHtml(t: CommentThread): string {
  const head = commentHtml(t.root, true);
  const replies = t.replies.map((r) => commentHtml(r, false)).join('');
  const resolveLabel = t.resolved ? '未解決に戻す' : '解決';
  return '<div class="memola-cmt-thread' + (t.resolved ? ' resolved' : '') + '" data-root="' + t.root.Id + '">' +
    (t.resolved ? '<div class="memola-cmt-resolved-tag">✓ 解決済み</div>' : '') +
    head + replies +
    '<div class="memola-cmt-threadfoot">' +
      '<input class="memola-cmt-reply-inp" type="text" placeholder="返信...">' +
      '<button class="memola-btn s" data-act="reply" data-root="' + t.root.Id + '">返信</button>' +
      '<button class="memola-btn ghost" data-act="resolve" data-root="' + t.root.Id + '">' + resolveLabel + '</button>' +
    '</div>' +
  '</div>';
}

function renderPopover(): void {
  if (!_pop) return;
  const blockId = _popBlockId;
  const threads = threadsForBlock(blockId);
  // Sort: open first, then resolved.
  threads.sort((a, b) => Number(a.resolved) - Number(b.resolved));
  const title = blockId ? 'ブロックのコメント' : 'ページのコメント';
  const scopeToggle =
    '<div class="memola-cmt-scope">' +
      '<button class="memola-cmt-scope-btn' + (_composeScope === 'org' ? ' on' : '') + '" data-act="scope-org">組織に表示</button>' +
      '<button class="memola-cmt-scope-btn' + (_composeScope === 'user' ? ' on' : '') + '" data-act="scope-user">🔒 個人メモ</button>' +
    '</div>';
  _pop.innerHTML =
    '<div class="memola-cmt-pop-hd">' + title +
      '<button class="memola-cmt-x" data-act="close">×</button></div>' +
    '<div class="memola-cmt-threads">' +
      (threads.length ? threads.map(threadHtml).join('') : '<div class="memola-cmt-empty">まだコメントはありません</div>') +
    '</div>' +
    '<div class="memola-cmt-compose">' +
      scopeToggle +
      '<textarea placeholder="コメントを追加..."></textarea>' +
      '<button class="memola-btn p" data-act="add">コメント</button>' +
    '</div>';
}

function onPopClick(e: Event): void {
  const t = e.target as HTMLElement;
  const btn = t.closest<HTMLElement>('[data-act]');
  if (!btn) return;
  const act = btn.dataset.act;
  if (act === 'close') { closePopover(); return; }
  if (act === 'scope-org') { _composeScope = 'org'; renderPopover(); return; }
  if (act === 'scope-user') { _composeScope = 'user'; renderPopover(); return; }
  if (act === 'add') { void doAdd(); return; }
  if (act === 'reply') { void doReply(btn.dataset.root || ''); return; }
  if (act === 'resolve') { void doResolve(btn.dataset.root || ''); return; }
  if (act === 'edit') { _editingId = Number(btn.dataset.id); renderPopover(); return; }
  if (act === 'edit-cancel') { _editingId = 0; renderPopover(); return; }
  if (act === 'edit-save') { void doEditSave(Number(btn.dataset.id)); return; }
  if (act === 'del') { void doDelete(Number(btn.dataset.id)); return; }
}

function findComment(id: number): CommentRow | null {
  for (const t of _threads) {
    if (t.root.Id === id) return t.root;
    const r = t.replies.find((x) => x.Id === id);
    if (r) return r;
  }
  return null;
}

function anchorTextFor(blockId: string): string {
  if (!blockId) return '';
  const el = getEd().querySelector<HTMLElement>('[data-block-id="' + cssEscape(blockId) + '"]');
  return (el?.textContent || '').trim().slice(0, 120);
}

async function doAdd(): Promise<void> {
  if (!_pop) return;
  const ta = _pop.querySelector<HTMLTextAreaElement>('.memola-cmt-compose textarea');
  const body = (ta?.value || '').trim();
  if (!body) return;
  try {
    await apiAddComment({
      pageId: _pageId, blockId: _popBlockId, body, scope: _composeScope,
      anchorText: anchorTextFor(_popBlockId),
    });
    await refresh();
  } catch (e) { toast('コメント追加失敗: ' + (e as Error).message, 'err'); }
}

async function doReply(rootId: string): Promise<void> {
  if (!_pop) return;
  const root = findComment(Number(rootId));
  if (!root) return;
  const inp = _pop.querySelector<HTMLInputElement>(
    '.memola-cmt-thread[data-root="' + rootId + '"] .memola-cmt-reply-inp');
  const body = (inp?.value || '').trim();
  if (!body) return;
  try {
    await apiAddComment({
      pageId: _pageId, blockId: root.BlockId, body, scope: root.Scope,
      threadRootId: rootId,
    });
    await refresh();
  } catch (e) { toast('返信失敗: ' + (e as Error).message, 'err'); }
}

async function doResolve(rootId: string): Promise<void> {
  const root = findComment(Number(rootId));
  if (!root) return;
  try {
    await apiResolveThread(root, !(root.Resolved > 0));
    await refresh();
  } catch (e) { toast('解決状態の変更失敗: ' + (e as Error).message, 'err'); }
}

async function doEditSave(id: number): Promise<void> {
  if (!_pop) return;
  const c = findComment(id);
  if (!c) return;
  const ta = _pop.querySelector<HTMLTextAreaElement>(
    '.memola-cmt-item.editing[data-id="' + id + '"] .memola-cmt-edit-ta');
  const body = (ta?.value || '').trim();
  if (!body) return;
  try {
    await apiEditComment({ ...c, Body: body });
    _editingId = 0;
    await refresh();
  } catch (e) { toast('編集失敗: ' + (e as Error).message, 'err'); }
}

async function doDelete(id: number): Promise<void> {
  const c = findComment(id);
  if (!c) return;
  if (!confirm('このコメントを削除しますか?')) return;
  const thread = _threads.find((t) => t.root.Id === id);
  const hasReplies = !!thread && thread.replies.length > 0;
  try {
    await apiDeleteComment(c, hasReplies);
    await refresh();
  } catch (e) { toast('削除失敗: ' + (e as Error).message, 'err'); }
}

function positionPopover(): void {
  if (!_pop) return;
  const ed = getEd();
  let anchorRect: DOMRect;
  if (_popBlockId) {
    const block = ed.querySelector<HTMLElement>('[data-block-id="' + cssEscape(_popBlockId) + '"]');
    anchorRect = (block || ed).getBoundingClientRect();
  } else {
    anchorRect = ed.getBoundingClientRect();
  }
  const popW = _pop.offsetWidth || 320;
  let left = anchorRect.right + window.scrollX + 32;
  // If it would overflow right, place it to the left of the content.
  if (left + popW > window.scrollX + window.innerWidth) {
    left = Math.max(8 + window.scrollX, anchorRect.left + window.scrollX - popW - 16);
  }
  _pop.style.left = left + 'px';
  let top = anchorRect.top + window.scrollY;
  const popH = _pop.offsetHeight || 240;
  if (top + popH > window.scrollY + window.innerHeight) {
    top = Math.max(8 + window.scrollY, window.scrollY + window.innerHeight - popH - 8);
  }
  _pop.style.top = top + 'px';
}
