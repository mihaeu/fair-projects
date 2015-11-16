module.exports = (function() {

  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var participantSchema = require('../models/ParticipantSchema.js');

  var projectSchema = new Schema({
    name: {type: String, default: '', required: true},
    description: {type: String, default: ''},
    participants: [participantSchema],
  });

  return projectSchema;
})();
