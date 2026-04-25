// SharePoint list/field/item REST helpers, used to back databases.

import { SITE } from '../config';
import { getDigest } from './digest';
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
    headers: {
      Accept: 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
      'X-RequestDigest': d,
    },
    credentials: 'include',
    body: JSON.stringify({
      __metadata: { type: 'SP.List' },
      BaseTemplate: 100,
      Title: listTitle,
      Description: 'n365 database',
    }),
  });
  if (!r.ok) throw new Error('リスト作成失敗: ' + r.status);
}

export async function deleteList(listTitle: string): Promise<void> {
  const d = await getDigest();
  await fetch(SITE + "/_api/web/lists/getbytitle('" + listTitle + "')", {
    method: 'POST',
    headers: { 'X-RequestDigest': d, 'X-HTTP-Method': 'DELETE', 'IF-MATCH': '*' },
    credentials: 'include',
  });
}

export async function getListEntityType(listTitle: string): Promise<string> {
  if (_etCache[listTitle]) return _etCache[listTitle];
  const r = await fetch(
    SITE + "/_api/web/lists/getbytitle('" + listTitle + "')?$select=ListItemEntityTypeFullName",
    { headers: { Accept: 'application/json;odata=verbose' }, credentials: 'include' },
  );
  if (!r.ok) throw new Error('エンティティタイプ取得失敗');
  // SP REST envelope shape — narrowed locally because this never appears in TS types.
  const j = (await r.json()) as { d: { ListItemEntityTypeFullName: string } };
  _etCache[listTitle] = j.d.ListItemEntityTypeFullName;
  return _etCache[listTitle];
}

export async function getListFields(listTitle: string): Promise<ListField[]> {
  const r = await fetch(
    SITE + "/_api/web/lists/getbytitle('" + listTitle +
      "')/fields?$filter=Hidden eq false and ReadOnlyField eq false&$select=Title,InternalName,FieldTypeKind,Choices",
    { headers: { Accept: 'application/json;odata=verbose' }, credentials: 'include' },
  );
  if (!r.ok) throw new Error('スキーマ取得失敗: ' + r.status);
  const j = (await r.json()) as { d: { results: SPField[] } };
  return j.d.results
    .filter((f) => [2, 4, 6, 8, 9].indexOf(f.FieldTypeKind) >= 0)
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
  const r = await fetch(
    SITE + "/_api/web/lists/getbytitle('" + listTitle + "')/items?$orderby=Id&$top=500",
    { headers: { Accept: 'application/json;odata=verbose' }, credentials: 'include' },
  );
  if (!r.ok) throw new Error('データ取得失敗: ' + r.status);
  const j = (await r.json()) as { d: { results: ListItem[] } };
  return j.d.results;
}

export async function createListItem(
  listTitle: string,
  data: Record<string, unknown>,
): Promise<ListItem> {
  const et = await getListEntityType(listTitle);
  const d = await getDigest();
  data.__metadata = { type: et };
  const r = await fetch(SITE + "/_api/web/lists/getbytitle('" + listTitle + "')/items", {
    method: 'POST',
    headers: {
      Accept: 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
      'X-RequestDigest': d,
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error('行追加失敗: ' + r.status);
  const j = (await r.json()) as { d: ListItem };
  return j.d;
}

export async function deleteListItem(listTitle: string, itemId: number): Promise<void> {
  const d = await getDigest();
  const r = await fetch(SITE + "/_api/web/lists/getbytitle('" + listTitle + "')/items(" + itemId + ")", {
    method: 'POST',
    headers: { 'X-RequestDigest': d, 'X-HTTP-Method': 'DELETE', 'If-Match': '*' },
    credentials: 'include',
  });
  if (!r.ok) throw new Error('削除失敗: ' + r.status);
}

export async function addListField(
  listTitle: string,
  name: string,
  typeKind: number | string,
  choices?: string[],
): Promise<unknown> {
  const typeMap: Record<number, string> = {
    2: 'SP.FieldText', 4: 'SP.FieldDateTime', 8: 'SP.FieldBoolean', 9: 'SP.FieldNumber', 6: 'SP.FieldChoice',
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
  } else {
    body = {
      __metadata: { type: typeMap[kindNum] || 'SP.FieldText' },
      FieldTypeKind: kindNum,
      Title: name,
    };
  }
  const r = await fetch(SITE + "/_api/web/lists/getbytitle('" + listTitle + "')/fields", {
    method: 'POST',
    headers: {
      Accept: 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
      'X-RequestDigest': d,
    },
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
  const et = await getListEntityType(listTitle);
  const d = await getDigest();
  data.__metadata = { type: et };
  const r = await fetch(SITE + "/_api/web/lists/getbytitle('" + listTitle + "')/items(" + itemId + ")", {
    method: 'POST',
    headers: {
      Accept: 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
      'X-RequestDigest': d,
      'X-HTTP-Method': 'MERGE',
      'If-Match': '*',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error('更新失敗: ' + r.status);
}
