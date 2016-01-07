app.controller('ProjectShowController',
  ['subjectService', 'projectService', 'participantService', '$routeParams',
    function(subjectService, projectService, participantService, $routeParams) {

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
       * Updates the current participant
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
        _this.isEditMode = false;
      };

      /**
       * Deletes a participant
       *
       * @param {Object} participant
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
