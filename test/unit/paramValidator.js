
var ParamValidator = require('../../utils/paramValidator');
	

var data = {
	"name": "string",
	"address": "string",
	"description": "string",
	"order": "string",
	"category": "string",
	"latitude": "string",
	"longitude": "string"
};


ParamValidator.validateMarkerAdd(data, function(err){
	console.log(err);
});

