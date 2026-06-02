@echo off
REM ============================================================================
REM Memola AI relay launcher (relay only / Pure PowerShell)
REM ============================================================================
REM
REM NOTE: Keep this .bat ASCII-only. cmd.exe parses .bat files using the system
REM ANSI code page (CP932 on JP Windows), not UTF-8. Japanese in REM/echo lines
REM gets mis-decoded. All Japanese messages live in corp-ai-relay.ps1 (PowerShell
REM reads UTF-8-with-BOM correctly).
REM
REM This starts ONLY the AI relay (localhost:18080). It does NOT open the
REM SharePoint site. For the one-click "relay + open site" launcher, use
REM memola-start.bat instead.
REM
REM First-time setup:
REM   copy memola.env.example memola.env
REM   notepad memola.env
REM
REM Double-click to launch, or register in Task Scheduler ("At log on").
REM ============================================================================

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0corp-ai-relay.ps1" %*
pause
