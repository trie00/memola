// Page picker — used by both the `[[` autocomplete (inline) and the
// `/page` slash command (modal-style centered popover).
//
// Both surfaces share the same matching logic and result rendering, so the
// look-and-feel stays consistent. The caller supplies an `onSelect` that
// receives the chosen page; this module owns no editor state.

import { S } from '../state';
import type { Page } from '../state';

interface PickerOptions {
  /** Initial query string (caller can supply one when reopening with input) */
  query?: string;
  /** Anchor rect — the popover positions just below this rect. */
  anchor: { bottom: number; left: number };
  /** Called when the user picks a page. */
  onSelect: (page: Page) => void;
  /** Called when the user dismisses without picking (Esc, blur). */
  onCancel?: () => void;
  /** When true, only DB pages (Type='database') appear in results. Used by
   *  the linked-DB embed flow which has no business showing regular pages. */
  dbsOnly?: boolean;
}

interface ActivePicker {
  el: HTMLElement;
  filtered: Page[];
  selIdx: number;
  opts: PickerOptions;
  query: string;
}

/** Build the candidate pool for `matchPages` — applied BEFORE the
 *  first-N result cap so narrow filters (e.g. dbsOnly) don't accidentally
 *  return an empty set when the matching pages live past the cap. */
function candidatePool(opts: PickerOptions): Page[] | undefined {
  if (opts.dbsOnly) return S.pages.filter((p) => p.Type === 'database');
  return undefined;     // undefined = use S.pages (matchPages default)
}

let _active: ActivePicker | null = null;
/** Document-level mousedown listener that closes the picker when the user
 *  clicks outside it. Wired on show, removed on hide. */
let _outsideClickHandler: ((e: MouseEvent) => void) | null = null;

function ensureContainer(): HTMLElement {
  let el = document.getElementById('n365-page-picker');
  if (el) return el;
  el = document.createElement('div');
  el.id = 'n365-page-picker';
  el.className = 'n365-page-picker';
  el.style.display = 'none';
  // Mount inside the overlay so it inherits z-index + scoping
  const overlay = document.getElementById('n365-overlay') || document.body;
  overlay.appendChild(el);
  return el;
}

function matchPages(query: string, pool?: Page[]): Page[] {
  // Search active (non-trashed) pages by title prefix / substring. Up to 8
  // results is enough for an inline autocomplete and avoids overflow.
  // `pool` lets callers narrow the candidate set (e.g. DBs only) BEFORE the
  // result limit is applied — otherwise a small filtered subset can fall
  // outside the first-8 window and the picker shows nothing at all.
  const q = query.trim().toLowerCase();
  const all = (pool ?? S.pages).filter((p) => {
    const meta = S.meta.pages.find((m) => m.id === p.Id);
    return !meta?.trashed;
  });
  if (!q) {
    // No query → show recently visited (or first 8 by default)
    return all.slice(0, 8);
  }
  const lc = (s: string): string => (s || '').toLowerCase();
  // Rank: exact prefix > word prefix > substring
  const scored = all
    .map((p) => {
      const t = lc(p.Title || '');
      let score = -1;
      if (t === q) score = 100;
      else if (t.startsWith(q)) score = 80;
      else if (t.includes(' ' + q)) score = 60;
      else if (t.includes(q)) score = 40;
      return { p, score };
    })
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
  return scored.map((x) => x.p);
}

function ancestorPath(pageId: string): string {
  const segs: string[] = [];
  let cur = pageId;
  let safety = 0;
  while (cur && safety++ < 12) {
    const meta = S.meta.pages.find((m) => m.id === cur);
    if (!meta) break;
    if (meta.parent) {
      const par = S.meta.pages.find((m) => m.id === meta.parent);
      if (par) segs.unshift(par.title);
    }
    cur = meta.parent || '';
  }
  return segs.join(' / ');
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function render(): void {
  if (!_active) return;
  const { el, filtered, selIdx, opts } = _active;
  el.innerHTML = '';
  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'n365-page-picker-empty';
    empty.textContent = 'ページが見つかりません';
    el.appendChild(empty);
  } else {
    filtered.forEach((page, idx) => {
      const meta = S.meta.pages.find((m) => m.id === page.Id);
      const icon = meta?.icon || (page.Type === 'database' ? '🗃' : '📄');
      const path = ancestorPath(page.Id);
      const item = document.createElement('div');
      item.className = 'n365-page-picker-item' + (idx === selIdx ? ' sel' : '');
      item.innerHTML =
        '<span class="n365-page-picker-icon">' + escHtml(icon) + '</span>' +
        '<span class="n365-page-picker-name">' + escHtml(page.Title || '無題') + '</span>' +
        (path ? '<span class="n365-page-picker-path">' + escHtml(path) + '</span>' : '');
      // mousedown (not click) to fire before contenteditable's blur removes selection
      item.addEventListener('mousedown', (e) => {
        e.preventDefault();
        commit(idx);
      });
      el.appendChild(item);
    });
  }
  // Position
  const top = opts.anchor.bottom + window.scrollY + 4;
  let left = opts.anchor.left + window.scrollX;
  const vpW = window.innerWidth;
  if (left + 320 > vpW) left = vpW - 324;
  el.style.top = top + 'px';
  el.style.left = left + 'px';
  el.style.display = '';
}

function commit(idx: number): void {
  if (!_active) return;
  const page = _active.filtered[idx];
  if (!page) return;
  const handler = _active.opts.onSelect;
  // Suppress onCancel — the user picked something, not cancelled.
  hide(true);
  handler(page);
}

export function showPagePicker(opts: PickerOptions): void {
  hide();
  const el = ensureContainer();
  const query = opts.query || '';
  const pool = candidatePool(opts);
  _active = {
    el,
    opts,
    query,
    filtered: matchPages(query, pool),
    selIdx: 0,
  };
  render();
  // Wire a document-level outside-click handler so a stray click anywhere
  // outside the picker dismisses it (and fires onCancel for callers that
  // need to clean up trigger state — e.g. the wiki `[[` autocomplete).
  if (_outsideClickHandler) {
    document.removeEventListener('mousedown', _outsideClickHandler, true);
  }
  _outsideClickHandler = (e: MouseEvent) => {
    if (!_active) return;
    const target = e.target as Node | null;
    if (!target) return;
    if (_active.el.contains(target)) return;     // click inside picker — ignore
    hide();
  };
  // Capture-phase so we beat any handler that would otherwise consume the
  // event (e.g. an editor mousedown stealing focus before we close).
  document.addEventListener('mousedown', _outsideClickHandler, true);
}

export function updatePagePickerQuery(query: string): void {
  if (!_active) return;
  _active.query = query;
  _active.filtered = matchPages(query, candidatePool(_active.opts));
  if (_active.selIdx >= _active.filtered.length) _active.selIdx = 0;
  render();
}

export function pagePickerActive(): boolean { return !!_active; }

export function pagePickerCount(): number { return _active ? _active.filtered.length : 0; }

export function pagePickerMove(delta: number): void {
  if (!_active || _active.filtered.length === 0) return;
  const n = _active.filtered.length;
  _active.selIdx = (_active.selIdx + delta + n) % n;
  render();
}

export function pagePickerCommit(): void {
  if (_active) commit(_active.selIdx);
}

/** Walk the rendered DOM and visually mark page-links whose target page no
 *  longer exists. Idempotent — call after every editor re-render. Runs in
 *  O(N) over the page-links of the given root.
 *
 *  Daily-note deferred links (`data-daily-date`) are also classified here:
 *  links whose target row exists render normally; links to dates with no
 *  row yet get the `.ghosted` class so the user can tell at a glance. The
 *  SP lookup is fired async so the call stays non-blocking — the link is
 *  always immediately clickable (find-or-create on click handles both). */
export function markBrokenPageLinks(root: Element): void {
  const links = root.querySelectorAll<HTMLElement>('a.n365-page-link');
  const dailyDates = new Set<string>();
  links.forEach((a) => {
    const id = a.getAttribute('data-page-id') || '';
    const pending = a.getAttribute('data-pending') === '1';
    const dailyDate = a.getAttribute('data-daily-date') || '';
    if (dailyDate) {
      // Default to ghosted until the SP lookup confirms otherwise. Avoids
      // a flash of "exists" for stale renders.
      a.classList.add('ghosted');
      dailyDates.add(dailyDate);
      return;
    }
    if (id) {
      const exists = S.pages.some((p) => p.Id === id);
      a.classList.toggle('broken', !exists);
    } else if (pending) {
      // Resolve title→id once if possible — otherwise leave as pending
      const title = (a.textContent || '').trim();
      const hit = S.pages.find((p) => (p.Title || '') === title);
      if (hit) {
        a.setAttribute('data-page-id', hit.Id);
        a.removeAttribute('data-pending');
        a.classList.remove('broken');
      } else {
        a.classList.add('broken');
      }
    }
  });
  if (dailyDates.size === 0) return;
  // Async confirmation of daily-link existence. Errors are silent — the
  // link still works (find-or-create on click).
  void (async () => {
    try {
      const daily = await import('../api/daily');
      for (const date of dailyDates) {
        const hit = await daily.findNoteForDate(date).catch(() => null);
        if (!hit) continue;
        // Remove ghosted from any link in `root` that points at this date.
        root.querySelectorAll<HTMLElement>(
          'a.n365-page-link[data-daily-date="' + date + '"]',
        ).forEach((a) => a.classList.remove('ghosted'));
      }
    } catch { /* ignore */ }
  })();
}

/** Close the picker.
 *  @param suppressCancel true → don't fire onCancel (used by the
 *    successful-pick path inside commit()). Otherwise onCancel fires so
 *    callers can clean up their trigger state (e.g. wiki `[[` autocomplete). */
export function hide(suppressCancel = false): void {
  if (_active) {
    _active.el.style.display = 'none';
    const cb = _active.opts.onCancel;
    _active = null;
    if (!suppressCancel && cb) cb();
  } else {
    _active = null;
  }
  if (_outsideClickHandler) {
    document.removeEventListener('mousedown', _outsideClickHandler, true);
    _outsideClickHandler = null;
  }
}
