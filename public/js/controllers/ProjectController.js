app.controller('ProjectController', ['$http', 'subjectService', 'projectService', '$routeParams',
  function($http, subjectService, projectService, $routeParams) {
    var _this = this;
    _this.newProject = {};

    /**
     * List all projects of a subject.
     */
    _this.list = function() {
      var requestParameterProjects = {
        subject: _this.subject._id,
      };
      _this.projects = projectService.getAll(requestParameterProjects);

    };

    /**
     * Shows a single project.
     */
    _this.show = function() {
      var requestParameterProject = {
        subject: _this.subject._id,
        id: $routeParams.projectId,
      };
      _this.project = projectService.get(requestParameterProject);
    };

    /**
     * Creates a new project.
     */
    _this.create = function() {
      var data = {
        subject: _this.subject._id,
        name: _this.newProject.name,
        description: _this.newProject.description,
      };
      projectService.create(data, function(data) {
        _this.projects.push(data);
        _this.newProject.name = '';
        _this.newProject.description = '';
      });
    };

    /**
     * Deletes a project.
     *
     * @param {Object} project
     */
    _this.delete = function(project) {
      var requestParameterProject = {
        subject: _this.subject._id,
        id: project._id,
      };
      projectService.delete(requestParameterProject)
        .$promise.then(function() {
        _this.projects = _.without(_this.projects, project);
      });
    };

    /**
     * Constructor
     */
    _this.init = function() {
      var requestParameterSubject = {
        _id: $routeParams.subjectId,
      };
      subjectService.get(requestParameterSubject).$promise.then(function(subject) {
        _this.subject = subject;

        if (typeof $routeParams.projectId === 'undefined') {
          _this.list();
        } else {
          _this.show();
        }
      });
    };

    _this.init();
  },
]);
