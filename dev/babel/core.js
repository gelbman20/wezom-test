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
      if (!isClickInside && nav.classList.contains('open')) {
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
    this.selector = selector;
    this.init();
  }
  
  removeActive = (...elements) => {
    elements.map(element => element.classList.remove('active'))
  };
  
  addActive = (...elements) => {
    elements.map(element => element.classList.add('active'))
  };
  
  createElWithClass = (tag, className) => {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
  };
  
  init() {
    const selects = [...document.querySelectorAll(this.selector)];
    
    for (let i = 0; i < selects.length; i++) {
      const select = selects[i];
      const selectOptions = [...select.children];
      const selectWrapper = this.createElWithClass('div', 'select');
      const selectInput = this.createElWithClass('div', 'select-input');
      const selectList = this.createElWithClass('ul', 'select-options');
      
      select.classList.add('select-hidden');
      
      // Build HTML Structure
      select.parentNode.insertBefore(selectWrapper, select);
      selectWrapper.appendChild(select);
      
      select.parentNode.insertBefore(selectInput, select);
      
      // Get text of first option
      selectInput.innerHTML = selectOptions[0].innerHTML;
      
      // Fill selectList
      selectOptions.map((option, index) => {
        if (index > 0) {
          const li = document.createElement('li');
          const text = option.innerHTML;
          const ref = option.value;
          
          li.innerHTML = text;
          li.setAttribute('ref', ref);
          selectList.appendChild(li);
        }
      });
      selectWrapper.appendChild(selectList);
      
      // List item event
      const itemList = [...selectList.children];
      itemList.map(item => {
        item.addEventListener('click', () => {
          this.removeActive(selectInput, selectList, ...itemList);
          this.addActive(item);
          
          selectInput.innerHTML = item.innerHTML;
        })
      });
      
      selectInput.addEventListener('click', (event) => {
        if (selectInput.classList.contains('active')) {
          this.removeActive(selectInput, selectList);
        } else {
          this.addActive(selectInput, selectList);
        }
      });
      
      document.addEventListener('click', (event) => {
        const isClickInside = selectWrapper.contains(event.target);
        if (!isClickInside) {
          this.removeActive(selectInput, selectList);
        }
      });
    }
  }
}