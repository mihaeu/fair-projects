var loginStrategy = require('./LoginStrategy');
var signupStrategy = require('./SignupStrategy');
var userRepository = require('../models/UserRepository');

module.exports = function(passport) {
  'use strict';

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    userRepository.getById(id)
      .then(function(user) {
        done(null, user);
      }, function(err) {

        done(err, null);
      });
  });

  loginStrategy(passport);
  signupStrategy(passport);
};
