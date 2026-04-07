import iziToast from 'izitoast';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'css-star-rating/css/star-rating.css';
import 'swiper/css';
import 'swiper/css/navigation';

import { getFeedbacks } from '../api/feedback-api.js';
import { createFeedbackMarkup } from './feedback-functions.js';

let feedbackSwiper = null;

function getElements() {
  return {
    list: document.querySelector('.js-feedback-list'),
    loader: document.querySelector('.js-feedback-loader'),
    nextButton: document.querySelector('.js-feedback-next'),
    pagination: document.querySelector('.js-feedback-pagination'),
    prevButton: document.querySelector('.js-feedback-prev'),
    section: document.querySelector('.feedback'),
    slider: document.querySelector('.js-feedback-swiper'),
    state: document.querySelector('.js-feedback-state'),
  };
}

function showLoader() {
  const { loader } = getElements();
  loader?.classList.remove('visually-hidden');
}

function hideLoader() {
  const { loader } = getElements();
  loader?.classList.add('visually-hidden');
}

function renderState(message = '') {
  const { state } = getElements();

  if (!state) {
    return;
  }

  if (!message) {
    state.textContent = '';
    state.classList.add('visually-hidden');
    return;
  }

  state.textContent = message;
  state.classList.remove('visually-hidden');
}

function renderPagination(totalItems) {
  const { pagination } = getElements();

  if (!pagination) {
    return;
  }

  pagination.innerHTML = Array.from(
    { length: totalItems },
    (_, index) => `
      <li class="feedback__pagination-item">
        <button
          class="feedback__pagination-button"
          type="button"
          data-feedback-pagination="${index}"
          aria-label="Перейти до відгуку ${index + 1}"
        ></button>
      </li>
    `
  ).join('');
}

function syncPagination(activeIndex = 0) {
  const { pagination } = getElements();

  if (!pagination) {
    return;
  }

  pagination.querySelectorAll('[data-feedback-pagination]').forEach((button, index) => {
    const isActive = index === activeIndex;

    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

function initSlider() {
  const { nextButton, pagination, prevButton, slider } = getElements();

  if (!slider || !nextButton || !prevButton || !pagination) {
    return;
  }

  if (feedbackSwiper) {
    feedbackSwiper.destroy(true, true);
  }

  feedbackSwiper = new Swiper(slider, {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    on: {
      init(swiper) {
        syncPagination(swiper.activeIndex);
      },
      slideChange(swiper) {
        syncPagination(swiper.activeIndex);
      },
    },
  });
}

export async function initFeedback() {
  const { list, section } = getElements();

  if (!section || !list) {
    return;
  }

  showLoader();
  renderState();

  try {
    const feedbacks = await getFeedbacks();

    list.innerHTML = createFeedbackMarkup(feedbacks);
    renderPagination(feedbacks.length);
    initSlider();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Не вдалося завантажити відгуки.';

    renderState(message);
    iziToast.error({
      message,
      position: 'bottomRight',
    });
  } finally {
    hideLoader();
  }

  const { pagination } = getElements();

  if (pagination && !pagination.dataset.listenerAttached) {
    pagination.addEventListener('click', (event) => {
      const button = event.target.closest('[data-feedback-pagination]');

      if (!button || !feedbackSwiper) {
        return;
      }

      feedbackSwiper.slideTo(Number(button.dataset.feedbackPagination));
    });

    pagination.dataset.listenerAttached = 'true';
  }
}
