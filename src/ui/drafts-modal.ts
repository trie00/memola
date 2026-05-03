// Drafts library modal (and the matching sidebar footer entry).
//
// Lists every saved draft from `draft-store`, grouped by origin page (with
// a separate 「削除されたページ」 group for orphans). Each draft can be
// restored, previewed, or deleted.
//
// Used as the user's safety net: when the conflict dialog 「相手の版を
// 表示」 silently snapshots the current edit, the snapshot lives here.

import { S } from '../state';
import { g } from './dom';
import { toast } from './ui-helpers';
import { mdToHtml } from '../lib/markdown';
import {
  listAll, deleteDraft, type Draft,
} from './draft-store';

const MODAL_ID = 'n365-drafts-md';
const SIDEBAR_BTN_ID = 'n365-drafts-btn';

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const same = d.toDateString() === now.toDateString();
  const yest = new Date(now); yest.setDate(now.getDate() - 1);
  const isYest = d.toDateString() === yest.toDateString();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  if (same) return hh + ':' + mm;
  if (isYest) return '昨日 ' + hh + ':' + mm;
  if (d.getFullYear() === now.getFullYear()) {
    return (d.getMonth() + 1) + '/' + d.getDate() + ' ' + hh + ':' + mm;
  }
  return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
}

interface Group {
  pageId: string;
  pageTitle: string;
  exists: boolean;
  drafts: Draft[];
}

function groupDrafts(): Group[] {
  const all = listAll();
  const map = new Map<string, Group>();
  for (const d of all) {
    const meta = S.meta.pages.find((p) => p.id === d.pageId);
    let g = map.get(d.pageId);
    if (!g) {
      g = {
        pageId: d.pageId,
        pageTitle: meta?.title || d.pageTitle || '(タイトル不明)',
        exists: !!meta && !meta.trashed,
        drafts: [],
      };
      map.set(d.pageId, g);
    }
    g.drafts.push(d);
  }
  // Sort: existing pages first, each group sorted by latest draft
  const groups = Array.from(map.values());
  groups.sort((a, b) => {
    if (a.exists !== b.exists) return a.exists ? -1 : 1;
    const at = Math.max(...a.drafts.map((d) => d.savedAt));
    const bt = Math.max(...b.drafts.map((d) => d.savedAt));
    return bt - at;
  });
  return groups;
}

function ensureModal(): HTMLElement {
  let el = document.getElementById(MODAL_ID);
  if (el) return el;
  el = document.createElement('div');
  el.id = MODAL_ID;
  el.className = 'n365-drafts-md';
  el.style.display = 'none';
  el.innerHTML =
    '<div class="n365-drafts-box">' +
      '<div class="n365-drafts-hd">' +
        '<span class="n365-drafts-title">📝 下書き</span>' +
        '<span class="n365-drafts-count"></span>' +
        '<button class="n365-drafts-close" title="閉じる">×</button>' +
      '</div>' +
      '<div class="n365-drafts-body"></div>' +
    '</div>';
  (document.getElementById('n365-overlay') || document.body).appendChild(el);

  el.addEventListener('click', (e) => {
    if (e.target === el) closeDraftsModal();
  });
  el.querySelector<HTMLElement>('.n365-drafts-close')?.addEventListener('click', closeDraftsModal);
  return el;
}

export function openDraftsModal(focusPageId?: string): void {
  const el = ensureModal();
  renderModalBody(el);
  el.style.display = 'flex';
  document.addEventListener('keydown', escClose, true);
  if (focusPageId) {
    setTimeout(() => {
      const grpEl = el.querySelector<HTMLElement>('.n365-drafts-group[data-page-id="' + focusPageId + '"]');
      grpEl?.scrollIntoView({ block: 'start' });
    }, 0);
  }
}

export function closeDraftsModal(): void {
  const el = document.getElementById(MODAL_ID);
  if (el) el.style.display = 'none';
  document.removeEventListener('keydown', escClose, true);
}

function escClose(e: KeyboardEvent): void {
  if (e.key === 'Escape') closeDraftsModal();
}

function renderModalBody(el: HTMLElement): void {
  const groups = groupDrafts();
  const total = groups.reduce((n, g) => n + g.drafts.length, 0);
  const countEl = el.querySelector<HTMLElement>('.n365-drafts-count');
  if (countEl) countEl.textContent = '(' + total + '件)';

  const body = el.querySelector<HTMLElement>('.n365-drafts-body');
  if (!body) return;
  if (groups.length === 0) {
    body.innerHTML = '<div class="n365-drafts-empty">下書きはありません。<br><span style="font-size:11px;color:var(--ink-3)">編集中に保存衝突した時、「相手の版を表示」を選ぶとここに自動保存されます。</span></div>';
    return;
  }

  body.innerHTML = groups.map((g) => {
    const head = '<div class="n365-drafts-grouphead">' +
      (g.exists ? '📄 ' : '🗑 ') +
      '<span class="n365-drafts-grouptitle">' + escapeHtml(g.pageTitle) +
      (!g.exists ? ' <span class="n365-drafts-orphan">(削除されたページ)</span>' : '') +
      '</span>' +
      '<span class="n365-drafts-groupcount">' + g.drafts.length + '件</span>' +
      '</div>';
    const items = g.drafts.map((d) => {
      const preview = (d.body || '').replace(/\s+/g, ' ').slice(0, 80);
      return '<div class="n365-drafts-item" data-key="' + escapeHtml(d.key) + '">' +
        '<div class="n365-drafts-itemhd">' +
          '<span class="n365-drafts-itemtime">' + formatTime(d.savedAt) + '</span>' +
          '<span class="n365-drafts-itemtitle">' + escapeHtml(d.title || '無題') + '</span>' +
        '</div>' +
        '<div class="n365-drafts-itemprev">' + escapeHtml(preview || '(本文なし)') + '</div>' +
        '<div class="n365-drafts-itemactions">' +
          (g.exists ? '<button class="n365-btn p" data-act="restore">復元</button>' : '') +
          '<button class="n365-btn s" data-act="preview">プレビュー</button>' +
          '<button class="n365-btn ghost" data-act="delete">削除</button>' +
        '</div>' +
      '</div>';
    }).join('');
    return '<div class="n365-drafts-group" data-page-id="' + g.pageId + '">' +
      head + items + '</div>';
  }).join('');

  // Wire item actions
  body.querySelectorAll<HTMLElement>('.n365-drafts-item').forEach((itemEl) => {
    const key = itemEl.dataset.key || '';
    itemEl.addEventListener('click', async (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>('button[data-act]');
      if (!btn) return;
      const act = btn.dataset.act;
      const draft = listAll().find((d) => d.key === key);
      if (!draft) return;
      if (act === 'preview') {
        showPreview(draft);
      } else if (act === 'delete') {
        if (!confirm('この下書きを削除します。よろしいですか?')) return;
        deleteDraft(key);
        renderModalBody(el);
        refreshDraftsBadge();
        toast('下書きを削除しました');
      } else if (act === 'restore') {
        await restoreDraft(draft);
      }
    });
  });
}

function showPreview(draft: Draft): void {
  const w = document.createElement('div');
  w.className = 'n365-drafts-md on';
  w.style.zIndex = '2147483649';
  w.innerHTML =
    '<div class="n365-drafts-box" style="max-width:720px">' +
      '<div class="n365-drafts-hd">' +
        '<span class="n365-drafts-title">プレビュー: ' + escapeHtml(draft.title || '無題') + '</span>' +
        '<button class="n365-drafts-close">×</button>' +
      '</div>' +
      '<div class="n365-drafts-preview">' + mdToHtml(draft.body) + '</div>' +
    '</div>';
  (document.getElementById('n365-overlay') || document.body).appendChild(w);
  const close = (): void => { w.remove(); };
  w.addEventListener('click', (e) => { if (e.target === w) close(); });
  w.querySelector<HTMLElement>('.n365-drafts-close')?.addEventListener('click', close);
}

async function restoreDraft(draft: Draft): Promise<void> {
  if (!confirm(
    '「' + (draft.title || '無題') + '」 を編集領域に復元します。\n\n' +
    '現在の編集中の本文がある場合は、念のため別の下書きとして自動保存します。\n' +
    '続行しますか？',
  )) return;

  // 1. If we're currently on a page with dirty edits, snapshot those first
  //    so the restore itself doesn't destroy them.
  if (S.dirty && S.currentId) {
    const { saveDraft } = await import('./draft-store');
    const ed = (await import('./dom')).getEd();
    const md = (await import('../lib/markdown')).htmlToMd(ed.innerHTML);
    const titleEl = g('ttl') as HTMLTextAreaElement;
    saveDraft({
      pageId: S.currentId,
      pageTitle: S.pages.find((p) => p.Id === S.currentId)?.Title || '無題',
      title: titleEl.value || '無題',
      body: md,
      reason: 'conflict-discarded',
    });
  }

  // 2. Navigate to the draft's origin page
  const { doSelect } = await import('./views');
  await doSelect(draft.pageId);

  // 3. Replace editor content with the draft body — keep dirty so user
  //    can review and decide whether to save.
  const { mdToHtml: m2h } = await import('../lib/markdown');
  const ed = (await import('./dom')).getEd();
  ed.innerHTML = m2h(draft.body);
  const titleEl = g('ttl') as HTMLTextAreaElement;
  if (draft.title) titleEl.value = draft.title;
  S.dirty = true;
  const { setSave } = await import('./ui-helpers');
  setSave('未保存');
  void import('./inline-table').then((m) => m.reattachInlineTables(ed));

  // 4. Remove the draft we just restored (it's now in the editor)
  deleteDraft(draft.key);
  refreshDraftsBadge();
  closeDraftsModal();
  toast('下書きを復元しました（保存はまだされていません）');
}

// ─── Sidebar footer entry ─────────────────────────────────────────────

/** Refresh the visibility / count badge of the sidebar drafts button.
 *  Called from anywhere that creates / consumes / deletes drafts. */
export function refreshDraftsBadge(): void {
  const btn = document.getElementById(SIDEBAR_BTN_ID);
  if (!btn) return;
  const n = listAll().length;
  if (n === 0) {
    btn.style.display = 'none';
    return;
  }
  btn.style.display = '';
  const cnt = btn.querySelector<HTMLElement>('.n365-drafts-badge-count');
  if (cnt) cnt.textContent = String(n);
}

/** Wire the sidebar entry's click → open drafts modal. Called once at boot. */
export function attachDraftsSidebar(): void {
  const btn = document.getElementById(SIDEBAR_BTN_ID);
  if (!btn) return;
  btn.addEventListener('click', () => openDraftsModal());
  refreshDraftsBadge();
}
