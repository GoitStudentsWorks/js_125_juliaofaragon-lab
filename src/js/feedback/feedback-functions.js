import ratingSprite from 'css-star-rating/images/star-rating.icons.svg';

export function normalizeRating(rate) {
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

function getRatingClasses(rate) {
  const wholeValue = Math.floor(rate);
  const hasHalf = rate % 1 !== 0;

  return hasHalf ? `value-${wholeValue} half` : `value-${wholeValue}`;
}

function createStarMarkup() {
  return `
    <div class="star">
      <svg class="star-empty" viewBox="0 0 34 32" aria-hidden="true">
        <use href="${ratingSprite}#star-empty"></use>
      </svg>
      <svg class="star-half" viewBox="0 0 34 32" aria-hidden="true">
        <use href="${ratingSprite}#star-half"></use>
      </svg>
      <svg class="star-filled" viewBox="0 0 34 32" aria-hidden="true">
        <use href="${ratingSprite}#star-filled"></use>
      </svg>
    </div>
  `;
}

function renderRating(rate) {
  const normalizedRate = normalizeRating(rate);

  return `
    <div
      class="feedback__rating rating ${getRatingClasses(normalizedRate)} star-svg label-hidden direction-ltr immediately"
      role="img"
      aria-label="Оцінка ${normalizedRate} з 5"
    >
      <div class="label-value">${normalizedRate}</div>
      <div class="star-container">
        ${Array.from({ length: 5 }, createStarMarkup).join('')}
      </div>
    </div>
  `;
}

export function createFeedbackMarkup(feedbacks) {
  return feedbacks
    .map(
      (feedback) => `
        <li class="feedback__item swiper-slide">
          ${renderRating(feedback.rate)}
          <p class="feedback__text">${feedback.descr}</p>
          <p class="feedback__name">${feedback.name}</p>
        </li>
      `
    )
    .join('');
}
