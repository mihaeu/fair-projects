module.exports = (function() {

  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var participantSchema = new Schema({
    userId: {type: Schema.ObjectId, required: true},
    vote: {type: Number, required: true, default: 0},
  });

  return participantSchema;
})();
