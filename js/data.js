'use strict';

(function () {
  var TITLES_AD = ['Title1', 'Title2', 'Title3', 'Title4', 'Title5', 'Title6', 'Title7', 'Title8'];
  var PRICE_FLAT = [5000, 10000, 30000, 50000, 100000];
  var TYPE_FLAT = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS_FLAT = [1, 2, 3];
  var NUMBER_OF_GUESTS = [0, 1, 2];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES_FLAT = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_FLAT = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var map = document.querySelector('.map');
  var widthMap = map.offsetWidth;

  // Создание массива с объектами
  var generateData = function (num) {
    var ads = [];

    for (var i = 0; i < num; i++) {
      var positionX = window.util.getRandomNumber(0, widthMap);
      var positionY = window.util.getRandomNumber(130, 630);

      ads.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: TITLES_AD[i],
          adress: positionX + ', ' + positionY,
          price: window.util.getRandomItem(PRICE_FLAT),
          type: window.util.getRandomItem(TYPE_FLAT),
          rooms: window.util.getRandomItem(ROOMS_FLAT),
          guests: window.util.getRandomItem(NUMBER_OF_GUESTS),
          checkin: window.util.getRandomItem(CHECKIN),
          checkout: window.util.getRandomItem(CHECKOUT),
          features: window.util.getRandomLength(FEATURES_FLAT),
          description: 'Здесь будет описание',
          photos: window.util.getRandomLength(PHOTOS_FLAT)
        },
        location: {
          x: positionX,
          y: positionY
        }
      });
    }

    return ads;
  };

  window.data = {
    generate: generateData,
    widthMap: widthMap
  };
})();
