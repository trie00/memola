@echo off
REM ============================================================================
REM Memola one-click launcher (Windows)
REM ============================================================================
REM
REM NOTE: Keep this .bat ASCII-only. cmd.exe parses .bat files using the system
REM ANSI code page (CP932 on JP Windows), not UTF-8. Japanese in REM/echo lines
REM gets mis-decoded. All Japanese messages live in memola-start.ps1 (PowerShell
REM reads UTF-8-with-BOM correctly).
REM
REM What it does (same as 外部ベクトル / 別アプリ launchers):
REM   1) Start corp-ai-relay.ps1 (AI relay) in a new window if not running
REM   2) Wait for /memola/health to respond
REM   3) Open the SharePoint site in the default browser
REM   4) Show a popup reminding to click the bookmarklet
REM
REM First-time setup:
REM   copy memola.env.example memola.env
REM   notepad memola.env        (set CORP_AI_TARGET / MEMOLA_SITE_URL etc.)
REM
REM Double-click to launch, or register in Task Scheduler ("At log on").
REM (To run ONLY the relay without opening the site, run corp-ai-relay.bat.)
REM ============================================================================

setlocal
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0memola-start.ps1" %*
set EC=%errorlevel%
if not "%EC%"=="0" (
    echo.
    echo [memola-start] ----------------------------------------------------------
    echo [memola-start] PowerShell exited with code %EC%
    echo [memola-start] See messages above for the cause.
    echo [memola-start] ----------------------------------------------------------
    pause
)
endlocal
