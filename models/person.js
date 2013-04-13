// Sample mongoose Schema (Person class)
var mongoose = require('mongoose');
	Schema = mongoose.Schema;
	
var personSchema = new Schema({
	name :  String,
	email:  {type: String, unique: true},
    pass:   String,
    createdAt : Date
});

//Export the Schema
module.exports = mongoose.model('Person', personSchema);
