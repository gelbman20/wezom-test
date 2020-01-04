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

    this.init();
  }

  _createClass(Header, [{
    key: 'init',
    value: function init() {
      var navWrapper = document.querySelector('.header-nav-wrapper');
      var nav = document.querySelector('.header-nav');
      var navToggle = document.querySelector('.header-nav-toggle');

      if (navToggle) {
        navToggle.addEventListener('click', function (event) {
          if (nav.classList.contains('open')) {
            navToggle.classList.remove('open');
            nav.classList.remove('open');
          } else {
            navToggle.classList.add('open');
            nav.classList.add('open');
          }
          event.preventDefault();
        });
      }

      document.addEventListener('click', function (event) {
        var isClickInside = navWrapper.contains(event.target);
        if (!isClickInside && nav.classList.contains('open')) {
          navToggle.classList.remove('open');
          nav.classList.remove('open');
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
      var _this = this;

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
          _this.selectList.appendChild(li);
        }
      });
      this.selectWrapper.appendChild(this.selectList);

      // List item event
      this.itemList = [].concat(_toConsumableArray(this.selectList.children));
      this.itemList.map(function (item) {
        item.addEventListener('click', function () {
          removeActive.apply(undefined, [_this.selectInput, _this.selectList].concat(_toConsumableArray(_this.itemList)));
          addActive(item);

          _this.selectInput.innerHTML = item.innerHTML;
        });
      });

      this.selectInput.addEventListener('click', function () {
        if (_this.selectInput.classList.contains('active')) {
          removeActive(_this.selectInput, _this.selectList);
        } else {
          addActive(_this.selectInput, _this.selectList);
        }
      });

      document.addEventListener('click', function (event) {
        var isClickInside = _this.selectWrapper.contains(event.target);
        if (!isClickInside) {
          removeActive(_this.selectInput, _this.selectList);
        }
      });
    }
  }]);

  return SelectCustom;
}();
//# sourceMappingURL=core.js.map