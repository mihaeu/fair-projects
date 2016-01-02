app.controller('LoginController',
  ['$location', 'AuthenticationService',
    function($location, AuthenticationService) {

      'use strict';

      var _this = this;

      _this.login = function() {

        _this.error = false;
        _this.disabled = true;

        AuthenticationService.login(
          _this.loginForm.username,
          _this.loginForm.password
        )

          .then(function() {
            $location.path('/');
            _this.disabled = false;
            _this.loginForm = {};
          })

          .catch(function() {
            _this.error = true;
            _this.errorMessage = 'Invalid username and/or password';
            _this.disabled = false;
            _this.loginForm = {};
          });

      };

    },
  ]);
