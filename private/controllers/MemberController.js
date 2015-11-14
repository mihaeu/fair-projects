/**
 * MemberController
 * @module MemberController
 */

/**
 * Creates a MemberController
 * @returns {MemberController}
 */
module.exports = function() {

  'use strict';

  /** @constructor */
  function MemberController() {}

  /**
   * Adds all members of a project to the JSON respone.
   *
   * @param {http.IncomingMessage} req - Express request object
   * @param {http.OutgoingMessage} res - Express result object
   */
  MemberController.prototype.getAll = function(req, res) {
    var Member = req.dic.member;
    Member.find(function(err, members) {
      if (err) {
        res.send(err);
      }

      res.json(members);
    });
  };

  /**
   * Adds a single member of a project to the JSON response.
   *
   * @todo Refactor
   * @param {http.IncomingMessage} req - Express request object
   * @param {http.OutgoingMessage} res - Express result object
   * @param {type} next
   */
  MemberController.prototype.get = function(req, res, next) {
    var Subject = req.dic.subject;
    Subject.findById(req.params.subjectId, function(err, subject) {
      if (err || typeof subject === 'undefined' || subject === null) {
        return next(err);
      }

      res.json(subject);
    });
  };

};
