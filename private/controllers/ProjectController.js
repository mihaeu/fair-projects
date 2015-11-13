/**
 * Project Controller
 * @module ProjectController
 */

/**
 * Creates a ProjectController
 * @returns {ProjectController}
 */
module.exports = function() {

  /**
   * Projectcontroller handles project CRUD requests.
   * @constructor
   */
  function ProjectController() {}

  /**
   * Gets all projects from the subject defined in {req.params.subjectId}.
   *
   * @param {http.IncomingMessage} req Express Request Object
   * @param {http.OutgoingMessage} res Express Response Object
   * @callback next Callback which calls the next matching route.
   */
  ProjectController.prototype.getAll = function(req, res, next) {
    var Subject = req.dic.subject;
    Subject.findById(req.params.subjectId, function(err, subject) {

      if (err || typeof subject === 'undefined' || subject === null) {
        return res.status(404).send('Subject does not exist'); //TODO: introduce error codes!
      }

      res.json(subject.projects);
    });
  };

  /**
   * Gets one project for given subject and project
   * ({req.params.subjectId} and {req.params.subjectId}).
   *
   * @param {http.IncomingMessage} req Express Request Object
   * @param {http.OutgoingMessage} res Express Response Object
   * @callback next Callback which calls the next matching route.
   */
  ProjectController.prototype.get = function(req, res, next) {
    var Subject = req.dic.subject;
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

  /**
   * Creates a new Project inside the given subject({req.params.subjectId}).
   *
   * If operation success the new project is returned to the client.
   * If subject does not exist a 404 http status is returned to client.
   *
   * @param {http.IncomingMessage} req Express Request Object
   * @param {http.OutgoingMessage} res Express Response Object
   * @callback next Callback which calls the next matching route.
   */
  ProjectController.prototype.create = function(req, res, next) {
    var Subject = req.dic.subject;
    Subject.findById(req.params.subjectId, function(err, subject) {
      if (err || typeof subject === 'undefined' || subject === null) {
        return res.status(404).send('Subject does not exist'); //TODO: introduce error codes!
      }

      var newProject = subject.projects.create(req.body);
      subject.projects.push(newProject);
      subject.save(function(err, subject) {
        if (err) {
          return next(err);
        }

        res.status(201).json(newProject);
      });
    });
  };

  /**
   * Updates an given project and returns the updated object.
   *
   * @param {http.IncomingMessage} req Express Request Object
   * @param {http.OutgoingMessage} res Express Response Object
   * @callback next Callback which calls the next matching route.
   */
  ProjectController.prototype.update = function(req, res, next) {
    var Subject = req.dic.subject;
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
          return next(err);
        }

        res.status(200).json(project);
      }
    );
  };

  /**
   * Deletes a project for given project and subject id.
   * ({req.params.subjectId} and {req.params.subjectId})
   *
   * @param {http.IncomingMessage} req Express Request Object
   * @param {http.OutgoingMessage} res Express Response Object
   * @callback next Callback which calls the next matching route.
   */
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
          return next(err);
        }

        res.status(204).json();
      });
    });
  };

  return new ProjectController();
};
