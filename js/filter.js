'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');
  var defaultValue = 'any';
  var adData = [];

  var successHandler = function (data) {
    adData = data;

    window.map.renderAds(data);
  };

  var filterPins = function () {
    var filterAdData = adData.filter(function (ad) {
      if (housingType.value === defaultValue) {
        return true;
      }
      return ad.offer.type === housingType.value;
    }).filter(function (ad) {
      var priceLimit = {
        any: ad.offer.type,
        middle: ad.offer.price >= 10000 && ad.offer.price <= 50000,
        low: ad.offer.price < 10000,
        high: ad.offer.price >= 50000
      };
      return priceLimit[housingPrice.value];
    }).filter(function (ad) {
      if (housingRooms.value === defaultValue) {
        return true;
      }
      return ad.offer.rooms.toString() === housingRooms.value;
    }).filter(function (ad) {
      if (housingGuests.value === defaultValue) {
        return true;
      }
      return ad.offer.guests.toString() === housingGuests.value;
    }).filter(function (ad) {
      var checkedFeatures = housingFeatures.querySelectorAll('input:checked');
      var checkedList = [];
      checkedFeatures.forEach(function (input) {
        checkedList.push(input.value);
      });
      if (checkedList.length <= 0) {
        return true;
      }
      var filterFeatures = ad.offer.features.filter(function (item) {
        return checkedList.includes(item);
      });
      return filterFeatures.length >= checkedList.length;
    });

    window.card.delete();
    window.map.renderAds(filterAdData);
  };

  mapFilters.addEventListener('change', window.debounce.use(filterPins));

  window.filter = {
    successHandler: successHandler
  };
})();
