'use strict';

(function () {
  var templateSuccess = document.querySelector('#success')
    .content
    .querySelector('.success');

  var showMessage = function () {
    var success = templateSuccess.cloneNode(true);

    var onSuccessEscPress = function (evt) {
      window.util.isEscapeEvent(evt, closeSuccess);
    };

    var closeSuccess = function () {
      success.remove();
      document.removeEventListener('keydown', onSuccessEscPress);
    };

    document.querySelector('main')
    .append(success);

    document.addEventListener('keydown', onSuccessEscPress);

    document.addEventListener('click', function () {
      closeSuccess();
    });
  };

  window.success = {
    showMessage: showMessage
  };
})();
