/**
 * SubjectController
 * @module SubjectController
 */

/**
 * Creates a SubjectController
 * @returns {SubjectController}
 */
module.exports = function() {

  'use strict';

  /**
   * @constructor
   */
  function SubjectController() {}

  /**
   * Returns all subjects as JSON
   *
   * @param {http.IncomingMessage} req Express Request Object
   * @param {http.OutgoingMessage} res Express Response Object
   */
  SubjectController.prototype.getAll = function(req, res) {
    var subjectRepository = new req.dic.subjectRepository();
    subjectRepository.getAll().then(function(subjects) {
        res.json(subjects);
      }, function(err) {
        res.send(err);
      });
  };

  /**
   * Returns a single Subject from subjectID
   *
   * @param {http.IncomingMessage} req Express Request Object
   * @param {http.OutgoingMessage} res Express Response Object
   * @callback next Callback which calls the next matching route.
   */
  SubjectController.prototype.get = function(req, res, next) {
    var subjectRepository = new req.dic.subjectRepository();
    subjectRepository
      .getById(req.params.subjectId)
      .then(function(subject) {
          res.json(subject);
        }, function(err) {
          return res.status(404).send('Subject does not exist' + err.body);
      });
  };

  /**
   * Creates a new Subject.
   *
   * @param {http.IncomingMessage} req Express Request Object
   * @param {http.OutgoingMessage} res Express Response Object
   * @callback next Callback which calls the next matching route.
   */
  SubjectController.prototype.create = function(req, res, next) {
    //var subject = new req.dic.subject(req.body);
    var subjectRepository = new req.dic.subjectRepository();
    var subject = subjectRepository.create(req.body);
    subject.save(function(err, subject) {
      if (err) {
        return next(err);
      }

      res.status(201).json(subject);
    });
  };

  /**
   * Updates a given subject and returns the updated object.
   *
   * @param {http.IncomingMessage} req - Express Request Object
   * @param {http.OutgoingMessage} res - Express Response Object
   * @param next - Next route that matches.
   * @callback next Callback which calls the next matching route.
   */
  SubjectController.prototype.update = function(req, res, next) {
    var subjectRepository = new req.dic.subjectRepository();
    subjectRepository
      .getById(req.params.subjectId)
      .then(function(subject) {
        subject.name = req.body.name;
        subject.description = req.body.description;

        return subject.save().exec();
      })
      .then(function(subject) {
        res.status(201).json(subject);
      });
  };

  /**
   * Deletes a subject with the given {req.params.subjectId}).
   *
   * @param {http.IncomingMessage} req Express Request Object
   * @param {http.OutgoingMessage} res Express Response Object
   * @param next - Next route that matches.
   * @callback next Callback which calls the next matching route.
   */
  SubjectController.prototype.delete = function(req, res, next) {
    var subjectRepository = new req.dic.subjectRepository();
    subjectRepository
      .delete(req.params.subjectId)
      .then(function() {
          res.status(204).send();
        }, function(err) {
          if (err) {
            return next(err);
          }
        }
      );
  };

  return new SubjectController();
};
