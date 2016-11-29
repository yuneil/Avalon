var express = require('express');
var app = express();

var compression = require('compression');
app.use(compression());

var config = require('./config');


app.get('/', function(req, res) {
    res.send('Hello World!');
});


var auth = require('./routes/authorization.js');
var cookieSession = require('cookie-session');

app.get('/login', auth.login);


app.listen(5858, function() {
    console.log('Example app listening on port 5858!');
});