describe('ProjectController', function() {

  'use strict';

  beforeEach(module('fairProjects'));

  var $controller;
  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  var mockSubjectService = {
    get: function() {},
  };

  var mockProjectService = {
    get: function() {},

    update: function() {},
  };

  var mockParticipantService = {
    getAll: function() {},

    create: function() {},

    delete: function() {},
  };

  var $routeParams = {
    subjectId: 1,
    projectId: 1,
  };

  it('updates the project', function() {

    spyOn(mockSubjectService, 'get').and.returnValue({name: 'test'});
    spyOn(mockProjectService, 'update');
    var controller = $controller('ProjectShowController', {
      subjectService: mockSubjectService,
      projectService: mockProjectService,
      participantService: mockParticipantService,
      $routeParams: $routeParams,
    });

    expect(controller.subject.name).toBe('test');
    expect(mockSubjectService.get).toHaveBeenCalledWith({_id: 1});
  });

  it('deletes a project', function() {
    //expect(false).toBe(true);
  });
});
