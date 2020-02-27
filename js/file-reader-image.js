'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var AVATAR_DEFAULT = 'img/muffin-grey.svg';

  var adForm = document.querySelector('.ad-form');
  var avatarChoose = adForm.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var photosChoose = adForm.querySelector('.ad-form__upload input[type=file]');
  var photosPreview = adForm.querySelector('.ad-form__photo');

  var loadFileAvatar = function () {
    var file = avatarChoose.files[0];

    if (verifyFiles(file, window.error.showMessage)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var loadFilePhotos = function () {
    var file = photosChoose.files[0];

    if (verifyFiles(file, window.error.showMessage)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photosPreview.classList.add('ad-form__photo--load-file');
        var photo = document.createElement('img');
        photo.classList.add('house-photo');
        photo.src = reader.result;
        photosPreview.appendChild(photo);
      });

      reader.readAsDataURL(file);
    }

  };

  var verifyFiles = function (file, onError) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    return matches ? matches : onError('Выберите файл формата .jpg/.jpeg/.png');
  };

  var clearFile = function () {
    avatarPreview.src = AVATAR_DEFAULT;
    photosPreview.classList.remove('ad-form__photo--load-file');
    photosPreview.querySelectorAll('.house-photo').forEach(function (photo) {
      photo.remove();
    });
  };

  avatarChoose.addEventListener('change', function () {
    loadFileAvatar();
  });

  photosChoose.addEventListener('change', function () {
    loadFilePhotos();
  });

  window.fileReaderImage = {
    clear: clearFile
  };
})();
