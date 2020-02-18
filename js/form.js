'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var adressInput = adForm.querySelector('input[name="address"]');
  var numberRooms = adForm.querySelector('select[name=rooms]');
  var numberGuests = adForm.querySelector('select[name=capacity]');
  var typeFlat = adForm.querySelector('select[name=type]');
  var pricePerNight = adForm.querySelector('input[name=price]');
  var timeIn = adForm.querySelector('select[name=timein]');
  var timeOut = adForm.querySelector('select[name=timeout]');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  // Добавление disabled форме
  var setDisabled = function (collection, value) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].disabled = value;
    }
  };

  setDisabled(adFormFieldset, true);

  // Заполнение поля адреса
  var setAddress = function (coords) {
    adressInput.value = coords;
  };

  setAddress(window.pinMain.getCoordinates());

  // Перевод в активное состояние
  var enableActiveState = function () {
    adForm.classList.remove('ad-form--disabled');

    setDisabled(adFormFieldset, false);
  };

  // Перевод в неактивное состояние
  var enableInactiveState = function () {
    adForm.classList.add('ad-form--disabled');

    setDisabled(adFormFieldset, true);
  };

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
  var toSyncTimeOut = function () {
    timeOut.value = timeIn.value;
  };

  var toSyncTimeIn = function () {
    timeIn.value = timeOut.value;
  };

  // Валидация формы
  numberRooms.addEventListener('change', function () {
    checkNumberOfGuestsAndRooms();
  });

  typeFlat.addEventListener('change', function () {
    setMinPrice();
  });

  timeIn.addEventListener('change', function () {
    toSyncTimeOut();
  });

  timeOut.addEventListener('change', function () {
    toSyncTimeIn();
  });

  // Успешная отправка формы
  var submitFormSuccessful = function () {
    // Показ сообщения об успехе
    window.success.showMessage();

    adFormSubmit.textContent = 'Опубликовать';
    adFormSubmit.disabled = false;

    // Деактивация страницы
    window.app.deactivate();
    adForm.reset();
    window.app.updateCoordinates();
  };

  // Ошибка при отправке формы
  var submitFormError = function () {
    window.error.showMessage('Ошибка загрузки объявления');
    adFormSubmit.textContent = 'Опубликовать';
    adFormSubmit.disabled = false;
  };

  // Отправка формы
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    adFormSubmit.textContent = 'Отправка';
    adFormSubmit.disabled = true;

    window.backend.save(new FormData(adForm), submitFormSuccessful, submitFormError);
  });

  // Сброс формы
  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.app.deactivate();
    adForm.reset();
    setAddress(window.pinMain.getCoordinates());
  });

  window.form = {
    enableActiveState: enableActiveState,
    enableInactiveState: enableInactiveState,
    setAddress: setAddress
  };
})();
