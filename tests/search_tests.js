const _ = require('lodash');
var assert = require('assert');
const { I } = inject();

Feature('REQ2 - Filtering of results');

Before(({ I }) => {
    I.amOnPage('/');
});

Scenario('Search for "Matt"', async ({ I }) => {
    I.seeElement('#toolbar-search i')
    I.click('#toolbar-search i')

    I.seeElement('#header_search_bar')
    let placeholdVal = await I.grabAttributeFrom('#header_search_bar','placeholder')
    assert.strictEqual(placeholdVal,'Search for psychics by name')
    
    I.seeInField('#header_search_bar', 'Search for psychics by name')
    I.fillField('searchText', 'Matt')


});