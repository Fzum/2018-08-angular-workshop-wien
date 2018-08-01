import { $ } from 'protractor';

export class WienResultsPage {

    getResults() {
        return $('ol.gsa-resultlist').$$('li');
    }

    getFirstResultTitle() {
        return this.getResults()
            .first()
            .$('h3')
            .getText()
    }

}