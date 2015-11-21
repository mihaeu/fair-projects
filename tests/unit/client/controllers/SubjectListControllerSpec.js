describe('SubjectListController', function() {

  beforeEach(module('fairProjects'));

  var $controller;
  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  var mockSubjectService = {
    getAll: function() {
    },

    create: function(data, callback) {
      callback(data);
    },

    delete: function(data, callback) {
      callback(data);
    },
  };

  it('creates a new project', function() {

    spyOn(mockSubjectService, 'getAll').and.returnValue([]);
    spyOn(mockSubjectService, 'create').and.callThrough();
    var controller = $controller('SubjectListController', {
        subjectService: mockSubjectService,
      }
    );

    expect(controller.subjects).toBeDefined();
    expect(controller.subjects.length).toBe(0);
    controller.create({name: 'test subject', description: 'teest'});
    expect(controller.subjects.length).toBe(1);
    expect(controller.subjects[0].name).toBe('test subject');
    expect(controller.subjects[0].description).toBe('teest');

    expect(mockSubjectService.getAll).toHaveBeenCalled();
    expect(mockSubjectService.create).toHaveBeenCalled();
  });

  it('deletes an existing project', function() {
    var testSubject = {
      id: 1,
      name: 'project 1',
    };
    spyOn(mockSubjectService, 'getAll').and.returnValue([testSubject]);
    spyOn(mockSubjectService, 'delete').and.callThrough();
    var controller = $controller('SubjectListController', {
        subjectService: mockSubjectService,
      }
    );
    expect(controller.subjects[0].name).toBe(testSubject.name);
    controller.delete(testSubject);
    expect(controller.subjects.length).toBe(0);
  });
});
