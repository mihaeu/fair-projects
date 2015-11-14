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
    var Subject = new req.dic.subjectRepository();
    Subject.getAll().then(function(err, subjects) {
      if (err) {
        res.send(err);
      }

      res.json(subjects);
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
    var Subject = req.dic.subject;
    Subject.findById(req.params.subjectId, function(err, subject) {
      if (err || typeof subject === 'undefined' || subject === null) {
        return res.status(404).send('Subject does not exist');
      }

      res.json(subject);
    });
  };

  /**
   * Creates a new Subject
   *
   * @param {http.IncomingMessage} req Express Request Object
   * @param {http.OutgoingMessage} res Express Response Object
   * @callback next Callback which calls the next matching route.
   */
  SubjectController.prototype.create = function(req, res, next) {
    var subject = new req.dic.subject(req.body);
    subject.save(function(err, subject) {
      if (err) {
        return next(err);
      }

      res.status(201).json(subject);
    });
  };

  /**
   * Updates an given subject and returns the updated object.
   *
   * @param {http.IncomingMessage} req Express Request Object
   * @param {http.OutgoingMessage} res Express Response Object
   * @callback next Callback which calls the next matching route.
   */
  SubjectController.prototype.update = function(req, res, next) {
    var Subject = req.dic.subject;
    Subject.findByIdAndUpdate(
      {
        _id: req.params.subjectId,
      },
      {
        name: req.body.name,
        description: req.body.description,
      },
      {
        new: true,
      },
      function(err, subject) {
        if (err) {
          return next(err);
        }

        res.status(201).json(subject);
      }
    );
  };

  /**
   * Deletes a subject with the given {req.params.subjectId})
   *
   * @param {http.IncomingMessage} req Express Request Object
   * @param {http.OutgoingMessage} res Express Response Object
   * @callback next Callback which calls the next matching route.
   */
  SubjectController.prototype.delete = function(req, res, next) {
    var Subject = req.dic.subject;
    Subject.remove({_id: req.params.subjectId}, function(err) {
      if (err) {
        return handleError(err);
      }

      res.status(204).send();
    });
  };

  return new SubjectController();
};
