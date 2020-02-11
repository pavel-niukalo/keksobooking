'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;
  var PIN_TAIL = 22;

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  // Получение координат
  var isActivate = function () {
    return !map.classList.contains('map--faded');
  };

  var getCoordinates = function () {
    var pinX = Math.round((mapPinMain.offsetLeft + PIN_WIDTH / 2) - mapPins.offsetLeft);
    var pinY;

    if (isActivate()) {
      pinY = Math.round(mapPinMain.offsetTop + PIN_HEIGHT + PIN_TAIL);
    } else {
      pinY = Math.round(mapPinMain.offsetTop + PIN_HEIGHT / 2);
    }

    return pinX + ', ' + pinY;
  };

  // Взаимодействие с главныйм пином
  mapPinMain.addEventListener('mousedown', function (evt) {
    window.util.isMouseEvent(evt, window.app.activate);
    window.app.updateCoordinates();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.app.activate);
    window.app.updateCoordinates();
  });

  window.pinMain = {
    getCoordinates: getCoordinates
  };
})();
