// Sidebar tree + breadcrumb rendering.

import { S, type Page, type PageMeta } from '../state';
import { g } from './dom';
import { doSelect } from './views';
import { doNew, doDel } from './actions';
import { apiMovePage, apiSetPin, apiSetScope, scopeMismatchOnMove, type PageScope } from '../api/pages';
import { toast } from './ui-helpers';
import { applySiblingOrder, saveSiblingOrder, computeReorder } from '../lib/page-tree';
import { metaById } from '../lib/page-store';

/** Resolve a page's effective scope. Pre-`Scope`-column rows have no
 *  value — treat as 'user' (private) by default for safety. */
function pageScope(p: Page | PageMeta | undefined): PageScope {
  if (!p) return 'user';
  const id = 'Id' in p ? p.Id : p.id;
  const meta = metaById(id);
  return meta?.scope === 'org' ? 'org' : 'user';
}

export function kidsOf(pid: string): Page[] {
  // Default natural order (creation = ascending Id) then apply any user-saved
  // drag-reorder for this parent. Drafts are hidden — they're accessed
  // exclusively via the 「📝 下書き」 sidebar entry.
  const natural = S.pages
    .filter((p) => !p.IsDraft && (p.ParentId || '') === (pid || ''))
    .sort((a, b) => (a.Id < b.Id ? -1 : 1));
  return applySiblingOrder(pid || '', natural);
}

/** Top-level pages of a given scope. Pages without an explicit scope are
 *  treated as 'user' (private). */
function rootKidsOfScope(scope: PageScope): Page[] {
  return kidsOf('').filter((p) => pageScope(p) === scope);
}

/** Confirm with the user when a move would put a page under a parent of
 *  a different scope. If they accept, migrate the dragged subtree to the
 *  parent's scope. Returns true if the move should proceed. */
async function confirmAndMaybeMigrateScope(
  dragId: string, newParentId: string,
): Promise<boolean> {
  const target = scopeMismatchOnMove(dragId, newParentId);
  if (target === null) return true;
  const dragMeta = metaById(dragId);
  // Daily DB is locked to personal scope. Refuse cross-scope moves
  // outright instead of asking for confirmation.
  if (target === 'org' && dragMeta?.type === 'database' && dragMeta.list === 'memola-daily') {
    toast('デイリーノート DB は組織に公開できません', 'err');
    return false;
  }
  const parentMeta = metaById(newParentId);
  const childCount = countDescendantsLocal(dragId);
  const targetLabel = target === 'org' ? '組織' : 'プライベート';
  const sourceLabel = target === 'org' ? 'プライベート' : '組織';
  const ok = window.confirm(
    '⚠ スコープが異なります。\n\n' +
    '「' + (dragMeta?.title || '無題') + '」(' + sourceLabel + ') を\n' +
    '「' + (parentMeta?.title || '無題') + '」(' + targetLabel + ') の配下に移動します。\n\n' +
    '配下の ' + childCount + ' ページも一緒に「' + targetLabel + '」になります。\n\n' +
    '続行しますか?',
  );
  if (!ok) return false;
  await apiSetScope(dragId, target).catch(() => undefined);
  return true;
}

function countDescendantsLocal(rootId: string): number {
  let n = 0;
  const walk = (pid: string): void => {
    S.pages.filter((p) => p.ParentId === pid).forEach((c) => { n++; walk(c.Id); });
  };
  walk(rootId);
  return n;
}

/** Given a Y offset within a row, decide whether the drop is ABOVE / INTO /
 *  BELOW. Top and bottom bands are 25% each; middle 50% = into. */
function zoneFor(y: number, height: number): 'before' | 'into' | 'after' {
  if (y < height * 0.25) return 'before';
  if (y > height * 0.75) return 'after';
  return 'into';
}

/** Decide the drop *depth* from cursor X: moving left of the row's indent
 *  area promotes the drop one or more levels. Result clamped to [0, rowDepth]. */
function pickDropDepth(clientX: number, rowLeft: number, rowDepth: number): number {
  const x = clientX - rowLeft;
  // Each indent step represents one ancestor level; when x is well inside the
  // row's indent, target the same depth as the row.
  const stepsFromRow = Math.floor((rowDepth * TREE_INDENT + TREE_PAD_LEFT - x) / TREE_INDENT);
  const target = rowDepth - Math.max(0, stepsFromRow);
  return Math.max(0, Math.min(rowDepth, target));
}

/** Walk up the tree from `page` until reaching depth `targetDepth`. Returns
 *  the parent id at that depth (i.e. id of the row's parent, '' for root). */
function ancestorAtDepth(page: Page, targetDepth: number): string {
  // depth 0 = a top-level row; its parent is '' (root)
  // To insert as a sibling at depth N, the new parent is the ancestor at depth N-1
  let cur: Page | undefined = page;
  let d = 0;
  // Build the chain from `page` upward
  const chain: Page[] = [];
  while (cur) {
    chain.unshift(cur);
    if (!cur.ParentId) break;
    cur = S.pages.find((p) => p.Id === cur!.ParentId);
  }
  // chain[0] is root-level; chain[i].depth = i
  // We want sibling at depth = targetDepth, so its parent is chain[targetDepth - 1]
  if (targetDepth <= 0) return '';
  const parentNode = chain[targetDepth - 1];
  return parentNode ? parentNode.Id : '';
  void d;
}

/** Same as ancestorAtDepth but returns the *id of the ancestor at exactly that
 *  depth* (i.e. the row that will be the drag's new sibling). */
function ancestorIdAtDepth(page: Page, targetDepth: number): string | null {
  let cur: Page | undefined = page;
  const chain: Page[] = [];
  while (cur) {
    chain.unshift(cur);
    if (!cur.ParentId) break;
    cur = S.pages.find((p) => p.Id === cur!.ParentId);
  }
  return chain[targetDepth] ? chain[targetDepth].Id : null;
}

/** Toggle the dragging-descendant class on every transitive child of `id`
 *  so the whole subtree fades together while its parent is being dragged. */
function fadeDescendants(id: string, on: boolean): void {
  const tree = g('tree');
  const all = tree.querySelectorAll<HTMLElement>('.memola-tr');
  // Build a set of descendant ids
  const descendants = new Set<string>();
  const collect = (pid: string): void => {
    S.pages.filter((p) => p.ParentId === pid).forEach((c) => {
      descendants.add(c.Id);
      collect(c.Id);
    });
  };
  collect(id);
  all.forEach((r) => {
    const pid = r.dataset.pageId;
    if (pid && descendants.has(pid)) {
      r.classList.toggle('memola-tr-dragging-descendant', on);
    }
  });
}

// ── Floating drop indicator ─────────────────────────────

let _dropInd: HTMLDivElement | null = null;
function getDropIndicator(): HTMLDivElement {
  // Append into the Memola overlay so the namespaced CSS selector matches.
  const overlay = document.getElementById('memola-overlay') || document.body;
  if (_dropInd && overlay.contains(_dropInd)) return _dropInd;
  const el = document.createElement('div');
  el.className = 'memola-tr-drop-line';
  el.innerHTML = '<span class="memola-tr-drop-dot"></span><span class="memola-tr-drop-dot right"></span>';
  overlay.appendChild(el);
  _dropInd = el;
  return el;
}
function showDropIndicator(row: HTMLElement, after: boolean, targetDepth: number): void {
  const r = row.getBoundingClientRect();
  const ind = getDropIndicator();
  const y = (after ? r.bottom : r.top) - 1;
  const left = r.left + targetDepth * TREE_INDENT + TREE_PAD_LEFT;
  ind.style.top = y + 'px';
  ind.style.left = left + 'px';
  ind.style.width = Math.max(40, r.right - left - 6) + 'px';
  ind.classList.add('on');
}
function hideDropIndicator(): void {
  if (_dropInd) _dropInd.classList.remove('on');
}

export const TREE_INDENT = 16;            // px per nesting level
export const TREE_PAD_LEFT = 6;            // base padding before depth indent

export function mkNode(page: Page, depth: number): HTMLDivElement {
  const isDb = page.Type === 'database';
  const kids = kidsOf(page.Id);
  const hasK = kids.length > 0;
  const exp = S.expanded.has(page.Id);
  const act = page.Id === S.currentId;
  const metaPage = metaById(page.Id);
  const icon = metaPage && metaPage.icon ? metaPage.icon : (isDb ? '🗃' : '📄');

  const item = document.createElement('div');
  const row = document.createElement('div');
  row.className = 'memola-tr' + (act ? ' on' : '');
  row.style.paddingLeft = (depth * TREE_INDENT + TREE_PAD_LEFT) + 'px';
  row.dataset.depth = String(depth);
  row.dataset.parentId = page.ParentId || '';

  const tog = document.createElement('span');
  tog.className = 'memola-tog' + (hasK ? '' : ' lf') + (exp ? ' op' : '');
  tog.innerHTML = hasK ? '&#9658;' : '';
  tog.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!hasK) return;
    if (S.expanded.has(page.Id)) S.expanded.delete(page.Id); else S.expanded.add(page.Id);
    renderTree();
  });

  const icEl = document.createElement('span');
  icEl.className = 'memola-ti';
  icEl.textContent = icon;
  const lbl = document.createElement('span');
  lbl.className = 'memola-tl';
  lbl.textContent = page.Title || '無題';
  const acts = document.createElement('span');
  acts.className = 'memola-ta';

  if (!isDb) {
    const ab = document.createElement('button');
    ab.className = 'memola-tac';
    ab.title = '子ページを追加';
    ab.innerHTML = '+';
    ab.addEventListener('click', (e) => { e.stopPropagation(); doNew(page.Id); });
    acts.appendChild(ab);
  }
  const pinBtn = document.createElement('button');
  pinBtn.className = 'memola-tac';
  pinBtn.title = metaPage?.pinned ? 'ピン留め解除' : 'ピン留め';
  pinBtn.innerHTML = metaPage?.pinned ? '📌' : '📍';
  pinBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    await apiSetPin(page.Id, !metaPage?.pinned);
    renderTree();
  });
  acts.appendChild(pinBtn);
  const db = document.createElement('button');
  db.className = 'memola-tac';
  db.title = '削除';
  db.innerHTML = '🗑';
  db.addEventListener('click', (e) => { e.stopPropagation(); doDel(page.Id); });
  acts.appendChild(db);
  row.append(tog, icEl, lbl, acts);
  row.addEventListener('click', () => { doSelect(page.Id); });

  // Drag & drop: move page (parent change) or reorder siblings.
  // Drop zones:
  //   middle 50% Y          → INTO target (child of target)
  //   top/bottom 25% Y      → BEFORE/AFTER target as sibling
  // For sibling drops, the target *depth* is taken from cursor X — moving the
  // cursor leftward promotes the drop one or more levels up the tree (Notion-style).
  row.draggable = true;
  row.dataset.pageId = page.Id;
  row.addEventListener('dragstart', (e) => {
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', page.Id);
    }
    row.classList.add('memola-tr-dragging');
    fadeDescendants(page.Id, true);
  });
  row.addEventListener('dragend', () => {
    row.classList.remove('memola-tr-dragging');
    fadeDescendants(page.Id, false);
    hideDropIndicator();
  });
  row.addEventListener('dragover', (e) => {
    e.preventDefault();
    const r = row.getBoundingClientRect();
    const y = e.clientY - r.top;
    const z = zoneFor(y, r.height);
    if (z === 'into') {
      row.classList.add('memola-tr-dropover');
      hideDropIndicator();
    } else {
      row.classList.remove('memola-tr-dropover');
      // Compute target depth from cursor X (allow promotion to ancestor levels)
      const targetDepth = pickDropDepth(e.clientX, r.left, depth);
      showDropIndicator(row, z === 'after', targetDepth);
    }
  });
  row.addEventListener('dragleave', () => {
    row.classList.remove('memola-tr-dropover');
  });
  row.addEventListener('drop', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    row.classList.remove('memola-tr-dropover');
    hideDropIndicator();
    const dragId = e.dataTransfer?.getData('text/plain');
    if (!dragId || dragId === page.Id) return;
    const r = row.getBoundingClientRect();
    const z = zoneFor(e.clientY - r.top, r.height);
    try {
      if (z === 'into') {
        if (!await confirmAndMaybeMigrateScope(dragId, page.Id)) return;
        await apiMovePage(dragId, page.Id);
        S.expanded.add(page.Id);
        renderTree();
        toast('移動しました');
        return;
      }
      // Sibling drop. Decide target parent from cursor X.
      const targetDepth = pickDropDepth(e.clientX, r.left, depth);
      const newParent = ancestorAtDepth(page, targetDepth);
      const dragPage = S.pages.find((p) => p.Id === dragId);
      if (!dragPage) return;
      if ((dragPage.ParentId || '') !== newParent) {
        if (!await confirmAndMaybeMigrateScope(dragId, newParent)) return;
        await apiMovePage(dragId, newParent);
      }
      // Determine the *anchor* in the new parent's siblings.
      // If dropping at the same depth, anchor is `page`.
      // If promoting, anchor is the ancestor of `page` at that depth.
      const anchorId = targetDepth === depth
        ? page.Id
        : (ancestorIdAtDepth(page, targetDepth) || '');
      const siblings = S.pages
        .filter((p) => (p.ParentId || '') === newParent)
        .sort((a, b) => (a.Id < b.Id ? -1 : 1));
      const reordered = applySiblingOrder(newParent, siblings);
      if (anchorId) {
        const newOrder = computeReorder(reordered, dragId, anchorId, z === 'before');
        saveSiblingOrder(newParent, newOrder);
      }
      renderTree();
    } catch (err) { toast('移動失敗: ' + (err as Error).message, 'err'); }
  });

  item.appendChild(row);

  if (hasK && exp) {
    const sub = document.createElement('div');
    kids.forEach((c) => { sub.appendChild(mkNode(c, depth + 1)); });
    item.appendChild(sub);
  }
  return item;
}

export function renderTree(): void {
  const wPin = document.getElementById('memola-tree-pinned');
  const wPriv = document.getElementById('memola-tree-private');
  const wOrg = document.getElementById('memola-tree-org');
  const lblPin = document.getElementById('memola-tree-pinned-lbl');
  if (!wPin || !wPriv || !wOrg) return;

  // Wipe all sections
  wPin.innerHTML = '';
  wPriv.innerHTML = '';
  wOrg.innerHTML = '';

  // ── Pinned section: flat list, all scopes, no nesting (a quick-jump
  // band that sits above the tree). The pinned page also still appears
  // in its scope's tree below (Notion / Bear convention). Hide the
  // section header when nothing is pinned to save vertical space.
  const pinned = S.pages.filter((p) => {
    if (p.IsDraft) return false;
    const m = metaById(p.Id);
    return m?.pinned;
  });
  if (lblPin) lblPin.style.display = pinned.length > 0 ? '' : 'none';
  pinned.forEach((p) => { wPin.appendChild(mkNode(p, 0)); });

  // ── Private section (scope='user' / undefined)
  rootKidsOfScope('user').forEach((p) => { wPriv.appendChild(mkNode(p, 0)); });

  // ── Org section (scope='org')
  rootKidsOfScope('org').forEach((p) => { wOrg.appendChild(mkNode(p, 0)); });

  // Wire empty-area drops on each scope section so dropping into the
  // section's whitespace moves the dragged page to that scope's root.
  wireSectionDrop(wPriv, 'user');
  wireSectionDrop(wOrg, 'org');
}

/** Empty-area drop on a scope section: move the dragged page to root and
 *  switch its scope to match this section. */
function wireSectionDrop(container: HTMLElement, sectionScope: PageScope): void {
  function emptyDropPos(clientY: number): 'top' | 'bottom' | null {
    const rows = container.querySelectorAll<HTMLElement>('.memola-tr');
    if (rows.length === 0) return 'bottom';
    const first = rows[0].getBoundingClientRect();
    const last = rows[rows.length - 1].getBoundingClientRect();
    if (clientY < first.top + first.height / 2) return 'top';
    if (clientY > last.bottom - last.height / 2) return 'bottom';
    return null;
  }
  container.ondragover = (e) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.closest('.memola-tr')) return;     // per-row handler active
    const rows = container.querySelectorAll<HTMLElement>('.memola-tr');
    if (rows.length === 0) {
      // Empty section — accept the drop silently (no custom indicator).
      return;
    }
    const pos = emptyDropPos(e.clientY);
    if (pos === 'top' && rows[0]) {
      showDropIndicator(rows[0], false, 0);
    } else if (rows.length > 0) {
      showDropIndicator(rows[rows.length - 1], true, 0);
    }
  };
  container.addEventListener('dragleave', (e) => {
    const rt = (e as DragEvent).relatedTarget as Node | null;
    if (!rt || !container.contains(rt)) hideDropIndicator();
  });
  container.ondrop = async (e) => {
    e.preventDefault();
    hideDropIndicator();
    const target = e.target as HTMLElement;
    if (target.closest('.memola-tr')) return;     // handled per-row
    const dragId = e.dataTransfer?.getData('text/plain');
    if (!dragId) return;
    const pos = emptyDropPos(e.clientY) || 'bottom';
    try {
      const dragPage = S.pages.find((p) => p.Id === dragId);
      if (!dragPage) return;
      // Cross-scope drop on empty area: migrate scope before moving.
      const dragScope = pageScope(dragPage);
      if (dragScope !== sectionScope) {
        // Daily DB is locked to personal — refuse drops onto the org section.
        const dragMeta = metaById(dragId);
        if (sectionScope === 'org' && dragMeta?.type === 'database' && dragMeta.list === 'memola-daily') {
          toast('デイリーノート DB は組織に公開できません', 'err');
          return;
        }
        const childCount = countDescendantsLocal(dragId);
        const ok = window.confirm(
          '⚠ スコープが異なります。\n\n' +
          '「' + (dragPage.Title || '無題') + '」(' +
          (dragScope === 'org' ? '組織' : 'プライベート') + ') を' +
          '「' + (sectionScope === 'org' ? '🌐 組織' : '🔒 プライベート') + '」' +
          'セクションに移動します。\n\n' +
          (childCount > 0
            ? '配下の ' + childCount + ' ページも同じ分類になります。\n\n'
            : '') +
          '続行しますか?',
        );
        if (!ok) return;
        await apiSetScope(dragId, sectionScope).catch(() => undefined);
      }
      // Move to root if not already there
      if ((dragPage.ParentId || '') !== '') {
        await apiMovePage(dragId, '');
      }
      // Reorder: insert at top or end of root list among same-scope siblings.
      const allRoot = S.pages
        .filter((p) => (p.ParentId || '') === '')
        .sort((a, b) => (a.Id < b.Id ? -1 : 1));
      const reordered = applySiblingOrder('', allRoot);
      const order = reordered.map((p) => p.Id).filter((id) => id !== dragId);
      if (pos === 'top') order.unshift(dragId);
      else order.push(dragId);
      saveSiblingOrder('', order);
      renderTree();
    } catch (err) { toast('移動失敗: ' + (err as Error).message, 'err'); }
  };
}

export function ancs(id: string): Page[] {
  const map: Record<string, Page> = {};
  const path: Page[] = [];
  S.pages.forEach((p) => { map[p.Id] = p; });
  let cur: string | undefined = id;
  while (cur) {
    const p: Page | undefined = map[cur];
    if (!p) break;
    path.unshift(p);
    cur = p.ParentId || '';
  }
  return path;
}

export function renderBc(id: string): void {
  const bc = g('bc');
  bc.innerHTML = '';
  const ancestors = ancs(id);
  ancestors.forEach((p, i) => {
    const s = document.createElement('span');
    s.className = 'memola-bi';
    s.textContent = p.Title || '無題';
    s.addEventListener('click', () => { doSelect(p.Id); });
    bc.appendChild(s);
    if (i < ancestors.length - 1) {
      const sep = document.createElement('span');
      sep.textContent = '/';
      sep.style.color = '#e9e9e7';
      bc.appendChild(sep);
    }
  });
}
