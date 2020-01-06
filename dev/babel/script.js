const plugins = {
  header : document.querySelector('.header-nav-wrapper'),
  select : document.querySelectorAll('.select'),
  tabs : document.querySelectorAll('.tabs')
};

window.onload = function () {
  // Header
  if(plugins.header) {
    const header = new Header();
  }
  
  // Select
  if(plugins.select) {
    
    const btn = document.querySelector('.reset-filters');
    
    const inputNumber = document.querySelectorAll('.form-input-number');
    
    for (let i = 0; i < inputNumber.length; i++) {
      let item = inputNumber[i];
      const value = item.value;
      item.addEventListener('input', () => {
        item.value = Math.abs(item.value);
      });
      
      btn.addEventListener('click', () => {
        item.value = value;
      })
    }
    
    for (let i = 0; i < plugins.select.length; i++) {
      let currentSelect = plugins.select[i];
      
      const init = new SelectCustom({
        selector : currentSelect
      });
      
      btn.addEventListener('click', () => {
        init.resetSelectors();
      })
    }
  }
  
  // Tabs
  if(plugins.tabs) {
    for (let i = 0; i < plugins.tabs.length; i++) {
      let tab = plugins.tabs[i];
      
      const init = new Tabs({
        selector : tab
      })
    }
  }
  
  // Products
  const products = document.querySelectorAll('.product');
  if(products) {
    
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      
      const init = new Product({
        selector: product
      })
    }
  }
};