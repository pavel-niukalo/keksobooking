'use strict';

(function () {
  var activate = function () {
    window.map.enableActiveState();
    window.backend.load(window.map.renderAds, window.backend.onError);
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
