var Pattern = Java.type("java.util.regex.Pattern");
var Matcher = Java.type("java.util.regex.Matcher");

var tempFilePrefix = "GetTitleList";
var REGEX_STRING = "[^<]*<li><a href=[^>]+>([^<]+)</a></li>.*$";
var pattern = Pattern.compile(REGEX_STRING);


function jjsExec(args) {
	var params = pwa.process.getArgs4Jjs(args);

	var dir = pwa.system.getEnv('PWA');

	var result={};
	
	var dst = dir + '/http-server/WEB-INF/index.html';
	var content = pwa.file.read(dst);
	var lines = content.split("\n");
	var line;
	var count = 0;
	for(var i=0; i<lines.length; i++) {
		line = lines[i];
		if (line.indexOf("<li>") > -1) {
			var matcher = pattern.matcher(line);
			if (matcher.find()) {
				result[count++] = matcher.group(1);
			}
		}
	}
	var val = JSON.stringify(result);
	return val;
}



