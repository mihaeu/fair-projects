app.provider('participantService', function() {
  var endpoint = '/api/v1/participants';

  this.setEndpoint = function(url) {
    endpoint = url;
  };

  this.$get = function($resource) {

    return $resource(
      endpoint + '/:_id',
      {
        _id: '@id',
      },
      {
        get: {method: 'GET'},
        create: {method: 'POST'},
        getAll: {method: 'GET', isArray: true},
        delete: {method: 'DELETE'},
        update: {method: 'PUT'},
      }
    );

  };
});
