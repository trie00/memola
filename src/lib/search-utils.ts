// Pure search-related helpers — no DOM or network access.

import type { AppState, Page } from '../state';

export function escHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Render a SharePoint Search snippet:
 *  - `<c0>x</c0>` becomes `<mark class="n365-qs-hit">x</mark>`
 *  - `<ddd/>` becomes `…`
 * The summary is HTML-escaped first; only the recognised tags are reintroduced.
 */
export function renderSnippet(summary: string): string {
  return escHtml(summary)
    .replace(/&lt;c0&gt;/g, '<mark class="n365-qs-hit">')
    .replace(/&lt;\/c0&gt;/g, '</mark>')
    .replace(/&lt;ddd\/&gt;/g, '…');
}

/**
 * Resolve a SharePoint result Path back to a `Page` from the local state.
 * Returns null when the path lies outside `n365-pages` or the meta entry is unknown.
 */
export function pageFromSPPath(
  spPath: string,
  meta: AppState['meta'],
  pages: Page[],
): Page | null {
  const marker = '/n365-pages/';
  const idx = spPath.indexOf(marker);
  if (idx < 0) return null;
  let rel: string;
  try { rel = decodeURIComponent(spPath.substring(idx + marker.length)); }
  catch { rel = spPath.substring(idx + marker.length); }
  rel = rel.replace(/\/index\.md$/i, '');
  const mp = meta.pages.find((p) => p.path === rel);
  if (!mp) return null;
  return pages.find((p) => p.Id === mp.id) || null;
}
