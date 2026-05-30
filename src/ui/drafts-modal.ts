// Drafts library modal (and the matching sidebar footer entry).
//
// Lists every saved draft from `draft-store`, grouped by origin page (with
// a separate 「削除されたページ」 group for orphans). Each draft can be
// restored, previewed, or deleted.
//
// Used as the user's safety net: when the conflict dialog 「相手の版を
// 表示」 silently snapshots the current edit, the snapshot lives here.

import { S, type Page } from '../state';
import { g } from './dom';
import { toast } from './ui-helpers';
import { mdToBlocks, blocksToMd } from '../lib/blocks-md';
import { mdToHtml } from '../lib/blocks-html';
import {
  listAll, deleteDraft, type Draft,
} from './draft-store';

import { escapeHtml } from '../lib/html-escape';
import { formatRelativeTime } from '../lib/date-utils';
import { subscriberModal } from './lib/modal';
import { metaById } from '../lib/page-store';

const MODAL_ID = 'memola-drafts-md';
const SIDEBAR_BTN_ID = 'memola-drafts-btn';

const _modal = subscriberModal({
  id: MODAL_ID,
  className: 'memola-drafts-md',
  onEscape: () => closeDraftsModal(),
  onBackdropClick: () => closeDraftsModal(),
});

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
    const meta = metaById(d.pageId);
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

/** SP-stored drafts ("下書きとして複製" results, owned by current user). */
function spDrafts(): Page[] {
  return S.pages.filter((p) => p.IsDraft);
}

/** Total user-visible drafts: SP + localStorage. */
function totalDraftCount(): number {
  return spDrafts().length + listAll().length;
}

export function openDraftsModal(focusPageId?: string): void {
  // Render with the chrome — `_modal.render` mounts the DOM and
  // installs ESC + backdrop listeners. The body re-render lives in
  // its own helper (re-invoked after each mutation: delete / restore /
  // discard) without unmounting the modal.
  _modal.render(
    '<div class="memola-drafts-box">' +
      '<div class="memola-drafts-hd">' +
        '<span class="memola-drafts-title">📝 下書き</span>' +
        '<span class="memola-drafts-count"></span>' +
        '<button class="memola-drafts-close" title="閉じる">×</button>' +
      '</div>' +
      '<div class="memola-drafts-body"></div>' +
    '</div>',
    (root) => {
      root.querySelector<HTMLElement>('.memola-drafts-close')
        ?.addEventListener('click', closeDraftsModal);
      renderModalBody(root);
      if (focusPageId) {
        setTimeout(() => {
          const grpEl = root.querySelector<HTMLElement>(
            '.memola-drafts-group[data-page-id="' + focusPageId + '"]',
          );
          grpEl?.scrollIntoView({ block: 'start' });
        }, 0);
      }
    },
  );
}

export function closeDraftsModal(): void {
  _modal.close();
}

function renderModalBody(el: HTMLElement): void {
  const sp = spDrafts();
  const groups = groupDrafts();
  const total = sp.length + groups.reduce((n, g) => n + g.drafts.length, 0);
  const countEl = el.querySelector<HTMLElement>('.memola-drafts-count');
  if (countEl) countEl.textContent = '(' + total + '件)';

  const body = el.querySelector<HTMLElement>('.memola-drafts-body');
  if (!body) return;
  if (total === 0) {
    body.innerHTML = '<div class="memola-drafts-empty">下書きはありません。<br><span style="font-size:11px;color:var(--ink-3)">ページメニューの「✏️ 下書きとして複製」、または保存衝突時の「相手の版を表示」で下書きが作成されます。</span></div>';
    return;
  }

  // ── SP drafts (full-page drafts created via 「下書きとして複製」) ──
  let spHtml = '';
  if (sp.length > 0) {
    spHtml = '<div class="memola-drafts-section">' +
      '<div class="memola-drafts-section-hd">' +
        '<span>📝 ページ下書き</span>' +
        '<span class="memola-drafts-section-sub">(編集中の複製ページ)</span>' +
      '</div>';
    spHtml += sp.map((p) => {
      const meta = metaById(p.Id);
      const originId = meta?.originPageId || '';
      const origin = originId ? metaById(originId) : null;
      const originTitle = origin?.title || '(原本ページ不明)';
      const exists = !!origin && !origin.trashed;
      return '<div class="memola-drafts-item memola-drafts-spitem" data-page-id="' + escapeHtml(p.Id) + '">' +
        '<div class="memola-drafts-itemhd">' +
          '<span class="memola-drafts-itemtitle">' + escapeHtml(p.Title || '無題') + '</span>' +
        '</div>' +
        '<div class="memola-drafts-itemprev">原本: ' +
          (exists
            ? escapeHtml(originTitle)
            : '<span class="memola-drafts-orphan">' + escapeHtml(originTitle) + ' (削除済み)</span>'
          ) +
        '</div>' +
        '<div class="memola-drafts-itemactions">' +
          '<button class="memola-btn p" data-act="open">開く</button>' +
          (exists
            ? '<button class="memola-btn s" data-act="apply">原本に適用</button>'
            : '<button class="memola-btn s" data-act="promote">新規ページとして保存</button>') +
          '<button class="memola-btn ghost" data-act="discard">破棄</button>' +
        '</div>' +
      '</div>';
    }).join('');
    spHtml += '</div>';
  }

  // ── Local drafts (auto-saved from save conflicts) ──
  let localHtml = '';
  if (groups.length > 0) {
    localHtml = '<div class="memola-drafts-section">' +
      '<div class="memola-drafts-section-hd">' +
        '<span>💾 退避された編集</span>' +
        '<span class="memola-drafts-section-sub">(保存衝突時に退避)</span>' +
      '</div>';
    localHtml += groups.map((grp) => {
      const head = '<div class="memola-drafts-grouphead">' +
        (grp.exists ? '📄 ' : '🗑 ') +
        '<span class="memola-drafts-grouptitle">' + escapeHtml(grp.pageTitle) +
        (!grp.exists ? ' <span class="memola-drafts-orphan">(削除されたページ)</span>' : '') +
        '</span>' +
        '<span class="memola-drafts-groupcount">' + grp.drafts.length + '件</span>' +
        '</div>';
      const items = grp.drafts.map((d) => {
        const preview = (d.body || '').replace(/\s+/g, ' ').slice(0, 80);
        return '<div class="memola-drafts-item" data-key="' + escapeHtml(d.key) + '">' +
          '<div class="memola-drafts-itemhd">' +
            '<span class="memola-drafts-itemtime">' + formatRelativeTime(d.savedAt) + '</span>' +
            '<span class="memola-drafts-itemtitle">' + escapeHtml(d.title || '無題') + '</span>' +
          '</div>' +
          '<div class="memola-drafts-itemprev">' + escapeHtml(preview || '(本文なし)') + '</div>' +
          '<div class="memola-drafts-itemactions">' +
            // Merge UI is only meaningful when the origin page still exists.
            // Without it, "統合" is the recommended path — the user gets a
            // 3-way diff with auto-merge instead of having to manually
            // copy-paste between two windows.
            (grp.exists ? '<button class="memola-btn p" data-act="merge">統合 (3-way)</button>' : '') +
            (grp.exists ? '<button class="memola-btn s" data-act="restore">そのまま復元</button>' : '') +
            '<button class="memola-btn s" data-act="preview">プレビュー</button>' +
            '<button class="memola-btn ghost" data-act="delete">削除</button>' +
          '</div>' +
        '</div>';
      }).join('');
      return '<div class="memola-drafts-group" data-page-id="' + grp.pageId + '">' +
        head + items + '</div>';
    }).join('');
    localHtml += '</div>';
  }

  body.innerHTML = spHtml + localHtml;

  // Wire SP-draft actions
  body.querySelectorAll<HTMLElement>('.memola-drafts-spitem').forEach((itemEl) => {
    const draftId = itemEl.dataset.pageId || '';
    itemEl.addEventListener('click', async (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>('button[data-act]');
      if (!btn) return;
      const act = btn.dataset.act;
      if (act === 'open') {
        closeDraftsModal();
        const { doSelect } = await import('./views');
        await doSelect(draftId);
      } else if (act === 'apply') {
        if (!confirm('下書きを原本に適用します (原本の現在の本文は SP のバージョン履歴に残ります)。続行しますか?')) return;
        try {
          const { apiApplyDraftToOrigin, apiGetPages } = await import('../api/pages');
          const originId = await apiApplyDraftToOrigin(draftId);
          await apiGetPages();
          const { renderTree } = await import('./tree');
          renderTree();
          renderModalBody(el);
          refreshDraftsBadge();
          closeDraftsModal();
          const { doSelect } = await import('./views');
          await doSelect(originId);
          toast('原本に適用しました');
        } catch (err) {
          toast('適用失敗: ' + (err as Error).message, 'err');
        }
      } else if (act === 'promote') {
        if (!confirm('原本が削除されているため、この下書きを新規ページとして保存します。続行しますか?')) return;
        try {
          const { apiPromoteDraftToPage, apiGetPages } = await import('../api/pages');
          const newId = await apiPromoteDraftToPage(draftId);
          await apiGetPages();
          const { renderTree } = await import('./tree');
          renderTree();
          renderModalBody(el);
          refreshDraftsBadge();
          closeDraftsModal();
          const { doSelect } = await import('./views');
          await doSelect(newId);
          toast('新規ページとして保存しました');
        } catch (err) {
          toast('保存失敗: ' + (err as Error).message, 'err');
        }
      } else if (act === 'discard') {
        if (!confirm('この下書きを完全に削除します。元に戻せません。よろしいですか?')) return;
        try {
          const { apiDeletePage, apiGetPages } = await import('../api/pages');
          await apiDeletePage(draftId);
          await apiGetPages();
          const { renderTree } = await import('./tree');
          renderTree();
          renderModalBody(el);
          refreshDraftsBadge();
          toast('下書きを破棄しました');
        } catch (err) {
          toast('破棄失敗: ' + (err as Error).message, 'err');
        }
      }
    });
  });

  // Wire local-draft actions
  body.querySelectorAll<HTMLElement>('.memola-drafts-item:not(.memola-drafts-spitem)').forEach((itemEl) => {
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
      } else if (act === 'merge') {
        // 3-way merge UI — close drafts modal so the merge modal has
        // the user's full attention. The Saver fetches the current SP
        // body itself; the merge-modal subscriber renders when the
        // Saver transitions to 'merging'.
        closeDraftsModal();
        const { saver } = await import('../lib/saver');
        await saver.beginExternalMerge({
          pageId: draft.pageId,
          pageTitle: draft.pageTitle,
          title: draft.title,
          ourBody: draft.body,
          baseBody: draft.baseBody || '',
          baseEtag: draft.baseEtag || '',
        });
      }
    });
  });
}

function showPreview(draft: Draft): void {
  const w = document.createElement('div');
  w.className = 'memola-drafts-md on';
  w.style.zIndex = '2147483649';
  w.innerHTML =
    '<div class="memola-drafts-box" style="max-width:720px">' +
      '<div class="memola-drafts-hd">' +
        '<span class="memola-drafts-title">プレビュー: ' + escapeHtml(draft.title || '無題') + '</span>' +
        '<button class="memola-drafts-close">×</button>' +
      '</div>' +
      '<div class="memola-drafts-preview">' + mdToHtml(draft.body) + '</div>' +
    '</div>';
  (document.getElementById('memola-overlay') || document.body).appendChild(w);
  const close = (): void => { w.remove(); };
  w.addEventListener('click', (e) => { if (e.target === w) close(); });
  w.querySelector<HTMLElement>('.memola-drafts-close')?.addEventListener('click', close);
}

async function restoreDraft(draft: Draft): Promise<void> {
  if (!confirm(
    '「' + (draft.title || '無題') + '」 を編集領域に復元します。\n\n' +
    '現在の編集中の本文がある場合は、念のため別の下書きとして自動保存します。\n' +
    '続行しますか？',
  )) return;

  // 1. If we're currently on a page with dirty edits, snapshot those
  //    first so the restore itself doesn't destroy them. Read blocks
  //    directly from editor2 (canonical source of truth) and serialise
  //    to markdown for the draft body.
  const { saver } = await import('../lib/saver');
  if (saver.isDirty() && S.currentId) {
    const { saveDraft } = await import('./draft-store');
    const { getBlocks } = await import('./editor2/editor2-bridge');
    const md = blocksToMd(getBlocks());
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

  // 3. Replace editor content with the draft body via the
  //    controlled-rendering bridge — keep dirty so the user can review
  //    and decide whether to save. Going through `loadBlocks` (instead
  //    of the legacy `ed.innerHTML = mdToHtml(...)` path) is what makes
  //    table cells / page-link chips / etc. fully interactive after
  //    restore.
  const { loadBlocks } = await import('./editor2/editor2-bridge');
  loadBlocks(mdToBlocks(draft.body));
  const titleEl = g('ttl') as HTMLTextAreaElement;
  if (draft.title) titleEl.value = draft.title;
  // Push the draft content into the Saver — it transitions to 'dirty'
  // (since the editor diverges from the freshly-loaded base), which
  // updates the status bar via saver-bridge.
  const { schedSave: nudgeSaver } = await import('./save-control');
  nudgeSaver();

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
  const n = totalDraftCount();
  if (n === 0) {
    btn.style.display = 'none';
    return;
  }
  btn.style.display = '';
  const cnt = btn.querySelector<HTMLElement>('.memola-drafts-badge-count');
  if (cnt) cnt.textContent = String(n);
}

/** Wire the sidebar entry's click → open drafts modal. Called once at boot. */
export function attachDraftsSidebar(): void {
  const btn = document.getElementById(SIDEBAR_BTN_ID);
  if (!btn) return;
  btn.addEventListener('click', () => openDraftsModal());
  refreshDraftsBadge();
}
