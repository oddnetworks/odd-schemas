'use strict';

var test = require('tape');
var schemaMap = require('../odd-schemas').loadSchemas();
var generator = require('../odd-schemas').newDataGenerator(schemaMap);
var validator = require('../odd-schemas').newSchemaValidator(schemaMap);
var DefaultsFiller = require('../odd-schemas').DefaultsFiller;

test('An entity generated by the generator will pass validation', function (t) {
	t.plan(1);
	var entity = generator.generateVideo();
	var isValid = validator.validate(entity, 'video');
	t.equal(isValid, true);
	t.end();
});

test('An invalid entity will not pass validation when validator is passed an entity type with a schema', function (t) {
	t.plan(1);
	var entity = {type: 'badEntity'};
	var isValid = validator.validate(entity, 'video');
	t.notEqual(isValid, true);
	t.end();
});

test('A generated entity will have an id', function (t) {
	t.plan(1);
	var vid = generator.generateVideo();
	t.equal(typeof vid.id, 'string');
	t.end();
});

test('Defaults DefaultsFiller will fill in empty properties', function (t) {
	t.plan(1);
	var testSchemaMap = {
		testSchema: {
			title: 'testSchema',
			type: 'object',
			properties: {
				defaultField: {
					type: 'string',
					default: 'id'
				}
			}
		}
	};
	var df = new DefaultsFiller(testSchemaMap);
	var filled = df.fill({}, 'testSchema');
	t.equal(filled.defaultField, 'id');
	t.end();
});

test('Defaults DefaultsFiller will not fill in existing properties', function (t) {
	t.plan(1);
	var testSchemaMap = {
		testSchema: {
			title: 'testSchema',
			type: 'object',
			properties: {
				defaultField: {
					type: 'string',
					default: 'id'
				}
			}
		}
	};
	var df = new DefaultsFiller(testSchemaMap);
	var filled = df.fill({defaultField: 'existing'}, 'testSchema');
	t.equal(filled.defaultField, 'existing');
	t.end();
});
