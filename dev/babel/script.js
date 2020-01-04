const plugins = {
  header:  document.querySelector('.header-nav-wrapper'),
  select: document.querySelectorAll('.select')
};

window.onload = function () {
  // Header
  if (plugins.header) {
    const header = new Header();
  }
  
  // Select
  if (plugins.select) {
  
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
        selector: currentSelect
      });
  
      btn.addEventListener('click', () => {
        init.resetSelectors();
      })
    }
  }
  
 
  
  const removeActive = (...elements) => {
    elements.map(element => element.classList.remove('active'))
  };
  
  const addActive = (...elements) => {
    elements.map(element => element.classList.add('active'))
  };
  
  const tabsItem = [...document.querySelectorAll('.tabs-list-item')];
  const tabsPane = [...document.querySelectorAll('.tabs-pane')];
  
  tabsItem.map(item => item.addEventListener('click', (event) => {
    
    const tabsPageLink = item.querySelector('a').getAttribute('href');
    const activeTabsPane = document.querySelector(tabsPageLink);
    
    event.preventDefault();
    removeActive(...tabsItem, ...tabsPane);
    addActive(item, activeTabsPane);
  }))
};