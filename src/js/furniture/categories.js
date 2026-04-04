<<<<<<< HEAD
import { getCategories } from '../api/furniture-api';
import { refs } from '../helpers/refs';

export function initCategories() {
  document.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('[data-category-button]');

    if (!clickedButton) {
      return;
    }

    const categoryButtons = document.querySelectorAll('[data-category-button]');

    categoryButtons.forEach((button) => {
      button.classList.remove('is-active');
    });

    clickedButton.classList.add('is-active');
  });
}
console.log(getCategories());
function renderCategories(array) {
  const markup = array
    .map((category) => {
      return `<button type="button" class="category-btn" data-category-button data-categoryId="${category.id}>${category.name}</button>`;
    })
    .join('');
  refs.categoriesList.innerHTML = markup;
}
=======
>>>>>>> 99f7c7a18f0cd9c72f7fde63df797968b0e438b8
