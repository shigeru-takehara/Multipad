var pwa = pwa || {};

/**
 * Methods in this object are command/shell window processing handlers.
 *
 * @namespace
 * @requires JavaType.js
 * @requires system/System.js
 * @requires system/Command.js
 */
pwa.commandWindow = (function () {
	var _pub = {}; // public methods holder

	/**
	 * Initialize cmdWin, cmdWait, and cmdLogger objects.
	 *
	 * @memberof pwa.commandWindow
	 * @alias pwa.commandWindow.initialize
	 * @param {String} localTempFilePrefix - temporary file prefix; Optional
	 * @param {boolean} printFlag - print out command input and output during the command execution 
	 * @param {boolean} logFlag - true if cmdWin.getCommandResult method needs to be called during the command execution 
	 * @returns {Object} cmdWin, cmdWait, and cmdLogger objects are returned
	 */
	_pub.initialize = function(localTempFilePrefix, printFlag, logFlag) {
		var cmdWin;
		var cmdWait;
		var cmdlogger;
		var tempFilePrefix;
		var tempPrintFlag;
		var tempLogFlag;
		
		if (localTempFilePrefix) {
			tempFilePrefix = localTempFilePrefix;
		}

		cmdWin = new CmdWin();
		cmdWin.setPrintFlag(printFlag);
		cmdWin.setLogFlag(logFlag);

		if (tempFilePrefix) {
			cmdWin.startCommandWindow(pwa.command.getCommandWindow(), tempFilePrefix);
		}
		else {
			cmdWin.startCommandWindow(pwa.command.getCommandWindow());
		}

		cmdWait = new CmdWait();
		cmdWait.setTempFileName(cmdWin.getTempFileName());

		if (tempFilePrefix) {
			cmdLogger = new CmdLogger(tempFilePrefix);
		}
		else {
			cmdLogger = new CmdLogger();
		}
		cmdLogger.open();
		
		var result = {};
		result.cmdWin = cmdWin;
		result.cmdWait = cmdWait;
		result.cmdLogger = cmdLogger;
		
		return result;
	};

	/**
	 * Close command window processing.
	 *
	 * @memberof pwa.commandWindow
	 * @alias pwa.commandWindow.close
	 * @param {Object} cmdObjects - stores cmdWin, cmdWait, and cmdLogger objects
	 */
	_pub.close = function(cmdObjects) {
		cmdObjects.cmdWait.waitForCommandDone();
		cmdObjects.cmdWin.closeCommandWindow();
		cmdObjects.cmdLogger.close();
	};


	/**
	 * Run a function in another instantiated command window.
	 *
	 * @memberof pwa.commandWindow
	 * @alias pwa.commandWindow.runItInAnotherCmd
	 * @param {function} func - executing function, which must have parameters of cmdWin, cmdWait, cmdLogger, and optionally fourth parameter.
	 * @param {String} tempFilePrefix - temporary file prefix
	 * @param {Object} param1 - the last parameter for the executing function-"func" parameter, which corresponds to the fourth parameter of the "func" parameter.
	 * @returns {Object} funtion's result
	 */
	_pub.runItInAnotherCmd = function(func, tempFilePrefix, param1) {
		var cmdObj = _pub.initialize(tempFilePrefix, false, true);
		var result = func(cmdObj.cmdWin, cmdObj.cmdWait, cmdObj.cmdLogger, param1);
		_pub.close(cmdObj);

		return result;
	};

	return _pub;
}());