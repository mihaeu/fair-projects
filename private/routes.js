module.exports = function(app) {
    var subjectController = require('./controllers/SubjectController')();

    app.get('/subjects/:id', subjectController.get);
    app.get('/subjects', subjectController.getAll);
    app.post('/subjects', subjectController.create);
    app.delete('/subjects/:id', subjectController.delete);
};
