const _ = require('lodash');
var assert = require('assert');

Feature('REQ1 - Home Page');

Before(({ I }) => {
    I.amOnPage('/');
});


Scenario('Verify "Show More" button loads more psychics', async ({ I }) => {
    await I.scrollToShowMoreBtn()

    // Validation of "Show More" button
    I.seeElement('#show_more_btn a')
    I.saveElementScreenshot('#show_more_btn a', 'Show_More_Btn.png')

    const list_psychics_before = await I.grabAttributeFromAll('//div[starts-with(@id,"container_")]/a', 'href')

    I.click('#show_more_btn a')
    // Validation of new psychics being loaded
    const list_psychics_after = await I.grabAttributeFromAll('//div[starts-with(@id,"container_")]/a', 'href')

    let new_psychics_loaded = false;
    if (list_psychics_before.length < list_psychics_after.length) {
        new_psychics_loaded = true;
    }
    assert.strictEqual(new_psychics_loaded, true)
});

Scenario('Verify there are no visible duplicate psychics', async ({ I }) => {
    await I.scrollToShowMoreBtn()

    I.seeElement('#show_more_btn a')
    I.click('#show_more_btn a')

    let duplicates = await I.getNumberOfDuplicates('//div[starts-with(@id,"container_")]/a', 'href')

    // In case the assert fails, the log displays the indexes of the duplicates
    console.log('Duplicated Links Index: ' + duplicates);

    assert.strictEqual(duplicates.length, 0, 'There should be 0 duplicates of psychics');
});

Scenario('Each psychic displays Img, Lang, Nickname, Rating and Status', async ({ I }) => {

    // To retrieve number of Psychic Cards visible
    let numOfElements = await I.grabNumberOfVisibleElements('//div[starts-with(@id,"container_")]/a');
    I.seeNumberOfElements('//div[starts-with(@id,"container_")]//img[@class="stream__img"]', numOfElements);

    // Validation of Languages Label
    let lblLang = await I.grabTextFromAll('//div[starts-with(@id,"container_")]/descendant::td[@class="list__item-lang"]');
    assert.strictEqual(lblLang.length, numOfElements);
    for (var i = 0; i < lblLang.length; i++) {
        assert.strictEqual(_.trim(lblLang[i]), 'Languages:');
    }

    // Validation that the correct information is visible for each Psychic Card
    for (var i = 1; i <= numOfElements; i++) {
        within('(//div[starts-with(@id,"container_")])[position()=' + (numOfElements) + ']', () => {

            // Validates that at least one Language Flag is visible 
            I.seeElement('//td[@class="list__item-lang"]//div[contains(@class,"flag_")]');
        })

    }

    // Validates that the Nickname is visible
    I.seeNumberOfVisibleElements('//div[starts-with(@id,"container_")]//td[@class="list__item-title"]/h2', numOfElements);
    let nickname = await I.grabTextFromAll('//div[starts-with(@id,"container_")]//td[@class="list__item-title"]/h2');
    let nicknameNotNull = true;
    for (var i = 0; i < nickname; i++) {
        if (_.trim(nickname[i]) === null) {
            nicknameNotNull = false;
        }
    }

    // Validates Rating Stars, each card must contain 5 stars
    I.seeNumberOfVisibleElements('//div[starts-with(@id,"container_")]//i[contains(@class,"icon-star")]', (numOfElements * 5));

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
    assert.strictEqual(nicknameNotNull, true)

});



