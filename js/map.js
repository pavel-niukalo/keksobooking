'use strict';

(function () {
  var NUMBER_OF_ADS = 8;

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var filtersFormFieldset = document.querySelectorAll('.map__filters fieldset');
  var filtersFormSelect = document.querySelectorAll('.map__filters select');

  // Добавление disabled фильтру
  var setDisabled = function (collection, value) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].disabled = value;
    }
  };

  setDisabled(filtersFormFieldset, true);
  setDisabled(filtersFormSelect, true);

  // Проверка пинов,
  // если пользователь нажимает несколько раз на главный пин
  var deletePins = function () {
    var activeMapPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < activeMapPins.length; i++) {
      activeMapPins[i].remove();
    }
  };

  // Создание нужного количества меток
  var renderAds = function (array) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < array.length; j++) {
      fragment.appendChild(window.app.renderAd(array[j]));
    }

    mapPins.appendChild(fragment);
  };

  // Перевод в активное состояние
  var enableActiveState = function () {
    adForm.classList.remove('ad-form--disabled');

    window.app.putDisabled(adFormFieldset, false);
    setDisabled(filtersFormFieldset, false);
    setDisabled(filtersFormSelect, false);

    deletePins();
    renderAds(window.app.doDataArray(NUMBER_OF_ADS));
    map.classList.remove('map--faded');
  };

  // Взаимодействие с главныйм пином
  mapPinMain.addEventListener('mousedown', function (evt) {
    window.util.isMouseEvent(evt, enableActiveState);
    window.app.takeAddress();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, enableActiveState);
    window.app.takeAddress();
  });
})();
