import { browser, $ } from 'protractor';
import { WienResultsPage } from './wien-results.po';

export class WienPage {
    
    navigateTo() {
        browser.get('https://wien.gv.at');
        return this;
    }

    search(term: string) {
        const searchForm = $('form#suggestion_form_small');
        const input = searchForm.$('input#suchbegriff_small');

        input.sendKeys(term);
        searchForm.submit();

        return new WienResultsPage();
    }
}