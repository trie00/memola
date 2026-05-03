// 3-button conflict resolution dialog.
//
// Replaces the old `confirm()` dialog (OK = overwrite / Cancel = discard).
// Returns a typed promise so the caller can branch on the user's choice:
//
//   const choice = await showConflictModal({ pageTitle: 'プロジェクトA' });
//   switch (choice) {
//     case 'overwrite':  await forceSave(); break;
//     case 'reload':     await saveDraftAndReload(); break;
//     case 'cancel':     /* user keeps editing, decides later */ break;
//   }

import { escapeHtml } from '../lib/html-escape';

export type ConflictChoice = 'overwrite' | 'reload' | 'cancel';

export function showConflictModal(opts: {
  pageTitle: string;
}): Promise<ConflictChoice> {
  return new Promise((resolve) => {
    const overlay = document.getElementById('memola-overlay') || document.body;

    const back = document.createElement('div');
    back.className = 'memola-conflict-md on';
    back.innerHTML =
      '<div class="memola-conflict-box">' +
        '<div class="memola-conflict-title">⚠ 他のユーザーがこのページを更新しました</div>' +
        '<div class="memola-conflict-page">「' + escapeHtml(opts.pageTitle || '無題') + '」</div>' +
        '<div class="memola-conflict-msg">' +
          '同じページを別の人が先に編集していました。<br>' +
          'どう扱いますか？' +
        '</div>' +
        '<div class="memola-conflict-btns">' +
          '<button class="memola-btn p" data-choice="overwrite" title="自分の編集内容で SP の版を上書きします (相手の変更は SP の履歴から復元できます)">' +
            '上書きで保存' +
          '</button>' +
          '<button class="memola-btn s" data-choice="reload" title="自分の編集内容を下書きに保存してから、相手の最新版を読み込みます">' +
            '相手の版を表示<br><span class="memola-conflict-sub">(自分の編集は下書きに保存)</span>' +
          '</button>' +
          '<button class="memola-btn ghost" data-choice="cancel" title="ダイアログを閉じます。あとで判断できます">' +
            'このままにする' +
          '</button>' +
        '</div>' +
        '<div class="memola-conflict-foot">' +
          '失った変更は<b>「📝 下書き」</b> または <b>SP のバージョン履歴</b> から復元可能です。' +
        '</div>' +
      '</div>';
    overlay.appendChild(back);

    function done(c: ConflictChoice): void {
      cleanup();
      resolve(c);
    }
    function cleanup(): void {
      back.remove();
      document.removeEventListener('keydown', onKey, true);
    }
    function onKey(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        done('cancel');
      }
    }
    document.addEventListener('keydown', onKey, true);
    back.addEventListener('click', (e) => {
      const t = e.target as HTMLElement;
      // Click on backdrop (not box) → cancel
      if (t === back) { done('cancel'); return; }
      const btn = t.closest<HTMLElement>('button[data-choice]');
      if (btn) {
        const c = btn.dataset.choice as ConflictChoice;
        done(c);
      }
    });
  });
}

