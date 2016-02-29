'use strict';

var glob = require('glob');
var fs = require('fs');
var path = require('path');

// loads schemas from files in schema's directory into a map with the entity name as the key and the json schema as the
// value
var loadSchemas = function loadSchemas() {
	var schemaMap = {};
	var schemaFiles = glob.sync(path.join(__dirname, 'schemas/*_schema.json'));
	for (var i = 0; i < schemaFiles.length; i++) {
		var schemaFile = schemaFiles[i];
		var schemaJson = JSON.parse(fs.readFileSync(schemaFile));
		var name = getNameFromFile(schemaFile);
		schemaMap[name] = schemaJson;
	}

	return schemaMap;

	function getNameFromFile(filePath) {
		var entityName = filePath.substr(filePath.lastIndexOf('/') + 1);
		entityName = entityName.substr(0, entityName.lastIndexOf('_'));
		return entityName;
	}
};

module.exports = {loadSchemas: loadSchemas};
