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

const _DOW_JA = ['日', '月', '火', '水', '木', '金', '土'];

/** Today's date in canonical YYYY-MM-DD form (local time). */
export function todayYMD(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Current JST date/time as a human-readable line. Used by the AI prompt
 *  context so the model can resolve "今日" / "明日" / etc. against a
 *  concrete date even when the browser is in a different timezone. */
export function nowJSTContext(): string {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 3600 * 1000);
  const y = jst.getUTCFullYear();
  const mo = String(jst.getUTCMonth() + 1).padStart(2, '0');
  const d = String(jst.getUTCDate()).padStart(2, '0');
  const hh = String(jst.getUTCHours()).padStart(2, '0');
  const mm = String(jst.getUTCMinutes()).padStart(2, '0');
  const dow = _DOW_JA[jst.getUTCDay()];
  return `現在の日時 (JST): ${y}-${mo}-${d} ${hh}:${mm} (${dow}曜日)`;
}

/** Human-friendly relative timestamp for past Date / unix-ms values.
 *    same day  → "HH:MM"
 *    yesterday → "昨日 HH:MM"
 *    same year → "M/D HH:MM"
 *    other     → "YYYY/M/D"
 *  Used by saved-time labels, draft listings, etc. — keep one version so
 *  drift between callers doesn't surface as inconsistent UI. */
export function formatRelativeTime(input: number | Date | string): string {
  const d = input instanceof Date ? input : new Date(input);
  if (isNaN(d.getTime())) return '';
  const now = new Date();
  const same = d.toDateString() === now.toDateString();
  const yest = new Date(now); yest.setDate(now.getDate() - 1);
  const isYest = d.toDateString() === yest.toDateString();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  if (same) return `${hh}:${mm}`;
  if (isYest) return `昨日 ${hh}:${mm}`;
  if (d.getFullYear() === now.getFullYear()) {
    return `${d.getMonth() + 1}/${d.getDate()} ${hh}:${mm}`;
  }
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

/** Add `delta` days to a YYYY-MM-DD string. Returns canonical YYYY-MM-DD. */
export function addDaysYMD(ymd: string, delta: number): string {
  const m = ymd.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return ymd;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  d.setUTCDate(d.getUTCDate() + delta);
  const y = d.getUTCFullYear();
  const mo = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${mo}-${day}`;
}

/** "2026-05-02 (Sat)" style readable label for a YYYY-MM-DD. */
export function formatDailyTitle(ymd: string): string {
  const m = ymd.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return ymd;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  const dow = _DOW_JA[d.getUTCDay()];
  return `${ymd} (${dow})`;
}

/** True if a string looks like an auto-generated daily-note title:
 *  YYYY-MM-DD or YYYY-MM-DD (曜) — used to detect "user renamed to a custom
 *  title" for the convert-to-page prompt. */
export function isDailyTitleFormat(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}(\s*\([^)]+\))?\s*$/.test(s);
}
