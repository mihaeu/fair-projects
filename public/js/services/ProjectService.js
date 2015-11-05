app.provider('projectService', function () {
    var endpoint = '/api/v1/subjects';

    this.setEndpoint = function (url) {
        endpoint = url;
    };

    this.$get = function ($resource) {

        return $resource(
            endpoint + '/:subject/projects/:id',
            {
                subject: '@subject',
                _id: '@id'
            },
            {
                'get': {method: 'GET'},
                'create': {method: 'POST'},
                'getAll': {method: 'GET', isArray: true},
                'delete': {method: 'DELETE'},
                'update': {method: 'PUT'}
            }

        );

    };
});
