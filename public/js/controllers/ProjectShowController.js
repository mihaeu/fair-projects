app.controller('ProjectShowController', ['$http', 'subjectService', 'projectService', 'participantService', '$routeParams',
  function($http, subjectService, projectService, participantService, $routeParams) {
    var _this = this;

    /**
     * Constructor
     */
    _this.init = function() {
      var requestParameterSubject = {
        _id: $routeParams.subjectId,
      };
      _this.subject = subjectService.get(requestParameterSubject);

      var requestParameterProject = {
        subject: $routeParams.subjectId,
        id: $routeParams.projectId,
      };
      _this.project = projectService.get(requestParameterProject);
    };

    /**
     * Updates the current project
     */
    _this.update = function() {
      var where = {
        subject: _this.subject._id,
        id: _this.project._id,
      };
      var updateData = {
        name: _this.project.name,
        description: _this.project.description,
      };
      projectService.update(where, updateData);
    };

    _this.init();
  },
]);
