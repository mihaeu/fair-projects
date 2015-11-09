function SubjectController() {}

SubjectController.prototype.getAll = function (req, res) {
    var Subject = req.dic.subject;
    Subject.find(function (err, subjects) {
        if (err) {
            res.send(err);
        }
        res.json(subjects);
    });
};

SubjectController.prototype.get = function (req, res, next) {
    var Subject = req.dic.subject;
    Subject.findById(req.params.subjectId, function(err, subject) {
        if (err || typeof subject == 'undefined' || subject === null) {
            return next(err);
        }
        res.json(subject);
    });
};

SubjectController.prototype.create = function (req, res, next) {
    var Subject = req.dic.subject;
    var subject = new Subject(req.body);
    subject.save(function (err, subject) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.status(201).json(subject);
    });
};

SubjectController.prototype.update = function (req, res, next) {
    var Subject = req.dic.subject;
    Subject.findByIdAndUpdate(
            {
                _id: req.params.subjectId
            },
            {
                name: req.body.name,
                description: req.body.description
            },
            {
                new : true
            },
            function (err, subject) {
                if (err) {
                    return next(err);
                }
                res.status(201).json(subject);
            }
    );
};

SubjectController.prototype.delete = function (req, res, next) {
    var Subject = req.dic.subject;
    Subject.remove({_id: req.params.subjectId}, function (err) {
        if (err) {
            console.log(err);
            return handleError(err);
        }
        res.status(204).send();
    });
};

module.exports = SubjectController;
