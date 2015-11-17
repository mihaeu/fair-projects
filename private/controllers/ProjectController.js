/**
 * ProjectController
 * @module ProjectController
 */

/**
 * Creates a ProjectController
 * @returns {ProjectController}
 */
module.exports = function() {

  'use strict';

  /**
   * ProjectController handles project CRUD requests.
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
    return req.dic.subjectRepository
      .getById(req.params.subjectId)
      .then(function(subject) {
        res.json(subject.projects);
      }, function(err) {

        return res.status(404).send('Subject does not exist.' + err);
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
    return req.dic.subjectRepository
      .getById(req.params.subjectId)
      .then(function(subject) {
        var project = subject.projects.id(req.params.projectId);
        if (project === null) {
          return next();
        }

        res.json(project);
      }, function(err) {

        return res.status(404).send('Subject does not exist.' + err);
      }
    );
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
    req.dic.subjectRepository
      .getById(req.params.subjectId)
      .then(function(subject) {
          var newProject = subject.projects.create(req.body);
          subject.projects.push(newProject);
          subject.save(function() {
            res.status(201).json(newProject);
          });
        }, function(err) {

          return res.status(404).send('Subject does not exist.' + err);
        }
      );
  };

  /**
   * Updates an given project and returns the updated object.
   *
   * @param {http.IncomingMessage} req Express Request Object
   * @param {http.OutgoingMessage} res Express Response Object
   * @callback next Callback which calls the next matching route.
   */
  ProjectController.prototype.update = function(req, res, next) {
    req.dic.subjectRepository
      .getById(req.params.subjectId)
      .then(function(subject) {
        for (var i = 0; i < subject.projects.length; ++i) {
          if (subject.projects[i]._id.toString() === req.params.projectId) {
            subject.projects[i].name = req.body.name;
            subject.projects[i].description = req.body.description;
            subject.save();
            res.status(200).json(subject.project[i]);
            break;
          }
        }
      }, function(err) {

        return res.status(404).send('Subject does not exist.' + err);
      });
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
    req.dic.subjectRepository
      .getById(req.params.subjectId)
      .then(function(subject) {
          var project = subject.projects.id(req.params.projectId);
          if (project === null) {
            return next();
          }

          project.remove();
          subject.save(function() {
            res.status(204).json();
          });
        }, function(err) {

          return res.status(404).send('Subject does not exist.' + err);
        }
    );
  };

  return new ProjectController();
};
