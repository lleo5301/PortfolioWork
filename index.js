var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    fs = require('fs');

var app = express();

//config app
app.use(bodyParser.json());


//static routes
app.use('/', express.static('./public'));

app.use('/bower_components', express.static('./bower_components'));

//simple api to return image links
app.get('/api/backgrounds', function(req,res){
	fs.readdir('./public/img', function(err, data){
		res.json({data:data});
	})
	
})

//listen
app.listen(8080);



