/**
 * Load all library js files.<br>
 * This is called from HttpServer.js or Javascirpts that are executed from another process<br>
 */
var pwa = pwa || {};

load("SERVER-SCRIPTS/lib/JavaType.js");

load("SERVER-SCRIPTS/lib/system/System.js");
load("SERVER-SCRIPTS/lib/system/Command.js");
load("SERVER-SCRIPTS/lib/system/Process.js");

load("SERVER-SCRIPTS/lib/util/File.js");
load("SERVER-SCRIPTS/lib/util/Properties.js");
load("SERVER-SCRIPTS/lib/util/CommandWindow.js");

load("SERVER-SCRIPTS/lib/myLib/LoadMyLib.js");
