'use strict';
var Validator = require('jsonschema').Validator;
var v = new Validator();

var SchemaValidator = function SchemaValidator(schemaMap) {
	this._schemas = schemaMap;
};

var newSchemaValidator = function newSchemaValidator(schemaMap) {
	return new SchemaValidator(schemaMap);
};

SchemaValidator.prototype = {
	_schemas: {},
	// returns true if entity passes validation, or if no schema exists otherwise returns an error
	validate: function validate(entity, entityName) {
		var schema = this._schemas[entityName];
		if (typeof schema !== 'undefined') {
			try {
				v.validate(entity, schema, {throwError: true});
			} catch (e) {
				return e;
			}
		}
		return true;
	}
};

module.exports = {SchemaValidator: SchemaValidator, newSchemaValidator: newSchemaValidator};
