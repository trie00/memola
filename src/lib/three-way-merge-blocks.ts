// Three-way merge over block-tree (Block[]) using block IDs.
//
// Replaces line-based merge for Phase 2 storage. Compared to line-based:
//   - "moved a paragraph" is recognised (block id survives the move)
//     instead of producing a delete-here + insert-there phantom conflict
//   - Concurrent edits to *different* blocks always auto-merge cleanly
//     (line-based could spuriously conflict on adjacent edits)
//   - True conflicts (= same block edited on both sides) are reported
//     at block granularity, which is what the merge UI ultimately needs
//
// Algorithm:
//   1. Build base / yours / theirs id-maps. IDs are stable across edits
//      (Phase 2a: assignStableBlockIds runs at save time).
//   2. Compute the merged id ORDER by walking base, applying yours's
//      and theirs's edits to that order. Where the two orderings
//      disagree (block moved differently), prefer yours (= local).
//   3. For each id in the merged order, decide content:
//      - present in all three: yours==theirs → either; yours==base →
//        take theirs (auto); theirs==base → take yours (auto);
//        otherwise modify-modify CONFLICT.
//      - missing on one side: modify-delete / delete-modify (conflict
//        if the other side modified; auto-drop if it didn't).
//      - new on one side only: take it.
//      - new on both with same id (shouldn't happen with fresh-id
//        minting but tolerated): add-add CONFLICT.
//
// Ordering caveats (known limitations):
//   - When both sides moved the same block to *different* positions,
//     yours wins. The merge UI doesn't currently surface this as a
//     conflict — it's an implicit "yours moved blocks take precedence".
//   - When inserts on both sides land at the same anchor, yours's
//     inserts come first. Stable but arbitrary.

import type { Block, BlockId } from './blocks';

export interface BlockMergeResult {
  /** Auto-merged block sequence. Conflict-bearing blocks appear here
   *  using yours's content as a fallback; the caller resolves via
   *  `applyBlockMergeChoice` once the user picks a side per conflict. */
  merged: Block[];
  conflicts: BlockConflict[];
  /** Count of changes that auto-merged (= one side modified, other
   *  side didn't). Useful for the UI summary. */
  autoMergedCount: number;
}

export type BlockConflictKind =
  | 'modify-modify'        // both sides edited the same block to different values
  | 'modify-delete'        // yours modified, theirs deleted
  | 'delete-modify'        // theirs modified, yours deleted
  | 'add-add';             // both sides added same id with different content (rare)

export interface BlockConflict {
  id: BlockId;
  kind: BlockConflictKind;
  base: Block | null;
  yours: Block | null;
  theirs: Block | null;
}

const eq = <T>(a: T, b: T): boolean =>
  canonicalStringify(stripIds(a)) === canonicalStringify(stripIds(b));

/** Codex review M4: `JSON.stringify` is order-dependent. Two
 *  structurally-identical blocks with different property insertion
 *  order would compare unequal. Walk the value, sorting object keys
 *  before serialising. */
function canonicalStringify(v: unknown): string {
  return JSON.stringify(canonicalize(v));
}

function canonicalize(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(canonicalize);
  if (v && typeof v === 'object') {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(v).sort()) {
      out[k] = canonicalize((v as Record<string, unknown>)[k]);
    }
    return out;
  }
  return v;
}

/** Strip block IDs (recursively) before content comparison. We compare
 *  blocks by content equality, not identity — two paragraphs with the
 *  same text but different ids are still "the same content". */
function stripIds(node: unknown): unknown {
  if (Array.isArray(node)) return node.map(stripIds);
  if (node && typeof node === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node)) {
      if (k === 'id') continue;
      out[k] = stripIds(v);
    }
    return out;
  }
  return node;
}

/** Codex review M1: detect blocks that side has actively MOVED
 *  (vs. passively kept in place). Used to distinguish
 *  "passive keep + remote delete = drop" from "active move + remote
 *  delete = conflict". A block is "moved" if its position among the
 *  common (base ∩ side) ids differs between base and side orderings. */
function detectMoves(base: Block[], side: Block[]): Set<BlockId> {
  const baseIds = base.map((b) => b.id);
  const sideIds = side.map((b) => b.id);
  const baseSet = new Set(baseIds);
  const sideSet = new Set(sideIds);
  const sideIdsInBase = sideIds.filter((id) => baseSet.has(id));
  const baseIdsInSide = baseIds.filter((id) => sideSet.has(id));
  const moved = new Set<BlockId>();
  for (let i = 0; i < sideIdsInBase.length; i++) {
    if (sideIdsInBase[i] !== baseIdsInSide[i]) moved.add(sideIdsInBase[i]);
  }
  return moved;
}

export function threeWayMergeBlocks(
  base: Block[],
  yours: Block[],
  theirs: Block[],
): BlockMergeResult {
  const baseById = new Map(base.map((b) => [b.id, b]));
  const yoursById = new Map(yours.map((b) => [b.id, b]));
  const theirsById = new Map(theirs.map((b) => [b.id, b]));
  // Codex review M1: track which ids each side actively moved.
  const yoursMoved = detectMoves(base, yours);
  const theirsMoved = detectMoves(base, theirs);

  // Compute merged id ordering. Base-aware: when *only* theirs reordered
  // (I kept the base order), follow theirs' ordering so their reorder
  // isn't silently dropped. When I reordered (or both did), keep mine
  // — local-wins, matching the long-standing tie-break. Without this,
  // the old `mergeOrderings` favoured my order on ANY disagreement, so
  // a pure reorder by the other side was always lost.
  const preferTheirsOrder = yoursMoved.size === 0 && theirsMoved.size > 0;
  const orderedIds = mergeOrderings(
    yours.map((b) => b.id), theirs.map((b) => b.id), preferTheirsOrder,
  );

  const conflicts: BlockConflict[] = [];
  let autoMerged = 0;
  const merged: Block[] = [];

  for (const id of orderedIds) {
    const inBase = baseById.has(id);
    const yBlock = yoursById.get(id) ?? null;
    const tBlock = theirsById.get(id) ?? null;
    const bBlock = baseById.get(id) ?? null;

    // Both sides removed it (id in base only) → drop. Shouldn't reach
    // here because the orderedIds came from yours ∪ theirs, but guard.
    if (!yBlock && !tBlock) continue;

    // Only yours has it (and not theirs). Two sub-cases:
    if (yBlock && !tBlock) {
      if (!inBase) {
        // yours added a new block → keep
        merged.push(yBlock);
      } else if (eq(yBlock, bBlock) && !yoursMoved.has(id)) {
        // yours unchanged AND not moved, theirs deleted → drop (auto-merge)
        autoMerged++;
      } else {
        // yours modified OR moved, theirs deleted → modify-delete CONFLICT
        conflicts.push({ id, kind: 'modify-delete', base: bBlock, yours: yBlock, theirs: null });
        merged.push(yBlock);     // tentative resolution = keep yours
      }
      continue;
    }

    // Only theirs has it (and not yours). Symmetric.
    if (tBlock && !yBlock) {
      if (!inBase) {
        merged.push(tBlock);
      } else if (eq(tBlock, bBlock) && !theirsMoved.has(id)) {
        autoMerged++;            // theirs unchanged AND not moved, yours deleted → drop
      } else {
        conflicts.push({ id, kind: 'delete-modify', base: bBlock, yours: null, theirs: tBlock });
        merged.push(tBlock);     // tentative resolution = keep theirs
      }
      continue;
    }

    // Present in both yours and theirs.
    if (yBlock && tBlock) {
      if (!inBase) {
        // Both sides "added" the same id with potentially different
        // content. Practically impossible given fresh-id minting, but
        // tolerate.
        if (eq(yBlock, tBlock)) {
          merged.push(yBlock);
        } else {
          conflicts.push({ id, kind: 'add-add', base: null, yours: yBlock, theirs: tBlock });
          merged.push(yBlock);
        }
        continue;
      }
      // Standard 3-way: present in all three.
      const yChanged = !eq(yBlock, bBlock);
      const tChanged = !eq(tBlock, bBlock);
      if (!yChanged && !tChanged) {
        merged.push(yBlock);     // unchanged on both sides
      } else if (!yChanged && tChanged) {
        merged.push(tBlock);     // theirs only → take theirs
        autoMerged++;
      } else if (yChanged && !tChanged) {
        merged.push(yBlock);     // yours only → take yours
        autoMerged++;
      } else if (eq(yBlock, tBlock)) {
        merged.push(yBlock);     // both changed identically → either
        autoMerged++;
      } else {
        // Codex review M3: when both sides modified a container block
        // (quote/callout) and the modifications are isolated to
        // different children, recurse — yields a clean auto-merge
        // instead of forcing the user to choose a parent side.
        // bBlock is non-null here because `inBase` is true on this branch.
        const recursed = bBlock ? tryRecursiveContainerMerge(bBlock, yBlock, tBlock) : null;
        if (recursed) {
          if (recursed.conflicts.length === 0) {
            merged.push(recursed.merged);
            autoMerged++;
            continue;
          }
          // Recursive merge had conflicts → propagate child conflicts
          // up + tentatively keep the recursively-merged parent.
          conflicts.push(...recursed.conflicts);
          merged.push(recursed.merged);
          continue;
        }
        // Real conflict: both sides modified to different values.
        conflicts.push({ id, kind: 'modify-modify', base: bBlock, yours: yBlock, theirs: tBlock });
        merged.push(yBlock);     // tentative = yours
      }
    }
  }

  return { merged, conflicts, autoMergedCount: autoMerged };
}

/** Codex review M3: if base/yours/theirs are all the same container
 *  kind (quote/callout) AND yours/theirs differ only in their nested
 *  children, recursively merge the children. Returns null when the
 *  block kind isn't recursable, when the parent's "shape" differs
 *  (e.g. callout emoji changed), or when the block is a list (list
 *  items don't have stable ids, so id-based recursion doesn't apply
 *  — list still falls back to top-level conflict). */
function tryRecursiveContainerMerge(
  base: Block,
  yours: Block,
  theirs: Block,
): { merged: Block; conflicts: BlockConflict[] } | null {
  if (base.kind !== yours.kind || base.kind !== theirs.kind) return null;
  if (base.kind === 'quote' && yours.kind === 'quote' && theirs.kind === 'quote') {
    const inner = threeWayMergeBlocks(base.children, yours.children, theirs.children);
    return {
      merged: { ...yours, children: inner.merged },
      conflicts: inner.conflicts,
    };
  }
  if (base.kind === 'callout' && yours.kind === 'callout' && theirs.kind === 'callout') {
    // Emoji is the parent's "shape" — different emoji = parent edit.
    // Auto-resolve emoji per Git-style: one-side change wins, both-side
    // disagreement falls back to yours (parent stays as a separate
    // visible decision).
    const emoji = yours.emoji === theirs.emoji ? yours.emoji
      : yours.emoji === base.emoji ? theirs.emoji
      : theirs.emoji === base.emoji ? yours.emoji
      : yours.emoji;
    const inner = threeWayMergeBlocks(base.children, yours.children, theirs.children);
    return {
      merged: { ...yours, emoji, children: inner.merged },
      conflicts: inner.conflicts,
    };
  }
  return null;
}

/** Merge two orderings into a single sequence preserving relative
 *  order of elements that appear in both. When a position is
 *  ambiguous (= both sides have unique elements at the same anchor),
 *  yours's elements come first. `preferTheirs` flips the reorder
 *  tie-break so theirs' ordering wins (used when only theirs reordered
 *  — see caller). */
function mergeOrderings(
  yoursIds: BlockId[], theirsIds: BlockId[], preferTheirs = false,
): BlockId[] {
  const yIdx = new Map<BlockId, number>();
  yoursIds.forEach((id, i) => yIdx.set(id, i));
  const tIdx = new Map<BlockId, number>();
  theirsIds.forEach((id, i) => tIdx.set(id, i));

  // Walk both lists with two pointers. At each step:
  //   - If the head of yours is also in theirs at a later position,
  //     emit it (yours added or moved-up something theirs hasn't
  //     reached).
  //   - If the head of theirs is also in yours at a later position,
  //     emit it.
  //   - If the heads are equal, emit and advance both.
  //   - If a head is unique to its side (not in the other), emit it.
  const out: BlockId[] = [];
  const emitted = new Set<BlockId>();
  let i = 0;
  let j = 0;
  while (i < yoursIds.length || j < theirsIds.length) {
    const y = i < yoursIds.length ? yoursIds[i] : null;
    const t = j < theirsIds.length ? theirsIds[j] : null;
    if (y !== null && emitted.has(y)) { i++; continue; }
    if (t !== null && emitted.has(t)) { j++; continue; }

    if (y === null) {
      if (t !== null) { out.push(t); emitted.add(t); j++; }
      continue;
    }
    if (t === null) {
      out.push(y); emitted.add(y); i++;
      continue;
    }
    if (y === t) {
      out.push(y); emitted.add(y); i++; j++;
      continue;
    }
    // Both have content but different. Prefer yours when y is unique to
    // yours (= y not in theirs) — emit yours head. Else emit theirs head.
    if (!tIdx.has(y)) {
      out.push(y); emitted.add(y); i++;
      continue;
    }
    if (!yIdx.has(t)) {
      out.push(t); emitted.add(t); j++;
      continue;
    }
    // Both heads exist on the other side at later positions = a reorder
    // disagreement. Tie-break: yours by default (local-wins), or theirs
    // when `preferTheirs` (= only theirs reordered, so honour it).
    if (preferTheirs) {
      out.push(t);
      emitted.add(t);
      j++;
    } else {
      out.push(y);
      emitted.add(y);
      i++;
    }
  }
  return out;
}

/** Apply a per-conflict choice from the merge UI. Returns the
 *  finalised Block[] with conflicts resolved.
 *
 *  Codex review M2: when a choice is missing, fall back to the
 *  block already present in `result.merged` (= the tentative
 *  resolution `threeWayMergeBlocks` placed there). The previous
 *  implementation defaulted to `'yours'` regardless, which dropped
 *  `delete-modify` blocks (yours is null) even though the merge
 *  result tentatively kept theirs. */
export function applyBlockMergeChoices(
  result: BlockMergeResult,
  choices: Record<BlockId, 'yours' | 'theirs' | 'drop'>,
): Block[] {
  const conflictMap = new Map(result.conflicts.map((c) => [c.id, c]));
  const out: Block[] = [];
  for (const block of result.merged) {
    const conflict = conflictMap.get(block.id);
    if (!conflict) {
      out.push(block);
      continue;
    }
    const choice = choices[block.id];
    if (choice === 'drop') continue;
    if (choice === 'yours') {
      if (conflict.yours) out.push(conflict.yours);
      continue;
    }
    if (choice === 'theirs') {
      if (conflict.theirs) out.push(conflict.theirs);
      continue;
    }
    // No choice given — keep the tentative resolution that the merge
    // engine put in `result.merged`.
    out.push(block);
  }
  return out;
}
