// ── PAGE ACTIONS ───────────────────────────────────────

async function doNew(parentId) {
  try {
    setLoad(true, 'ページを作成中...');
    var p = await apiCreatePage('無題', parentId || '');
    S.pages.push(p); if (parentId) S.expanded.add(parentId);
    renderTree(); await doSelect(p.Id); g('ttl').select();
  } catch(e) { toast('ページ作成に失敗: ' + e.message, 'err'); }
  finally { setLoad(false); }
}

function collectIds(id) {
  var r = [id];
  S.pages.filter(function(p){ return p.ParentId === id; }).forEach(function(c){ r = r.concat(collectIds(c.Id)); });
  return r;
}

async function doDel(id) {
  var page = S.pages.find(function(p){ return p.Id===id; });
  var name = page ? (page.Title || '無題') : '無題';
  var hasK = S.pages.some(function(p){ return p.ParentId===id; });
  if (!confirm(hasK ? '「'+name+'」と子ページをすべて削除しますか？' : '「'+name+'」を削除しますか？')) return;
  try {
    setLoad(true, '削除中...');
    var ids = await apiDeletePage(id);
    S.pages = S.pages.filter(function(p){ return ids.indexOf(p.Id) < 0; });
    if (ids.indexOf(S.currentId) >= 0) { S.currentId = null; showView('empty'); }
    renderTree(); toast('削除しました');
  } catch(e) { toast('削除に失敗: ' + e.message, 'err'); }
  finally { setLoad(false); }
}

async function doSave() {
  if (!S.currentId || !S.dirty || S.saving || S.currentType === 'database') return;
  S.saving = true; setSave('保存中...');
  try {
    var te = g('ttl'), title = te.value.trim() || '無題', html = _ed.innerHTML;
    await apiSavePage(S.currentId, title, html);
    var p = S.pages.find(function(x){ return x.Id===S.currentId; });
    if (p) p.Title = title;
    S.dirty = false; setSave('保存済み'); renderTree();
    setTimeout(function(){ if (!S.dirty) setSave(''); }, 2000);
  } catch(e) { toast('保存に失敗: ' + e.message, 'err'); setSave('保存失敗'); }
  finally { S.saving = false; }
}

function schedSave() { clearTimeout(_svT); _svT = setTimeout(doSave, SAVE_MS); }

// ── DB new row action ──────────────────────────────────
function doNewDbRow() {
  var tbody = g('dtb');
  if (tbody.querySelector('.n365-dr-new')) return;
  var fields = getDbFields();
  var tr = document.createElement('tr');
  tr.className = 'n365-dr-new';
  var saved = false;
  fields.forEach(function(f){
    var td = document.createElement('td');
    var span = document.createElement('span');
    span.className = 'n365-dc';
    span.contentEditable = 'true';
    span.dataset.field = f.InternalName;
    span.addEventListener('keydown', function(e){
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveNewRow(); }
      if (e.key === 'Escape') { tr.remove(); }
      if (e.key === 'Tab') {
        e.preventDefault();
        var cells = Array.from(tr.querySelectorAll('.n365-dc'));
        var next = e.shiftKey ? cells[cells.indexOf(span)-1] : cells[cells.indexOf(span)+1];
        if (next) next.focus(); else saveNewRow();
      }
    });
    td.appendChild(span); tr.appendChild(td);
  });
  var emptyTd = document.createElement('td'); emptyTd.className = 'n365-td-del'; tr.appendChild(emptyTd);
  tbody.appendChild(tr);
  var first = tr.querySelector('.n365-dc'); if (first) first.focus();

  async function saveNewRow() {
    if (saved) return;
    var data = {};
    tr.querySelectorAll('.n365-dc').forEach(function(s){ var v=s.textContent.trim(); if(v) data[s.dataset.field]=v; });
    if (!data.Title) { tr.remove(); return; }
    saved = true;
    try {
      setLoad(true, '追加中...');
      var item = await apiAddDbRow(S.dbList, data);
      S.dbItems.push(item); tr.remove();
      g('dtb').appendChild(mkDbRow(item, fields));
      toast('行を追加しました');
    } catch(e) { toast('追加失敗: ' + e.message, 'err'); tr.remove(); saved = false; }
    finally { setLoad(false); }
  }
  tr.addEventListener('focusout', function(e){
    setTimeout(function(){ if (!tr.contains(document.activeElement)) saveNewRow(); }, 100);
  });
}

// ── CLOSE ──────────────────────────────────────────────
function closeApp() {
  clearTimeout(_svT);
  if (S.dirty && S.currentType !== 'database' && !confirm('保存していない変更があります。閉じますか？')) return;
  _ov.remove(); _st.remove();
  document.removeEventListener('keydown', onKey);
}

function onKey(e) {
  if ((e.ctrlKey||e.metaKey) && e.key==='s') { e.preventDefault(); clearTimeout(_svT); doSave(); }
  if ((e.ctrlKey||e.metaKey) && e.key==='k') { e.preventDefault(); openSearch(); }
  if (e.key==='Escape') {
    if (g('qs').classList.contains('on')) { closeSearch(); return; }
    if (g('emoji').classList.contains('on')) { g('emoji').classList.remove('on'); return; }
    if (_slashActive) { closeSlashMenu(); return; }
    closeApp();
  }
}

// ── Emoji picker ───────────────────────────────────────
var EMOJIS = [
  '📄','📝','📋','📌','📍','📎','🗂','🗃','🗄','📁','📂','🗑',
  '📚','📖','📗','📘','📙','📔','📒','📃','📜','📑','🔖',
  '✏️','🖊','🖋','🖌','🖍','✒️','🔏','🔐','🔒','🔓','🔑','🗝',
  '💡','🔦','🕯','💰','💵','💳','🏆','🥇','🎯','🎪','🎨','🎭',
  '🌟','⭐','✨','💫','🔥','❄️','🌊','🌈','☀️','🌙','⚡','🌿',
  '🍎','🍊','🍋','🍇','🍓','🥝','🥑','🌮','🍕','☕','🎂','🍰',
  '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮',
  '🚀','✈️','🚂','🚗','🏠','🏢','🏖','🏔','🌍','🗺','🧭','⛵'
];

var _emojiTarget = null;
var _emojiCallback = null;

function showEmojiPicker(targetEl, onSelect) {
  _emojiTarget = targetEl;
  _emojiCallback = onSelect;
  var grid = g('emoji-grid');
  grid.innerHTML = '';
  EMOJIS.forEach(function(em){
    var btn = document.createElement('button');
    btn.className = 'n365-emoji-btn';
    btn.textContent = em;
    btn.addEventListener('click', function(){
      g('emoji').classList.remove('on');
      if (_emojiCallback) _emojiCallback(em);
    });
    grid.appendChild(btn);
  });

  // Position near target
  var rect = targetEl.getBoundingClientRect();
  var ep = g('emoji');
  ep.style.top = (rect.bottom + 4) + 'px';
  ep.style.left = rect.left + 'px';
  ep.classList.add('on');
}

// Close emoji picker when clicking outside
document.addEventListener('mousedown', function(e){
  var ep = g('emoji');
  if (ep && ep.classList.contains('on') && !ep.contains(e.target) && e.target !== _emojiTarget) {
    ep.classList.remove('on');
  }
});
