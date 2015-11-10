var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
  name: {type: String, default: '', required: true},
});

module.exports = {
  model: mongoose.model('Member', memberSchema),
  schema: memberSchema,
};
