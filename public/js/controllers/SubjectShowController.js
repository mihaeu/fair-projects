app.controller('SubjectShowController', ['subjectService', '$routeParams',
    function (subjectService, $routeParams) {
        var SubjectShowController = this;

        var data = {
            '_id': $routeParams.id
        };
        SubjectShowController.subject = subjectService.get(data, function (data) {});

        /**
         * Updates the current subject
         */
        SubjectShowController.update = function () {
            var data = {
                'id': $routeParams.id
            };
            data.name = SubjectShowController.subject.name;
            data.description = SubjectShowController.subject.description;
            subjectService.update(data, function (data) {
                SubjectShowController.subject.name = data.name;
                SubjectShowController.subject.description = data.description;
            });
        };
    }
]);
