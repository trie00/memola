// DB view-level colour overlay — cell colour precedence.
// (Column colour wins over row colour; '' when neither set.)

import { describe, it, expect } from 'vitest';
import { cellOverlay } from '../src/ui/db-view-colors';
import type { DbColorMap } from '../src/lib/prefs';

describe('cellOverlay', () => {
  it('returns the row colour when only the row is coloured', () => {
    const m: DbColorMap = { rows: { '5': '#fdebec' } };
    expect(cellOverlay(m, 5, 'Status')).toBe('#fdebec');
    expect(cellOverlay(m, 6, 'Status')).toBe('');     // other row → none
  });

  it('column colour wins over row colour (more specific)', () => {
    const m: DbColorMap = { rows: { '5': '#fdebec' }, cols: { 'Status': '#ddebf1' } };
    expect(cellOverlay(m, 5, 'Status')).toBe('#ddebf1');   // col overrides row
    expect(cellOverlay(m, 5, 'Other')).toBe('#fdebec');    // non-coloured col → row colour
  });

  it('returns empty when nothing applies', () => {
    expect(cellOverlay({}, 1, 'X')).toBe('');
    expect(cellOverlay({ rows: {}, cols: {} }, 1, 'X')).toBe('');
  });
});
