var express = require('express');
var authenticationRouter = express.Router();
var passport = require('passport');

// Helper
var ensureAuthentication = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).end();
};

module.exports = function(app) {
  'use strict';

  // Routing
  authenticationRouter.post(
    '/login',
    passport.authenticate('local', {session: true}),
    function(req, res) {
      return res.json();
    }
  );

  authenticationRouter.post(
    '/logout',
    function(req, res) {
      req.logout();
      return res.json();
    }
  );

  authenticationRouter.post(
    '/signup',
    passport.authenticate('signup'),
    function(req, res) {
      return res.sendStatus(201);
    }
  );

  // require authentication for all API methods
  authenticationRouter.use('/', ensureAuthentication);

  return authenticationRouter;
};
