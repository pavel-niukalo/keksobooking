'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';
  var LEFT_MOUSE_BUTTON = 1;

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  var isEscapeEvent = function (evt, action) {
    if (evt.key === ESCAPE_KEY) {
      action();
    }
  };

  var isMouseEvent = function (evt, action) {
    if (evt.which === LEFT_MOUSE_BUTTON) {
      action();
    }
  };

  // Случайный элемент массива
  var getRandomItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // Случайное число
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Случайная длина массива
  var getRandomLength = function (arr) {
    var lengthArray = Math.floor(Math.random() * arr.length);
    var newArray = [];

    for (var i = 0; i < lengthArray; i++) {
      newArray.push(arr[i]);
    }

    return newArray;
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscapeEvent: isEscapeEvent,
    isMouseEvent: isMouseEvent,
    getRandomItem: getRandomItem,
    getRandomNumber: getRandomNumber,
    getRandomLength: getRandomLength
  };
})();
