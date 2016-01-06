app.controller('SubjectVoteController', ['subjectService', 'projectService', '$routeParams',
  function(subjectService, projectService, $routeParams) {

    'use strict';

    var _this = this;
    /**
     * Initializes the controller
     */
    _this.init = function() {
      var requestParameterSubjects = {
        _id: $routeParams.subjectId,
      };
      _this.subject = subjectService.get(requestParameterSubjects);

      var requestParameterProjects = {
        subject: $routeParams.subjectId,
      };
      _this.projects = projectService.getAll(requestParameterProjects);
    };

    _this.init();

    _this.update = function(projects) {
      var data = {
        id: $routeParams.subjectId,
      };
      subjectService.update(data, function(data) {
      });
    };
  },
]);
