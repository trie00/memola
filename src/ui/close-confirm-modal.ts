// Custom replacement for `window.confirm()` used by the app-close path.
//
// Singleton modal with an 800 ms post-cancel cooldown so a follow-up
// ESC keystroke doesn't bounce the modal back open. The shared
// `confirmModal()` helper handles backdrop click, ESC capture-phase
// dismissal, and singleton enforcement; this module just adds the
// cooldown rule and the cancel/ok semantics.

import { escapeHtml } from '../lib/html-escape';
import { confirmModal } from './lib/modal';

const MODAL_ID = 'memola-close-confirm';

/** Wall-clock ms when the user last cancelled this modal. Used as a
 *  short cooldown so that "ESC to open close-confirm → ESC to cancel →
 *  ESC again immediately" doesn't bounce the modal back open. */
let _recentlyCancelledTs = 0;
const CANCEL_COOLDOWN_MS = 800;

export async function confirmClose(message: string): Promise<boolean> {
  if (Date.now() - _recentlyCancelledTs < CANCEL_COOLDOWN_MS) return false;

  const html =
    '<div class="memola-close-confirm-box">' +
      '<div class="memola-close-confirm-msg">' + escapeHtml(message).replace(/\n/g, '<br>') + '</div>' +
      '<div class="memola-close-confirm-btns">' +
        '<button class="memola-btn s" data-c="cancel" autofocus>キャンセル</button>' +
        '<button class="memola-btn p" data-c="ok">閉じる</button>' +
      '</div>' +
    '</div>';

  const ok = await confirmModal<boolean>({
    id: MODAL_ID,
    className: 'memola-close-confirm-md',
    contentHtml: html,
    buttons: { ok: true, cancel: false },
    cancelValue: false,
    focusSel: 'button[data-c="cancel"]',
    onMounted: (root) => {
      // Enter on this modal = "閉じる" (the primary action).
      // We add the listener here because the generic helper doesn't
      // know about Enter-as-confirm; only ESC-as-cancel.
      root.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          root.querySelector<HTMLElement>('button[data-c="ok"]')?.click();
        }
      });
    },
  });
  if (!ok) _recentlyCancelledTs = Date.now();
  return ok;
}
