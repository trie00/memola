// ── SP API CORE ────────────────────────────────────────
var _dig = null, _digX = 0;

async function getDigest() {
  if (_dig && Date.now() < _digX) return _dig;
  var r = await fetch(SITE + '/_api/contextinfo', { method: 'POST', headers: { Accept: 'application/json;odata=verbose' }, credentials: 'include' });
  if (!r.ok) throw new Error('認証失敗(' + r.status + ')。SharePointにログインしてください。');
  var j = await r.json();
  _dig = j.d.GetContextWebInformation.FormDigestValue;
  _digX = Date.now() + 25 * 60 * 1000;
  return _dig;
}

async function readFile(name) {
  var url = SITE + "/_api/web/GetFileByServerRelativeUrl('" + FOLDER + '/' + name + "')/$value";
  var r = await fetch(url, { credentials: 'include' });
  if (!r.ok) throw new Error('読み込み失敗: ' + r.status);
  return r.text();
}

async function writeFile(relPath, content) {
  var d = await getDigest();
  var lastSlash = relPath.lastIndexOf('/');
  var folderRel = lastSlash >= 0 ? FOLDER + '/' + relPath.substring(0, lastSlash) : FOLDER;
  var fileName   = lastSlash >= 0 ? relPath.substring(lastSlash + 1) : relPath;
  var url = SITE + "/_api/web/GetFolderByServerRelativeUrl('" + folderRel + "')/Files/add(url='" + encodeURIComponent(fileName) + "',overwrite=true)";
  var r = await fetch(url, { method: 'POST', headers: { 'X-RequestDigest': d }, credentials: 'include', body: content });
  if (!r.ok) throw new Error('保存失敗: ' + r.status);
}

async function createFolder(path) {
  var ok = await spPost('/_api/web/folders', { __metadata: { type: 'SP.Folder' }, ServerRelativeUrl: FOLDER + '/' + path });
  if (!ok) throw new Error('フォルダ作成失敗');
}

async function deleteFolderApi(path) {
  var d = await getDigest();
  var url = SITE + "/_api/web/GetFolderByServerRelativeUrl('" + FOLDER + '/' + path + "')";
  var r = await fetch(url, { method: 'POST', headers: { 'X-RequestDigest': d, 'X-HTTP-Method': 'DELETE', 'If-Match': '*' }, credentials: 'include' });
  if (!r.ok) throw new Error('削除失敗: ' + r.status);
}

async function spPost(url, body) {
  var d = await getDigest();
  var r = await fetch(SITE + url, { method: 'POST', headers: { Accept: 'application/json;odata=verbose', 'Content-Type': 'application/json;odata=verbose', 'X-RequestDigest': d }, credentials: 'include', body: JSON.stringify(body) });
  return r.ok;
}

async function ensureFolder() {
  var r = await fetch(SITE + "/_api/web/GetFolderByServerRelativeUrl('" + FOLDER + "')", { headers: { Accept: 'application/json;odata=verbose' }, credentials: 'include' });
  if (r.ok) return true;
  return spPost('/_api/web/folders', { __metadata: { type: 'SP.Folder' }, ServerRelativeUrl: FOLDER });
}
