app.controller('SubjectController', ['subjectService', '$routeParams',
    function (subjectService, $routeParams) {
        var subjectController = this;

        subjectController.subjects = subjectService.getAll();

        var data = {
            '_id': $routeParams.id
        };
        subjectController.subject = subjectService.get(data, function (data) {});

        subjectController.create = function (name) {
            var data = {
                'name': name
            };
            subjectService.create(data, function (data) {
                subjectController.subjects.push(data);
                subjectController.newSubjectName = '';
            });
        };

        subjectController.delete = function (subject) {

            subjectService.delete(subject, function () {
                subjectController.subjects = _.without(subjectController.subjects, subject);
            });
        };
    }]
        );
