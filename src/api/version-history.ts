// Read SharePoint's built-in per-item version history. Used by the page
// menu's 「バージョン履歴」 viewer so the user can review (and roll back
// to) prior states.
//
// SP keeps versions automatically when the list has versioning enabled
// (memola-pages doesn't explicitly enable it; default tends to be on for
// custom lists in modern SP). Each version contains all column values at
// the time of that save. Rollback is implemented by writing the old Body
// + Title back via updateListItem.

import { spListUrl, spGetD } from './sp-rest';
import { listForPageId, pageIdToItemId } from './pages';

export interface PageVersion {
  /** Numeric version label like "1.0", "2.0", "3.0" */
  versionLabel: string;
  /** ISO 8601 timestamp of when this version was created */
  created: string;
  /** Display name of the user who saved this version */
  editor: string;
  /** Body content (block-tree JSON) at this version. Phase 2: stored
   *  in Body_blocks; markdown is derived on demand at the boundary. */
  body: string;
  /** Title at this version */
  title: string;
}

interface SpVersion {
  VersionLabel: string;
  Created: string;
  CreatedBy?: { Title?: string };
  Editor?: { Title?: string };
  Body_blocks?: string;
  Title?: string;
}

export async function listPageVersions(pageId: string): Promise<PageVersion[]> {
  const itemId = pageIdToItemId(pageId);
  if (!itemId) return [];
  // SP versioning REST endpoint. $expand=Editor pulls the user display name
  // — without it we just get a numeric Id which is useless for display.
  const url = spListUrl(
    listForPageId(pageId),
    '/items(' + itemId + ')/versions?$select=VersionLabel,Created,Editor/Title,Body_blocks,Title&$expand=Editor&$orderby=Created desc&$top=50',
  );
  const d = await spGetD<{ results: SpVersion[] }>(url).catch(() => null);
  if (!d?.results) return [];
  return d.results.map((v): PageVersion => ({
    versionLabel: v.VersionLabel || '',
    created: v.Created || '',
    editor: v.Editor?.Title || v.CreatedBy?.Title || '',
    body: v.Body_blocks || '',
    title: v.Title || '',
  }));
}
