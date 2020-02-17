'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var SERVER_TIME = 10000;
  var STATUS_OK = 200;

  var adFormSubmit = document.querySelector('.ad-form__submit');

  var templateError = document.querySelector('#error')
    .content
    .querySelector('.error');

  var createXhr = function (onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения. Проверьте подключение к сети.');
    });
    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания. Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = SERVER_TIME;

    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = createXhr(onError);

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var save = function (data, onSuccess, onError) {
    var xhr = createXhr(onError);

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка загрузки объявления');
        adFormSubmit.textContent = 'Опубликовать';
        adFormSubmit.disabled = false;
      }
    });

    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };

  var onError = function (errorMessage) {
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

  window.backend = {
    load: load,
    save: save,
    onError: onError
  };
})();
