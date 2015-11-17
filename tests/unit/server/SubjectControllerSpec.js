describe('SubjectController', function() {

  'use strict';

  var Promise = require('bluebird');

  var subjectController, subjectRepository, res, req = null;
  beforeEach(function() {
    // mock repository
    subjectRepository = {
      getAll: function() {},
      getById: function() {},
    };

    // request mock
    req = {
      dic: {
        subjectRepository: subjectRepository,
      },
    };

    // response mock
    res = {
      json: function() {},
      send: function() {},
    };
    spyOn(res, 'json');

    subjectController = new (require('../../../private/controllers/SubjectController'))();
  });

  it('gets all existing subjects', function(done) {
    var testSubjects = [
      {name: 'test'},
      {name: 'test2'},
    ];
    var subjectPromise = Promise.resolve(testSubjects);
    spyOn(subjectRepository, 'getAll').andReturn(subjectPromise);

    subjectController.getAll(req, res).then(function() {
      expect(res.json).toHaveBeenCalledWith(testSubjects);
    }).finally(done);
  });

  it('gets a single subject by id', function(done) {
    var testSubject = {name: 'test'};
    var subjectPromise = Promise.resolve(testSubject);
    spyOn(subjectRepository, 'getById').andReturn(subjectPromise);

    req.params = {subjectId: 42};
    subjectController.get(req, res).then(function() {
      expect(res.json).toHaveBeenCalledWith(testSubject);
    }).finally(done);
  });
});
