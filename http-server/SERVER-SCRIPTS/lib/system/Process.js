var pwa = pwa || {};

/**
 * Manage OS related processing.
 *
 * @namespace
 * @requires JavaType.js
 * @requires system/System.js
 * @requires system/Command.js
 * @requires util/CommandWindow.js
 */
pwa.process = (function () {
	var _pub = {}; // public methods holder

	/**
	 * Kill a task by pid. (Windows Specific)
	 *
	 * @private
	 * @memberof pwa.process
	 * @alias pwa.process.killTask
	 * @param {CmdWinController} cmdWin - Command Window controller object
	 * @param {CmdCompletionChecker} cmdWait - Command Completion Checker object
	 * @param {String} pid - process id to be killed
	 */
	var killTask = function(cmdWin, cmdWait, pid) {
		var cmd = 'taskkill /F /PID ' + pid;
		cmdWin.executeCommand(cmd);
	}

	/**
	 * List PIDs. (Windows specific)
	 *
	 * @private
	 * @memberof pwa.process
	 * @alias pwa.process.getPidList
	 * @param {CmdWinController} cmdWin - Command Window controller object
	 * @param {CmdCompletionChecker} cmdWait - Command Completion Checker object
	 * @param {CmdLogger} cmdLogger - Command Logging object
	 * @param {String} appName - Executed program name
	 * @returns {List} Pid list
	 */
	var getPidList = function(cmdWin, cmdWait, cmdLogger, appName) {
		cmdWin.executeCommand('tasklist /FI "IMAGENAME eq ' + appName + '" /FO CSV /NH');
		var result = new ArrayList();
		var cmdResult = cmdWin.getCommandResult();
		for(var i=0; i<cmdResult.size(); i++ ) {
			var line = cmdResult.get(i);
			var cols = line.split(",");
			result.add(cols[1]);
		}
		return result;
	};

	/**
	 * Select a PID based on search cirteira. (Windows specific)
	 *
	 * @private
	 * @memberof pwa.process
	 * @alias pwa.process.selectPid
	 * @param {CmdWinController} cmdWin - Command Window controller object
	 * @param {CmdCompletionChecker} cmdWait - Command Completion Checker object
	 * @param {CmdLogger} cmdLogger - Command Logging object
	 * @param {String} criteria - uniquly identfied wording in the command line string.
	 * @returns {String} Pid
	 */
	var selectPid = function(cmdWin, cmdWait, cmdLogger, criteria, pidList) {
		var result = null;
		for(var i=0; i<pidList.size(); i++ ) {
			var pid = pidList.get(i);
			pid = pid.replaceAll('"', "");
			var cmd = 'wmic process where processId=' + pid + ' get commandline';
			cmdWin.executeCommand(cmd);
			var cmdResult = cmdWin.getCommandResult();
			if (cmdResult.size() < 2) {
				break;
			}
			if (cmdResult.get(1).indexOf(criteria) > -1) {
				result = pid;
			}
		}
		return result;
	};

	/**
	 * Get parent's PID. (Windows specific)
	 *
	 * @private
	 * @memberof pwa.process
	 * @alias pwa.process.getParentPid
	 * @param {String} pid - process id
	 * @returns {String} parent pid based on pid
	 */
	var getParentPid = function(pid) {
		var result;
		var cmd = 'wmic process where processId=' + pid + ' get parentprocessid';
		cmdWin.executeCommand(cmd);
		var cmdResult = cmdWin.getCommandResult();
		if (cmdResult.size() < 2) {
			return result;
		}
		result = cmdResult.get(1).trim();
		return result;
	};

	/**
	 * Kill a process based on two criteria1 and criteria2.
	 * This method assume global cmdWin, cmdWait, and cmdLogger have been instantiated.
	 *
	 * @private
	 * @memberof pwa.process
	 * @alias pwa.process.killProcessBase
	 * @param {CmdWinController} cmdWin - Command Window controller object
	 * @param {CmdCompletionChecker} cmdWait - Command Completion Checker object
	 * @param {CmdLogger} cmdLogger - Command Logging object
	 * @param {String} criteria1 - Executed program name e.g. "java.exe", "perl.exe", etc.
	 * @param {String} criteria2 - Uniquily identified wording in execution command line string
	 * @param {boolean} killParentFlag - true: kill the parent process
	 */
	var killProcessBase = function(cmdWin, cmdWait, cmdLogger, criteria1, criteria2, killParentFlag) {
		var pidList = getPidList(cmdWin, cmdWait, cmdLogger, criteria1);
		if (pidList.size() > 0) {
			var obj = pidList.get(0);
			if (typeof obj === 'undefined') {
				cmdLogger.log("No process is found to kill.");
				return;
			}
		}
		var pid = selectPid(cmdWin, cmdWait, cmdLogger, criteria2, pidList);
		if (pid != null) {
			var parentPid;
			if (killParentFlag) {
				parentPid = getParentPid(pid);
			}
			killTask(cmdWin, cmdWait, pid);
			cmdLogger.log("Kill pid = " + pid);
			cmdWait.waitForCommandDone(4);
			if (killParentFlag) {
				killTask(cmdWin, cmdWait, parentPid);
				cmdLogger.log("Kill parent pid = " + parentPid);
			}
		}
	};

	/**
	 * Kill a process based on two criteria1 and criteria2 for Linux.
	 * This method assume global cmdWin, cmdWait, and cmdLogger have been instantiated.
	 *
	 * @private
	 * @memberof pwa.process
	 * @alias pwa.process.killProcessBaseLinux
	 * @param {CmdWinController} cmdWin - Command Window controller object
	 * @param {CmdCompletionChecker} cmdWait - Command Completion Checker object
	 * @param {CmdLogger} cmdLogger - Command Logging object
	 * @param {String} criteria1 - Executed program name e.g. "java.exe", "perl.exe", etc.
	 * @param {String} criteria2 - Uniquily identified wording in execution command line string
	 * @param {boolean} killParentFlag - true: kill the parent process
	 */
	var killProcessBaseLinux = function(cmdWin, cmdWait, cmdLogger, criteria1, criteria2, killParentFlag) {
		cmdLogger.log("Linux KillProcessBase is not implemented.");
		pwa.command.throwMethodNotImplementedException("killProcessBaseLinux");
	};

	/**
	 * Kill a process based on two criteria1 and criteria2 independently, which means
	 * this method will instantiate cmdWin, cmdWait, and cmdLogger by itself.
	 *
	 * @private
	 * @memberof pwa.process
	 * @alias pwa.process.killProcessInLocal
	 * @param {String} criteria1 - Executed program name e.g. "java.exe", "perl.exe", etc.
	 * @param {String} criteria2 - Uniquily identified wording in execution command line string
	 */
	var killProcessInLocal = function(criteria1, criteria2) {
		var cmdObj = pwa.commandWindow.initialize("killProc", false, true);

		if (pwa.system.isWindows()) {
			killProcessBase(cmdObj.cmdWin, cmdObj.cmdWait, cmdObj.cmdLogger, criteria1, criteria2, false);
		} else {
			killProcessBaseLinux(cmdObj.cmdWin, cmdObj.cmdWait, cmdObj.cmdLogger, criteria1, criteria2, false);
		}
		
		pwa.commandWindow.close(cmdObj);
	};

	/**
	 * Kill a process based on two criteria1 and criteria2.
	 * This method assume global cmdWin, cmdWait, and cmdLogger have been instantiated.
	 *
	 * @private
	 * @memberof pwa.process
	 * @alias pwa.process.killProcess
	 * @param {String} criteria1 - Executed program name e.g. "java.exe", "perl.exe", etc.
	 * @param {String} criteria2 - Uniquily identified wording in execution command line string
	 * @param {boolean} killParentFlag - true: kill the parent process
	 */
	var killProcess = function(criteria1, criteria2, killParentFlag){
		cmdWin.setLogFlag(true); // need to set true to make cmdWin.getCommandResult() work
		if (pwa.command.isWindows()) {
			killProcessBase(cmdWin, cmdWait, cmdLogger, criteria1, criteria2, killParentFlag);
		} else {
			killProcessBaseLinux(cmdWin, cmdWait, cmdLogger, criteria1, criteria2, killParentFlag);
		}
		cmdWin.setLogFlag(false); // turn it back
	};

	/**
	 * Start Weblogic app.
	 *
	 * @memberof pwa.process
	 * @alias pwa.process.startApp
	 * @param {String} path - path to the Weblogic domain
	 * @param {String} cmd - command name to start app
	 */
	_pub.startApp = function(path, cmd) {
		cmd = pwa.command.changeDirectoryAndRunCommand(path, cmd);
		CmdWinOpener.main([cmd]);
	};

// @param path - path to the app, main dir that stores project, build, etc. 
	/**
	 * Stop Wfx-based App.
	 *
	 * @memberof pwa.process
	 * @alias pwa.process.stopApp
	 * @param {String} path - path to the WFX application's root directory
	 * @param {boolean} killParentFlag - true: kill the parent's process as well
	 */
	_pub.stopApp = function(path, killParentFlag) {
		path = pwa.commnad.normalizePathString(path);
		killProcess("java.exe", path, killParentFlag);
	};
	
	/**
	 * Stop MDW HttpServer.
	 *
	 * @memberof pwa.process
	 * @alias pwa.process.stopHttpServer
	 */
	_pub.stopHttpServer = function() {
		killProcessInLocal("jjs.exe", "HttpServer.js");
	};

	/**
	 * Stop MDW HttpServer with Port#.
	 *
	 * @memberof pwa.process
	 * @alias pwa.process.stopHttpServerWithPortNumber
	 * @param {int} port - TCP/IP Port#
	 */
	_pub.stopHttpServerWithPortNumber = function(port) {
		killProcessInLocal("jjs.exe", "HttpServer.js -scripting -- " + port.toString());
	};

	/**
	 * Check if specified program has finished or not and wait until done. (Windows Specific)
	 * <p>This method should be called in the function specified as the first parameter of pwa.commandWindow.runItInAnotherCmd method.</p>
	 *
	 * @memberof pwa.process
	 * @alias pwa.process.checkProcessDone
	 * @param {CmdWinController} cmdWin - Command Window controller object
	 * @param {CmdCompletionChecker} cmdWait - Command Completion Checker object
	 * @param {CmdLogger} cmdLogger - Command Logging object
	 * @param {String} prog - program name e.g. "java.exe", "perl.exe", etc.
	 */
	_pub.checkProcessDone = function(cmdWin, cmdWait, cmdLogger, prog) {
		var pidList;
		var flag = true;
		while(flag) {
			pidList = getPidList(cmdWin, cmdWait, cmdLogger, prog);
			if ( pidList.toString() === '[undefined]') {
				flag = false;
			}
			else if (pidList.size() > 0) {
				TimeUnit.SECONDS.sleep(2);
			} else {
				flag = false;
			}
		}
	};

	/**
	 * Check if specified program has finished or not and wait until done. (Windows Specific)
	 * <p>This method should be called in the function specified as the first parameter of pwa.commandWindow.runItInAnotherCmd method.</p>
	 *
	 * @memberof pwa.process
	 * @alias pwa.process.checkProcessDoneByCommandLine
	 * @param {CmdWinController} cmdWin - Command Window controller object
	 * @param {CmdCompletionChecker} cmdWait - Command Completion Checker object
	 * @param {CmdLogger} cmdLogger - Command Logging object
	 * @param {String} prog - program name e.g. "java.exe", "perl.exe", etc.
	 * @param {String} criteiria2 - search words from command line
	 * @param {int} duration - wait time in seconds (default: 2)
	 */
	_pub.checkProcessDoneByCommandLine = function(cmdWin, cmdWait, cmdLogger, prog, criteria2, duration) {
		var pidList;
		var flag = true;

		var waitSeconds = 2;
		if (!duration) {
			waitSeconds = duration;
		}
		
		while(flag) {
			pidList = getPidList(cmdWin, cmdWait, cmdLogger, prog);
			if ( pidList.toString() === '[undefined]') {
				flag = false;
			}
			else if (pidList.size() > 0) {
				var pid = selectPid(cmdWin, cmdWait, cmdLogger, criteria2, pidList);
				if (pid != null) {
					TimeUnit.SECONDS.sleep(waitSeconds);
				} else {
					flag = false;
				}
			} else {
				flag = false;
			}
		}
	};

	/**
	 * Returns arguments from client's REST call in Server-side JJS script file.
	 *
	 * @memberof pwa.process
	 * @alias pwa.process.getArgs4Jjs
	 * @param {Object} args - REST call's parameters
	 * @returns {Object} args
	 */
	_pub.getArgs4Jjs = function(args) {
		if (args == null) {
			return null;
		}
		else {
			return splitArgs(args);
		}
	};

	var splitArgs = function(args) {
		var params = args.split(/\&/);
		for(var i=0; i<params.length; i++) {
			params[i] = URLDecoder.decode(params[i], "utf-8");
		}
		return params;
	};
	
	var JJS_EXEC_PARAM_KEY = "jjsExecParamKey";

	/**
	 * Returns arguments from client's REST call in Server-side JS script file.
	 *
	 * @memberof pwa.process
	 * @alias pwa.process.getArgs
	 * @returns {Object} REST call's parameters
	 */
	_pub.getArgs = function() {
		if (System.getProperty(JJS_EXEC_PARAM_KEY) == null) {
			return null;
		}
		else {
			var params = System.getProperty(JJS_EXEC_PARAM_KEY);
			return splitArgs(params);
		}
	};

	/**
	 * Run a Server-side script in async mode in jjsExec function in Server-side JJS script file in another process.
	 *
	 * @private
	 * @memberof pwa.process
	 * @alias pwa.process.instantiateProcess
	 * @param {String} ScriptName - Server-Side JS file path e.g. "SERVER-SCRIPTS/js/runMomBuildAsync.js"
	 * @param {Object} args - jjsExec function's parameter
	 * @returns {Process} New Process Object
	 */
	var instantiateProcess = function(scriptName, args) {
		var procBuilder = new ProcessBuilder();
		var jarPaths = pwa.system.getEnv("JAR_PATHS");
		procBuilder.command("jjs.exe", "-cp " + jarPaths, "-D" + JJS_EXEC_PARAM_KEY + "=" + args, scriptName);
		return procBuilder.start();
	};

	/**
	 * Run a Server-side script in async mode in jjsExec function in Server-side JJS script file in another process.
	 *
	 * @memberof pwa.process
	 * @alias pwa.process.runAsync
	 * @param {String} ScriptName - Server-Side JS file path e.g. "SERVER-SCRIPTS/js/runMomBuildAsync.js"
	 * @param {Object} args - jjsExec function's parameter
	 * @returns {String} '{"status":true}' value
	 */
	_pub.runAsync = function(scriptName, args) {
		instantiateProcess(scriptName, args);
		return '{"status":true}';
	};

	/**
	 * Run a Server-side script in sync mode in jjsExec function in Server-side JJS script file in another process.
	 *
	 * @memberof pwa.process
	 * @alias pwa.process.runSync
	 * @param {String} ScriptName - Server-Side JS file path e.g. "SERVER-SCRIPTS/js/Xyz.js"
	 * @param {Object} args - jjsExec function's parameter
	 * @returns {String} '{"status":' + exitCode + '}' value
	 */
	_pub.runSync = function(scriptName, args) {
		var process = instantiateProcess(scriptName, args);
		var exitCode = process.waitFor();
		return '{"status":' + exitCode + '}';
	};

	return _pub;
}());

