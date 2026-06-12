// 使い方ヘルプ。トップバーの「?」ボタンから開く読み取り専用モーダル。

interface HelpSection { title: string; items: string[] }

const SECTIONS: HelpSection[] = [
  {
    title: '🚀 基本',
    items: [
      'サイドバー「＋ 新規」でページ/DBを作成。ページは階層(親子)で整理できる。',
      'タブで複数ページを並行して開ける。ページを開くたびにタブが増える。',
      '<b>Ctrl/⌘+K</b> でクイック検索。タイトルに加え、本文・DB行も<b>全文検索</b>(SharePoint Search)できる。',
      '右上の <b>↻ 更新</b> で一覧と表示中ページを再取得＋新バージョン確認。',
      '右上のアイコンは現在ログイン中のユーザー(AD画像)。',
    ],
  },
  {
    title: '✍️ ページ編集',
    items: [
      '行頭で <b>/</b> を打つとブロックメニュー(見出し/リスト/ToDo/表/画像/引用/コールアウト等)。',
      '箇条書き: <b>Tab</b> でネスト、<b>Shift+Tab</b>/空行で<b>Backspace</b>/<b>Enter</b> で1段戻る(最外でEnter→通常段落)。',
      '画像はコピペで貼り付け、隅ドラッグでリサイズ、Backspaceで削除。',
      'Excelのセル範囲をコピー→本文に貼り付けると<b>表</b>になる。',
      '[[ でページリンク。リンク先には「リンク元(バックリンク)」が表示される。',
    ],
  },
  {
    title: '🗂 データベース(DB)',
    items: [
      'DBの列「＋」から列を追加: テキスト/数値/日付/選択肢/チェック/数式/参照/<b>リレーション</b>/<b>ロールアップ</b>。',
      '<b>リレーション(🔗)</b>: 他DBの行へのリンク。クリックで相手行を開く。アクセント色の列で表示。',
      '<b>ロールアップ(Σ)</b>: 関連する子DBの行をまとめた集計(件数/合計/平均/最小/最大/連結)を親に表示。',
      '<b>数式(ƒ)</b>: 同じ行の他列から計算。<b>参照(↗ XLOOKUP)</b>: 相手DBから値を引く。',
      'ビュー: テーブル/ボード/カレンダー/リスト/ギャラリー/ガント。「ビュー追加」で切替・複数登録。',
      'ビューごとにフィルタ・条件付きの色分け・行の色を設定できる。',
      'ツールバー右の <b>⇔ 全幅</b> で横いっぱい表示、<b>↵ 全文</b> でセルを折り返して全文表示(独立切替)。',
      'CSV の取込/書出、列幅はドラッグで変更(端末ごとに記憶)。',
    ],
  },
  {
    title: '🔗 リレーション/ロールアップの作り方',
    items: [
      '考え方: 子DBに「親の名前(タイトル)」を入れる列を1つ用意し、それで親子を結ぶ。',
      '例) 顧客DB と 請求DB。請求に「顧客」列(顧客名)を作る。',
      '請求側: 「顧客」列を<b>リレーション</b>にすると、クリックで顧客の行へ飛べる。',
      '顧客側: <b>ロールアップ</b>で「請求合計(sum)」「未収件数(count)」等を自動表示。',
    ],
  },
  {
    title: '🤖 AI',
    items: [
      '<b>横断チャット</b>(サイドバー)で全文書をまたいで質問(RAG)。先に「文書を読み込み」でベクトル化。',
      'AIに<b>「請求管理を作って」</b>等と頼むと、複数DB＋リレーション＋ロールアップ＋ビューを設計→<b>プレビュー確認</b>→一括生成。',
      '既存DBにも「顧客列を顧客DBへのリレーションに」「請求合計のロールアップを足して」と頼める。',
      'AIプロバイダ(Claude等)とキーは 設定→AIプロバイダ で各自設定(キーはブラウザに保存)。',
    ],
  },
  {
    title: '📅 その他の機能',
    items: [
      '<b>デイリーノート</b>: サイドバーの「今日のノート」。日付ごとのページ。',
      '<b>テンプレート</b>: ページ/DBをテンプレ登録し「＋新規→テンプレートから」で再利用。',
      '<b>コメント</b>: ページ/DB行にコメント。<b>受信トレイ</b>でメンション確認。',
      '<b>公開</b>: ページを公開ページとして共有(上部の公開タグ)。',
      '<b>ゴミ箱</b>から削除ページを復元。<b>操作ログ</b>(設定→操作ログ)で変更履歴を確認。',
    ],
  },
  {
    title: '⌨️ 便利',
    items: [
      'ショートカット一覧は <b>?</b> キー(エディタ外)または 設定→ヘルプ から。',
      '不具合報告時は 設定→ヘルプ の<b>ビルドID</b>を添えると確認しやすい。',
    ],
  },
];

export function openHelpModal(): void {
  const overlay = document.getElementById('memola-overlay') || document.body;
  document.getElementById('memola-help-md')?.remove();
  const md = document.createElement('div');
  md.id = 'memola-help-md';
  md.className = 'memola-help-md';
  const body = SECTIONS.map((s) =>
    '<section class="memola-help-sec">' +
      '<h3>' + s.title + '</h3>' +
      '<ul>' + s.items.map((i) => '<li>' + i + '</li>').join('') + '</ul>' +
    '</section>',
  ).join('');
  md.innerHTML =
    '<div class="memola-help-card">' +
      '<div class="memola-help-hd"><h2>📖 Memola の使い方</h2>' +
        '<button class="memola-help-x" id="memola-help-close" title="閉じる">✕</button></div>' +
      '<div class="memola-help-body">' + body + '</div>' +
    '</div>';
  overlay.appendChild(md);
  const close = (): void => md.remove();
  md.querySelector('#memola-help-close')?.addEventListener('click', close);
  md.addEventListener('mousedown', (e) => { if (e.target === md) close(); });
  const onEsc = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') { e.stopPropagation(); close(); document.removeEventListener('keydown', onEsc, true); }
  };
  document.addEventListener('keydown', onEsc, true);
}
