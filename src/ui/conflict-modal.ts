// Conflict resolution modal — Saver subscriber.
//
// Renders the「⚠ 他のユーザーがこのページを更新しました」dialog whenever
// `saver.state().kind === 'conflict'`. Buttons drive Saver methods:
//
//   統合する     → saver.startMerge()         (Saver → 'merging')
//   上書きで保存 → saver.forceOverwrite()     (Saver → 'idle')
//   相手の版    → save draft + acceptTheirs   (Saver → 'unloaded' → reload)
//   このままに   → saver.cancelConflict()     (Saver → 'dirty')
//
// The Saver state is the single source of truth — at most one conflict
// modal exists per Saver instance.

import { S } from '../state';
import { escapeHtml } from '../lib/html-escape';
import { saver, type SaverState } from '../lib/saver';
import { toast } from './ui-helpers';
import { subscriberModal } from './lib/modal';

const MODAL_ID = 'memola-conflict-md';

const _modal = subscriberModal({
  id: MODAL_ID,
  className: 'memola-conflict-md',
  onEscape: () => saver.cancelConflict(),
  onBackdropClick: () => saver.cancelConflict(),
});

let _attached = false;

export function attachConflictModal(): void {
  if (_attached) return;
  _attached = true;
  saver.subscribe(onState);
}

function onState(s: SaverState): void {
  if (s.kind !== 'conflict') {
    _modal.close();
    return;
  }
  // 同じリモート更新に反応した「🔔更新されました」バナーが既に出ていたら消す
  // (このモーダルが上位の通知。二重表示を防ぐ)。
  document.getElementById('memola-sync-banner')?.classList.remove('on');
  render(s.conflict.pageId, s.conflict.ours.title);
}

function render(pageId: string, fallbackTitle: string): void {
  // Idempotent: subscriber re-emits frequently. If this conflict is
  // already on screen, do nothing.
  if (_modal.isOpen()) return;

  const page = S.pages.find((p) => p.Id === pageId);
  const pageTitle = page?.Title || fallbackTitle || '無題';

  _modal.render(
    '<div class="memola-conflict-box">' +
      '<div class="memola-conflict-title">⚠ 他のユーザーがこのページを更新しました</div>' +
      '<div class="memola-conflict-page">「' + escapeHtml(pageTitle) + '」</div>' +
      '<div class="memola-conflict-msg">' +
        '同じページを別の人が先に編集していました。<br>' +
        'どう扱いますか？' +
      '</div>' +
      '<div class="memola-conflict-btns">' +
        '<button class="memola-btn p" data-choice="merge" title="自分の編集と相手の編集を 3-way マージで結合します。同じ箇所が両方変更されてた場合のみ選択を求められます">' +
          '🔀 統合する <span class="memola-conflict-sub">(推奨 — 双方の編集を融合)</span>' +
        '</button>' +
        '<button class="memola-btn s" data-choice="overwrite" title="自分の編集内容で SP の版を上書きします (相手の変更は SP の履歴から復元できます)">' +
          '上書きで保存 <span class="memola-conflict-sub">(相手の編集は破棄)</span>' +
        '</button>' +
        '<button class="memola-btn s" data-choice="reload" title="自分の編集内容を下書きに保存してから、相手の最新版を読み込みます">' +
          '相手の版を表示 <span class="memola-conflict-sub">(自分の編集は下書きに保存)</span>' +
        '</button>' +
        '<button class="memola-btn ghost" data-choice="cancel" title="ダイアログを閉じます。あとで判断できます">' +
          'このままにする' +
        '</button>' +
      '</div>' +
      '<div class="memola-conflict-foot">' +
        '失った変更は<b>「📝 下書き」</b> または <b>SP のバージョン履歴</b> から復元可能です。' +
      '</div>' +
    '</div>',
    (root) => {
      root.querySelectorAll<HTMLButtonElement>('button[data-choice]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const choice = btn.dataset.choice as
            | 'merge' | 'overwrite' | 'reload' | 'cancel';
          void onChoice(choice, pageId, pageTitle);
        });
      });
    },
  );
}

async function onChoice(
  choice: 'merge' | 'overwrite' | 'reload' | 'cancel',
  pageId: string,
  pageTitle: string,
): Promise<void> {
  switch (choice) {
    case 'merge':
      saver.startMerge();
      return;

    case 'overwrite': {
      const r = await saver.forceOverwrite();
      if (r.ok) {
        toast('自分の版で上書きしました');
        void import('./drafts-modal').then((m) => m.refreshDraftsBadge?.());
      } else if (!r.ok && r.reason === 'error') {
        toast('上書き失敗: ' + (r.error?.message || ''), 'err');
      }
      return;
    }

    case 'reload': {
      const st = saver.state();
      if (st.kind !== 'conflict') return;
      const c = st.conflict;
      try {
        const { saveDraft } = await import('./draft-store');
        saveDraft({
          pageId: c.pageId,
          pageTitle,
          title: c.ours.title,
          body: c.ours.body,
          reason: 'conflict-discarded',
          baseBody: c.base.body,
          baseEtag: c.base.etag,
        });
      } catch { /* draft store failure shouldn't block reload */ }
      saver.acceptTheirs();
      toast('自分の編集は下書きに保存しました（サイドバー「📝 下書き」から復元可）');
      void import('./drafts-modal').then((m) => m.refreshDraftsBadge?.());
      const { doSelect } = await import('./views');
      await doSelect(pageId);
      return;
    }

    case 'cancel':
      saver.cancelConflict();
      return;
  }
}
