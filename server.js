var express = require('express');
var app = express();
var db = require('./config/db');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var router = require('./private/routes')(app);

mongoose.connect(db.url);

// static files like html, js, css or images are served from here
app.use(express.static('public'));

// use parser
app.use(bodyParser.json());
app.use(cookieParser());

// configure Passport
app.use(session({secret: 'asd87a9d87a98d72d798wd9a7sd', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// init passport
var initPassport = require('./private/passport/Init');
initPassport(passport);

// load routes and inject our app
app.use('/api/v1', router);

var server = app.listen(3000, function() {
  'use strict';

  var host = server.address().address;
  var port = server.address().port;

  console.log('Fair Projects app listening at http://%s:%s', host, port);
});

exports = module.exports = app;
