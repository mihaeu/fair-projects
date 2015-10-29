app.controller('SubjectController', ['$http', function ($http) {
    var subjectController = this;
    var newSubject = '';

    $http.get('/subjects').success(function (data) {
        subjectController.subjects = data;
    });

    subjectController.delete = function (subject) {
    	$http
            .delete('/subjects/' + subject._id)
    		.error(function () {
    			console.log('removed');
    		})
            .success(function(){
                subjectController.subjects = _.without(subjectController.subjects, subject);
            });
    };

    subjectController.create = function (){
        var data = {"name": subjectController.newSubjectName};
        $http
            .post('/subjects', data)
            .error(function(){
                console.log('post');
            })
            .success(function(data){
                subjectController.subjects.push(data);
                subjectController.newSubjectName = "";
            });
    };
}]);