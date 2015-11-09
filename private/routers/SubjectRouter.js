var express = require('express');

module.exports = function() {
    var SubjectModel = require('../models/Subject');
    var subjectController = new (require('../controllers/SubjectController'))(SubjectModel);

    var subjectRouter = express.Router();
    var projectRouter = require('./ProjectRouter')();

    subjectRouter.use('/:subjectId/projects', projectRouter);

    var dicMiddleware = function (req, res, next) {
        req.dic = {
            subject: require('../models/Subject')
        };
        next();
    };

    subjectRouter.get('/:subjectId', dicMiddleware, subjectController.get);
    subjectRouter.get('/', dicMiddleware, subjectController.getAll);
    subjectRouter.post('/', dicMiddleware, subjectController.create);
    subjectRouter.put('/:subjectId', dicMiddleware, subjectController.update);
    subjectRouter.delete('/:subjectId', dicMiddleware, subjectController.delete);

    return subjectRouter;
};
