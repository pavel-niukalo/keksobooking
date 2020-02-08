'use strict';

(function () {
  var LOCATION_Y_SHIFT = 70;
  var LOCATION_X_SHIFT = 25;

  var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  // Создание 1 метки
  var renderAd = function (data) {
    var pinElement = mapPinTemplate.cloneNode(true);

    pinElement.style = 'left:' + (data.location.x - LOCATION_X_SHIFT) + 'px; top:' + (data.location.y - LOCATION_Y_SHIFT) + 'px;';
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;

    pinElement.addEventListener('click', function () {
      window.card.showCard(data);
    });

    return pinElement;
  };

  // Создание нужного количества меток
  var renderAds = function (array) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < array.length; j++) {
      fragment.appendChild(renderAd(array[j]));
    }

    window.defolt.mapPins.appendChild(fragment);
  };

  window.pin = {
    renderAds: renderAds
  };
})();
