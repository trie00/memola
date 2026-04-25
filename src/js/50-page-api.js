// ── PAGE API ───────────────────────────────────────────

function getPathForId(id) {
  var p = S.meta.pages.find(function(p){ return p.id === id; });
  return p ? p.path : id;
}

function getPageParent(id) {
  var p = S.meta.pages.find(function(p){ return p.id === id; });
  return p ? (p.parent || '') : '';
}

async function apiGetPages() {
  S.meta = await loadMeta();
  return S.meta.pages.map(function(p){ return { Id: p.id, Title: p.title, ParentId: p.parent || '', Type: p.type || 'page' }; });
}

async function apiLoadContent(id) {
  var content = await readFile(getPathForId(id) + '/index.md');
  return mdToHtml(getBody(content));
}

async function apiCreatePage(title, parentId) {
  var id = Date.now().toString();
  var parentPath = parentId ? getPathForId(parentId) : '';
  var path = parentPath ? parentPath + '/' + id : id;
  await createFolder(path);
  await writeFile(path + '/index.md', buildMdFile(title, parentId || '', ''));
  S.meta.pages.push({ id: id, title: title, parent: parentId || '', path: path, icon: '' });
  await saveMeta();
  return { Id: id, Title: title, ParentId: parentId || '' };
}

async function apiSavePage(id, title, html) {
  var path = getPathForId(id);
  await writeFile(path + '/index.md', buildMdFile(title, getPageParent(id), html));
  var p = S.meta.pages.find(function(p){ return p.id === id; });
  if (p) p.title = title;
  await saveMeta();
}

async function apiDeletePage(id) {
  var ids = collectIds(id);
  var topPage = S.meta.pages.find(function(p){ return p.id === id; });
  if (topPage) {
    if (topPage.type === 'database' && topPage.list) {
      await deleteList(topPage.list).catch(function(){});
    } else if (topPage.path) {
      await deleteFolderApi(topPage.path).catch(function(){});
    }
  }
  S.meta.pages = S.meta.pages.filter(function(p){ return ids.indexOf(p.id) < 0; });
  await saveMeta();
  return ids;
}

async function apiSetIcon(id, emoji) {
  var p = S.meta.pages.find(function(p){ return p.id === id; });
  if (p) {
    p.icon = emoji;
    await saveMeta();
  }
}
