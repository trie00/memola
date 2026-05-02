// Pure helpers over a flat page tree (id + parentId arrays) and the per-parent
// sibling order persisted in localStorage.

import type { Page } from '../state';

/** Collect a page id along with all transitive descendants. */
export function collectDescendantIds(pages: Page[], rootId: string): string[] {
  const acc = [rootId];
  pages.filter((p) => p.ParentId === rootId).forEach((c) => {
    acc.push(...collectDescendantIds(pages, c.Id));
  });
  return acc;
}

// ── Per-parent sibling order ────────────────────────────

const TREE_ORDER_KEY = 'n365.tree.order';

interface OrderMap { [parentId: string]: string[] }

function loadOrderMap(): OrderMap {
  try {
    const raw = localStorage.getItem(TREE_ORDER_KEY);
    return raw ? (JSON.parse(raw) as OrderMap) : {};
  } catch { return {}; }
}

function saveOrderMap(m: OrderMap): void {
  try { localStorage.setItem(TREE_ORDER_KEY, JSON.stringify(m)); } catch { /* ignore */ }
}

/** Reorder a list of sibling pages by the saved order. Unknown ids appended. */
export function applySiblingOrder(parentId: string, kids: Page[]): Page[] {
  const m = loadOrderMap();
  const saved = m[parentId || ''];
  if (!saved || saved.length === 0) return kids;
  const map = new Map(kids.map((k) => [k.Id, k]));
  const ordered: Page[] = [];
  for (const id of saved) {
    const k = map.get(id);
    if (k) { ordered.push(k); map.delete(id); }
  }
  for (const k of map.values()) ordered.push(k);
  return ordered;
}

/** Persist a new sibling order under `parentId` (`''` for root). */
export function saveSiblingOrder(parentId: string, ids: string[]): void {
  const m = loadOrderMap();
  m[parentId || ''] = ids;
  saveOrderMap(m);
}

/** Compute the new order after moving `dragId` to before/after `targetId`
 *  inside `parentSiblings`. Returns the new ordered id list. */
export function computeReorder(
  parentSiblings: Page[],
  dragId: string,
  targetId: string,
  before: boolean,
): string[] {
  const order = parentSiblings.map((p) => p.Id);
  const fromIdx = order.indexOf(dragId);
  if (fromIdx >= 0) order.splice(fromIdx, 1);
  let targetIdx = order.indexOf(targetId);
  if (targetIdx < 0) targetIdx = order.length;
  if (!before) targetIdx += 1;
  order.splice(targetIdx, 0, dragId);
  return order;
}
