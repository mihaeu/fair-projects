app.controller('LogoutController',
  ['$location', 'AuthenticationService',
    function($location, AuthenticationService) {

      'use strict';

      var _this = this;

      _this.logout = function() {

        AuthenticationService.logout()
          .then(function() {
            $location.path('/login');
          });

      };

      _this.isLoggedIn = function() {
        return AuthenticationService.isLoggedIn();
      };

    },
  ]);
