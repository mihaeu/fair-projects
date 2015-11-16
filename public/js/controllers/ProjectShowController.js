app.controller('ProjectShowController', ['$http', 'subjectService', 'projectService', 'participantService', '$routeParams',
  function($http, subjectService, projectService, participantService, $routeParams) {

    'use strict';

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

      var requestParameterParticipant = {
        subject: $routeParams.subjectId,
        project: $routeParams.projectId,
      };
      _this.participants = participantService.getAll(requestParameterParticipant);
    };

    _this.init();

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

    /**
     * Creates a project within the current subject.
     * Creates the project on the server and pushes it on success immediately to the project list.
     *
     * @param {Object} newProject
     */
    _this.createParticipant = function(newParticipant) {
      var data = {
        subject: _this.subject._id,
        project: _this.project._id,
        name: newParticipant.name,
      };
      participantService.create(data, function(data) {
        _this.participants.push(data);
        newParticipant.name = '';
      });
    };

    /**
     * Deletes a project.
     *
     * @param {Object} project
     */
    _this.deleteParticipant = function(participant) {
      var requestParameterParticipant = {
        subject: _this.subject._id,
        project: _this.project._id,
        id: participant._id,
      };
      participantService.delete(requestParameterParticipant)
          .$promise.then(function() {
            _this.participants = _.without(_this.participants, participant);
          });
    };
  },
]);
