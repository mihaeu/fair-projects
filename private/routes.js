var subjectController = require('./controllers/SubjectController');
module.exports = function(app) {
    app.get('/subjects', subjectController.get);
    app.post('/subjects', subjectController.create);
    app.delete('/subjects/:id', subjectController.del);
};