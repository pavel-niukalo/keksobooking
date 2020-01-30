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
    ads.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: TITLES_AD[i],
        adress: '600, 350',
        price: getRandomItem(PRICE_FLAT),
        type: getRandomItem(TYPE_FLAT),
        rooms: getRandomItem(ROOMS_FLAT),
        guests: getRandomItem(NUMBER_OF_GUESTS),
        checkin: getRandomItem(CHECKIN),
        checkout: getRandomItem(CHECKOUT),
        features: getRandomLength(FEATURES_FLAT),
        description: 'Ad description',
        photos: getRandomLength(PHOTOS_FLAT)
      },
      location: {
        x: getRandomNumber(0, widthMap),
        y: getRandomNumber(130, 630)
      }
    });
  }

  return ads;
};

// Создание 1 объявления
var renderAd = function (data) {
  var pinElement = mapPinTemplate.cloneNode(true);

  pinElement.style = 'left:' + (data.location.x - LOCATION_X_SHIFT) + 'px; top:' + (data.location.y - LOCATION_Y_SHIFT) + 'px;';
  pinElement.querySelector('img').src = data.author.avatar;
  pinElement.querySelector('img').alt = data.offer.title;

  return pinElement;
};

// Создание нужного количества объявлений
var renderAds = function (array) {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < array.length; j++) {
    fragment.appendChild(renderAd(array[j]));
  }

  mapPins.appendChild(fragment);
};

var data = generateData(NUMBER_OF_ADS);
renderAds(data);

map.classList.remove('map--faded');
