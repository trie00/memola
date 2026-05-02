// Thin SharePoint REST helpers.
//
// Avoids hand-repeating the verbose-OData boilerplate (Accept header, JSON
// envelope unwrap, list URL construction) at every call site. Network errors
// surface as throws so callers can show toasts; status checks are caller-side
// when finer-grained handling is needed.

import { SITE } from '../config';

const ACCEPT_VERBOSE = 'application/json;odata=verbose';

/** Common headers for verbose-OData writes (POST). Add X-RequestDigest separately. */
export const ODATA_POST_HEADERS = {
  Accept: ACCEPT_VERBOSE,
  'Content-Type': ACCEPT_VERBOSE,
} as const;

/** Build a `/web/lists/getbytitle('…')` URL with an optional trailing path. */
export function spListUrl(listTitle: string, suffix = ''): string {
  return SITE + "/_api/web/lists/getbytitle('" + listTitle + "')" + suffix;
}

/** GET a verbose-OData endpoint and return the unwrapped `d` payload. Returns null on non-OK. */
export async function spGetD<T>(url: string): Promise<T | null> {
  const r = await fetch(url, { headers: { Accept: ACCEPT_VERBOSE }, credentials: 'include' });
  if (!r.ok) return null;
  const j = (await r.json()) as { d: T };
  return j.d;
}
