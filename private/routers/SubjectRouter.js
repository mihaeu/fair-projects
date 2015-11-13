var express = require('express');

module.exports = function() {
  var SubjectModel = require('../models/Subject');
  var subjectController = new (require('../controllers/SubjectController'))(SubjectModel);
  var subjectRouter = express.Router();
  var projectRouter = require('./ProjectRouter')();

  // Register Middleware
  var dicMiddleware = function(req, res, next) {
    req.dic = {
      subject: require('../models/Subject'),
    };
    next();
  };

  subjectRouter.use('/', dicMiddleware);

  // Register SubRouter
  subjectRouter.use('/:subjectId/projects', projectRouter);

  // Regsiter Controller
  subjectRouter.get('/:subjectId', subjectController.get);
  subjectRouter.get('/', subjectController.getAll);
  subjectRouter.post('/', subjectController.create);
  subjectRouter.put('/:subjectId', subjectController.update);
  subjectRouter.delete('/:subjectId', subjectController.delete);

  return subjectRouter;
};
