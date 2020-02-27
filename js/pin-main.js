'use strict';

(function () {
  var Pin = {
    WIDTH: 65,
    HEIGHT: 65,
    TAIL: 22
  };

  var Limit = {
    MIN_Y: 130 - (Pin.HEIGHT + Pin.TAIL),
    MAX_Y: 630 - (Pin.HEIGHT + Pin.TAIL),
    MIN_X: 0 - Pin.WIDTH / 2,
    MAX_X: 1200 - Pin.WIDTH / 2
  };

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var defoltX = getComputedStyle(mapPinMain).left;
  var defoltY = getComputedStyle(mapPinMain).top;

  // Получение координат
  var isActivate = function () {
    return !map.classList.contains('map--faded');
  };

  var getCoordinates = function () {
    var pinX = Math.floor((mapPinMain.offsetLeft + Pin.WIDTH / 2) - mapPins.offsetLeft);
    var pinY;

    if (isActivate()) {
      pinY = Math.floor(mapPinMain.offsetTop + Pin.HEIGHT + Pin.TAIL);
    } else {
      pinY = Math.floor(mapPinMain.offsetTop + Pin.HEIGHT / 2);
    }

    return pinX + ', ' + pinY;
  };

  // Установка координат по-умолчанию
  var setDefoltCoordinates = function () {
    mapPinMain.style.left = defoltX;
    mapPinMain.style.top = defoltY;
  };

  // Ограничение по горизонтали
  var getLimitX = function (left) {
    if (left < Limit.MIN_X) {
      return Limit.MIN_X;
    } else if (left > Limit.MAX_X) {
      return Limit.MAX_X;
    }

    return left;
  };

  // Ограничение по вертикали
  var getLimitY = function (top) {
    if (top < Limit.MIN_Y) {
      return Limit.MIN_Y;
    } else if (top > Limit.MAX_Y) {
      return Limit.MAX_Y;
    }

    return top;
  };

  // Взаимодействие с главныйм пином
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // Проверка окрытой карты,
    // для того, чтобы при каждом нажатии на главный пин
    // не происходила повторная активация страницы,
    // в том числе и повторная загрузка данных
    if (map.classList.contains('map--faded')) {
      window.util.isMouseEvent(evt, window.app.activate);
    }

    window.app.updateCoordinates();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

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

      window.app.updateCoordinates();
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
    getCoordinates: getCoordinates,
    setDefoltCoordinates: setDefoltCoordinates
  };
})();
