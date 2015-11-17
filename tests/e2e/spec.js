describe('Fair Projects', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/');

    // delete any existing subjects
    element.all(by.css('.subject-delete')).click();
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Fair Projects');
  });

  it('should create and delete a subject', function() {
    // list should be empty
    var subjectList = element.all(by.repeater('subject in SubjectListController.subjects'));
    expect(subjectList.count()).toEqual(0);

    // create a new subject
    element(by.model('SubjectListController.newSubjectName')).sendKeys('Test Subject');
    element(by.css('#subject-add')).click();

    // now there should be one item
    subjectList = element.all(by.repeater('subject in SubjectListController.subjects'));
    expect(subjectList.count()).toEqual(1);
  });

  it('should add a project to a subject', function() {
    element(by.model('SubjectListController.newSubjectName')).sendKeys('Test Subject');
    element(by.css('#subject-add')).click();

    // the problem here is that we have to wait a little bit until the view
    // is loaded

    //browser.wait(element(by.css('h1'))).isPresent;
    //expect(element(by.css('h1'))).toBe('Test Subject');

  });
});
