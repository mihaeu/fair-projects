app.factory('AuthenticationService', ['$q', '$timeout', '$http',
  function($q, $timeout, $http) {
    var endpoint = {
      login: '/api/v1/login',
      logout: '/api/v1/logout',
    };
    var user = null;

    function isLoggedIn() {
      if (user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return user;
    }

    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post(endpoint.login, {username: username, password: password})

        // handle success
        .success(function(data, status) {
          if (status === 200) {
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })

        // handle error
        .error(function(data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;
    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.post(endpoint.logout, {})

        // handle success
        .success(function(data) {
          user = false;
          deferred.resolve();
        })

        // handle error
        .error(function(data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
    });

  },
]);
