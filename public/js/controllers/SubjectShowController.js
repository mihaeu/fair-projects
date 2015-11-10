app.controller('SubjectShowController', ['subjectService', '$routeParams',
  function(subjectService, $routeParams) {
    var _this = this;

    var data = {
      _id: $routeParams.id,
    };
    _this.subject = subjectService.get(data, function(data) {
    });

    /**
     * Updates the current subject
     */
    _this.update = function() {
      var data = {
        id: $routeParams.id,
      };
      data.name = _this.subject.name;
      data.description = _this.subject.description;
      subjectService.update(data, function(data) {
        _this.subject.name = data.name;
        _this.subject.description = data.description;
      });
    };
  },
]);
