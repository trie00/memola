// ── TREE ───────────────────────────────────────────────
function kidsOf(pid) {
  return S.pages.filter(function(p){ return (p.ParentId||'') === (pid||''); }).sort(function(a,b){ return a.Id<b.Id?-1:1; });
}

function mkNode(page, depth) {
  var isDb = page.Type === 'database';
  var kids = kidsOf(page.Id), hasK = kids.length > 0, exp = S.expanded.has(page.Id), act = page.Id === S.currentId;
  // Get icon from meta
  var metaPage = S.meta.pages.find(function(p){ return p.id === page.Id; });
  var icon = metaPage && metaPage.icon ? metaPage.icon : (isDb ? '🗃' : '📄');

  var item = document.createElement('div');
  var row  = document.createElement('div');
  row.className = 'n365-tr' + (act ? ' on' : '');
  row.style.paddingLeft = (depth * 16 + 6) + 'px';

  var tog = document.createElement('span');
  tog.className = 'n365-tog' + (hasK ? '' : ' lf') + (exp ? ' op' : '');
  tog.innerHTML = hasK ? '&#9658;' : '';
  tog.addEventListener('click', function(e){ e.stopPropagation(); if (!hasK) return; S.expanded.has(page.Id)?S.expanded.delete(page.Id):S.expanded.add(page.Id); renderTree(); });

  var icEl = document.createElement('span'); icEl.className = 'n365-ti'; icEl.textContent = icon;
  var lbl  = document.createElement('span'); lbl.className  = 'n365-tl'; lbl.textContent = page.Title || '無題';
  var acts = document.createElement('span'); acts.className = 'n365-ta';

  if (!isDb) {
    var ab = document.createElement('button'); ab.className = 'n365-tac'; ab.title = '子ページを追加'; ab.innerHTML = '+';
    ab.addEventListener('click', function(e){ e.stopPropagation(); doNew(page.Id); });
    acts.appendChild(ab);
  }
  var db = document.createElement('button'); db.className = 'n365-tac'; db.title = '削除'; db.innerHTML = '🗑';
  db.addEventListener('click', function(e){ e.stopPropagation(); doDel(page.Id); });
  acts.appendChild(db);
  row.append(tog, icEl, lbl, acts);
  row.addEventListener('click', function(){ doSelect(page.Id); });
  item.appendChild(row);

  if (hasK && exp) {
    var sub = document.createElement('div');
    kids.forEach(function(c){ sub.appendChild(mkNode(c, depth+1)); });
    item.appendChild(sub);
  }
  return item;
}

function renderTree() {
  var w = g('tree'); w.innerHTML = '';
  kidsOf('').forEach(function(p){ w.appendChild(mkNode(p, 0)); });
}

// ── BREADCRUMB ─────────────────────────────────────────
function ancs(id) {
  var map = {}, path = [];
  S.pages.forEach(function(p){ map[p.Id] = p; });
  while (id) { var p = map[id]; if (!p) break; path.unshift(p); id = p.ParentId || ''; }
  return path;
}

function renderBc(id) {
  var bc = g('bc'); bc.innerHTML = '';
  var ancestors = ancs(id);
  ancestors.forEach(function(p, i) {
    var s = document.createElement('span'); s.className = 'n365-bi'; s.textContent = p.Title || '無題';
    s.addEventListener('click', function(){ doSelect(p.Id); }); bc.appendChild(s);
    if (i < ancestors.length - 1) { var sep = document.createElement('span'); sep.textContent = '/'; sep.style.color = '#e9e9e7'; bc.appendChild(sep); }
  });
}
