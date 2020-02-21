'use strict';

(function () {
  var Key = {
    ENTER: 'Enter',
    ESCAPE: 'Escape'
  };

  var Mouse = {
    LEFT_BUTTON: 1
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === Key.ENTER) {
      action();
    }
  };

  var isEscapeEvent = function (evt, action) {
    if (evt.key === Key.ESCAPE) {
      action();
    }
  };

  var isMouseEvent = function (evt, action) {
    if (evt.which === Mouse.LEFT_BUTTON) {
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

    lengthArray.forEach(function (item) {
      newArray.push(arr[item]);
    });

    // for (var i = 0; i < lengthArray; i++) {
    // newArray.push(arr[i]);
    // }

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
