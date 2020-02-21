'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

  var activate = function () {
    window.map.enableActiveState();
    window.backend.load(window.filter.successHandler, window.error.showMessage);
    window.form.enableActiveState();
  };

  var deactivate = function () {
    window.map.enableInactiveState();
    window.form.enableInactiveState();
    window.pinMain.setDefoltCoordinates();
    window.card.deleteCard();
    adForm.reset();
    updateCoordinates();
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
    deactivate: deactivate,
    updateCoordinates: updateCoordinates,
    showCard: showCard
  };
})();
