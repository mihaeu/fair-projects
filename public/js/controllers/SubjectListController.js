app.controller('SubjectListController', ['subjectService',
  function(subjectService) {
    var _this = this;

    _this.subjects = subjectService.getAll();

    /**
     * @param {String} name
     */
    _this.create = function(name) {
      var data = {
        name: name,
      };
      subjectService.create(data, function(data) {
        _this.subjects.push(data);
        _this.newSubjectName = '';
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
