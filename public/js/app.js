var app = angular.module('fairProjects', ['ngResource', 'ngRoute']);
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.
            when('/', {
                template: 'test it works',
                controller: 'SubjectController'
            }).
            when('/about', {
                template: '<h1>TODO create country detail view</h1>',
                controller: 'SubjectController'
            }).
            otherwise({
                redirectTo: '/'
            });
});
