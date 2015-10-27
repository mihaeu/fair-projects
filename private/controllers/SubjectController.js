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

var del = function(req, res, next) {
    Subject.remove({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return handleError(err);
        }
    });
};


module.exports = {
    get: get,
    create: create,
    del: del
}
