'use strict';

(function () {
  var NUMBER_OF_ADS = 5;

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  var deletePins = function () {
    var activeMapPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    activeMapPins.forEach(function (item) {
      item.remove();
    });
  };

  // Создание нужного количества меток
  var renderAds = function (array) {
    var fragment = document.createDocumentFragment();
    var len = Math.min(array.length, NUMBER_OF_ADS);

    for (var i = 0; i < len; i++) {
      fragment.appendChild(window.pin.renderAd(array[i]));
    }

    deletePins();
    mapPins.appendChild(fragment);
  };

  // Перевод в активное состояние
  var enableActiveState = function () {
    map.classList.remove('map--faded');
  };

  // Перевод в неактивное состояние
  var enableInactiveState = function () {
    map.classList.add('map--faded');
  };

  window.map = {
    enableActiveState: enableActiveState,
    enableInactiveState: enableInactiveState,
    renderAds: renderAds,
    deletePins: deletePins
  };
})();
