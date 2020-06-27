var pwa = pwa || {};

/**
 * Client (Web page) side utility functions.
 * @namespace
 */
pwa.webUtil = (function () {
	var _pub = {}; // public methods holder

	/**
	 * Separator used for REST API's response. Usualy it is used to update multiple parts
	 * of the current HTML. (The server-side must use the exact the same value to separate response
	 * data.)
	 *
	 * @memberof pwa.webUtil
	 * @alias pwa.webUtil.DATA_SEPARATOR
	 */
	_pub.DATA_SEPARATOR = '!=====!'; 	// defined in System.js at Server-side.

	/**
	 * Return the current domain URL.
	 *
	 * @private
	 * @memberof pwa.webUtil
	 * @returns {String} the current domain URL
	 */
	var getOwnDomainUrl = function() {
		var scripts = document.getElementsByTagName('script');
		var result = scripts[scripts.length - 1];
		var index = result.src.lastIndexOf("js/");
		result = result.src.substr(0, index);
		return result;
	}

	/**
	 * Return the current domain URL.
	 *
	 * @memberof pwa.webUtil
	 * @alias pwa.webUtil.URL
	 * @returns {String} the current domain URL
	 */
	_pub.URL = getOwnDomainUrl();

	/**
	 * Sleep processing and just wait.
	 *
	 * @memberof pwa.webUtil
	 * @alias pwa.webUtil.sleep
	 * @param millisecondsToWait - mil-second duration
	 */
	_pub.sleep = function( millisecondsToWait ) {
		var now = new Date().getTime();
		while ( new Date().getTime() < now + millisecondsToWait ) {
		/* do nothing; this will exit once it reaches the time limit */
		}
	}

	/**
	 * Return the current HTML page name.
	 *
	 * @memberof pwa.webUtil
	 * @alias pwa.webUtil.getNameOfHTML
	 * @returns {String} HTML name
	 */
	_pub.getNameOfHTML = function() {
		var path = window.location.pathname;
		return path.split("/").pop();
	}

	/**
	 * Return true if the current HTML page is the start-up page.
	 *
	 * @memberof pwa.webUtil
	 * @alias pwa.webUtil.isStartUpHTML
	 * @returns {boolean} true for start-up HTML page; otherwise, false.
	 */
	_pub.isStartUpHTML = function() {
		var referrer = document.referrer;
		return !(referrer);
	}

	/**
	 * Set a listener that closes the application as the current HTML page is closed.
	 *
	 * @memberof pwa.webUtil
	 * @alias pwa.webUtil.addCloseAppListener
	 */
	_pub.addCloseAppListener = function() {
		window.addEventListener('beforeunload', function (e) { 
			_pub.closeApp();
			_pub.closeApp(); // just in case first time does not work
			_pub.closeApp(); // just in case second time does not work
		}); 
	}

	/**
	 * Close the current application if the current HTML page is the start-up page.
	 *
	 * @memberof pwa.webUtil
	 * @alias pwa.webUtil.closeApp
	 */
	_pub.closeApp = function() {
		if (_pub.isStartUpHTML()) {
			_pub.closeHTMLApp();
		}
	}

	/**
	 * Close the current application.
	 *
	 * @memberof pwa.webUtil
	 * @alias pwa.webUtil.closeHTMLApp
	 */
	_pub.closeHTMLApp = function() {
			axios
				.get(_pub.URL + 'killHttpServer.jjs');
	}

	/**
	 * Return an HTML object specified with id.
	 *
	 * @memberof pwa.webUtil
	 * @param id - HTML ID
	 */
	var getModal = function(id) {
		return document.getElementById(id);
	}

	/**
	 * Open a modal div.
	 *
	 * @memberof pwa.webUtil
	 * @alias pwa.webUtil.onClickOpen
	 * @param id - HTML ID
	 */
	_pub.onClickOpen = function(id) {
		var modal = getModal(id);
		modal.style.display = "block";
	}

	/**
	 * Close a modal div.
	 *
	 * @memberof pwa.webUtil
	 * @alias pwa.webUtil.onClickClose
	 * @param id - HTML ID
	 */
	_pub.onClickClose = function(id) {
		var modal = getModal(id);
		modal.style.display = "none";
	}

	return _pub;
}());