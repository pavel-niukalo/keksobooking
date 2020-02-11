'use strict';

(function () {
  var NUMBER_OF_ADS = 8;

  var activate = function () {
    window.map.enableActiveStateOfMap();
    window.map.renderAds(window.data.generateData(NUMBER_OF_ADS));
    window.form.enableActiveStateOfForm();
  };

  var updateCoordinates = function () {
    var coords = window.pinMain.getCoordinates();
    window.form.setAddress(coords);
  };

  var showCard = function (adDate) {
    window.card.show(adDate);
  };

  window.app = {
    activate: activate,
    updateCoordinates: updateCoordinates,
    showCard: showCard
  };
})();
