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
function renderRating(rate) {
  const normalizedRate = normalizeRating(rate);

  return `
    <div
      class="feedback__rating js-feedback-rating"
      data-feedback-rate="${normalizedRate}"
      role="img"
      aria-label="Оцінка ${normalizedRate} з 5"
    ></div>
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
