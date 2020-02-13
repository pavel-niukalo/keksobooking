'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;
  var PIN_TAIL = 22;
  var MIN_Y = 130 - PIN_HEIGHT / 2;
  var MAX_Y = 630 - PIN_HEIGHT / 2;
  var MIN_X = 0 - PIN_WIDTH / 2;
  var MAX_X = window.data.widthMap - PIN_WIDTH / 2;

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  // Получение координат
  var isActivate = function () {
    return !map.classList.contains('map--faded');
  };

  var getCoordinates = function () {
    var pinX = Math.floor((mapPinMain.offsetLeft + PIN_WIDTH / 2) - mapPins.offsetLeft);
    var pinY;

    if (isActivate()) {
      pinY = Math.floor(mapPinMain.offsetTop + PIN_HEIGHT + PIN_TAIL);
    } else {
      pinY = Math.floor(mapPinMain.offsetTop + PIN_HEIGHT / 2);
    }

    return pinX + ', ' + pinY;
  };

  // Ограничение по горизонтали
  var getLimitX = function (left) {
    if (left < MIN_X) {
      return MIN_X;
    } else if (left > MAX_X) {
      return MAX_X;
    }

    return left;
  };

  // Ограничение по вертикали
  var getLimitY = function (top) {
    if (top < MIN_Y) {
      return MIN_Y;
    } else if (top > MAX_Y) {
      return MAX_Y;
    }

    return top;
  };

  // Взаимодействие с главныйм пином
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.util.isMouseEvent(evt, window.app.activate);
    window.app.updateCoordinates();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.app.updateCoordinates();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var top = mapPinMain.offsetTop - shift.y;
      var left = mapPinMain.offsetLeft - shift.x;

      mapPinMain.style.top = getLimitY(top) + 'px';
      mapPinMain.style.left = getLimitX(left) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.app.activate);
    window.app.updateCoordinates();
  });

  window.pinMain = {
    getCoordinates: getCoordinates
  };
})();
