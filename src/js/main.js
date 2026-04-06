import '../css/styles.css';
import { initAbout } from './about/about.js';
import { initSmoothScroll } from './helpers/smooth-scroll.js';

function initApp() {
  initSmoothScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

const aboutElement = document.querySelector('.js-about'); 

if (aboutElement) {
  aboutElement.insertAdjacentHTML('beforeend', initAbout());
  
}
