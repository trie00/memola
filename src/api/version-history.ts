// Read SharePoint's built-in per-item version history. Used by the page
// menu's 「バージョン履歴」 viewer so the user can review (and roll back
// to) prior states.
//
// SP keeps versions automatically when the list has versioning enabled
// (n365-pages doesn't explicitly enable it; default tends to be on for
// custom lists in modern SP). Each version contains all column values at
// the time of that save. Rollback is implemented by writing the old Body
// + Title back via updateListItem.

import { spListUrl, spGetD } from './sp-rest';
import { PAGES_LIST } from './pages';

export interface PageVersion {
  /** Numeric version label like "1.0", "2.0", "3.0" */
  versionLabel: string;
  /** ISO 8601 timestamp of when this version was created */
  created: string;
  /** Display name of the user who saved this version */
  editor: string;
  /** Body content (markdown) at this version */
  body: string;
  /** Title at this version */
  title: string;
}

interface SpVersion {
  VersionLabel: string;
  Created: string;
  CreatedBy?: { Title?: string };
  Editor?: { Title?: string };
  Body?: string;
  Title?: string;
}

export async function listPageVersions(pageId: string): Promise<PageVersion[]> {
  const itemId = parseInt(pageId, 10);
  if (!itemId) return [];
  // SP versioning REST endpoint. $expand=Editor pulls the user display name
  // — without it we just get a numeric Id which is useless for display.
  const url = spListUrl(
    PAGES_LIST,
    '/items(' + itemId + ')/versions?$select=VersionLabel,Created,Editor/Title,Body,Title&$expand=Editor&$orderby=Created desc&$top=50',
  );
  const d = await spGetD<{ results: SpVersion[] }>(url).catch(() => null);
  if (!d?.results) return [];
  return d.results.map((v): PageVersion => ({
    versionLabel: v.VersionLabel || '',
    created: v.Created || '',
    editor: v.Editor?.Title || v.CreatedBy?.Title || '',
    body: v.Body || '',
    title: v.Title || '',
  }));
}
