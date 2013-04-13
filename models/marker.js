// Sample mongoose Schema (Person class)
var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var markerSchema = new Schema({
	name: String,
	address: String,
	description: String,
	order: String,
	category: String,
	latitude: String,
	longitude: String,
	userId: String
});

//Export the Schema
module.exports = mongoose.model('Marker', markerSchema);
