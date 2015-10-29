app.controller('SubjectController', ['$http','subjectService', function ($http, subjectService) {
    var subjectController = this;
    var newSubject = '';

    subjectController.subjects = subjectService.getAll();

    subjectController.delete = function (subject) {

        subjectService.delete(subject, function () {
            subjectController.subjects = _.without(subjectController.subjects, subject);
        });
    };

    subjectController.create = function (name) {
        var data = {
            'name': name
        };
        subjectService.create(data, function(data) {
            subjectController.subjects.push(data);
            subjectController.newSubjectName = '';
        });
    };
}]);
