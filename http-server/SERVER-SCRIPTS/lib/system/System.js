var pwa = pwa || {};

/**
 * System related functions.
 *
 * @namespace
 * @requires JavaType.js
 */
pwa.system = (function () {
	var _pub = {}; // public methods holder

	/**
	 * Separator used for REST API's response. Usualy it is used to update multiple parts
	 * of the current HTML.
	 *
	 * @memberof pwa.system
	 * @alias pwa.system.DATA_SEPARATOR
	 */
	_pub.DATA_SEPARATOR = '!=====!';

	/**
	 * Return environment variable value.
	 *
	 * @memberof pwa.system
	 * @alias pwa.system.getEnv
	 * @param {String} name - environment variable name
	 * @returns {String} environment variable value
	 */
	_pub.getEnv = function(name) {
		return System.getenv(name);
	};

	/**
	 * Return OS Name.
	 *
	 * @memberof pwa.system
	 * @alias pwa.system.getOSName
	 * @returns {String} OS Name
	 */
	_pub.getOSName = function(){
		return System.getProperty("os.name");
	};


	/**
	 * Return OS temporary directory.
	 *
	 * @memberof pwa.system
	 * @alias pwa.system.getTempDir
	 * @returns {String} OS temporary directory
	 */
	_pub.getTempDir = function() {
		return System.getProperty("java.io.tmpdir");
	};

	/**
	 * Return the current directory.
	 *
	 * @memberof pwa.system
	 * @alias pwa.system.getCurrentDir
	 * @param {CmdWinController} cmdWin - Command Window Controller object
	 * @returns {String} current directory
	 */
	_pub.getCurrentDir = function(cmdWin) {
		var currentFlag = cmdWin.isLogFlag();
		cmdWin.setLogFlag(true); // because cmdWin.getCommandResult() is used below
		cmdWin.executeCommand("pwd");
		var result = cmdWin.getCommandResult();
		cmdWin.setLogFlag(currentFlag);
		return result.get(0);
	};

	/**
	 * Throw an Exception that notifies the current called method is not implemented.
	 *
	 * @memberof pwa.system
	 * @alias pwa.system.throwMethodNotImplementedException
	 * @param {String} methodName - method name called and not implemented
	 * @throws {Exception}
	 */
	_pub.throwMethodNotImplementedException = function(methodName) {
		throw new Exception("Method:" + methodName + " Not Implemented");
	}

	/**
	 * Return true if the current OS is Windows.
	 *
	 * @memberof pwa.system
	 * @alias pwa.system.isWindows
	 * @returns {boolean} true for Windows otherwise false
	 */
	_pub.isWindows = function() {
		return pwa.system.getOSName().indexOf("Windows") > -1;
	};

	/**
	 * Return an available TCP/IP port between 8080 and 8100.
	 *
	 * @memberof pwa.system
	 * @alias pwa.system.getAvailableTCPIPPort
	 * @returns {int} port#, -1 for no port available
	 */
	_pub.getAvailableTCPIPPort = function() {
		for(var i=8080; i<8101; i++) {
			if (PortFinder.available(i)) {
				return i;
			}
		}
		return -1;
	};

	return _pub;
}());