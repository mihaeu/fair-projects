module.exports = function(app) {
    var subjectRouter = require('./routers/SubjectRouter')(app);

    app.use('/subjects', subjectRouter);
};
