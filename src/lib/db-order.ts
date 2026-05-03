// Per-DB column / row ordering and view settings, persisted in localStorage.
//
// SP doesn't expose a per-list "user view order" we can mutate via REST in a
// simple way, so we keep order client-side. New columns/rows that aren't yet
// in the saved order are appended at the end (so AI-added columns and new
// rows don't disappear from view).

import {
  prefDbColOrderLegacy, prefDbRowOrderLegacy, prefDbGanttConfig,
} from './prefs';

// ── Column order ────────────────────────────────────────

export function loadColOrder(listTitle: string): string[] | null {
  const v = prefDbColOrderLegacy(listTitle).get();
  return v.length === 0 ? null : v;
}

export function saveColOrder(listTitle: string, order: string[]): void {
  prefDbColOrderLegacy(listTitle).set(order);
}

/** Reorder fields per the saved list. Unknown fields (new columns) appended. */
export function applyColOrder<T extends { InternalName: string }>(fields: T[], listTitle: string): T[] {
  const saved = loadColOrder(listTitle);
  if (!saved || saved.length === 0) return fields;
  const map = new Map(fields.map((f) => [f.InternalName, f]));
  const ordered: T[] = [];
  for (const name of saved) {
    const f = map.get(name);
    if (f) { ordered.push(f); map.delete(name); }
  }
  for (const f of map.values()) ordered.push(f);
  return ordered;
}

// ── Row order ───────────────────────────────────────────

export function loadRowOrder(listTitle: string): number[] | null {
  const v = prefDbRowOrderLegacy(listTitle).get();
  return v.length === 0 ? null : v;
}

export function saveRowOrder(listTitle: string, order: number[]): void {
  prefDbRowOrderLegacy(listTitle).set(order);
}

/** Reorder items per the saved id list. New items (not in saved) appended. */
export function applyRowOrder<T extends { Id: number }>(items: T[], listTitle: string): T[] {
  const saved = loadRowOrder(listTitle);
  if (!saved || saved.length === 0) return items;
  const map = new Map(items.map((it) => [it.Id, it]));
  const ordered: T[] = [];
  for (const id of saved) {
    const it = map.get(id);
    if (it) { ordered.push(it); map.delete(id); }
  }
  for (const it of map.values()) ordered.push(it);
  return ordered;
}

// ── Gantt chart config (start / end date column) ────────

export interface GanttConfig {
  start: string;        // InternalName of the start-date field (required)
  end: string | null;   // InternalName of the end-date field, or null for single-day bars
}

export function loadGanttConfig(listTitle: string): GanttConfig | null {
  const v = prefDbGanttConfig<GanttConfig | null>(listTitle, null).get();
  return v;
}

export function saveGanttConfig(listTitle: string, cfg: GanttConfig): void {
  prefDbGanttConfig<GanttConfig>(listTitle, cfg).set(cfg);
}

// ── Generic drag reorder helper (pure) ──────────────────

/** Move element at `from` to `to` in a copy of `arr`. */
export function moveItem<T>(arr: T[], from: number, to: number): T[] {
  if (from === to || from < 0 || from >= arr.length) return arr.slice();
  const out = arr.slice();
  const [el] = out.splice(from, 1);
  const dest = to > from ? to - 1 : to;
  out.splice(dest, 0, el);
  return out;
}
