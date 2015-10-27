var Subject = require('../models/SubjectModel');

var get = function (req, res) {
    Subject.find(function(err, subjects) {

        // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(subjects); // return all nerds in JSON format
    });
};

var create = function(req, res, next) {
    var subject = new Subject(req.body);
    subject.save(function (err, subject) {
        if (err) {
            return next(err);
        }
        res.json(201,subject);
    });
};


// Define public methods
module.exports = {
    get: get,
    create: create
}
