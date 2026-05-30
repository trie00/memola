// Site URL / folder path detection. Initialised from `location` at runtime.

import { prefCurrentWsUrl } from './lib/prefs';

export let SITE = '';
export let SITE_REL = '';
export let FOLDER = '';
export const META = '_meta.json';
// Autosave debounce. Fires this long after the user's last edit. Kept
// fairly long (vs. the old 2s) to cut SharePoint version churn — every
// save mints a new SP list version, so a chatty debounce buried pages
// under hundreds of versions. Pending edits still flush immediately on
// page-switch / blur / tab-close (see flushPendingSave), so a longer idle
// debounce doesn't widen the real data-loss window in practice.
export const SAVE_MS = 10000;
/** SharePoint per-list version retention cap. With versioning enabled SP
 *  keeps a version per item write; without a cap they accumulate forever.
 *  Provisioning sets EnableVersioning + this MajorVersionLimit so SP prunes
 *  the oldest automatically (keeps recent history, bounds storage). */
export const SP_VERSION_LIMIT = 100;

/** Apply a SharePoint site URL — recompute SITE / SITE_REL / FOLDER.
 *  Trailing slashes are stripped so url joining stays clean. */
export function setSite(rawUrl: string): void {
  const url = rawUrl.replace(/\/$/, '');
  SITE = url;
  SITE_REL = SITE.replace(/https:\/\/[^\/]+/, '');
  FOLDER = SITE_REL + '/Shared Documents/memola-pages';
}

export function initConfig(): void {
  const m = location.href.match(/(https:\/\/[^\/]+\/sites\/[^\/]+)/);
  // If the user previously picked an explicit workspace, prefer that —
  // otherwise infer from the current page URL. This lets the bookmarklet
  // run on any SP page and still target the chosen workspace.
  let url = prefCurrentWsUrl.get();
  if (!url) url = m ? m[1] : location.origin;
  setSite(url);
}
