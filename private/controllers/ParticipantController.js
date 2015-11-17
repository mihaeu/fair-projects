/**
 * ParticipantController
 * @module ParticipantController
 */

/**
 * Creates a ParticipantController
 * @returns {ParticipantController}
 */
module.exports = function() {

  'use strict';

  /** @constructor */
  function ParticipantController() {}

  /**
   * Adds all participants of a project to the JSON response.
   *
   * @param {http.IncomingMessage} req - Express request object
   * @param {http.OutgoingMessage} res - Express result object
   */
  ParticipantController.prototype.getAll = function(req, res, next) {
    req.dic.subjectRepository
      .getById(req.params.subjectId)
      .then(function(subject) {
        var project = subject.projects.id(req.params.projectId);
        res.json(project.participants);
      }, function(err) {

        return res.status(404).send('Project does not exist.' + err);
      });
  };

  /**
   * Adds a single participant of a project to the JSON response.
   *
   * @todo Refactor
   * @param {http.IncomingMessage} req - Express request object
   * @param {http.OutgoingMessage} res - Express result object
   * @param {type} next
   */
  ParticipantController.prototype.get = function(req, res, next) {
    req.dic.subjectRepository
        .getById(req.params.projectId)
        .then(function(subject) {
          var project = subject.projects.id(req.params.projectId);
          var participant = project.participants.id(req.params.participantId);
          if (project === null) {
            return next();
          }

          res.json(participant);
        }, function(err) {

          return res.status(404).send('Project does not exist.' + err);
        }
    );
  };

  ParticipantController.prototype.create = function(req, res, next) {
    req.dic.subjectRepository
      .getById(req.params.subjectId)
      .then(function(subject) {
          var project = subject.projects.id(req.params.projectId);
          var newParticipant = project.participants.create(req.body);
          project.participants.push(newParticipant);
          subject.save(function() {
            res.status(201).json(newParticipant);
          });
        }, function(err) {

          return res.status(404).send('Project does not exist.' + err);
        }
      );
  };

  ParticipantController.prototype.delete = function(req, res, next) {
    req.dic.subjectRepository
      .getById(req.params.subjectId)
      .then(function(subject) {
          var p = subject.projects.id(req.params.projectId);
          var project = p.participants.id(req.params.participantId);
          if (project === null) {
            return next();
          }

          project.remove();
          subject.save(function() {
            res.status(204).json();
          });
        }, function(err) {

          return res.status(404).send('Project does not exist.' + err);
        }
    );
  };

  return new ParticipantController();
};
