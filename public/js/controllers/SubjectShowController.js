app.controller('SubjectShowController', ['subjectService', '$routeParams',
    function (subjectService, $routeParams) {
        var SubjectShowController = this;

        var data = {
            '_id': $routeParams.id
        };
        SubjectShowController.subject = subjectService.get(data, function (data) {});
    }
]);
