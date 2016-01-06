module.exports = (function() {

  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var participantSchema = new Schema({
    name: {type: String, default: '', required: true},
    vote: {type: Number, default: 0},
  });

  return participantSchema;
})();
