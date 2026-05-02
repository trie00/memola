// Browser-style page navigation history.
//
// Maintains an in-memory stack of visited page IDs with a current pointer.
// `goBack()` / `goForward()` move the pointer and re-open the page; the
// regular `doSelect()` path pushes new entries (truncating any forward tail,
// matching browser behavior).
//
// To avoid recording the back/forward navigation itself as a new entry,
// callers set `_skipPush` via `withSkipPush()` when navigating through the
// history.

import { S } from '../state';

const MAX_ENTRIES = 100;

const _stack: string[] = [];
let _idx = -1;       // index of currently-displayed page in _stack
let _skipPush = false;

/** Record a page navigation. Drops any forward history past the current
 *  index — exactly as a browser back/forward stack does when the user goes
 *  back and then opens a different page. */
export function pushHistory(pageId: string): void {
  if (_skipPush) return;
  if (!pageId) return;
  // No-op if it's the same as current — typing into the active page or
  // re-opening it shouldn't bloat history.
  if (_idx >= 0 && _stack[_idx] === pageId) return;
  // Drop forward tail
  if (_idx < _stack.length - 1) _stack.splice(_idx + 1);
  _stack.push(pageId);
  // Cap stack growth — drop the oldest entry but keep _idx pointing at the
  // most-recent (post-trim).
  if (_stack.length > MAX_ENTRIES) _stack.shift();
  _idx = _stack.length - 1;
  refreshButtons();
}

export function canGoBack(): boolean {
  return _idx > 0 && pageExists(_stack[_idx - 1]);
}

export function canGoForward(): boolean {
  return _idx >= 0 && _idx < _stack.length - 1 && pageExists(_stack[_idx + 1]);
}

function pageExists(id: string | undefined): boolean {
  return !!id && S.pages.some((p) => p.Id === id);
}

async function navigate(targetIdx: number): Promise<void> {
  const pageId = _stack[targetIdx];
  if (!pageId || !pageExists(pageId)) {
    // Target was deleted — drop it and any further entries in the same
    // direction, then bail. Buttons will refresh.
    _stack.splice(targetIdx, 1);
    if (_idx > targetIdx) _idx--;
    refreshButtons();
    return;
  }
  _idx = targetIdx;
  _skipPush = true;
  try {
    const { doSelect } = await import('./views');
    await doSelect(pageId);
  } finally {
    _skipPush = false;
  }
  refreshButtons();
}

export async function goBack(): Promise<void> {
  if (!canGoBack()) return;
  await navigate(_idx - 1);
}

export async function goForward(): Promise<void> {
  if (!canGoForward()) return;
  await navigate(_idx + 1);
}

/** Sync the back/forward button enabled-state with the stack. Called from
 *  every state change (push, navigate, S.pages reload). */
export function refreshButtons(): void {
  const back = document.getElementById('n365-nav-back') as HTMLButtonElement | null;
  const fwd  = document.getElementById('n365-nav-fwd')  as HTMLButtonElement | null;
  if (back) {
    back.disabled = !canGoBack();
    back.classList.toggle('disabled', back.disabled);
  }
  if (fwd) {
    fwd.disabled = !canGoForward();
    fwd.classList.toggle('disabled', fwd.disabled);
  }
}
