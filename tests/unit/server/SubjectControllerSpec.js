describe('SubjectController', function() {

  'use strict';

  it('gets all existing subjects', function() {

    var Promise = require("bluebird");

    var subjectController = new (require('../../../private/controllers/SubjectController'))();
    expect(subjectController).toBeDefined();

    var subjectRepository = {
      getAll: function() {},
    };
    var subjectPromise = Promise.resolve([
      {name: 'test'},
      {name: 'test2'},
    ]);
    spyOn(subjectRepository, 'getAll').andReturn(subjectPromise);

    var req = {
      dic: {
        subjectRepository: subjectRepository,
      },
    };

    var res = {
      json: function() {},
      send: function() {},
    };

    spyOn(res, 'json');
    subjectController.getAll(req, res);

    expect(subjectRepository.getAll).toHaveBeenCalled();

    //while (true) {
    //  if (subjectPromise.isPending()) {
    //    expect(res.json).toHaveBeenCalled();
    //  }
    //}

    //spyOn(subjectController, 'getAll');
    //var req = {
    //  dic: {
    //    subjectModel: require('../../../private/models/Subject'),
    //  },
    //};
    //var res = {
    //  send: function() {},
    //
    //  json: function() {},
    //};
    //spyOn(req, 'dic');
    //spyOn(res, 'json');
    //subjectController.getAll(req, res);

    // need to implement promises so that we can tell when the call has finished

    //expect(subjectController.getAll).toHaveBeenCalled();
    //expect(res.json).toHaveBeenCalled();
  });
});
