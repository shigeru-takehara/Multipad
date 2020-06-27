var pwa = pwa || {};

/**
 * Methods in this object return OS (Windows or Linux) specific command string.
 *
 * @namespace
 * @requires JavaType.js
 * @requires system/System.js
 */
pwa.command = (function () {
	var _pub = {}; // public methods holder

	/**
	 * Remove directory with Windows.
	 *
	 * @private
	 * @memberof pwa.command
	 * @alias pwa.command.removeDirectoryWindows
	 * @param {String} path - path to be removed.
	 */
	var removeDirectoryWindows = function(path) {
		var cmd = "rmdir " + path; 
		cmd = cmd.replace(/\//g, "\\\\"); // window's command does not like slash.
		return cmd + " /s /q";
	};

	/**
	 * Remove directory with Linux.
	 *
	 * @private
	 * @memberof pwa.command
	 * @alias pwa.command.removeDirectoryLinux
	 * @param {String} path - path to be removed.
	 */
	var removeDirectoryLinux = function(path) {
		pwa.system.throwMethodNotImplementedException("removeDirectoryLinux");
	};

	/**
	 * Change directory and run a command with Windows.
	 *
	 * @private
	 * @memberof pwa.command
	 * @alias pwa.command.changeDirectoryAndRunCommandWindows
	 * @param {String} path - path to be removed.
	 * @param {String} cmd - executing command
	 */
	var changeDirectoryAndRunCommandWindows = function(path, cmd) {
		cmd = 'cd ' + path + ' ^&^& ' + cmd;
		return cmd.replace(/\//g, "\\"); // window's command does not like slash.
	};

	/**
	 * Change directory and run a command with Linux.
	 *
	 * @private
	 * @memberof pwa.command
	 * @alias pwa.command.changeDirectoryAndRunCommandLinux
	 * @param {String} path - path to be removed.
	 * @param {String} cmd - executing command
	 */
	var changeDirectoryAndRunCommandLinux = function(path, cmd) {
		pwa.system.throwMethodNotImplementedException("changeDirectoryAndRunCommandLinux");
	};

	/**
	 * Return a command to open command or shell window.
	 *
	 * @memberof pwa.command
	 * @alias pwa.command.getCommandWindow
	 * @returns "cmd" or "bash" based on the current OS type
	 */
	_pub.getCommandWindow = function() {
		if (pwa.system.isWindows()) {
			return "cmd";
		}
		else {
			return "bash";
		}
	};

	/**
	 * Return a command to remove a directory.
	 *
	 * @memberof pwa.command
	 * @alias pwa.command.removeDirectory
	 * @param {String} path - removing path
	 */
	_pub.removeDirectory = function(path) {
		if (pwa.system.isWindows()) {
			return removeDirectoryWindows(path);
		}
		else {
			return removeDirectoryLinux(path);
		}
	};

	/**
	 * Return a command to change a current directory and then run a command.
	 *
	 * @memberof pwa.command
	 * @alias pwa.command.changeDirectoryAndRunCommand
	 * @param {String} path - changing path
	 * @param {String} cmd - executing command
	 */
	_pub.changeDirectoryAndRunCommand = function(path, cmd) {
		if (pwa.system.isWindows()) {
			return changeDirectoryAndRunCommandWindows(path, cmd);
		}
		else {
			return changeDirectoryAndRunCommandLinux(path, cmd);
		}
	};

	/**
	 * Return a path string for the current OS.
	 *
	 * @memberof pwa.command
	 * @alias pwa.command.normalizePathString
	 * @param {String} path - normalizing path value
	 * @returns {String} normalized path value
	 */
	_pub.normalizePathString = function(path) {
		if (pwa.system.isWindows()) {
			return path.replace(/\//g, "\\"); // window's command does not like slash.
		}
		else {
			pwa.system.throwMethodNotImplementedException("normalizePathString");
		}
	};

	return _pub;
}());