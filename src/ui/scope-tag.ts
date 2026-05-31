// "プライベート / 組織" scope tag in the top bar.
//
// Visibility: shown only for real, editable pages (PageType='page', not a
// DB row, not a draft, page exists). Click toggles between 'user' (個人)
// and 'org' (組織), then moves the page to the top of the destination
// section by clearing its parent so the user immediately sees where it
// landed.

import { S } from '../state';
import { apiSetScope, apiMovePage, type PageScope } from '../api/pages';
import { saveSiblingOrder, countDescendants } from '../lib/page-tree';
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
  const childCount = isDb ? 0 : countDescendants(S.pages, id);
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

  // Link-validity warnings. The scope change physically moves the row to a
  // list with different visibility, so cross-scope links break for others.
  if (!await confirmScopeChangeLinks(id, next)) return;

  try {
    const { rootId } = await apiSetScope(id, next);
    // The id may have changed (cross-list migration). Operate on rootId.
    if (meta.parent) {
      await apiMovePage(rootId, '');
    }
    const rootIds = S.pages
      .filter((p) => (p.ParentId || '') === '')
      .map((p) => p.Id);
    const reordered = [rootId, ...rootIds.filter((x) => x !== rootId)];
    saveSiblingOrder('', reordered);

    const { renderTree } = await import('./tree');
    renderTree();
    // Navigate to the (possibly new) id so the open page tracks the move.
    if (rootId !== id || S.currentId === id) {
      const { doSelect } = await import('./views');
      await doSelect(rootId);
    }
    syncScopeTag();
    toast(next === 'org' ? '組織に公開しました' : 'プライベートに戻しました');
  } catch (e) {
    toast('スコープ変更に失敗: ' + (e as Error).message, 'err');
  }
}

/** Shared by every scope-change entry point (scope tag / page menu AND the
 *  sidebar tree's drag-to-other-scope). Shows the link-invalidation warning
 *  (if any) and returns false when the user cancels, true to proceed. */
export async function confirmScopeChangeLinks(id: string, next: PageScope): Promise<boolean> {
  const warn = await scopeChangeLinkWarning(id, next);
  if (warn && !window.confirm(warn)) return false;
  return true;
}

/** Build a confirmation warning when the scope change would invalidate
 *  links for other users, or '' when there's nothing to warn about.
 *    - promote (→org): this page links to PRIVATE pages others can't open.
 *    - demote (→user): OTHER pages link TO this page and will break. */
async function scopeChangeLinkWarning(id: string, next: PageScope): Promise<string> {
  try {
    if (next === 'org') {
      // Exclude the subtree being promoted together (it stays mutually
      // linkable since those pages become org at the same time).
      const { collectDescendantIds } = await import('../lib/page-tree');
      const subtree = new Set<string>(collectDescendantIds(S.pages, id));
      const { findOutgoingPrivateLinks } = await import('../api/pages');
      const titles = await findOutgoingPrivateLinks(id, subtree);
      if (titles.length === 0) return '';
      const list = titles.slice(0, 8).map((t) => '・' + t).join('\n')
        + (titles.length > 8 ? `\n…他 ${titles.length - 8} 件` : '');
      return '⚠ このページは次の「プライベート」ページにリンクしています:\n\n'
        + list + '\n\n組織に公開すると、これらのリンクは他のメンバーには'
        + '無効(開けない)になります。続行しますか?';
    }
    // demote → private
    const { getBacklinksFor } = await import('../api/backlinks');
    const back = await getBacklinksFor(id, (pid) => metaById(pid)?.title || null);
    if (back.length === 0) return '';
    const list = back.slice(0, 8).map((b) => '・' + b.pageTitle).join('\n')
      + (back.length > 8 ? `\n…他 ${back.length - 8} 件` : '');
    return '⚠ 次のページがこのページにリンクしています:\n\n'
      + list + '\n\nプライベートに変更すると、これらのリンクは他のメンバーには'
      + '無効(開けない)になります。続行しますか?';
  } catch {
    return '';   // detection failure shouldn't block the operation
  }
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
