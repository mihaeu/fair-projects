app.controller('SubjectController', ['$http','$subject', function ($http, $subject) {
    var subjectController = this;
    var newSubject = '';

    subjectController.subjects = $subject.getAll();

    subjectController.delete = function (subject) {

        $subject.delete(subject, function () {
            subjectController.subjects = _.without(subjectController.subjects, subject);
        });
    };

    subjectController.create = function (name){
        var data = {
            "name": name
        };
        $subject.create(data, function(data){
            subjectController.subjects.push(data);
            subjectController.newSubjectName = "";
        });
    };
}]);