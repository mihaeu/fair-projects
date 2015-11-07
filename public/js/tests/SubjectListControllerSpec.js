describe('SubjectListController', function() {
    beforeEach(module('fairProjects'));

    var $controller;
    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    var mockSubjectService = {
        getAll: function() {},
        create: function(data, callback) {callback(data);}
    }

    describe('create subject', function() {
        it('creates a new project', function() {

            spyOn(mockSubjectService, 'getAll').and.returnValue([]);
            spyOn(mockSubjectService, 'create').and.callThrough();
            var controller = $controller('SubjectListController', {
                subjectService: mockSubjectService}
            );

            expect(controller.subjects).toBeDefined();
            expect(controller.subjects.length).toBe(0);
            controller.create('test subject');
            expect(controller.subjects.length).toBe(1);
            expect(controller.subjects[0].name).toBe('test subject');

            expect(mockSubjectService.getAll).toHaveBeenCalled();
            expect(mockSubjectService.create).toHaveBeenCalled();
        });
    });
});
