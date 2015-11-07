describe('SubjectShowController', function() {

    beforeEach(module('fairProjects'));

    var $controller;
    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    var mockSubjectService = {
        get: function() {}
    }

    it('loads the requestes subject', function() {
        spyOn(mockSubjectService, 'get').and.returnValue({id: 1, name: 'test subject'});
        var controller = $controller('SubjectShowController', {
            subjectService: mockSubjectService
        });
        expect(controller.subject.name).toBe('test subject');
    });
});
