describe('SubjectController', function() {

  'use strict';

  var Promise = require('bluebird');

  it('gets all existing subjects', function(done) {

    // -------------------------------------
    // subjectRepository Mock
    var subjectRepository = {
      getAll: function() {},
    };
    var testSubjects = [
      {name: 'test'},
      {name: 'test2'},
    ];
    var subjectPromise = Promise.resolve(testSubjects);
    spyOn(subjectRepository, 'getAll').andReturn(subjectPromise);

    // -------------------------------------
    // request mock
    var req = {
      dic: {
        subjectRepository: subjectRepository,
      },
    };

    // -------------------------------------
    // response mock
    var res = {
      json: function() {},
      send: function() {},
    };
    spyOn(res, 'json');

    // -------------------------------------
    // actual test
    var subjectController = new (require('../../../private/controllers/SubjectController'))();
    subjectController.getAll(req, res).then(function() {
      expect(res.json).toHaveBeenCalledWith(testSubjects);
    }).finally(done);
    expect(subjectRepository.getAll).toHaveBeenCalled();

    // this fails
    // expect(res.json).toHaveBeenCalled();
  });
});
