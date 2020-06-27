@echo off

setlocal

cd http-server
jjs -cp %JAR_PATHS% HttpServer.js -scripting -- %1

endlocal
cd ..