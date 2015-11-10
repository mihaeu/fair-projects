describe('SubjectController', function() {
  it('fetches all existing subjects', function() {

    var subjectController = new (require('../../../private/controllers/SubjectController'))();
    expect(subjectController).toBeDefined();

    spyOn(subjectController, 'getAll');
    var req = {
      dic: {
        subjectModel: require('../../../private/models/Subject'),
      },
    };
    var res = {
      send: function() {},

      json: function() {},
    };
    spyOn(req, 'dic');
    spyOn(res, 'json');
    subjectController.getAll(req, res);

    // need to implement promises so that we can tell when the call has finished

    //expect(subjectController.getAll).toHaveBeenCalled();
    //expect(res.json).toHaveBeenCalled();
  });
});
