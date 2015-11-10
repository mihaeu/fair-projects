var express = require('express');
var app = express();
var db = require('./config/db');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = require('./private/routes')(app);

mongoose.connect(db.url);

// static files like html, js, css or images are served from here
app.use(express.static('public'));

// use json parser
app.use(bodyParser.json());

// load routes and inject our app
app.use('/api/v1', router);

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Fair Projects app listening at http://%s:%s', host, port);
});

exports = module.exports = app;
