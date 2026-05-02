@echo off
rem n365 corp-AI relay launcher (Windows)
rem
rem 環境変数を編集して使ってください。タスクスケジューラに登録すれば
rem ログオン時に自動で起動できます。

set CORP_AI_TARGET=https://gateway.example.com/myapi
set CORP_AI_PROXY=http://onprem-proxy.example.com:8080
set CORP_AI_PORT=18080

python "%~dp0corp-ai-relay.py"
pause
