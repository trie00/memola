# Memola 補助スクリプト

## `corp-ai-relay.ps1` — 社用 AI ゲートウェイ / OpenAI 互換 用ローカル中継 (Pure PowerShell)

ブラウザの `fetch()` は環境変数 `HTTP_PROXY` を読まず、Fetch API にもプロキシを
per-request 指定する手段がないため、bookmarklet (Memola) から社用 AI ゲートウェイ /
Azure OpenAI 互換エンドポイントをオンプレプロキシ経由で直接呼べない。

このスクリプトは PC 上で **`localhost:18080` を待ち受ける小さな HTTP リレー** として
動き、ブラウザからのリクエストをオンプレプロキシ経由で本物のゲートウェイへ転送する
(チャット補完 + 埋め込みの両方)。**Pure PowerShell**(追加インストール不要)で、
Python は不要になりました。

```
Memola (browser) ── fetch ─> http://localhost:18080 ──(HTTPS via onprem proxy)─> gateway
```

### 必要なもの
- Windows + PowerShell 5.1 以上（標準搭載）。**追加インストール不要**。

### セットアップ
```
copy memola.env.example memola.env   :: 一度だけ
notepad memola.env                          :: 値を編集
```
`memola.env`（秘密情報）は `.gitignore` 済み。

設定キー（`memola.env` または環境変数）:
- `CORP_AI_TARGET` … ゲートウェイ / Azure OpenAI のベース URL
- `CORP_AI_PROXY`  … オンプレプロキシ URL（不要なら空）
- `CORP_AI_PORT`   … ローカル listen ポート（既定 18080。Memola 設定の「ベース URL」と一致させる）
- `CORP_AI_SKIP_CERT_CHECK` … 検証用に自己署名証明書を許容（`1` で有効、本番禁止）

### 起動（ワンクリック）
- ダブルクリック: **`memola-start.bat`**
  - 中身は `memola-start.ps1`。外部ベクトル / 別アプリ の launcher と同じく
    **①リレー起動 → ②`/memola/health` 待機 → ③SharePoint をブラウザで開く →
    ④ブックマークレット案内ダイアログ** を 1 アクションで実行。
  - サイト URL は `memola.env` の `MEMOLA_SITE_URL`（未設定なら起動時に入力）。
- タスクスケジューラの「ログオン時」トリガで自動起動も可。
- **リレーだけ**起動したい場合は **`corp-ai-relay.bat`**（= `corp-ai-relay.ps1`）。

### AI 設定は env に集約（外部ベクトル 流・API キーだけ各自入力）
モデル / デプロイ / 埋め込み等の AI 設定は `memola.env` に書けば、リレーが
`GET /memola/ai-config` で配信し、ブラウザが起動時に取得して自動反映する。
各メンバーは **API キーだけ** をブラウザ「設定 → AI」で入力すれば、残りは全員
env で統一される（キーは env / git に絶対に書かない）。詳細は `memola.env.example`。

- リレー用: `CORP_AI_TARGET` / `CORP_AI_PROXY` / `CORP_AI_PORT`
- AI 設定: `MEMOLA_AI_PROVIDER` / `MEMOLA_AI_CORP_MODEL` / `MEMOLA_EMBED_PROVIDER` /
  `MEMOLA_VOYAGE_MODEL` / `MEMOLA_RAG_TOPK` … ほか（`memola.env.example` 参照）
- `corpBaseUrl` は未指定ならリレー自身（`http://localhost:<CORP_AI_PORT>`）を自動指定

### 文字コードについて
- `corp-ai-relay.ps1` / `memola-start.ps1` は **UTF-8 with BOM** で保存（Windows
  PowerShell 5.1 が日本語を正しく読むため。BOM 無しだと CP932 と誤判定して文字化け）。
- `corp-ai-relay.bat` は **ASCII のみ**（cmd.exe は .bat を ANSI コードページで解釈する
  ため。日本語メッセージは全て .ps1 側に置く）。
