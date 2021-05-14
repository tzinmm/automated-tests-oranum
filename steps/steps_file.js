// in this file you can append custom step methods to 'I' object
const _ = require('lodash');

module.exports = function () {
  return actor({

    scrollToShowMoreBtn: async function () {
      // This attribute appears changes if more items are being loaded
      let loading = await this.grabAttributeFrom('#listpage', 'class')

      time_sec_prev = Math.floor(Date.now() / 1000)

      // The scrolldown will stop once there are no more items to load
      while (_.trim(loading) != 'show_more_visible') {
        loading = await this.grabAttributeFrom('#listpage', 'class')
        this.pressKey('End')
        time_sec_after = Math.floor(Date.now() / 1000)
        diff = time_sec_after - time_sec_prev;
        if(diff > 15){
          this.pressKey('ArrowUp')
        }
      }
    },

    getNumberOfDuplicates: async function (locator, attribute) {
      const list_psychics = await this.grabAttributeFromAll(locator, attribute)

      var listDuplicatesIndexes = [];

      // Comparison of each psychics href with the others from the list to find duplicates
      for (var i = 0; i < list_psychics.length; i++) {
        for (var j = 0; j < list_psychics.length; j++) {
          if (list_psychics[i] === list_psychics[j]) {
            if (i == j) {
              break;
            }
            else {
              listDuplicatesIndexes.push(i);
            }
          }
        }
      }
      return listDuplicatesIndexes
    },

    grabNicknames: async function () {
      this.seeNumberOfVisibleElements('//div[starts-with(@id,"container_")]//td[@class="list__item-title"]/h2', numOfElements);
      let nickname = await this.grabTextFromAll('//div[starts-with(@id,"container_")]//td[@class="list__item-title"]/h2');
      let nicknameNotNull = true;
      for (var i = 0; i < nickname; i++) {
          if (_.trim(nickname[i]) === null) {
              nicknameNotNull = false;
          }
      }
    }, 

  });
}
