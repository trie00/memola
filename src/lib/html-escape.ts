// Single canonical HTML-escape used everywhere in memola.
//
// Until consolidating, this same function was redefined ad-hoc in 17
// different files — each with subtle drift (some escaped `'` and `"`,
// others didn't). Drift in escaping is the classic XSS vector, so we
// pin one definition here and have all callers import it.
//
// Coverage: the standard 5 entities (&, <, >, ", ').

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
