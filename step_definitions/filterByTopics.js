const { I } = inject();
const _ = require('lodash');
var assert = require('assert');

Before(() => {
    I.amOnPage('/');
})

Given('I am in Oranum Home Page', () => {
    I.seeInTitle('Oranum – Free Online Psychic & Tarot Readings, 24/7 Live Video Chat');
});

When('I filter by {string}', (text) => {
    I.click('//a[@title="' + text + '"]');
})

Then('I see the matching Psychics filtered by', async () =>{
    let categories = await I.grabTextFrom('//a[starts-with(@href,"/en/chat/")]//parent::div//child::td[@colspan="2"]');

    console.log(categories)
})