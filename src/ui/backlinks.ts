// Backlinks panel — shown below the editor for the active page.
//
// Displays every other page that links to the current page via a
// `[[id|...]]` wiki link. Clicking an entry opens the source page.
// Lazy: the SP scan kicks off on first render and the panel updates
// in place when results come back.

import { S } from '../state';
import { getBacklinksFor, type BacklinkEntry } from '../api/backlinks';
import { escapeHtml } from '../lib/html-escape';
import { metaById } from '../lib/page-store';

const CONTAINER_ID = 'memola-backlinks';        // page-view panel
const DB_CONTAINER_ID = 'memola-backlinks-db';  // database-view panel

function resolveTitle(id: string): string | null {
  const m = metaById(id);
  return m ? m.title : null;
}

function hide(elId: string): void {
  const e = document.getElementById(elId);
  if (e) { e.style.display = 'none'; e.innerHTML = ''; }
}

/** Re-render the backlinks panel for the active page or database. Safe to
 *  call multiple times — replaces the panel's contents in place. Both
 *  pages and databases can be link targets, so we render into whichever
 *  view is active (page editor vs DB view) and hide the other. */
export async function renderBacklinks(): Promise<void> {
  const id = S.currentId;
  // A page (not a DB row) → page panel; a database → DB panel.
  const isPage = !!id && S.currentType === 'page' && !S.currentRow;
  const isDb = !!id && S.currentType === 'database';
  const elId = isPage ? CONTAINER_ID : isDb ? DB_CONTAINER_ID : null;
  // Always hide the inactive panel so a stale one doesn't linger.
  hide(elId === CONTAINER_ID ? DB_CONTAINER_ID : CONTAINER_ID);
  if (!elId) { hide(CONTAINER_ID); hide(DB_CONTAINER_ID); return; }
  const el = document.getElementById(elId);
  if (!el || !id) return;

  // Loading state — show the panel immediately so the user sees activity
  el.style.display = '';
  el.innerHTML =
    '<div class="memola-bl-hd">' +
      '<span class="memola-bl-icon">🔗</span>' +
      '<span class="memola-bl-title">リンク元</span>' +
      '<span class="memola-bl-count">…</span>' +
    '</div>' +
    '<div class="memola-bl-body"><div class="memola-bl-loading">スキャン中…</div></div>';

  let entries: BacklinkEntry[] = [];
  try {
    entries = await getBacklinksFor(id, resolveTitle);
  } catch {
    el.querySelector<HTMLElement>('.memola-bl-body')!.innerHTML =
      '<div class="memola-bl-empty">リンク元を取得できませんでした</div>';
    return;
  }
  // The user may have navigated away during the SP scan — bail if so.
  if (S.currentId !== id) return;

  // No results → hide the panel entirely (clean look — Notion does the same).
  if (entries.length === 0) {
    el.style.display = 'none';
    el.innerHTML = '';
    return;
  }

  const cnt = el.querySelector<HTMLElement>('.memola-bl-count');
  if (cnt) cnt.textContent = String(entries.length);

  const body = el.querySelector<HTMLElement>('.memola-bl-body');
  if (!body) return;
  body.innerHTML = entries.map((e) => {
    const meta = metaById(e.pageId);
    const icon = meta?.icon || '📄';
    const badge = e.count > 1 ? '<span class="memola-bl-badge">×' + e.count + '</span>' : '';
    return '<div class="memola-bl-item" data-page-id="' + escapeHtml(e.pageId) + '">' +
      '<div class="memola-bl-row">' +
        '<span class="memola-bl-item-icon">' + escapeHtml(icon) + '</span>' +
        '<span class="memola-bl-item-name">' + escapeHtml(e.pageTitle) + '</span>' +
        badge +
      '</div>' +
      (e.snippet
        ? '<div class="memola-bl-snippet">' + escapeHtml(e.snippet) + '</div>'
        : '') +
      '</div>';
  }).join('');

  // Wire click → navigate
  body.querySelectorAll<HTMLElement>('.memola-bl-item').forEach((it) => {
    it.addEventListener('click', async () => {
      const pid = it.dataset.pageId || '';
      if (!pid) return;
      const v = await import('./views');
      await v.doSelect(pid);
    });
  });
}
