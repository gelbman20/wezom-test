'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var plugins = {
  header: document.querySelector('.header-nav-wrapper'),
  select: document.querySelectorAll('.select'),
  tabs: document.querySelectorAll('.tabs'),
  modals: document.querySelectorAll('.modal-link'),
  phone: document.querySelector('#phone'),
  email: document.querySelector('#email'),
  password: document.querySelector('#password'),
  snackbar: document.querySelector('.snackbar'),
  copyrightYear: document.querySelector('.copyright-year')
};

window.onload = function () {
  // Header
  if (plugins.header) {
    var header = new Header();
  }

  // Select
  if (plugins.select) {

    var btn = document.querySelector('.reset-filters');

    var inputNumber = document.querySelectorAll('.form-input-number');

    var _loop = function _loop(i) {
      var item = inputNumber[i];
      var value = item.value;
      item.addEventListener('input', function () {
        item.value = Math.abs(item.value);
      });

      btn.addEventListener('click', function () {
        item.value = value;
      });
    };

    for (var i = 0; i < inputNumber.length; i++) {
      _loop(i);
    }

    var _loop2 = function _loop2(i) {
      var currentSelect = plugins.select[i];

      var init = new SelectCustom({
        selector: currentSelect
      });

      btn.addEventListener('click', function () {
        init.resetSelectors();
      });
    };

    for (var i = 0; i < plugins.select.length; i++) {
      _loop2(i);
    }
  }

  // Tabs
  if (plugins.tabs) {
    for (var i = 0; i < plugins.tabs.length; i++) {
      var tab = plugins.tabs[i];

      var _init = new Tabs({
        selector: tab
      });
    }
  }

  // Products
  var products = document.querySelectorAll('.product');
  if (products) {

    for (var _i = 0; _i < products.length; _i++) {
      var product = products[_i];

      var _init2 = new Product({
        selector: product
      });
    }
  }

  // Modal
  if (plugins.modals) {
    for (var _i2 = 0; _i2 < plugins.modals.length; _i2++) {
      var modal = plugins.modals[_i2];

      var _init3 = new Modal({
        selector: modal
      });
    }
  }

  // Phone
  if (plugins.phone) {
    var dynamicMask = IMask(plugins.phone, {
      mask: '+{38}(000)000-00-00'
    });

    var _btn = document.querySelector('#btn-phone');
    _btn.addEventListener('click', function (event) {
      event.preventDefault();
      if (dynamicMask.value.length !== 17) {
        plugins.phone.classList.add('has-error');
      } else {
        plugins.phone.classList.remove('has-error');

        removeActive.apply(undefined, _toConsumableArray(document.querySelectorAll('.popup-blackuot')).concat(_toConsumableArray(document.querySelectorAll('.popup-modal')), [document.querySelector('body')]));

        dynamicMask.value = '';
        plugins.snackbar.innerHTML = 'Мы вам перезвоним';
        plugins.snackbar.classList.add('active');
        setTimeout(function () {
          plugins.snackbar.classList.remove('active');
        }, 2500);
      }
    });
  }

  // Email && Password
  if (plugins.email && plugins.password) {
    var _dynamicMask = IMask(plugins.email, {
      mask: function mask(value) {
        if (/^[a-z0-9_\.-]+$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@[a-z0-9-]+$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.[a-z]{1,4}$/.test(value)) return true;
        return false;
      }
    });
    var _btn2 = document.querySelector('#btn-login');
    _btn2.addEventListener('click', function (event) {
      event.preventDefault();
      var value = _dynamicMask.value;
      var regular = /\S+@\S+\.\S+/;

      if (!regular.test(value)) {
        plugins.email.classList.add('has-error');
      } else {
        plugins.email.classList.remove('has-error');
        plugins.email.classList.add('is-success');
      }

      if (plugins.password.value.length < 5) {
        plugins.password.classList.add('has-error');
      } else {
        plugins.password.classList.remove('has-error');
        plugins.password.classList.add('is-success');
      }

      if (regular.test(value) && plugins.password.value.length > 4) {
        _dynamicMask.value = '';
        plugins.password.value = '';
        plugins.email.classList.remove('is-success');
        plugins.password.classList.remove('is-success');
        plugins.snackbar.innerHTML = 'Вы успешно вошли';
        plugins.snackbar.classList.add('active');
        removeActive.apply(undefined, _toConsumableArray(document.querySelectorAll('.popup-blackuot')).concat(_toConsumableArray(document.querySelectorAll('.popup-modal')), [document.querySelector('body')]));
        setTimeout(function () {
          plugins.snackbar.classList.remove('active');
        }, 2500);
      }
    });
  }

  // Footer Email
  var footerEmail = document.querySelector('#footer-email');
  if (footerEmail) {
    var footerMask = IMask(footerEmail, {
      mask: function mask(value) {
        if (/^[a-z0-9_\.-]+$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@[a-z0-9-]+$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.$/.test(value)) return true;
        if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.[a-z]{1,4}$/.test(value)) return true;
        return false;
      }
    });

    var _btn3 = document.querySelector('#btn-footer-email');
    _btn3.addEventListener('click', function (event) {
      event.preventDefault();
      var value = footerMask.value;
      var regular = /\S+@\S+\.\S+/;

      if (!regular.test(value)) {
        footerEmail.classList.add('has-error');
      } else {
        footerEmail.classList.remove('has-error');
        plugins.snackbar.innerHTML = '\u0412\u044B ' + footerMask.value + ' \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u043D\u044B \u043D\u0430 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0443';
        footerMask.value = '';
        plugins.snackbar.classList.add('active');
        setTimeout(function () {
          plugins.snackbar.classList.remove('active');
        }, 2500);
      }
    });
  }

  // Search
  var searchInput = document.querySelector('#search-input');
  if (searchInput) {
    var _btn4 = document.querySelector('#btn-search');
    _btn4.addEventListener('click', function (event) {
      event.preventDefault();
      if (searchInput.value.length < 3) {
        searchInput.classList.add('has-error');
      } else {
        searchInput.classList.remove('has-error');
        plugins.snackbar.innerHTML = '\u0418\u0448\u0435\u043C: ' + searchInput.value;
        searchInput.value = '';
        plugins.snackbar.classList.add('active');
        setTimeout(function () {
          plugins.snackbar.classList.remove('active');
        }, 2500);
      }
    });
  }

  // Copyright Year
  if (plugins.copyrightYear) {
    plugins.copyrightYear.innerHTML = new Date().getFullYear().toString();
  }
};
//# sourceMappingURL=script.js.map