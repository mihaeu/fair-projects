module.exports = function() {

  'use strict';

  var express = require('express');
  var participantRouter = express.Router({mergeParams: true});
  var participantController = require('../controllers/ParticipantController')();

  var dicMiddleware = function(req, res, next) {
    req.dic = {
      subjectRepository: require('../models/SubjectRepository'),
    };
    next();
  };

  participantRouter.use('/', dicMiddleware);

  participantRouter.get('/:participantId', participantController.get);
  participantRouter.get('/', participantController.getAll);
  participantRouter.post('/', participantController.create);
  participantRouter.delete('/:participantId', participantController.delete);

  return participantRouter;
};
