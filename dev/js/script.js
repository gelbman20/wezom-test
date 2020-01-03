'use strict';

var plugins = {
  header: null,
  select: null
};

window.onload = function () {
  // Header
  plugins.header = new Header();

  // Select
  plugins.select = new SelectCustom({
    selector: '.select'
  });
};
//# sourceMappingURL=script.js.map