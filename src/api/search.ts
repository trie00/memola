// SharePoint Search API を使ったキーワード全文検索。本文(Body_blocks)や DB行の
// 値もインデックス対象に入るため、タイトル一致では拾えない語を見つけられる。
//
// 注意:
//  - 検索インデックス反映には数分のラグがあり、作りたて/編集直後はヒットしない
//    ことがある(その分はクイック検索のタイトル一致でカバー)。
//  - 本文は block-tree JSON として保存されるため、スニペットに JSON 断片が混じる
//    ことがある(ハイライト語の前後を軽く整形して表示する)。

import { SITE } from '../config';
import { spGetD } from './sp-rest';

export interface SearchHit {
  title: string;
  /** HitHighlightedSummary(<c0>…</c0> / <ddd/> マーカー入りの生文字列)。 */
  summary: string;
  listId: string;   // GUID(波括弧除去済み)
  itemId: number;   // リスト内アイテムID
  path: string;
}

interface RawCell { Key?: string; Value?: string }
interface RawRow { Cells?: { results?: RawCell[] } }
interface RawSearch {
  query?: { PrimaryQueryResult?: { RelevantResults?: { Table?: { Rows?: { results?: RawRow[] } } } } };
}

/** 現在サイト配下をキーワード全文検索し、リストアイテムのヒットを返す。 */
export async function spSearch(query: string, limit = 20): Promise<SearchHit[]> {
  const q = query.trim();
  if (!q) return [];
  // 現在サイト配下に限定(Path)。querytext は OData 文字列リテラルなので ' を '' に。
  const kql = `(${q}) (Path:"${SITE.replace(/\/+$/, '')}/*")`;
  const props = 'Title,Path,ListID,ListItemID,HitHighlightedSummary';
  const url = SITE + "/_api/search/query"
    + "?querytext='" + encodeURIComponent(kql.replace(/'/g, "''")) + "'"
    + "&selectproperties='" + encodeURIComponent(props) + "'"
    + '&rowlimit=' + limit + '&trimduplicates=false';
  const d = await spGetD<RawSearch>(url).catch(() => null);
  const rows = d?.query?.PrimaryQueryResult?.RelevantResults?.Table?.Rows?.results || [];
  const hits: SearchHit[] = [];
  for (const row of rows) {
    const cells = row?.Cells?.results || [];
    const m: Record<string, string> = {};
    for (const c of cells) if (c?.Key) m[c.Key] = c.Value ?? '';
    const itemId = parseInt(m.ListItemID || '0', 10);
    if (!itemId) continue;     // ドキュメント等(リストアイテム以外)は対象外
    hits.push({
      title: m.Title || '無題',
      summary: m.HitHighlightedSummary || '',
      listId: (m.ListID || '').replace(/[{}]/g, '').toLowerCase(),
      itemId,
      path: m.Path || '',
    });
  }
  return hits;
}
