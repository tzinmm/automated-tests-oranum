const { I } = inject();
const _ = require('lodash');
var assert = require('assert');

Before(() => {
    I.amOnPage('/');
})

Given('I am in Oranum Home Page', () => {
    I.seeInTitle('Oranum – Free Online Psychic & Tarot Readings, 24/7 Live Video Chat')
});

When('I scrolldown to Show More button', async () => {
    await I.scrollToShowMoreBtn();

    // Validation of "Show More" button
    I.seeElement('#show_more_btn a');
    I.saveElementScreenshot('#show_more_btn a', 'Show_More_Btn.png');
})

When('I click Show More button', () => {
    I.click('#show_more_btn a');
})

Then('I should see more Psychic Cards', () => {
    I.seeElement('//section[@data-page-id="4"]');
})

Then('I should see unique psychic cards', async () => {
    let duplicates = await I.getNumberOfDuplicates('//div[starts-with(@id,"container_")]/a', 'href')

    // In case the assert fails, the log displays the indexes of the duplicates
    console.log('Duplicated Links Index: ' + duplicates);

    assert.strictEqual(duplicates.length, 0, 'There should be 0 duplicates of psychics');
})

Then('I see an image in each card', async () => {
    // To retrieve number of Psychic Cards visible
    let numOfElements = await I.grabNumberOfVisibleElements('//div[starts-with(@id,"container_")]/a');
    I.seeNumberOfElements('//div[starts-with(@id,"container_")]//img[@class="stream__img"]', numOfElements);

})

Then('I see a language label and flags in each card', async () => {
    let numOfElements = await I.grabNumberOfVisibleElements('//div[starts-with(@id,"container_")]/a');
    // Validation of Languages Label

    let lblLang = await I.grabTextFromAll('//div[starts-with(@id,"container_")]/descendant::td[@class="list__item-lang"]');
    assert.strictEqual(lblLang.length, numOfElements);

    for (var i = 0; i < lblLang.length; i++) {
        assert.strictEqual(_.trim(lblLang[i]), 'Languages:');
    }

    for (var i = 1; i <= numOfElements; i++) {
        within('(//div[starts-with(@id,"container_")])[position()=' + (numOfElements) + ']', () => {

            // Validates that at least one Language Flag is visible 
            I.seeElement('//td[@class="list__item-lang"]//div[contains(@class,"flag_")]');
        })
    }
})

Then('I see a nickname in each card', async () => {
    // To retrieve number of Psychic Cards visible
    let numOfElements = await I.grabNumberOfVisibleElements('//div[starts-with(@id,"container_")]/a');

    // Validates that the Nickname is visible
    I.seeNumberOfVisibleElements('//div[starts-with(@id,"container_")]//td[@class="list__item-title"]/h2', numOfElements);
    let nickname = await I.grabTextFromAll('//div[starts-with(@id,"container_")]//td[@class="list__item-title"]/h2');
    let nicknameNotNull = true;
    for (var i = 0; i < nickname; i++) {
        if (_.trim(nickname[i]) === null) {
            nicknameNotNull = false;
        }
    }

    assert.strictEqual(nicknameNotNull, true)
})

Then('I see 5 stars for rating in each card', async () => {
    // To retrieve number of Psychic Cards visible
    let numOfElements = await I.grabNumberOfVisibleElements('//div[starts-with(@id,"container_")]/a');

    I.seeNumberOfVisibleElements('//div[starts-with(@id,"container_")]//i[contains(@class,"icon-star")]', (numOfElements * 5));
})

Then('I see a valid status in each card', async () => {
    // To retrieve number of Psychic Cards visible
    let numOfElements = await I.grabNumberOfVisibleElements('//div[starts-with(@id,"container_")]/a');

    // Verify that only valid status are displayed
    I.seeNumberOfVisibleElements('//div[starts-with(@id,"container_")]//div[contains(@class,"stream__status")]', numOfElements);
    let streamStatus = await I.grabTextFromAll('//div[starts-with(@id,"container_")]//div[@class="stream__status"]');
    let allStatusValid = true;
    for (var i = 0; i < streamStatus; i++) {
        if (_.trim(streamStatus[i]) != 'live' || _.trim(streamStatus[i]) != 'private' || _.trim(streamStatus[i]) != 'Offline') {
            allStatusValid = false;
        }
    }

    assert.strictEqual(allStatusValid, true)
})