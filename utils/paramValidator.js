var schemaDef = require("./schemaDefinition");
var Validator = require('node-document-validator-jsonschema');
var validator = new Validator();

exports.validateMarkerAddUpdate = function(req, callback) { 
	validator.validate(req, schemaDef.markerAddUpdateSchema, function(err, errors, valid) {
		if (!valid) {
		    callback(errors);
	    } else {
	    	callback(null);
	    }
	});

};

exports.validateMarkerListAddUpdate = function(req, callback) {
	validator.validate(req, schemaDef.markerListAddUpdateSchema, function(err, errors, valid) {
		if (!valid) {
		    callback(errors);
	    } else {
	    	callback(null);
	    }
	});
};

exports.validatePersonAddUpdate = function(req, callback) {
	validator.validate(req, schemaDef.personAddUpdateSchema, function(err, errors, valid) {
		if (!valid) {
		    callback(errors);
	    } else {
	    	callback(null);
	    }
	});
};

