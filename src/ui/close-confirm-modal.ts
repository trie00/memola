// Custom replacement for `window.confirm()` used by the app-close path.
//
// Native `confirm()` has two issues that bit us repeatedly:
//   1. The ESC press that dismisses the OS-level dialog can also bubble
//      back into the page's keydown listener. Once any stale listener is
//      attached (zombie instances from prior bookmarklet cycles, or any
//      future regression), each of those listeners runs its own
//      `confirm()` sequentially — so the user has to cancel N times for
//      a single ESC.
//   2. Browsers serialise `window.confirm()` calls per task; multiple
//      callers on the same keystroke each open their own dialog one
//      after another. There's no way to "absorb" the second call.
//
// This module solves both by:
//   - Singleton: a second `confirmClose()` while the modal is already
//     visible resolves immediately to `false`, no extra UI.
//   - Capture-phase ESC handler with `stopPropagation()` so any other
//     keydown listener at the document level — including zombies —
//     never sees the ESC keystroke, and therefore can't fire its own
//     close-confirm.

import { escapeHtml } from '../lib/html-escape';

const MODAL_ID = 'memola-close-confirm';

/** Wall-clock ms when the user last cancelled this modal. Used as a
 *  short cooldown so that "ESC to open close-confirm → ESC to cancel →
 *  ESC again immediately" doesn't bounce the modal back open. The
 *  capture-phase ESC handler inside the modal stops one keystroke from
 *  reaching the global onKey, but a *second* keystroke (auto-repeat or a
 *  fresh press 50-200ms later) hits the global handler with no modal
 *  attached, so it would re-open. The cooldown swallows that. */
let _recentlyCancelledTs = 0;
const CANCEL_COOLDOWN_MS = 800;

/** Promise that resolves to true (close) or false (cancel). Singleton:
 *  if already open, the second caller gets `false` immediately. Also
 *  rejects (resolves false) if called within CANCEL_COOLDOWN_MS of a
 *  previous cancel — see `_recentlyCancelledTs` above. */
export function confirmClose(message: string): Promise<boolean> {
  if (Date.now() - _recentlyCancelledTs < CANCEL_COOLDOWN_MS) {
    return Promise.resolve(false);
  }
  if (document.getElementById(MODAL_ID)) return Promise.resolve(false);

  return new Promise<boolean>((resolve) => {
    const overlay = document.getElementById('memola-overlay') || document.body;

    const back = document.createElement('div');
    back.id = MODAL_ID;
    back.className = 'memola-close-confirm-md on';
    back.innerHTML =
      '<div class="memola-close-confirm-box">' +
        '<div class="memola-close-confirm-msg">' + escapeHtml(message).replace(/\n/g, '<br>') + '</div>' +
        '<div class="memola-close-confirm-btns">' +
          '<button class="memola-btn s" data-c="cancel" autofocus>キャンセル</button>' +
          '<button class="memola-btn p" data-c="ok">閉じる</button>' +
        '</div>' +
      '</div>';
    overlay.appendChild(back);

    let settled = false;
    const finish = (ok: boolean): void => {
      if (settled) return;
      settled = true;
      // Stamp cancel time so a follow-up ESC within the cooldown window
      // doesn't immediately re-open the modal.
      if (!ok) _recentlyCancelledTs = Date.now();
      cleanup();
      resolve(ok);
    };
    const cleanup = (): void => {
      back.remove();
      document.removeEventListener('keydown', onKey, true);
    };
    function onKey(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        // Capture-phase + stopPropagation: any global onKey listener
        // (including zombies from earlier bookmarklet cycles) won't see
        // this ESC, so they can't pop their own confirm dialog.
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        finish(false);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        finish(true);
      }
    }
    document.addEventListener('keydown', onKey, true);

    back.addEventListener('click', (e) => {
      const t = e.target as HTMLElement;
      if (t === back) { finish(false); return; }    // backdrop click → cancel
      const btn = t.closest<HTMLElement>('button[data-c]');
      if (!btn) return;
      finish(btn.dataset.c === 'ok');
    });

    // Focus the cancel button so Enter/Space does the safe thing by default.
    const cancelBtn = back.querySelector<HTMLButtonElement>('button[data-c="cancel"]');
    cancelBtn?.focus();
  });
}
