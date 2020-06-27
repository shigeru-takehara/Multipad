/**
 * Java classes.
 * This is called only from LoadLib.js.
 */
var pwa = pwa || {};

var ArrayList = Java.type('java.util.ArrayList');

var BufferedReader = Java.type("java.io.BufferedReader");
var BufferedWriter = Java.type("java.io.BufferedWriter");
var ByteArray = Java.type("byte[]");

var Exception = Java.type("java.lang.Exception");

var File = Java.type("java.io.File");
var Files = Java.type("java.nio.file.Files");
var FileInputStream = Java.type("java.io.FileInputStream");
var FileOutputStream = Java.type("java.io.FileOutputStream");
var FileWriter = Java.type("java.io.FileWriter");

var InputStreamReader = Java.type("java.io.InputStreamReader");

var Paths = Java.type("java.nio.file.Paths");
var PrintWriter = Java.type("java.io.PrintWriter");
var ProcessBuilder = Java.type('java.lang.ProcessBuilder');
var Properties = Java.type('java.util.Properties');

var ServerSocket = Java.type("java.net.ServerSocket");
var String = Java.type("java.lang.String");
var System = Java.type("java.lang.System");

var Thread= Java.type("java.lang.Thread");
var TimeUnit = Java.type("java.util.concurrent.TimeUnit");

var URLDecoder = Java.type("java.net.URLDecoder");

// PWA classes
var CmdLogger = Java.type('pwa.util.CmdLogger');
var CmdWait = Java.type('pwa.util.CmdCompletionChecker');
var CmdWin = Java.type('pwa.util.CmdWinController');
var CmdWinOpener = Java.type('pwa.util.CmdWinOpener');
var PortFinder = Java.type('pwa.util.PortFinder');
