'use strict';

(function () {
  var NUMBER_OF_ADS = 8;

  var activate = function () {
    window.map.enableActiveState();
    window.map.renderAds(window.data.generate(NUMBER_OF_ADS));
    window.form.enableActiveState();
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
