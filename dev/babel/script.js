const plugins = {
  header : document.querySelector('.header-nav-wrapper'),
  select : document.querySelectorAll('.select'),
  tabs : document.querySelectorAll('.tabs'),
  modals : document.querySelectorAll('.modal-link'),
  phone : document.querySelector('#phone'),
  email: document.querySelector('#email'),
  password: document.querySelector('#password'),
  snackbar: document.querySelector('.snackbar'),
  copyrightYear : document.querySelector('.copyright-year')
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
        selector : product
      })
    }
  }
  
  // Modal
  if(plugins.modals) {
    for (let i = 0; i < plugins.modals.length; i++) {
      let modal = plugins.modals[i];
      
      const init = new Modal({
        selector : modal
      })
    }
  }
  
  // Phone
  if(plugins.phone) {
    let dynamicMask = IMask(
      plugins.phone,
      {
        mask : '+{38}(000)000-00-00'
      });
    
    const btn = document.querySelector('#btn-phone');
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      if (dynamicMask.value.length !== 17) {
        plugins.phone.classList.add('has-error')
      } else {
        plugins.phone.classList.remove('has-error');
  
        removeActive(
          ...document.querySelectorAll('.popup-blackuot'),
          ...document.querySelectorAll('.popup-modal'),
          document.querySelector('body')
        );
  
        dynamicMask.value = '';
        plugins.snackbar.innerHTML = 'Мы вам перезвоним';
        plugins.snackbar.classList.add('active');
        setTimeout(() => {
          plugins.snackbar.classList.remove('active');
        }, 2500)
      }
    })
  }
  
  // Email && Password
  if(plugins.email && plugins.password) {
    let dynamicMask = IMask(
      plugins.email,
      {
        mask:function (value) {
          if(/^[a-z0-9_\.-]+$/.test(value))
            return true;
          if(/^[a-z0-9_\.-]+@$/.test(value))
            return true;
          if(/^[a-z0-9_\.-]+@[a-z0-9-]+$/.test(value))
            return true;
          if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.$/.test(value))
            return true;
          if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(value))
            return true;
          if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.$/.test(value))
            return true;
          if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.[a-z]{1,4}$/.test(value))
            return true;
          return false;
        }
      });
    const btn = document.querySelector('#btn-login');
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const value = dynamicMask.value;
      const regular = /\S+@\S+\.\S+/;
      
      if(!regular.test(value)) {
        plugins.email.classList.add('has-error')
      } else {
        plugins.email.classList.remove('has-error');
        plugins.email.classList.add('is-success');
      }
      
      if(plugins.password.value.length < 5) {
        plugins.password.classList.add('has-error');
      } else {
        plugins.password.classList.remove('has-error');
        plugins.password.classList.add('is-success');
      }
      
      if(regular.test(value) && plugins.password.value.length > 4) {
        dynamicMask.value = '';
        plugins.password.value = '';
        plugins.email.classList.remove('is-success');
        plugins.password.classList.remove('is-success');
        plugins.snackbar.innerHTML = 'Вы успешно вошли';
        plugins.snackbar.classList.add('active');
        removeActive(
          ...document.querySelectorAll('.popup-blackuot'),
          ...document.querySelectorAll('.popup-modal'),
          document.querySelector('body')
        );
        setTimeout(() => {
          plugins.snackbar.classList.remove('active');
        }, 2500)
      }
    })
  }
  
  // Footer Email
  const footerEmail = document.querySelector('#footer-email');
  if(footerEmail) {
    let footerMask = IMask(
      footerEmail,
      {
        mask:function (value) {
          if(/^[a-z0-9_\.-]+$/.test(value))
            return true;
          if(/^[a-z0-9_\.-]+@$/.test(value))
            return true;
          if(/^[a-z0-9_\.-]+@[a-z0-9-]+$/.test(value))
            return true;
          if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.$/.test(value))
            return true;
          if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(value))
            return true;
          if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.$/.test(value))
            return true;
          if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.[a-z]{1,4}$/.test(value))
            return true;
          return false;
        }
      });
    
    const btn = document.querySelector('#btn-footer-email');
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const value = footerMask.value;
      const regular = /\S+@\S+\.\S+/;
    
      if(!regular.test(value)) {
        footerEmail.classList.add('has-error')
      } else {
        footerEmail.classList.remove('has-error');
        plugins.snackbar.innerHTML = `Вы ${footerMask.value} успешно подписаны на рассылку`;
        footerMask.value = '';
        plugins.snackbar.classList.add('active');
        setTimeout(() => {
          plugins.snackbar.classList.remove('active');
        }, 2500)
      }
    })
  }
  
  // Search
  const searchInput = document.querySelector('#search-input');
  if(searchInput) {
    const btn = document.querySelector('#btn-search');
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      if (searchInput.value.length < 3) {
        searchInput.classList.add('has-error')
      } else {
        searchInput.classList.remove('has-error');
        plugins.snackbar.innerHTML = `Ишем: ${searchInput.value}`;
        searchInput.value = '';
        plugins.snackbar.classList.add('active');
        setTimeout(() => {
          plugins.snackbar.classList.remove('active');
        }, 2500)
      }
    })
  }
  
  // Copyright Year
  if(plugins.copyrightYear) {
    plugins.copyrightYear.innerHTML = new Date().getFullYear().toString();
  }
};