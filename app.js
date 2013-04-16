// Load App dependencies
var express = require('express'),
	mongoose = require('mongoose'),
	http = require('http');


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};


var app = express();

// Configure: bodyParser to parse JSON data  
// 	          methodOverride to implement custom HTTP methods  
//            router to crete custom routes
app.configure(function () {
	app.use(allowCrossDomain);
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});

app.configure('development', function() {
	app.use(allowCrossDomain);
	app.use(express.errorHandler());
	 
})

// Sample routes are in a separate module, just for keep the code clean
routes = require('./routes/router')(app);

//Connect to the MongoDB test database
mongoose.connect("mongodb://nodejitsu_marcelooliveira:7rh24r89l8ca1qk56sj826mlb0@ds059907.mongolab.com:59907/nodejitsu_marcelooliveira_nodejitsudb8856351438");


//Start the server
http.createServer(app).listen(8081);
