// Load App dependencies
var express = require('express'),
	mongoose = require('mongoose'),
	http = require('http');


//CORS middleware
var allowCrossDomain = function(req, res, next) {

  var allowedOrigins = [
    'http://localhost:9090',
    'http://localhost:3000'
  ];

  var origin = req.headers.origin;

  if(allowedOrigins.indexOf(origin) < 0) {
    next();
  }

  res.header('Access-Control-Allow-Origin',  origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, X-File-Name, Content-Type, Content-Encoding, File-Type, Origin, X-Resource-Type, X-Resource-Id, X-Auth-Token');
  res.header('Access-Control-Allow-Credentials', true);

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
	app.use(express.errorHandler());
	 app.use(allowCrossDomain);
})

// Sample routes are in a separate module, just for keep the code clean
routes = require('./routes/router')(app);

//Connect to the MongoDB test database
mongoose.connect("mongodb://nodejitsu_marcelooliveira:7rh24r89l8ca1qk56sj826mlb0@ds059907.mongolab.com:59907/nodejitsu_marcelooliveira_nodejitsudb8856351438");


//Start the server
http.createServer(app).listen(8081);
