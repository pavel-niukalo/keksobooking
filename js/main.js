'use strict';

var NUMBER_OF_ADS = 8;
var TITLES_AD = ['Title1', 'Title2', 'Title3', 'Title4', 'Title5', 'Title6', 'Title7', 'Title8'];
var PRICE_FLAT = [5000, 10000, 30000, 50000, 100000];
var TYPE_FLAT = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_FLAT = [1, 2, 3];
var NUMBER_OF_GUESTS = [0, 1, 2];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES_FLAT = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_FLAT = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_Y_SHIFT = 70;
var LOCATION_X_SHIFT = 25;

var map = document.querySelector('.map');
var widthMap = map.offsetWidth;

var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');

// Случайный элемент массива
var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Случайная длина массива
var getRandomLength = function (arr) {
  var lengthArray = Math.floor(Math.random() * arr.length);
  var newArray = [];

  for (var i = 0; i < lengthArray; i++) {
    newArray.push(arr[i]);
  }

  return newArray;
};

// Создание массива с объектами
var generateData = function (num) {
  var ads = [];

  for (var i = 0; i < num; i++) {
    var positionX = getRandomNumber(0, widthMap);
    var positionY = getRandomNumber(130, 630);

    ads.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: TITLES_AD[i],
        adress: positionX + ', ' + positionY,
        price: getRandomItem(PRICE_FLAT),
        type: getRandomItem(TYPE_FLAT),
        rooms: getRandomItem(ROOMS_FLAT),
        guests: getRandomItem(NUMBER_OF_GUESTS),
        checkin: getRandomItem(CHECKIN),
        checkout: getRandomItem(CHECKOUT),
        features: getRandomLength(FEATURES_FLAT),
        description: 'Здесь будет описание',
        photos: getRandomLength(PHOTOS_FLAT)
      },
      location: {
        x: positionX,
        y: positionY
      }
    });
  }

  return ads;
};

// Создание 1 метки
var renderAd = function (data) {
  var pinElement = mapPinTemplate.cloneNode(true);

  pinElement.style = 'left:' + (data.location.x - LOCATION_X_SHIFT) + 'px; top:' + (data.location.y - LOCATION_Y_SHIFT) + 'px;';
  pinElement.querySelector('img').src = data.author.avatar;
  pinElement.querySelector('img').alt = data.offer.title;

  pinElement.addEventListener('click', function () {
    showCard(data);
  });

  return pinElement;
};

// Создание нужного количества меток
var renderAds = function (array) {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < array.length; j++) {
    fragment.appendChild(renderAd(array[j]));
  }

  mapPins.appendChild(fragment);
};

var data = generateData(NUMBER_OF_ADS);

// Задание №2
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

var mapFilters = map.querySelector('.map__filters-container');

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

// Создание 1 объявления
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
    closeCard();
  });

  document.addEventListener('keydown', onCardEscPress);

  return cardElement;
};

var showCard = function (ad) {
  var activeCard = map.querySelector('.map__card');

  // Проверка открытого объявления
  if (activeCard) {
    activeCard.remove();
  }

  mapFilters.insertAdjacentElement('beforebegin', renderCard(ad));
};

var onCardEscPress = function (evt) {
  if (evt.key === ESCAPE_KEY) {
    closeCard();
  }
};

var closeCard = function () {
  map.querySelector('.map__card').remove();
  document.removeEventListener('keydown', onCardEscPress);
};

// Задание 4-го раздела
var ENTER_KEY = 'Enter';
var ESCAPE_KEY = 'Escape';
var LEFT_MOUSE_BUTTON = 1;
var PIN_WIDTH = 65;
var PIN_HEIGHT = 65;
var PIN_TAIL = 22;

var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
var filtersFormFieldset = document.querySelectorAll('.map__filters fieldset');
var filtersFormSelect = document.querySelectorAll('.map__filters select');
var adressInput = adForm.querySelector('input[name="address"]');
var numberRooms = adForm.querySelector('select[name=rooms]');
var numberGuests = adForm.querySelector('select[name=capacity]');
var typeFlat = adForm.querySelector('select[name=type]');
var pricePerNight = adForm.querySelector('input[name=price]');
var timeIn = adForm.querySelector('select[name=timein]');
var timeOut = adForm.querySelector('select[name=timeout]');

// Добавление disabled
var setDisabled = function (collection, value) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].disabled = value;
  }
};

setDisabled(adFormFieldset, true);
setDisabled(filtersFormFieldset, true);
setDisabled(filtersFormSelect, true);

// Проверка пинов,
// если пользователь нажимает несколько раз на главный пин
var deletePins = function () {
  var activeMapPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

  for (var i = 0; i < activeMapPins.length; i++) {
    activeMapPins[i].remove();
  }
};

// Перевод в активное состояние
var enableActiveState = function () {
  adForm.classList.remove('ad-form--disabled');

  setDisabled(adFormFieldset, false);
  setDisabled(filtersFormFieldset, false);
  setDisabled(filtersFormSelect, false);

  deletePins();
  renderAds(data);
  map.classList.remove('map--faded');
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === LEFT_MOUSE_BUTTON) {
    enableActiveState();
    adressInput.value = getCoordinatesMainPin();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    enableActiveState();
    adressInput.value = getCoordinatesMainPin();
  }
});

// Заполнение поля адреса
var isActivate = function () {
  return !map.classList.contains('map--faded');
};

var getCoordinatesMainPin = function () {
  var pinX = Math.round((mapPinMain.offsetLeft + PIN_WIDTH / 2) - mapPins.offsetLeft);
  var pinY;

  if (isActivate()) {
    pinY = Math.round(mapPinMain.offsetTop + PIN_HEIGHT + PIN_TAIL);
  } else {
    pinY = Math.round(mapPinMain.offsetTop + PIN_HEIGHT / 2);
  }

  return pinX + ', ' + pinY;
};

adressInput.value = getCoordinatesMainPin();

// Валидация комнат и гостей
var checkNumberOfGuestsAndRooms = function () {
  var roomsValue = parseInt(numberRooms.value, 10);
  var guestsValue = parseInt(numberGuests.value, 10);

  if (roomsValue !== 100 && guestsValue === 0) {
    numberGuests.setCustomValidity('Недостаточно гостей');
  } else if (roomsValue < guestsValue) {
    numberGuests.setCustomValidity('Гостей очень много');
  } else if (roomsValue === 100 && guestsValue !== 0) {
    numberGuests.setCustomValidity('Данный вариант не для гостей');
  } else {
    numberGuests.setCustomValidity('');
  }
};

// Установка минимальной цены
var setMinPrice = function () {
  var selectedType = typeFlat.value;
  var value;

  if (selectedType === 'bungalo') {
    value = 0;
  } else if (selectedType === 'flat') {
    value = 1000;
  } else if (selectedType === 'house') {
    value = 5000;
  } else {
    value = 10000;
  }

  pricePerNight.setAttribute('min', value);
  pricePerNight.setAttribute('placeholder', value);
};

// Синхронизация времени заезда и выезда
var toSyncTime = function () {
  var changeTimeIn = function () {
    timeOut.value = timeIn.value;
  };

  var changeTimeOut = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener('change', function () {
    changeTimeIn();
  });
  timeOut.addEventListener('change', function () {
    changeTimeOut();
  });
};

// Валидация формы
numberRooms.addEventListener('change', function () {
  checkNumberOfGuestsAndRooms();
});

typeFlat.addEventListener('change', function () {
  setMinPrice();
});

timeIn.addEventListener('change', function () {
  toSyncTime();
});

