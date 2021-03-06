module.exports = function() {

  'use strict';

  var express = require('express');
  var projectRouter = express.Router({mergeParams: true});
  var participantRouter = require('./ParticipantRouter')();
  var projectController = require('../controllers/ProjectController')();

  var dicMiddleware = function(req, res, next) {
    req.dic = {
      subjectRepository: require('../models/SubjectRepository'),
    };
    next();
  };

  projectRouter.use('/', dicMiddleware);

  // Register SubRouter
  projectRouter.use('/:projectId/participants', participantRouter);

  projectRouter.get('/:projectId', projectController.get);
  projectRouter.get('/', projectController.getAll);
  projectRouter.post('/', projectController.create);
  projectRouter.put('/:projectId', projectController.update);
  projectRouter.delete('/:projectId', projectController.delete);

  return projectRouter;
};

