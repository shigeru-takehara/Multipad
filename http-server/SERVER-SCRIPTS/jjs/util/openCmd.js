function jjsExec(args) {
	var params = pwa.process.getArgs4Jjs(args);
	var path = params[0];
	var cmd = params[1];

	if (cmd == 'undefined') {  // avoid "undefined"
		cmd = '';
	}

	if (cmd) {
		CmdWinOpener.main(['cd ' + path + ' ^&^& ' + cmd]);
	}
	else {
		CmdWinOpener.main(['cd ' + path]);
	}

	return '';
}