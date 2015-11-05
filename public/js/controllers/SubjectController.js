app.controller('SubjectController', ['$http', 'subjectService', '$scope', '$route', '$routeParams', '$location',
    function ($http, subjectService, $scope, $route, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
        $scope.name = 'SubjectController';
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
    }]);
