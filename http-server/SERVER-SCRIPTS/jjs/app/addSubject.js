var tempFilePrefix = "AddSubject";

var subjectName;
var subjectNameNoSpace;
var dir;

function jjsExec(args) {
	var params = pwa.process.getArgs4Jjs(args);
	subjectName = params[0];
	var restore = params[2];
	subjectNameNoSpace = subjectName.replace(/\s+/g, '');

	dir = pwa.system.getEnv('PWA');

	addNewSubjectHTML();
	addNewSubjectJS();
	addNewSubjectLoadLibJS();

	updateIndexHTML();
	
	if (params[1]) {
		subjectNameNoSpaceSrc = params[1].replace(/\s+/g, '');
		copyDataFile(subjectNameNoSpaceSrc, subjectNameNoSpace);
	}

	if (restore) {
		copyDataFileForRestore(subjectNameNoSpace);
	}

	return "";
}

function copyDataFileForRestore(val) {
		src = dir + '/http-server/MY-DATA/archive/rec' + val + '.json';
		dst = dir + '/http-server/MY-DATA/rec' + val + '.json';
		copyFile(src, dst);
		src = src + ".bak";
		dst = dst + ".bak";
		copyFile(src, dst);
		removeFromArchiveList(val);
}

function removeFromArchiveList(val) {
	var fileName = dir + '/http-server/MY-DATA/archive/list.txt';
	var content = pwa.file.read(fileName);
	content = content.replace(subjectName + "\n", "");
	pwa.file.write(fileName, content);
}

function copyDataFile(src, dst) {
		src = dir + '/http-server/MY-DATA/rec' + src + '.json';
		dst = dir + '/http-server/MY-DATA/rec' + dst + '.json';
		copyFile(src, dst);
}

function copyFile(src, dst) {
	var content = pwa.file.read(src);
	pwa.file.write(dst, content);
}

function copyAndUpdate(src, dst, addtionalContent) {
	copyFile(src, dst);
	var content = pwa.file.read(dst);
	content += addtionalContent;
	pwa.file.write(dst, content);
}

/**
 * First copy recBase.html to recXXX.html.
 * Then add the following three lines to the new bat file:
 *	<script src="/js/app/rec-XXX.js"></script>
 *	<script src="/js/app/comp-rec.js"></script>
 *  </html>
 */
function addNewSubjectHTML() {
	var dstFileName = 'rec' + subjectNameNoSpace + '.html'
	var dst = dir + '/http-server/WEB-INF/' + dstFileName;
	var addtionalContent = '\n<script src="/js/app/rec-' + subjectNameNoSpace + '.js"></script>\n<script src="/js/app/comp-rec.js"></script>\n' +
							'<script src="/js/app/comp-rec-util.js"></script>\n' +
							'</html>';
	copyAndUpdate('./WEB-INF/recBase.html', dst, addtionalContent);
}

/**
 * Replace the following line with two new lines.
 *   <!-- ###NEW-SUBJECT### -->
 * The two new lines will be like:
 *	<li><a href="recXXX.html">CPP</a></li>
 *  <!-- ###NEW-SUBJECT### -->
 */
function updateIndexHTML() {
	var dst = dir + '/http-server/WEB-INF/index.html';
	var content = pwa.file.read(dst);
	var old = "<!-- ###NEW-SUBJECT### -->";
	var newVal = '<li><a href="rec' + subjectNameNoSpace + '.html">' + subjectName + '</a></li>\n<!-- ###NEW-SUBJECT### -->';
	content = content.replace(old, newVal);
	pwa.file.write(dst, content);
}

/**
 * First copy rec-Base.js to rec-XXX.js.
 * Then add the following four lines to the new bat file:
 * var REC_TITLE = "XXX Memo";
 * var JSON_FILE = 'recXXX.json';
 * var STATUS_LOG_PREFIX = "RecXXX";
 * var REC_LOAD_LIB = 'app/XXXLoadLib.jjs';
 */
 function addNewSubjectJS() {
	var dstFileName = 'rec-' + subjectNameNoSpace + '.js'
	var dst = dir + '/http-server/WEB-INF/js/app/' + dstFileName;
	var addtionalContent = '\n';
	addtionalContent += 'var REC_TITLE = "' + subjectName + '";\n';
	addtionalContent += 'var JSON_FILE = "rec' + subjectNameNoSpace + '.json";\n';
	addtionalContent += 'var STATUS_LOG_PREFIX = "Rec' + subjectNameNoSpace + '";\n';
	addtionalContent += 'var REC_LOAD_LIB = "app/' + subjectNameNoSpace + 'LoadLib.jjs";\n';
	
	copyAndUpdate('./WEB-INF/js/app/rec-Base.js', dst, addtionalContent);
}

/**
 * First copy baseLoadLib.js to XXXLoadLib.js.
 * Then add the following one line to the new bat file:
 * var JSON_FILE = 'recXXX.json';
 */
function addNewSubjectLoadLibJS() {
	var dstFileName = subjectNameNoSpace + 'LoadLib.js'
	var dst = dir + '/http-server/SERVER-SCRIPTS/jjs/app/' + dstFileName;
	var addtionalContent = '\n';
	addtionalContent += 'var JSON_FILE = "rec' + subjectNameNoSpace + '.json";\n';
	
	copyAndUpdate('./SERVER-SCRIPTS/jjs/app/baseLoadLib.js', dst, addtionalContent);
}


/*
1. root/http-server/WEB-INF dir:
- update index.html
- add recXXX.html and update inside.

2. root/http-server/WEB-INF/js/app dir:
- add recXXX.js file and update inside.

3. root/http-server/SERVER-SCRIPTS/jjs/app dir:
- add XXXLoadLib.js file and update inside.
*/