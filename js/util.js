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

  // Добавление disabled
  var setDisabled = function (collection, value) {
    collection.forEach(function (item) {
      item.disabled = value;
    });
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscapeEvent: isEscapeEvent,
    isMouseEvent: isMouseEvent,
    setDisabled: setDisabled
  };
})();
