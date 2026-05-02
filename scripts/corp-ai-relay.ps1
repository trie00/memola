# n365 corp-AI relay launcher (Windows / PowerShell)
#
# 環境変数を編集して使ってください。
# タスクスケジューラの「ログオン時」トリガで起動するのもおすすめです。

$env:CORP_AI_TARGET = 'https://gateway.example.com/customapi'
$env:CORP_AI_PROXY  = 'http://onprem-proxy.example.com:8080'
$env:CORP_AI_PORT   = '18080'

python "$PSScriptRoot\corp-ai-relay.py"
