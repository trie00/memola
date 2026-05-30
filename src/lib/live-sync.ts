// Live-sync planner (pure).
//
// Given the three versions of a page body — `base` (what my editor
// started from), `ours` (my current editor content, possibly with
// unsaved edits), and `theirs` (the latest on SharePoint, just polled)
// — decide how to fold a foreign edit into my live editor:
//
//   - 'merge'    : block-id 3-way merge had NO same-block conflict.
//                  `merged` is the result to render; `changed` says
//                  whether it differs from what I currently show (so
//                  the caller can skip a no-op reconcile).
//   - 'conflict' : a block was edited on BOTH sides → can't auto-apply;
//                  the caller should fall back to the manual banner.
//   - 'noop'     : nothing actionable (non-block bodies, etc.).
//
// Pure: no DOM, no state. The caller (sync-watch) performs the editor
// reconcile + saver rebase based on the plan.

import type { Block } from './blocks';
import { parseBlocksJson, serializeBlocks } from '../api/pages';
import { threeWayMergeBlocks } from './three-way-merge-blocks';
import { bodiesContentEqual } from './block-stamp';

export type LiveSyncPlan =
  | { kind: 'merge'; merged: Block[]; mergedBody: string; changed: boolean }
  | { kind: 'conflict' }
  | { kind: 'noop' };

function isBlockJson(body: string): boolean {
  return body.trim().startsWith('[');
}

export function planLiveSync(
  baseBody: string,
  oursBody: string,
  theirsBody: string,
): LiveSyncPlan {
  // Only structural (block-JSON) bodies can be merged block-by-block.
  if (!isBlockJson(baseBody) || !isBlockJson(oursBody) || !isBlockJson(theirsBody)) {
    return { kind: 'noop' };
  }
  let base: Block[]; let ours: Block[]; let theirs: Block[];
  try {
    base = parseBlocksJson(baseBody);
    ours = parseBlocksJson(oursBody);
    theirs = parseBlocksJson(theirsBody);
  } catch {
    return { kind: 'noop' };
  }
  const r = threeWayMergeBlocks(base, ours, theirs);
  if (r.conflicts.length > 0) return { kind: 'conflict' };
  const mergedBody = serializeBlocks(r.merged);
  return {
    kind: 'merge',
    merged: r.merged,
    mergedBody,
    changed: !bodiesContentEqual(mergedBody, oursBody),
  };
}
