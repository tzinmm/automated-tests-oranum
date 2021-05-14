const { I } = inject();
const _ = require('lodash');
var assert = require('assert');


Before(() => {
    I.amOnPage('/');
})

Given('I am in Oranum Home Page', () => {
    I.seeInTitle('Oranum – Free Online Psychic & Tarot Readings, 24/7 Live Video Chat')
});

When('I click on the Search icon', () => {
    I.seeElement('#toolbar-search i')
    I.click('#toolbar-search i')
})

When('I enter a {string}', (text) => {
    I.seeElement('#header_search_bar')
    I.click('#header_search_bar')
    I.fillField('#header_search_bar', text)
})

When('I click Show All Results', () => {

    // Waits for suggestiong box
    I.waitForVisible('#auto_suggest')
    I.click('//a[contains(text(),"Show all results for")]')

    I.waitForInvisible('#auto_suggest')
})

When('I click on the result with the exact match {string}', (psychicName) => {
    I.click('//a[contains(@title,"' + psychicName + '")]')
})

Then('I should see the Placeholder', async () => {
    I.seeElement('#header_search_bar')
    let placeholdVal = await I.grabAttributeFrom('#header_search_bar', 'placeholder')
    assert.strictEqual(placeholdVal,'Search for psychics by name')
})

Then('I should see results that contain the partial text {string}', async (partialText) => {
    let numOfElements = await I.grabNumberOfVisibleElements('//div[starts-with(@id,"container_")]/a');
    I.seeNumberOfVisibleElements('//div[starts-with(@id,"container_")]//td[@class="list__item-title"]/h2', numOfElements);
    let nicknames = await I.grabTextFromAll('//div[starts-with(@id,"container_")]//td[@class="list__item-title"]/h2');
    let partialTxtExists = [];
    let countInvalid = 0;
    for (var i = 0; i < numOfElements; i++) {
        //if (_.lowerCase(nicknames[i]).includes(_.lowerCase(partialText)) != true && nicknames[i].includes(_.lowerCase(partialText)) != true)
        if (_.lowerCase(nicknames[i]).includes(_.lowerCase(partialText)) != true) {
            partialTxtExists.push(nicknames[i]);
            countInvalid+=1;
        }
    }

    assert.strictEqual(countInvalid, 0)
})

Then('I should see the Psychic {string} profile', async (psychicName) => {
    // Wait until container is no longer hidden
    I.waitForElement('//div[@id="chatblock"][contains(@class,"show-html")]')

    // Validation of Buy Credits button
    I.seeElement('#button-credits-label')

    // Validation of Profile being displayed
    let url = await I.grabCurrentUrl();
    assert.strictEqual(url.includes(psychicName),true)
})

