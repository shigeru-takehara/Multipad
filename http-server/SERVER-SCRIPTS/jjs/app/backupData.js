function jjsExec(args) {
	var args = pwa.process.getArgs4Jjs(args);
	var fileName = 'MY-DATA/' + JSON_FILE;
	var data = pwa.file.read(fileName);
	pwa.file.write(fileName + ".bak", data);
	return "";
}

