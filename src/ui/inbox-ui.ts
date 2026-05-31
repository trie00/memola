// Inbox UI — the sidebar 「📥 受信トレイ」 entry + its modal listing the
// current user's @mentions. Clicking a mention navigates to the page,
// opens the comments pane, and flashes the referenced comment. Read items
// auto-expire (handled by apiListInbox); the badge shows the unread count.

import { g } from './dom';
import { escapeHtml } from '../lib/html-escape';
import { formatRelativeTime } from '../lib/date-utils';
import {
  apiListInbox, apiUnreadMentionCount, apiMarkMentionRead, type InboxRow,
} from '../api/mentions';

const MODAL_ID = 'memola-inbox-md';
let _attached = false;

export function attachInbox(): void {
  if (_attached) return;
  _attached = true;
  document.getElementById('memola-inbox-btn')?.addEventListener('click', openInbox);
  document.getElementById('memola-inbox-close')?.addEventListener('click', closeInbox);
  document.getElementById('memola-inbox-readall')?.addEventListener('click', () => void markAllRead());
  const md = document.getElementById(MODAL_ID);
  md?.addEventListener('click', (e) => { if (e.target === md) closeInbox(); });
  void pollMentions();   // seed seen-set + initial badge
}

export function closeInbox(): void {
  document.getElementById(MODAL_ID)?.classList.remove('on');
}

let _rows: InboxRow[] = [];

export async function openInbox(): Promise<void> {
  const md = document.getElementById(MODAL_ID);
  if (md) md.classList.add('on');
  await renderInbox();
}

async function renderInbox(): Promise<void> {
  const list = document.getElementById('memola-inbox-list');
  if (!list) return;
  list.innerHTML = '<div class="memola-inbox-empty">読み込み中…</div>';
  try {
    _rows = await apiListInbox();
  } catch { _rows = []; }
  if (_rows.length === 0) {
    list.innerHTML = '<div class="memola-inbox-empty">メンションはありません。</div>';
    return;
  }
  list.innerHTML = _rows.map((r) => {
    const when = r.Created ? formatRelativeTime(Date.parse(r.Created)) : '';
    return '<div class="memola-inbox-item' + (r.Read ? ' read' : '') + '" data-id="' + r.Id + '">' +
      (r.Read ? '' : '<span class="memola-inbox-dot"></span>') +
      '<div class="memola-inbox-main">' +
        '<div class="memola-inbox-line1">' +
          '<span class="memola-inbox-actor">' + escapeHtml(r.ActorName || '誰か') + '</span>' +
          ' があなたをメンション' +
          '<span class="memola-inbox-time">' + escapeHtml(when) + '</span>' +
        '</div>' +
        '<div class="memola-inbox-page">' + escapeHtml(r.PageTitle || '(ページ)') + '</div>' +
        '<div class="memola-inbox-snippet">' + escapeHtml(r.Snippet || '') + '</div>' +
      '</div>' +
    '</div>';
  }).join('');
  list.querySelectorAll<HTMLElement>('.memola-inbox-item').forEach((el) => {
    el.addEventListener('click', () => void onItemClick(Number(el.dataset.id)));
  });
}

async function onItemClick(id: number): Promise<void> {
  const row = _rows.find((r) => r.Id === id);
  if (!row) return;
  closeInbox();
  await navigateToMention(row);
}

/** Mark a mention read and jump to its page + comment. Shared by the inbox
 *  list and the live toast. */
export async function navigateToMention(row: InboxRow): Promise<void> {
  await apiMarkMentionRead(row.Id).catch(() => undefined);
  _seen.add(row.Id);
  void refreshInboxBadge();
  try {
    const { doSelect } = await import('./views');
    await doSelect(row.PageId);
    const cm = await import('./comments-ui');
    cm.focusComment(row.PageId, row.CommentId);
  } catch { /* navigation best-effort */ }
}

async function markAllRead(): Promise<void> {
  await Promise.all(_rows.filter((r) => !r.Read).map((r) => apiMarkMentionRead(r.Id)));
  await renderInbox();
  void refreshInboxBadge();
}

function setBadge(n: number): void {
  const badge = g('inbox-btn')?.querySelector<HTMLElement>('.memola-inbox-badge-count');
  if (badge) badge.textContent = n > 0 ? '(' + n + ')' : '';
}

/** Update the sidebar badge with the unread count (hidden when 0). */
export async function refreshInboxBadge(): Promise<void> {
  try { setBadge(await apiUnreadMentionCount()); } catch { /* ignore */ }
}

// ── Live mention toasts ──────────────────────────────────

const _seen = new Set<number>();
let _seenInit = false;

/** Poll the inbox: update the badge and toast any NEW unread mentions that
 *  arrived while the tool is open. The first run only seeds the seen-set
 *  (existing unread don't toast — they're already in the inbox). */
export async function pollMentions(): Promise<void> {
  let rows: InboxRow[];
  try { rows = await apiListInbox(); } catch { return; }
  const unread = rows.filter((r) => !r.Read);
  setBadge(unread.length);
  if (!_seenInit) { unread.forEach((r) => _seen.add(r.Id)); _seenInit = true; return; }
  for (const r of unread) {
    if (_seen.has(r.Id)) continue;
    _seen.add(r.Id);
    showMentionToast(r);
  }
}

function toastContainer(): HTMLElement {
  let c = document.getElementById('memola-mention-toasts');
  if (!c) {
    c = document.createElement('div');
    c.id = 'memola-mention-toasts';
    (document.getElementById('memola-overlay') || document.body).appendChild(c);
  }
  return c;
}

function showMentionToast(row: InboxRow): void {
  const el = document.createElement('div');
  el.className = 'memola-mention-toast';
  el.innerHTML =
    '<div class="memola-mention-toast-hd">💬 ' + escapeHtml(row.ActorName || '誰か') + ' があなたをメンション</div>' +
    '<div class="memola-mention-toast-page">' + escapeHtml(row.PageTitle || '(ページ)') + '</div>' +
    (row.Snippet ? '<div class="memola-mention-toast-snippet">' + escapeHtml(row.Snippet) + '</div>' : '') +
    '<button class="memola-mention-toast-x" title="閉じる">×</button>';
  const dismiss = (): void => { el.classList.remove('on'); setTimeout(() => el.remove(), 200); };
  el.querySelector('.memola-mention-toast-x')?.addEventListener('click', (e) => { e.stopPropagation(); dismiss(); });
  el.addEventListener('click', () => { dismiss(); void navigateToMention(row); });
  toastContainer().appendChild(el);
  requestAnimationFrame(() => el.classList.add('on'));
  setTimeout(dismiss, 9000);
}
