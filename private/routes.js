var express = require('express');

module.exports = function(app) {
  var subjectRouter = require('./routers/SubjectRouter')(app);
  var participantRouter = require('./routers/ParticipantRouter')(app);

  var router = express.Router();
  router.use('/subjects', subjectRouter);
  router.use('/participants', participantRouter);

  return router;
};
