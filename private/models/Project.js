var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  name: {type: String, default: '', required: true},
  description: {type: String, default: ''},
});

module.exports = {
  schema: projectSchema,
};
