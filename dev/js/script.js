'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var plugins = {
  header: document.querySelector('.header-nav-wrapper'),
  select: document.querySelectorAll('.select')
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

  var removeActive = function removeActive() {
    for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
      elements[_key] = arguments[_key];
    }

    elements.map(function (element) {
      return element.classList.remove('active');
    });
  };

  var addActive = function addActive() {
    for (var _len2 = arguments.length, elements = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      elements[_key2] = arguments[_key2];
    }

    elements.map(function (element) {
      return element.classList.add('active');
    });
  };

  var tabsItem = [].concat(_toConsumableArray(document.querySelectorAll('.tabs-list-item')));
  var tabsPane = [].concat(_toConsumableArray(document.querySelectorAll('.tabs-pane')));

  tabsItem.map(function (item) {
    return item.addEventListener('click', function (event) {

      var tabsPageLink = item.querySelector('a').getAttribute('href');
      var activeTabsPane = document.querySelector(tabsPageLink);

      event.preventDefault();
      removeActive.apply(undefined, _toConsumableArray(tabsItem).concat(_toConsumableArray(tabsPane)));
      addActive(item, activeTabsPane);
    });
  });
};
//# sourceMappingURL=script.js.map