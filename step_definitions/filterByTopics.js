const { I } = inject();
const _ = require('lodash');
var assert = require('assert');
const { Console } = require('console');

/*Before(() => {
    I.amOnPage('/');
})*/

Given('I am in Oranum Home Page', () => {
    I.amOnPage('/');
    I.seeInTitle('Oranum – Free Online Psychic & Tarot Readings, 24/7 Live Video Chat');
});

When('I filter by {string}', (text) => {
    I.click('//a[@title="' + text + '"]');
    I.wait(2)
})

Then('I see the matching Psychics filtered by {string}', async (category) =>{
    // Retrieves description of each Psychic card
    let categories = await I.grabTextFromAll('//tr[@class="list__item-categories"]//child::div');

    // Loads the JSON file that contains the categories and its keywords
    const category_json = require('../resources/categoryKeywords.json');
    let count = 0;
    let values = [];
    let wrongCategory = [];
    let matchFlag = true;
    const keywords = JSON.parse(JSON.stringify(category_json))

    // To validate each description
    for(var i=0; i<categories.length;i++){

        // Iterates until there is a match with the category
        for (var key in keywords) {

            if(key.includes(category)){
                values = _.split(keywords[key], '\,')

                // Search of the keyword within the Psychic description
                for(var j=0; j<values.length;j++){
                    if(_.lowerCase(categories[j]).includes(values[j]) != true){
                        matchFlag = false;
                    }else{
                        matchFlag = true;
                        break;
                    }
                }

                if(matchFlag == false){
                    // If there are no matches the count and indexes are retrieved
                    count+=1;
                    wrongCategory.push(i+1);
                }
                break;
            }
          }
    }

    console.log('Indexes of Psychic Cards with no match for category (should be []): ' + _.uniqBy(wrongCategory))
    assert.strictEqual(count,0)
    
});