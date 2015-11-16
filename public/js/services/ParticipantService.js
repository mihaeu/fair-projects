app.provider('participantService', function() {
  var endpoint = '/api/v1/subjects';

  this.setEndpoint = function(url) {
    endpoint = url;
  };

  this.$get = function($resource) {

    return $resource(
      endpoint + '/:subject/projects/:project/participants/:id',
      {
        subject: '@subject',
        project: '@project',
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
