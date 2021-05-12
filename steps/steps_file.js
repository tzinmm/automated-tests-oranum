// in this file you can append custom step methods to 'I' object
const _ = require('lodash');

module.exports = function() {
  return actor({

    // The scrolldown will stop once there are no more items to load
    scrollToShowMoreBtn: async function() {
      // This attribute appears changes if more items are being loaded
      let loading = await this.grabAttributeFrom('#listpage', 'class')
      
      // The scrolldown will stop once there are no more items to load
      while(_.trim(loading) != 'show_more_visible'){
          loading = await this.grabAttributeFrom('#listpage', 'class')
          this.pressKey('End')
      }
    },
    getNumberOfDuplicates: async function(locator, attribute) {
          //const list_psychics = await I.grabTextFromAll('//div[starts-with(@id,"container")]//h2')
    //const list_psychics = await this.grabAttributeFromAll('//div[starts-with(@id,"container")]/a','href')
      const list_psychics = await this.grabAttributeFromAll(locator, attribute)

      var listDuplicatesIndexes = [];

    // Comparison of each psychics href with the others from the list to find duplicates
      for (var i=0; i<list_psychics.length; i++){
          for (var j=0; j<list_psychics.length; j++){
              if (list_psychics[i] === list_psychics[j]){
                  if (i == j){
                      break;
                  }
                  else{
                      listDuplicatesIndexes.push(i);
                  }
              }
          }
      }
      return listDuplicatesIndexes
    }
  });
}
