import { WienPage } from './wien.po';
import { browser } from 'protractor';
import { WienResultsPage } from './wien-results.po';

describe('Wien', () => {
    beforeAll(() => browser.waitForAngularEnabled(false));

    let resultsPage: WienResultsPage;

    beforeEach(() => {
        const page = new WienPage();
        resultsPage = page
            .navigateTo()
            .search('Belvedere');
    });

    it('should display 10 results', () => {
        const results = resultsPage.getResults();
        expect(results.count()).toEqual(10);
    });
    
    it('should have Stadtspaziergang as first result', () => {
        expect(resultsPage.getFirstResultTitle()).toContain('Stadtspaziergang');
    });


    afterAll(() => browser.waitForAngularEnabled(true));
});