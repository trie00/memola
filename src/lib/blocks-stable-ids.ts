// Stable block-id assignment.
//
// Block IDs are minted fresh by `mdToBlocks(md)` on every parse — the
// parser doesn't know about prior IDs. For block-id-based 3-way merge
// to work, IDs must persist across edits: if a user edits a paragraph,
// its ID should stay the same so the merge sees "block X was edited"
// rather than "block X was deleted, block Y was inserted".
//
// `assignStableBlockIds(oldBlocks, newBlocks)` walks the old + new
// trees and reuses old IDs on new blocks where structural / content
// match is unambiguous. Unmatched new blocks keep their fresh IDs.
//
// Strategy (greedy, content-then-position):
//   1. Build fingerprint → [oldBlock] map. Fingerprint = `kind` plus
//      a content hash (text content for paragraphs / headings / todos
//      / code, emoji for callouts, ordered+itemCount for lists).
//   2. For each new block, look up its fingerprint. Multiple matches?
//      → pick the one closest to the new block's position (= least
//      moved). Single match? → adopt. None? → keep fresh ID.
//   3. Recurse into nested blocks (callout / quote / list items).
//
// Edge cases handled:
//   - Reordered blocks: matched by content, ID survives the move.
//   - Edited block with same kind: fingerprint changes → fresh ID.
//     This means small edits cause the ID to "rotate", but that's
//     correct for merge purposes (the block is structurally
//     equivalent to a new one for diff purposes).
//   - Identical content blocks: positional fallback. Both old and new
//     instances of `<p>hello</p>` map by index.
//
// The function is pure / immutable: returns a fresh tree, doesn't
// mutate inputs.

import type { Block, BlockId, Inline } from './blocks';

/** Inline-fingerprint helper — collapses inline content to a short
 *  string suitable for equality / lookup. Strips formatting; only
 *  text + structure positions count. */
function inlineFp(inline: Inline[]): string {
  const out: string[] = [];
  for (const i of inline) {
    if (i.kind === 'text') out.push(i.text);
    else if (i.kind === 'code') out.push('`' + i.text + '`');
    else if (i.kind === 'br') out.push('\n');
    else if (i.kind === 'pagelink') out.push('[[' + i.pageId + (i.alias ? '|' + i.alias : '') + ']]');
    else if (i.kind === 'dailylink') out.push('[[daily:' + i.date + (i.alias ? '|' + i.alias : '') + ']]');
    else if (i.kind === 'link') out.push('[' + inlineFp(i.children) + '](' + i.href + ')');
    else if (i.kind === 'bold' || i.kind === 'italic' || i.kind === 'strike') {
      out.push(inlineFp(i.children));
    }
  }
  return out.join('');
}

/** One-line fingerprint for a block. Identical content → identical
 *  fingerprint. Edits invalidate it (intentional — see header).
 *
 *  Codex review B5/B6: containers (quote/callout/list) get a SHALLOW
 *  fingerprint that depends only on the parent's shape — not on child
 *  fingerprints. A single-child edit no longer flips the parent's id,
 *  and recursion into children handles their identity separately. */
function blockFp(b: Block): string {
  switch (b.kind) {
    case 'p':
    case 'h1': case 'h2': case 'h3':
      return b.kind + ':' + inlineFp(b.inline);
    case 'todo':
      return 'todo:' + (b.checked ? '1' : '0') + ':' + inlineFp(b.inline);
    case 'code':
      return 'code:' + b.lang + ':' + b.text;
    case 'rule':
      return 'rule';
    case 'quote':
      return 'quote';                          // shallow — children handled by recursion
    case 'callout':
      return 'callout:' + b.emoji;             // shape = emoji
    case 'list':
      return 'list:' + (b.ordered ? 'o' : 'u'); // shape = ordering only
    case 'table':
      return 'table:' + b.rows.length + ':' + (b.rows[0]?.length || 0);
    case 'linkdb':
      return 'linkdb:' + b.dbId + ':' + b.view;
    case 'ai':
      return 'ai:' + b.prompt;
    case 'image':
      return 'image:' + b.src;
  }
}

/** Codex review B5: similarity score between two text strings
 *  (= 1 - Levenshtein / max-length). Used as the fuzzy-match scoring
 *  when exact fingerprint match fails. Threshold 0.8 means "80% of
 *  characters survived" — a 1-char edit on a 10-char paragraph
 *  scores 0.9, easily above threshold; a complete rewrite scores
 *  near 0 and stays unmatched. */
function similarity(a: string, b: string): number {
  if (a === b) return 1;
  if (!a && !b) return 1;
  if (!a || !b) return 0;
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  return 1 - dist / maxLen;
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  // Cap at 1000 chars per side to keep cost bounded — beyond that
  // the similarity number is anyway not meaningful.
  if (m > 1000 || n > 1000) return Math.max(m, n);
  let prev: number[] = new Array(n + 1);
  let cur: number[] = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    cur[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    const tmp = prev;
    prev = cur;
    cur = tmp;
  }
  return prev[n];
}

const SIMILARITY_THRESHOLD = 0.8;

/** Text content for similarity scoring. Returns null when the kind
 *  isn't a text-bearing leaf (containers / atomic blocks aren't fuzzy
 *  matched — they have shallow fps already). */
function textForSimilarity(b: Block): string | null {
  switch (b.kind) {
    case 'p':
    case 'h1': case 'h2': case 'h3':
      return inlineFp(b.inline);
    case 'todo':
      return (b.checked ? '[x] ' : '[ ] ') + inlineFp(b.inline);
    case 'code':
      return b.lang + '\n' + b.text;
    default:
      return null;
  }
}

/** Bag of (fingerprint, position) → block id, used for greedy
 *  positional matching when multiple old blocks share a fingerprint. */
interface OldEntry {
  id: BlockId;
  position: number;
  used: boolean;
  block: Block;
}

interface OldIndex {
  byFp: Map<string, OldEntry[]>;
  /** All entries flat — used for the fuzzy fallback when an exact fp
   *  match fails. We linear-scan this; lengths are typically dozens of
   *  blocks per page. */
  all: OldEntry[];
}

function buildOldIndex(oldBlocks: Block[]): OldIndex {
  const byFp = new Map<string, OldEntry[]>();
  const all: OldEntry[] = [];
  oldBlocks.forEach((b, position) => {
    const fp = blockFp(b);
    const arr = byFp.get(fp) || [];
    const entry: OldEntry = { id: b.id, position, used: false, block: b };
    arr.push(entry);
    byFp.set(fp, arr);
    all.push(entry);
  });
  return { byFp, all };
}

/** Pick the closest-position unused entry from candidates and mark it
 *  used. Returns null when no candidates remain. */
function consumeClosest(
  candidates: OldEntry[],
  newPosition: number,
): OldEntry | null {
  let best: OldEntry | null = null;
  let bestDistance = Infinity;
  for (const c of candidates) {
    if (c.used) continue;
    const d = Math.abs(c.position - newPosition);
    if (d < bestDistance) {
      best = c;
      bestDistance = d;
    }
  }
  if (best) best.used = true;
  return best;
}

/** Walk new blocks and reassign IDs from oldBlocks where a match is
 *  found. Returns a fresh array; doesn't mutate inputs. */
export function assignStableBlockIds(
  oldBlocks: Block[] | null | undefined,
  newBlocks: Block[],
): Block[] {
  if (!oldBlocks || oldBlocks.length === 0) return newBlocks;
  const idx = buildOldIndex(oldBlocks);
  return newBlocks.map((b, position) => stabilizeOne(b, position, idx));
}

/** Codex review B5: try exact fp match first, then fall back to fuzzy
 *  match (≥80% similarity) on text-bearing leaves of the same kind.
 *  This keeps a paragraph's id stable across small edits — without
 *  fuzzy match, a 1-char edit invalidates the fp and the merge sees
 *  delete+insert instead of a content edit. */
function findOldMatch(
  b: Block,
  position: number,
  idx: OldIndex,
): OldEntry | null {
  const fp = blockFp(b);
  const exact = idx.byFp.get(fp);
  const exactMatch = exact ? consumeClosest(exact, position) : null;
  if (exactMatch) return exactMatch;
  // Fuzzy fallback — text-bearing leaves only.
  const text = textForSimilarity(b);
  if (text === null) return null;
  let best: OldEntry | null = null;
  let bestScore = SIMILARITY_THRESHOLD;
  let bestDistance = Infinity;
  for (const entry of idx.all) {
    if (entry.used) continue;
    if (entry.block.kind !== b.kind) continue;
    const oldText = textForSimilarity(entry.block);
    if (oldText === null) continue;
    const score = similarity(text, oldText);
    if (score < bestScore) continue;
    const dist = Math.abs(entry.position - position);
    if (score > bestScore || (score === bestScore && dist < bestDistance)) {
      best = entry;
      bestScore = score;
      bestDistance = dist;
    }
  }
  if (best) best.used = true;
  return best;
}

function stabilizeOne(b: Block, position: number, idx: OldIndex): Block {
  const matched = findOldMatch(b, position, idx);
  const id = matched?.id ?? b.id;
  // Recurse into nested children — even when the parent matched,
  // children may have been edited and need their own stabilization
  // against the matched parent's children.
  switch (b.kind) {
    case 'callout': {
      const oldChildren = matched && matched.block.kind === 'callout'
        ? matched.block.children : null;
      return { ...b, id, children: assignStableBlockIds(oldChildren, b.children) };
    }
    case 'quote': {
      const oldChildren = matched && matched.block.kind === 'quote'
        ? matched.block.children : null;
      return { ...b, id, children: assignStableBlockIds(oldChildren, b.children) };
    }
    case 'list': {
      // Codex review B6: match list items by item-fingerprint instead
      // of array index. Inserting an item at position 0 used to misalign
      // every subsequent item; with item-fp matching the unchanged
      // tail items keep their ids.
      const oldItems = matched && matched.block.kind === 'list'
        ? matched.block.items : null;
      const items = matchListItems(oldItems, b.items);
      return { ...b, id, items };
    }
    default:
      return { ...b, id };
  }
}

/** Codex review B6: pair new list items to old by best item-fp +
 *  position match, then run assignStableBlockIds on each pair. Items
 *  with no good match keep their fresh ids. Greedy — consumes each
 *  old item at most once. */
function matchListItems(
  oldItems: Block[][] | null | undefined,
  newItems: Block[][],
): Block[][] {
  if (!oldItems || oldItems.length === 0) return newItems;
  const fp = (item: Block[]): string => item.map(blockFp).join('|');
  const oldFps = oldItems.map(fp);
  const used = new Array<boolean>(oldItems.length).fill(false);
  return newItems.map((item, newIdx) => {
    const newFp = fp(item);
    let bestIdx = -1;
    let bestDistance = Infinity;
    for (let i = 0; i < oldItems.length; i++) {
      if (used[i]) continue;
      if (oldFps[i] !== newFp) continue;
      const d = Math.abs(i - newIdx);
      if (d < bestDistance) {
        bestIdx = i;
        bestDistance = d;
      }
    }
    if (bestIdx === -1) {
      // No exact item match — fall back to positional pairing for the
      // ID-recursion within the item, but only when an old item at the
      // same position is still unused. This preserves the prior simple
      // behaviour for in-place item edits.
      if (newIdx < oldItems.length && !used[newIdx]) {
        used[newIdx] = true;
        return assignStableBlockIds(oldItems[newIdx], item);
      }
      return item;
    }
    used[bestIdx] = true;
    return assignStableBlockIds(oldItems[bestIdx], item);
  });
}
