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
copy corp-ai-relay.env.example corp-ai-relay.env   :: 一度だけ
notepad corp-ai-relay.env                          :: 値を編集
```
`corp-ai-relay.env`（秘密情報）は `.gitignore` 済み。

設定キー（`corp-ai-relay.env` または環境変数）:
- `CORP_AI_TARGET` … ゲートウェイ / Azure OpenAI のベース URL
- `CORP_AI_PROXY`  … オンプレプロキシ URL（不要なら空）
- `CORP_AI_PORT`   … ローカル listen ポート（既定 18080。Memola 設定の「ベース URL」と一致させる）
- `CORP_AI_SKIP_CERT_CHECK` … 検証用に自己署名証明書を許容（`1` で有効、本番禁止）

### 起動
- ダブルクリック: **`corp-ai-relay.bat`**（`-ExecutionPolicy Bypass` で .ps1 を起動）
- タスクスケジューラの「ログオン時」トリガで自動起動も可

### Memola 側の設定
設定モーダル → AI 設定で:
- プロバイダ: OpenAI 互換 / 企業AI
- ベース URL: `http://localhost:18080`
- デプロイ ID / api-version / キー: 組織の規約に合わせる

### 文字コードについて
- `corp-ai-relay.ps1` は **UTF-8 with BOM** で保存（Windows PowerShell 5.1 が日本語を
  正しく読むため。BOM 無しだと CP932 と誤判定して文字化けする）。
- `corp-ai-relay.bat` は **ASCII のみ**（cmd.exe は .bat を ANSI コードページで解釈する
  ため。日本語メッセージは全て .ps1 側に置く）。
