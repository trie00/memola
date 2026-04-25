// ── DB API ─────────────────────────────────────────────

async function apiCreateDb(title, parentId) {
  var id = Date.now().toString();
  var listTitle = 'n365-db-' + id;
  await createList(listTitle);
  S.meta.pages.push({ id: id, title: title, parent: parentId || '', path: '', type: 'database', list: listTitle, icon: '' });
  await saveMeta();
  return { Id: id, Title: title, ParentId: parentId || '', Type: 'database' };
}

async function apiAddDbRow(listTitle, data) {
  return await createListItem(listTitle, data);
}

async function apiUpdateDbRow(listTitle, itemId, data) {
  await updateListItem(listTitle, itemId, data);
}
