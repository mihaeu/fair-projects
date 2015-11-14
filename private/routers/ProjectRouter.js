var express = require('express');

module.exports = function() {
  'use strict';

  var projectController = require('../controllers/ProjectController')();
  var projectRouter = express.Router({mergeParams: true});

  projectRouter.get('/:projectId', projectController.get);
  projectRouter.get('/', projectController.getAll);
  projectRouter.post('/', projectController.create);
  projectRouter.put('/:projectId', projectController.update);
  projectRouter.delete('/:projectId', projectController.delete);

  return projectRouter;
};

