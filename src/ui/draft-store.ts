// Draft store — persists user edits to localStorage when they would
// otherwise be lost (currently only on conflict-discard).
//
// Storage layout: keys of the form
//   n365.draft.<pageId>.<unixMs>
// each holding a JSON record:
//   { pageId, pageTitle, title, body, savedAt, reason }
//
// Cleanup policy:
//   - per-page max 5 (oldest dropped on save)
//   - drafts older than DRAFT_MAX_AGE_MS auto-purged on access
//   - drafts for permanently-deleted pages purged on `purgeOrphaned`

const KEY_PREFIX = 'n365.draft.';
const PER_PAGE_MAX = 5;
const DRAFT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;       // 7 days

export type DraftReason =
  | 'conflict-discarded'   // user picked 「相手の版を表示」 on conflict
  | 'manual';              // (future: user explicitly saved a draft)

export interface Draft {
  /** localStorage key — unique per record, useful for delete operations. */
  key: string;
  pageId: string;
  pageTitle: string;
  title: string;
  body: string;
  savedAt: number;
  reason: DraftReason;
}

function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch { return null; }
}

function writeJSON(key: string, value: unknown): void {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch { /* quota / serialization failures fail silently — draft loss is
              acceptable, the SP-side data isn't affected */ }
}

function listAllKeys(): string[] {
  const out: string[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(KEY_PREFIX)) out.push(k);
    }
  } catch { /* ignore */ }
  return out;
}

function parseKey(key: string): { pageId: string; ts: number } | null {
  const tail = key.slice(KEY_PREFIX.length);
  const dot = tail.lastIndexOf('.');
  if (dot < 0) return null;
  const pageId = tail.slice(0, dot);
  const ts = Number(tail.slice(dot + 1));
  if (!pageId || !Number.isFinite(ts)) return null;
  return { pageId, ts };
}

function load(key: string): Draft | null {
  const rec = readJSON<Omit<Draft, 'key'>>(key);
  if (!rec) return null;
  return { key, ...rec };
}

/** Reap drafts older than DRAFT_MAX_AGE_MS. Idempotent and safe to call
 *  on every list/save operation — it walks localStorage once. */
function reapStale(): void {
  const cutoff = Date.now() - DRAFT_MAX_AGE_MS;
  for (const k of listAllKeys()) {
    const p = parseKey(k);
    if (!p) continue;
    if (p.ts < cutoff) {
      try { localStorage.removeItem(k); } catch { /* ignore */ }
    }
  }
}

/** Save a new draft for `pageId`. Trims the oldest drafts of the same
 *  page to keep at most PER_PAGE_MAX records, then writes the new one.
 *  Returns the assigned key. */
export function saveDraft(input: {
  pageId: string;
  pageTitle: string;
  title: string;
  body: string;
  reason?: DraftReason;
}): string {
  reapStale();
  const ts = Date.now();
  const key = KEY_PREFIX + input.pageId + '.' + ts;
  const rec = {
    pageId: input.pageId,
    pageTitle: input.pageTitle,
    title: input.title,
    body: input.body,
    savedAt: ts,
    reason: input.reason || 'conflict-discarded',
  };
  writeJSON(key, rec);
  // Enforce per-page cap (keep newest)
  const same = listForPage(input.pageId);
  if (same.length > PER_PAGE_MAX) {
    same.sort((a, b) => b.savedAt - a.savedAt);
    for (const old of same.slice(PER_PAGE_MAX)) {
      try { localStorage.removeItem(old.key); } catch { /* ignore */ }
    }
  }
  return key;
}

export function listForPage(pageId: string): Draft[] {
  reapStale();
  const out: Draft[] = [];
  for (const k of listAllKeys()) {
    const p = parseKey(k);
    if (!p || p.pageId !== pageId) continue;
    const d = load(k);
    if (d) out.push(d);
  }
  out.sort((a, b) => b.savedAt - a.savedAt);
  return out;
}

export function listAll(): Draft[] {
  reapStale();
  const out: Draft[] = [];
  for (const k of listAllKeys()) {
    const d = load(k);
    if (d) out.push(d);
  }
  out.sort((a, b) => b.savedAt - a.savedAt);
  return out;
}

export function countAll(): number {
  reapStale();
  let n = 0;
  for (const k of listAllKeys()) {
    if (parseKey(k)) n++;
  }
  return n;
}

export function deleteDraft(key: string): void {
  try { localStorage.removeItem(key); } catch { /* ignore */ }
}

/** Remove every draft for the given page. Used when a page is permanently
 *  purged from trash — the drafts can never be applied to that page again. */
export function deleteAllForPage(pageId: string): void {
  for (const k of listAllKeys()) {
    const p = parseKey(k);
    if (p?.pageId === pageId) {
      try { localStorage.removeItem(k); } catch { /* ignore */ }
    }
  }
}

/** Purge drafts whose origin pages no longer exist in the supplied list.
 *  `livePageIds` should be `S.meta.pages.map(p => p.id)`. */
export function purgeOrphaned(livePageIds: Set<string>): void {
  for (const k of listAllKeys()) {
    const p = parseKey(k);
    if (!p) continue;
    if (!livePageIds.has(p.pageId)) {
      try { localStorage.removeItem(k); } catch { /* ignore */ }
    }
  }
}
