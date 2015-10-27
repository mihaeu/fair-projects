var mongoose = require('mongoose');

module.exports = mongoose.model('Subject', {
    name : {type : String, default: ''}
});