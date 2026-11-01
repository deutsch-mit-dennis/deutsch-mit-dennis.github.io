@echo off
rem Drag a .txt or .md file onto this file: the MP3 in Dennis' voice is created next to it.
chcp 65001 >nul
if "%~1"=="" (
  echo Ziehe eine .txt- oder .md-Datei mit der Maus auf diese Datei.
  pause
  exit /b
)
for %%F in (%*) do python "%~dp0speak.py" "%%~F"
pause
