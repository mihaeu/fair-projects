var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var participantSchema = new Schema({
  name: {type: String, default: '', required: true},
});

module.exports = {
  model: mongoose.model('Participant', participantSchema),
  schema: participantSchema,
};
