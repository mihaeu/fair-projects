app.controller('SubjectController', ['$http', 'subjectService', '$scope',
    function ($http, subjectService, $scope, $route, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
        $scope.name = 'SubjectController';
        var subjectController = this;

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
            subjectService.create(data, function (data) {
                subjectController.subjects.push(data);
                subjectController.newSubjectName = '';
            });
        };
    }]);
