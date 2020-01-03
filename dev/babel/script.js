const plugins = {
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