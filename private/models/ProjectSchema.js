module.exports = (function() {

  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var projectSchema = new Schema({
    name: {type: String, default: '', required: true},
    description: {type: String, default: ''},
  });

  return projectSchema;
})();
