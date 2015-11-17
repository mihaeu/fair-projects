module.exports = (function() {

  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var participantSchema = require('../models/ParticipantSchema.js');

  var projectSchema = new Schema({
    name: {type: String, default: '', required: true},
    creationDate: {type: Date, default: Date.now},
    description: {type: String, default: ''},
    participants: [participantSchema],
  });

  return projectSchema;
})();
