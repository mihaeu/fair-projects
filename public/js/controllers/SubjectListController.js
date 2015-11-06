app.controller('SubjectListController', ['subjectService', '$routeParams',
    function (subjectService, $routeParams) {
        var SubjectListController = this;

        SubjectListController.subjects = subjectService.getAll();

        SubjectListController.create = function (name) {
            var data = {
                'name': name
            };
            subjectService.create(data, function (data) {
                SubjectListController.subjects.push(data);
                SubjectListController.newSubjectName = '';
            });
        };

        SubjectListController.delete = function (subject) {

            subjectService.delete(subject, function () {
                SubjectListController.subjects = _.without(SubjectListController.subjects, subject);
            });
        };
    }]);
