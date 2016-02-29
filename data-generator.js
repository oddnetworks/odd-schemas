'use strict';
var jsf = require('json-from-schema');
var uuid = require('node-uuid');
var _ = require('lodash');

var DataGenerator = function DataGenerator(schemaMap) {
	var that = this;
	_.forEach(schemaMap, function addMethod(n, entity) {
		var methodName = 'generate' + _.upperFirst(entity);
		var generator = new jsf.JsonFromSchema([schemaMap[entity]]);
		var schemaId = _.trimEnd(schemaMap[entity].id, '#');
		that[methodName] = function generatedMethod() {
			var ent = generator.generate(schemaId, {maxRandomKeys: 0});
			ent.id = uuid.v1();
			return ent;
		};
	});
};

var newDataGenerator = function newDataGenerator(schemaMap) {
	return new DataGenerator(schemaMap);
};

module.exports = {DataGenerator: DataGenerator, newDataGenerator: newDataGenerator};
