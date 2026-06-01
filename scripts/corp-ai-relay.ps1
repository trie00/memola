# ============================================================================
# Memola AI relay  (Pure PowerShell, no Python)
# ============================================================================
#
# ブラウザ (Memola bookmarklet) から社内 AI ゲートウェイ / Azure OpenAI 互換
# エンドポイントを、オンプレ プロキシ経由で呼び出すための、ローカルで動く
# 小さな HTTP リレー。別アプリ の app-ai-relay.ps1 から AI 中継部分のみを
# 流用（Outlook COM 操作は Memola では不要なので除外）。
#
# なぜ必要か
# ----------
# ブラウザの fetch() は環境変数 HTTP_PROXY / HTTPS_PROXY を読まないし、
# Fetch API の仕様でプロキシを per-request で指定する方法もない。よって
# bookmarklet から「社内 AI ゲートウェイには必ず社内プロキシ経由で行く」
# というルーティングを直接表現できない。
#
#   Memola (browser) --HTTP--> http://127.0.0.1:18080 --HTTPS via proxy--> gateway
#
# ブラウザは loopback には到達できる (プロキシ判定はループバックを除外)。
# PS 側は HttpClient で proxy を指定できる。
#
# 使い方
# ------
#   PS> Copy-Item memola.env.example memola.env
#   PS> notepad memola.env       # 値を編集
#   PS> .\corp-ai-relay.ps1
#
#   # または引数で個別に上書き:
#   PS> .\corp-ai-relay.ps1 -Target 'https://...' -Proxy 'http://...:8080'
#
# 設定の優先順位:
#   1. コマンドライン引数 (-Target / -Proxy / -Port)
#   2. プロセス環境変数 (CORP_AI_TARGET 等)
#   3. memola.env ファイル (同じフォルダ)
#   4. デフォルト値 (port = 18080)
#
# 埋め込み呼び出し例 (Memola runtime / PoC からはこの localhost を叩く):
#   POST http://localhost:18080/openai/deployments/text-embedding-3-small/embeddings?api-version=2024-02-01
#   ヘッダ: api-key: <サブスクリプションキー>
#
# 必要環境: Windows PowerShell 5.1 以上 / PowerShell 7+。Python 不要。
# 注: HttpListener が 127.0.0.1 で listen するので管理者権限は不要。
# ============================================================================

[CmdletBinding()]
param(
    [string]$Target,
    [string]$Proxy,
    [int]$Port,
    [switch]$NoProxy,
    # 社内ゲートウェイが自己署名証明書の場合 (要セキュリティ承認)
    [switch]$SkipCertCheck,
    # 環境設定ファイルのパス (既定: スクリプトと同じフォルダの memola.env)
    [string]$EnvFile,
    # 開発者モードでローカル配信するバンドルの dist フォルダ (既定: ../dist)
    [string]$BundleDir
)

$ErrorActionPreference = 'Stop'

# 開発者モードのローカル配信フォルダ (memola.bundle.js / version.txt をここから配る)。
$script:BundleDir = if ($BundleDir) { $BundleDir }
    elseif ($env:MEMOLA_BUNDLE_DIR) { $env:MEMOLA_BUNDLE_DIR }
    else { Join-Path $PSScriptRoot '..\dist' }

# ─── Load .env file ─────────────────────────────────────────────────────────
# 同じフォルダの `memola.env` を読み、まだ設定されていない
# `$env:CORP_AI_*` だけセットする。引数 / 既存 env を優先 (上書きしない)。
# `.env` 書式は KEY=VALUE。`#` 始まりと空行は無視。前後クォートは剥がす。

function Import-EnvFile {
    param([string]$Path)
    if (-not (Test-Path -LiteralPath $Path)) { return $false }
    try {
        $lines = Get-Content -LiteralPath $Path -Encoding UTF8 -ErrorAction Stop
    } catch {
        Write-Warning ".env ファイルを読めませんでした: $Path ($($_.Exception.Message))"
        return $false
    }
    foreach ($raw in $lines) {
        $line = $raw.Trim()
        if (-not $line) { continue }
        if ($line.StartsWith('#')) { continue }
        $eq = $line.IndexOf('=')
        if ($eq -lt 1) { continue }
        $key = $line.Substring(0, $eq).Trim()
        $val = $line.Substring($eq + 1).Trim()
        if ($val -notmatch '^["'']') {
            $hashIdx = $val.IndexOf(' #')
            if ($hashIdx -ge 0) { $val = $val.Substring(0, $hashIdx).TrimEnd() }
        }
        if (($val.StartsWith('"') -and $val.EndsWith('"')) -or
            ($val.StartsWith("'") -and $val.EndsWith("'"))) {
            $val = $val.Substring(1, $val.Length - 2)
        }
        if (-not [Environment]::GetEnvironmentVariable($key)) {
            [Environment]::SetEnvironmentVariable($key, $val)
        }
    }
    return $true
}

if (-not $EnvFile) {
    $EnvFile = Join-Path $PSScriptRoot 'memola.env'
}
$loaded = Import-EnvFile -Path $EnvFile
if ($loaded) {
    Write-Host "[config] loaded: $EnvFile" -ForegroundColor DarkGray
}

# 引数 → 環境変数 → デフォルト の順で確定
if (-not $Target) { $Target = $env:CORP_AI_TARGET }
if (-not $Proxy)  { $Proxy  = $env:CORP_AI_PROXY }
if (-not $Port)   {
    $Port = if ($env:CORP_AI_PORT) { [int]$env:CORP_AI_PORT } else { 18080 }
}
if (-not $SkipCertCheck -and $env:CORP_AI_SKIP_CERT_CHECK -eq '1') {
    $SkipCertCheck = [switch]$true
}

# ─── Pre-flight checks ──────────────────────────────────────────────────────

if (-not $Target) {
    Write-Host 'エラー: AI gateway URL (-Target / CORP_AI_TARGET) が未指定です。' -ForegroundColor Red
    Write-Host '  Memola relay は AI 中継専用です。memola.env に CORP_AI_TARGET を設定してください。'
    exit 1
}

if (-not $NoProxy -and -not $Proxy) {
    Write-Host '警告: プロキシが未指定です。直接接続を試みます (社内環境では失敗する可能性が高いです)。' -ForegroundColor Yellow
}

# ─── HttpClient setup ───────────────────────────────────────────────────────

Add-Type -AssemblyName System.Net.Http | Out-Null

$handler = New-Object System.Net.Http.HttpClientHandler
$handler.AllowAutoRedirect = $true
$handler.AutomaticDecompression = [System.Net.DecompressionMethods]::None  # SSE のため未解凍で流す

if (-not $NoProxy -and $Proxy) {
    $handler.Proxy = New-Object System.Net.WebProxy($Proxy, $true)  # bypassOnLocal=true
    $handler.UseProxy = $true
}
else {
    $handler.UseProxy = $false
}

if ($SkipCertCheck) {
    # ⚠ 本番運用では不可。検証用のみ。
    $handler.ServerCertificateCustomValidationCallback =
        [System.Net.Http.HttpClientHandler]::DangerousAcceptAnyServerCertificateValidator
}

$client = New-Object System.Net.Http.HttpClient($handler)
$client.Timeout = [TimeSpan]::FromMinutes(10)

# ─── Target URL parsing ─────────────────────────────────────────────────────

$Target = $Target.TrimEnd('/')
$targetUri = [Uri]$Target
$targetPath = $targetUri.AbsolutePath
if ($targetPath -eq '/') { $targetPath = '' }

# ─── HttpListener setup ─────────────────────────────────────────────────────

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
try {
    $listener.Start()
}
catch {
    Write-Host ''
    Write-Host "エラー: ポート $Port を listen できませんでした。" -ForegroundColor Red
    Write-Host "  - 別プロセスが同じポートを使っている可能性 (Get-NetTCPConnection -LocalPort $Port)"
    Write-Host '  - または別ポートを -Port 引数で指定してください'
    Write-Host "詳細: $($_.Exception.Message)"
    exit 1
}

$baseUrlShort  = "http://localhost:$Port"
$baseUrlMirror = if ($targetPath) { "$baseUrlShort$targetPath" } else { $baseUrlShort }

Write-Host ('-' * 72)
Write-Host '  Memola AI relay (PowerShell)'
Write-Host ('-' * 72)
Write-Host "  listen  : http://127.0.0.1:$Port"
Write-Host "  target  : $Target"
Write-Host "  proxy   : $(if ($NoProxy -or -not $Proxy) { '(直接接続)' } else { $Proxy })"
if ($SkipCertCheck) { Write-Host '  SSL 検証スキップ中 (-SkipCertCheck)' -ForegroundColor Yellow }
Write-Host ('-' * 72)
Write-Host 'エンドポイント:'
Write-Host "  GET  $baseUrlShort/memola/health           (死活確認)"
Write-Host "  GET  $baseUrlShort/memola/outlook/import   (Outlook からメール読込: ?to=&cc=&since=&until=&max=)"
Write-Host "  GET  $baseUrlShort/memola/outlook/open     (Internet-Message-Id でメール表示: ?id=)"
Write-Host "  GET  $baseUrlShort/memola/onenote/hierarchy (OneNote ノートブック/セクション/ページ階層を取得)"
Write-Host "  GET  $baseUrlShort/memola/onenote/pages     (OneNote 指定ページの本文抽出: ?ids=&since=&max=)"
Write-Host "  GET  $baseUrlShort/memola/onenote/open      (OneNote 上でページ表示: ?id=)"
Write-Host "  POST $baseUrlShort/memola/onenote/append    (OneNote ページ末尾にブロック追記: body={pageId,heading,blocks})"
Write-Host "  GET  $baseUrlShort/memola/onenote/memola-outlines (Memola が追記した Outline 一覧: ?pageId=)"
Write-Host "  POST $baseUrlShort/memola/onenote/replace-outline (Memola 追記 Outline を上書き: body={pageId,outlineId,heading,blocks,user})"
Write-Host "  POST $baseUrlShort/memola/pptx-extract     (PPTX を slide 配列に展開: body=octet-stream, header X-Memola-Filename)"
Write-Host "  POST $baseUrlShort/memola/pptx-open        (PowerPoint で fileUrl + slideNo へジャンプ: body={fileUrl,slideNo})"
Write-Host "  GET  $baseUrlShort/memola/onenote/current   (OneNote で現在表示中のページ ID を返す)"
Write-Host "  GET  $baseUrlShort/memola/onenote/links     (指定ページ ID 群の OneNote リンクを返す: ?ids=)"
Write-Host "  GET  $baseUrlShort/memola/ai-config        (AI 設定を env から配信: ブラウザが起動時に取得)"
Write-Host "  GET  $baseUrlShort/memola/memola.bundle.js (開発: ローカル dist のバンドル配信)"
Write-Host "  GET  $baseUrlShort/memola/version.txt      (開発: ローカル dist のバージョン配信)"
Write-Host "  $baseUrlShort/memola/bundle-dir            (開発: 配信フォルダの確認 GET / 変更 POST)"
Write-Host "  *    $baseUrlShort/...                      (上記以外は target へ透過 forward)"
Write-Host "  bundle dir: $script:BundleDir"
Write-Host ''
Write-Host 'Memola runtime / PoC のベース URL に下記を入力:'
Write-Host "  A: $baseUrlShort"
if ($baseUrlShort -ne $baseUrlMirror) {
    Write-Host "  B: $baseUrlMirror    (実 URL のパスを保ったまま localhost に置換)"
}
Write-Host ('-' * 72)
Write-Host 'Ctrl+C で終了' -ForegroundColor DarkGray
Write-Host ''

# ─── CORS helper ────────────────────────────────────────────────────────────

function Add-CorsHeaders {
    param([System.Net.HttpListenerResponse]$Response)
    # bookmarklet は SharePoint オリジンから動くので明示許可。listen は
    # loopback だけなので `*` でも外部から到達できず安全。
    $Response.Headers.Add('Access-Control-Allow-Origin', '*')
    $Response.Headers.Add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    $Response.Headers.Add(
        'Access-Control-Allow-Headers',
        'Content-Type, api-key, Accept, Authorization, X-Requested-With, x-api-key, X-Memola-Filename'
    )
    # Chrome の Private Network Access (PNA): https の公開オリジンから
    # http://127.0.0.1 (private) へのリクエストはこのヘッダが無いと拒否される。
    $Response.Headers.Add('Access-Control-Allow-Private-Network', 'true')
    $Response.Headers.Add('Access-Control-Max-Age', '86400')
}

# ─── helpers ────────────────────────────────────────────────────────────────

function Send-Error {
    param(
        [System.Net.HttpListenerResponse]$Response,
        [int]$Status,
        [string]$Code,
        [string]$Detail
    )
    $payload = (@{ error = @{ code = $Code; detail = $Detail } } | ConvertTo-Json -Compress -Depth 4)
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
    try {
        $Response.StatusCode = $Status
        Add-CorsHeaders -Response $Response
        $Response.ContentType = 'application/json; charset=utf-8'
        $Response.ContentLength64 = $bytes.Length
        $Response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
    catch { }
    finally { try { $Response.OutputStream.Close() } catch { } }
}

function Send-Json {
    param(
        [System.Net.HttpListenerResponse]$Response,
        [int]$Status,
        [object]$Body
    )
    $json  = ($Body | ConvertTo-Json -Compress -Depth 6)
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
    try {
        $Response.StatusCode    = $Status
        Add-CorsHeaders -Response $Response
        $Response.ContentType   = 'application/json; charset=utf-8'
        $Response.ContentLength64 = $bytes.Length
        $Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } catch { }
    finally { try { $Response.OutputStream.Close() } catch { } }
}

# 静的ファイル配信 (開発者モードのローカルバンドル用)。
function Send-StaticFile {
    param(
        [System.Net.HttpListenerResponse]$Response,
        [string]$FilePath,
        [string]$ContentType
    )
    if (-not (Test-Path -LiteralPath $FilePath)) {
        Send-Json -Response $Response -Status 404 -Body @{ ok = $false; error = @{ code = 'not_found'; detail = "File not found: $FilePath" } }
        return
    }
    try {
        $bytes = [System.IO.File]::ReadAllBytes($FilePath)
        Add-CorsHeaders -Response $Response
        $Response.StatusCode = 200
        $Response.ContentType = $ContentType
        $Response.Headers.Add('Cache-Control', 'no-store') # loader は ?v= でバスティングするが念のため
        $Response.ContentLength64 = $bytes.Length
        $Response.OutputStream.Write($bytes, 0, $bytes.Length)
        $Response.OutputStream.Close()
    } catch {
        Send-Json -Response $Response -Status 500 -Body @{ ok = $false; error = @{ code = 'read_error'; detail = $_.Exception.Message } }
    }
}

# ─── Outlook COM (メールインポート) ─────────────────────────────────────────
# 既存の受信済み ML メールを Outlook クライアントから読み出し、To/Cc 条件と
# 受信期間でフィルタして JSON で返す。別アプリ relay の Outlook COM 流用。
# ※ 読み取り専用 (.Display/.Send は呼ばない)。Windows + Outlook 必須。

function Get-OutlookOrNull {
    try {
        try { return [Runtime.InteropServices.Marshal]::GetActiveObject('Outlook.Application') }
        catch { return (New-Object -ComObject Outlook.Application) }
    } catch { return $null }
}

# Recipient / Sender から SMTP アドレスを取り出す (Exchange の EX 形式を SMTP へ)。
function Get-SmtpFromAddressEntry {
    param($AddressEntry, [string]$Fallback)
    try {
        if ($AddressEntry) {
            try { $ex = $AddressEntry.GetExchangeUser(); if ($ex -and $ex.PrimarySmtpAddress) { return $ex.PrimarySmtpAddress } } catch { }
            try {
                $smtp = $AddressEntry.PropertyAccessor.GetProperty('http://schemas.microsoft.com/mapi/proptag/0x39FE001F')
                if ($smtp) { return $smtp }
            } catch { }
        }
    } catch { }
    return $Fallback
}

# MailItem を JSON 化可能なハッシュへ。
function Read-MailItem {
    param($Item)
    $mid = ''
    try { $mid = $Item.PropertyAccessor.GetProperty('http://schemas.microsoft.com/mapi/proptag/0x1035001F') } catch { }
    $from = ''
    try {
        $from = [string]$Item.SenderEmailAddress
        try { $from = Get-SmtpFromAddressEntry -AddressEntry $Item.Sender -Fallback $from } catch { }
    } catch { }
    $toList = @(); $ccList = @()
    try {
        foreach ($r in $Item.Recipients) {
            $smtp = Get-SmtpFromAddressEntry -AddressEntry $r.AddressEntry -Fallback ([string]$r.Address)
            if ($r.Type -eq 2) { $ccList += $smtp } else { $toList += $smtp }  # 1=To, 2=CC, 3=BCC
        }
    } catch { }
    $date = ''
    try { $date = $Item.ReceivedTime.ToString('o') } catch { }
    # HTML メールは HTMLBody をそのまま渡し isHtml=true (表示時にクライアントで
    # サニタイズ + HTML 描画)。それ以外はプレーン .Body。olFormatHTML=2。
    $isHtml = $false
    $body = ''
    try {
        if ([int]$Item.BodyFormat -eq 2) {
            $h = [string]$Item.HTMLBody
            if ($h) { $body = $h; $isHtml = $true } else { $body = [string]$Item.Body }
        } else {
            $body = [string]$Item.Body
        }
    } catch { try { $body = [string]$Item.Body } catch { } }
    $convId = ''
    try { $convId = [string]$Item.ConversationID } catch { }
    return @{
        messageId         = [string]$mid
        internetMessageId = [string]$mid
        conversationId    = [string]$convId
        subject   = [string]$Item.Subject
        from      = [string]$from
        to        = @($toList)
        cc        = @($ccList)
        date      = [string]$date
        body      = $body
        isHtml    = [bool]$isHtml
    }
}

function Invoke-OutlookImport {
    param([System.Net.HttpListenerContext]$Context)
    $request  = $Context.Request
    $response = $Context.Response
    $q = $request.QueryString

    $split = { param($s) if ($s) { ($s -split '[;,]') | ForEach-Object { $_.Trim().ToLower() } | Where-Object { $_ } } else { @() } }
    $toAddrs = @(& $split $q['to'])
    $ccAddrs = @(& $split $q['cc'])
    $max = 1000
    if ($q['max']) { $tmp = 0; if ([int]::TryParse($q['max'], [ref]$tmp)) { $max = $tmp } }
    # 日付は「その日いっぱい」を含めたいので、since はその日の 0:00、until は
    # 翌日 0:00 とし、上限は < で比較する (同日指定でもその日が丸ごと範囲に入る)。
    $sinceDt = (Get-Date).Date.AddYears(-10)
    $untilDt = (Get-Date).Date.AddDays(1)
    if ($q['since']) { try { $sinceDt = [DateTime]::Parse($q['since']).Date } catch { } }
    if ($q['until']) { try { $untilDt = [DateTime]::Parse($q['until']).Date.AddDays(1) } catch { } }

    $ol = Get-OutlookOrNull
    if (-not $ol) {
        Send-Error -Response $response -Status 503 -Code 'no_outlook' -Detail 'Outlook を起動/接続できませんでした (Windows + Outlook が必要)'
        return
    }

    try {
        $ns = $ol.GetNamespace('MAPI')
        # ReceivedTime は Outlook ロケール依存。MM/dd/yyyy HH:mm が無難。
        $filter = "[ReceivedTime] >= '" + $sinceDt.ToString('MM/dd/yyyy HH:mm') + "' AND [ReceivedTime] < '" + $untilDt.ToString('MM/dd/yyyy HH:mm') + "'"

        $matches = {
            param($mail)
            if ($toAddrs.Count -eq 0 -and $ccAddrs.Count -eq 0) { return $true }
            $to = @(); $cc = @()
            try {
                foreach ($r in $mail.Recipients) {
                    $s = (Get-SmtpFromAddressEntry -AddressEntry $r.AddressEntry -Fallback ([string]$r.Address)).ToLower()
                    if ($r.Type -eq 2) { $cc += $s } else { $to += $s }
                }
            } catch { }
            foreach ($a in $toAddrs) { if ($to -contains $a) { return $true } }
            foreach ($a in $ccAddrs) { if ($cc -contains $a) { return $true } }
            return $false
        }

        # 除外フォルダ (送信済み=5 / 削除済み=3 / 迷惑メール=23) を全ストアぶん収集。
        # EntryID で一致判定し、そのフォルダ自身とサブフォルダを走査対象から外す。
        $skipIds = @{}
        try {
            foreach ($store in $ns.Stores) {
                foreach ($ft in @(3, 5, 23)) {
                    try { $f = $store.GetDefaultFolder($ft); if ($f) { $skipIds[$f.EntryID] = $true } } catch { }
                }
            }
        } catch { }

        $results = New-Object System.Collections.ArrayList
        # 全ストア (メインメールボックス / アーカイブ / オンラインアーカイブ / PST) の
        # ルートから全フォルダを幅優先で走査する。ローカルの「アーカイブ」は受信トレイの
        # 外、オンラインアーカイブは別ストアなので、Inbox 配下だけだと拾えない。
        $queue = New-Object System.Collections.Queue
        foreach ($store in $ns.Folders) { $queue.Enqueue($store) }
        $folders = 0
        while ($queue.Count -gt 0 -and $results.Count -lt $max -and $folders -lt 5000) {
            $folder = $queue.Dequeue(); $folders++
            try { if ($skipIds.ContainsKey($folder.EntryID)) { continue } } catch { }  # 送信済/削除済/迷惑メールは除外 (配下も辿らない)
            try { foreach ($sf in $folder.Folders) { $queue.Enqueue($sf) } } catch { }
            $items = $null
            try { $items = $folder.Items.Restrict($filter) } catch { continue }  # メール以外のフォルダは除外
            foreach ($it in $items) {
                if ($results.Count -ge $max) { break }
                try {
                    if ($it.Class -ne 43) { continue }  # olMail
                    if (& $matches $it) { [void]$results.Add((Read-MailItem -Item $it)) }
                } catch { }
            }
        }

        Write-Host ("[import] matched {0} mails / scanned {1} folders (to=[{2}] cc=[{3}] {4}..{5})" -f $results.Count, $folders, ($toAddrs -join ','), ($ccAddrs -join ','), $sinceDt.ToString('yyyy-MM-dd'), $untilDt.AddDays(-1).ToString('yyyy-MM-dd'))
        Send-Json -Response $response -Status 200 -Body @{ ok = $true; count = $results.Count; mails = @($results) }
    }
    catch {
        Send-Error -Response $response -Status 500 -Code 'outlook_error' -Detail $_.Exception.Message
    }
}

# Internet-Message-Id で Outlook 内のメールを探し、見つかればクライアント上に
# 表示 (インスペクタを開く)。受信トレイ等の全ストア・全サブフォルダを走査。
function Invoke-OutlookOpen {
    param([System.Net.HttpListenerContext]$Context)
    $response = $Context.Response
    $id = $Context.Request.QueryString['id']
    if (-not $id) {
        Send-Error -Response $response -Status 400 -Code 'bad_request' -Detail 'クエリ id (Internet-Message-Id) が必要です'
        return
    }

    $ol = Get-OutlookOrNull
    if (-not $ol) {
        Send-Error -Response $response -Status 503 -Code 'no_outlook' -Detail 'Outlook を起動/接続できませんでした (Windows + Outlook が必要)'
        return
    }

    try {
        $ns = $ol.GetNamespace('MAPI')
        # PR_INTERNET_MESSAGE_ID (0x1035001F) を DASL で等値フィルタ。値内の ' は '' へ。
        $idEsc = $id -replace "'", "''"
        $dasl  = '@SQL="http://schemas.microsoft.com/mapi/proptag/0x1035001F" = ''' + $idEsc + ''''

        $queue = New-Object System.Collections.Queue
        foreach ($store in $ns.Folders) { $queue.Enqueue($store) }

        $found = $null
        $folders = 0
        while ($queue.Count -gt 0 -and -not $found -and $folders -lt 2000) {
            $folder = $queue.Dequeue(); $folders++
            try { foreach ($sf in $folder.Folders) { $queue.Enqueue($sf) } } catch { }
            try {
                $items = $folder.Items.Restrict($dasl)
                foreach ($it in $items) {
                    try { if ($it.Class -eq 43) { $found = $it; break } } catch { }  # olMail
                }
            } catch { continue }
        }

        if ($found) {
            try { $found.Display() } catch { }                    # インスペクタを開く
            # 最前面化: メールのインスペクタを Activate、Outlook 本体も Activate。
            try { $found.GetInspector.Activate() } catch { }
            try { $ol.ActiveExplorer().Activate() } catch { }
            # それでも他ウィンドウに隠れるケース用に Win32 SetForegroundWindow を保険で叩く。
            try {
                if (-not ('Memola.Native' -as [type])) {
                    Add-Type -Namespace Memola -Name Native -MemberDefinition @'
                        [System.Runtime.InteropServices.DllImport("user32.dll")]
                        public static extern bool SetForegroundWindow(System.IntPtr hWnd);
                        [System.Runtime.InteropServices.DllImport("user32.dll")]
                        public static extern bool ShowWindow(System.IntPtr hWnd, int nCmdShow);
'@
                }
                $hwnd = [System.IntPtr]$found.GetInspector.WindowHandle()
                if ($hwnd -ne [System.IntPtr]::Zero) {
                    [void][Memola.Native]::ShowWindow($hwnd, 9)   # SW_RESTORE = 9
                    [void][Memola.Native]::SetForegroundWindow($hwnd)
                }
            } catch { }
            Write-Host ("[open] displayed mail id={0}" -f $id)
            Send-Json -Response $response -Status 200 -Body @{ ok = $true; found = $true }
        } else {
            Write-Host ("[open] not found id={0} (scanned {1} folders)" -f $id, $folders)
            Send-Json -Response $response -Status 200 -Body @{ ok = $true; found = $false }
        }
    }
    catch {
        Send-Error -Response $response -Status 500 -Code 'outlook_error' -Detail $_.Exception.Message
    }
}

# ─── OneNote COM (ノートブック/セクション/ページ取り込み) ───────────────────
# 階層列挙 → 選択ページ群の本文抽出 → 既定アプリでページを開く。
# 必要環境: Windows + OneNote デスクトップ。Outlook と同じく COM 経由。

function Get-OneNoteOrNull {
    try {
        try { return [Runtime.InteropServices.Marshal]::GetActiveObject('OneNote.Application') }
        catch { return (New-Object -ComObject OneNote.Application) }
    } catch { return $null }
}

# OneNote XML から階層 JSON (ブラウザでツリー表示する用) を構築。
function Invoke-OneNoteHierarchy {
    param([System.Net.HttpListenerContext]$Context)
    $response = $Context.Response
    $one = Get-OneNoteOrNull
    if (-not $one) {
        Send-Error -Response $response -Status 503 -Code 'no_onenote' -Detail 'OneNote を起動/接続できませんでした (Windows + OneNote が必要)'
        return
    }
    try {
        $xml = ''
        # 4 = hsPages: ノートブック → セクション → ページ まで取得。
        $one.GetHierarchy('', 4, [ref]$xml)
        [xml]$doc = $xml
        $notebooks = New-Object System.Collections.ArrayList
        foreach ($nb in $doc.SelectNodes('//*[local-name()="Notebook"]')) {
            $sectionsList = New-Object System.Collections.ArrayList
            foreach ($sec in $nb.SelectNodes('descendant::*[local-name()="Section"]')) {
                $pagesList = New-Object System.Collections.ArrayList
                foreach ($pg in $sec.SelectNodes('*[local-name()="Page"]')) {
                    $lvl = if ($pg.pageLevel) { [int]$pg.pageLevel } else { 1 }
                    [void]$pagesList.Add(@{
                        id = [string]$pg.ID
                        name = [string]$pg.name
                        lastModified = [string]$pg.lastModifiedTime
                        level = $lvl
                    })
                }
                [void]$sectionsList.Add(@{
                    id = [string]$sec.ID
                    name = [string]$sec.name
                    pages = @($pagesList)
                })
            }
            [void]$notebooks.Add(@{
                id = [string]$nb.ID
                name = [string]$nb.name
                sections = @($sectionsList)
            })
        }
        Send-Json -Response $response -Status 200 -Body @{ ok = $true; notebooks = @($notebooks) }
    }
    catch {
        Send-Error -Response $response -Status 500 -Code 'onenote_error' -Detail $_.Exception.Message
    }
}

# クエリ:
#   ?ids=<pageId>;<pageId>;...        対象ページ ID (URL エンコード推奨)
#   ?since=YYYY-MM-DD                 lastModified がこれ以降のもののみ
#   ?max=200                          上限件数
# 戻り値: ページ配列 { pageId, notebook, section, title, lastModified, body }
function Invoke-OneNotePages {
    param([System.Net.HttpListenerContext]$Context)
    $response = $Context.Response
    $q = $Context.Request.QueryString
    $ids = @()
    if ($q['ids']) { $ids = ($q['ids'] -split ';') | ForEach-Object { $_.Trim() } | Where-Object { $_ } }
    $max = 500
    if ($q['max']) { $tmp = 0; if ([int]::TryParse($q['max'], [ref]$tmp)) { $max = $tmp } }
    $since = $null
    if ($q['since']) { try { $since = [DateTime]::Parse($q['since']) } catch { } }

    $one = Get-OneNoteOrNull
    if (-not $one) {
        Send-Error -Response $response -Status 503 -Code 'no_onenote' -Detail 'OneNote を起動/接続できませんでした (Windows + OneNote が必要)'
        return
    }
    try {
        $hierXml = ''
        $one.GetHierarchy('', 4, [ref]$hierXml)
        [xml]$hier = $hierXml
        $allPages = $hier.SelectNodes('//*[local-name()="Page"]')

        # 対象ページを絞る (ids 指定があればそれだけ。無ければ全部)。
        $targets = New-Object System.Collections.ArrayList
        foreach ($pg in $allPages) {
            if ($ids.Count -gt 0 -and ($ids -notcontains [string]$pg.ID)) { continue }
            if ($since) {
                $lm = $null
                try { $lm = [DateTime]::Parse([string]$pg.lastModifiedTime) } catch { }
                if ($lm -and $lm -lt $since) { continue }
            }
            [void]$targets.Add($pg)
            if ($targets.Count -ge $max) { break }
        }

        $results = New-Object System.Collections.ArrayList
        $failed = 0
        foreach ($pg in $targets) {
            # 1 ページ失敗で全体を落とさない: 個別 try でスキップ。
            try {
                $section = $pg.ParentNode
                $notebook = $section.ParentNode
                while ($notebook -and ($notebook.LocalName -ne 'Notebook')) { $notebook = $notebook.ParentNode }
                $content = '' # 必ずリセット (前ループの値を引き継がない)
                try { $one.GetPageContent([string]$pg.ID, [ref]$content) }
                catch {
                    Write-Host ("[onenote] GetPageContent failed id={0} title='{1}' err={2}" -f [string]$pg.ID, [string]$pg.name, $_.Exception.Message)
                    $failed++; continue
                }
                if (-not $content) { $failed++; continue }
                $text = ''
                try {
                    [xml]$cdoc = $content
                    $tNodes = $cdoc.SelectNodes('//*[local-name()="T"]')
                    $parts = @()
                    foreach ($t in $tNodes) {
                        $raw = [string]$t.InnerText
                        if ($raw) { $parts += $raw }
                    }
                    # 文字参照や軽い HTML タグを落として可読テキストに。
                    $text = ($parts -join "`n") -replace '&nbsp;', ' ' -replace '<[^>]+>', ''
                } catch {
                    Write-Host ("[onenote] parse failed id={0} title='{1}' err={2}" -f [string]$pg.ID, [string]$pg.name, $_.Exception.Message)
                }
                [void]$results.Add(@{
                    pageId       = [string]$pg.ID
                    title        = [string]$pg.name
                    lastModified = [string]$pg.lastModifiedTime
                    notebook     = if ($notebook) { [string]$notebook.name } else { '' }
                    section      = if ($section)  { [string]$section.name  } else { '' }
                    body         = $text
                })
            } catch {
                Write-Host ("[onenote] page loop error: {0}" -f $_.Exception.Message)
                $failed++
            }
        }

        $sinceStr = if ($since) { $since.ToString('yyyy-MM-dd') } else { '' }
        Write-Host ("[onenote] returned {0}/{1} pages (failed:{2} ids:{3} since:{4})" -f $results.Count, $targets.Count, $failed, $ids.Count, $sinceStr)
        Send-Json -Response $response -Status 200 -Body @{ ok = $true; count = $results.Count; failed = $failed; pages = @($results) }
    }
    catch {
        Send-Error -Response $response -Status 500 -Code 'onenote_error' -Detail $_.Exception.Message
    }
}

# 指定 pageId のページを OneNote 上で表示。
function Invoke-OneNoteOpen {
    param([System.Net.HttpListenerContext]$Context)
    $response = $Context.Response
    $id = $Context.Request.QueryString['id']
    if (-not $id) {
        Send-Error -Response $response -Status 400 -Code 'bad_request' -Detail 'クエリ id (pageId) が必要です'
        return
    }
    $one = Get-OneNoteOrNull
    if (-not $one) {
        Send-Error -Response $response -Status 503 -Code 'no_onenote' -Detail 'OneNote を起動/接続できませんでした'
        return
    }
    try {
        # NavigateTo(hierarchyObjectId, objectId, fNewWindow). 第 3 引数 $false で同一ウィンドウ。
        # ページ ID を hierarchyObjectId に渡すと該当ページが選択 (= 該当部分にスクロール) される。
        $one.NavigateTo($id, $null, $false)

        # COM 経由だと OneNote ウィンドウが裏に隠れたままになることが多いので、
        # OS 側の API でフォアグラウンドに引き出す (Outlook 表示と同じ仕掛け)。
        try {
            if (-not ('Memola.Native' -as [type])) {
                Add-Type -Namespace Memola -Name Native -MemberDefinition @'
                    [System.Runtime.InteropServices.DllImport("user32.dll")]
                    public static extern bool SetForegroundWindow(System.IntPtr hWnd);
                    [System.Runtime.InteropServices.DllImport("user32.dll")]
                    public static extern bool ShowWindow(System.IntPtr hWnd, int nCmdShow);
'@
            }
            # OneNote の主ウィンドウを Process から拾う。アプリが複数インスタンス起動している場合は
            # MainWindowHandle が有効な (=ゼロでない) ものを優先。
            $procs = Get-Process -Name ONENOTE -ErrorAction SilentlyContinue
            $proc = $procs | Where-Object { $_.MainWindowHandle -ne [System.IntPtr]::Zero } | Select-Object -First 1
            if ($proc) {
                [void][Memola.Native]::ShowWindow($proc.MainWindowHandle, 9)   # SW_RESTORE = 9
                [void][Memola.Native]::SetForegroundWindow($proc.MainWindowHandle)
            }
        } catch { }

        Write-Host ("[onenote] navigated to page id={0}" -f $id)
        Send-Json -Response $response -Status 200 -Body @{ ok = $true }
    }
    catch {
        Send-Error -Response $response -Status 500 -Code 'onenote_error' -Detail $_.Exception.Message
    }
}

# OneNote で「いま開いている」ページの ID を返す。追記モーダルの既定値に使う。
# 取れない (起動してない / ウィンドウが無い / プロパティ未対応) ときは pageId='' を返す
# (エラーにしない: クライアント側は単に「既定なし」として扱う)。
function Invoke-OneNoteCurrent {
    param([System.Net.HttpListenerContext]$Context)
    $response = $Context.Response
    $one = Get-OneNoteOrNull
    if (-not $one) {
        Send-Json -Response $response -Status 200 -Body @{ ok = $true; pageId = ''; reason = 'no_onenote' }
        return
    }
    # 注: $PID は PowerShell の読み取り専用自動変数 (プロセス ID) なので使わない。
    $curPageId = ''
    try {
        $win = $one.Windows.CurrentWindow
        if ($win) { $curPageId = [string]$win.CurrentPageId }
    } catch { $curPageId = '' }
    Send-Json -Response $response -Status 200 -Body @{ ok = $true; pageId = $curPageId }
}

# 指定したページ ID 群について OneNote のリンク (onenote: URL) を返す。
# OneNote 追記の出典セクションで使うために、ページごとにクリック可能なリンクを生成する。
function Invoke-OneNoteLinks {
    param([System.Net.HttpListenerContext]$Context)
    $response = $Context.Response
    $q = $Context.Request.QueryString
    $ids = @()
    if ($q['ids']) { $ids = ($q['ids'] -split ';') | ForEach-Object { $_.Trim() } | Where-Object { $_ } }
    if ($ids.Count -eq 0) { Send-Json -Response $response -Status 200 -Body @{ ok = $true; links = @{} }; return }

    $one = Get-OneNoteOrNull
    if (-not $one) { Send-Json -Response $response -Status 200 -Body @{ ok = $true; links = @{}; reason = 'no_onenote' }; return }

    $links = @{}
    foreach ($id in $ids) {
        $link = ''
        try { $one.GetHyperlinkToObject($id, '', [ref]$link) } catch { $link = '' }
        if ($link) { $links[$id] = $link }
    }
    Send-Json -Response $response -Status 200 -Body @{ ok = $true; links = $links }
}

# 指定 pageId のページ末尾に新しい Outline を追記。
# body (JSON): { pageId, heading?, blocks: [{type:'h'|'p'|'ul'|'ol', text:string}, ...] }
# 既存内容は触らず、新規 Outline を末尾 (= 既存 Outline の下) に挿入する。
function Invoke-OneNoteAppend {
    param([System.Net.HttpListenerContext]$Context)
    $response = $Context.Response
    $req = $Context.Request

    # JSON body 読込。Content-Type に charset 未指定だと $req.ContentEncoding が Shift-JIS や
    # null になり日本語が壊れる。クライアントは常に UTF-8 で送るので強制 UTF-8。
    $reader = New-Object System.IO.StreamReader($req.InputStream, [System.Text.Encoding]::UTF8)
    $bodyText = $reader.ReadToEnd()
    $reader.Close()
    $payload = $null
    try { $payload = $bodyText | ConvertFrom-Json } catch {
        Write-Host ("[onenote] bad json body: {0}" -f $bodyText.Substring(0, [Math]::Min(300, $bodyText.Length)))
        Send-Error -Response $response -Status 400 -Code 'bad_json' -Detail ("JSON ボディを解釈できませんでした: " + $_.Exception.Message)
        return
    }
    $pageId          = [string]$payload.pageId
    $createInSection = [string]$payload.createInSection
    $newPageTitle    = [string]$payload.newPageTitle
    $heading         = [string]$payload.heading
    $userId          = [string]$payload.user
    $blocks          = @($payload.blocks)
    if (-not $pageId -and -not $createInSection) {
        Send-Error -Response $response -Status 400 -Code 'bad_request' -Detail 'pageId または createInSection が必要です'; return
    }
    if (-not $heading -and (-not $blocks -or $blocks.Count -eq 0)) {
        Send-Error -Response $response -Status 400 -Code 'bad_request' -Detail '見出しまたはブロックが必要です'; return
    }

    $one = Get-OneNoteOrNull
    if (-not $one) {
        Send-Error -Response $response -Status 503 -Code 'no_onenote' -Detail 'OneNote を起動/接続できませんでした (Windows + OneNote が必要)'
        return
    }

    try {
        $createdNewPage = $false
        # 新規ページ作成モード: 指定セクションに空ページを作って、その ID を pageId として後続処理に流す。
        if ($createInSection) {
            $newId = ''
            $one.CreateNewPage($createInSection, [ref]$newId)
            if (-not $newId) { throw 'CreateNewPage が空の pageId を返しました' }
            $pageId = $newId
            $createdNewPage = $true
            Write-Host ("[onenote] created new page in section={0} pageId={1}" -f $createInSection, $pageId)
        }

        # 既存ページを取得 → 既存 Outline の最下端 Y を求めて、その下に新規 Outline を置く。
        $content = ''
        $one.GetPageContent($pageId, [ref]$content)
        [xml]$doc = $content
        $oneNs = 'http://schemas.microsoft.com/office/onenote/2013/onenote'
        $ns = New-Object System.Xml.XmlNamespaceManager($doc.NameTable)
        $ns.AddNamespace('one', $oneNs)

        # 新規ページ作成時はタイトルを差し替える (新規ページは未保存タイトルの空ページ)。
        if ($createdNewPage -and $newPageTitle) {
            $titleSafe = ($newPageTitle -replace '&', '&amp;') -replace '<', '&lt;' -replace '>', '&gt;'
            $titleT = $doc.SelectSingleNode('//one:Page/one:Title/one:OE/one:T', $ns)
            if ($titleT) {
                $titleT.RemoveAll() | Out-Null
                [void]$titleT.AppendChild($doc.CreateCDataSection($titleSafe))
            } else {
                # Title 構造が無ければ作る (CreateNewPage 直後は通常あるが念のため)
                $page0 = $doc.DocumentElement
                $titleEl = $doc.CreateElement('one', 'Title', $oneNs)
                $oeT = $doc.CreateElement('one', 'OE', $oneNs)
                $tEl = $doc.CreateElement('one', 'T', $oneNs)
                [void]$tEl.AppendChild($doc.CreateCDataSection($titleSafe))
                [void]$oeT.AppendChild($tEl)
                [void]$titleEl.AppendChild($oeT)
                # Title は通常 Page 直下の先頭近くに置く
                [void]$page0.InsertBefore($titleEl, $page0.FirstChild)
            }
        }

        $maxY = 0.0
        foreach ($o in $doc.SelectNodes('//one:Outline', $ns)) {
            $y = 0.0; $h = 0.0
            $pos = $o.SelectSingleNode('one:Position', $ns)
            if ($pos -and $pos.y) { [double]::TryParse([string]$pos.y, [ref]$y) | Out-Null }
            $sz = $o.SelectSingleNode('one:Size', $ns)
            if ($sz -and $sz.height) { [double]::TryParse([string]$sz.height, [ref]$h) | Out-Null }
            $bottom = $y + $h
            if ($bottom -gt $maxY) { $maxY = $bottom }
        }
        $newY = if ($maxY -gt 0) { $maxY + 30 } else { 86 }

        # 新 Outline を組み立てる
        $page = $doc.DocumentElement
        $outline = $doc.CreateElement('one', 'Outline', $oneNs)
        $posEl = $doc.CreateElement('one', 'Position', $oneNs)
        $posEl.SetAttribute('x', '36'); $posEl.SetAttribute('y', "$newY"); $posEl.SetAttribute('z', '1')
        [void]$outline.AppendChild($posEl)
        $sizeEl = $doc.CreateElement('one', 'Size', $oneNs)
        $sizeEl.SetAttribute('width', '500'); $sizeEl.SetAttribute('height', '20'); $sizeEl.SetAttribute('isSetByUser', 'false')
        [void]$outline.AppendChild($sizeEl)
        $rootChildren = $doc.CreateElement('one', 'OEChildren', $oneNs)

        # OEChildren コンテナ作成ヘルパ。
        function New-OEChildren { param($doc, $oneNs) return $doc.CreateElement('one', 'OEChildren', $oneNs) }
        # OE 作成ヘルパ。HTML 入りテキストを CDATA で <one:T> に入れる。
        # OneNote の <one:T> は限定 HTML (b/i/u/span/br/font/a 等) を解釈する。
        function New-OE {
            param($doc, $oneNs, [string]$html)
            $oe = $doc.CreateElement('one', 'OE', $oneNs)
            $t  = $doc.CreateElement('one', 'T', $oneNs)
            [void]$t.AppendChild($doc.CreateCDataSection($html))
            [void]$oe.AppendChild($t)
            return $oe
        }

        # Memola 追記の出所バナーを最初に置く: 誰が何時に追記したかをノート単独で識別できるように。
        $stamp = (Get-Date).ToString('yyyy-MM-dd HH:mm')
        $userSafe = if ($userId) { ($userId -replace '&', '&amp;') -replace '<', '&lt;' -replace '>', '&gt;' } else { '(不明)' }
        $bannerHtml = "<span style=`"color:#888;font-size:9pt`"><b>[Memola 追記]</b> by {0} [{1}]</span>" -f $userSafe, $stamp
        [void]$rootChildren.AppendChild((New-OE $doc $oneNs $bannerHtml))

        # 見出しは <b> で 2 行目に (level=0 固定)
        if ($heading) {
            $safe = ($heading -replace '&', '&amp;') -replace '<', '&lt;' -replace '>', '&gt;'
            $hHtml = "<b>{0}</b>" -f $safe
            [void]$rootChildren.AppendChild((New-OE $doc $oneNs $hHtml))
        }

        # ネスト管理: parentsByLevel[L] = レベル L のブロックが入る OEChildren コンテナ。
        # parentsByLevel[0] は rootChildren。L>0 は親 OE の中に必要時に <one:OEChildren> を作る。
        $parentsByLevel = New-Object 'System.Collections.Generic.Dictionary[int,object]'
        $parentsByLevel[0] = $rootChildren
        $lastOEByLevel = New-Object 'System.Collections.Generic.Dictionary[int,object]'

        foreach ($b in $blocks) {
            $type = [string]$b.type
            $text = [string]$b.text
            $lvl = 0
            if ($null -ne $b.level) {
                try { $lvl = [int]$b.level } catch { $lvl = 0 }
            }
            if ($lvl -lt 0) { $lvl = 0 }
            if ($lvl -gt 8) { $lvl = 8 } # 念のため深さ制限

            # 空行: ルートに空 OE を追加 (段落区切り用)。ネスト状態もリセット。
            if ($type -eq 'blank') {
                [void]$rootChildren.AppendChild((New-OE $doc $oneNs ''))
                $lastOEByLevel.Clear()
                # level 0 のコンテナだけ残す
                $parentsByLevel.Clear()
                $parentsByLevel[0] = $rootChildren
                continue
            }
            if (-not $text) { continue }

            # この level の親コンテナを確保:
            # parentsByLevel[$lvl] が未設定の場合、最も近い親レベル L' の OE に
            # OEChildren を作って parentsByLevel[$lvl] にする。
            if (-not $parentsByLevel.ContainsKey($lvl)) {
                # 直近上位の親 OE を探す
                $p = $lvl - 1
                while ($p -ge 0 -and (-not $lastOEByLevel.ContainsKey($p))) { $p-- }
                if ($p -lt 0) {
                    # 親が無い (急に L>0 で始まった等) → ルートに付ける
                    $parentsByLevel[$lvl] = $rootChildren
                } else {
                    $parentOE = $lastOEByLevel[$p]
                    $childContainer = New-OEChildren $doc $oneNs
                    [void]$parentOE.AppendChild($childContainer)
                    $parentsByLevel[$lvl] = $childContainer
                }
            }

            # 制御文字だけ落とす (b/i/u/strong/em/br/a/span 等は通す)
            $safe = $text -replace '[\x00-\x08\x0B\x0C\x0E-\x1F]', ''
            $html = switch ($type) {
                'h'  { "<b>" + $safe + "</b>" }
                'ul' { "• " + $safe }
                'ol' { $safe }   # 番号はクライアントが付与
                'q'  { "<span style=`"color:#888`">▍ " + $safe + "</span>" }
                default { $safe }
            }
            $oe = New-OE $doc $oneNs $html
            [void]$parentsByLevel[$lvl].AppendChild($oe)
            $lastOEByLevel[$lvl] = $oe

            # 配下のレベルキャッシュは破棄 (次に深いブロックが来たら再作成)
            $deeper = @($parentsByLevel.Keys | Where-Object { $_ -gt $lvl })
            foreach ($k in $deeper) { [void]$parentsByLevel.Remove($k) }
            $deeperOE = @($lastOEByLevel.Keys | Where-Object { $_ -gt $lvl })
            foreach ($k in $deeperOE) { [void]$lastOEByLevel.Remove($k) }
        }

        [void]$outline.AppendChild($rootChildren)
        [void]$page.AppendChild($outline)

        # 更新。dateExpectedLastModified を MinValue にして衝突チェックを省略 (末尾追加なので安全)。
        $one.UpdatePageContent($doc.OuterXml, [DateTime]::MinValue)
        Write-Host ("[onenote] appended to page id={0} heading='{1}' blocks={2} created={3}" -f $pageId, $heading, $blocks.Count, $createdNewPage)
        Send-Json -Response $response -Status 200 -Body @{ ok = $true; pageId = $pageId; created = $createdNewPage }
    }
    catch {
        Send-Error -Response $response -Status 500 -Code 'onenote_error' -Detail $_.Exception.Message
    }
}

# 指定ページに含まれる Memola 追記 Outline (バナー "[Memola 追記]" を含むもの) を列挙。
# 「既存の追記を更新」モーダルで一覧表示する用。
function Invoke-OneNoteMemolaOutlines {
    param([System.Net.HttpListenerContext]$Context)
    $response = $Context.Response
    $pageId = $Context.Request.QueryString['pageId']
    if (-not $pageId) { Send-Error -Response $response -Status 400 -Code 'bad_request' -Detail 'pageId が必要です'; return }
    $one = Get-OneNoteOrNull
    if (-not $one) { Send-Error -Response $response -Status 503 -Code 'no_onenote' -Detail 'OneNote 未起動'; return }
    try {
        $content = ''
        $one.GetPageContent($pageId, [ref]$content)
        [xml]$doc = $content
        $oneNs = 'http://schemas.microsoft.com/office/onenote/2013/onenote'
        $ns = New-Object System.Xml.XmlNamespaceManager($doc.NameTable)
        $ns.AddNamespace('one', $oneNs)

        $outlines = New-Object System.Collections.ArrayList
        foreach ($outline in $doc.SelectNodes('//one:Outline', $ns)) {
            # 直下 OEChildren の 1 つ目 OE のテキストを見て [Memola 追記] バナーがあるか判定。
            $firstT = $outline.SelectSingleNode('one:OEChildren/one:OE[1]//one:T', $ns)
            if (-not $firstT) { continue }
            $firstText = [string]$firstT.InnerText
            if ($firstText -notmatch '\[Memola 追記\]') { continue }

            $outlineId = $outline.objectID
            # 見出しは append 時に「<b>...</b>」だけの OE として書かれる (省略可)。
            # OE[2] を無条件に見出し扱いすると、heading 省略の append (本文だけ) を後で
            # update したときに本文の 1 行目を heading として吸い上げてしまい、構造が崩れる。
            # OE[2] の InnerText が "<b>...</b>" だけで構成されているかチェックして見出し抽出する。
            $heading = ''
            $secondOE = $outline.SelectSingleNode('one:OEChildren/one:OE[2]', $ns)
            if ($secondOE) {
                $secondT = $secondOE.SelectSingleNode('.//one:T', $ns)
                if ($secondT) {
                    # CDATA を含めた完全な innerXml / outerXml を見て、<b>...</b> 単独ならそれが heading。
                    # T.InnerText は CDATA 内の文字列をそのまま返すので "<b>春の懇親会</b>" 等になる。
                    $rawT = [string]$secondT.InnerText
                    $m = [regex]::Match($rawT.Trim(), '^<b>([\s\S]+)</b>$')
                    if ($m.Success) { $heading = $m.Groups[1].Value }
                }
            }
            # 全テキストを連結 (改行区切り、HTML タグは除去) — プレビュー表示用
            $allTexts = New-Object System.Collections.ArrayList
            foreach ($t in $outline.SelectNodes('.//one:T', $ns)) {
                $line = [string]$t.InnerText
                if ($line) { [void]$allTexts.Add($line) }
            }
            $plainText = ($allTexts -join "`n") -replace '<[^>]+>', ''
            [void]$outlines.Add(@{
                outlineId = [string]$outlineId
                banner    = $firstText
                heading   = $heading
                plainText = $plainText
            })
        }
        Send-Json -Response $response -Status 200 -Body @{ ok = $true; outlines = @($outlines) }
    } catch {
        Send-Error -Response $response -Status 500 -Code 'onenote_error' -Detail $_.Exception.Message
    }
}

# 指定の Memola 追記 Outline を新しい内容で上書きする。
# 既存の Position / Size は維持し、OEChildren の中身 (banner + heading + blocks) だけ差し替える。
# 手書きの Outline (バナーなし) はガードチェックで誤って上書きしないようにする。
function Invoke-OneNoteReplaceOutline {
    param([System.Net.HttpListenerContext]$Context)
    $response = $Context.Response
    $req = $Context.Request
    $reader = New-Object System.IO.StreamReader($req.InputStream, [System.Text.Encoding]::UTF8)
    $bodyText = $reader.ReadToEnd(); $reader.Close()
    $payload = $null
    try { $payload = $bodyText | ConvertFrom-Json } catch {
        Send-Error -Response $response -Status 400 -Code 'bad_json' -Detail ('JSON ボディを解釈できませんでした: ' + $_.Exception.Message); return
    }
    $pageId    = [string]$payload.pageId
    $outlineId = [string]$payload.outlineId
    $heading   = [string]$payload.heading
    $userId    = [string]$payload.user
    $blocks    = @($payload.blocks)
    if (-not $pageId -or -not $outlineId) { Send-Error -Response $response -Status 400 -Code 'bad_request' -Detail 'pageId と outlineId が必要です'; return }

    $one = Get-OneNoteOrNull
    if (-not $one) { Send-Error -Response $response -Status 503 -Code 'no_onenote' -Detail 'OneNote 未起動'; return }
    try {
        $content = ''
        $one.GetPageContent($pageId, [ref]$content)
        [xml]$doc = $content
        $oneNs = 'http://schemas.microsoft.com/office/onenote/2013/onenote'
        $ns = New-Object System.Xml.XmlNamespaceManager($doc.NameTable)
        $ns.AddNamespace('one', $oneNs)

        # objectID で対象 Outline を取る。XPath には変数を渡せないので、JSON 文字列を直接組み立てる。
        $xpath = "//one:Outline[@objectID='" + ($outlineId -replace "'", "&#39;") + "']"
        $outline = $doc.SelectSingleNode($xpath, $ns)
        if (-not $outline) { Send-Error -Response $response -Status 404 -Code 'not_found' -Detail '指定 outlineId の Outline が見つかりません'; return }

        # ガード: バナー [Memola 追記] が無い Outline は誤操作防止のため弾く。
        $firstTCheck = $outline.SelectSingleNode('one:OEChildren/one:OE[1]//one:T', $ns)
        $firstTextCheck = if ($firstTCheck) { [string]$firstTCheck.InnerText } else { '' }
        if ($firstTextCheck -notmatch '\[Memola 追記\]') {
            Send-Error -Response $response -Status 409 -Code 'not_memola' -Detail 'この Outline は Memola 追記ではないため上書きできません'; return
        }

        # 既存 OEChildren を破棄して新規構築。
        $oldChildren = $outline.SelectSingleNode('one:OEChildren', $ns)
        if ($oldChildren) { [void]$outline.RemoveChild($oldChildren) }
        $rootChildren = $doc.CreateElement('one', 'OEChildren', $oneNs)

        # 共通の OE 生成 (Invoke-OneNoteAppend と同じ)。
        function New-OEChildren { param($doc, $oneNs) return $doc.CreateElement('one', 'OEChildren', $oneNs) }
        function New-OE {
            param($doc, $oneNs, [string]$html)
            $oe = $doc.CreateElement('one', 'OE', $oneNs)
            $t  = $doc.CreateElement('one', 'T', $oneNs)
            [void]$t.AppendChild($doc.CreateCDataSection($html))
            [void]$oe.AppendChild($t)
            return $oe
        }

        # 新しいバナー (更新者と更新日時で書き換え)
        $stamp = (Get-Date).ToString('yyyy-MM-dd HH:mm')
        $userSafe = if ($userId) { ($userId -replace '&', '&amp;') -replace '<', '&lt;' -replace '>', '&gt;' } else { '(不明)' }
        $bannerHtml = "<span style=`"color:#888;font-size:9pt`"><b>[Memola 追記]</b> by {0} [{1}] (更新)</span>" -f $userSafe, $stamp
        [void]$rootChildren.AppendChild((New-OE $doc $oneNs $bannerHtml))

        if ($heading) {
            $safe = ($heading -replace '&', '&amp;') -replace '<', '&lt;' -replace '>', '&gt;'
            [void]$rootChildren.AppendChild((New-OE $doc $oneNs ("<b>" + $safe + "</b>")))
        }

        # ブロック列を OE ツリーに展開 (Invoke-OneNoteAppend と同じ)
        $parentsByLevel = New-Object 'System.Collections.Generic.Dictionary[int,object]'
        $parentsByLevel[0] = $rootChildren
        $lastOEByLevel = New-Object 'System.Collections.Generic.Dictionary[int,object]'
        foreach ($b in $blocks) {
            $type = [string]$b.type
            $text = [string]$b.text
            $lvl = 0
            if ($null -ne $b.level) { try { $lvl = [int]$b.level } catch { $lvl = 0 } }
            if ($lvl -lt 0) { $lvl = 0 }
            if ($lvl -gt 8) { $lvl = 8 }
            if ($type -eq 'blank') {
                [void]$rootChildren.AppendChild((New-OE $doc $oneNs ''))
                $lastOEByLevel.Clear(); $parentsByLevel.Clear(); $parentsByLevel[0] = $rootChildren
                continue
            }
            if (-not $text) { continue }
            if (-not $parentsByLevel.ContainsKey($lvl)) {
                $p = $lvl - 1
                while ($p -ge 0 -and (-not $lastOEByLevel.ContainsKey($p))) { $p-- }
                if ($p -lt 0) { $parentsByLevel[$lvl] = $rootChildren }
                else {
                    $parentOE = $lastOEByLevel[$p]
                    $childContainer = New-OEChildren $doc $oneNs
                    [void]$parentOE.AppendChild($childContainer)
                    $parentsByLevel[$lvl] = $childContainer
                }
            }
            $safe = $text -replace '[\x00-\x08\x0B\x0C\x0E-\x1F]', ''
            $html = switch ($type) {
                'h'  { "<b>" + $safe + "</b>" }
                'ul' { "• " + $safe }
                'ol' { $safe }
                'q'  { "<span style=`"color:#888`">▍ " + $safe + "</span>" }
                default { $safe }
            }
            $oe = New-OE $doc $oneNs $html
            [void]$parentsByLevel[$lvl].AppendChild($oe)
            $lastOEByLevel[$lvl] = $oe
            $deeper = @($parentsByLevel.Keys | Where-Object { $_ -gt $lvl })
            foreach ($k in $deeper) { [void]$parentsByLevel.Remove($k) }
            $deeperOE = @($lastOEByLevel.Keys | Where-Object { $_ -gt $lvl })
            foreach ($k in $deeperOE) { [void]$lastOEByLevel.Remove($k) }
        }

        [void]$outline.AppendChild($rootChildren)

        $one.UpdatePageContent($doc.OuterXml, [DateTime]::MinValue)
        Write-Host ("[onenote] replaced outline pageId={0} outlineId={1} heading='{2}' blocks={3}" -f $pageId, $outlineId, $heading, $blocks.Count)
        Send-Json -Response $response -Status 200 -Body @{ ok = $true }
    } catch {
        Send-Error -Response $response -Status 500 -Code 'onenote_error' -Detail $_.Exception.Message
    }
}

# ─── PowerPoint COM (PPTX マニュアル取り込み) ───────────────────────────────
# PPTX を 1 枚ずつ PNG + Shape テキスト + 表データへ展開し、Vision LLM が
# 解析できる形で返す。委託先環境向けに使うため Office パスワードロックは
# 利用者側で解除済みであることを前提とする。
#
# PowerPoint COM は単一スレッド前提なので、Mutex で逐次化する (relay の
# HTTP リスナは並列でリクエストを受けるため、何もしないと COM が壊れる)。

$script:PptxComMutex = New-Object System.Threading.Mutex($false, "Global\MemolaPptxCom")

function Get-PowerPointOrNull {
    try {
        try { return [Runtime.InteropServices.Marshal]::GetActiveObject('PowerPoint.Application') }
        catch { return (New-Object -ComObject PowerPoint.Application) }
    } catch { return $null }
}

# Shape を再帰的に走査して text / 表 / placeholder title を集める。
# GroupShapes 配下の子も拾うために再帰。
function Read-PptxShapes {
    param($Shapes, [System.Collections.ArrayList]$TextBlocks, [System.Collections.ArrayList]$Tables, [ref]$Title)
    foreach ($shape in $Shapes) {
        try {
            # グループは中身を再帰展開
            if ($shape.Type -eq 6 -and $shape.GroupItems) {  # msoGroup = 6
                Read-PptxShapes -Shapes $shape.GroupItems -TextBlocks $TextBlocks -Tables $Tables -Title $Title
                continue
            }
        } catch { }

        # テキスト
        try {
            if ($shape.HasTextFrame -and $shape.TextFrame.HasText) {
                $t = [string]$shape.TextFrame.TextRange.Text
                if ($t) {
                    $isTitle = $false
                    try {
                        # placeholder Type=1 は msoPlaceholderTitle、Type=13 は msoPlaceholderCenterTitle
                        if ($shape.PlaceholderFormat -and ($shape.PlaceholderFormat.Type -eq 1 -or $shape.PlaceholderFormat.Type -eq 13)) {
                            $isTitle = $true
                        }
                    } catch { }
                    if ($isTitle -and -not $Title.Value) {
                        $Title.Value = $t.Trim()
                    } else {
                        [void]$TextBlocks.Add($t)
                    }
                }
            }
        } catch { }

        # 表
        try {
            if ($shape.HasTable) {
                $rows = New-Object System.Collections.ArrayList
                $tbl = $shape.Table
                for ($r = 1; $r -le $tbl.Rows.Count; $r++) {
                    $cells = New-Object System.Collections.ArrayList
                    for ($c = 1; $c -le $tbl.Columns.Count; $c++) {
                        $txt = ''
                        try { $txt = [string]$tbl.Cell($r, $c).Shape.TextFrame.TextRange.Text } catch { }
                        [void]$cells.Add($txt.Trim())
                    }
                    [void]$rows.Add(@($cells))
                }
                [void]$Tables.Add(@($rows))
            }
        } catch { }
    }
}

# POST /memola/pptx-extract
# 入力: 生 PPTX バイナリ (Content-Type: application/octet-stream)
#       Header `X-Memola-Filename`: 元ファイル名 (任意。デバッグ用)
# 出力: { ok, slides: [{ slideNo, title, pngBase64, rawText, tables, notes }] }
function Invoke-PptxExtract {
    param([System.Net.HttpListenerContext]$Context)
    $response = $Context.Response
    $request = $Context.Request

    if ($request.HttpMethod.ToUpper() -ne 'POST') {
        Send-Error -Response $response -Status 405 -Code 'method_not_allowed' -Detail 'POST のみ受付'; return
    }

    # バイナリ受領 (大きいので memory に直読み)
    $ms = New-Object System.IO.MemoryStream
    try { $request.InputStream.CopyTo($ms) } catch {
        Send-Error -Response $response -Status 400 -Code 'read_error' -Detail $_.Exception.Message; return
    }
    $bytes = $ms.ToArray()
    $ms.Dispose()
    if ($bytes.Length -lt 100) {
        Send-Error -Response $response -Status 400 -Code 'empty_body' -Detail 'PPTX バイナリが空または極端に小さい'; return
    }

    $origName = ''
    try { $origName = [string]$request.Headers['X-Memola-Filename'] } catch { }
    if (-not $origName) { $origName = 'unknown.pptx' }

    # PowerPoint COM は単一スレッド。Mutex で待機。
    $hasLock = $false
    try { $hasLock = $script:PptxComMutex.WaitOne([TimeSpan]::FromMinutes(5)) } catch { $hasLock = $false }
    if (-not $hasLock) {
        Send-Error -Response $response -Status 503 -Code 'mutex_timeout' -Detail '他の PPTX 取り込みが進行中 (5分待っても解放されず)'; return
    }

    $tempDir = Join-Path $env:TEMP ("memola-pptx-" + [Guid]::NewGuid().ToString('N'))
    $ppt = $null
    $pres = $null
    try {
        New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
        $tempFile = Join-Path $tempDir 'input.pptx'
        [IO.File]::WriteAllBytes($tempFile, $bytes)

        $ppt = Get-PowerPointOrNull
        if (-not $ppt) {
            Send-Error -Response $response -Status 503 -Code 'no_powerpoint' -Detail 'PowerPoint を起動/接続できませんでした (Windows + PowerPoint が必要)'
            return
        }
        # 取り込み時は不可視で。WithWindow=$false が指定できない場合、最小化フォールバック。
        try { $ppt.WindowState = 2 } catch { } # ppWindowMinimized

        # Open(FileName, ReadOnly, Untitled, WithWindow)
        $pres = $ppt.Presentations.Open($tempFile, [bool]$true, [bool]$false, [bool]$false)

        $slidesOut = New-Object System.Collections.ArrayList
        $count = $pres.Slides.Count
        Write-Host ("[pptx] extract: {0} ({1} slides)" -f $origName, $count)

        for ($i = 1; $i -le $count; $i++) {
            $slide = $pres.Slides.Item($i)
            $pngPath = Join-Path $tempDir ("slide-{0}.png" -f $i)
            try { $slide.Export($pngPath, "PNG", 1920, 1080) } catch {
                Write-Host ("[pptx]   slide {0}: Export 失敗 — {1}" -f $i, $_.Exception.Message)
                continue
            }

            $textBlocks = New-Object System.Collections.ArrayList
            $tables = New-Object System.Collections.ArrayList
            $title = ''
            $titleRef = [ref]$title
            try { Read-PptxShapes -Shapes $slide.Shapes -TextBlocks $textBlocks -Tables $tables -Title $titleRef } catch { }

            # スピーカーノート (任意。HasNotesPage が false でも NotesPage は触れることがあるので try)
            $notes = ''
            try {
                if ($slide.NotesPage -and $slide.NotesPage.Shapes) {
                    foreach ($sh in $slide.NotesPage.Shapes) {
                        try {
                            if ($sh.PlaceholderFormat -and $sh.PlaceholderFormat.Type -eq 2) {  # msoPlaceholderBody
                                if ($sh.HasTextFrame -and $sh.TextFrame.HasText) {
                                    $notes = [string]$sh.TextFrame.TextRange.Text
                                    break
                                }
                            }
                        } catch { }
                    }
                }
            } catch { }

            $pngBytes = [IO.File]::ReadAllBytes($pngPath)
            $pngB64 = [Convert]::ToBase64String($pngBytes)
            Remove-Item -LiteralPath $pngPath -ErrorAction SilentlyContinue

            [void]$slidesOut.Add(@{
                slideNo   = $i
                title     = [string]$titleRef.Value
                pngBase64 = $pngB64
                rawText   = (($textBlocks -join "`n").Trim())
                tables    = @($tables)
                notes     = $notes.Trim()
            })
        }

        Write-Host ("[pptx]   done: {0} slides extracted" -f $slidesOut.Count)
        Send-Json -Response $response -Status 200 -Body @{ ok = $true; count = $slidesOut.Count; slides = @($slidesOut) }
    } catch {
        Send-Error -Response $response -Status 500 -Code 'pptx_error' -Detail $_.Exception.Message
    } finally {
        if ($pres) { try { $pres.Close() } catch { } }
        # PowerPoint 自体は Quit しない: 他のプレゼンが開いてる可能性 + 引用ジャンプで再利用するため。
        # 取り込みごとに毎回 Quit すると重い。プロセスは relay 終了時に道連れになる想定。
        try { [Runtime.InteropServices.Marshal]::ReleaseComObject($pres) | Out-Null } catch { }
        try { Remove-Item -LiteralPath $tempDir -Recurse -Force -ErrorAction SilentlyContinue } catch { }
        if ($hasLock) { try { $script:PptxComMutex.ReleaseMutex() } catch { } }
        [GC]::Collect()
    }
}

# POST /memola/pptx-open
# 入力 JSON: { fileUrl: string, slideNo: int }
#   fileUrl  : SP の絶対 URL (例: "https://contoso.sharepoint.com/sites/foo/.../manual.pptx")
#              または直接開けるローカルパス
#   slideNo  : 1-origin スライド番号
# 動作: 既に開いてれば再利用、なければ Open。GotoSlide で該当スライドへ。最前面化。
function Invoke-PptxOpen {
    param([System.Net.HttpListenerContext]$Context)
    $response = $Context.Response
    $request = $Context.Request

    if ($request.HttpMethod.ToUpper() -ne 'POST') {
        Send-Error -Response $response -Status 405 -Code 'method_not_allowed' -Detail 'POST のみ受付'; return
    }

    $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
    $bodyText = $reader.ReadToEnd()
    $reader.Close()
    $payload = $null
    try { $payload = $bodyText | ConvertFrom-Json } catch {
        Send-Error -Response $response -Status 400 -Code 'bad_json' -Detail 'JSON ボディを解釈できませんでした'; return
    }
    $fileUrl = [string]$payload.fileUrl
    $slideNo = [int]([string]$payload.slideNo)
    if (-not $fileUrl) { Send-Error -Response $response -Status 400 -Code 'bad_request' -Detail 'fileUrl 必須'; return }
    if ($slideNo -lt 1) { $slideNo = 1 }

    # Mutex (PowerPoint COM 単一スレッド)
    $hasLock = $false
    try { $hasLock = $script:PptxComMutex.WaitOne([TimeSpan]::FromMinutes(2)) } catch { $hasLock = $false }
    if (-not $hasLock) {
        Send-Error -Response $response -Status 503 -Code 'mutex_timeout' -Detail '他の PPTX 処理が進行中'; return
    }

    try {
        $ppt = Get-PowerPointOrNull
        if (-not $ppt) {
            Send-Error -Response $response -Status 503 -Code 'no_powerpoint' -Detail 'PowerPoint を起動/接続できませんでした'
            return
        }
        try { $ppt.Visible = $true } catch { }

        # 既存プレゼン検索
        $target = $null
        try {
            foreach ($p in $ppt.Presentations) {
                $fn = [string]$p.FullName
                # SP の HTTPS URL も FullName に出る (Office 2016+)
                if ($fn -ieq $fileUrl) { $target = $p; break }
                # ファイル名 fallback (URL エンコード差異など)
                try {
                    $a = Split-Path $fn -Leaf
                    $b = Split-Path $fileUrl -Leaf
                    if ($a -and $b -and ($a -ieq $b)) { $target = $p; break }
                } catch { }
            }
        } catch { }

        if (-not $target) {
            # 引用ジャンプは「出典スライドの閲覧」が目的なので ReadOnly:$true で開く。
            # オリジナルファイルを Memola 起因で書き換えないための安全策
            # (ユーザが誤って上書き保存する事故も防ぐ)。
            # Open(FileName, ReadOnly, Untitled, WithWindow)
            $target = $ppt.Presentations.Open($fileUrl, [bool]$true, [bool]$false, [bool]$true)
        }

        # ウィンドウをアクティブ化 + GotoSlide
        try { $target.Windows.Item(1).Activate() } catch { }
        try { $target.Windows.Item(1).View.GotoSlide([int]$slideNo) } catch { }

        # PowerPoint を最前面に持ってくる (Win32)
        try {
            Add-Type -Namespace MemolaPptx -Name Win -MemberDefinition @"
public static class Native {
    [System.Runtime.InteropServices.DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(System.IntPtr hWnd);
}
"@ -ErrorAction SilentlyContinue
            $hwnd = [System.IntPtr]::new([int]$target.Windows.Item(1).HWND)
            [MemolaPptx.Win+Native]::SetForegroundWindow($hwnd) | Out-Null
        } catch { }

        Write-Host ("[pptx] opened {0} at slide {1}" -f $fileUrl, $slideNo)
        Send-Json -Response $response -Status 200 -Body @{ ok = $true; fileUrl = $fileUrl; slideNo = $slideNo }
    } catch {
        Send-Error -Response $response -Status 500 -Code 'pptx_open_error' -Detail $_.Exception.Message
    } finally {
        if ($hasLock) { try { $script:PptxComMutex.ReleaseMutex() } catch { } }
    }
}


# ─── Request handler ────────────────────────────────────────────────────────

function Invoke-RelayRequest {
    param([System.Net.HttpListenerContext]$Context)

    $request  = $Context.Request
    $response = $Context.Response
    $method   = $request.HttpMethod.ToUpper()
    $ts       = (Get-Date).ToString('HH:mm:ss')
    Write-Host ("[{0}] {1} {2}" -f $ts, $method, $request.Url.PathAndQuery)

    # ── CORS preflight ──
    if ($method -eq 'OPTIONS') {
        $response.StatusCode = 204
        Add-CorsHeaders -Response $response
        $response.OutputStream.Close()
        return
    }

    # ── ローカル機能: 死活確認 ──
    $path = $request.Url.AbsolutePath
    if ($path -eq '/memola/health') {
        Send-Json -Response $response -Status 200 -Body @{ ok = $true; relay = 'corp-ai-relay'; version = 1 }
        return
    }

    # ── ローカル機能: Outlook からのメールインポート (読み取り専用) ──
    if ($path -eq '/memola/outlook/import') {
        Invoke-OutlookImport -Context $Context
        return
    }

    # ── ローカル機能: Internet-Message-Id でメールを Outlook 上に表示 ──
    if ($path -eq '/memola/outlook/open') {
        Invoke-OutlookOpen -Context $Context
        return
    }

    # ── ローカル機能: OneNote 取り込み (階層取得 / ページ抽出 / 開く) ──
    if ($path -eq '/memola/onenote/hierarchy') { Invoke-OneNoteHierarchy -Context $Context; return }
    if ($path -eq '/memola/onenote/pages')     { Invoke-OneNotePages     -Context $Context; return }
    if ($path -eq '/memola/onenote/open')      { Invoke-OneNoteOpen      -Context $Context; return }
    if ($path -eq '/memola/onenote/append')    { Invoke-OneNoteAppend    -Context $Context; return }
    if ($path -eq '/memola/onenote/current')   { Invoke-OneNoteCurrent   -Context $Context; return }
    if ($path -eq '/memola/onenote/links')     { Invoke-OneNoteLinks     -Context $Context; return }
    if ($path -eq '/memola/onenote/memola-outlines') { Invoke-OneNoteMemolaOutlines -Context $Context; return }
    if ($path -eq '/memola/onenote/replace-outline') { Invoke-OneNoteReplaceOutline -Context $Context; return }

    # ── ローカル機能: PPTX マニュアル取り込み (Vision LLM 連携用) ──
    if ($path -eq '/memola/pptx-extract') { Invoke-PptxExtract -Context $Context; return }
    if ($path -eq '/memola/pptx-open')    { Invoke-PptxOpen    -Context $Context; return }

    # ── AI 設定配信: env の MEMOLA_AI_* / MEMOLA_EMBED_* / MEMOLA_RAG_* を JSON で返す ──
    # ブラウザが起動時に取得し、ローカル設定へ反映する (外部ベクトル 流: 設定は env 集約)。
    # API キー類は意図的に含めない (各自ブラウザで入力)。
    if ($path -eq '/memola/ai-config' -and $method -eq 'GET') {
        $cfg = @{}
        if ($env:MEMOLA_AI_PROVIDER)           { $cfg['provider']         = "$env:MEMOLA_AI_PROVIDER" }
        if ($env:MEMOLA_AI_CLAUDE_MODEL)       { $cfg['claudeModel']      = "$env:MEMOLA_AI_CLAUDE_MODEL" }
        if ($env:MEMOLA_AI_CORP_MODEL)         { $cfg['corpModel']        = "$env:MEMOLA_AI_CORP_MODEL" }
        # corpBaseUrl: 明示が無ければ relay 自身を指す (ブラウザ→relay→gateway)
        if ($env:MEMOLA_AI_CORP_BASEURL)       { $cfg['corpBaseUrl']      = "$env:MEMOLA_AI_CORP_BASEURL" }
        else                                   { $cfg['corpBaseUrl']      = "http://localhost:$Port" }
        if ($env:MEMOLA_AI_CORP_DEPLOY_PREFIX) { $cfg['corpDeployPrefix'] = "$env:MEMOLA_AI_CORP_DEPLOY_PREFIX" }
        if ($env:MEMOLA_AI_LOCAL_BASEURL)      { $cfg['localBaseUrl']     = "$env:MEMOLA_AI_LOCAL_BASEURL" }
        if ($env:MEMOLA_AI_LOCAL_MODEL)        { $cfg['localModel']       = "$env:MEMOLA_AI_LOCAL_MODEL" }
        if ($env:MEMOLA_EMBED_PROVIDER)        { $cfg['embedProvider']    = "$env:MEMOLA_EMBED_PROVIDER" }
        if ($env:MEMOLA_VOYAGE_MODEL)          { $cfg['voyageModel']      = "$env:MEMOLA_VOYAGE_MODEL" }
        if ($env:MEMOLA_EMBED_MODEL)           { $cfg['embedModel']       = "$env:MEMOLA_EMBED_MODEL" }
        if ($env:MEMOLA_EMBED_APIVERSION)      { $cfg['embedApiVersion']  = "$env:MEMOLA_EMBED_APIVERSION" }
        if ($env:MEMOLA_EMBED_DIMENSIONS)      { $cfg['embedDimensions']  = "$env:MEMOLA_EMBED_DIMENSIONS" }
        if ($env:MEMOLA_RAG_TOPK)              { $cfg['ragTopK']          = "$env:MEMOLA_RAG_TOPK" }
        if ($env:MEMOLA_RAG_MINSCORE)          { $cfg['ragMinScore']      = "$env:MEMOLA_RAG_MINSCORE" }
        Send-Json -Response $response -Status 200 -Body @{ ok = $true; config = $cfg }
        return
    }

    # ── 開発者モード: ローカル dist のバンドル配信 (loader が読む) ──
    if ($path -eq '/memola/memola.bundle.js') {
        Send-StaticFile -Response $response -FilePath (Join-Path $script:BundleDir 'memola.bundle.js') -ContentType 'application/javascript; charset=utf-8'
        return
    }
    if ($path -eq '/memola/version.txt') {
        Send-StaticFile -Response $response -FilePath (Join-Path $script:BundleDir 'version.txt') -ContentType 'text/plain; charset=utf-8'
        return
    }
    if ($path -eq '/memola/bundle-dir') {
        if ($method -eq 'GET') {
            $exists = Test-Path -LiteralPath $script:BundleDir
            $hasBundle = Test-Path -LiteralPath (Join-Path $script:BundleDir 'memola.bundle.js')
            Send-Json -Response $response -Status 200 -Body @{ ok = $true; dir = "$script:BundleDir"; exists = [bool]$exists; hasBundle = [bool]$hasBundle }
            return
        }
        if ($method -eq 'POST') {
            try {
                $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
                $raw = $reader.ReadToEnd(); $reader.Dispose() | Out-Null
                $p = if ($raw) { $raw | ConvertFrom-Json } else { $null }
                $dir = "$($p.dir)".Trim()
                if ($dir) { $script:BundleDir = $dir; Write-Host "[bundle] dir set to: $dir" }
                $exists = Test-Path -LiteralPath $script:BundleDir
                $hasBundle = Test-Path -LiteralPath (Join-Path $script:BundleDir 'memola.bundle.js')
                Send-Json -Response $response -Status 200 -Body @{ ok = $true; dir = "$script:BundleDir"; exists = [bool]$exists; hasBundle = [bool]$hasBundle }
            } catch {
                Send-Json -Response $response -Status 400 -Body @{ ok = $false; error = @{ code = 'bad_request'; detail = $_.Exception.Message } }
            }
            return
        }
    }

    # ── Compose upstream URL ──
    # bookmarklet 側で baseUrl に target のパスを含めても含めなくても OK に
    # するため、incoming path 先頭が targetPath と一致したら剥がす。
    $incoming = $request.Url.PathAndQuery
    $rel = $incoming
    if ($targetPath -and $rel.StartsWith($targetPath)) {
        $rel = $rel.Substring($targetPath.Length)
        if (-not $rel) { $rel = '/' }
    }
    $upstreamUrl = $Target + $rel

    # ── Build HttpRequestMessage ──
    $httpMethod = New-Object System.Net.Http.HttpMethod($method)
    $msg = New-Object System.Net.Http.HttpRequestMessage($httpMethod, $upstreamUrl)

    if ($request.HasEntityBody) {
        $ms = New-Object System.IO.MemoryStream
        $request.InputStream.CopyTo($ms)
        $bodyBytes = $ms.ToArray()
        $ms.Dispose()
        $content = New-Object System.Net.Http.ByteArrayContent($bodyBytes, 0, $bodyBytes.Length)
        if ($request.ContentType) {
            try {
                $content.Headers.ContentType =
                    [System.Net.Http.Headers.MediaTypeHeaderValue]::Parse($request.ContentType)
            }
            catch { }
        }
        $msg.Content = $content
    }

    # header forwarding — 認証/コンテンツ系のみ転送 (Host/Connection 等は除外)。
    $forwardKeys = @(
        'api-key', 'x-api-key',
        'accept', 'authorization'
    )
    foreach ($name in $request.Headers.AllKeys) {
        if ($forwardKeys -contains $name.ToLower()) {
            $val = $request.Headers[$name]
            $msg.Headers.TryAddWithoutValidation($name, $val) | Out-Null
        }
    }

    # ── Send upstream (stream-aware) ──
    try {
        $task = $client.SendAsync(
            $msg,
            [System.Net.Http.HttpCompletionOption]::ResponseHeadersRead
        )
        $upstream = $task.GetAwaiter().GetResult()

        $response.StatusCode = [int]$upstream.StatusCode
        Add-CorsHeaders -Response $response
        $ct = $null
        if ($upstream.Content -and $upstream.Content.Headers.ContentType) {
            $ct = $upstream.Content.Headers.ContentType.ToString()
        }
        if ($ct) { $response.ContentType = $ct }
        if ($upstream.Headers.CacheControl) {
            $response.Headers.Add('Cache-Control', $upstream.Headers.CacheControl.ToString())
        }
        $sse = ($ct -and ($ct -like 'text/event-stream*'))
        if ($sse) {
            $response.SendChunked = $true
        }
        elseif ($upstream.Content.Headers.ContentLength) {
            $response.ContentLength64 = $upstream.Content.Headers.ContentLength
        }
        else {
            $response.SendChunked = $true
        }

        $upstreamStream = $upstream.Content.ReadAsStreamAsync().GetAwaiter().GetResult()
        $buffer = New-Object byte[] 1024
        while ($true) {
            $n = $upstreamStream.Read($buffer, 0, $buffer.Length)
            if ($n -le 0) { break }
            try {
                $response.OutputStream.Write($buffer, 0, $n)
                $response.OutputStream.Flush()
            }
            catch { break }   # ブラウザがキャンセル → サイレントに終了
        }
        $upstreamStream.Dispose()
        $upstream.Dispose()
    }
    catch [System.Net.Http.HttpRequestException] {
        $detail = $_.Exception.Message
        $inner = $_.Exception.InnerException
        if ($inner) { $detail += " — $($inner.Message)" }
        Send-Error -Response $response -Status 502 -Code 'upstream_error' -Detail $detail
    }
    catch {
        Send-Error -Response $response -Status 500 -Code 'relay_failed' -Detail $_.Exception.Message
    }
    finally {
        try { $response.OutputStream.Close() } catch { }
        try { $msg.Dispose() } catch { }
    }
}

# ─── Main loop ──────────────────────────────────────────────────────────────

[Console]::TreatControlCAsInput = $false

try {
    while ($listener.IsListening) {
        $ctx = $null
        try {
            $ctx = $listener.GetContext()
        }
        catch [System.Net.HttpListenerException] {
            break
        }
        if ($ctx) {
            try { Invoke-RelayRequest -Context $ctx }
            catch { Write-Warning "request handler error: $($_.Exception.Message)" }
        }
    }
}
finally {
    Write-Host ''
    Write-Host '[shutdown] stopping listener...' -ForegroundColor DarkGray
    try { $listener.Stop() } catch { }
    try { $listener.Close() } catch { }
    try { $client.Dispose() } catch { }
}
