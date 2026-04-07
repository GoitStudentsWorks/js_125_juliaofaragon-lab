import fullStarIcon from '../../img/feedbacks/fullstar.svg';
import halfStarIcon from '../../img/feedbacks/halfstar.svg';

function normalizeRating(rate) {
  const value = Number(rate);

  if (!Number.isFinite(value)) {
    return 0;
  }

  if (value >= 3.3 && value <= 3.7) {
    return 3.5;
  }

  if (value >= 3.8 && value <= 4.2) {
    return 4;
  }

  return Math.round(value * 2) / 2;
}

function renderStars(rate) {
  const normalizedRate = normalizeRating(rate);
  const fullStars = Math.floor(normalizedRate);
  const hasHalfStar = normalizedRate % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const fullMarkup = Array.from(
    { length: fullStars },
    () =>
      `<li class="feedback__star-item"><img class="feedback__star-icon" src="${fullStarIcon}" alt="" width="20" height="20" /></li>`
  ).join('');

  const halfMarkup = hasHalfStar
    ? `<li class="feedback__star-item"><img class="feedback__star-icon" src="${halfStarIcon}" alt="" width="20" height="20" /></li>`
    : '';

  const emptyMarkup = Array.from(
    { length: emptyStars },
    () =>
      `<li class="feedback__star-item feedback__star-item--empty"><img class="feedback__star-icon" src="${fullStarIcon}" alt="" width="20" height="20" /></li>`
  ).join('');

  return `${fullMarkup}${halfMarkup}${emptyMarkup}`;
}

export function createFeedbackMarkup(feedbacks) {
  return feedbacks
    .map(
      (feedback) => `
        <li class="feedback__item swiper-slide">
          <ul class="feedback__stars" aria-label="Оцінка ${normalizeRating(feedback.rate)} з 5">
            ${renderStars(feedback.rate)}
          </ul>
          <p class="feedback__text">${feedback.descr}</p>
          <p class="feedback__name">${feedback.name}</p>
        </li>
      `
    )
    .join('');
}
