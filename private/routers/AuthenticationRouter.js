module.exports = function(app) {

  'use strict';

  var express = require('express');
  var authenticationRouter = express.Router();

  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;

  var userRepository = require('../models/UserRepository');

  var bCrypt = require('bcrypt-nodejs');

  // Login
  passport.use(new LocalStrategy(
    function(username, password, done) {
      userRepository.getByUsername(username).then(function(user) {

        if (!user) {
          return done(null, false);
        }

        if (!isValidPassword(user, password)) {
          return done(null, false);
        }

        return done(null, user);
      }, function(err) {

        return done(err, null);
      });
    }
  ));

  // SignUp
  passport.use('signup', new LocalStrategy(
    {passReqToCallback: true},
    function(req, username, password, done) {
      var createUser = function() {
        userRepository.getByUsername(username).then(function(user) {
          if (user) {
            // user exists already
            return done(null, false);
          }

          var newUser = userRepository.create({
            username: username,
            password: createHash(password),
          });
          newUser.save(function(err, user) {
            if (err) {
              // error on save
              return done(err, null);
            }

            //success
            return done(null, user);
          });
        });
      };

      process.nextTick(createUser);
    }
  ));

  // Init Passport
  var session = require('express-session');
  var cookieParser = require('cookie-parser');
  app.use(cookieParser());
  app.use(session({secret: 'asd87a9d87a98d72d798wd9a7sd', saveUninitialized: true, resave: true}));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  // User Handling
  passport.deserializeUser(function(id, done) {
    userRepository.getById(id)
      .then(function(user) {
        done(null, user);
      }, function(err) {

        done(err, null);
      });
  });

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
      return res.json();
    }
  );

  // Helper
  var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.status(401).end();
  };

  var isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
  };

  var createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };

  // require authentication for all API methods
  authenticationRouter.use('/', isAuthenticated);

  return authenticationRouter;
};
