'use strict';

(function () {
  var templateError = document.querySelector('#error')
    .content
    .querySelector('.error');

  var showMessage = function (errorMessage) {
    var error = templateError.cloneNode(true);

    var onErrorEscPress = function (evt) {
      window.util.isEscapeEvent(evt, closeError);
    };

    var closeError = function () {
      error.remove();
      document.removeEventListener('keydown', onErrorEscPress);
    };

    error.querySelector('.error__message').textContent = errorMessage;

    document.querySelector('main')
    .append(error);

    document.addEventListener('click', function () {
      closeError();
    });
    document.addEventListener('keydown', onErrorEscPress);

    error.querySelector('.error__button')
    .addEventListener('click', function () {
      closeError();
    });
  };

  window.error = {
    showMessage: showMessage
  };
})();
