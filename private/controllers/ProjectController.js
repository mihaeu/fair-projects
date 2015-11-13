var Subject = require('../models/Subject');

module.exports = function() {
  function ProjectController() {
  }

  ProjectController.prototype.getAll = function(req, res, next) {
    Subject.findById(req.params.subjectId, function(err, subject) {

      if (err || typeof subject === 'undefined' || subject === null) {
        return res.status(404).send('Subject does not exist'); //TODO: introduce error codes!
      }

      res.json(subject.projects);
    });
  };

  ProjectController.prototype.get = function(req, res, next) {
    Subject.findById(req.params.subjectId, function(err, subject) {
      if (err || typeof subject === 'undefined' || subject === null) {
        return res.status(404).send('Subject does not exist'); //TODO: introduce error codes!
      }

      var project = subject.projects.id(req.params.projectId);
      if (project === null) {
        return next();
      }

      res.json(project);
    });
  };

  ProjectController.prototype.create = function(req, res, next) {
    Subject.findById(req.params.subjectId, function(err, subject) {
      if (err || typeof subject === 'undefined' || subject === null) {
        return res.status(404).send('Subject does not exist'); //TODO: introduce error codes!
      }

      var newProject = subject.projects.create(req.body);
      subject.projects.push(newProject);
      subject.save(function(err, subject) {
        if (err) {
          console.log(err);
          return next(err);
        }

        res.status(201).json(newProject);
      });
    });
  };

  ProjectController.prototype.update = function(req, res, next) {
    Subject.update(
      {
        _id: req.params.subjectId,
        'projects._id': req.params.projectId,
      },
      {
        $set: {
          'projects.$.name': req.body.name,
          'projects.$.description': req.body.description,
        },
      },
      function(err, project) {
        if (err) {
          console.log(err);
          return handleError(err);
        }

        res.status(200).json(project);
      }
    );
  };

  ProjectController.prototype.delete = function(req, res, next) {
    Subject.findById(req.params.subjectId, function(err, subject) {
      if (err || typeof subject === 'undefined' || subject === null) {
        return res.status(404).send('Subject does not exist'); //TODO: introduce error codes!
      }

      var project = subject.projects.id(req.params.projectId);
      if (project === null) {
        return next(err);
      }

      project.remove();
      subject.save(function(err, subject) {
        if (err) {
          console.log(err);
          return handleError(err);
        }

        res.status(204).json();
      });
    });
  };

  return new ProjectController();
};
