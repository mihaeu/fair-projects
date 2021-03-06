describe('ProjectController', function() {

  'use strict';

  var Promise = require('bluebird');

  var projectController, subjectRepository, res, req = null;
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

    projectController = new (require('../../../private/controllers/ProjectController'))();
  });

  it('gets a project', function(done) {
    var testSubject = {
      projects: {
        id: function() {
          return {name: 'test'};
        },
      },
    };
    var subjectPromise = Promise.resolve(testSubject);
    spyOn(subjectRepository, 'getById').andReturn(subjectPromise);

    req.params = {subjectId: 42};
    projectController.get(req, res).then(function() {
      expect(res.json).toHaveBeenCalledWith({name: 'test'});
    }).finally(done);
  });

  it('gets all projects', function(done) {
    var testSubject = {
      projects: [
        {name: 'test1'},
        {name: 'test2'},
      ],
    };
    var subjectPromise = Promise.resolve(testSubject);
    spyOn(subjectRepository, 'getById').andReturn(subjectPromise);

    req.params = {subjectId: 42};
    projectController.getAll(req, res).then(function() {
      expect(res.json).toHaveBeenCalledWith(testSubject.projects);
    }).finally(done);
  });
});
