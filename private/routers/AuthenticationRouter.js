module.exports = function(app) {

  'use strict';

  var express = require('express');
  var authenticationRouter = express.Router();

  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy(
    function (username, password, done) {
      if (username !== 'test') {
        return done(null, false, {message: 'Incorrect username.'});
      }

      if (password !== 'pw') {
        return done(null, false, {message: 'Incorrect password.'});
      }

      return done(null, {username: username, password: password});
    }
  ));

  var session = require('express-session');
  var cookieParser = require('cookie-parser');
  app.use(cookieParser());
  app.use(session({secret: 'asd87a9d87a98d72d798wd9a7sd'}));
  app.use(passport.initialize());
  app.use(passport.session());

  authenticationRouter.post(
    '/test',
    passport.authenticate('local', {session: false}),
    function (req, res) {
      return res.json({user: 1});
    }
  );

  return authenticationRouter;
};
