// Per-block "last editor + last edit time" stamping.
//
// Blocks carry optional `lastBy` (SP user id) / `lastAt` (epoch ms)
// metadata recording who last changed each block's content. Stamps are
// applied at SAVE time by diffing the to-save body against the base
// (the version the editor started from): blocks whose content changed
// (or are new) get a fresh stamp; unchanged blocks carry their existing
// stamp forward.
//
// Stamps are PURE METADATA — every content-equality check in the app
// ignores them (`stampInsensitiveJson` / the merge engine's strip set /
// the renderer's block-hash). That keeps them from causing spurious
// merge conflicts, dirty flags, or re-renders.
//
// Stamping is TOP-LEVEL only: "who last edited this block" is the
// meaningful granularity, and keeping stamps off nested children keeps
// the equality-insensitivity surface small.

import type { Block } from './blocks';
import { parseBlocksJson, serializeBlocks } from '../api/pages';

/** JSON.stringify replacer that drops the stamp keys, so two blocks
 *  that differ only in `lastBy`/`lastAt` serialise identically. */
export function stampReplacer(key: string, value: unknown): unknown {
  return key === 'lastBy' || key === 'lastAt' ? undefined : value;
}

/** Content fingerprint of a block ignoring its stamp (and the stamps of
 *  any nested children). Two blocks with the same content but different
 *  stamps share a fingerprint. */
function contentFp(b: Block): string {
  return JSON.stringify(b, stampReplacer);
}

/** True when a body string is JSON-blocks (the only shape we stamp /
 *  content-compare). Plain-text / legacy / empty bodies are passed
 *  through untouched by the helpers below. */
function isBlockJson(body: string): boolean {
  return body.trim().startsWith('[');
}

/** True if two serialized bodies are equal ignoring per-block stamps.
 *  Used wherever "did the content actually change?" matters. Non-block
 *  bodies fall back to raw string equality. */
export function bodiesContentEqual(a: string, b: string): boolean {
  if (a === b) return true;
  if (!isBlockJson(a) || !isBlockJson(b)) return a === b;
  try {
    const pa = JSON.stringify(parseBlocksJson(a), stampReplacer);
    const pb = JSON.stringify(parseBlocksJson(b), stampReplacer);
    return pa === pb;
  } catch {
    return a === b;
  }
}

/** Stamp the to-save body: top-level blocks whose content changed vs
 *  `baseJson` (or are new) get `{ lastBy: by, lastAt: at }`; unchanged
 *  blocks keep whatever stamp the base already had. Returns the
 *  re-serialized JSON. Pure — does not mutate inputs. */
export function stampBodyForSave(
  toSaveJson: string,
  baseJson: string,
  by: number,
  at: number,
): string {
  // Only stamp real block-JSON bodies; pass plain-text / legacy /
  // empty bodies through unchanged.
  if (!isBlockJson(toSaveJson)) return toSaveJson;
  const next = parseBlocksJson(toSaveJson);
  const prev = parseBlocksJson(baseJson);
  const prevById = new Map<string, Block>();
  for (const b of prev) prevById.set(b.id, b);
  const stamped = next.map((b): Block => {
    const old = prevById.get(b.id);
    if (old && contentFp(old) === contentFp(b)) {
      // Unchanged content → carry the base's stamp forward (may be
      // undefined for legacy/never-stamped blocks).
      const carried: Block = { ...b };
      if (old.lastBy !== undefined) carried.lastBy = old.lastBy;
      else delete carried.lastBy;
      if (old.lastAt !== undefined) carried.lastAt = old.lastAt;
      else delete carried.lastAt;
      return carried;
    }
    // New or content-changed → stamp as the current user, now.
    return { ...b, lastBy: by, lastAt: at };
  });
  return serializeBlocks(stamped);
}
