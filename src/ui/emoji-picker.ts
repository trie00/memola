// Emoji picker — popover anchored to a target element. Used by the
// page-icon button and (potentially) any inline icon-pickers.
//
// Self-contained: owns its own DOM (`#memola-emoji` from html-template),
// listens once on mousedown for outside-click dismissal. State is local
// to this module — no plumbing through `S`.

import { g } from './dom';

export const EMOJIS: string[] = [
  '📄', '📝', '📋', '📌', '📍', '📎', '🗂', '🗃', '🗄', '📁', '📂', '🗑',
  '📚', '📖', '📗', '📘', '📙', '📔', '📒', '📃', '📜', '📑', '🔖',
  '✏️', '🖊', '🖋', '🖌', '🖍', '✒️', '🔏', '🔐', '🔒', '🔓', '🔑', '🗝',
  '💡', '🔦', '🕯', '💰', '💵', '💳', '🏆', '🥇', '🎯', '🎪', '🎨', '🎭',
  '🌟', '⭐', '✨', '💫', '🔥', '❄️', '🌊', '🌈', '☀️', '🌙', '⚡', '🌿',
  '🍎', '🍊', '🍋', '🍇', '🍓', '🥝', '🥑', '🌮', '🍕', '☕', '🎂', '🍰',
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮',
  '🚀', '✈️', '🚂', '🚗', '🏠', '🏢', '🏖', '🏔', '🌍', '🗺', '🧭', '⛵',
];

let _target: HTMLElement | null = null;
let _callback: ((emoji: string) => void) | null = null;

/** Show the emoji-picker popover anchored below `targetEl`. The callback
 *  fires when the user picks one (the popover auto-dismisses). */
export function showEmojiPicker(
  targetEl: HTMLElement,
  onSelect: (emoji: string) => void,
): void {
  _target = targetEl;
  _callback = onSelect;
  const grid = g('emoji-grid');
  grid.innerHTML = '';
  EMOJIS.forEach((em) => {
    const btn = document.createElement('button');
    btn.className = 'memola-emoji-btn';
    btn.textContent = em;
    btn.addEventListener('click', () => {
      g('emoji').classList.remove('on');
      if (_callback) _callback(em);
    });
    grid.appendChild(btn);
  });
  const rect = targetEl.getBoundingClientRect();
  const ep = g('emoji');
  ep.style.top = (rect.bottom + 4) + 'px';
  ep.style.left = rect.left + 'px';
  ep.classList.add('on');
}

export function hideEmojiPicker(): void {
  g('emoji').classList.remove('on');
}

/** One-time listener: dismiss the popover when the user mouses down
 *  outside the popover and outside its target element. Call once at
 *  app boot (idempotent guard via dataset flag). */
export function attachEmojiPickerOutsideClick(): void {
  const body = document.body as HTMLElement;
  if (body.dataset.memolaEmojiWired === '1') return;
  body.dataset.memolaEmojiWired = '1';
  document.addEventListener('mousedown', (e) => {
    const ep = g('emoji');
    const target = e.target as Node;
    if (ep && ep.classList.contains('on') && !ep.contains(target) && target !== _target) {
      ep.classList.remove('on');
    }
  });
}
