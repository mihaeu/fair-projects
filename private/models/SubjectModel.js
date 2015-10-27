// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Subject', {
    name : {type : String, default: ''}
});