// original: https://blogs.oracle.com/nashorn/http-server-written-in-nashorn

load("SERVER-SCRIPTS/lib/LoadLib.js");

var pwa = pwa || {};

/**
 * PWA Http Server.
 * @namespace
 */
pwa.httpServer = (function () {
	var _pub = {}; // public methods holder

	var SERVER_NAME = "PWA HTTP Server";
	var PORT = $ARG[0];
	var CRLF = "\r\n";
	var FOUROHFOUR = "<HTML><HEAD><TITLE>404 Not Found</TITLE></HEAD><BODY><P>404 Not Found</P></BODY></HTML>";

	print("PWA port# = [" + PORT + "] Please close this if you are done.");
	var startPage = pwa.system.getEnv("START_PAGE");
	if (startPage) print("PWA start web page = [" + startPage + "] Please close this if you are done.");

	/**
	 * Stop PWA Http Server.
	 *
	 * @memberof pwa.httpServer
	 * @alias pwa.httpServer.stop
	 */
	_pub.stop = function() {
		pwa.process.stopHttpServerWithPortNumber(PORT);
	};

	/**
	 * Start PWA Http Server.
	 *
	 * @memberof pwa.httpServer
	 * @alias pwa.httpServer.start
	 */
	_pub.start = function() {
		var serverSocket = new ServerSocket(PORT);
		while (true) {
			var socket = serverSocket.accept();
			try {
				var thread = new Thread(function() { httpRequestHandler(socket); });
				thread.start();
				Thread.sleep(100);
			} catch (e) {
				print(e);
				TimeUnit.SECONDS.sleep(1);
			}
		}
	};

	/**
	 * Manage HTTP Request. Support only GET method.
	 *
	 * @private
	 * @memberof pwa.httpServer
	 * @param socket - TCP/IP socket
	 */
	var httpRequestHandler = function(socket) {
		var out       = socket.getOutputStream();
		var output    = new PrintWriter(out);
		var inReader  = new InputStreamReader(socket.getInputStream(), 'utf-8');
		var bufReader = new BufferedReader(inReader);
		var lines = readLines(bufReader);
		if (lines.length > 0) {
	//		printLines(lines);
			var header = lines[0].split(/\b\s+/);
			if (header[0] == "GET") {
				header[1] = header[1].indexOf("?") > 0 ? header[1]: header[1] + "?";
				var URI = header[1].split(/\?/);
				var path = new String("./SERVER-SCRIPTS/jjs" + URI[0]);
				try {
					if (path.endsWith(".jjs")) {
						load(path.replace(".jjs", ".js")); // there is no ".jjs" file but actually it's ".js" file.
						var param = URI[1].split(/\s+/); // remove "HTTP/1.X" at the end of line
						respond(output, "HTTP/1.0 200 OK", "application/json", jjsExec(param[0] != null ? param[0] : null));
					} else {
						var param = URI[0].split(/\s+/);
						if (param[0] === "/") {
							param[0] += "index.html";
						}
						path = new String("./WEB-INF" + param[0]);
						sendFile(output, out, path);
					}
				} catch (e) {
					print(e.message);
					respond(output, "HTTP/1.0 404 Not Found", "text/html", FOUROHFOUR);
				}
			}
		}
		output.flush();
		bufReader.close();
		socket.close();
	};

	/**
	 * Respond HTTP Request.
	 *
	 * @private
	 * @memberof pwa.httpServer
	 * @param output - HTTP PrintWriter
	 * @param status - HTTP Status
	 * @param type - HTTP Content-Type
	 * @param body - Response data
	 */
	var respond = function(output, status, type, body) {
		sendBytes(output, status + CRLF);
		sendBytes(output, SERVER_NAME + CRLF);
		sendBytes(output, "Content-type: " + type + CRLF);
		sendBytes(output, "Content-Length: ${body.length}" + CRLF);
		sendBytes(output, CRLF);
		sendBytes(output, body);
	};

	/**
	 * Manage Content-Type.
	 *
	 * @private
	 * @memberof pwa.httpServer
	 * @param path - file name
	 * @returns content-type
	 */
	var contentType = function(path) {
		if (path.endsWith(".htm") ||
			path.endsWith(".html")) {
		  return "text/html";
		} else if (path.endsWith(".txt")) {
		  return "text/text";
		} else if (path.endsWith(".css")) {
		  return "text/css";
		} else if (path.endsWith(".jpg") ||
				   path.endsWith(".jpeg")) {
		  return "image/jpeg";
		} else if (path.endsWith(".gif")) {
		  return "image/gif";
		} else {
		  return "application/octet-stream";
		}
	};

	/**
	 * Read HTTP Request inputStream.
	 *
	 * @private
	 * @memberof pwa.httpServer
	 * @param bufReader - HTTP BufferedReader
	 */
	var readLines = function(bufReader) {
		var lines = [];
		try {
			var line;
			while (line = bufReader.readLine()) {
				lines.push(line);
			}
		} catch (e) {
		}
		return lines;
	};

	/**
	 * Write data to HTTP output stream.
	 *
	 * @private
	 * @memberof pwa.httpServer
	 * @param output - HTTP PrintWriter
	 * @param line - data to be written to output
	 */
	var sendBytes = function(output, line) {
		output.write(new String(line));
	};

	/**
	 * Write file's data to HTTP output stream.
	 *
	 * @private
	 * @memberof pwa.httpServer
	 * @param output - HTTP PrintWriter; used for write out HTTP response header information
	 * @param out - HTTP outputStream, which is the same object as output; used for write out file's content
	 * @param line - data to be written to output
	 */
	var sendFile = function(output, out, path) {
		var file = new FileInputStream(path);
		var type = contentType(path);
		sendBytes(output, "HTTP/1.0 200 OK" + CRLF);
		sendBytes(output, SERVER_NAME + CRLF);
		sendBytes(output, "Content-type: " + type + CRLF);
		sendBytes(output, "Content-Length: " + file.available() + CRLF);
		sendBytes(output, CRLF);
		output.flush();
		var buffer = new ByteArray(1024);
		var bytes = 0;
		while ((bytes = file.read(buffer)) != -1) {
			out.write(buffer, 0, bytes);
		}
	};

	/**
	 * Print lines data for Debug purpose.
	 *
	 * @private
	 * @memberof pwa.httpServer
	 * @param line - data to be printed
	 */
	var printLines = function(lines) {
		for(var i=0; i<lines.length; i++) {
			print(i + ":[" + lines[i] + "]");
		}
	};

	return _pub;
}());

pwa.httpServer.start();