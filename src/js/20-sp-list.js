// ── SP LIST API ────────────────────────────────────────
async function createList(listTitle) {
  var d = await getDigest();
  var r = await fetch(SITE + '/_api/web/lists', {
    method: 'POST',
    headers: { Accept: 'application/json;odata=verbose', 'Content-Type': 'application/json;odata=verbose', 'X-RequestDigest': d },
    credentials: 'include',
    body: JSON.stringify({ __metadata: { type: 'SP.List' }, BaseTemplate: 100, Title: listTitle, Description: 'n365 database' })
  });
  if (!r.ok) throw new Error('リスト作成失敗: ' + r.status);
}

async function deleteList(listTitle) {
  var d = await getDigest();
  await fetch(SITE + "/_api/web/lists/getbytitle('" + listTitle + "')", {
    method: 'POST', headers: { 'X-RequestDigest': d, 'X-HTTP-Method': 'DELETE', 'IF-MATCH': '*' }, credentials: 'include'
  });
}

var _etCache = {};
async function getListEntityType(listTitle) {
  if (_etCache[listTitle]) return _etCache[listTitle];
  var r = await fetch(SITE + "/_api/web/lists/getbytitle('" + listTitle + "')?$select=ListItemEntityTypeFullName", { headers: { Accept: 'application/json;odata=verbose' }, credentials: 'include' });
  if (!r.ok) throw new Error('エンティティタイプ取得失敗');
  var j = await r.json();
  _etCache[listTitle] = j.d.ListItemEntityTypeFullName;
  return _etCache[listTitle];
}

async function getListFields(listTitle) {
  var r = await fetch(
    SITE + "/_api/web/lists/getbytitle('" + listTitle + "')/fields?$filter=Hidden eq false and ReadOnlyField eq false&$select=Title,InternalName,FieldTypeKind,Choices",
    { headers: { Accept: 'application/json;odata=verbose' }, credentials: 'include' }
  );
  if (!r.ok) throw new Error('スキーマ取得失敗: ' + r.status);
  var j = await r.json();
  return j.d.results
    .filter(function(f) { return [2, 4, 6, 8, 9].indexOf(f.FieldTypeKind) >= 0; })
    .map(function(f) {
      var field = { Title: f.Title, InternalName: f.InternalName, FieldTypeKind: f.FieldTypeKind };
      if (f.FieldTypeKind === 6 && f.Choices && f.Choices.results) {
        field.Choices = f.Choices.results;
      }
      return field;
    });
}

async function getListItems(listTitle) {
  var r = await fetch(
    SITE + "/_api/web/lists/getbytitle('" + listTitle + "')/items?$orderby=Id&$top=500",
    { headers: { Accept: 'application/json;odata=verbose' }, credentials: 'include' }
  );
  if (!r.ok) throw new Error('データ取得失敗: ' + r.status);
  var j = await r.json();
  return j.d.results;
}

async function createListItem(listTitle, data) {
  var et = await getListEntityType(listTitle);
  var d = await getDigest();
  data.__metadata = { type: et };
  var r = await fetch(SITE + "/_api/web/lists/getbytitle('" + listTitle + "')/items", {
    method: 'POST', headers: { Accept: 'application/json;odata=verbose', 'Content-Type': 'application/json;odata=verbose', 'X-RequestDigest': d },
    credentials: 'include', body: JSON.stringify(data)
  });
  if (!r.ok) throw new Error('行追加失敗: ' + r.status);
  var j = await r.json();
  return j.d;
}

async function deleteListItem(listTitle, itemId) {
  var d = await getDigest();
  var r = await fetch(SITE + "/_api/web/lists/getbytitle('" + listTitle + "')/items(" + itemId + ")", {
    method: 'POST', headers: { 'X-RequestDigest': d, 'X-HTTP-Method': 'DELETE', 'If-Match': '*' }, credentials: 'include'
  });
  if (!r.ok) throw new Error('削除失敗: ' + r.status);
}

async function addListField(listTitle, name, typeKind, choices) {
  var typeMap = { 2: 'SP.FieldText', 4: 'SP.FieldDateTime', 8: 'SP.FieldBoolean', 9: 'SP.FieldNumber', 6: 'SP.FieldChoice' };
  var d = await getDigest();
  var body;
  if (typeKind === 6 || typeKind === '6') {
    body = {
      __metadata: { type: 'SP.FieldChoice' },
      FieldTypeKind: 6,
      Title: name,
      Choices: { __metadata: { type: 'Collection(Edm.String)' }, results: choices || [] }
    };
  } else {
    body = { __metadata: { type: typeMap[typeKind] || 'SP.FieldText' }, FieldTypeKind: parseInt(typeKind), Title: name };
  }
  var r = await fetch(SITE + "/_api/web/lists/getbytitle('" + listTitle + "')/fields", {
    method: 'POST',
    headers: { Accept: 'application/json;odata=verbose', 'Content-Type': 'application/json;odata=verbose', 'X-RequestDigest': d },
    credentials: 'include',
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error('列追加失敗: ' + r.status);
  var j = await r.json();
  return j.d;
}

async function updateListItem(listTitle, itemId, data) {
  var et = await getListEntityType(listTitle);
  var d = await getDigest();
  data.__metadata = { type: et };
  var r = await fetch(SITE + "/_api/web/lists/getbytitle('" + listTitle + "')/items(" + itemId + ")", {
    method: 'POST', headers: { Accept: 'application/json;odata=verbose', 'Content-Type': 'application/json;odata=verbose', 'X-RequestDigest': d, 'X-HTTP-Method': 'MERGE', 'If-Match': '*' },
    credentials: 'include', body: JSON.stringify(data)
  });
  if (!r.ok) throw new Error('更新失敗: ' + r.status);
}
