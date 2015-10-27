app.controller('FairController', ['$http', function ($http) {
    var subjects = this;
    $http.get('/subjects').success(function (data) {
        subjects.subjects = data;
    });
}]);