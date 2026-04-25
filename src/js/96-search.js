// ── QUICK SEARCH ───────────────────────────────────────
var _qsSel = 0;
var _qsItems = [];          // flat list { page, summary } for keyboard nav
var _qsTitleItems = [];     // title matches
var _qsBodyItems = [];      // body matches via SP Search
var _qsBodyLoading = false;
var _qsToken = 0;           // cancellation token for stale requests

function openSearch() {
  g('qs').classList.add('on');
  g('qs-inp').value = '';
  _qsSel = 0;
  renderQs('');
  g('qs-inp').focus();
}

function closeSearch() {
  g('qs').classList.remove('on');
  _qsToken++;
}

function getPagePath(id) {
  var ancestors = ancs(id);
  return ancestors.map(function(p){ return p.Title || '無題'; }).join(' / ');
}

function _qsEsc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderSnippet(summary) {
  // SP Search returns HitHighlightedSummary with <c0>...</c0> for hits and <ddd/> for ellipsis
  return _qsEsc(summary)
    .replace(/&lt;c0&gt;/g, '<mark class="n365-qs-hit">')
    .replace(/&lt;\/c0&gt;/g, '</mark>')
    .replace(/&lt;ddd\/&gt;/g, '…');
}

async function spSearch(query) {
  var folderUrl = location.protocol + '//' + location.hostname + FOLDER;
  var safeQuery = query.replace(/["']/g, '');
  var kql = '"' + safeQuery + '" AND Path:"' + folderUrl + '" AND FileExtension:md';
  var url = SITE + "/_api/search/query?querytext='" + encodeURIComponent(kql) +
            "'&rowlimit=20&trimduplicates=false&selectproperties='Title,Path,HitHighlightedSummary'";
  var r = await fetch(url, {
    headers: { Accept: 'application/json;odata=verbose' },
    credentials: 'include'
  });
  if (!r.ok) throw new Error('search ' + r.status);
  var j = await r.json();
  try {
    var rows = j.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
    return rows.map(function(row) {
      var props = {};
      row.Cells.results.forEach(function(c) { props[c.Key] = c.Value; });
      return {
        path: props.Path || '',
        title: props.Title || '',
        summary: props.HitHighlightedSummary || ''
      };
    });
  } catch(e) {
    return [];
  }
}

function pageFromSPPath(spPath) {
  var marker = '/n365-pages/';
  var idx = spPath.indexOf(marker);
  if (idx < 0) return null;
  var rel;
  try { rel = decodeURIComponent(spPath.substring(idx + marker.length)); }
  catch (e) { rel = spPath.substring(idx + marker.length); }
  rel = rel.replace(/\/index\.md$/i, '');
  var meta = S.meta.pages.find(function(p) { return p.path === rel; });
  if (!meta) return null;
  return S.pages.find(function(p) { return p.Id === meta.id; });
}

function renderQs(q) {
  // Title search (instant, local)
  _qsTitleItems = S.pages.filter(function(p){
    if (!q) return true;
    return (p.Title || '').toLowerCase().includes(q.toLowerCase());
  }).slice(0, 20);

  _qsBodyItems = [];
  _qsBodyLoading = false;

  // Body search (debounced, async via SP Search)
  if (q && q.trim().length >= 2) {
    _qsBodyLoading = true;
    var token = ++_qsToken;
    setTimeout(function() {
      if (token !== _qsToken) return;
      spSearch(q).then(function(hits) {
        if (token !== _qsToken) return;
        var seen = {};
        _qsTitleItems.forEach(function(p){ seen[p.Id] = true; });
        _qsBodyItems = hits.map(function(h) {
          var p = pageFromSPPath(h.path);
          if (!p || seen[p.Id]) return null;
          return { page: p, summary: h.summary };
        }).filter(Boolean);
        _qsBodyLoading = false;
        rebuildQsDom();
      }).catch(function() {
        _qsBodyLoading = false;
        rebuildQsDom();
      });
    }, 300);
  } else {
    _qsToken++;
  }

  rebuildQsDom();
}

function rebuildQsDom() {
  var res = g('qs-res');
  res.innerHTML = '';
  _qsItems = [];
  var q = g('qs-inp').value || '';

  if (_qsTitleItems.length > 0) {
    var hd1 = document.createElement('div');
    hd1.className = 'n365-qs-section';
    hd1.textContent = q.trim() ? 'タイトル' : '最近のページ';
    res.appendChild(hd1);
    _qsTitleItems.forEach(function(p) {
      _qsItems.push({ page: p, summary: '' });
      res.appendChild(buildQsItem(p, '', _qsItems.length - 1));
    });
  }

  if (_qsBodyItems.length > 0) {
    var hd2 = document.createElement('div');
    hd2.className = 'n365-qs-section';
    hd2.textContent = '本文';
    res.appendChild(hd2);
    _qsBodyItems.forEach(function(item) {
      _qsItems.push({ page: item.page, summary: item.summary });
      res.appendChild(buildQsItem(item.page, item.summary, _qsItems.length - 1));
    });
  } else if (_qsBodyLoading) {
    var ld = document.createElement('div');
    ld.className = 'n365-qs-loading';
    ld.textContent = '🔍 本文を検索中...';
    res.appendChild(ld);
  }

  if (_qsItems.length === 0 && !_qsBodyLoading) {
    res.innerHTML = '<div class="n365-qs-empty">見つかりませんでした</div>';
  }

  if (_qsSel >= _qsItems.length) _qsSel = 0;
}

function buildQsItem(p, summary, idx) {
  var div = document.createElement('div');
  div.className = 'n365-qs-item' + (idx === _qsSel ? ' sel' : '');
  var isDb = p.Type === 'database';
  var pathStr = getPagePath(p.Id);
  div.innerHTML =
    '<span class="n365-qs-ic">' + (isDb ? '🗃' : '📄') + '</span>' +
    '<div style="flex:1;min-width:0">' +
      '<div class="n365-qs-title">' + _qsEsc(p.Title || '無題') + '</div>' +
      (pathStr ? '<div class="n365-qs-path">' + _qsEsc(pathStr) + '</div>' : '') +
      (summary ? '<div class="n365-qs-snippet">' + renderSnippet(summary) + '</div>' : '') +
    '</div>';
  div.addEventListener('click', function(){
    closeSearch();
    doSelect(p.Id);
  });
  return div;
}

function qsMove(dir) {
  if (_qsItems.length === 0) return;
  _qsSel = (_qsSel + dir + _qsItems.length) % _qsItems.length;
  var nodes = g('qs-res').querySelectorAll('.n365-qs-item');
  nodes.forEach(function(it, i){ it.classList.toggle('sel', i === _qsSel); });
  if (nodes[_qsSel]) nodes[_qsSel].scrollIntoView({ block: 'nearest' });
}

function qsConfirm() {
  if (_qsItems[_qsSel]) {
    closeSearch();
    doSelect(_qsItems[_qsSel].page.Id);
  }
}
