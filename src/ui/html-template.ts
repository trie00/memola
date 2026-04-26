// The big static HTML string that fills #n365-overlay.

import { ICONS } from '../icons';

export function buildHtml(): string {
  return (
    '<aside id="n365-sb">' +
      '<div id="n365-sb-hd">' +
        '<button id="n365-ws-btn" title="ワークスペース">' +
          '<span class="n365-ws-badge">N</span>' +
          '<span id="n365-ws-name">n365</span>' +
          '<span class="n365-ws-caret">▾</span>' +
        '</button>' +
        '<button id="n365-sb-collapse" title="折りたたむ (Ctrl+\\)">«</button>' +
        '<button id="n365-x" title="閉じる(Esc)">' + ICONS.close + '</button>' +
      '</div>' +
      '<div class="n365-snav" id="n365-search-nav">' + ICONS.search + '<span>検索</span><span class="n365-snav-hint">Ctrl K</span></div>' +
      '<div class="n365-quick-wrap"><button class="n365-quick-add" id="n365-quick-add">' + ICONS.plus + '<span>新規</span></button></div>' +
      '<div class="n365-sl-label">プライベート</div>' +
      '<div id="n365-tree-wrap"><div id="n365-tree"></div></div>' +
      '<div id="n365-sb-ft">' +
        '<button class="n365-nb" id="n365-settings-btn" title="設定">⚙<span>設定</span></button>' +
        '<button class="n365-nb" id="n365-trash-btn">' + ICONS.trash + '<span>ゴミ箱</span></button>' +
      '</div>' +
      '<div id="n365-create-menu">' +
        '<div class="n365-cm-section">作成</div>' +
        '<div class="n365-cm-item" data-cm="new-page"><span class="n365-cm-ic">📄</span><div class="n365-cm-body"><span class="n365-cm-name">空のページ</span><span class="n365-cm-sub">L1〜L3に追加</span></div></div>' +
        '<div class="n365-cm-item" data-cm="new-db"><span class="n365-cm-ic">🗂</span><div class="n365-cm-body"><span class="n365-cm-name">空のDB</span><span class="n365-cm-sub">リスト＋mdフォルダを作成</span></div></div>' +
        '<div class="n365-cm-sep"></div>' +
        '<div class="n365-cm-section">テンプレートから</div>' +
        '<div class="n365-cm-item" data-cm="tpl-weekly"><span class="n365-cm-ic">📅</span><span class="n365-cm-name">週次ノート</span></div>' +
        '<div class="n365-cm-item" data-cm="tpl-minutes"><span class="n365-cm-ic">📓</span><span class="n365-cm-name">議事録</span></div>' +
        '<div class="n365-cm-item" data-cm="tpl-tasks"><span class="n365-cm-ic">✓</span><span class="n365-cm-name">タスクDB</span></div>' +
      '</div>' +
    '</aside>' +
    '<div id="n365-rail-flyout"><div id="n365-rail-flyout-list"></div></div>' +
    '<main id="n365-main">' +
      '<div id="n365-top">' +
        '<button id="n365-sb-toggle" title="サイドバー (Ctrl+\\)">' + ICONS.sidebar + '</button>' +
        '<div id="n365-bc"></div>' +
        '<div id="n365-ss"></div>' +
        '<button id="n365-outline-btn" class="n365-tog-btn" title="目次">' + ICONS.sort + '<span>目次</span></button>' +
        '<button id="n365-props-btn" class="n365-tog-btn" title="プロパティ">' + ICONS.info + '<span>プロパティ</span></button>' +
        '<button id="n365-ai-btn" class="n365-tog-btn" title="AIチャット">' + ICONS.sparkle + '<span>AI</span></button>' +
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
      '<div id="n365-content-row">' +
      '<aside id="n365-outline">' +
        '<div id="n365-outline-hd"><span>目次</span><button class="n365-pane-x" id="n365-outline-x" title="閉じる">«</button></div>' +
        '<div id="n365-outline-list"></div>' +
      '</aside>' +
      '<div id="n365-ea"><div id="n365-ei">' +
        '<div id="n365-em">' +
          '<div class="n365-em-icon">📄</div>' +
          '<h2 class="n365-em-title">はじめてみよう</h2>' +
          '<p class="n365-em-sub">ページを作るか、テンプレートから始められます。</p>' +
          '<div class="n365-em-btns">' +
            '<button class="n365-btn p" id="n365-ne">＋ 空のページ</button>' +
            '<button class="n365-btn s" id="n365-ne-db">▤ DBを作る</button>' +
            '<button class="n365-btn ghost" id="n365-ne-tpl">⎘ テンプレ</button>' +
          '</div>' +
          '<div class="n365-em-chips">' +
            '<button class="n365-chip n365-em-chip" data-tpl="weekly">📅 週次ノート</button>' +
            '<button class="n365-chip n365-em-chip" data-tpl="tasks">✓ タスクDB</button>' +
            '<button class="n365-chip n365-em-chip" data-tpl="minutes">📓 議事録</button>' +
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
            '<button class="n365-db-vbtn" id="n365-dbv-list">' + ICONS.ul + '<span>リスト</span></button>' +
            '<button class="n365-db-vbtn" id="n365-dbv-gallery">' + ICONS.codeBlock + '<span>ギャラリー</span></button>' +
            '<button class="n365-db-vbtn" id="n365-dbv-calendar">' + ICONS.info + '<span>カレンダー</span></button>' +
            '<button class="n365-db-vbtn" id="n365-dbv-gantt">' + ICONS.sort + '<span>ガント</span></button>' +
          '</div>' +
          '<div id="n365-db-tb">' +
            '<button class="n365-db-chip" id="n365-db-filter-btn"><span>＋ フィルター</span></button>' +
            '<button class="n365-db-chip" id="n365-db-sort-btn">' + ICONS.sort + '<span>ソート</span></button>' +
            '<button class="n365-db-chip" id="n365-db-group-btn"><span>⊟</span><span>グループ</span></button>' +
            '<button class="n365-db-new-btn" id="n365-db-new-row">＋ 新規</button>' +
            '<div class="n365-db-tb-spacer"></div>' +
            '<button class="n365-db-chip subtle" id="n365-db-csv-export">' + ICONS.download + '<span>CSV</span></button>' +
            '<button class="n365-db-chip subtle" id="n365-db-csv-import">' + ICONS.copy + '<span>取込</span></button>' +
          '</div>' +
          '<div id="n365-filter-chips"></div>' +
          '<div id="n365-filter-popover"></div>' +
          '<div id="n365-dt-wrap">' +
            '<table id="n365-dt">' +
              '<thead><tr id="n365-dth-row"></tr></thead>' +
              '<tbody id="n365-dtb"></tbody>' +
            '</table>' +
            '<button id="n365-dadd">＋ 新しい行</button>' +
          '</div>' +
          '<div id="n365-kb"></div>' +
          '<div id="n365-list-view" class="n365-altview"></div>' +
          '<div id="n365-gallery-view" class="n365-altview"></div>' +
          '<div id="n365-calendar-view" class="n365-altview"></div>' +
          '<div id="n365-gantt-view" class="n365-altview"></div>' +
        '</div>' +
      '</div>' +
      '<aside id="n365-props">' +
        '<div id="n365-props-hd"><span>プロパティ</span><button class="n365-pane-x" id="n365-props-x" title="閉じる">»</button></div>' +
        '<div id="n365-props-list"></div>' +
      '</aside>' +
      '<aside id="n365-ai-panel">' +
        '<div id="n365-ai-hd">' +
          '<span class="n365-ai-title">' + ICONS.sparkle + '<span>AIチャット</span></span>' +
          '<select id="n365-ai-hist" title="会話履歴"></select>' +
          '<button id="n365-ai-clear" title="現在の会話を削除">' + ICONS.trash + '</button>' +
          '<button id="n365-ai-key" title="APIキー設定">⚙</button>' +
          '<button id="n365-ai-close" title="閉じる">' + ICONS.close + '</button>' +
        '</div>' +
        '<div id="n365-ai-messages"></div>' +
        '<div id="n365-ai-chips"></div>' +
        '<div id="n365-ai-inputarea">' +
          '<textarea id="n365-ai-input" placeholder="このページについて聞く…" rows="2"></textarea>' +
          '<span class="n365-ai-kbd">⌘↵</span>' +
          '<button id="n365-ai-send" title="送信 (⌘↵)">' + ICONS.send + '</button>' +
        '</div>' +
      '</aside>' +
      '</div>' + // /content-row
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
    '<div id="n365-col-md"><div class="n365-mb" style="max-width:380px">' +
      '<h2>列を追加</h2>' +
      '<div class="n365-col-row"><label>列名</label><input id="n365-col-name" class="n365-col-inp" type="text" placeholder="例: 担当者"></div>' +
      '<div class="n365-col-row"><label>タイプ</label>' +
        '<div id="n365-col-type-grid">' +
          '<div class="n365-col-type" data-tk="2"  data-ic="Aa"><span class="n365-col-type-ic">Aa</span><span>テキスト</span></div>' +
          '<div class="n365-col-type" data-tk="3"  data-ic="¶"><span class="n365-col-type-ic">¶</span><span>複数行</span></div>' +
          '<div class="n365-col-type" data-tk="9"  data-ic="#"><span class="n365-col-type-ic">#</span><span>数値</span></div>' +
          '<div class="n365-col-type" data-tk="4"  data-ic="📅"><span class="n365-col-type-ic">📅</span><span>日付</span></div>' +
          '<div class="n365-col-type" data-tk="6"  data-ic="◉"><span class="n365-col-type-ic">◉</span><span>セレクト</span></div>' +
          '<div class="n365-col-type" data-tk="15" data-ic="◎"><span class="n365-col-type-ic">◎</span><span>マルチ</span></div>' +
          '<div class="n365-col-type" data-tk="8"  data-ic="☐"><span class="n365-col-type-ic">☐</span><span>チェック</span></div>' +
          '<div class="n365-col-type" data-tk="11" data-ic="🔗"><span class="n365-col-type-ic">🔗</span><span>URL</span></div>' +
          '<div class="n365-col-type" data-tk="20" data-ic="👤"><span class="n365-col-type-ic">👤</span><span>担当者</span></div>' +
          '<div class="n365-col-type" data-tk="7"  data-ic="↔"><span class="n365-col-type-ic">↔</span><span>関係</span></div>' +
          '<div class="n365-col-type" data-tk="17" data-ic="Σ"><span class="n365-col-type-ic">Σ</span><span>ロールアップ</span></div>' +
          '<div class="n365-col-type" data-tk="17" data-ic="ƒ"><span class="n365-col-type-ic">ƒ</span><span>数式</span></div>' +
          '<div class="n365-col-type" data-tk="18" data-ic="📎"><span class="n365-col-type-ic">📎</span><span>ファイル</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="n365-col-row" id="n365-col-choices-row"><label>選択肢（1行1つ）</label><textarea id="n365-col-choices" class="n365-col-choices" placeholder="例:\n進行中\n完了\n未着手"></textarea></div>' +
      '<div class="n365-col-row"><label>SharePointリストの列にマップ</label><input id="n365-col-spmap" class="n365-col-inp" type="text" placeholder="自動推定"></div>' +
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
    '<div id="n365-trash-md"><div class="n365-mb" style="max-width:540px">' +
      '<h2>ゴミ箱</h2>' +
      '<div id="n365-trash-list"></div>' +
      '<div class="n365-ma"><button class="n365-btn s" id="n365-trash-close">閉じる</button></div>' +
    '</div></div>' +
    '<div id="n365-settings-md"><div class="n365-mb" style="max-width:480px">' +
      '<h2>⚙ 設定</h2>' +
      '<div class="n365-set-row"><label>AI APIキー</label><input id="n365-set-aikey" type="password" placeholder="sk-ant-..."></div>' +
      '<div class="n365-set-row"><label>表示密度</label><select id="n365-set-density"><option value="compact">コンパクト</option><option value="regular" selected>標準</option><option value="comfy">ゆったり</option></select></div>' +
      '<div class="n365-set-row"><label>テーマ</label><select id="n365-set-theme"><option value="light" selected>ライト</option><option value="dark">ダーク</option></select></div>' +
      '<div class="n365-ma">' +
        '<button class="n365-btn s" id="n365-set-cancel">キャンセル</button>' +
        '<button class="n365-btn p" id="n365-set-save">保存</button>' +
      '</div>' +
    '</div></div>' +
    '<div id="n365-pgm">' +
      '<div class="n365-pgm-item" data-action="export-md">' + ICONS.download + '<span>Markdownでエクスポート</span></div>' +
      '<div class="n365-pgm-item" data-action="export-html">' + ICONS.download + '<span>HTMLでエクスポート</span></div>' +
      '<div class="n365-pgm-sep"></div>' +
      '<div class="n365-pgm-item" data-action="duplicate">' + ICONS.copy + '<span>複製</span></div>' +
      '<div class="n365-pgm-item" data-action="copy-link">' + ICONS.link + '<span>リンクをコピー</span></div>' +
      '<div class="n365-pgm-sep"></div>' +
      '<div class="n365-pgm-item" data-action="print">' + ICONS.print + '<span>印刷</span></div>' +
      '<div class="n365-pgm-item" data-action="info">' + ICONS.info + '<span>ページ情報</span></div>' +
      '<div class="n365-pgm-item" data-action="focus">' + ICONS.sidebar + '<span>集中モード切替</span></div>' +
      '<div class="n365-pgm-sep"></div>' +
      '<div class="n365-pgm-item danger" data-action="delete">' + ICONS.trash + '<span>削除</span></div>' +
    '</div>' +
    '<div id="n365-tk"></div>'
  );
}
