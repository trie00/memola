// Site URL / folder path detection. Initialised from `location` at runtime.

import { prefCurrentWsUrl } from './lib/prefs';

export let SITE = '';
export let SITE_REL = '';
export let FOLDER = '';
export const META = '_meta.json';
export const SAVE_MS = 2000;

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
