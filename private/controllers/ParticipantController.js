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
  ParticipantController.prototype.getAll = function(req, res) {
    var Participant = req.dic.participant;
    Participant.find(function(err, participants) {
      if (err) {
        res.send(err);
      }

      res.json(participants);
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
    var Subject = req.dic.subject;
    Subject.findById(req.params.subjectId, function(err, subject) {
      if (err || typeof subject === 'undefined' || subject === null) {
        return next(err);
      }

      res.json(subject);
    });
  };

};
