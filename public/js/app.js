var app = angular.module('fairProjects', ['ngResource', 'ngRoute', 'ui.tree', 'ngCookies']);
app.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'views/authentication/login.html',
      controller: 'LoginController',
      controllerAs: 'LoginController',
    })
    .when('/logout', {
      controller: 'LogoutController',
      controllerAs: 'LogoutController',
    })
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

  $httpProvider.interceptors.push(function($q, $rootScope) {
    return {
      responseError: function(response) {
        if (response.status === 401) {
          // Handle 401 error code
          $rootScope.$broadcast('authorizationError');
        }

        // Always reject (or resolve) the deferred you're given
        return $q.reject(response);
      },
    };
  });
});

app.run(function($rootScope, $location, $route, AuthenticationService) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if (AuthenticationService.isLoggedIn() === false) {
      $location.path('/login');
    }
  });
});
