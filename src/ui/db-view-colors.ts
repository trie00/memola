// DB view-level colouring (option A): manual highlight of rows / columns
// stored on the VIEW (a per-DB-list pref), NOT on the row data — so the
// structured data stays clean (exports / other views / formulas unaffected).
//
// Keyed by row Id and column InternalName, so editing values, reordering,
// filtering or sorting never disturbs the colours. Deleted rows/cols leave
// harmless stale entries; `gcDbColors` prunes them on table load.

import { prefDbViewColors, type DbColorMap } from '../lib/prefs';

/** Light presets + clear. */
export const DB_COLOR_PRESETS: Array<{ label: string; value: string }> = [
  { label: 'なし', value: '' },
  { label: 'グレー', value: '#f1f1ef' },
  { label: '赤', value: '#fdebec' },
  { label: 'オレンジ', value: '#fbecdd' },
  { label: '黄', value: '#fbf3db' },
  { label: '緑', value: '#ddedea' },
  { label: '青', value: '#ddebf1' },
  { label: '紫', value: '#eae4f2' },
  { label: 'ピンク', value: '#f4dfeb' },
];

export function getDbColors(listTitle: string): DbColorMap {
  return prefDbViewColors.get()[listTitle] || {};
}

function update(listTitle: string, fn: (m: DbColorMap) => void): void {
  const all = prefDbViewColors.get();
  const m: DbColorMap = { rows: { ...(all[listTitle]?.rows || {}) }, cols: { ...(all[listTitle]?.cols || {}) } };
  fn(m);
  all[listTitle] = m;
  prefDbViewColors.set(all);
}

export function setRowColor(listTitle: string, rowId: number, color: string): void {
  update(listTitle, (m) => {
    if (color) m.rows![String(rowId)] = color; else delete m.rows![String(rowId)];
  });
}

export function setColColor(listTitle: string, internalName: string, color: string): void {
  update(listTitle, (m) => {
    if (color) m.cols![internalName] = color; else delete m.cols![internalName];
  });
}

/** Resolve the background for one cell: column colour wins over row colour
 *  (more specific). '' = no overlay. */
export function cellOverlay(m: DbColorMap, rowId: number, internalName: string): string {
  return m.cols?.[internalName] || m.rows?.[String(rowId)] || '';
}

/** Drop stale row entries (rows no longer present). Columns are left alone
 *  (cheap, and column lists are tiny). */
export function gcDbColors(listTitle: string, liveRowIds: number[]): void {
  const all = prefDbViewColors.get();
  const m = all[listTitle];
  if (!m?.rows) return;
  const live = new Set(liveRowIds.map(String));
  let changed = false;
  for (const id of Object.keys(m.rows)) {
    if (!live.has(id)) { delete m.rows[id]; changed = true; }
  }
  if (changed) prefDbViewColors.set(all);
}

/** Floating colour-swatch popup near (x, y). Calls `onPick` with the chosen
 *  colour ('' = clear). Auto-dismisses on outside click. */
export function openColorPalette(x: number, y: number, onPick: (color: string) => void): void {
  document.getElementById('memola-dbcolor-pop')?.remove();
  const pop = document.createElement('div');
  pop.id = 'memola-dbcolor-pop';
  pop.className = 'memola-dbcolor-pop';
  pop.style.left = (x + window.scrollX) + 'px';
  pop.style.top = (y + window.scrollY) + 'px';
  for (const c of DB_COLOR_PRESETS) {
    const sw = document.createElement('button');
    sw.className = 'memola-dbcolor-sw' + (c.value ? '' : ' none');
    sw.title = c.label;
    if (c.value) sw.style.background = c.value;
    sw.addEventListener('mousedown', (e) => {
      e.preventDefault(); e.stopPropagation();
      onPick(c.value);
      pop.remove();
    });
    pop.appendChild(sw);
  }
  (document.getElementById('memola-overlay') || document.body).appendChild(pop);
  const dismiss = (e: MouseEvent): void => {
    if (pop.contains(e.target as Node)) return;
    pop.remove();
    document.removeEventListener('mousedown', dismiss, true);
  };
  setTimeout(() => document.addEventListener('mousedown', dismiss, true), 0);
}
