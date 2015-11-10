function MemberController() {
}

/**
 *
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
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
 * @todo Refactor
 * @param {type} req
 * @param {type} res
 * @param {type} next
 * @returns {undefined}
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

module.exports = MemberController;
