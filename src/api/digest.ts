// Form digest cache for SharePoint POST requests.

import { SITE } from '../config';

let _dig: string | null = null;
let _digX = 0;

/** Drop the cached digest so the next request fetches a fresh one. Used
 *  by workspace switching (digest is per-site and stale once SITE changes). */
export function clearDigestCache(): void {
  _dig = null;
  _digX = 0;
}

export async function getDigest(): Promise<string> {
  if (_dig && Date.now() < _digX) return _dig;
  const r = await fetch(SITE + '/_api/contextinfo', {
    method: 'POST',
    headers: { Accept: 'application/json;odata=verbose' },
    credentials: 'include',
  });
  if (!r.ok) throw new Error('認証失敗(' + r.status + ')。SharePointにログインしてください。');
  // SP REST returns a verbose envelope. Cast the dynamic JSON shape locally —
  // the shape is well-known but never appears in TypeScript types.
  const j = (await r.json()) as { d: { GetContextWebInformation: { FormDigestValue: string } } };
  _dig = j.d.GetContextWebInformation.FormDigestValue;
  _digX = Date.now() + 25 * 60 * 1000;
  return _dig;
}
