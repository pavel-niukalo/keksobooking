'use strict';

(function () {
  var Shift = {
    LOCATION_X: 70,
    LOCATION_Y: 25
  };

  var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  // Создание 1 метки
  var renderAd = function (data) {
    var pinElement = mapPinTemplate.cloneNode(true);

    pinElement.style.left = (data.location.x - Shift.LOCATION_X) + 'px';
    pinElement.style.top = (data.location.y - Shift.LOCATION_Y) + 'px';
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;

    pinElement.addEventListener('click', function () {
      window.app.showCard(data);
    });

    return pinElement;
  };

  window.pin = {
    renderAd: renderAd
  };
})();
