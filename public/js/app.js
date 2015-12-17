var app = angular.module('fairProjects', ['ngResource', 'ngRoute', 'ui.tree']);
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
      redirectTo: '/subject/:subjectId',
    })
    .when('/subject/:subjectId/project/:projectId', {
      templateUrl: 'views/project/show.html',
      controller: 'ProjectShowController',
      controllerAs: 'ProjectShowController',
    })
    .when('/vote/:subjectId', {
      templateUrl: 'views/subject/vote.html',
      controller: 'SubjectVoteController',
      controllerAs: 'SubjectVoteController',
    })
    .otherwise({
      redirectTo: '/',
    });
});
