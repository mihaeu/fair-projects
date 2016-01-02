var express = require('express');

module.exports = function(app) {
  var router = express.Router();
  var authenticationRouter = require('./routers/AuthenticationRouter')(app);
  var subjectRouter = require('./routers/SubjectRouter')(app);
  var participantRouter = require('./routers/ParticipantRouter')(app);
  router.use('/', authenticationRouter);
  router.use('/subjects', subjectRouter);
  router.use('/participants', participantRouter);

  return router;
};
