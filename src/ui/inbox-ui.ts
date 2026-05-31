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
  void refreshInboxBadge();
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
  await apiMarkMentionRead(id).catch(() => undefined);
  closeInbox();
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

/** Update the sidebar badge with the unread count (hidden when 0). */
export async function refreshInboxBadge(): Promise<void> {
  let n = 0;
  try { n = await apiUnreadMentionCount(); } catch { n = 0; }
  const badge = g('inbox-btn')?.querySelector<HTMLElement>('.memola-inbox-badge-count');
  if (!badge) return;
  badge.textContent = n > 0 ? '(' + n + ')' : '';
}
