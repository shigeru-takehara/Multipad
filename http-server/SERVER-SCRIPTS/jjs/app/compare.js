var tempFilePrefix = "Compare";
var file1 = "TEMP/COMP_FILE_1.txt";
var file2 = "TEMP/COMP_FILE_2.txt";

function jjsExec(args) {
	var params = pwa.process.getArgs4Jjs(args);
	var content1 = params[0];
	var content2 = params[1];

	pwa.file.write(file1, content1);
	pwa.file.write(file2, content2);
	
	var cmdObjects = pwa.commandWindow.initialize(tempFilePrefix, false, false);
	cmdObjects.cmdWin.executeCommand('UTIL\\compare.bat');
	cmdObjects.cmdWait.waitForCommandDone(5); // just avoid exception in server-side
	pwa.commandWindow.close(cmdObjects);
	
	return "";
}
