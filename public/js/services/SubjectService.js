app.factory('$subject', ['$http', '$log', function ($http, $log) {
    function SubjectService() {
    }

    SubjectService.prototype.getAll = function () {
        var promise = $http.get('/subjects')
            .success(function (data) {
                $log.debug('Successful fetched all subjects.');
            })
            .error(function () {
                $log.error('Error on fetching all subjects', '. Error #', 1446127640);
            });
        return promise;
    };

    SubjectService.prototype.create = function (data) {
        var promise = $http.post('/subjects', data)
            .success(function (data) {
                $log.debug('Successful created new subject.');
            })
            .error(function () {
                $log.error('Error on creating new subject with this data: \n', data, '. Error #', 1446129378);
            });

        return promise;
    };

    SubjectService.prototype.delete = function (subject) {
        var promise = $http
            .delete('/subjects/' + subject._id)
            .success(function () {
                $log.debug('Successful deleted subject with id: ', subject._id);
            })
            .error(function () {
                $log.error('Error on deleting subject with id: ', subject._id, '. Error #', 1446126875);
            });
        return promise;
    };

    return new SubjectService();
}]);