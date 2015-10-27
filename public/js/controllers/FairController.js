app.controller('FairController', ['$http', function ($http) {
    var subjects = this;
    var newSubject;

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

    subjects.create = function (){
        var data = {"name": subjects.newSubjectName};
        $http
            .post('/subjects', data)
            .error(function(){
                console.log('post');
            })
            .success(function(data){
                subjects.subjects.push(data);
                subjects.newSubjectName = "";
            });
    };
}]);