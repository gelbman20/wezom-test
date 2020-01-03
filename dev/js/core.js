'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

    this.removeActive = function () {
      for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
        elements[_key] = arguments[_key];
      }

      elements.map(function (element) {
        return element.classList.remove('active');
      });
    };

    this.addActive = function () {
      for (var _len2 = arguments.length, elements = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        elements[_key2] = arguments[_key2];
      }

      elements.map(function (element) {
        return element.classList.add('active');
      });
    };

    this.createElWithClass = function (tag, className) {
      var element = document.createElement(tag);
      element.classList.add(className);
      return element;
    };

    this.selector = selector;
    this.init();
  }

  _createClass(SelectCustom, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var selects = [].concat(_toConsumableArray(document.querySelectorAll(this.selector)));

      var _loop = function _loop(i) {
        var select = selects[i];
        var selectOptions = [].concat(_toConsumableArray(select.children));
        var selectWrapper = _this.createElWithClass('div', 'select');
        var selectInput = _this.createElWithClass('div', 'select-input');
        var selectList = _this.createElWithClass('ul', 'select-options');

        select.classList.add('select-hidden');

        // Build HTML Structure
        select.parentNode.insertBefore(selectWrapper, select);
        selectWrapper.appendChild(select);

        select.parentNode.insertBefore(selectInput, select);

        // Get text of first option
        selectInput.innerHTML = selectOptions[0].innerHTML;

        // Fill selectList
        selectOptions.map(function (option, index) {
          if (index > 0) {
            var li = document.createElement('li');
            var text = option.innerHTML;
            var ref = option.value;

            li.innerHTML = text;
            li.setAttribute('ref', ref);
            selectList.appendChild(li);
          }
        });
        selectWrapper.appendChild(selectList);

        // List item event
        var itemList = [].concat(_toConsumableArray(selectList.children));
        itemList.map(function (item) {
          item.addEventListener('click', function () {
            _this.removeActive.apply(_this, [selectInput, selectList].concat(_toConsumableArray(itemList)));
            _this.addActive(item);

            selectInput.innerHTML = item.innerHTML;
          });
        });

        selectInput.addEventListener('click', function (event) {
          if (selectInput.classList.contains('active')) {
            _this.removeActive(selectInput, selectList);
          } else {
            _this.addActive(selectInput, selectList);
          }
        });

        document.addEventListener('click', function (event) {
          var isClickInside = selectWrapper.contains(event.target);
          if (!isClickInside) {
            _this.removeActive(selectInput, selectList);
          }
        });
      };

      for (var i = 0; i < selects.length; i++) {
        _loop(i);
      }
    }
  }]);

  return SelectCustom;
}();
//# sourceMappingURL=core.js.map