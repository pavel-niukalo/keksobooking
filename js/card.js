'use strict';

(function () {
  var typeFlatTranslateMap = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  var imgTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup__photo');

  // Вставка списка удобств
  var insertFeatures = function (element, array) {
    element.innerHTML = '';

    array.forEach(function (item) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add('popup__feature--' + item);
      element.appendChild(featureItem);
    });
    // for (var i = 0; i < array.length; i++) {
    //   var featureItem = document.createElement('li');
    //   featureItem.classList.add('popup__feature');
    //   featureItem.classList.add('popup__feature--' + array[i]);
    //   element.appendChild(featureItem);
    // }
  };

  // Вставка фотографий
  var insertPhotos = function (element, array) {
    element.innerHTML = '';

    array.forEach(function (item) {
      var adPhoto = imgTemplate.cloneNode(true);
      adPhoto.src = item;
      element.appendChild(adPhoto);
    });
    // for (var j = 0; j < array.length; j++) {
    //   var adPhoto = imgTemplate.cloneNode(true);
    //   adPhoto.src = array[j];
    //   element.appendChild(adPhoto);
    // }
  };

  // Создание объявления
  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typeFlatTranslateMap[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    insertFeatures(cardElement.querySelector('.popup__features'), card.offer.features);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    insertPhotos(cardElement.querySelector('.popup__photos'), card.offer.photos);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    cardElement.querySelector('.popup__close')
    .addEventListener('click', function () {
      closeCard();
    });

    document.addEventListener('keydown', onCardEscPress);

    return cardElement;
  };

  var mapFilters = map.querySelector('.map__filters-container');

  // Проверка открытого объявления
  var deleteCard = function () {
    var activeCard = map.querySelector('.map__card');

    if (activeCard) {
      activeCard.remove();
    }
  };

  // Показ объявления
  var showCard = function (ad) {
    deleteCard();
    mapFilters.insertAdjacentElement('beforebegin', renderCard(ad));
  };

  // Взаимодействие с карточкой
  var onCardEscPress = function (evt) {
    window.util.isEscapeEvent(evt, closeCard);
  };

  var closeCard = function () {
    map.querySelector('.map__card').remove();
    document.removeEventListener('keydown', onCardEscPress);
  };

  window.card = {
    show: showCard,
    deleteCard: deleteCard
  };
})();
