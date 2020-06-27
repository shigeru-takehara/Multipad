function jjsExec(args) {
	var localCmdLogger = new CmdLogger();

	var params = pwa.process.getArgs4Jjs(args);
	print("[getStatusLog.js] param2 = " + params);
	if (params.length > 0) {
		localCmdLogger.setLogFilePrefix(params[0]);
	}

	var contents = localCmdLogger.getLastLogContents();
	return contents;
}
