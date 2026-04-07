import iziToast from 'izitoast';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

function initSlider() {
  const { nextButton, pagination, prevButton, slider } = getElements();

  if (!slider || !nextButton || !prevButton || !pagination) {
    return;
  }

  if (feedbackSwiper) {
    feedbackSwiper.destroy(true, true);
  }

  feedbackSwiper = new Swiper(slider, {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    pagination: {
      clickable: true,
      el: pagination,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 24,
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
}
