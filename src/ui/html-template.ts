// The big static HTML string that fills #memola-overlay.

import { ICONS } from '../icons';

export function buildHtml(): string {
  return (
    '<aside id="memola-sb">' +
      '<div id="memola-sb-hd">' +
        '<button id="memola-ws-btn" title="ワークスペース">' +
          '<span class="memola-ws-badge">N</span>' +
          '<span id="memola-ws-name">Memola</span>' +
          '<span class="memola-ws-caret">▾</span>' +
        '</button>' +
        '<button id="memola-sb-collapse" class="memola-pane-x" title="サイドバーを閉じる (Ctrl+\\)">' + ICONS.close + '</button>' +
      '</div>' +
      '<div class="memola-snav" id="memola-search-nav">' + ICONS.search + '<span>検索</span><span class="memola-snav-hint">Ctrl K</span></div>' +
      '<div class="memola-quick-wrap"><button class="memola-quick-add" id="memola-quick-add">' + ICONS.plus + '<span>新規</span></button></div>' +
      '<div class="memola-sb-fixed">' +
        '<div class="memola-sb-fx" id="memola-sb-daily-today" title="今日のデイリーノートを開く / 作成"><span class="memola-sb-fx-ic">📅</span><span class="memola-sb-fx-lb">今日のノート</span></div>' +
        '<div class="memola-sb-fx" id="memola-sb-daily-pick" title="任意の日のデイリーノートを開く"><span class="memola-sb-fx-ic">🗓</span><span class="memola-sb-fx-lb">日付を選んで開く</span></div>' +
      '</div>' +
      '<div class="memola-sb-fixed">' +
        '<div class="memola-sb-fx" id="memola-drafts-btn" style="display:none" title="編集中の下書き / 保存衝突で退避された編集"><span class="memola-sb-fx-ic">📝</span><span class="memola-sb-fx-lb">下書き</span><span class="memola-drafts-badge-count">0</span></div>' +
        '<div class="memola-sb-fx" id="memola-trash-btn" title="削除されたページ"><span class="memola-sb-fx-ic">🗑</span><span class="memola-sb-fx-lb">ゴミ箱</span></div>' +
      '</div>' +
      '<div id="memola-tree-wrap">' +
        '<div class="memola-sl-label" id="memola-tree-pinned-lbl" style="display:none">📌 ピン留め</div>' +
        '<div id="memola-tree-pinned"></div>' +
        '<div class="memola-sl-label" id="memola-tree-private-lbl">🔒 プライベート</div>' +
        '<div id="memola-tree-private"></div>' +
        '<div class="memola-sl-label" id="memola-tree-org-lbl">🌐 組織</div>' +
        '<div id="memola-tree-org"></div>' +
      '</div>' +
      '<div id="memola-sb-ft">' +
        '<button class="memola-nb" id="memola-settings-btn" title="設定">⚙<span>設定</span></button>' +
        '<button class="memola-nb" id="memola-x" title="アプリを閉じる (Esc)">' + ICONS.exit + '<span>閉じる</span></button>' +
      '</div>' +
      '<div id="memola-create-menu">' +
        '<div class="memola-cm-section">作成</div>' +
        '<div class="memola-cm-item" data-cm="new-page"><span class="memola-cm-ic">📄</span><div class="memola-cm-body"><span class="memola-cm-name">空のページ</span><span class="memola-cm-sub">L1〜L3に追加</span></div></div>' +
        '<div class="memola-cm-item" data-cm="new-db"><span class="memola-cm-ic">🗂</span><div class="memola-cm-body"><span class="memola-cm-name">空のDB</span><span class="memola-cm-sub">リスト＋mdフォルダを作成</span></div></div>' +
        '<div class="memola-cm-sep"></div>' +
        '<div class="memola-cm-section">テンプレートから</div>' +
        '<div class="memola-cm-item" data-cm="tpl-weekly"><span class="memola-cm-ic">📅</span><span class="memola-cm-name">週次ノート</span></div>' +
        '<div class="memola-cm-item" data-cm="tpl-minutes"><span class="memola-cm-ic">📓</span><span class="memola-cm-name">議事録</span></div>' +
        '<div class="memola-cm-item" data-cm="tpl-tasks"><span class="memola-cm-ic">✓</span><span class="memola-cm-name">タスクDB</span></div>' +
      '</div>' +
    '</aside>' +
    '<main id="memola-main">' +
      '<div id="memola-top">' +
        '<button id="memola-sb-toggle" title="サイドバー (Ctrl+\\)">' + ICONS.sidebar + '</button>' +
        '<button id="memola-nav-back" class="memola-nav-btn disabled" title="戻る (Ctrl+[)" disabled>' + ICONS.chevronLeft + '</button>' +
        '<button id="memola-nav-fwd" class="memola-nav-btn disabled" title="進む (Ctrl+])" disabled>' + ICONS.chevronRight + '</button>' +
        '<div id="memola-bc"></div>' +
        '<div id="memola-presence" class="memola-presence" style="display:none"></div>' +
        '<button id="memola-scope-tag" class="memola-scope-tag" style="display:none" title="クリックで個人 ↔ 組織 を切替">' +
          '<span class="memola-scope-tag-ic">🔒</span><span class="memola-scope-tag-label">プライベート</span>' +
        '</button>' +
        '<button id="memola-pub-tag" class="memola-pub-tag" style="display:none" title="公開状態">' +
          '<span class="memola-pub-tag-dot"></span><span class="memola-pub-tag-label">公開中</span>' +
        '</button>' +
        '<div id="memola-pub-pop" class="memola-pub-pop" style="display:none">' +
          '<div class="memola-pub-pop-msg"></div>' +
          '<div class="memola-pub-pop-row">' +
            '<button class="memola-pub-pop-btn primary" data-pub-act="sync">公開ページに同期</button>' +
            '<button class="memola-pub-pop-btn" data-pub-act="open">公開ページを開く</button>' +
            '<button class="memola-pub-pop-btn" data-pub-act="copy">URL をコピー</button>' +
            '<button class="memola-pub-pop-btn danger" data-pub-act="unpublish">公開を解除</button>' +
            '<button class="memola-pub-pop-btn ghost" data-pub-act="close">閉じる</button>' +
          '</div>' +
        '</div>' +
        '<div id="memola-ss"></div>' +
        '<button id="memola-outline-btn" class="memola-tog-btn" title="目次">' + ICONS.sort + '<span>目次</span></button>' +
        '<button id="memola-props-btn" class="memola-tog-btn" title="プロパティ">' + ICONS.info + '<span>プロパティ</span></button>' +
        '<button id="memola-ai-btn" class="memola-tog-btn" title="AIチャット">' + ICONS.sparkle + '<span>AI</span></button>' +
        '<button id="memola-pgm-btn" title="ページメニュー">' + ICONS.more + '</button>' +
      '</div>' +
      '<div id="memola-tb">' +
        '<button class="memola-b" data-cmd="h1" title="見出し1"><b>H1</b></button>' +
        '<button class="memola-b" data-cmd="h2" title="見出し2"><b>H2</b></button>' +
        '<button class="memola-b" data-cmd="h3" title="見出し3"><b>H3</b></button>' +
        '<span class="memola-bs"></span>' +
        '<button class="memola-b" data-cmd="bold" title="太字"><b>B</b></button>' +
        '<button class="memola-b" data-cmd="italic" title="斜体"><i>I</i></button>' +
        '<button class="memola-b" data-cmd="strike" title="取り消し線"><s>S</s></button>' +
        '<button class="memola-b" data-cmd="code" title="インラインコード">' + ICONS.code + '</button>' +
        '<span class="memola-bs"></span>' +
        '<button class="memola-b" data-cmd="ul" title="箇条書き">' + ICONS.ul + '</button>' +
        '<button class="memola-b" data-cmd="ol" title="番号付きリスト">' + ICONS.ol + '</button>' +
        '<button class="memola-b" data-cmd="todo" title="ToDoリスト">' + ICONS.todo + '</button>' +
        '<button class="memola-b" data-cmd="quote" title="引用">' + ICONS.quote + '</button>' +
        '<button class="memola-b" data-cmd="callout" title="コールアウト"><span style="font-size:14px">💡</span></button>' +
        '<button class="memola-b" data-cmd="pre" title="コードブロック">' + ICONS.codeBlock + '</button>' +
        '<span class="memola-bs"></span>' +
        '<button class="memola-b" data-cmd="hr" title="区切り線">' + ICONS.hr + '</button>' +
      '</div>' +
      '<div id="memola-content-row">' +
      '<aside id="memola-outline">' +
        '<div id="memola-outline-hd"><span>目次</span><button class="memola-pane-x" id="memola-outline-x" title="閉じる">' + ICONS.close + '</button></div>' +
        '<div id="memola-outline-list"></div>' +
      '</aside>' +
      '<div id="memola-ea"><div id="memola-ei">' +
        '<div id="memola-em">' +
          '<div class="memola-em-icon">📄</div>' +
          '<h2 class="memola-em-title">はじめてみよう</h2>' +
          '<p class="memola-em-sub">ページを作るか、テンプレートから始められます。</p>' +
          '<div class="memola-em-btns">' +
            '<button class="memola-btn p" id="memola-ne">＋ 空のページ</button>' +
            '<button class="memola-btn s" id="memola-ne-db">▤ DBを作る</button>' +
            '<button class="memola-btn ghost" id="memola-ne-tpl">⎘ テンプレ</button>' +
          '</div>' +
          '<div class="memola-em-chips">' +
            '<button class="memola-chip memola-em-chip" data-tpl="weekly">📅 週次ノート</button>' +
            '<button class="memola-chip memola-em-chip" data-tpl="tasks">✓ タスクDB</button>' +
            '<button class="memola-chip memola-em-chip" data-tpl="minutes">📓 議事録</button>' +
          '</div>' +
        '</div>' +
        '<div id="memola-ct">' +
          '<div id="memola-draft-banner" style="display:none"></div>' +
          '<div id="memola-pg-hd">' +
            '<div id="memola-icon-wrap">' +
              '<span id="memola-pg-icon"></span>' +
              '<button class="memola-pg-icon-empty" id="memola-add-icon">アイコンを追加</button>' +
            '</div>' +
            '<textarea id="memola-ttl" rows="1" placeholder="タイトルなし"></textarea>' +
          '</div>' +
          '<div id="memola-row-props" class="memola-row-props"></div>' +
          '<div id="memola-ed" contenteditable="true" spellcheck="false"></div>' +
          '<div id="memola-backlinks" class="memola-backlinks" style="display:none"></div>' +
        '</div>' +
      '</div></div>' +
      '<div id="memola-dv">' +
        '<div id="memola-dv-inner">' +
          '<div id="memola-dv-hd">' +
            '<div id="memola-dv-icon-wrap">' +
              '<span id="memola-dv-pg-icon"></span>' +
              '<button class="memola-pg-icon-empty" id="memola-dv-add-icon">😊 アイコンを追加</button>' +
            '</div>' +
            '<div id="memola-dv-ttl" contenteditable="true" spellcheck="false"></div>' +
          '</div>' +
          '<div id="memola-db-views">' +
            '<button class="memola-db-vbtn on" id="memola-dbv-table">' + ICONS.table + '<span>テーブル</span></button>' +
            '<button class="memola-db-vbtn" id="memola-dbv-board">' + ICONS.board + '<span>ボード</span></button>' +
            '<button class="memola-db-vbtn" id="memola-dbv-list">' + ICONS.ul + '<span>リスト</span></button>' +
            '<button class="memola-db-vbtn" id="memola-dbv-gallery">' + ICONS.codeBlock + '<span>ギャラリー</span></button>' +
            '<button class="memola-db-vbtn" id="memola-dbv-calendar">' + ICONS.info + '<span>カレンダー</span></button>' +
            '<button class="memola-db-vbtn" id="memola-dbv-gantt">' + ICONS.sort + '<span>ガント</span></button>' +
          '</div>' +
          '<div id="memola-db-tb">' +
            '<button class="memola-db-chip" id="memola-db-filter-btn"><span>＋ フィルター</span></button>' +
            '<button class="memola-db-chip" id="memola-db-sort-btn">' + ICONS.sort + '<span>ソート</span></button>' +
            '<button class="memola-db-chip" id="memola-db-group-btn"><span>⊟</span><span>グループ</span></button>' +
            '<button class="memola-db-new-btn" id="memola-db-new-row">＋ 新規</button>' +
            '<div class="memola-db-tb-spacer"></div>' +
            '<button class="memola-db-chip subtle" id="memola-db-csv-export">' + ICONS.download + '<span>CSV</span></button>' +
            '<button class="memola-db-chip subtle" id="memola-db-csv-import">' + ICONS.copy + '<span>取込</span></button>' +
          '</div>' +
          '<div id="memola-filter-chips"></div>' +
          '<div id="memola-filter-popover"></div>' +
          '<div id="memola-dt-wrap">' +
            '<table id="memola-dt">' +
              '<thead><tr id="memola-dth-row"></tr></thead>' +
              '<tbody id="memola-dtb"></tbody>' +
            '</table>' +
            '<button id="memola-dadd">＋ 新しい行</button>' +
          '</div>' +
          '<div id="memola-kb"></div>' +
          '<div id="memola-list-view" class="memola-altview"></div>' +
          '<div id="memola-gallery-view" class="memola-altview"></div>' +
          '<div id="memola-calendar-view" class="memola-altview"></div>' +
          '<div id="memola-gantt-view" class="memola-altview"></div>' +
        '</div>' +
      '</div>' +
      '<aside id="memola-props">' +
        '<div id="memola-props-hd"><span>プロパティ</span><button class="memola-pane-x" id="memola-props-x" title="閉じる">' + ICONS.close + '</button></div>' +
        '<div id="memola-props-list"></div>' +
      '</aside>' +
      '<aside id="memola-ai-panel">' +
        '<div id="memola-ai-hd">' +
          '<span class="memola-ai-title">' + ICONS.sparkle + '<span>AIチャット</span></span>' +
          '<button id="memola-ai-new" title="新しい会話">' + ICONS.plus + '</button>' +
          '<button id="memola-ai-clear" title="現在の会話を削除">' + ICONS.trash + '</button>' +
          '<button id="memola-ai-close" class="memola-pane-x" title="閉じる">' + ICONS.close + '</button>' +
        '</div>' +
        '<div id="memola-ai-hist-row">' +
          '<select id="memola-ai-hist" title="会話履歴"></select>' +
        '</div>' +
        '<div id="memola-ai-messages"></div>' +
        '<div id="memola-ai-chips"></div>' +
        '<div id="memola-ai-inputarea">' +
          '<select id="memola-ai-model-pick" title="プロバイダ・モデル選択"></select>' +
          '<textarea id="memola-ai-input" placeholder="このページについて聞く…" rows="2"></textarea>' +
          '<button id="memola-ai-send" title="送信 (⌘↵)">' + ICONS.send + '</button>' +
        '</div>' +
      '</aside>' +
      '</div>' + // /content-row
      '<div id="memola-ld"><span>⏳</span><span id="memola-lm"> 読み込み中...</span></div>' +
    '</main>' +
    '<div id="memola-md"><div class="memola-mb">' +
      '<h2>🚀 初期セットアップ</h2>' +
      '<p>ドキュメントライブラリに <code>memola-pages</code> フォルダを作成してよいですか？<br>ページは .md ファイルとしてここに保存されます。</p>' +
      '<div class="memola-ma">' +
        '<button class="memola-btn s" id="memola-mc">キャンセル</button>' +
        '<button class="memola-btn p" id="memola-mk">フォルダを作成</button>' +
      '</div>' +
    '</div></div>' +
    '<div id="memola-col-md"><div class="memola-mb" style="max-width:380px">' +
      '<h2>列を追加</h2>' +
      '<div class="memola-col-row"><label>列名</label><input id="memola-col-name" class="memola-col-inp" type="text" placeholder="例: 担当者"></div>' +
      '<div class="memola-col-row"><label>タイプ</label>' +
        '<div id="memola-col-type-grid">' +
          '<div class="memola-col-type" data-tk="2"  data-ic="Aa"><span class="memola-col-type-ic">Aa</span><span>テキスト</span></div>' +
          '<div class="memola-col-type" data-tk="3"  data-ic="¶"><span class="memola-col-type-ic">¶</span><span>複数行</span></div>' +
          '<div class="memola-col-type" data-tk="9"  data-ic="#"><span class="memola-col-type-ic">#</span><span>数値</span></div>' +
          '<div class="memola-col-type" data-tk="4"  data-ic="📅"><span class="memola-col-type-ic">📅</span><span>日付</span></div>' +
          '<div class="memola-col-type" data-tk="6"  data-ic="◉"><span class="memola-col-type-ic">◉</span><span>セレクト</span></div>' +
          '<div class="memola-col-type" data-tk="15" data-ic="◎"><span class="memola-col-type-ic">◎</span><span>マルチ</span></div>' +
          '<div class="memola-col-type" data-tk="8"  data-ic="☐"><span class="memola-col-type-ic">☐</span><span>チェック</span></div>' +
          '<div class="memola-col-type" data-tk="11" data-ic="🔗"><span class="memola-col-type-ic">🔗</span><span>URL</span></div>' +
          '<div class="memola-col-type" data-tk="20" data-ic="👤"><span class="memola-col-type-ic">👤</span><span>担当者</span></div>' +
          '<div class="memola-col-type" data-tk="7"  data-ic="↔"><span class="memola-col-type-ic">↔</span><span>関係</span></div>' +
          '<div class="memola-col-type" data-tk="17" data-ic="Σ"><span class="memola-col-type-ic">Σ</span><span>ロールアップ</span></div>' +
          '<div class="memola-col-type" data-tk="17" data-ic="ƒ"><span class="memola-col-type-ic">ƒ</span><span>数式</span></div>' +
          '<div class="memola-col-type" data-tk="18" data-ic="📎"><span class="memola-col-type-ic">📎</span><span>ファイル</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="memola-col-row" id="memola-col-choices-row"><label>選択肢（1行1つ）</label><textarea id="memola-col-choices" class="memola-col-choices" placeholder="例:\n進行中\n完了\n未着手"></textarea></div>' +
      '<div class="memola-col-row"><label>SharePointリストの列にマップ</label><input id="memola-col-spmap" class="memola-col-inp" type="text" placeholder="自動推定"></div>' +
      '<div class="memola-ma">' +
        '<button class="memola-btn s" id="memola-col-cancel">キャンセル</button>' +
        '<button class="memola-btn p" id="memola-col-ok">追加</button>' +
      '</div>' +
    '</div></div>' +
    '<div id="memola-ftb">' +
      '<button class="memola-fb" data-cmd="bold" title="太字"><b>B</b></button>' +
      '<button class="memola-fb" data-cmd="italic" title="斜体"><i>I</i></button>' +
      '<button class="memola-fb" data-cmd="strike" title="取り消し線"><s>S</s></button>' +
      '<button class="memola-fb" data-cmd="code" title="インラインコード">' + ICONS.code + '</button>' +
      '<span class="memola-fb-sep"></span>' +
      '<button class="memola-fb" data-cmd="h1" title="見出し1"><b>H1</b></button>' +
      '<button class="memola-fb" data-cmd="h2" title="見出し2"><b>H2</b></button>' +
      '<button class="memola-fb" data-cmd="h3" title="見出し3"><b>H3</b></button>' +
      '<span class="memola-fb-sep"></span>' +
      '<button class="memola-fb" data-cmd="ul" title="箇条書き">' + ICONS.ul + '</button>' +
      '<button class="memola-fb" data-cmd="ol" title="番号付きリスト">' + ICONS.ol + '</button>' +
      '<button class="memola-fb" data-cmd="quote" title="引用">' + ICONS.quote + '</button>' +
    '</div>' +
    '<div id="memola-slash"></div>' +
    '<div id="memola-qs"><div id="memola-qs-box">' +
      '<input id="memola-qs-inp" type="text" placeholder="ページを検索...">' +
      '<div id="memola-qs-res"></div>' +
    '</div></div>' +
    '<div id="memola-emoji"><div id="memola-emoji-grid"></div><button id="memola-emoji-rm">アイコンを削除</button></div>' +
    '<div id="memola-trash-md"><div class="memola-mb" style="max-width:540px">' +
      '<h2>ゴミ箱</h2>' +
      '<div id="memola-trash-list"></div>' +
      '<div class="memola-ma">' +
        '<button class="memola-btn ghost" id="memola-trash-empty" style="color:#b13a3a">🗑 すべて完全削除</button>' +
        '<button class="memola-btn s" id="memola-trash-close">閉じる</button>' +
      '</div>' +
    '</div></div>' +
    '<div id="memola-settings-md"><div class="memola-mb memola-set-mb">' +
      '<h2>⚙ 設定</h2>' +
      '<div class="memola-set-body">' +
        '<nav class="memola-set-nav">' +
          '<button class="memola-set-tab on" data-tab="ai">🤖 AI プロバイダ</button>' +
          '<button class="memola-set-tab" data-tab="save">💾 保存と同期</button>' +
          '<button class="memola-set-tab" data-tab="display">🎨 表示</button>' +
          '<button class="memola-set-tab" data-tab="help">⌨ ヘルプ</button>' +
          '<button class="memola-set-tab" data-tab="debug">⚠ リセット</button>' +
        '</nav>' +
        '<div class="memola-set-panes">' +
          // AI pane
          '<div class="memola-set-pane on" data-pane="ai">' +
            '<div class="memola-set-row"><label>使用するサービス</label>' +
              '<select id="memola-set-provider">' +
                '<option value="claude">Anthropic Claude</option>' +
                '<option value="corp">Azure OpenAI 互換 API</option>' +
                '<option value="local">ローカル AI (Ollama / LM Studio 等)</option>' +
              '</select>' +
            '</div>' +
            '<div class="memola-set-row" data-prov="claude"><label>Claude モデル</label>' +
              '<select id="memola-set-claude-model"></select>' +
            '</div>' +
            '<div class="memola-set-row" data-prov="claude"><label>Claude API キー</label>' +
              '<input id="memola-set-aikey" type="password" placeholder="sk-ant-...">' +
            '</div>' +
            '<div class="memola-set-row" data-prov="corp"><label>Azure OpenAI 互換 モデル</label>' +
              '<select id="memola-set-corpai-model"></select>' +
            '</div>' +
            '<div class="memola-set-row" data-prov="corp"><label>API キー</label>' +
              '<input id="memola-set-corpai-key" type="password" placeholder="api-key (Azure OpenAI のキー / ゲートウェイのサブスクリプションキー)">' +
            '</div>' +
            '<div class="memola-set-row" data-prov="corp"><label>ベース URL</label>' +
              '<input id="memola-set-corpai-baseurl" type="text" placeholder="https://&lt;resource&gt;.openai.azure.com">' +
            '</div>' +
            '<div class="memola-set-row" data-prov="corp"><label>デプロイ ID プレフィックス</label>' +
              '<input id="memola-set-corpai-prefix" type="text" placeholder="(任意 — モデル名と同じデプロイ名なら空欄でOK)">' +
            '</div>' +
            '<div class="memola-set-row" data-prov="corp"><label>モデル別オーバーライド (任意 / JSON)</label>' +
              '<textarea id="memola-set-corpai-overrides" rows="6" placeholder=\'{"gpt-5":{"baseUrl":"https://...","apiVersion":"2025-01-01-preview","deploymentId":"..."}}\' style="font-family:var(--font-mono);font-size:11px"></textarea>' +
            '</div>' +
            '<div class="memola-set-row" data-prov="corp"><label></label>' +
              '<div class="memola-set-hint">' +
              '<b>対応サービス</b>: Azure OpenAI Service、Azure API Management 経由のラッパー、社内 API ゲートウェイ等。' +
              '<br><b>URL の組み立て方</b>: <code>{ベース URL}/openai/deployments/{デプロイ ID}/chat/completions?api-version={api-version}</code>' +
              '<br>※ ベース URL の例 — Azure 本家: <code>https://&lt;resource&gt;.openai.azure.com</code>、ゲートウェイ: <code>https://gateway.example.com/myapi/2024-10-21</code>' +
              '<br>※ デプロイ ID は <code>{プレフィックス}{モデル名(.は削除)}</code> で組み立て (Azure 本家でデプロイ名 = モデル名にしている場合はプレフィックス空欄でOK)' +
              '<br>※ api-version デフォルト — 推論系 (GPT-5/o3/o4-mini): <code>2024-12-01-preview</code>、それ以外: <code>2024-06-01</code>' +
              '<br>—' +
              '<br>モデル別に違う設定 (別エンドポイントなど) が必要な場合はオーバーライドに <code>{"モデル名":{"baseUrl":"...","apiVersion":"...","deploymentId":"..."}}</code> を記入。各フィールドは任意・未指定で全体設定にフォールバック。' +
              '<br>ページ/DB 操作のツール機能 (Function Calling) も利用可能。' +
              '</div>' +
            '</div>' +
            '<div class="memola-set-row" data-prov="local"><label>ベース URL</label>' +
              '<input id="memola-set-localai-baseurl" type="text" placeholder="http://localhost:11434/v1 (Ollama) / http://localhost:1234/v1 (LM Studio)">' +
            '</div>' +
            '<div class="memola-set-row" data-prov="local"><label>API キー (任意)</label>' +
              '<input id="memola-set-localai-key" type="password" placeholder="ローカルサーバ側で要求する場合のみ">' +
            '</div>' +
            '<div class="memola-set-row" data-prov="local"><label>使用するモデル</label>' +
              '<input id="memola-set-localai-model" type="text" placeholder="例: llama3.1, qwen2.5-coder, mistral-small">' +
            '</div>' +
            '<div class="memola-set-row" data-prov="local"><label>モデル候補 (任意 / 1行1モデル)</label>' +
              '<textarea id="memola-set-localai-models" rows="4" placeholder="llama3.1\nqwen2.5-coder\ngemma3:4b\nmistral-small" style="font-family:var(--font-mono);font-size:11px"></textarea>' +
            '</div>' +
            '<div class="memola-set-row" data-prov="local"><label>推論モデル (任意)</label>' +
              '<input id="memola-set-localai-reasoning" type="text" placeholder="名前の一部を空白区切り (例: o1 deepseek-r1 qwq) ─ 一致するモデルは max_completion_tokens を使う">' +
            '</div>' +
            '<div class="memola-set-row" data-prov="local"><label></label>' +
              '<div class="memola-set-hint">' +
              '<b>対応サーバ</b>: Ollama、LM Studio、llama.cpp server、vLLM、その他 OpenAI Chat Completions 互換のもの。' +
              '<br><b>セットアップ例 (Ollama)</b>: <code>ollama serve</code> 起動後、ベース URL に <code>http://localhost:11434/v1</code>、モデルに <code>llama3.1</code> 等を指定。' +
              '<br><b>セットアップ例 (LM Studio)</b>: 「Local Server」タブで Start。ベース URL <code>http://localhost:1234/v1</code>、モデルに UI のモデル名をコピー。' +
              '<br><b>URL 形式</b>: <code>{ベース URL}/chat/completions</code>。<code>/v1</code> まで含めるのが一般的。' +
              '<br>※ ブックマークレットを開いている SP サイト (https) からローカル (http) の <code>localhost</code> を叩けるかはブラウザのセキュリティ設定次第。叩けない場合は中継スクリプト (scripts/corp-ai-relay.py 改) 経由で同オリジンに見せかけるか、ローカル AI サーバを HTTPS 化してください。' +
              '<br>※ Function Calling (ツール経由のページ/DB 操作) は OpenAI 互換 tools パラメータを実装したサーバ (Ollama 0.3+ 等) のみ動作。' +
              '</div>' +
            '</div>' +
          '</div>' +
          // Save / sync / presence pane
          '<div class="memola-set-pane" data-pane="save">' +
            '<div class="memola-set-row"><label>自動保存</label>' +
              '<select id="memola-set-savedelay">' +
                '<option value="0">手動のみ (Ctrl/⌘+S)</option>' +
                '<option value="1000">1 秒後</option>' +
                '<option value="2000" selected>2 秒後 (既定)</option>' +
                '<option value="5000">5 秒後</option>' +
                '<option value="10000">10 秒後</option>' +
                '<option value="30000">30 秒後</option>' +
              '</select>' +
            '</div>' +
            '<div class="memola-set-row"><label>同期チェック</label>' +
              '<select id="memola-set-syncpoll">' +
                '<option value="0">オフ (1 人運用)</option>' +
                '<option value="30000" selected>30 秒ごと (既定)</option>' +
                '<option value="60000">1 分ごと</option>' +
                '<option value="300000">5 分ごと</option>' +
              '</select>' +
            '</div>' +
            '<div class="memola-set-row"><label>プレゼンス表示</label>' +
              '<select id="memola-set-presence">' +
                '<option value="1" selected>ON (アバターを共有/表示)</option>' +
                '<option value="0">OFF (SP に書き込まない)</option>' +
              '</select>' +
            '</div>' +
            '<div class="memola-set-row"><label></label>' +
              '<div class="memola-set-hint">' +
              '<b>自動保存</b>: 「手動のみ」にすると編集中の自動 SP 書き込みが止まり、Ctrl/⌘+S でだけ保存されます。SP 負荷の最小化やバッテリー節約に。' +
              '<br><b>同期チェック</b>: 開いているページが他タブ/他ユーザに更新されたかをポーリング検知します。1 人運用なら「オフ」で誤通知ゼロ + SP 読み取りゼロ。' +
              '<br><b>プレゼンス</b>: 同じページを見ているユーザのアバターを表示するため、定期的に SP に存在を書き込みます。OFF でこの書き込みを止められます。' +
              '</div>' +
            '</div>' +
          '</div>' +
          // Display pane
          '<div class="memola-set-pane" data-pane="display">' +
            '<div class="memola-set-row"><label>表示密度</label><select id="memola-set-density"><option value="compact">コンパクト</option><option value="regular" selected>標準</option><option value="comfy">ゆったり</option></select></div>' +
            '<div class="memola-set-row"><label>テーマ</label><select id="memola-set-theme"><option value="light" selected>ライト</option><option value="dark">ダーク</option></select></div>' +
          '</div>' +
          // Help pane
          '<div class="memola-set-pane" data-pane="help">' +
            '<div class="memola-set-row"><label>キーボードショートカット</label>' +
              '<button class="memola-btn s" id="memola-set-shortcuts">⌨ 一覧を表示</button>' +
            '</div>' +
            '<div class="memola-set-row"><label></label>' +
              '<div class="memola-set-hint">' +
              '主要ショートカットは <code>?</code> キー (エディタ外) でも一覧が開きます。' +
              '</div>' +
            '</div>' +
          '</div>' +
          // Debug / reset pane — destructive ops, all unrecoverable
          '<div class="memola-set-pane" data-pane="debug">' +
            '<div class="memola-set-row"><label></label>' +
              '<div class="memola-set-hint" style="background:rgba(235,87,87,.10);border-left-color:rgba(235,87,87,.55);color:var(--ink)">' +
              '<b>⚠ 危険な操作</b><br>' +
              '以下のリセット操作はすべて<b>取り消し不可</b>です。SP のごみ箱からも復元できません。<br>' +
              '実行前に必要なデータが他にバックアップされていることを確認してください。' +
              '</div>' +
            '</div>' +
            '<div class="memola-set-row"><label>1. 自分のプライベートのみ削除</label>' +
              '<button class="memola-btn s" id="memola-set-reset-mine">削除を実行</button>' +
              '<div class="memola-set-hint">' +
              '<b>削除対象</b>: 自分が作成した「🔒 プライベート」のページ・DB のみ<br>' +
              '<b>残るもの</b>: 組織共通 / 他のユーザのページ・DB / localStorage の設定 (API キー・テーマ等)' +
              '</div>' +
            '</div>' +
            '<div class="memola-set-row"><label>2. 組織+他人のデータのみ削除</label>' +
              '<button class="memola-btn s" id="memola-set-reset-others">削除を実行</button>' +
              '<div class="memola-set-hint">' +
              '<b>削除対象</b>: 組織共通 + 他のユーザのページ・DB<br>' +
              '<b>残るもの</b>: 自分のプライベートデータ / localStorage の設定' +
              '</div>' +
            '</div>' +
            '<div class="memola-set-row"><label>3. 全データ + 設定を初期化</label>' +
              '<button class="memola-btn p" id="memola-set-reset-all" style="background:#c44;border-color:#c44">⚠ 完全リセット</button>' +
              '<div class="memola-set-hint">' +
              '<b>削除対象</b>: memola-* で始まる全 SP リスト + memola. で始まる全 localStorage キー<br>' +
              '実行後はインストール直後の状態に戻ります。SP ページを 1 度リロードしてください。' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="memola-ma">' +
        '<button class="memola-btn s" id="memola-set-cancel">キャンセル</button>' +
        '<button class="memola-btn p" id="memola-set-save">保存</button>' +
      '</div>' +
    '</div></div>' +
    '<div id="memola-pgm">' +
      '<div class="memola-pgm-item" data-action="export-md">' + ICONS.download + '<span>Markdownでエクスポート</span></div>' +
      '<div class="memola-pgm-item" data-action="export-html">' + ICONS.download + '<span>HTMLでエクスポート</span></div>' +
      '<div class="memola-pgm-sep"></div>' +
      '<div class="memola-pgm-item" data-action="duplicate">' + ICONS.copy + '<span>複製</span></div>' +
      '<div class="memola-pgm-item" data-action="duplicate-as-draft">✏️<span>下書きとして複製</span></div>' +
      '<div class="memola-pgm-item" data-action="version-history">📜<span>バージョン履歴</span></div>' +
      '<div class="memola-pgm-item" data-action="copy-link">' + ICONS.link + '<span>リンクをコピー</span></div>' +
      '<div class="memola-pgm-item" data-action="toggle-scope"><span class="memola-pgm-scope-ic">🔒</span><span class="memola-pgm-scope-label">組織に公開</span></div>' +
      '<div class="memola-pgm-item" data-action="publish">' + ICONS.link + '<span class="memola-pgm-publish-label">Web 公開</span></div>' +
      '<div class="memola-pgm-item" data-action="copy-pub-url" style="display:none">' + ICONS.copy + '<span>公開 URL をコピー</span></div>' +
      '<div class="memola-pgm-item" data-action="restore-daily" style="display:none">📅<span>デイリーノートに戻す</span></div>' +
      '<div class="memola-pgm-sep"></div>' +
      '<div class="memola-pgm-item" data-action="print">' + ICONS.print + '<span>印刷</span></div>' +
      '<div class="memola-pgm-item" data-action="info">' + ICONS.info + '<span>ページ情報</span></div>' +
      '<div class="memola-pgm-item" data-action="focus">' + ICONS.sidebar + '<span>集中モード切替</span></div>' +
      '<div class="memola-pgm-sep"></div>' +
      '<div class="memola-pgm-item danger" data-action="delete">' + ICONS.trash + '<span>削除</span></div>' +
    '</div>' +
    '<div id="memola-tk"></div>'
  );
}
