function jjsExec(args) {
	var args = pwa.process.getArgs4Jjs(args);
	var src = args[0];
	var dst = args[1];
	CmdWinOpener.main(['xcopy ' + src + ' ' + dst + ' /s /d /q /Y']);
	return '';
}