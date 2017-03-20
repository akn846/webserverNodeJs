var express = require('express');
var app = express();

var middleware = {
	requireAuthentication: function (req, res, next) { // Next is the post authentication OK signal
		console.log('Private route hit');
		next();
	}, 
	logger : function (req, res, next) {
		console.log(new Date().toString() + ' Request: ' + req.method + ' ' + req.originalUrl);
		next();
	}
}
// app.use = application middleware - called for every URI request
//app.use(middleware.requireAuthentication); //mmust be before any URI requests are defined
app.use(middleware.logger);
// invokde the logic just for specific URI embed the call the to teh function as 2nd parameter
app.get('/about', middleware.requireAuthentication, function(req, res){
	res.send('Information about us!');
});
var PORT = 3001;
app.use(express.static(__dirname + '/public'))
app.listen(PORT, function(){
	console.log ('Express web server started OK on port ' + PORT);
});
