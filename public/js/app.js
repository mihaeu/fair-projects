var app = angular.module('fairProjects', ['ngResource', 'ngRoute']);
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
            .when('/', {
                templateUrl: 'views/subject/list.html',
                controller: 'SubjectController'
            })
            .when('/subject/:id', {
                templateUrl: 'views/subject/show.html',
                controller: 'SubjectController'
            })
            .otherwise({
                redirectTo: '/'
            });
});
