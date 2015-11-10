describe('ProjectController', function() {

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

    getAll: function() {},

    create: function() {},

    delete: function() {},
  };

  it('loads the requested subject', function() {

    //spyOn(mockSubjectService, 'get').and.returnValue([]);
    //var controller = $controller('ProjectController', {
    //    subjectService: mockSubjectService
    //});

    //expect(false).toBe(true);
  });

  it('lists all projects for a subject', function() {
    //expect(false).toBe(true);
  });

  it('creates a new project', function() {
    //expect(false).toBe(true);
  });

  it('shows a project', function() {
    //expect(false).toBe(true);
  });

  it('deletes a project', function() {
    //expect(false).toBe(true);
  });
});
