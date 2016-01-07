var userRepository = require('../models/UserRepository');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
  'use strict';

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

  var isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
  };
};
