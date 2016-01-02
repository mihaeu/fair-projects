module.exports = function(app) {

  'use strict';

  var express = require('express');
  var authenticationRouter = express.Router();

  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy(
    function(username, password, done) {

      if (username !== 'test') {
        return done(null, false, {message: 'Incorrect username.'});
      }

      if (password !== 'pw') {
        return done(null, false, {message: 'Incorrect password.'});
      }

      return done(null, {id: 1, username: username, password: password});
    }
  ));

  var session = require('express-session');
  var cookieParser = require('cookie-parser');
  app.use(cookieParser());
  app.use(session({secret: 'asd87a9d87a98d72d798wd9a7sd', saveUninitialized: true, resave: true}));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    done(null, {id: 1, username: 'test', password: 'pw'});
  });

  authenticationRouter.post(
    '/login',
    passport.authenticate('local', {session: true}),
    function(req, res) {
      return res.json();
    }
  );

  authenticationRouter.get(
    '/logout',
    function(req, res) {
      req.logout();
      return res.json();
    }
  );

  var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.status(401).end();
  };

  // require authentication for all API methods
  authenticationRouter.use('/', isAuthenticated);

  return authenticationRouter;
};
