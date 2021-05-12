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

    const list_psychics_before = await I.grabAttributeFromAll('//div[starts-with(@id,"container")]/a', 'href')

    I.click('#show_more_btn a')
    // Validation of new psychics being loaded
    const list_psychics_after = await I.grabAttributeFromAll('//div[starts-with(@id,"container")]/a', 'href')

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

    let duplicates = await I.getNumberOfDuplicates('//div[starts-with(@id,"container")]/a', 'href')

    // In case the assert fails, the log displays the indexes of the duplicates
    console.log('Duplicated Links Index: ' + duplicates);

    assert.strictEqual(duplicates.length, 0, 'There should be 0 duplicates of psychics');
});



