'use strict';
var _ = require('lodash');
var defaults = require('json-schema-defaults');

var DefaultsFiller = function DefaultsFiller(schemaMap) {
	this._schemas = schemaMap;
};

var newDefaultsFiller = function newDefaultsFiller(schemaMap) {
	return new DefaultsFiller(schemaMap);
};

DefaultsFiller.prototype = {
	_schemas: {},
	fill: function fill(entity, entityName) {
		return _.assign(defaults(this._schemas[entityName]), entity);
	}
};

module.exports = {DefaultsFiller: DefaultsFiller, newDefaultsFiller: newDefaultsFiller};
