var express = require('express');

module.exports = function(app) {
    var subjectController = require('../controllers/SubjectController')();
    var subjectRouter = express.Router();
    var projectRouter = require('./ProjectRouter')();

    subjectRouter.use('/:subjectId/projects', projectRouter);

    subjectRouter.get('/:subjectId', subjectController.get);
    subjectRouter.get('/', subjectController.getAll);
    subjectRouter.post('/', subjectController.create);
    subjectRouter.delete('/:subjectId', subjectController.delete);

    return subjectRouter;
};
