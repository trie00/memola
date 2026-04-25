// ── 多重起動防止 ────────────────────────────────────────
if (document.getElementById('n365-overlay')) {
  document.getElementById('n365-overlay').remove();
  var _es = document.getElementById('n365-style');
  if (_es) _es.remove();
  return;
}

// ── SharePointチェック ─────────────────────────────────
if (!location.hostname.endsWith('sharepoint.com')) {
  alert('SharePointのページ上でクリックしてください。');
  return;
}

// ── サイトURL・フォルダパス自動検出 ──────────────────────
var _sm = location.href.match(/(https:\/\/[^\/]+\/sites\/[^\/]+)/);
var SITE = _sm ? _sm[1] : location.origin;
var SITE_REL = SITE.replace(/https:\/\/[^\/]+/, '');
var FOLDER = SITE_REL + '/Shared Documents/n365-pages';
var META = '_meta.json';
var SAVE_MS = 2000;

// ── CSS ────────────────────────────────────────────────
var _st = document.createElement('style');
_st.id = 'n365-style';
_st.textContent = '<<N365_CSS>>';
document.head.appendChild(_st);

// ── SVG ICONS ──────────────────────────────────────────
var ICONS = {
  code:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  codeBlock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><polyline points="10 14 8 12 10 10"/><polyline points="14 10 16 12 14 14"/></svg>',
  ul:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1.4" fill="currentColor" stroke="none"/><circle cx="4.5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="4.5" cy="18" r="1.4" fill="currentColor" stroke="none"/></svg>',
  ol:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="6" x2="20" y2="6"/><line x1="10" y1="12" x2="20" y2="12"/><line x1="10" y1="18" x2="20" y2="18"/><path d="M3.5 4.5L5 3.5v5"/><path d="M3.5 8.5h3"/></svg>',
  todo:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><polyline points="8 12 11 15 16 9"/></svg>',
  quote:     '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 11c0-2.2 1.3-4 4-4v2c-1 0-2 1-2 2h2v5H5v-5zm8 0c0-2.2 1.3-4 4-4v2c-1 0-2 1-2 2h2v5h-4v-5z"/></svg>',
  hr:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="12" x2="20" y2="12"/></svg>',
  search:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>',
  plus:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  database:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>',
  page:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  table:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>',
  board:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="6" height="18" rx="1"/><rect x="11" y="3" width="6" height="11" rx="1"/><rect x="19" y="3" width="2" height="7" rx="1"/></svg>',
  filter:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.5 10 19 14 21 14 12.5 22 3"/></svg>',
  sort:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="9" y2="18"/></svg>',
  sidebar:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>',
  close:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
};

// ── HTML ───────────────────────────────────────────────
var _ov = document.createElement('div');
_ov.id = 'n365-overlay';
_ov.innerHTML =
'<aside id="n365-sb">' +
  '<div id="n365-sb-hd"><span>📋</span>n365<button id="n365-x" title="閉じる(Esc)">' + ICONS.close + '</button></div>' +
  '<div class="n365-snav" id="n365-search-nav">' + ICONS.search + '<span>検索</span><span class="n365-snav-hint">Ctrl K</span></div>' +
  '<div class="n365-sl-label">プライベートページ</div>' +
  '<div id="n365-tree-wrap"><div id="n365-tree"></div></div>' +
  '<div id="n365-sb-ft">' +
    '<button class="n365-nb" id="n365-nr">' + ICONS.plus + '<span>ページを追加</span></button>' +
    '<button class="n365-nb" id="n365-ndb">' + ICONS.database + '<span>DBを追加</span></button>' +
  '</div>' +
'</aside>' +
'<main id="n365-main">' +
  '<div id="n365-top">' +
    '<button id="n365-sb-toggle" title="サイドバー">' + ICONS.sidebar + '</button>' +
    '<div id="n365-bc"></div>' +
    '<div id="n365-ss"></div>' +
  '</div>' +
  '<div id="n365-tb">' +
    '<button class="n365-b" data-cmd="h1" title="見出し1"><b>H1</b></button>' +
    '<button class="n365-b" data-cmd="h2" title="見出し2"><b>H2</b></button>' +
    '<button class="n365-b" data-cmd="h3" title="見出し3"><b>H3</b></button>' +
    '<span class="n365-bs"></span>' +
    '<button class="n365-b" data-cmd="bold" title="太字"><b>B</b></button>' +
    '<button class="n365-b" data-cmd="italic" title="斜体"><i>I</i></button>' +
    '<button class="n365-b" data-cmd="strike" title="取り消し線"><s>S</s></button>' +
    '<button class="n365-b" data-cmd="code" title="インラインコード">' + ICONS.code + '</button>' +
    '<span class="n365-bs"></span>' +
    '<button class="n365-b" data-cmd="ul" title="箇条書き">' + ICONS.ul + '</button>' +
    '<button class="n365-b" data-cmd="ol" title="番号付きリスト">' + ICONS.ol + '</button>' +
    '<button class="n365-b" data-cmd="todo" title="ToDoリスト">' + ICONS.todo + '</button>' +
    '<button class="n365-b" data-cmd="quote" title="引用">' + ICONS.quote + '</button>' +
    '<button class="n365-b" data-cmd="callout" title="コールアウト"><span style="font-size:14px">💡</span></button>' +
    '<button class="n365-b" data-cmd="pre" title="コードブロック">' + ICONS.codeBlock + '</button>' +
    '<span class="n365-bs"></span>' +
    '<button class="n365-b" data-cmd="hr" title="区切り線">' + ICONS.hr + '</button>' +
  '</div>' +
  '<div id="n365-ea"><div id="n365-ei">' +
    '<div id="n365-em"><div style="font-size:48px">📄</div><h2>n365</h2>' +
      '<p>サイドバーからページを選択するか、新しいページを作成してください。</p>' +
      '<div style="display:flex;gap:8px;justify-content:center">' +
        '<button class="n365-btn p" id="n365-ne">新しいページを作成</button>' +
        '<button class="n365-btn s" id="n365-ne-db">DBを作成</button>' +
      '</div>' +
    '</div>' +
    '<div id="n365-ct">' +
      '<div id="n365-pg-hd">' +
        '<div id="n365-icon-wrap">' +
          '<span id="n365-pg-icon"></span>' +
          '<button class="n365-pg-icon-empty" id="n365-add-icon">アイコンを追加</button>' +
        '</div>' +
      '</div>' +
      '<textarea id="n365-ttl" rows="1" placeholder="タイトルなし"></textarea>' +
      '<div id="n365-ed" contenteditable="true" spellcheck="false"></div>' +
    '</div>' +
  '</div></div>' +
  '<div id="n365-dv">' +
    '<div id="n365-dv-hd">' +
      '<div id="n365-dv-icon-wrap">' +
        '<span id="n365-dv-pg-icon"></span>' +
      '</div>' +
      '<div id="n365-dv-ttl" contenteditable="true" spellcheck="false"></div>' +
    '</div>' +
    '<div id="n365-db-views">' +
      '<button class="n365-db-vbtn on" id="n365-dbv-table">' + ICONS.table + '<span>テーブル</span></button>' +
      '<button class="n365-db-vbtn" id="n365-dbv-board">' + ICONS.board + '<span>ボード</span></button>' +
    '</div>' +
    '<div id="n365-db-tb">' +
      '<button class="n365-db-tb-btn" id="n365-db-filter-btn">' + ICONS.filter + '<span>フィルター</span></button>' +
      '<button class="n365-db-tb-btn" id="n365-db-sort-btn">' + ICONS.sort + '<span>ソート</span></button>' +
    '</div>' +
    '<div id="n365-filter-bar">' +
      '<input id="n365-filter-inp" type="text" placeholder="フィルター...">' +
      '<button id="n365-filter-close">' + ICONS.close + '</button>' +
    '</div>' +
    '<div id="n365-dt-wrap">' +
      '<table id="n365-dt">' +
        '<thead><tr id="n365-dth-row"></tr></thead>' +
        '<tbody id="n365-dtb"></tbody>' +
      '</table>' +
    '</div>' +
    '<button id="n365-dadd">＋ 新しい行</button>' +
    '<div id="n365-kb"></div>' +
  '</div>' +
  '<div id="n365-ld"><span>⏳</span><span id="n365-lm"> 読み込み中...</span></div>' +
'</main>' +
'<div id="n365-md"><div class="n365-mb">' +
  '<h2>🚀 初期セットアップ</h2>' +
  '<p>ドキュメントライブラリに <code>n365-pages</code> フォルダを作成してよいですか？<br>ページは .md ファイルとしてここに保存されます。</p>' +
  '<div class="n365-ma">' +
    '<button class="n365-btn s" id="n365-mc">キャンセル</button>' +
    '<button class="n365-btn p" id="n365-mk">フォルダを作成</button>' +
  '</div>' +
'</div></div>' +
'<div id="n365-col-md"><div class="n365-mb">' +
  '<h2>列を追加</h2>' +
  '<div style="display:flex;flex-direction:column;gap:4px;margin-bottom:4px">' +
    '<div class="n365-col-row"><label>列名</label><input id="n365-col-name" class="n365-col-inp" type="text" placeholder="例: ステータス"></div>' +
    '<div class="n365-col-row"><label>種類</label><select id="n365-col-type" class="n365-col-sel">' +
      '<option value="2">テキスト</option>' +
      '<option value="9">数値</option>' +
      '<option value="4">日付</option>' +
      '<option value="8">チェックボックス</option>' +
      '<option value="6">選択肢</option>' +
    '</select></div>' +
    '<div class="n365-col-row" id="n365-col-choices-row"><label>選択肢（1行1つ）</label><textarea id="n365-col-choices" class="n365-col-choices" placeholder="例:\n進行中\n完了\n未着手"></textarea></div>' +
  '</div>' +
  '<div class="n365-ma">' +
    '<button class="n365-btn s" id="n365-col-cancel">キャンセル</button>' +
    '<button class="n365-btn p" id="n365-col-ok">追加</button>' +
  '</div>' +
'</div></div>' +
'<div id="n365-ftb">' +
  '<button class="n365-fb" data-cmd="bold" title="太字"><b>B</b></button>' +
  '<button class="n365-fb" data-cmd="italic" title="斜体"><i>I</i></button>' +
  '<button class="n365-fb" data-cmd="strike" title="取り消し線"><s>S</s></button>' +
  '<button class="n365-fb" data-cmd="code" title="インラインコード">' + ICONS.code + '</button>' +
  '<span class="n365-fb-sep"></span>' +
  '<button class="n365-fb" data-cmd="h1" title="見出し1"><b>H1</b></button>' +
  '<button class="n365-fb" data-cmd="h2" title="見出し2"><b>H2</b></button>' +
  '<button class="n365-fb" data-cmd="h3" title="見出し3"><b>H3</b></button>' +
  '<span class="n365-fb-sep"></span>' +
  '<button class="n365-fb" data-cmd="ul" title="箇条書き">' + ICONS.ul + '</button>' +
  '<button class="n365-fb" data-cmd="ol" title="番号付きリスト">' + ICONS.ol + '</button>' +
  '<button class="n365-fb" data-cmd="quote" title="引用">' + ICONS.quote + '</button>' +
'</div>' +
'<div id="n365-slash"></div>' +
'<div id="n365-qs"><div id="n365-qs-box">' +
  '<input id="n365-qs-inp" type="text" placeholder="ページを検索...">' +
  '<div id="n365-qs-res"></div>' +
'</div></div>' +
'<div id="n365-emoji"><div id="n365-emoji-grid"></div><button id="n365-emoji-rm">アイコンを削除</button></div>' +
'<div id="n365-tk"></div>';
document.body.appendChild(_ov);

// ── helpers ────────────────────────────────────────────
function g(id) { return document.getElementById('n365-' + id); }
var _ed = g('ed');
