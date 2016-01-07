var LocalStrategy = require('passport-local').Strategy;
var userRepository = require('../models/UserRepository');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
  'use strict';

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

  var createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };
};
