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
    return req.dic.subjectRepository
      .getAll()
      .then(function(subjects) {
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
    return req.dic.subjectRepository
      .getById(req.params.subjectId)
      .then(function(subject) {
        res.json(subject);
      }, function(err) {

        return res.status(404).send('Subject does not exist' + err.body);
      }
    );
  };

  /**
   * Creates a new Subject.
   *
   * @param {http.IncomingMessage} req Express Request Object
   * @param {http.OutgoingMessage} res Express Response Object
   * @callback next Callback which calls the next matching route.
   */
  SubjectController.prototype.create = function(req, res, next) {
    var subject = req.dic.subjectRepository.create(req.body);
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
    req.dic.subjectRepository
      .getById(req.params.subjectId)
      .then(function(subject) {
        if (req.body.name !== undefined) {
          subject.name = req.body.name;
          subject.description = req.body.description;
        } else {
          for (var i = 0; i < req.body.projects.length; ++i) {
            for (var j = 0; j < subject.projects.length; ++j) {
              if (req.body.projects[i].name === subject.projects[j].name) {
                for (var k = 0; i < subject.projects[j].participants.length; ++k) {
                  if (req.user.username === subject.projects[j].participants[k].name) {
                    subject.projects[j].participants[k].vote = i + 1;
                    break;
                  } else if (k + 1 === subject.projects[j].participants.length) {
                    subject.projects[j].participants[k + 1] = {
                      name: req.user.username,
                      vote: i + 1,
                    };
                  }
                }

                if (subject.projects[j].participants.length === 0) {
                  subject.projects[j].participants = [{
                    name: req.user.username,
                    vote: i + 1,
                  },
                  ];
                }

                break;
              }
            }
          }
        }

        return subject.save();
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
    req.dic.subjectRepository
      .delete(req.params.subjectId)
      .then(function() {
          res.status(204).send();
        }, function(err) {

          return next(err);
        }
      );
  };

  return new SubjectController();
};
