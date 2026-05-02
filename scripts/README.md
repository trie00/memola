# n365 補助スクリプト

## `corp-ai-relay.py` — 社用 AI ゲートウェイ用ローカル中継

ブラウザの `fetch()` は環境変数 `HTTP_PROXY` を読まず、Fetch API にも
プロキシを per-request 指定する手段がないため、bookmarklet (n365) から
社用 AI ゲートウェイをオンプレプロキシ経由で直接呼ぶことができない。

このスクリプトは PC 上で **`localhost:18080` を待ち受ける小さな HTTP リレー**
として動き、ブラウザからのリクエストをオンプレプロキシ経由で本物の
ゲートウェイに転送する。ブラウザは常に localhost には到達できる
(プロキシ判定はループバックを除外する) ので、CORS とプロキシの問題を
両方一気に解決できる。

```
n365 (browser)  ─── fetch ───>  http://localhost:18080  ─┐
                                                          │
                                  +--- requests + proxies +
                                  ▼
                       (HTTPS via オンプレプロキシ)
                                  │
                                  ▼
                    https://gateway.example.com/myapi
```

### 必要なもの

- Python 3.8 以上
- `requests` ライブラリ — `pip install requests`

### 使い方

#### 1) 環境変数を設定

##### `CORP_AI_TARGET` の値とは

ゲートウェイの **ベース URL**。本物の chat-completions URL から
`/{api-version}/openai/deployments/...` 以降を取り除いた部分。

```
https://<host>/<path>/{api-version}/openai/deployments/<deploy>/chat/completions
└──────── これが CORP_AI_TARGET ──────┘
```

例: 実 URL が `https://gateway.example.com/customapi/2024-06-01/...` なら:
```
CORP_AI_TARGET=https://gateway.example.com/customapi
```

##### `CORP_AI_PROXY` の値とは

オンプレプロキシのアドレス。`http://<host>:<port>` 形式。
社内ネットワーク資料や IT 部門から取得。
認証付きの場合は `http://user:pass@host:port` も可。

##### 設定方法

シェル (macOS / Linux):

```sh
export CORP_AI_TARGET="https://gateway.example.com/customapi"
export CORP_AI_PROXY="http://onprem-proxy.example.com:8080"
```

Windows (cmd):

```cmd
set CORP_AI_TARGET=https://gateway.example.com/customapi
set CORP_AI_PROXY=http://onprem-proxy.example.com:8080
```

Windows (PowerShell):

```powershell
$env:CORP_AI_TARGET = 'https://gateway.example.com/customapi'
$env:CORP_AI_PROXY  = 'http://onprem-proxy.example.com:8080'
```

`CORP_AI_PORT` (既定 18080) も必要なら設定可。

#### 2) リレーを起動

```sh
python3 scripts/corp-ai-relay.py
```

Windows なら `scripts/corp-ai-relay.bat` または `corp-ai-relay.ps1` を
ダブルクリックでも可 (中身を編集して使う)。

起動すると以下のような表示が出る:

```
────────────────────────────────────────────────────────────────
  listen  : http://127.0.0.1:18080
  target  : https://gateway.example.com/customapi
  proxy   : http://onprem-proxy.example.com:8080
────────────────────────────────────────────────────────────────
n365 の設定モーダルに「ベース URL」を入力 (どちらでも可):
  A: http://localhost:18080
  B: http://localhost:18080/customapi    (実 URL のパスを保ったまま localhost に
                                           置き換える形 — 視認性◎)
────────────────────────────────────────────────────────────────
Ctrl+C で終了
```

#### 3) n365 の設定モーダルに入力

1. n365 を起動 → 設定 (⚙)
2. **プロバイダ**: `企業AI API`
3. **ベース URL**: 上記 A / B のどちらか (リレーが自動でパスを揃えるので
   どちらでも動作)
4. **デプロイ ID プレフィックス**: 組織の規約に合わせて
5. **企業AI API キー**: サブスクリプションキー
6. 保存

これで AI チャットからの送信時に通信が
`localhost:18080 → リレー → オンプレプロキシ → ゲートウェイ`
の経路で流れる。

### 引数 (環境変数より優先)

```
--target  URL    ゲートウェイの base URL
--proxy   URL    オンプレプロキシ URL
--port    NUM    待ち受けポート (既定 18080)
--no-proxy       プロキシ無しで直接転送 (検証用)
```

例:

```sh
python3 scripts/corp-ai-relay.py \
  --target https://gateway.example.com/customapi \
  --proxy http://onprem-proxy:8080 \
  --port 18080
```

### 動作確認

別タブで:

```sh
curl http://localhost:18080/    # ゲートウェイのルートにフォワード
```

あるいは n365 を起動して AI パネルで何か質問。バッジが
「企業AI · gpt-4.1-mini」に変わっていれば設定 OK。

### 自動起動 (任意)

毎回手動で起動するのが面倒な場合:

#### macOS / Linux
`launchd` (.plist) または `cron @reboot` でラップする。

#### Windows
タスクスケジューラで「**ユーザーがログオンしたとき**」のトリガを作り、
`corp-ai-relay.bat` (または `.ps1`) を実行するアクションを登録。

「最小化で実行」「ユーザーが対話操作中のみ実行」設定推奨。

### トラブルシューティング

| 症状 | 原因 / 対処 |
|---|---|
| `requests` が見つからない | `pip install requests` |
| 起動時に `[Errno 48] Address already in use` | ポート競合 — `--port 19090` などで変える |
| `proxy_error` を返す | `CORP_AI_PROXY` の URL/ポート確認、社内ネットワークに接続しているか確認 |
| `403` が返る | プロキシまでは届いてる。ゲートウェイの IP 許可 (WARP/VPN) を確認 |
| `401` が返る | API キー (`api-key` ヘッダ) が誤り。設定モーダルで再入力 |
| AI パネルで `failed to fetch` | リレーが起動していない or 別のポート — 端末で `curl http://localhost:18080/` を確認 |

### セキュリティ上の注意

- リレーは **127.0.0.1 (localhost) のみ**で待ち受け、外部からはアクセス不可。
- API キーはブラウザから `api-key` ヘッダで送られ、リレーはそのまま
  ゲートウェイに転送するだけ (リレーには保存されない)。
- 起動中は **ローカルの任意のプロセス**がリレー経由でゲートウェイを
  叩けるので、共有 PC では使い終わったら停止 (Ctrl+C) する。
