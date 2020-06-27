@echo off

set PWA_BUILD_JAVA_HOME=c:\\java\\corretto_jdk1.8.0_212
set PWA=%CD%

if "%JAR_PATHS%" == "" set JAR_PATHS=pwa.jar

jjs -cp ./http-server/pwa.jar findPort.js

set /p PWA_PORT=<http-server/TEMP/PORT.txt
start /min cmd.exe /c startPWABase.bat %PWA_PORT%

start "" http://localhost:%PWA_PORT%/%1
echo http://localhost:%PWA_PORT%/%1