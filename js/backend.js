'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var SERVER_TIME = 10000;
  var STATUS_OK = 200;

  var templateError = document.querySelector('#error')
    .content
    .querySelector('.error');

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения. Проверьте подключение к сети.');
    });
    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания. Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = SERVER_TIME;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var onError = function (errorMessage) {
    var error = templateError.cloneNode(true);

    var onErrorEscPress = function (evt) {
      window.util.isEscapeEvent(evt, closeError);
    };

    var closeError = function () {
      error.remove();
      document.removeEventListener('keydown', onErrorEscPress);

      error.querySelector('.error__button')
      .addEventListener('click', function () {
        closeError();
      });
    };

    error.querySelector('.error__message').textContent = errorMessage;

    document.querySelector('main')
    .append(error);

    document.addEventListener('keydown', onErrorEscPress);

    error.querySelector('.error__button')
    .addEventListener('click', function () {
      closeError();
    });
  };

  window.backend = {
    load: load,
    onError: onError
  };
})();
