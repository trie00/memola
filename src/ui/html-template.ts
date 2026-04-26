// The big static HTML string that fills #n365-overlay.

import { ICONS } from '../icons';

export function buildHtml(): string {
  return (
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
        '<button id="n365-pgm-btn" title="ページメニュー">' + ICONS.more + '</button>' +
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
        '<div id="n365-dv-inner">' +
          '<div id="n365-dv-hd">' +
            '<div id="n365-dv-icon-wrap">' +
              '<span id="n365-dv-pg-icon"></span>' +
              '<button class="n365-pg-icon-empty" id="n365-dv-add-icon">😊 アイコンを追加</button>' +
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
            '<button id="n365-dadd">＋ 新しい行</button>' +
          '</div>' +
          '<div id="n365-kb"></div>' +
        '</div>' +
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
    '<div id="n365-pgm">' +
      '<div class="n365-pgm-item" data-action="export-md">' + ICONS.download + '<span>Markdownでエクスポート</span></div>' +
      '<div class="n365-pgm-item" data-action="export-html">' + ICONS.download + '<span>HTMLでエクスポート</span></div>' +
      '<div class="n365-pgm-sep"></div>' +
      '<div class="n365-pgm-item" data-action="duplicate">' + ICONS.copy + '<span>複製</span></div>' +
      '<div class="n365-pgm-item" data-action="copy-link">' + ICONS.link + '<span>リンクをコピー</span></div>' +
      '<div class="n365-pgm-sep"></div>' +
      '<div class="n365-pgm-item" data-action="print">' + ICONS.print + '<span>印刷</span></div>' +
      '<div class="n365-pgm-item" data-action="info">' + ICONS.info + '<span>ページ情報</span></div>' +
      '<div class="n365-pgm-sep"></div>' +
      '<div class="n365-pgm-item danger" data-action="delete">' + ICONS.trash + '<span>削除</span></div>' +
    '</div>' +
    '<div id="n365-tk"></div>'
  );
}
