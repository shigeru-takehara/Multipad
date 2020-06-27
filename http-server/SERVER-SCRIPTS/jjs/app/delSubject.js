var tempFilePrefix = "DelSubject";

var subjectName;
var subjectNameNoSpace;
var dir;
var cmdObjects;

function jjsExec(args) {
	var params = pwa.process.getArgs4Jjs(args);
	subjectName = params[0];
	archive = params[1];
	subjectNameNoSpace = subjectName.replace(/\s+/g, '');

	if (archive) {
		tempFilePrefix = "ArchiveSubject";
	}

	cmdObjects = pwa.commandWindow.initialize(tempFilePrefix, false, false);
	dir = pwa.system.getEnv('PWA');

	deleteSubjectHTML();
	deleteSubjectJS();
	deleteSubjectLoadLibJS();
	if (archive) {
		archiveData();
	} else {
		deleteData();
	}

	updateIndexHTML();

	pwa.commandWindow.close(cmdObjects);

	return "";
}

function archiveData() {
	updateArchiveList();
	
	var srcFileName = 'rec' + subjectNameNoSpace + '.*'
	var src = dir + '/http-server/MY-DATA/' + srcFileName;

	var dst = dir + '/http-server/MY-DATA/archive';
	
	pwa.file.copy(cmdObjects.cmdWin, src, dst);
	deleteData();
}

function updateArchiveList() {
	var fileName = dir + '/http-server/MY-DATA/archive/list.txt';
	var content = pwa.file.read(fileName);
	if (content.length == 0) {
		content = subjectName;
	} else {
		content +=  "\n" + subjectName;
	}
	pwa.file.write(fileName, content);
}

function deleteData() {
	var dstFileName = 'rec' + subjectNameNoSpace + '.*'
	var dst = dir + '/http-server/MY-DATA/' + dstFileName;
	pwa.file.delete(cmdObjects.cmdWin, dst);
}

/**
 * Delete recXXX.html.
 */
function deleteSubjectHTML() {
	var dstFileName = 'rec' + subjectNameNoSpace + '.html'
	var dst = dir + '/http-server/WEB-INF/' + dstFileName;
	pwa.file.delete(cmdObjects.cmdWin, dst);
}

/**
 *	Delete a line <li><a href="recXXX.html">CPP</a></li>.
 */
function updateIndexHTML() {
	var dst = dir + '/http-server/WEB-INF/index.html';
	var content = pwa.file.read(dst);
	var old = '<li><a href="rec' + subjectNameNoSpace + '.html">' + subjectName + '</a></li>\n';
	content = content.replace(old, "");
	pwa.file.write(dst, content);
}

/**
 * Delete rec-XXX.js.
 */
 function deleteSubjectJS() {
	var dstFileName = 'rec-' + subjectNameNoSpace + '.js'
	var dst = dir + '/http-server/WEB-INF/js/app/' + dstFileName;
	pwa.file.delete(cmdObjects.cmdWin, dst);
}

/**
 * Delete XXXLoadLib.js.
 */
function deleteSubjectLoadLibJS() {
	var dstFileName = subjectNameNoSpace + 'LoadLib.js'
	var dst = dir + '/http-server/SERVER-SCRIPTS/jjs/app/' + dstFileName;
	pwa.file.delete(cmdObjects.cmdWin, dst);
}
