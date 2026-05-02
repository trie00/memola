// SharePoint list / field / item REST helpers backing the n365-pages list and
// every per-DB list. Higher-level page semantics live in api/pages.ts; this
// module only deals with raw list mechanics.

import { SITE } from '../config';
import { getDigest } from './digest';
import { spListUrl, spGetD, ODATA_POST_HEADERS } from './sp-rest';
import type { ListField, ListItem } from '../state';

interface SPField {
  Title: string;
  InternalName: string;
  FieldTypeKind: number;
  Choices?: { results: string[] };
}

const _etCache: Record<string, string> = {};

export async function createList(listTitle: string): Promise<void> {
  const d = await getDigest();
  const r = await fetch(SITE + '/_api/web/lists', {
    method: 'POST',
    headers: { ...ODATA_POST_HEADERS, 'X-RequestDigest': d },
    credentials: 'include',
    body: JSON.stringify({
      __metadata: { type: 'SP.List' },
      BaseTemplate: 100,
      Title: listTitle,
      Description: 'n365',
    }),
  });
  if (!r.ok) throw new Error('リスト作成失敗: ' + r.status);
}

export async function deleteList(listTitle: string): Promise<void> {
  const d = await getDigest();
  await fetch(spListUrl(listTitle), {
    method: 'POST',
    headers: { 'X-RequestDigest': d, 'X-HTTP-Method': 'DELETE', 'IF-MATCH': '*' },
    credentials: 'include',
  });
}

export async function getListEntityType(listTitle: string): Promise<string> {
  if (_etCache[listTitle]) return _etCache[listTitle];
  const d = await spGetD<{ ListItemEntityTypeFullName: string }>(
    spListUrl(listTitle, '?$select=ListItemEntityTypeFullName'),
  );
  if (!d) throw new Error('エンティティタイプ取得失敗');
  _etCache[listTitle] = d.ListItemEntityTypeFullName;
  return _etCache[listTitle];
}

export async function getListFields(listTitle: string): Promise<ListField[]> {
  const d = await spGetD<{ results: SPField[] }>(
    spListUrl(listTitle,
      "/fields?$filter=Hidden eq false and ReadOnlyField eq false&$select=Title,InternalName,FieldTypeKind,Choices"),
  );
  if (!d) throw new Error('スキーマ取得失敗');
  return d.results
    .filter((f) => [2, 3, 4, 6, 8, 9].indexOf(f.FieldTypeKind) >= 0)
    .map((f) => {
      const field: ListField = {
        Title: f.Title,
        InternalName: f.InternalName,
        FieldTypeKind: f.FieldTypeKind,
      };
      if (f.FieldTypeKind === 6 && f.Choices && f.Choices.results) {
        field.Choices = f.Choices.results;
      }
      return field;
    });
}

export async function getListItems(listTitle: string): Promise<ListItem[]> {
  const d = await spGetD<{ results: ListItem[] }>(
    spListUrl(listTitle, '/items?$orderby=Id&$top=500'),
  );
  if (!d) throw new Error('データ取得失敗');
  // SharePoint REST prefixes internal names that start with `_` (including
  // encoded non-ASCII like `_x3042_…`) with `OData_` in the response. Mirror
  // each such property under its non-prefixed name so callers can look up
  // values by the field's actual InternalName.
  return d.results.map((item) => {
    const fixed: ListItem = item;
    for (const k of Object.keys(item)) {
      if (k.startsWith('OData_')) {
        const bare = k.substring(6);
        if (!(bare in fixed)) fixed[bare] = item[k];
      }
    }
    return fixed;
  });
}

export async function createListItem(
  listTitle: string,
  data: Record<string, unknown>,
): Promise<ListItem> {
  const et = await getListEntityType(listTitle);
  const d = await getDigest();
  // SP REST entity types prefix any property whose InternalName begins with
  // `_` (including encoded non-ASCII names like `_x30b9_...` for ステータス)
  // with `OData_`. Without this, SP returns 400 「property does not exist on
  // type」for Japanese-named columns. The read side (getListItems) mirrors
  // this in reverse.
  const payload: Record<string, unknown> = { __metadata: { type: et } };
  for (const k of Object.keys(data)) {
    if (k === '__metadata') continue;
    const outKey = k.startsWith('_') ? 'OData_' + k : k;
    payload[outKey] = data[k];
  }
  const r = await fetch(spListUrl(listTitle, '/items'), {
    method: 'POST',
    headers: { ...ODATA_POST_HEADERS, 'X-RequestDigest': d },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (!r.ok) {
    let detail = '';
    try {
      const txt = await r.text();
      // SP returns JSON like {"error":{"code":"...","message":{"value":"..."}}}
      const m = txt.match(/"value"\s*:\s*"([^"]+)"/);
      if (m) detail = ' — ' + m[1];
      else if (txt.length < 300) detail = ' — ' + txt;
    } catch { /* ignore */ }
    // If digest expired or schema changed, retry once after invalidating caches
    if (r.status === 403 || r.status === 401) {
      delete _etCache[listTitle];
    }
    throw new Error('行追加失敗: ' + r.status + detail);
  }
  const j = (await r.json()) as { d: ListItem };
  return j.d;
}

export async function deleteListItem(listTitle: string, itemId: number): Promise<void> {
  const d = await getDigest();
  const r = await fetch(spListUrl(listTitle, '/items(' + itemId + ')'), {
    method: 'POST',
    headers: { 'X-RequestDigest': d, 'X-HTTP-Method': 'DELETE', 'If-Match': '*' },
    credentials: 'include',
  });
  // 404 = already gone — treat as success (idempotent delete). This avoids
  // spurious failures during undo/redo when a row was deleted by another path.
  if (r.status === 404) return;
  if (!r.ok) throw new Error('削除失敗: ' + r.status);
}

export async function addListField(
  listTitle: string,
  name: string,
  typeKind: number | string,
  choices?: string[],
): Promise<unknown> {
  const typeMap: Record<number, string> = {
    2: 'SP.FieldText', 3: 'SP.FieldMultiLineText', 4: 'SP.FieldDateTime',
    8: 'SP.FieldBoolean', 9: 'SP.FieldNumber', 6: 'SP.FieldChoice',
  };
  const d = await getDigest();
  const kindNum = typeof typeKind === 'string' ? parseInt(typeKind, 10) : typeKind;
  let body: unknown;
  if (kindNum === 6) {
    body = {
      __metadata: { type: 'SP.FieldChoice' },
      FieldTypeKind: 6,
      Title: name,
      Choices: { __metadata: { type: 'Collection(Edm.String)' }, results: choices || [] },
    };
  } else if (kindNum === 3) {
    // Multiple lines of text (Note) — prefer plain text + multi-line input
    body = {
      __metadata: { type: 'SP.FieldMultiLineText' },
      FieldTypeKind: 3,
      Title: name,
      NumberOfLines: 6,
      RichText: false,
      AppendOnly: false,
    };
  } else {
    body = {
      __metadata: { type: typeMap[kindNum] || 'SP.FieldText' },
      FieldTypeKind: kindNum,
      Title: name,
    };
  }
  // Invalidate any cached entity-type/field schema so the next update picks up the new field.
  delete _etCache[listTitle];
  const r = await fetch(spListUrl(listTitle, '/fields'), {
    method: 'POST',
    headers: { ...ODATA_POST_HEADERS, 'X-RequestDigest': d },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error('列追加失敗: ' + r.status);
  const j = (await r.json()) as { d: unknown };
  return j.d;
}

export async function updateListItem(
  listTitle: string,
  itemId: number,
  data: Record<string, unknown>,
): Promise<void> {
  // Use validateUpdateListItem instead of MERGE — it accepts both display and
  // internal names and bypasses the entity-type schema cache, which otherwise
  // rejects non-ASCII field names added in the same session.
  const d = await getDigest();
  const formValues = Object.entries(data)
    .filter(([k]) => k !== '__metadata')
    .map(([k, v]) => ({ FieldName: k, FieldValue: v == null ? '' : String(v) }));
  const r = await fetch(
    spListUrl(listTitle, '/items(' + itemId + ')/validateUpdateListItem'),
    {
      method: 'POST',
      headers: { ...ODATA_POST_HEADERS, 'X-RequestDigest': d },
      credentials: 'include',
      body: JSON.stringify({ formValues, bNewDocumentUpdate: false }),
    },
  );
  if (!r.ok) {
    let detail = '';
    try {
      const txt = await r.text();
      const m = txt.match(/"value"\s*:\s*"([^"]+)"/);
      if (m) detail = ' — ' + m[1];
    } catch { /* ignore */ }
    throw new Error('更新失敗: ' + r.status + detail);
  }
  const json = (await r.json()) as {
    d: { ValidateUpdateListItem: { results: Array<{ ErrorMessage: string | null; FieldName: string }> } };
  };
  const errs = json.d.ValidateUpdateListItem.results.filter((x) => x.ErrorMessage);
  if (errs.length > 0) {
    throw new Error('更新失敗: ' + errs.map((e) => e.FieldName + ': ' + e.ErrorMessage).join(', '));
  }
}

