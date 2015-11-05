var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name : {type : String, default: '', required: true},
    description : {type : String, default: ''}
});

var subjectSchema = new Schema({
    name : {type : String, default: '', required: true},
    projects: [projectSchema]
});

var Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;

