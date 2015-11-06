var app = angular.module('fairProjects', ['ngResource', 'ngRoute']);
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
            .when('/', {
                templateUrl: 'views/subject/list.html',
                controller: 'SubjectController',
                controllerAs: 'subjectController'
            })
            .when('/subject/:id', {
                templateUrl: 'views/subject/show.html',
                controller: 'SubjectController',
                controllerAs: 'subjectController'
            })
            .when('/subject/:subjectId/projects', {
                templateUrl: 'views/project/list.html',
                controller: 'ProjectController',
                controllerAs:'pc'
            })
            .when('/subject/:subjectId/project/:projectId', {
                templateUrl: 'views/project/show.html',
                controller: 'ProjectController',
                controllerAs:'pc'
            })
            .otherwise({
                redirectTo: '/'
            });
});
