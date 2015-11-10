describe('Fair Projects', function() {
  it('should have a title', function() {
    browser.get('http://localhost:3000/');

    expect(browser.getTitle()).toEqual('Fair Projects');
  });

  it('should say hello', function() {
    browser.get('http://localhost:3000/');

    // delete any existing subjects
    element.all(by.css('.btn-xs')).click();

    // list should be empty
    var subjectList = element.all(by.repeater('subject in SubjectListController.subjects'));
    expect(subjectList.count()).toEqual(0);

    // create a new subject
    element(by.model('SubjectListController.newSubjectName')).sendKeys('Test Subject');
    element(by.css('.btn-default')).click();

    // now there should be one item
    subjectList = element.all(by.repeater('subject in SubjectListController.subjects'));
    expect(subjectList.count()).toEqual(1);
  });
});
