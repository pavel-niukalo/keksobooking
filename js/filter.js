'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var defaultValue = 'any';
  var adData = [];

  var successHandler = function (data) {
    adData = data;

    window.map.renderAds(data);
  };

  var filterPins = function () {
    var sameAdData = adData.filter(function (ad) {
      if (housingType.value === defaultValue) {
        return true;
      }
      return ad.offer.type === housingType.value;
    });

    window.card.delete();
    window.map.renderAds(sameAdData);
  };

  mapFilters.addEventListener('change', window.debounce.use(filterPins));

  window.filter = {
    successHandler: successHandler
  };
})();
