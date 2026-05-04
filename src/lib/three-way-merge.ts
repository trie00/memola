// Three-way merge for plain-text (markdown) documents.
//
// Given a common ancestor `base` plus two divergent versions `yours` and
// `theirs`, produce a merged result that:
//   - Preserves edits made on only one side (= auto-merged).
//   - Marks regions where both sides changed in the same place
//     (= true conflicts) with classic git-style markers so the user can
//     decide. The conflict region is structured so the merge UI can pick
//     out the user's vs. the remote text and offer "Accept yours" /
//     "Accept theirs" buttons.
//
// Implementation is line-based — markdown is line-oriented (paragraphs,
// list items, headings each terminated by \n) so this is sufficient for
// the typical conflict shape. For ultra-fine-grained merges (= within a
// single line) the user gets a conflict marker and resolves manually.
//
// No external dependencies — keeps the bookmarklet bundle compact. The
// LCS routine is the standard Myers-Hunt-Szymanski quadratic implementation,
// fine for the document sizes Memola handles (typically ≪ 10k lines).

export interface MergeResult {
  /** Final merged text with conflict markers if any. Lines that one
   *  side added/removed unilaterally are folded in directly. */
  merged: string;
  /** Hunks the merger couldn't auto-resolve. Each one corresponds to
   *  exactly one `<<<<<<< / ======= / >>>>>>>` block in `merged`. */
  conflicts: ConflictHunk[];
  /** Number of hunks that were auto-merged (= one side changed, other
   *  side didn't). Useful for the UI summary. */
  autoMergedCount: number;
}

export interface ConflictHunk {
  /** 0-based id matching the order conflicts appear in `merged`. */
  id: number;
  /** Lines from the local edit. */
  yours: string[];
  /** Lines from the remote edit. */
  theirs: string[];
  /** Lines from the common ancestor (for context — usually shown
   *  collapsed in the UI). */
  base: string[];
}

const MARK_YOURS = '<<<<<<< あなた';
const MARK_BASE = '||||||| 元の状態';
const MARK_SEP = '=======';
const MARK_THEIRS = '>>>>>>> SP 最新';

/** Public entry point. Returns merged text + structured conflict hunks. */
export function threeWayMerge(
  baseText: string,
  yoursText: string,
  theirsText: string,
): MergeResult {
  const base = baseText.split('\n');
  const yours = yoursText.split('\n');
  const theirs = theirsText.split('\n');

  // Compute LCS of (base, yours) and (base, theirs). The diff yields a
  // sequence of base-line dispositions: kept-by-yours, kept-by-theirs,
  // changed-by-yours, changed-by-theirs. We then walk base and emit
  // merged lines accordingly.
  const yoursDiff = diffLines(base, yours);
  const theirsDiff = diffLines(base, theirs);

  // Convert the two diffs into "edit script" form: a list of operations
  // applied to base. Each op carries the base line range it affects
  // and the replacement lines (or empty for delete).
  const yoursOps = buildEditOps(yoursDiff, yours);
  const theirsOps = buildEditOps(theirsDiff, theirs);

  // Walk base linearly; at each base position, decide what to emit.
  const merged: string[] = [];
  const conflicts: ConflictHunk[] = [];
  let autoMerged = 0;

  // Index ops by starting base position for quick lookup.
  const yoursByStart = new Map<number, EditOp>();
  const theirsByStart = new Map<number, EditOp>();
  for (const op of yoursOps) yoursByStart.set(op.baseStart, op);
  for (const op of theirsOps) theirsByStart.set(op.baseStart, op);

  let i = 0;
  while (i < base.length) {
    const yOp = yoursByStart.get(i);
    const tOp = theirsByStart.get(i);

    if (!yOp && !tOp) {
      // Common line — both sides kept it.
      merged.push(base[i]);
      i++;
      continue;
    }

    if (yOp && !tOp) {
      // Only yours touched this region.
      merged.push(...yOp.replacement);
      autoMerged++;
      i = yOp.baseEnd;
      continue;
    }
    if (tOp && !yOp) {
      // Only theirs touched this region.
      merged.push(...tOp.replacement);
      autoMerged++;
      i = tOp.baseEnd;
      continue;
    }

    // Both sides touched this region. If they agree, keep the same.
    // Otherwise, emit a conflict marker.
    if (yOp && tOp) {
      const yEnd = yOp.baseEnd;
      const tEnd = tOp.baseEnd;
      const sameRange = yEnd === tEnd;
      const sameContent = sameRange &&
        yOp.replacement.length === tOp.replacement.length &&
        yOp.replacement.every((l, k) => l === tOp.replacement[k]);
      if (sameContent) {
        merged.push(...yOp.replacement);
        autoMerged++;
        i = yEnd;
        continue;
      }
      // True conflict
      const baseSlice = base.slice(i, Math.max(yEnd, tEnd));
      const conflict: ConflictHunk = {
        id: conflicts.length,
        yours: yOp.replacement,
        theirs: tOp.replacement,
        base: baseSlice,
      };
      conflicts.push(conflict);
      merged.push(MARK_YOURS + ' #' + conflict.id);
      merged.push(...conflict.yours);
      merged.push(MARK_BASE);
      merged.push(...conflict.base);
      merged.push(MARK_SEP);
      merged.push(...conflict.theirs);
      merged.push(MARK_THEIRS + ' #' + conflict.id);
      i = Math.max(yEnd, tEnd);
    }
  }

  // Pure-append from one side beyond base.length — already captured by
  // edit ops with baseStart === base.length.
  const yTail = yoursByStart.get(base.length);
  const tTail = theirsByStart.get(base.length);
  if (yTail || tTail) {
    if (yTail && tTail) {
      const sameContent = yTail.replacement.length === tTail.replacement.length
        && yTail.replacement.every((l, k) => l === tTail.replacement[k]);
      if (sameContent) {
        merged.push(...yTail.replacement);
        autoMerged++;
      } else {
        const conflict: ConflictHunk = {
          id: conflicts.length,
          yours: yTail.replacement,
          theirs: tTail.replacement,
          base: [],
        };
        conflicts.push(conflict);
        merged.push(MARK_YOURS + ' #' + conflict.id);
        merged.push(...conflict.yours);
        merged.push(MARK_BASE);
        merged.push(MARK_SEP);
        merged.push(...conflict.theirs);
        merged.push(MARK_THEIRS + ' #' + conflict.id);
      }
    } else if (yTail) {
      merged.push(...yTail.replacement);
      autoMerged++;
    } else if (tTail) {
      merged.push(...tTail.replacement);
      autoMerged++;
    }
  }

  return {
    merged: merged.join('\n'),
    conflicts,
    autoMergedCount: autoMerged,
  };
}

// ── Internals ───────────────────────────────────────────────────────

interface EditOp {
  /** Inclusive base line index where this op starts. */
  baseStart: number;
  /** Exclusive base line index where this op ends. */
  baseEnd: number;
  /** Lines that replace base[baseStart..baseEnd]. Empty = pure delete. */
  replacement: string[];
}

/** A diff entry for one position in base. `'='` = unchanged, `'-'` =
 *  base-only, `'+'` = side-only. We use the standard "longest common
 *  subsequence" backtrace and pair adjacent +/- into edit blocks. */
type DiffEntry =
  | { op: '='; base: number; side: number }
  | { op: '-'; base: number }
  | { op: '+'; side: number };

/** Standard LCS-based diff. Quadratic in time/space — fine for typical
 *  document sizes; if Memola ever needs to merge multi-megabyte text
 *  this can be swapped for Myers' O(ND) algorithm. */
function diffLines(a: string[], b: string[]): DiffEntry[] {
  const m = a.length;
  const n = b.length;
  // dp[i][j] = LCS length of a[0..i) and b[0..j)
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  // Backtrace
  const out: DiffEntry[] = [];
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      out.push({ op: '=', base: i - 1, side: j - 1 });
      i--; j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      out.push({ op: '-', base: i - 1 });
      i--;
    } else {
      out.push({ op: '+', side: j - 1 });
      j--;
    }
  }
  while (i > 0) { out.push({ op: '-', base: i - 1 }); i--; }
  while (j > 0) { out.push({ op: '+', side: j - 1 }); j--; }
  out.reverse();
  return out;
}

/** Coalesce a `[a vs b]` diff into edit ops keyed on base position. */
function buildEditOps(diff: DiffEntry[], side: string[]): EditOp[] {
  const ops: EditOp[] = [];
  let i = 0;
  while (i < diff.length) {
    const e = diff[i];
    if (e.op === '=') { i++; continue; }
    // Start of a change region. Collect adjacent -/+ entries.
    let baseStart: number | null = null;
    let baseEnd: number | null = null;
    const replacement: string[] = [];
    while (i < diff.length && diff[i].op !== '=') {
      const x = diff[i];
      if (x.op === '-') {
        if (baseStart === null) baseStart = x.base;
        baseEnd = x.base + 1;
      } else if (x.op === '+') {
        replacement.push(side[x.side]);
      }
      i++;
    }
    // Pure-add (no base lines deleted): anchor to the next base position
    // where the next '=' starts (or end-of-base).
    if (baseStart === null) {
      const nextEq = diff.slice(i).find((d) => d.op === '=') as
        { op: '='; base: number; side: number } | undefined;
      baseStart = nextEq ? nextEq.base : (lastBase(diff) + 1);
      baseEnd = baseStart;
    }
    ops.push({ baseStart, baseEnd: baseEnd ?? baseStart, replacement });
  }
  return ops;
}

function lastBase(diff: DiffEntry[]): number {
  for (let k = diff.length - 1; k >= 0; k--) {
    const e = diff[k];
    if (e.op === '=') return e.base;
    if (e.op === '-') return e.base;
  }
  return -1;
}

// ── Conflict-resolution helpers ─────────────────────────────────────

/** Replace conflict #id's region in `merged` with `chosen`. The marker
 *  block (header + body + tail) is recognised by the trailing ' #<id>'.
 *  Returns the updated text. */
export function resolveConflict(
  merged: string,
  id: number,
  chosen: 'yours' | 'theirs' | 'both' | string[],
): string {
  const lines = merged.split('\n');
  const startTag = MARK_YOURS + ' #' + id;
  const endTag = MARK_THEIRS + ' #' + id;
  const sIdx = lines.findIndex((l) => l === startTag);
  const eIdx = lines.findIndex((l, i) => i > sIdx && l === endTag);
  if (sIdx < 0 || eIdx < 0) return merged;
  // Find separators
  let baseSepIdx = -1, sepIdx = -1;
  for (let k = sIdx + 1; k < eIdx; k++) {
    if (lines[k] === MARK_BASE) baseSepIdx = k;
    if (lines[k] === MARK_SEP) sepIdx = k;
  }
  if (sepIdx < 0) return merged;
  const yoursLines = lines.slice(sIdx + 1, baseSepIdx >= 0 ? baseSepIdx : sepIdx);
  const theirsLines = lines.slice(sepIdx + 1, eIdx);
  let pick: string[];
  if (Array.isArray(chosen)) pick = chosen;
  else if (chosen === 'yours') pick = yoursLines;
  else if (chosen === 'theirs') pick = theirsLines;
  else /* both */ pick = [...yoursLines, ...theirsLines];
  const before = lines.slice(0, sIdx);
  const after = lines.slice(eIdx + 1);
  return [...before, ...pick, ...after].join('\n');
}

/** True if the merged text still contains any conflict markers. */
export function hasUnresolvedConflicts(merged: string): boolean {
  return merged.includes(MARK_YOURS) || merged.includes(MARK_SEP) || merged.includes(MARK_THEIRS);
}
