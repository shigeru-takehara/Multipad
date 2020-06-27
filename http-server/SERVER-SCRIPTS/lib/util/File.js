var pwa = pwa || {};

/**
 * File processing functions.
 *
 * @namespace
 * @requires JavaType.js
 * @requires system/System.js
 * @requires system/Command.js
 */
pwa.file = (function () {
	var _pub = {}; // public methods holder

	/**
	 * Return ServerScriptsXYZ.log file in the OS temp directory for logging.
	 * Call pwa.file.closeLogger(logger) function to close.
	 *
	 * @memberof pwa.file
	 * @alias pwa.file.openLogger
	 * @returns {BufferedWriter} environment variable value
	 * @see closeLogger
	 */
	_pub.openLogger = function() {
		var logFile = File.createTempFile("ServerScripts", ".log");
		logger = new BufferedWriter(new FileWriter(logFile));
		return logger;
	};

	/**
	 * Close ServerScriptsXYZ.log file in the OS temp directory for logging.
	 *
	 * @memberof pwa.file
	 * @alias pwa.file.closeLogger
	 * @param {BufferedWriter} logger - opened BufferedWriter object
	 */
	_pub.closeLogger = function(logger) {
		logger.close();
	};

	/**
	 * Check if file or directory exists or not.
	 *
	 * @memberof pwa.file
	 * @alias pwa.file.checkExists
	 * @param {String} path - path to be checked
	 * @returns {boolean} true for exist; otherwise false
	 */
	_pub.checkExists = function(path) {
		return Files.exists(Paths.get(path));
	};

	/**
	 * Return the content of the file in String.
	 *
	 * @memberof pwa.file
	 * @alias pwa.file.read
	 * @param {String} fileName - file name
	 * @returns {String} file content
	 */
	_pub.read = function(fileName) {
		var bytes;
		try {
			bytes = Files.readAllBytes(Paths.get(fileName));
		} catch(e) {
			return "";
		}
		return new String(bytes);
	};

	/**
	 * Write the content to a file.
	 *
	 * @memberof pwa.file
	 * @alias pwa.file.write
	 * @param {String} fileName - file name
	 * @param {String} data - data to be written
	 */
	_pub.write = function(fileName, data) {
		var writer = new FileWriter(fileName);
		writer.write(data);
		writer.flush();
		writer.close();
	};

	/**
	 * Copy file to file.
	 *
	 * @memberof pwa.file
	 * @alias pwa.file.copy
	 * @param {CmdWinController} cmdWin - Command Window Controller object
	 * @param {String} src - source file name
	 * @param {String} dst - destination file name
	 */
	_pub.copy = function(cmdWin, src, dst) {
		var command = pwa.command.normalizePathString("copy " + src + " " +  dst);
		cmdWin.executeCommand(command + " /d /Y");
	};

	/**
	 * Delete a file. "*" can be used.
	 *
	 * @memberof pwa.file
	 * @alias pwa.file.delete
	 * @param {CmdWinController} cmdWin - Command Window Controller object
	 * @param {String} fileName - file name
	 */
	_pub.delete = function(cmdWin, fileName) {
		var command;
		if (pwa.system.isWindows()) {
			command = pwa.command.normalizePathString("del " +  fileName);
			cmdWin.executeCommand(command + " /q");
		} else {
			pwa.system.throwMethodNotImplementedException("pwa.file.deleteFile");
		}
	};

	return _pub;
}());