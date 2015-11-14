module.exports = function() {

  'use strict';

  var express = require('express');
  var subjectRouter = express.Router();
  var projectRouter = require('./ProjectRouter')();
  var subjectController = new require('../controllers/SubjectController')();

  // Register Middleware
  var dicMiddleware = function(req, res, next) {
    req.dic = {
      subject: require('../models/Subject'),
      subjectRepository: require('../models/SubjectRepository'),
    };
    next();
  };

  subjectRouter.use('/', dicMiddleware);

  // Register SubRouter
  subjectRouter.use('/:subjectId/projects', projectRouter);

  // Register Controller
  subjectRouter.get('/:subjectId', subjectController.get);
  subjectRouter.get('/', subjectController.getAll);
  subjectRouter.post('/', subjectController.create);
  subjectRouter.put('/:subjectId', subjectController.update);
  subjectRouter.delete('/:subjectId', subjectController.delete);

  return subjectRouter;
};
