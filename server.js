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

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username !== 'test') {
      return done(null, false, { message: 'Incorrect username.' });
    }

    if (password !== 'pw') {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, {username: username, password: password});
  }
));

var session = require('express-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({ secret: 'asd87a9d87a98d72d798wd9a7sd' }));
app.use(passport.initialize());
app.use(passport.session());

router.post(
  '/test',
  passport.authenticate('local', { session: false }),
  function(req, res) {
    return res.json({user: 1});
  }
);

router.post(
  '/tests',
  passport.authenticate('local', { session: false }),
  function(req, res) {
    return res.json({user: 1});
  }
);

// load routes and inject our app
app.use('/api/v1', router);

var server = app.listen(3000, function() {
  'use strict';

  var host = server.address().address;
  var port = server.address().port;

  console.log('Fair Projects app listening at http://%s:%s', host, port);
});

exports = module.exports = app;
