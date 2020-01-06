'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Functions
 */

var createElWithClass = function createElWithClass(tag, className) {
  var element = document.createElement(tag);
  element.classList.add(className);
  return element;
};

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

/**
 * Header
 */

var Header = function () {
  function Header() {
    _classCallCheck(this, Header);

    this.navWrapper = document.querySelector('.header-nav-wrapper');
    this.nav = document.querySelector('.header-nav');
    this.navToggle = document.querySelector('.header-nav-toggle');
    this.init();
  }

  _createClass(Header, [{
    key: 'init',
    value: function init() {
      var _this = this;

      if (this.navToggle) {
        this.navToggle.addEventListener('click', function (event) {
          if (_this.nav.classList.contains('active')) {
            removeActive(_this.navToggle, _this.nav);
          } else {
            addActive(_this.navToggle, _this.nav);
          }
          event.preventDefault();
        });
      }

      document.addEventListener('click', function (event) {
        var isClickInside = _this.navWrapper.contains(event.target);
        if (!isClickInside && _this.nav.classList.contains('active')) {
          removeActive(_this.navToggle, _this.nav);
        }
      });
    }
  }]);

  return Header;
}();

/**
 * Select
 */


var SelectCustom = function () {
  function SelectCustom() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$selector = _ref.selector,
        selector = _ref$selector === undefined ? 'selector' : _ref$selector;

    _classCallCheck(this, SelectCustom);

    this.select = selector;
    this.selectOptions = [].concat(_toConsumableArray(this.select.children));
    this.selectWrapper = createElWithClass('div', 'select');
    this.selectInput = createElWithClass('div', 'select-input');
    this.selectList = createElWithClass('ul', 'select-options');
    this.itemList = null;

    this.init();
  }

  _createClass(SelectCustom, [{
    key: 'resetSelectors',
    value: function resetSelectors() {
      this.selectInput.innerHTML = this.selectOptions[0].innerHTML;
    }
  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.select.classList.add('select-hidden');

      // Build HTML Structure
      this.select.parentNode.insertBefore(this.selectWrapper, this.select);
      this.selectWrapper.appendChild(this.select);

      this.select.parentNode.insertBefore(this.selectInput, this.select);

      // Get text of first option
      this.resetSelectors();

      // Fill selectList
      this.selectOptions.map(function (option, index) {
        if (index > 0) {
          var li = document.createElement('li');
          var text = option.innerHTML;
          var ref = option.value;

          li.innerHTML = text;
          li.setAttribute('ref', ref);
          _this2.selectList.appendChild(li);
        }
      });
      this.selectWrapper.appendChild(this.selectList);

      // List item event
      this.itemList = [].concat(_toConsumableArray(this.selectList.children));
      this.itemList.map(function (item) {
        item.addEventListener('click', function () {
          removeActive.apply(undefined, [_this2.selectInput, _this2.selectList].concat(_toConsumableArray(_this2.itemList)));
          addActive(item);

          _this2.selectInput.innerHTML = item.innerHTML;
        });
      });

      this.selectInput.addEventListener('click', function () {
        if (_this2.selectInput.classList.contains('active')) {
          removeActive(_this2.selectInput, _this2.selectList);
        } else {
          addActive(_this2.selectInput, _this2.selectList);
        }
      });

      document.addEventListener('click', function (event) {
        var isClickInside = _this2.selectWrapper.contains(event.target);
        if (!isClickInside) {
          removeActive(_this2.selectInput, _this2.selectList);
        }
      });
    }
  }]);

  return SelectCustom;
}();

/**
 * Tabs
*/


var Tabs = function () {
  function Tabs() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$selector = _ref2.selector,
        selector = _ref2$selector === undefined ? '.tabs' : _ref2$selector;

    _classCallCheck(this, Tabs);

    this.select = selector;
    this.tabsItem = [].concat(_toConsumableArray(this.select.querySelectorAll('.tabs-list-item')));
    this.tabsPane = [].concat(_toConsumableArray(this.select.querySelectorAll('.tabs-pane')));
    this.init();
  }

  _createClass(Tabs, [{
    key: 'init',
    value: function init() {
      var _this3 = this;

      this.tabsItem.map(function (item) {
        return item.addEventListener('click', function (event) {

          var tabsPageLink = item.querySelector('a').getAttribute('href');
          var activeTabsPane = document.querySelector(tabsPageLink);

          event.preventDefault();
          removeActive.apply(undefined, _toConsumableArray(_this3.tabsItem).concat(_toConsumableArray(_this3.tabsPane)));
          addActive(item, activeTabsPane);
        });
      });
    }
  }]);

  return Tabs;
}();

/**
* Product
*/


var Product = function () {
  function Product() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$selector = _ref3.selector,
        selector = _ref3$selector === undefined ? '.product' : _ref3$selector;

    _classCallCheck(this, Product);

    this.incrementProduct = function () {
      var counter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      return function (headerItem, headerItemLabel, productLink, productLinkText, text) {
        if (productLink.classList.contains('active')) {
          productLink.classList.remove('active');
          productLinkText.innerHTML = text.default;
          counter = headerItemLabel.innerHTML;
          counter--;
          headerItemLabel.innerHTML = counter;
        } else {
          productLink.classList.add('active');
          productLinkText.innerHTML = text.active;
          counter = headerItemLabel.innerHTML;
          counter++;
          headerItemLabel.innerHTML = counter;
        }
      };
    };

    this.product = selector;
    this.init();
  }

  _createClass(Product, [{
    key: 'init',
    value: function init() {
      var _this4 = this;

      var headerCart = document.querySelector('.header-info-group-link-cart');
      var headerCartLabel = headerCart.querySelector('.header-info-label');

      var headerCompare = document.querySelector('.header-info-group-link-compare');
      var headerCompareLabel = headerCompare.querySelector('.header-info-label');

      var headerFavorite = document.querySelector('.header-info-group-link-favorite');
      var headerFavoriteLabel = headerFavorite.querySelector('.header-info-label');

      var productBtnCart = this.product.querySelector('.product-btn-cart');

      var productLinkCompare = this.product.querySelector('.product-compare-link');
      var productLinkCompareText = productLinkCompare.querySelector('.product-compare-text');

      var productLinkFavorite = this.product.querySelector('.product-favorites-link');
      var productLinkFavoriteText = productLinkFavorite.querySelector('.product-favorites-text');

      var count = 0;
      productBtnCart.addEventListener('click', function (event) {
        event.preventDefault();

        if (productBtnCart.classList.contains('active')) {
          productBtnCart.classList.remove('active');
          count = headerCartLabel.innerHTML;
          count--;
          headerCartLabel.innerHTML = count;
        } else {
          productBtnCart.classList.add('active');
          count = headerCartLabel.innerHTML;
          count++;
          headerCartLabel.innerHTML = count;
        }
      });

      productLinkCompare.addEventListener('click', function (event) {
        event.preventDefault();
        _this4.incrementProduct()(headerCompare, headerCompareLabel, productLinkCompare, productLinkCompareText, {
          default: 'Сравнить товар',
          active: 'В сравнении'
        });
      });

      productLinkFavorite.addEventListener('click', function (event) {
        event.preventDefault();

        _this4.incrementProduct()(headerFavorite, headerFavoriteLabel, productLinkFavorite, productLinkFavoriteText, {
          default: 'В избранное',
          active: 'В избранном'
        });
      });
    }
  }]);

  return Product;
}();
//# sourceMappingURL=core.js.map