// Because this script will be in another process, we need to load library js files.
load("SERVER-SCRIPTS/lib/LoadLib.js");

var args = pwa.process.getArgs();

var content = pwa.file.read(args[1]);
pwa.file.write(args[0], content);
