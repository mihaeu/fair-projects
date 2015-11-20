app.controller('SubjectListController', ['subjectService',
  function(subjectService) {
    var _this = this;

    _this.subjects = subjectService.getAll();

    /**
     * @param {Object} newSubject
     */
    _this.create = function (newSubject) {
      var data = {
        name: newSubject.name,
        description: newSubject.description,
      };
      subjectService.create(data, function (data) {
        _this.subjects.push(data);
        newSubject.name = '';
        newSubject.description = '';
      });
    };

    /**
     * @param {Object} subject
     */
    _this.delete = function(subject) {
      subjectService.delete(subject, function() {
        _this.subjects = _.without(_this.subjects, subject);
      });
    };
  },
]);
