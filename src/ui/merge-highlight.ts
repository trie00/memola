// Highlight blocks that a live auto-merge folded in from another user.
//
// After `tryLiveSync` reconciles a clean 3-way merge into the editor, the
// blocks that were ADDED or UPDATED by the other person get a tinted
// background so the change is visible. Deletions aren't highlighted (the
// block is gone). The highlight clears when the user edits the page (their
// next input) or when they leave and return (the editor re-mounts fresh,
// and `clearMergeHighlight` is called on page open).

import { getEd } from './dom';
import { parseBlocksJson } from '../api/pages';
import { stampReplacer } from '../lib/block-stamp';
import type { Block } from '../lib/blocks';

let _clearArmed = false;

function cssEscape(s: string): string { return s.replace(/"/g, '\\"'); }

/** Shallow content hash of a block: its OWN fields (kind / inline / text /
 *  emoji / checked …) excluding nested children/items — so only the block
 *  that actually changed is flagged, not its ancestors. Stamp fields
 *  (lastBy/lastAt) are ignored via stampReplacer. */
function shallowHash(b: Block): string {
  const clone = { ...(b as unknown as Record<string, unknown>) };
  delete clone.children;
  delete clone.items;
  delete clone.rows;       // table cells: treat structural change separately
  return JSON.stringify(clone, stampReplacer);
}

function flatten(blocks: Block[], map: Map<string, string>): void {
  for (const b of blocks) {
    map.set(b.id, shallowHash(b));
    const any = b as unknown as { children?: Block[]; items?: Block[][] };
    if (Array.isArray(any.children)) flatten(any.children, map);
    if (Array.isArray(any.items)) for (const item of any.items) flatten(item, map);
  }
}

/** Tint the blocks that differ between `oursBody` (pre-merge) and
 *  `mergedBody` (post-merge) — i.e. the incoming additions/updates. */
export function highlightIncomingBlocks(oursBody: string, mergedBody: string): void {
  clearMergeHighlight();
  const ours = new Map<string, string>();
  const merged = new Map<string, string>();
  flatten(parseBlocksJson(oursBody), ours);
  flatten(parseBlocksJson(mergedBody), merged);
  const changed: string[] = [];
  for (const [id, h] of merged) if (ours.get(id) !== h) changed.push(id);
  if (changed.length === 0) return;
  const ed = getEd();
  for (const id of changed) {
    ed.querySelector<HTMLElement>('[data-block-id="' + cssEscape(id) + '"]')
      ?.classList.add('memola-block-incoming');
  }
  // Clear on the user's next edit (= "そのページを更新したら戻す").
  if (!_clearArmed) {
    _clearArmed = true;
    ed.addEventListener('input', clearMergeHighlight, { once: true });
  }
}

export function clearMergeHighlight(): void {
  const ed = getEd();
  ed.querySelectorAll('.memola-block-incoming').forEach((el) => el.classList.remove('memola-block-incoming'));
  if (_clearArmed) { ed.removeEventListener('input', clearMergeHighlight); _clearArmed = false; }
}
