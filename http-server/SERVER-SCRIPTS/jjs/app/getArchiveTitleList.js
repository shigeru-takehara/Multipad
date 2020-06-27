var tempFilePrefix = "GetArchiveTitleList";

function jjsExec(args) {
	var params = pwa.process.getArgs4Jjs(args);

	var dir = pwa.system.getEnv('PWA');
	var dst = dir + '/http-server/MY-DATA/archive/list.txt';
	var content = pwa.file.read(dst);
	var lines = content.split("\n");
	var val = JSON.stringify(lines);
	return val;
}



