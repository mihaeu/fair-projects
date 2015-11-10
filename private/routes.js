var express = require('express');

module.exports = function(app) {
  var subjectRouter = require('./routers/SubjectRouter')(app);
  var memberRouter = require('./routers/MemberRouter')(app);

  var router = express.Router();
  router.use('/subjects', subjectRouter);
  router.use('/members', memberRouter);

  return router;
};
