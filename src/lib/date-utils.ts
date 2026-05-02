// Pure date parsing/formatting helpers used by DB cells and row props.

/**
 * Accept any of: YYYYMMDD / YYYY-MM-DD / YYYY/MM/DD / YYYY.MM.DD
 * Zero-padding optional. Returns canonical "YYYY-MM-DD" or null on invalid.
 */
export function parseFlexibleDate(input: string | null | undefined): string | null {
  if (!input) return null;
  const s = String(input).trim();
  if (!s) return null;

  let y = '';
  let mo = '';
  let d = '';

  // 8-digit form: 20260515
  const compact = s.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (compact) {
    y = compact[1]; mo = compact[2]; d = compact[3];
  } else {
    // Separator forms: any of - / .
    const sep = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
    if (!sep) return null;
    y = sep[1];
    mo = sep[2].padStart(2, '0');
    d = sep[3].padStart(2, '0');
  }

  // Sanity check via Date roundtrip — catches 2026-02-30 etc.
  const t = new Date(`${y}-${mo}-${d}T00:00:00Z`);
  if (isNaN(t.getTime())) return null;
  if (
    t.getUTCFullYear() !== Number(y) ||
    t.getUTCMonth() + 1 !== Number(mo) ||
    t.getUTCDate() !== Number(d)
  ) return null;

  return `${y}-${mo}-${d}`;
}

/** Format an SP-returned date (ISO or YYYY-MM-DD) as JST YYYY-MM-DD. */
export function formatDateJST(value: string | null | undefined): string {
  if (!value) return '';
  // Already in YYYY-MM-DD form?
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const d = new Date(value);
  if (isNaN(d.getTime())) return '';
  const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  const y = jst.getUTCFullYear();
  const m = String(jst.getUTCMonth() + 1).padStart(2, '0');
  const day = String(jst.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
