// Conflict resolution modal for restoring a daily note when another
// daily note for the same date already exists.
//
// Shown by `db-history.ts deleteRowWithUndo`'s undo path — when the
// user undoes a daily-note delete and a different note for the same
// date has been created in the meantime. Three choices:
//   - 'overwrite': replace the existing note with the restored one
//   - 'as-page':   restore as a standalone (regular) page, leaving the
//                  existing daily note alone — uses OriginDailyDate so
//                  the user can later 「デイリーノートに戻す」 if they
//                  want to merge them
//   - 'cancel':    do nothing, abandon the undo

import { escapeHtml } from '../lib/html-escape';

export type DailyRestoreChoice = 'overwrite' | 'as-page' | 'cancel';

export function confirmDailyRestoreConflict(opts: {
  date: string;
  restoredTitle: string;
  existingTitle: string;
}): Promise<DailyRestoreChoice> {
  return new Promise((resolve) => {
    const overlay = document.getElementById('memola-overlay') || document.body;

    const back = document.createElement('div');
    back.className = 'memola-conflict-md on';
    back.innerHTML =
      '<div class="memola-conflict-box">' +
        '<div class="memola-conflict-title">⚠ ' + escapeHtml(opts.date) + ' のデイリーノートが既に存在します</div>' +
        '<div class="memola-conflict-page">復元しようとしているノート: 「' + escapeHtml(opts.restoredTitle || '無題') + '」<br>' +
          '現在のノート: 「' + escapeHtml(opts.existingTitle || '無題') + '」</div>' +
        '<div class="memola-conflict-msg">' +
          '同じ日付のデイリーノートを 2 つ持つことはできません。<br>' +
          'どう処理しますか?' +
        '</div>' +
        '<div class="memola-conflict-btns">' +
          '<button class="memola-btn p" data-c="overwrite" title="現在のノートを削除して、復元するノートで置き換えます">' +
            '上書きで復元<br><span class="memola-conflict-sub">(現在のノートは削除)</span>' +
          '</button>' +
          '<button class="memola-btn s" data-c="as-page" title="復元するノートを通常ページとして作成します。現在のデイリーノートはそのまま残ります">' +
            '通常ページとして復元<br><span class="memola-conflict-sub">(両方残す)</span>' +
          '</button>' +
          '<button class="memola-btn ghost" data-c="cancel" title="復元せずに現在の状態を維持します">' +
            'キャンセル' +
          '</button>' +
        '</div>' +
        '<div class="memola-conflict-foot">' +
          '「通常ページとして復元」を選ぶと、後から「デイリーノートに戻す」操作でマージし直せます。' +
        '</div>' +
      '</div>';
    overlay.appendChild(back);

    function done(c: DailyRestoreChoice): void {
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
        e.stopImmediatePropagation();
        done('cancel');
      }
    }
    document.addEventListener('keydown', onKey, true);
    back.addEventListener('click', (e) => {
      const t = e.target as HTMLElement;
      if (t === back) { done('cancel'); return; }
      const btn = t.closest<HTMLElement>('button[data-c]');
      if (btn) done(btn.dataset.c as DailyRestoreChoice);
    });
  });
}
