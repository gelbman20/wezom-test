'use strict';

var plugins = {
  header: document.querySelector('.header-nav-wrapper'),
  select: document.querySelectorAll('.select'),
  tabs: document.querySelectorAll('.tabs')
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
};
//# sourceMappingURL=script.js.map