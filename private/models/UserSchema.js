module.exports = (function() {
  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
  });

  return userSchema;
})();
