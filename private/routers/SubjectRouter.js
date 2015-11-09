var express = require('express');

module.exports = function() {
    var SubjectModel = require('../models/Subject');
    var SubjectController = require('../controllers/SubjectController');

    var subjectController = new SubjectController(SubjectModel);

    var subjectRouter = express.Router();
    var projectRouter = require('./ProjectRouter')();

    subjectRouter.use('/:subjectId/projects', projectRouter);

    var dicMiddleware = function(req, res, next) {
        req.dic = {
            subject: require('../models/Subject')
        };
        next();
    };

    subjectRouter.get('/:subjectId', dicMiddleware, subjectController.get);
    subjectRouter.get('/', dicMiddleware, subjectController.getAll);
    subjectRouter.post('/', dicMiddleware, subjectController.create);
    subjectRouter.delete('/:subjectId', dicMiddleware, subjectController.delete);

    return subjectRouter;
};
