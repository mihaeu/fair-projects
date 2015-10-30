var Subject = require('../models/Subject');

module.exports = function () {
    function SubjectController() {}

    SubjectController.prototype.get = function (req, res) {

        Subject.find(function (err, subjects) {
            if (err) {
                res.send(err);
            }
            res.json(subjects);
        });
    };

    SubjectController.prototype.create = function (req, res, next) {
        var subject = new Subject(req.body);
        subject.save(function (err, subject) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.status(201).json(subject);
        });
    };

    SubjectController.prototype.delete = function (req, res, next) {
        Subject.remove({_id: req.params.id}, function (err) {
            if (err) {
                console.log(err);
                return handleError(err);
            }
            res.status(204).send();
        });
    };

    return new SubjectController();
};
