app.factory('AuthenticationService', ['$q', '$timeout', '$http', '$cookies',
  function($q, $timeout, $http, $cookies) {
    var endpoint = {
      login: '/api/v1/login',
      logout: '/api/v1/logout',
    };

    function isLoggedIn() {
      if ($cookies.get('user')) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return $cookies.get('user');
    }

    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post(endpoint.login, {username: username, password: password})

        // handle success
        .success(function(data, status) {
          if (status === 200) {
            $cookies.put('user', true);
            deferred.resolve();
          } else {
            $cookies.put('user', false);
            deferred.reject();
          }
        })

        // handle error
        .error(function(data) {
          $cookies.put('user', false);
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
          $cookies.put('user', false);
          deferred.resolve();
        })

        // handle error
        .error(function(data) {
          $cookies.put('user', false);
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
