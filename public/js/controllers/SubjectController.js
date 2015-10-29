app.controller('SubjectController', ['$http','$subject', function ($http, $subject) {
    var subjectController = this;
    var newSubject = '';

    $subject.getAll().success(function (subjects) {
        subjectController.subjects = subjects;
    });

    subjectController.delete = function (subject) {

        $subject.delete(subject)
            .success(function(){
                subjectController.subjects = _.without(subjectController.subjects, subject);
            });
    };

    subjectController.create = function (){
        var data = {"name": subjectController.newSubjectName};
        $subject.create(data)
            .success(function(data){
                subjectController.subjects.push(data);
                subjectController.newSubjectName = "";
            });
    };
}]);