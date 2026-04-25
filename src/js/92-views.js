// ── VIEWS ──────────────────────────────────────────────

function showView(mode) {
  g('ea').style.display = mode !== 'db'    ? 'flex'  : 'none';
  g('em').style.display = mode === 'empty' ? 'flex'  : 'none';
  g('ct').style.display = mode === 'page'  ? 'block' : 'none';
  g('tb').style.display = mode === 'page'  ? 'flex'  : 'none';
  g('dv').style.display = mode === 'db'    ? 'flex'  : 'none';
}

function renderPageIcon(id) {
  var metaPage = S.meta.pages.find(function(p){ return p.id === id; });
  var icon = metaPage ? (metaPage.icon || '') : '';
  var pgIcon = g('pg-icon');
  var addIcon = g('add-icon');
  if (icon) {
    pgIcon.textContent = icon;
    pgIcon.style.display = 'inline-block';
    addIcon.style.display = 'none';
  } else {
    pgIcon.style.display = 'none';
    addIcon.style.display = 'inline-block';
  }
}

async function doSelect(id) {
  if (S.dirty && S.currentType !== 'database') await doSave();
  S.currentId = id;
  var page = S.pages.find(function(p){ return p.Id === id; });
  if (!page) return;
  ancs(id).forEach(function(p){ S.expanded.add(p.Id); });
  renderTree(); renderBc(id);
  if (page.Type === 'database') {
    await doSelectDb(id, page);
  } else {
    S.currentType = 'page';
    showView('page');
    var te = g('ttl'); te.value = page.Title || ''; autoR(te);
    renderPageIcon(id);
    setLoad(true, 'ページを読み込み中...');
    try {
      _ed.innerHTML = await apiLoadContent(id);
    } catch(e) { _ed.innerHTML = ''; toast('読み込み失敗: ' + e.message, 'err'); }
    finally { setLoad(false); }
    setSave(''); S.dirty = false;
  }
}

async function doSelectDb(id, page) {
  S.currentType = 'database';
  var meta = S.meta.pages.find(function(p){ return p.id === id; });
  if (!meta || !meta.list) { toast('DBメタ情報が見つかりません', 'err'); return; }
  showView('db');
  g('dv-ttl').textContent = page.Title || '無題';

  // Render DB icon
  var dvIcon = g('dv-pg-icon');
  if (meta.icon) {
    dvIcon.textContent = meta.icon;
    dvIcon.style.display = 'inline-block';
  } else {
    dvIcon.style.display = 'none';
  }

  setLoad(true, 'データを読み込み中...');
  try {
    var results = await Promise.all([getListFields(meta.list), getListItems(meta.list)]);
    S.dbFields = results[0];
    S.dbItems  = results[1];
    S.dbList   = meta.list;
    S.dbFilter = '';
    S.dbSort   = { field: null, asc: true };
    g('filter-inp').value = '';
    g('filter-bar').classList.remove('on');
    renderDbTable();
  } catch(e) { toast('DB読み込み失敗: ' + e.message, 'err'); }
  finally { setLoad(false); }
}

function getDbFields() {
  return S.dbFields.filter(function(f){ return [2,4,6,8,9].indexOf(f.FieldTypeKind) >= 0; });
}

function getSortedFilteredItems() {
  var items = S.dbItems.slice();
  // Filter
  if (S.dbFilter) {
    var q = S.dbFilter.toLowerCase();
    items = items.filter(function(item){
      return !item.Title || item.Title.toLowerCase().includes(q);
    });
  }
  // Sort
  if (S.dbSort.field) {
    var field = S.dbSort.field;
    var asc = S.dbSort.asc;
    items.sort(function(a, b){
      var av = a[field] != null ? String(a[field]) : '';
      var bv = b[field] != null ? String(b[field]) : '';
      if (av < bv) return asc ? -1 : 1;
      if (av > bv) return asc ? 1 : -1;
      return 0;
    });
  }
  return items;
}

function renderDbTable() {
  var thead = g('dth-row'), tbody = g('dtb');
  thead.innerHTML = ''; tbody.innerHTML = '';
  var fields = getDbFields();

  fields.forEach(function(f){
    var th = document.createElement('th');
    var isSorted = S.dbSort.field === f.InternalName;
    th.innerHTML = f.Title + (isSorted ? '<span class="sort-arrow">' + (S.dbSort.asc ? '▲' : '▼') + '</span>' : '');
    th.dataset.field = f.InternalName;
    th.addEventListener('click', function(){
      if (S.dbSort.field === f.InternalName) {
        S.dbSort.asc = !S.dbSort.asc;
      } else {
        S.dbSort.field = f.InternalName;
        S.dbSort.asc = true;
      }
      renderDbTable();
    });
    thead.appendChild(th);
  });

  var thDel = document.createElement('th'); thDel.className = 'n365-th-del'; thead.appendChild(thDel);
  var thAdd = document.createElement('th'); thAdd.className = 'n365-th-add'; thAdd.textContent = '+'; thAdd.title = '列を追加';
  thAdd.addEventListener('click', function(){
    g('col-name').value = ''; g('col-type').value = '2';
    g('col-choices-row').classList.remove('on');
    g('col-md').classList.add('on'); g('col-name').focus();
  });
  thead.appendChild(thAdd);

  getSortedFilteredItems().forEach(function(item){ tbody.appendChild(mkDbRow(item, fields)); });
}

function mkDbRow(item, fields) {
  var tr = document.createElement('tr');
  tr.dataset.id = item.Id;
  fields.forEach(function(f){
    var td = document.createElement('td');

    // Choice field → select element with colored chips
    if (f.FieldTypeKind === 6 && f.Choices) {
      var wrapper = document.createElement('div');
      wrapper.style.padding = '4px 12px';
      var sel = document.createElement('select');
      sel.style.cssText = 'border:none;background:transparent;font-size:14px;font-family:inherit;outline:none;cursor:pointer;max-width:140px;';
      var emptyOpt = document.createElement('option');
      emptyOpt.value = ''; emptyOpt.textContent = '—';
      sel.appendChild(emptyOpt);
      f.Choices.forEach(function(choice, ci){
        var opt = document.createElement('option');
        opt.value = choice; opt.textContent = choice;
        if (item[f.InternalName] === choice) opt.selected = true;
        sel.appendChild(opt);
      });

      // Show chip for current value
      function renderChip(val) {
        wrapper.innerHTML = '';
        if (val) {
          var idx = f.Choices.indexOf(val) % 6;
          var chip = document.createElement('span');
          chip.className = 'n365-select-chip n365-sc-' + idx;
          chip.textContent = val;
          chip.style.cursor = 'pointer';
          chip.addEventListener('click', function(){ wrapper.innerHTML = ''; wrapper.appendChild(sel); sel.focus(); });
          wrapper.appendChild(chip);
        } else {
          wrapper.appendChild(sel);
        }
      }

      sel.addEventListener('change', function(){
        var nv = sel.value;
        var data = {}; data[f.InternalName] = nv;
        item[f.InternalName] = nv;
        apiUpdateDbRow(S.dbList, item.Id, data)
          .then(function(){ renderChip(nv); })
          .catch(function(e){ toast('更新失敗: ' + e.message, 'err'); });
      });
      sel.addEventListener('blur', function(){ renderChip(sel.value); });

      renderChip(item[f.InternalName] || '');
      td.appendChild(wrapper);

    } else {
      // Default contenteditable cell
      var span = document.createElement('span');
      span.className = 'n365-dc';
      span.contentEditable = 'true';
      span.textContent = item[f.InternalName] != null ? String(item[f.InternalName]) : '';
      span.dataset.field = f.InternalName;
      var orig = span.textContent;
      span.addEventListener('focus', function(){ orig = span.textContent; });
      span.addEventListener('keydown', function(e){
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); span.blur(); }
        if (e.key === 'Escape') { span.textContent = orig; span.blur(); }
      });
      span.addEventListener('blur', function(){
        var nv = span.textContent.trim();
        if (nv === orig.trim()) return;
        var data = {}; data[f.InternalName] = nv;
        item[f.InternalName] = nv; orig = nv;
        setSave('保存中...');
        apiUpdateDbRow(S.dbList, item.Id, data)
          .then(function(){ setSave(''); })
          .catch(function(e){ toast('更新失敗: ' + e.message, 'err'); span.textContent = orig; });
      });
      td.appendChild(span);
    }
    tr.appendChild(td);
  });

  var delTd = document.createElement('td'); delTd.className = 'n365-td-del';
  var delBtn = document.createElement('button'); delBtn.className = 'n365-del-btn'; delBtn.title = '行を削除'; delBtn.textContent = '🗑';
  delBtn.addEventListener('click', function(){
    if (!confirm('この行を削除しますか？')) return;
    setLoad(true, '削除中...');
    deleteListItem(S.dbList, item.Id)
      .then(function(){ S.dbItems = S.dbItems.filter(function(i){ return i.Id !== item.Id; }); tr.remove(); toast('削除しました'); })
      .catch(function(e){ toast('削除失敗: ' + e.message, 'err'); })
      .finally(function(){ setLoad(false); });
  });
  delTd.appendChild(delBtn); tr.appendChild(delTd);
  return tr;
}

// ── Kanban view ─────────────────────────────────────────
function renderKanban() {
  var kb = g('kb');
  kb.innerHTML = '';

  // Find first Choice field
  var choiceField = S.dbFields.find(function(f){ return f.FieldTypeKind === 6 && f.Choices; });
  if (!choiceField) {
    var msg = document.createElement('div');
    msg.style.cssText = 'padding:40px;color:#9b9a97;font-size:14px;';
    msg.textContent = '選択肢列を追加してください';
    kb.appendChild(msg);
    return;
  }

  var choices = choiceField.Choices.concat(['未設定']);
  choices.forEach(function(choice){
    var col = document.createElement('div');
    col.className = 'n365-kb-col';
    var hd = document.createElement('div');
    hd.className = 'n365-kb-col-hd';
    hd.textContent = choice;
    col.appendChild(hd);

    var colItems = getSortedFilteredItems().filter(function(item){
      var val = item[choiceField.InternalName] || '';
      return choice === '未設定' ? !val : val === choice;
    });

    colItems.forEach(function(item){
      var card = document.createElement('div');
      card.className = 'n365-kb-card';
      card.textContent = item.Title || '(無題)';
      card.addEventListener('click', function(){
        toast((item.Title || '(無題)') + ' — ' + (item[choiceField.InternalName] || '未設定'));
      });
      col.appendChild(card);
    });

    kb.appendChild(col);
  });
}
