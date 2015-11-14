var express = require('express');

module.exports = function() {
  var ParticipantModel = require('../models/Participant');
  var ParticipantController = new (require('../controllers/ParticipantController'))();

  var subjectRouter = express.Router();
  var projectRouter = require('./ProjectRouter')();

  subjectRouter.use('/:subjectId/projects', projectRouter);

  var dicMiddleware = function(req, res, next) {
    req.dic = {
      subject: require('../models/Subject'),
    };
    next();
  };

  //participantRouter.get('/:subjectId', dicMiddleware, ParticipantController.get);
  //participantRouter.get('/', dicMiddleware, ParticipantController.getAll);
  //participantRouter.post('/', dicMiddleware, ParticipantController.create);
  //participantRouter.put('/:subjectId', dicMiddleware, ParticipantController.update);
  //participantRouter.delete('/:subjectId', dicMiddleware, ParticipantController.delete);

  return subjectRouter;
};
