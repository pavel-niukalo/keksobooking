'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;
  var PIN_TAIL = 22;

  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var filtersFormFieldset = document.querySelectorAll('.map__filters fieldset');
  var filtersFormSelect = document.querySelectorAll('.map__filters select');
  var adressInput = adForm.querySelector('input[name="address"]');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  // Добавление disabled
  var setDisabled = function (collection, value) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].disabled = value;
    }
  };

  setDisabled(adFormFieldset, true);
  setDisabled(filtersFormFieldset, true);
  setDisabled(filtersFormSelect, true);

  // Заполнение поля адреса
  var isActivate = function () {
    return !window.data.map.classList.contains('map--faded');
  };

  var getCoordinatesMainPin = function () {
    var pinX = Math.round((mapPinMain.offsetLeft + PIN_WIDTH / 2) - mapPins.offsetLeft);
    var pinY;

    if (isActivate()) {
      pinY = Math.round(mapPinMain.offsetTop + PIN_HEIGHT + PIN_TAIL);
    } else {
      pinY = Math.round(mapPinMain.offsetTop + PIN_HEIGHT / 2);
    }

    return pinX + ', ' + pinY;
  };

  adressInput.value = getCoordinatesMainPin();

  window.defolt = {
    mapPinMain: mapPinMain,
    mapPins: mapPins,
    setDisabled: setDisabled,
    getCoordinatesMainPin: getCoordinatesMainPin,
    adForm: adForm,
    adressInput: adressInput,
    adFormFieldset: adFormFieldset,
    filtersFormFieldset: filtersFormFieldset,
    filtersFormSelect: filtersFormSelect
  };
})();
