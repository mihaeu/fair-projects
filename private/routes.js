module.exports = function(app) {
    var subjectController = require('./controllers/SubjectController')(app);

    app.get('/subjects', subjectController.get);
    app.post('/subjects', subjectController.create);
    app.delete('/subjects/:id', subjectController.delete);
};
