// Browser-style page navigation history.
//
// Maintains an in-memory stack of visited entries with a current pointer.
// Each entry is either a regular page (just `pageId`) or a DB row open as a
// page (`pageId` of the parent DB plus `rowList` + `rowId`). This lets the
// back button distinguish "back from a DB row to its DB list view" from
// "back from a regular page to the previous page".
//
// `goBack()` / `goForward()` move the pointer and re-open the entry; the
// regular `doSelect()` / `openRowAsPage()` paths push new entries
// (truncating any forward tail, matching browser behavior).
//
// To avoid recording the back/forward navigation itself as a new entry,
// callers set `_skipPush` via `withSkipPush()` when navigating through the
// history.

import { S } from '../state';

const MAX_ENTRIES = 100;

interface HistoryEntry {
  pageId: string;          // the active page (or parent DB id when row is set); '' for a view entry
  rowList?: string;        // SP list title for a DB-row entry
  rowId?: number;          // DB row id for a DB-row entry
  view?: 'library';        // a non-page full view (the all-pages library); pageId is ''
}

const _stack: HistoryEntry[] = [];
let _idx = -1;       // index of currently-displayed entry in _stack
let _skipPush = false;

function entriesEqual(a: HistoryEntry, b: HistoryEntry): boolean {
  return a.pageId === b.pageId &&
    (a.rowId || 0) === (b.rowId || 0) &&
    (a.rowList || '') === (b.rowList || '') &&
    (a.view || '') === (b.view || '');
}

/** Record opening a non-page full view (the library) so the back button
 *  can return to it. Respects `_skipPush` (so navigating back/forward into
 *  the library doesn't re-record it). */
export function pushViewHistory(view: 'library'): void {
  if (_skipPush) return;
  const entry: HistoryEntry = { pageId: '', view };
  if (_idx >= 0 && entriesEqual(_stack[_idx], entry)) return;
  if (_idx < _stack.length - 1) _stack.splice(_idx + 1);
  _stack.push(entry);
  if (_stack.length > MAX_ENTRIES) _stack.shift();
  _idx = _stack.length - 1;
  refreshButtons();
}

/** Record a navigation. Page-only call: `pushHistory(pageId)`. Row call:
 *  `pushHistory(parentDbId, { rowList, rowId })`. Drops any forward
 *  history past the current index. */
export function pushHistory(
  pageId: string,
  rowRef?: { rowList: string; rowId: number },
): void {
  if (_skipPush) return;
  if (!pageId) return;
  const entry: HistoryEntry = rowRef
    ? { pageId, rowList: rowRef.rowList, rowId: rowRef.rowId }
    : { pageId };
  // No-op if same as current — typing into the active page or re-opening
  // it shouldn't bloat history.
  if (_idx >= 0 && entriesEqual(_stack[_idx], entry)) return;
  // Drop forward tail
  if (_idx < _stack.length - 1) _stack.splice(_idx + 1);
  _stack.push(entry);
  // Cap stack growth — drop the oldest entry but keep _idx pointing at the
  // most-recent (post-trim).
  if (_stack.length > MAX_ENTRIES) _stack.shift();
  _idx = _stack.length - 1;
  refreshButtons();
}

export function canGoBack(): boolean {
  return _idx > 0 && entryReachable(_stack[_idx - 1]);
}

export function canGoForward(): boolean {
  return _idx >= 0 && _idx < _stack.length - 1 && entryReachable(_stack[_idx + 1]);
}

function entryReachable(e: HistoryEntry | undefined): boolean {
  if (!e) return false;
  if (e.view === 'library') return true;          // the library is always openable
  if (!e.pageId) return false;
  return S.pages.some((p) => p.Id === e.pageId);
}

async function navigate(targetIdx: number): Promise<void> {
  const entry = _stack[targetIdx];
  if (!entry || !entryReachable(entry)) {
    // Target was deleted — drop it and any further entries in the same
    // direction, then bail. Buttons will refresh.
    _stack.splice(targetIdx, 1);
    if (_idx > targetIdx) _idx--;
    refreshButtons();
    return;
  }
  _idx = targetIdx;
  _skipPush = true;
  // 戻る/進むは新しいタブを作らず、現在のタブで差し替える。
  const tabsMod = await import('./tabs');
  tabsMod.setTabNavInPlace(true);
  try {
    if (entry.view === 'library') {
      const lib = await import('./library');
      await lib.openLibrary();
    } else {
    const v = await import('./views');
    await v.doSelect(entry.pageId);
    if (entry.rowId && entry.rowList) {
      // The DB list is now loaded — find the row and open it as a page.
      const row = S.dbItems.find((it) => it.Id === entry.rowId);
      if (row) {
        const rp = await import('./row-page');
        await rp.openRowAsPage(entry.pageId, row);
      }
    }
    }
  } finally {
    _skipPush = false;
    tabsMod.setTabNavInPlace(false);
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
  const back = document.getElementById('memola-nav-back') as HTMLButtonElement | null;
  const fwd  = document.getElementById('memola-nav-fwd')  as HTMLButtonElement | null;
  if (back) {
    back.disabled = !canGoBack();
    back.classList.toggle('disabled', back.disabled);
  }
  if (fwd) {
    fwd.disabled = !canGoForward();
    fwd.classList.toggle('disabled', fwd.disabled);
  }
}
