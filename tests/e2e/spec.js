describe('Fair Projects', function() {
    it('should have a title', function() {
        browser.get('http://localhost:3000/');

        expect(browser.getTitle()).toEqual('Fair Projects');
    });

    it('should say hello', function() {
        browser.get('http://localhost:3000/');
        element(by.model('sometext')).sendKeys('user');

        expect(element(by.binding('sometext')).getText()).toEqual('Hello user');
    });
});