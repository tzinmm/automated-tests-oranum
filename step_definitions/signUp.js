const { I } = inject();
const _ = require('lodash');
var assert = require('assert');
const { Console } = require('console');
const { chromium } = require('playwright');

Before(() => {
    I.amOnPage('/');
})

Given('I am in Oranum Home Page', () => {
    I.seeInTitle('Oranum – Free Online Psychic & Tarot Readings, 24/7 Live Video Chat')
});

When('I click on Live Psychics button', async () => {
    I.click('#live_cams');
})

When('I click on a livestream', async () => {
    let nickname = await I.grabTextFrom('//div[starts-with(@id,"container_")]//td[@class="list__item-title"]/h2');

    I.seeElement('//a[@href="/en/chat/' + nickname + '"]');
    I.click('//a[@href="/en/chat/' + nickname + '"]');
})

When('I click on icon {string}', (text) => {
    I.click('button[data-id="' + text + '"]');
})

When('I click on Start Private Show button at {string}', (position) =>{
    I.click('(//button[text()="Start Private Show"])[position()=' + position + ']');
})

When('I click on Buy Credits button', () =>{
    I.click('#button-credits-label');
})

Then('I should see a sign up dialog', () => {

    I.dontSeeElementInDOM('//div[contains(@class,"mc_dialog_login_or_signup")][contains(@class,"mc_is_hidden")]');
    I.seeElement('//div[@class="mc_dialog_login_or_signup js_login_or_signup"]');
    within('//div[@class="mc_dialog_login_or_signup js_login_or_signup"]', () => {
        I.seeElement('//h3[text()="Sign up"]');
        I.seeElement('//button[text()="Join now"]');
        I.seeElement('//a[text()="or log in"]');
    })

    I.click('(//span[@class="mc-icon-close"])[position()=1]');
})

