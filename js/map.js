'use strict';

(function () {
  var NUMBER_OF_ADS = 5;

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  var filtersFormFieldset = document.querySelectorAll('.map__filters fieldset');
  var filtersFormSelect = document.querySelectorAll('.map__filters select');

  // Добавление disabled фильтру
  var setDisabled = function (collection, value) {
    collection.forEach(function (item) {
      item.disabled = value;
    });
    // for (var i = 0; i < collection.length; i++) {
    //   collection[i].disabled = value;
    // }
  };

  setDisabled(filtersFormFieldset, true);
  setDisabled(filtersFormSelect, true);

  // Проверка пинов,
  // если пользователь нажимает несколько раз на главный пин
  var deletePins = function () {
    var activeMapPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    activeMapPins.forEach(function (item) {
      item.remove();
    });
    // for (var i = 0; i < activeMapPins.length; i++) {
    //   activeMapPins[i].remove();
    // }
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

    setDisabled(filtersFormFieldset, false);
    setDisabled(filtersFormSelect, false);
  };

  // Перевод в активное состояние
  var enableActiveState = function () {
    map.classList.remove('map--faded');
  };

  // Перевод в неактивное состояние
  var enableInactiveState = function () {
    setDisabled(filtersFormFieldset, true);
    setDisabled(filtersFormSelect, true);

    deletePins();
    map.classList.add('map--faded');
  };

  window.map = {
    enableActiveState: enableActiveState,
    enableInactiveState: enableInactiveState,
    renderAds: renderAds
  };
})();
