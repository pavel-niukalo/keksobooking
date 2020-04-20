'use strict';

(function () {
  var Url = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    SAVE: 'https://javascript.pages.academy/keksobooking'
  };
  var Server = {
    TIME: 10000,
    STATUS_SUCCESS: 200
  };

  var createXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === Server.STATUS_SUCCESS) {
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

    xhr.timeout = Server.TIME;

    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);

    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  var save = function (data, onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);

    xhr.open('POST', Url.SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
