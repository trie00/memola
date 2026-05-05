// Page-menu popover (the "..." button at the top-right of a page).
// Owns its own positioning + outside-click dismiss state. Wired by
// `wiring.ts` from the page-menu button click handler.

import { S } from '../state';
import { g } from './dom';
import { toast } from './ui-helpers';

let _target: HTMLElement | null = null;

export function togglePageMenu(btn: HTMLElement): void {
  const pgm = g('pgm');
  if (pgm.classList.contains('on')) {
    hidePageMenu();
    return;
  }
  if (!S.currentId) {
    toast('ページを選択してください');
    return;
  }
  const rect = btn.getBoundingClientRect();
  const top = rect.bottom + 4;
  const right = window.innerWidth - rect.right;
  pgm.style.top = top + 'px';
  pgm.style.right = right + 'px';
  pgm.style.left = '';
  pgm.classList.add('on');
  _target = btn;
}

export function hidePageMenu(): void {
  g('pgm').classList.remove('on');
  _target = null;
}

/** Idempotent — registers a single document-level mousedown listener
 *  (guarded by a body dataset flag) that closes the popover when the
 *  user clicks anywhere outside it. */
export function attachPageMenuOutsideClick(): void {
  const body = document.body as HTMLElement;
  if (body.dataset.memolaPageMenuWired === '1') return;
  body.dataset.memolaPageMenuWired = '1';
  document.addEventListener('mousedown', (e) => {
    const pgm = g('pgm');
    const target = e.target as Node;
    if (
      pgm && pgm.classList.contains('on') &&
      !pgm.contains(target) &&
      target !== _target &&
      (!_target || !_target.contains(target))
    ) {
      hidePageMenu();
    }
  });
}
