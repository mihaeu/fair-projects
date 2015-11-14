module.exports = (function() {
  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var projectSchema = require('../models/ProjectSchema.js');

  var subjectSchema = new Schema({
    name: {type: String, default: '', required: true},
    creationDate: {type: Date, default: Date.now},
    description: {type: String, default: ''},
    projects: [projectSchema],
  });

  return subjectSchema;
})();
