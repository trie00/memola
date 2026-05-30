// Page-store mutations.
//
// `S.meta.pages` is the canonical store; `S.pages` is a derived view
// (getter on S). All page mutations go through these helpers — they
// only touch `meta.pages` and the getter recomputes on the next read.
//
// Why helpers and not direct `S.meta.pages.push(...)` etc.? Two
// reasons: (1) idempotency — duplicate-id pushes are silently
// skipped, which the structural-bug history shows we want; (2) a
// single search target if we ever introduce a Map-based store or
// additional invariants (e.g. parent-id integrity).

import { S, type Page, type PageMeta } from '../state';

/** Look up a page's canonical meta by id. Returns null when unknown.
 *  Centralises the `S.meta.pages.find((p) => p.id === id)` pattern that
 *  was open-coded in 70+ call sites — a single search target if the
 *  store ever moves to a Map-backed index. */
export function metaById(id: string | null | undefined): PageMeta | null {
  if (!id) return null;
  return S.meta.pages.find((p) => p.id === id) || null;
}

/** Add a page to the canonical store. Idempotent — re-adding an
 *  existing id is a no-op. The meta entry is derived from the Page
 *  row plus the caller's `extras` (icon / scope / list / authorId
 *  / etc.). The derived `S.pages` view picks it up on next read. */
export function addPage(p: Page, extras: Partial<PageMeta> = {}): void {
  if (S.meta.pages.some((x) => x.id === p.Id)) return;
  S.meta.pages.push({
    id: p.Id,
    title: p.Title,
    parent: p.ParentId || '',
    type: p.Type,
    ...extras,
  });
}

/** Remove a set of page ids. Pass an array / Set / any iterable;
 *  ids that aren't present are silently skipped. */
export function removePages(ids: Iterable<string>): void {
  const set = new Set(ids);
  if (set.size === 0) return;
  S.meta.pages = S.meta.pages.filter((p) => !set.has(p.id));
}

/** Update a page's title. No-op if the id is unknown. */
export function setPageTitle(id: string, title: string): void {
  const m = S.meta.pages.find((x) => x.id === id);
  if (m) m.title = title;
}
