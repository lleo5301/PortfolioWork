var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    imageMagick = require('imagemagick-native');

var app = express();

//config app
app.use(bodyParser.json());


//static routes
app.use('/', express.static('./public'));

app.use('/bower_components', express.static('./bower_components'));

//simple api to return image links
app.get('/api/backgrounds', function(req,res){
	fs.readdir('./public/optimized', function(err, data){
		data = data.map(function(file){return{url:'optimized/' + file}});
		res.json({data:data});
	})
	
});

app.get('/api/icons', function(req,res){
	fs.readdir('./public/icons', function(err, data){
		data = data.map(function(file){return {url:'icons/' + file, description:file.replace('.svg', '')}});
		// console.log(data);
		res.json({data:data});
	})
})

//test imagemagic


//listen
app.listen(8080);



