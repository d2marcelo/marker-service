// Sample mongoose Schema (Person class)
	mongoose = require('mongoose');
	Schema = mongoose.Schema;

var markerListSchema = new Schema({
	name: String,
	category: String,
	views: Number,
	_private: Boolean,
	markers: [String],
	userId: String
});

//Export the Schema
module.exports = mongoose.model('MarkerList', markerListSchema);
