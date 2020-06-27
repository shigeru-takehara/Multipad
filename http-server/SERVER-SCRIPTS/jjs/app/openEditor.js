var DocumentBuilder = Java.type("javax.xml.parsers.DocumentBuilder");
var DocumentBuilderFactory = Java.type("javax.xml.parsers.DocumentBuilderFactory");
var ByteArrayInputStream = Java.type("java.io.ByteArrayInputStream");

var tempFilePrefix = "PrintPretty";
var file_part1 = "TEMP/EDIT_FILE_";
var file_part2 = ".txt";
var file_part3 = ".xml";

function jjsExec(args) {
	var params = pwa.process.getArgs4Jjs(args);
	var index = params[0];
	var content = params[1];
	var file_ext;
	if (validateXml(content)) {
		file_ext =  file_part3;
	} else {
		file_ext =  file_part2;
	}
	pwa.file.write(file_part1 + index + file_ext, content);
	
	var cmdObjects = pwa.commandWindow.initialize(tempFilePrefix, false, false);
	cmdObjects.cmdWin.executeCommand('UTIL\\edit.bat ' + index + ' ' + file_ext);
	cmdObjects.cmdWait.waitForCommandDone(5); // just avoid exception in server-side
	pwa.commandWindow.close(cmdObjects);
	
	return "";
}

function validateXml(content) {
	var factory = DocumentBuilderFactory.newInstance();
	var is = new ByteArrayInputStream(content.getBytes());
	var builder = factory.newDocumentBuilder();

	try {
		builder.parse(is);
	} catch(e) {
		return false;
	}
	return true;
}
