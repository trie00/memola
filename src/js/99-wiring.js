// ── WIRING ─────────────────────────────────────────────

// Close button
g('x').addEventListener('click', closeApp);

// Sidebar toggle
g('sb-toggle').addEventListener('click', function(){
  g('sb').classList.toggle('collapsed');
});

// New page buttons
g('nr').addEventListener('click', function(){ doNew(''); });
g('ne').addEventListener('click', function(){ doNew(''); });

// DB create
async function doNewDb(parentId) {
  try {
    setLoad(true, 'DBを作成中...');
    var p = await apiCreateDb('無題DB', parentId || '');
    S.pages.push({ Id: p.Id, Title: p.Title, ParentId: p.ParentId, Type: 'database' });
    renderTree(); await doSelect(p.Id);
  } catch(e) { toast('DB作成に失敗: ' + e.message, 'err'); }
  finally { setLoad(false); }
}
g('ndb').addEventListener('click', function(){ doNewDb(''); });
g('ne-db').addEventListener('click', function(){ doNewDb(''); });

// Add DB row
g('dadd').addEventListener('click', doNewDbRow);

// Toolbar buttons – preventDefault on mousedown preserves editor selection
g('tb').addEventListener('mousedown', function(e){
  if (e.target.closest('.n365-b')) e.preventDefault();
});
g('tb').addEventListener('click', function(e){ var b=e.target.closest('.n365-b'); if(b&&b.dataset.cmd) execCmd(b.dataset.cmd); });

// Floating toolbar buttons
g('ftb').addEventListener('mousedown', function(e){
  var b = e.target.closest('.n365-fb');
  if (b && b.dataset.cmd) { e.preventDefault(); execCmd(b.dataset.cmd); }
});

// Setup modal
g('mc').addEventListener('click', function(){ g('md').classList.remove('on'); });
g('mk').addEventListener('click', async function(){
  g('md').classList.remove('on');
  setLoad(true, 'フォルダを作成中...');
  try {
    await ensureFolder();
    S.pages = await apiGetPages(); renderTree(); toast('n365-pages フォルダを作成しました');
  } catch(e) { toast('作成に失敗: ' + e.message, 'err'); }
  finally { setLoad(false); }
});

// Column modal
g('col-type').addEventListener('change', function(){
  var isChoice = g('col-type').value === '6';
  g('col-choices-row').classList.toggle('on', isChoice);
});
g('col-cancel').addEventListener('click', function(){ g('col-md').classList.remove('on'); });
g('col-ok').addEventListener('click', async function(){
  var name = g('col-name').value.trim();
  if (!name) { g('col-name').focus(); return; }
  var typeKind = parseInt(g('col-type').value);
  var choices = [];
  if (typeKind === 6) {
    var raw = g('col-choices').value.trim();
    choices = raw ? raw.split('\n').map(function(s){ return s.trim(); }).filter(Boolean) : [];
  }
  g('col-md').classList.remove('on');
  setLoad(true, '列を追加中...');
  try {
    await addListField(S.dbList, name, typeKind, choices);
    var results = await Promise.all([getListFields(S.dbList), getListItems(S.dbList)]);
    S.dbFields = results[0]; S.dbItems = results[1];
    renderDbTable(); toast('列「' + name + '」を追加しました');
  } catch(e) { toast('列追加失敗: ' + e.message, 'err'); }
  finally { setLoad(false); }
});
g('col-name').addEventListener('keydown', function(e){
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key === 'Enter') g('col-ok').click();
  if (e.key === 'Escape') g('col-md').classList.remove('on');
});

// Title textarea
(function(){
  var te = g('ttl');
  te.addEventListener('input', function(){ autoR(te); S.dirty=true; setSave('未保存'); schedSave(); });
  te.addEventListener('keydown', function(e){
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === 'Enter') { e.preventDefault(); _ed.focus(); }
  });
})();

// DB title editing
g('dv-ttl').addEventListener('input', function(){
  var newTitle = g('dv-ttl').textContent.trim() || '無題';
  if (S.currentId) {
    var p = S.pages.find(function(x){ return x.Id === S.currentId; });
    if (p) p.Title = newTitle;
    var mp = S.meta.pages.find(function(x){ return x.id === S.currentId; });
    if (mp) mp.title = newTitle;
    renderTree();
  }
});
g('dv-ttl').addEventListener('blur', function(){
  if (S.currentId) {
    saveMeta().catch(function(e){ toast('タイトル保存失敗: ' + e.message, 'err'); });
  }
});

// DB views (table / board)
g('dbv-table').addEventListener('click', function(){
  g('dbv-table').classList.add('on');
  g('dbv-board').classList.remove('on');
  g('dt-wrap').style.display = '';
  g('dadd').style.display = '';
  g('kb').classList.remove('on');
});
g('dbv-board').addEventListener('click', function(){
  g('dbv-board').classList.add('on');
  g('dbv-table').classList.remove('on');
  g('dt-wrap').style.display = 'none';
  g('dadd').style.display = 'none';
  g('kb').classList.add('on');
  renderKanban();
});

// DB filter
g('db-filter-btn').addEventListener('click', function(){
  g('filter-bar').classList.toggle('on');
  if (g('filter-bar').classList.contains('on')) g('filter-inp').focus();
});
g('filter-inp').addEventListener('input', function(){
  S.dbFilter = g('filter-inp').value;
  renderDbTable();
});
g('filter-close').addEventListener('click', function(){
  g('filter-bar').classList.remove('on');
  g('filter-inp').value = '';
  S.dbFilter = '';
  renderDbTable();
});

// Page icon buttons
g('add-icon').addEventListener('click', function(){
  showEmojiPicker(g('add-icon'), function(emoji){
    if (!S.currentId) return;
    apiSetIcon(S.currentId, emoji).then(function(){
      renderPageIcon(S.currentId);
      renderTree();
    }).catch(function(e){ toast('アイコン保存失敗: ' + e.message, 'err'); });
  });
});
g('pg-icon').addEventListener('click', function(){
  showEmojiPicker(g('pg-icon'), function(emoji){
    if (!S.currentId) return;
    apiSetIcon(S.currentId, emoji).then(function(){
      renderPageIcon(S.currentId);
      renderTree();
    }).catch(function(e){ toast('アイコン保存失敗: ' + e.message, 'err'); });
  });
});
g('emoji-rm').addEventListener('click', function(){
  g('emoji').classList.remove('on');
  if (!S.currentId) return;
  apiSetIcon(S.currentId, '').then(function(){
    renderPageIcon(S.currentId);
    renderTree();
  }).catch(function(e){ toast('アイコン削除失敗: ' + e.message, 'err'); });
});

// Quick search
g('search-nav').addEventListener('click', openSearch);
g('qs').addEventListener('click', function(e){
  if (e.target === g('qs')) closeSearch();
});
g('qs-inp').addEventListener('input', function(){
  _qsSel = 0;
  renderQs(g('qs-inp').value);
});
g('qs-inp').addEventListener('keydown', function(e){
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key === 'ArrowDown') { e.preventDefault(); qsMove(1); }
  if (e.key === 'ArrowUp')   { e.preventDefault(); qsMove(-1); }
  if (e.key === 'Enter')     { e.preventDefault(); qsConfirm(); }
  if (e.key === 'Escape')    { closeSearch(); }
});

// Global keydown
document.addEventListener('keydown', onKey);

// ── INIT ───────────────────────────────────────────────
async function init() {
  setLoad(true);
  try {
    var r = await fetch(SITE + "/_api/web/GetFolderByServerRelativeUrl('" + FOLDER + "')", { headers: { Accept: 'application/json;odata=verbose' }, credentials: 'include' });
    if (!r.ok) { setLoad(false); g('md').classList.add('on'); return; }
    S.pages = await apiGetPages(); renderTree(); showView('empty');
    if (S.pages.length > 0) await doSelect(S.pages[0].Id);
  } catch(e) {
    g('em').innerHTML = '<div style="font-size:48px">⚠️</div><h2>エラー</h2><p>' + e.message + '</p>';
    g('em').style.display = 'flex'; console.error(e);
  } finally { setLoad(false); }
}

init();
