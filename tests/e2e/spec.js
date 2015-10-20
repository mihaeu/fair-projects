describe('Fair Projects', function() {
    it('should have a title', function() {
        browser.get('http://localhost:3000/');

        expect(browser.getTitle()).toEqual('Fair Projects');
    });

    it('should say hello', function() {
        browser.get('http://localhost:3000/');

        expect(element(by.css('li:first-child')).getText()).toEqual('DAS SS 2016');
    });
});