// App routes
module.exports = function(app) {

var responseGen = require('../utils/responseGenerator');
var modelBuilder = require('../utils/modelBuilder');
var passwordHash = require('password-hash');


	addMarker = function(req, res) {
		
		if (req.body._id) return this.updateMarker(req, res);

		modelBuilder.buildMarker(req.body, function(model, err){
			if (err)
				res.send(responseGen.failure(err))
			else {
				model.save();
			    res.send(responseGen.success(model));
			}
		});
	};

	getMarker = function (req, res) {
		_id = req.params.id;
		 modelBuilder.getMarker(function(model){
		 	model.findById(_id, function (err, doc){
  			if (!doc)
  			 	res.send(responseGen.failure("marker not found"));
  			else
  			    res.send(responseGen.success(doc));
			});
		 });
	};

	updateMarker = function (req, res){
		_id = req.body._id;
		delete req.body._id;
		var conditions = { "_id": _id }
  			, options = {};
  			modelBuilder.getMarker(function(model){
		 	model.findById(_id, function (err, doc){
			if (err)
  			 	res.send(responseGen.failure("marker not found"));
  			else{
  				model.update(conditions, req.body, options, function(err, aff){
					if (err)
						res.send(responseGen.failure(err));
					else {
						model.findById(_id, function (err, doc){	
							if (!doc)
								res.send(responseGen.failure("list not found"));
						    else
						    	res.send(responseGen.success(doc));
						});
					 }
				});
			 }
		 });
		 });
	};

	deleteMarker = function (req,res){
		modelBuilder.getMarker(function(model){
		 			model.remove({ _id: req.params.id }, function(err) {
					    if (err) 
					           res.send(responseGen.failure(err));
					    else 
					           res.send(responseGen.success(""));
					}).exec();
				
			});
	};


	
	addList = function(req, res) {
		if (req.body._id) return this.updateList(req, res);

		modelBuilder.buildMarkerList(req.body, function(model, err){
			if (err)
				res.send(responseGen.failure(err))
			else {
				model.save();
			    res.send(responseGen.success(model));
			}
		});
	};

	updateList = function (req, res){
		_id = req.body._id;
		delete req.body._id;
		var conditions = { "_id": _id }
  			, options = {};
  			modelBuilder.getMarkerList(function(model){
		 	model.findById(_id, function (err, doc){
			if (err)
  			 	res.send(responseGen.failure("list not found"));
  			else{
  				model.update(conditions, req.body, options, function(err, aff){
					if (err)
						res.send(responseGen.failure(err));
					else {
						model.findById(_id, function (err, doc){	
							if (!doc)
								res.send(responseGen.failure("list not found"));
						    else
						    	res.send(responseGen.success(doc));
						});
					 }
				});
			 }
		 });
		 });
	};

	deleteList = function (req,res){
		modelBuilder.getMarkerList(function(model){
		 			model.remove({ _id: req.params.id }, function(err) {
					    if (err) 
					           res.send(responseGen.failure(err));
					    else 
					           res.send(responseGen.success(""));
					}).exec();
				
			});
	};

	getList= function (req, res) {
		_id = req.params.id;
		 modelBuilder.getMarkerList(function(model){
		 	model.findById(_id, function (err, doc){
  			if (!doc)
  			 	res.send(responseGen.failure("list not found"));
  			else {
  				modelBuilder.getMarker(function(marker){
  			    markers = doc.markers; console.log(markers);
  			    marker.find().where('_id').in(markers).exec(function (err, docs){
  			    	doc.markers = docs;
  			    	if (err) 
  			    		res.send(responseGen.failure(err));
					    else 
					    res.send(responseGen.success(doc));
  			        });
  			     });
  			    }
  			 });
		 });
	};


	// Create a new person and save it
	addPerson = function(req, res) {
	    if (req.body._id) return this.updatePerson(req, res);
		modelBuilder.getPerson(function(model){
		   	model.findOne({email: req.body.email}, function (err, doc){
			 		if (doc)
			 			res.send(responseGen.failure("email taken"));
			 		else {
			 			var hash = passwordHash.generate(req.body.pass);
					 	req.body.pass = hash;
			 			modelBuilder.buildPerson(req.body, function(person, err){
			 				if (err)
			 					res.send(responseGen.failure(err))
			 				else {
			 					person.save();
			 					resp = {
			 						name : person.name;
			 						email : person.email;
			 						id : person.id;
			 					};
					 			res.send(responseGen.success(resp));
					 		}
					 	});
			 		}
			 	})
		 });
	};

	updatePerson = function(req, res) {

	    _id = req.body._id;
		delete req.body._id;
		delete req.body.email;
		var conditions = { "_id": _id }
  			, options = {};
  			modelBuilder.getPerson(function(model){
		 	model.findById(_id, function (err, doc){
			if (err)
  			 	res.send(responseGen.failure("person not found"));
  			else{
  				if (req.body.pass)
  					req.body.pass = passwordHash.generate(req.body.pass);
  				model.update(conditions, req.body, options, function(err, aff){
					if (err)
						res.send(responseGen.failure(err));
					else {
						model.findById(_id, function (err, doc){	
							if (!doc)
								res.send(responseGen.failure("list not found"));
						    else {
						    	doc.pass ="xxxx";
						    	res.send(responseGen.success(doc));
						    }
						});
					 }
				});
			 }
		 });
		 });
	};

	// all people
	loginPerson = function(req, res) {
		if (!req.body.email || !req.body.pass)
			res.send(responseGen.failure("email and pass fields required"));

		modelBuilder.getPerson(function(model){
			model.findOne({email: req.body.email}, function (err, doc){
			 		if (doc) {
			 				isok = passwordHash.verify(req.body.pass, doc.pass);
			 				if (!isok)
			 					res.send(responseGen.failure("invalid password"))
			 				else {
			 					doc.pass= "xxxx";
			 					res.send(responseGen.success(doc));
			 				}

			 		}
			 		else 
			 			res.send(responseGen.failure("email not found"))			
			 	})
		 });
	};

	//Find person by ID
	getPerson = function(req, res) {
		modelBuilder.getPerson(function(model){
		model.findOne({_id: req.params.id}, function(error, person) {
			res.send(person);
		});
		});
	};

	//Marker operations
	app.post('/marker', addMarker);
	app.get('/marker/remove/:id', deleteMarker);
	app.get('/marker/:id', getMarker);
	
	// Marker list operations
	app.post('/list', addList);
	app.get('/list/remove/:id', deleteList);
	app.get('/list/:id', getList);
	
	//Link routes and functions
	app.post('/person', addPerson);
	app.post('/login', loginPerson);
	app.get('/person/:id', getPerson);

}