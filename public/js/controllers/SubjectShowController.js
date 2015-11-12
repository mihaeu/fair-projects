app.controller('SubjectShowController', ['subjectService', 'projectService', '$routeParams',
  function(subjectService, projectService, $routeParams) {
    var _this = this;

    /**
     * Initializes the controller.
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

    /**
     * Updates the current subject
     */
    _this.update = function() {
      var data = {
        id: $routeParams.subjectId,
      };
      data.name = _this.subject.name;
      data.description = _this.subject.description;
      subjectService.update(data, function(data) {
        _this.subject.name = data.name;
        _this.subject.description = data.description;
      });
    };

    _this.createProject = function(newProject) {
      var data = {
        subject: _this.subject._id,
        name: newProject.name,
        description: newProject.description,
      };
      projectService.create(data, function(data) {
        _this.projects.push(data);
        newProject.name = '';
        newProject.description = '';
      });
    };

    /**
     * Deletes a project.
     *
     * @param {Object} project
     */
    _this.deleteProject = function(project) {
      var requestParameterProject = {
        subject: _this.subject._id,
        id: project._id,
      };
      projectService.delete(requestParameterProject)
        .$promise.then(function() {
        _this.projects = _.without(_this.projects, project);
      });
    };
  },
]);
