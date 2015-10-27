module.exports = function(app) {
    var subjectController = require('./controllers/SubjectController');
    app.get('/subjects', subjectController.get);

};