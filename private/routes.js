var express = require('express');

module.exports = function(app) {
  var subjectRouter = require('./routers/SubjectRouter')(app);

  var router = express.Router();
  router.use('/subjects', subjectRouter);

  return router;
};
