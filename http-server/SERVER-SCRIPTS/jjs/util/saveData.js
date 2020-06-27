function jjsExec(args) {
	var params = pwa.process.getArgs4Jjs(args);
	var file = File.createTempFile("saveData", null);
    file.deleteOnExit();
	var writer = new FileWriter(file);
	writer.write(params[1]);
	writer.close();
	
    params[0] = encodeURI(params[0]);
    params[1] = encodeURI(file.getAbsolutePath());
	args = params[0] + '&' + params[1];

	return pwa.process.runAsync("SERVER-SCRIPTS/js/saveDataAsync.js", args);
}

