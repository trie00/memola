// Site URL / folder path detection. Initialised from `location` at runtime.

export let SITE = '';
export let SITE_REL = '';
export let FOLDER = '';
export const META = '_meta.json';
export const SAVE_MS = 2000;

export function initConfig(): void {
  const m = location.href.match(/(https:\/\/[^\/]+\/sites\/[^\/]+)/);
  SITE = m ? m[1] : location.origin;
  SITE_REL = SITE.replace(/https:\/\/[^\/]+/, '');
  FOLDER = SITE_REL + '/Shared Documents/n365-pages';
}
