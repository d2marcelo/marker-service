var Person = require('../models/person');
var Marker = require('../models/marker');
var MarkerList = require('../models/markerList');
var ParamValidator = require('../utils/paramValidator');
var moment 		= require('moment');
		

exports.buildMarker = function(req, callback) { 
	ParamValidator.validateMarkerAddUpdate(req, function(err, obj){
		if (err) 
			callback (null, err);
		else{
			 callback(new Marker(
			{
				name: req.name,
				address: req.address,
				order: req.order,
				category: req.category,
				latitude: req.latitude,
				longitude: req.longitude,
				userId: req.userId,
			}), null);
		}
	});
};

exports.buildMarkerList = function(req, callback) { 
	ParamValidator.validateMarkerListAddUpdate(req, function(err, obj){
		if (err) 
			callback (null, err);
		else{
			 callback(new MarkerList(
			{
				name: req.name,
				category: req.category,
				views: req.views,
				_private: req._private,
				markers: req.markers,
				userId: req.userId,
			}), null);
		}
	});
};

exports.buildPerson = function (req, callback) {
		ParamValidator.validatePersonAddUpdate(req, function(err, obj){
		if (err) 
			callback (null, err);
		else{
			 callback(new Person(
			{
				name: req.name,
				email: req.email,
				pass: req.pass,
				createdAt: moment().utc().format('YYYY-MM-DD HH:mm:ss.SSS')
			}), null);
		}
	});

}

exports.getPerson = function (callback){
	callback (Person);
}
exports.getMarker = function(callback){
	 callback(Marker);
}
exports.getMarkerList = function (callback) {
	 callback(MarkerList);
}

