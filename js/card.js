'use strict';

(function () {
  var TYPE_FLAT_TRANSLATE = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  var imgTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup__photo');

  // Вставка списка удобств
  var insertFeatures = function (element, array) {
    element.innerHTML = '';

    for (var i = 0; i < array.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add('popup__feature--' + array[i]);
      element.appendChild(featureItem);
    }
  };

  // Вставка фотографий
  var insertPhotos = function (element, array) {
    element.innerHTML = '';

    for (var j = 0; j < array.length; j++) {
      var adPhoto = imgTemplate.cloneNode(true);
      adPhoto.src = array[j];
      element.appendChild(adPhoto);
    }
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TYPE_FLAT_TRANSLATE[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    insertFeatures(cardElement.querySelector('.popup__features'), card.offer.features);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    insertPhotos(cardElement.querySelector('.popup__photos'), card.offer.photos);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    cardElement.querySelector('.popup__close')
    .addEventListener('click', function () {
      window.map.closeCard();
    });

    document.addEventListener('keydown', window.map.onCardEscPress);

    return cardElement;
  };

  var mapFilters = window.data.map.querySelector('.map__filters-container');

  // Показ объявления
  var showCard = function (ad) {
    var activeCard = window.data.map.querySelector('.map__card');

    // Проверка открытого объявления
    if (activeCard) {
      activeCard.remove();
    }

    mapFilters.insertAdjacentElement('beforebegin', renderCard(ad));
  };

  window.card = {
    showCard: showCard
  };
})();
