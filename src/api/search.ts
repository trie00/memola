// SharePoint Search REST wrapper for full-text body search.

import { SITE, FOLDER } from '../config';

export interface SPSearchHit {
  path: string;
  title: string;
  summary: string;
}

interface SPSearchCell { Key: string; Value: string }
interface SPSearchRow { Cells: { results: SPSearchCell[] } }
interface SPSearchEnvelope {
  d: { query: { PrimaryQueryResult: { RelevantResults: { Table: { Rows: { results: SPSearchRow[] } } } } } };
}

export async function spSearch(query: string): Promise<SPSearchHit[]> {
  const folderUrl = location.protocol + '//' + location.hostname + FOLDER;
  const safeQuery = query.replace(/["']/g, '');
  const kql = '"' + safeQuery + '" AND Path:"' + folderUrl + '" AND FileExtension:md';
  const url = SITE + "/_api/search/query?querytext='" + encodeURIComponent(kql) +
    "'&rowlimit=20&trimduplicates=false&selectproperties='Title,Path,HitHighlightedSummary'";
  const r = await fetch(url, {
    headers: { Accept: 'application/json;odata=verbose' },
    credentials: 'include',
  });
  if (!r.ok) throw new Error('search ' + r.status);
  // SP Search response — verbose JSON envelope shape, narrowed locally.
  const j = (await r.json()) as SPSearchEnvelope;
  try {
    const rows = j.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
    return rows.map((row) => {
      const props: Record<string, string> = {};
      row.Cells.results.forEach((c) => { props[c.Key] = c.Value; });
      return {
        path: props.Path || '',
        title: props.Title || '',
        summary: props.HitHighlightedSummary || '',
      };
    });
  } catch {
    return [];
  }
}
