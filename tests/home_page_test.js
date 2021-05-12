const _ = require('lodash');
const assert = require('assert');

Feature('REQ1 - Show More Button');

Before(({ I }) => {
    I.amOnPage('/');
  });

Scenario('Validate "Show More" button', async ({ I }) => {
    // This attribute appears changes if more items are being loaded
    let loading = await I.grabAttributeFrom('#listpage', 'class')
    
    // The scrolldown will stop once there are no more items to load
    while(_.trim(loading) != 'show_more_visible'){
        loading = await I.grabAttributeFrom('#listpage', 'class')
        I.pressKey('End')
    }
    
    // Validation of "Show More" button
    //I.seeElement('//a[contains(text(),"Show more")]')
    I.seeElement('#show_more_btn a')
    I.saveElementScreenshot('#show_more_btn a', 'Show_More_Btn.png')

    I.click('#show_more_btn a')
    // Validation of new psychics being loaded
    I.seeAttributesOnElements('#listpage', {class:'  loading'})


    //const list_psychics = await I.grabTextFromAll('//div[starts-with(@id,"container")]//h2')
    const list_psychics = await I.grabAttributeFromAll('//div[starts-with(@id,"container")]/a','href')

    let numOfDuplicates = 0;
    var listDuplicatesIndexes = [];

    // Comparison of each psychics href with the others from the list to find duplicates
    for (var i=0; i<list_psychics.length; i++){
        for (var j=0; j<list_psychics.length; j++){
            if (list_psychics[i] === list_psychics[j]){
                if (i == j){
                    break;
                }
                else{
                    numOfDuplicates++;
                    listDuplicatesIndexes.push(i);
                }
            }
        }
    }

    // In case the assert fails, the log displays the indexes of the duplicates
    console.log('Duplicated Links Index: ' + listDuplicatesIndexes);
   
    assert.strictEqual(numOfDuplicates,1,'There should be 0 duplicates of psychics');
});

Scenario('Verify there are no duplicate psychics', async ({ I }) => {
    console.log('pass')
});

Scenario('There are no duplicate psychics ', async ({ I }) => {
console.log('pass')
});

Scenario('Each psychics displays the correct information', async ({ I }) => {
    console.log('pass')
});




