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
    this.init();
  }
  
  init() {
    const navWrapper = document.querySelector('.header-nav-wrapper');
    const nav = document.querySelector('.header-nav');
    const navToggle = document.querySelector('.header-nav-toggle');
    
    if(navToggle) {
      navToggle.addEventListener('click', (event) => {
        if(nav.classList.contains('open')) {
          navToggle.classList.remove('open');
          nav.classList.remove('open');
        } else {
          navToggle.classList.add('open');
          nav.classList.add('open');
        }
        event.preventDefault();
      })
    }
    
    document.addEventListener('click', (event) => {
      const isClickInside = navWrapper.contains(event.target);
      if(!isClickInside&&nav.classList.contains('open')) {
        navToggle.classList.remove('open');
        nav.classList.remove('open');
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