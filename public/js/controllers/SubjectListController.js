app.controller('SubjectListController', ['subjectService',
    function (subjectService) {
        var SubjectListController = this;

        SubjectListController.subjects = subjectService.getAll();

        /**
         * @param {String} name
         */
        SubjectListController.create = function (name) {
            var data = {
                'name': name
            };
            subjectService.create(data, function (data) {
                SubjectListController.subjects.push(data);
                SubjectListController.newSubjectName = '';
            });
        };

        /**
         * @param {Object} subject
         */
        SubjectListController.delete = function (subject) {
            subjectService.delete(subject, function () {
                SubjectListController.subjects = _.without(SubjectListController.subjects, subject);
            });
        };
    }]);
