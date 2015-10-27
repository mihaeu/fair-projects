app.controller('FairController', ['$http', function ($http) {
    var subjects = this;
    $http.get('/subjects').success(function (data) {
        subjects.subjects = data;
    });

    subjects.delete = function (subject) {
    	$http
            .delete('/subjects/' + subject._id)
    		.error(function () {
    			console.log('removed');
    		});
    };
}]);