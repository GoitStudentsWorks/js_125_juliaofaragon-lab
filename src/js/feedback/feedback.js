import Swiper from 'swiper';
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';
import { refs } from '../helpers/refs.js';
import { createFeedbackSlide } from '../helpers/render-functions.js';
import Raty from 'raty-js';

const BASE_URL = 'https://furniture-store-v2.b.goit.study/api/feedbacks?limit=10&page=1';

async function fetchFeedbacks() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error(`Feedback request failed: ${response.status}`);
  return response.json();
}

let feedbackSwiper = null;

function normalizeRating(rate) {
  if (rate >= 3.3 && rate <= 3.7) return 3.5;
  if (rate >= 3.8 && rate <= 4.2) return 4;
  return Math.round(rate * 2) / 2;
}

function renderFeedbackSlides(feedbacks) {
  const swiperWrapper = refs.feedbackSlider?.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;

  swiperWrapper.innerHTML = feedbacks
    .map((feedback) =>
      createFeedbackSlide({
        name: feedback.name,
        descr: feedback.descr,
        rate: normalizeRating(feedback.rate),
      })
    )
    .join('');

  initRatyRatings();
}

function initRatyRatings() {
  document.querySelectorAll('.feedback-card__rating').forEach((element) => {
    const rating = parseFloat(element.dataset.rating) || 0;
    new Raty(element, {
      score: rating,
      readOnly: true,
      hints: null,
      noRatedMsg: '',
      cancelButton: false,
      target: false,
      precision: true,
      space: true,
      single: false,
      number: 5,
      starType: 'i',
    }).init();
  });
}

function initSwiper() {
  if (!refs.feedbackSlider?.querySelector('.swiper-slide')) return null;

  return new Swiper(refs.feedbackSlider, {
    modules: [Navigation, Keyboard, A11y, Pagination],
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    keyboard: { enabled: true },
    navigation: {
      nextEl: refs.feedbackNextButton,
      prevEl: refs.feedbackPrevButton,
    },
    pagination: {
      el: refs.feedbackPagination,
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1440: { slidesPerView: 3 },
    },
  });
}

export async function initFeedback() {
  try {
    const { feedbacks = [] } = await fetchFeedbacks();
    if (!feedbacks.length) {
      console.warn('No feedbacks available');
      return null;
    }

    renderFeedbackSlides(feedbacks.slice(0, 10));
    feedbackSwiper = initSwiper();
    return feedbackSwiper;
  } catch (error) {
    console.error('Error initializing feedback carousel:', error);
    return null;
  }
}
