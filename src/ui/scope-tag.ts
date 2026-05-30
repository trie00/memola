// "プライベート / 組織" scope tag in the top bar.
//
// Visibility: shown only for real, editable pages (PageType='page', not a
// DB row, not a draft, page exists). Click toggles between 'user' (個人)
// and 'org' (組織), then moves the page to the top of the destination
// section by clearing its parent so the user immediately sees where it
// landed.

import { S } from '../state';
import { apiSetScope, apiMovePage, type PageScope } from '../api/pages';
import { saveSiblingOrder } from '../lib/page-tree';
import { toast } from './ui-helpers';
import { metaById } from '../lib/page-store';

const TAG_ID = 'memola-scope-tag';

/** Resolve the active page's scope, defaulting unset to 'user'. */
function currentPageScope(): PageScope | null {
  if (!S.currentId) return null;
  const meta = metaById(S.currentId);
  if (!meta) return null;
  return meta.scope === 'org' ? 'org' : 'user';
}

/** Reflect the scope on the tag button. Hides the tag when the current
 *  context isn't toggleable (no selection, row-as-page, draft, trashed).
 *  Both regular pages AND DB pages are toggleable — a DB's scope flag
 *  controls whether the DB itself shows up in the org or private section. */
export function syncScopeTag(): void {
  const tag = document.getElementById(TAG_ID);
  if (!tag) return;
  // Both 'page' and 'database' contexts are toggleable. Row-as-page
  // (`S.currentRow`) is excluded — its scope is inherited from the
  // parent DB, toggling here would be misleading.
  const isToggleable = !!S.currentId
    && (S.currentType === 'page' || S.currentType === 'database')
    && !S.currentRow;
  if (!isToggleable) { tag.style.display = 'none'; return; }
  const meta = S.currentId ? metaById(S.currentId) : null;
  if (!meta || meta.trashed) { tag.style.display = 'none'; return; }
  // Drafts have their own indicator banner, no scope tag.
  if (meta.originPageId) { tag.style.display = 'none'; return; }
  // Daily DB is locked to personal scope — hide the toggle entirely so
  // the user isn't tempted to flip it. The API-level guard rejects the
  // action regardless, but a hidden tag is cleaner than a confusing toast.
  if (meta.type === 'database' && meta.list === 'memola-daily') {
    tag.style.display = 'none'; return;
  }

  const scope = currentPageScope() || 'user';
  const ic = tag.querySelector<HTMLElement>('.memola-scope-tag-ic');
  const lbl = tag.querySelector<HTMLElement>('.memola-scope-tag-label');
  tag.classList.toggle('org', scope === 'org');
  tag.classList.toggle('user', scope === 'user');
  if (ic) ic.textContent = scope === 'org' ? '🌐' : '🔒';
  if (lbl) lbl.textContent = scope === 'org' ? '組織' : 'プライベート';
  tag.title = scope === 'org'
    ? 'このページは組織に公開されています — クリックで個人 (プライベート) に切替'
    : 'このページはプライベートです — クリックで組織に公開';
  tag.style.display = '';

  // Page-menu mirror item — sync its label too.
  const menuLbl = document.querySelector<HTMLElement>('.memola-pgm-scope-label');
  const menuIc = document.querySelector<HTMLElement>('.memola-pgm-scope-ic');
  if (menuLbl) menuLbl.textContent = scope === 'org' ? '個人に戻す' : '組織に公開';
  if (menuIc) menuIc.textContent = scope === 'org' ? '🌐' : '🔒';
}

/** Switch the current page's scope (and its descendants') to `next`,
 *  then move it to the root of the destination section by clearing its
 *  parent and pushing it to the top of the sibling order. */
export async function toggleCurrentPageScope(): Promise<void> {
  const id = S.currentId;
  if (!id) return;
  const meta = metaById(id);
  if (!meta) return;
  const cur = currentPageScope() || 'user';
  const next: PageScope = cur === 'org' ? 'user' : 'org';
  const isDb = meta.type === 'database';
  const noun = isDb ? 'DB' : 'ページ';

  // Confirm — moving a page that has children migrates them too. Mention
  // the count so the user isn't surprised. For DBs, descendants in the
  // tree sense are usually 0 (rows are stored separately and don't appear
  // as children in S.pages), so the count message is suppressed.
  const childCount = isDb ? 0 : countDescendants(id);
  const confirmMsg =
    '「' + (meta.title || '無題') + '」(' + noun + ') を' +
    (next === 'org' ? '組織に公開' : 'プライベート (個人) に変更') +
    'します。\n' +
    (childCount > 0
      ? '配下の ' + childCount + ' ページも同じ分類に切り替わります。\n'
      : '') +
    noun + 'は ' + (next === 'org' ? '「🌐 組織」' : '「🔒 プライベート」') +
    ' セクションの先頭に移動します。\n\n' +
    'よろしいですか?';
  if (!confirm(confirmMsg)) return;

  try {
    await apiSetScope(id, next);
    // Move to root if it was nested — root accepts both scopes and the
    // user can see the page at the top of its new section without
    // navigating into a parent that may now belong to the other scope.
    if (meta.parent) {
      await apiMovePage(id, '');
    }
    // Place at the very top of the root sibling order so the user
    // sees where it landed (provisional placement — they can drag it
    // wherever afterwards).
    const rootIds = S.pages
      .filter((p) => (p.ParentId || '') === '')
      .map((p) => p.Id);
    const reordered = [id, ...rootIds.filter((x) => x !== id)];
    saveSiblingOrder('', reordered);

    syncScopeTag();
    const { renderTree } = await import('./tree');
    renderTree();
    toast(next === 'org' ? '組織に公開しました' : 'プライベートに戻しました');
  } catch (e) {
    toast('スコープ変更に失敗: ' + (e as Error).message, 'err');
  }
}

function countDescendants(rootId: string): number {
  let n = 0;
  const walk = (pid: string): void => {
    S.pages.filter((p) => p.ParentId === pid).forEach((c) => { n++; walk(c.Id); });
  };
  walk(rootId);
  return n;
}

/** Wire the click handler — call once at startup. */
export function attachScopeTag(): void {
  const tag = document.getElementById(TAG_ID);
  if (!tag) return;
  tag.addEventListener('click', (e) => {
    e.stopPropagation();
    void toggleCurrentPageScope();
  });
}
