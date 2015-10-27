var Subject = require('../models/Subject');

var get = function (req, res) {
    Subject.find(function(err, subjects) {

        if (err) {
            res.send(err);
        }

        res.json(subjects);
    });
};

var create = function(req, res, next) {
    var subject = new Subject(req.body);
    subject.save(function (err, subject) {
        if (err) {
        	console.log(err);
            return next(err);
        }
        res.json(201,subject);
    });
};

module.exports = {
    get: get,
    create: create
}
