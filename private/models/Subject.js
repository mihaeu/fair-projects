var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subjectSchema = new Schema({
    name : {type : String, default: '', required: true}
});

var User = mongoose.model('Subject', subjectSchema);

module.exports = User;

