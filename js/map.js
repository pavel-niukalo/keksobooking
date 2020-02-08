'use strict';

(function () {
  // Проверка пинов,
  // если пользователь нажимает несколько раз на главный пин
  var deletePins = function () {
    var activeMapPins = window.defolt.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < activeMapPins.length; i++) {
      activeMapPins[i].remove();
    }
  };

  // Перевод в активное состояние
  var enableActiveState = function () {
    window.defolt.adForm.classList.remove('ad-form--disabled');

    window.defolt.setDisabled(window.defolt.adFormFieldset, false);
    window.defolt.setDisabled(window.defolt.filtersFormFieldset, false);
    window.defolt.setDisabled(window.defolt.filtersFormSelect, false);

    deletePins();
    window.pin.renderAds(window.data.dataArray);
    window.data.map.classList.remove('map--faded');
  };

  // Взаимодействие с картой
  var onCardEscPress = function (evt) {
    window.util.isEscapeEvent(evt, closeCard);
  };

  var closeCard = function () {
    window.data.map.querySelector('.map__card').remove();
    document.removeEventListener('keydown', onCardEscPress);
  };

  window.defolt.mapPinMain.addEventListener('mousedown', function (evt) {
    window.util.isMouseEvent(evt, enableActiveState);
    window.defolt.adressInput.value = window.defolt.getCoordinatesMainPin();
  });

  window.defolt.mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, enableActiveState);
    window.defolt.adressInput.value = window.defolt.getCoordinatesMainPin();
  });

  window.map = {
    onCardEscPress: onCardEscPress,
    closeCard: closeCard
  };
})();
