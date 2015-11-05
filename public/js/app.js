var app = angular.module('fairProjects', ['ngResource', 'ngRoute']);
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
            .when('/', {
                templateUrl: 'views/subject/list.html',
                controller: 'SubjectController',
                controllerAs: 'fair'
            })
            .when('/subject/:id', {
                templateUrl: 'views/subject/show.html',
                controller: 'SubjectController',
                controllerAs: 'fair'
            })
            .when('/subject/:id/projects', {
                templateUrl: 'views/project/list.html',
                controller: 'ProjectController'
            })
            .otherwise({
                redirectTo: '/'
            });
});
