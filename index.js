var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var app = express();

//config app
app.use(bodyParser.json());


//static routes
app.use('/', express.static('./public'));

app.use('/bower_components', express.static('./bower_components'));

//listen
app.listen(8080);



