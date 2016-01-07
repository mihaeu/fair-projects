app.controller('SubjectShowController', ['subjectService', 'projectService', '$routeParams',
  function(subjectService, projectService, $routeParams) {

    'use strict';

    var _this = this;

    /**
     * State of edit mode
     *
     * @var boolean
     */
    _this.isEditMode = false;

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
      _this.projects = projectService.getAll(requestParameterProjects).$promise.then(function(projects) {
        for (var i in projects) {
          projects[i].votes = [0, 0, 0, 0];
          for (var j in projects[i].participants) {
            var vote = projects[i].participants[j].vote;
            if (projects[i].votes[vote] === undefined) {
              projects[i].votes[vote] = 0;
            }

            projects[i].votes[vote]++;
          }
        }

        _this.projects = projects;
      });
    };

    _this.init();

    /**
     * Enables the edit mode
     */
    _this.edit = function() {
      _this.isEditMode = true;
    };

    /**
     * Disables the edit mode and resets it
     */
    _this.editAbort = function() {
      _this.init();
      _this.isEditMode = false;
    };

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
        _this.isEditMode = false;
      });
    };

    /**
     * Creates a project within the current subject.
     * Creates the project on the server and pushes it on success immediately to the project list.
     *
     * @param {Object} newProject
     */
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
