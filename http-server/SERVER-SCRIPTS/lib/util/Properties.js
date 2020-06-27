var pwa = pwa || {};

/**
 * Manage Properties file processing.
 *
 * @namespace
 * @requires namespace:JavaType.js
 */
pwa.properties = (function() {
	var pub = {}; // public methods holder
	
	// private methods

	// public methods
	/**
	 * Open the property file and return a Properties object.
	 *
	 * @memberof pwa.properties
	 * @alias pwa.properties.open
	 * @param {String} path - File path to a property file
	 * @returns {Properties} Properties object
	 */
	pub.open = function(path) {
		var input = new FileInputStream(path);
		var propObj = new Properties();
		propObj.load(input);
		input.close();
		return propObj;
	};

	/**
	 * Save the Properties object with comments.
	 *
	 * @memberof pwa.properties
	 * @alias pwa.properties.save
	 * @param path - File path to a property file
	 * @param propObj - Properties object to be saved
	 * @param comments - comments to be saved
	 */
	pub.save = function(path, propObj, comments) {
		var fos = new FileOutputStream(path);
		propObj.store(fos, comments);
		fos.close();
	};

	return pub;
}());

