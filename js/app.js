'use strict';

(function () {
  var doDataArray = function (number) {
    window.data.generateData(number);
  };

  var renderAd = function (data) {
    window.pin.render(data);
  };

  var takeCoordinats = function () {
    window.pinMain.getCoordinatesMainPin();
  };

  var putDisabled = function (collection, value) {
    window.form.setDisabled(collection, value);
  };

  var takeAddress = function () {
    window.form.setAddress();
  };

  var showCard = function (adDate) {
    window.card.show(adDate);
  };

  window.app = {
    doDataArray: doDataArray,
    renderAd: renderAd,
    takeCoordinats: takeCoordinats,
    putDisabled: putDisabled,
    takeAddress: takeAddress,
    showCard: showCard
  };
})();
