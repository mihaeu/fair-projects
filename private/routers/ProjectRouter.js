var express = require('express');

module.exports = function() {
  var projectController = require('../controllers/ProjectController')();
  var projectRouter = express.Router({mergeParams: true});

  projectRouter.get('/:projectId', projectController.get);
  projectRouter.get('/', projectController.getAll);
  projectRouter.post('/', projectController.create);
  projectRouter.delete('/:projectId', projectController.delete);

  return projectRouter;
};

