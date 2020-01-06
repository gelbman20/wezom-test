/**
 * Functions
 */

const createElWithClass = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};

const removeActive = (...elements) => {
  elements.map(element => element.classList.remove('active'))
};

const addActive = (...elements) => {
  elements.map(element => element.classList.add('active'))
};

/**
 * Header
 */
class Header {
  
  constructor() {
    this.navWrapper = document.querySelector('.header-nav-wrapper');
    this.nav = document.querySelector('.header-nav');
    this.navToggle = document.querySelector('.header-nav-toggle');
    this.init();
  }
  
  init() {
    if(this.navToggle) {
      this.navToggle.addEventListener('click', (event) => {
        if(this.nav.classList.contains('active')) {
          removeActive(this.navToggle, this.nav);
        } else {
          addActive(this.navToggle, this.nav);
        }
        event.preventDefault();
      })
    }
    
    document.addEventListener('click', (event) => {
      const isClickInside = this.navWrapper.contains(event.target);
      if(!isClickInside && this.nav.classList.contains('active')) {
        removeActive(this.navToggle, this.nav);
      }
    });
  }
}

/**
 * Select
 */
class SelectCustom {
  
  constructor({ selector = 'selector' } = {}) {
    this.select = selector;
    this.selectOptions = [ ...this.select.children ];
    this.selectWrapper = createElWithClass('div', 'select');
    this.selectInput = createElWithClass('div', 'select-input');
    this.selectList = createElWithClass('ul', 'select-options');
    this.itemList = null;
    
    this.init();
  }
  
  resetSelectors() {
    this.selectInput.innerHTML = this.selectOptions[0].innerHTML;
  }
  
  init() {
    this.select.classList.add('select-hidden');
    
    // Build HTML Structure
    this.select.parentNode.insertBefore(this.selectWrapper, this.select);
    this.selectWrapper.appendChild(this.select);
    
    this.select.parentNode.insertBefore(this.selectInput, this.select);
    
    // Get text of first option
    this.resetSelectors();
    
    // Fill selectList
    this.selectOptions.map((option, index) => {
      if(index > 0) {
        const li = document.createElement('li');
        const text = option.innerHTML;
        const ref = option.value;
        
        li.innerHTML = text;
        li.setAttribute('ref', ref);
        this.selectList.appendChild(li);
      }
    });
    this.selectWrapper.appendChild(this.selectList);
    
    // List item event
    this.itemList = [ ...this.selectList.children ];
    this.itemList.map(item => {
      item.addEventListener('click', () => {
        removeActive(this.selectInput, this.selectList, ...this.itemList);
        addActive(item);
        
        this.selectInput.innerHTML = item.innerHTML;
      })
    });
    
    this.selectInput.addEventListener('click', () => {
      if(this.selectInput.classList.contains('active')) {
        removeActive(this.selectInput, this.selectList);
      } else {
        addActive(this.selectInput, this.selectList);
      }
    });
    
    document.addEventListener('click', (event) => {
      const isClickInside = this.selectWrapper.contains(event.target);
      if(!isClickInside) {
        removeActive(this.selectInput, this.selectList);
      }
    });
  }
}

/**
 * Tabs
*/
class Tabs {
  constructor({ selector = '.tabs' } = {}) {
    this.select = selector;
    this.tabsItem = [...this.select.querySelectorAll('.tabs-list-item')];
    this.tabsPane = [...this.select.querySelectorAll('.tabs-pane')];
    this.init();
  }
  
  init() {
    this.tabsItem.map(item => item.addEventListener('click', (event) => {
    
      const tabsPageLink = item.querySelector('a').getAttribute('href');
      const activeTabsPane = document.querySelector(tabsPageLink);
    
      event.preventDefault();
      removeActive(...this.tabsItem, ...this.tabsPane);
      addActive(item, activeTabsPane);
    }))
  }
}

/**
* Product
*/
class Product {
  constructor({ selector = '.product' } = {}) {
    this.product = selector;
    this.init();
  }
  
  incrementProduct = (counter = 0) => {
    return (headerItem, headerItemLabel, productLink, productLinkText, text) => {
      if(productLink.classList.contains('active')) {
        removeActive(productLink);
        productLinkText.innerHTML = text.default;
        counter = headerItemLabel.innerHTML;
        counter--;
        headerItemLabel.innerHTML = counter;
      } else {
        addActive(productLink);
        productLinkText.innerHTML = text.active;
        counter = headerItemLabel.innerHTML;
        counter++;
        headerItemLabel.innerHTML = counter;
      }
    }
  };
  
  init() {
    const headerCart = document.querySelector('.header-info-group-link-cart');
    const headerCartLabel = headerCart.querySelector('.header-info-label');
  
    const headerCompare = document.querySelector('.header-info-group-link-compare');
    let headerCompareLabel = headerCompare.querySelector('.header-info-label');
  
    const headerFavorite = document.querySelector('.header-info-group-link-favorite');
    let headerFavoriteLabel = headerFavorite.querySelector('.header-info-label');
  
    const productBtnCart = this.product.querySelector('.product-btn-cart');
  
    const productLinkCompare = this.product.querySelector('.product-compare-link');
    const productLinkCompareText = productLinkCompare.querySelector('.product-compare-text');
  
    const productLinkFavorite = this.product.querySelector('.product-favorites-link');
    const productLinkFavoriteText = productLinkFavorite.querySelector('.product-favorites-text');
  
    let count = 0;
    productBtnCart.addEventListener('click', (event) => {
      event.preventDefault();
    
      if(productBtnCart.classList.contains('active')) {
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
  
    productLinkCompare.addEventListener('click', (event) => {
      event.preventDefault();
      this.incrementProduct()(
        headerCompare,
        headerCompareLabel,
        productLinkCompare,
        productLinkCompareText,
        {
          default: 'Сравнить товар',
          active: 'В сравнении'
        });
    });
  
    productLinkFavorite.addEventListener('click', (event) => {
      event.preventDefault();
    
      this.incrementProduct()(
        headerFavorite,
        headerFavoriteLabel,
        productLinkFavorite,
        productLinkFavoriteText,
        {
          default: 'В избранное',
          active: 'В избранном'
        });
    });
  }
}

/**
 * Modal
*/
class Modal {
  constructor({ selector = '.modal-link' } = {}) {
    this.modal = selector;
    this.modalLink = this.modal.getAttribute('href');
    this.popupBlacout = document.querySelector(this.modalLink);
    this.popup = this.popupBlacout.querySelector('.popup-modal');
    this.popupClose = this.popupBlacout.querySelector('.popup-close');
    this.body = document.querySelector('body');
    this.init();
  }
  
  init() {
    this.modal.addEventListener('click', (event) => {
      event.preventDefault();
      addActive(this.popupBlacout, this.popup, this.body);
    });
  
    this.popupClose.addEventListener('click', (event) => {
      removeActive(this.popupBlacout, this.popup, this.body)
    })
  }
}
