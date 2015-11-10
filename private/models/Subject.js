var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  name: {type: String, default: '', required: true},
  description: {type: String, default: ''},
});

var subjectSchema = new Schema({
  name: {type: String, default: '', required: true},
  creationDate: {type: Date, default: Date.now},
  description: {type: String, default: ''},
  projects: [projectSchema],
});

var Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;

