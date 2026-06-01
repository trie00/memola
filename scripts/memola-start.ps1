# =============================================================================
# Memola ワンクリック起動 (Windows)
# =============================================================================
#
# やること (外部ベクトル / 別アプリ の launcher と同じ):
#   1) corp-ai-relay.ps1 (AI 中継リレー) が起動していなければ、新しい
#      PowerShell ウィンドウで立ち上げる (このスクリプトを閉じてもリレーは継続)
#   2) リレーの /memola/health が 200 を返すまで最大 10 秒待機
#   3) SharePoint サイトを既定ブラウザで開く
#   4) 「ブックマークレットを押してください」の案内ダイアログを表示
#      (TopMost + DPI-aware でブラウザの後ろに隠れない)
#
# 設定:
#   memola.env を読んで以下を解決:
#     MEMOLA_SITE_URL : SharePoint サイトの URL (任意。未設定なら起動時に入力)
#     CORP_AI_PORT    : リレーの listen ポート (既定 18080)
#
#   memola.env に MEMOLA_SITE_URL=https://<tenant>.sharepoint.com/sites/<site>
#   を書いておけば毎回プロンプトを出さずに起動可能。
#
# 起動方法:
#   - エクスプローラで memola-start.bat をダブルクリック
#   - もしくはタスクスケジューラの「ログオン時」トリガに登録して自動起動
# =============================================================================

[CmdletBinding()]
param(
    [string]$SiteUrl,
    [int]$Port,
    [string]$EnvFile
)

$ErrorActionPreference = 'Stop'

# 未捕捉エラーで即終了するとウィンドウが一瞬で閉じるので、メッセージを残す。
trap {
    Write-Host ''
    Write-Host '[memola-start] 予期しないエラーで終了します:' -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    if ($_.ScriptStackTrace) { Write-Host $_.ScriptStackTrace -ForegroundColor DarkGray }
    Read-Host '何かキーを押して終了'
    exit 1
}

# ─── memola.env 読込 (corp-ai-relay.ps1 と同じ書式) ─────────────────────────
if (-not $EnvFile) {
    $EnvFile = Join-Path $PSScriptRoot 'memola.env'
}
if (Test-Path -LiteralPath $EnvFile) {
    try {
        foreach ($raw in (Get-Content -LiteralPath $EnvFile -Encoding UTF8)) {
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
    } catch {
        Write-Warning "memola.env 読込失敗: $($_.Exception.Message)"
    }
}

# ─── SharePoint URL 解決 ───────────────────────────────────────────────────
if (-not $SiteUrl) { $SiteUrl = $env:MEMOLA_SITE_URL }
if (-not $SiteUrl) {
    Write-Host '' -NoNewline
    Write-Host 'SharePoint サイト URL が未設定です。' -ForegroundColor Yellow
    Write-Host 'memola.env に下記を追記すると次回から自動になります:'
    Write-Host '  MEMOLA_SITE_URL=https://<tenant>.sharepoint.com/sites/<site>'
    Write-Host ''
    $SiteUrl = Read-Host 'SharePoint サイト URL を入力してください (空 Enter で中止)'
}
if (-not $SiteUrl) {
    Write-Host '[memola-start] SP URL が未指定なので中止します' -ForegroundColor Yellow
    exit 1
}

# ─── ポート決定 + relay 起動状況確認 ────────────────────────────────────────
if (-not $Port) {
    $Port = if ($env:CORP_AI_PORT) { [int]$env:CORP_AI_PORT } else { 18080 }
}
$healthUrl = "http://127.0.0.1:$Port/memola/health"

function Test-RelayUp {
    param([string]$Url, [int]$TimeoutSec = 1)
    try {
        $r = Invoke-WebRequest -Uri $Url -TimeoutSec $TimeoutSec -UseBasicParsing -ErrorAction Stop
        return ($r.StatusCode -eq 200)
    } catch { return $false }
}

$relayUp = Test-RelayUp -Url $healthUrl

if (-not $relayUp) {
    Write-Host "[memola-start] リレーを新規起動 (ポート $Port)..." -ForegroundColor Cyan
    $relayPs1 = Join-Path $PSScriptRoot 'corp-ai-relay.ps1'
    if (-not (Test-Path -LiteralPath $relayPs1)) {
        Write-Host "[memola-start] エラー: $relayPs1 が見つかりません" -ForegroundColor Red
        exit 2
    }
    # 別ウィンドウで起動。-NoExit でリレーが止まってもログが残る。
    # WorkingDirectory も渡して memola.env が見つかるように。
    Start-Process -FilePath 'powershell.exe' -ArgumentList @(
        '-NoProfile',
        '-ExecutionPolicy', 'Bypass',
        '-NoExit',
        '-File', "`"$relayPs1`""
    ) -WorkingDirectory $PSScriptRoot | Out-Null

    Write-Host "[memola-start] /memola/health の応答を待機中 (最大 10 秒)..." -ForegroundColor Cyan
    $waitMs = 0
    while ($waitMs -lt 10000) {
        Start-Sleep -Milliseconds 500
        $waitMs += 500
        if (Test-RelayUp -Url $healthUrl) {
            $relayUp = $true
            Write-Host "[memola-start] リレー OK ($($waitMs) ms で起動完了)" -ForegroundColor Green
            break
        }
    }
    if (-not $relayUp) {
        Write-Host "[memola-start] 警告: リレーの起動応答を確認できませんでした。SharePoint は開きますが、relay 未起動の警告が出るかもしれません。" -ForegroundColor Yellow
    }
} else {
    Write-Host "[memola-start] リレーは既に起動済み (port $Port)" -ForegroundColor Green
}

# ─── SharePoint を既定ブラウザで開く ────────────────────────────────────────
Write-Host "[memola-start] SharePoint を開く: $SiteUrl" -ForegroundColor Cyan
try {
    Start-Process $SiteUrl | Out-Null
} catch {
    Write-Host "[memola-start] ブラウザ起動失敗: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "          手動で開いてください: $SiteUrl" -ForegroundColor Yellow
}

# ─── ブックマークレット案内ダイアログ ──────────────────────────────────────
# ブラウザの後ろに隠れず、DPI スケーリングでもくっきり出すため自前 Form を
# TopMost + DPI-aware で組む (外部ベクトル / 別アプリ と同じ作法)。
try {
    Add-Type -AssemblyName System.Windows.Forms | Out-Null
    Add-Type -AssemblyName System.Drawing       | Out-Null

    try { [System.Windows.Forms.Application]::SetHighDpiMode([System.Windows.Forms.HighDpiMode]::PerMonitorV2) | Out-Null } catch { }
    try { [System.Windows.Forms.Application]::EnableVisualStyles() } catch { }
    try { [System.Windows.Forms.Application]::SetCompatibleTextRenderingDefault($false) } catch { }

    $relayLine = if ($relayUp) {
        "リレー稼働中 (http://127.0.0.1:$Port)"
    } else {
        "リレー未確認 (起動に失敗している可能性あり)"
    }
    $msg = @"
Memola の起動準備ができました。

  $relayLine
  SharePoint をブラウザで開きました

最後の手順:
  1) 開いた SharePoint ページの読込完了を待つ
  2) お気に入りバーの「memola」ブックマークレットをクリック
  3) アプリが開けば成功

このウィンドウは閉じて OK です。
リレーは別ウィンドウで動き続けます (閉じると社内 AI / 横断検索の
中継が止まります)。
"@

    $form = New-Object System.Windows.Forms.Form
    $form.Text = 'Memola 起動完了'
    $form.StartPosition = 'CenterScreen'
    $form.FormBorderStyle = 'FixedDialog'
    $form.MinimizeBox = $false
    $form.MaximizeBox = $false
    $form.TopMost = $true
    $form.ShowInTaskbar = $true
    $form.AutoScaleMode = 'Dpi'
    $form.Font = New-Object System.Drawing.Font('Yu Gothic UI', 10)
    $form.ClientSize = New-Object System.Drawing.Size(540, 280)

    $label = New-Object System.Windows.Forms.Label
    $label.Text = $msg
    $label.AutoSize = $false
    $label.Dock = 'Fill'
    $label.Padding = New-Object System.Windows.Forms.Padding(18, 18, 18, 8)
    $label.TextAlign = 'TopLeft'
    $label.UseMnemonic = $false
    $form.Controls.Add($label)

    $panel = New-Object System.Windows.Forms.Panel
    $panel.Dock = 'Bottom'
    $panel.Height = 48
    $form.Controls.Add($panel)

    $btn = New-Object System.Windows.Forms.Button
    $btn.Text = 'OK'
    $btn.DialogResult = 'OK'
    $btn.Size = New-Object System.Drawing.Size(96, 30)
    $btn.Anchor = 'Right'
    $btn.Location = New-Object System.Drawing.Point(($form.ClientSize.Width - 96 - 18), 9)
    $panel.Controls.Add($btn)
    $form.AcceptButton = $btn
    $form.CancelButton = $btn

    $form.Add_Shown({
        $form.Activate()
        $form.BringToFront()
        $btn.Focus() | Out-Null
    })

    [void]$form.ShowDialog()
    $form.Dispose()
} catch {
    Write-Host ''
    Write-Host '[memola-start] 準備完了。ブラウザの SharePoint ページで「memola」ブックマークレットを押してください。' -ForegroundColor Green
}
