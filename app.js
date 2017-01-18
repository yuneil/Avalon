﻿var express = require('express');
var app = express();

//static resource
app.use(express.static('./static'));

//post data body
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

//compression
var compression = require('compression');
app.use(compression());

var config = require('./config');


app.get('/', function(req, res) {
    res.sendfile('./templates/index.html');
});


var auth = require('./routes/authorization.js');
var cookieSession = require('cookie-session');

app.post('/login', auth.login);


app.listen(5858, function() {
    console.log('Example app listening on port 5858!');
});