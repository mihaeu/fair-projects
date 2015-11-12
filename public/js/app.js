var app = angular.module('fairProjects', ['ngResource', 'ngRoute']);
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/subject/list.html',
      controller: 'SubjectListController',
      controllerAs: 'SubjectListController',
    })
    .when('/subject/:subjectId', {
      templateUrl: 'views/subject/show.html',
      controller: 'SubjectShowController',
      controllerAs: 'SubjectShowController',
    })
    .when('/subject/:subjectId/projects', {
      templateUrl: 'views/project/list.html',
      controller: 'ProjectController',
      controllerAs: 'pc',
    })
    .when('/subject/:subjectId/project/:projectId', {
      templateUrl: 'views/project/show.html',
      controller: 'ProjectController',
      controllerAs: 'pc',
    })
    .otherwise({
      redirectTo: '/',
    });
});
