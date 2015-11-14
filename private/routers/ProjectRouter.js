module.exports = function() {

  'use strict';

  var express = require('express');
  var projectRouter = express.Router({mergeParams: true});
  var projectController = require('../controllers/ProjectController')();

  var dicMiddleware = function(req, res, next) {
    req.dic = {
      subject: require('../models/Subject'),
      subjectRepository: require('../models/SubjectRepository'),
    };
    next();
  };

  projectRouter.use('/', dicMiddleware);

  projectRouter.get('/:projectId', projectController.get);
  projectRouter.get('/', projectController.getAll);
  projectRouter.post('/', projectController.create);
  projectRouter.put('/:projectId', projectController.update);
  projectRouter.delete('/:projectId', projectController.delete);

  return projectRouter;
};

