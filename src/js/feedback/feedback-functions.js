const buttonPrev = document.querySelector('.feedback-prev');
const buttonNext = document.querySelector('.feedback-next');
const feedbackList  = document.querySelector('.feedback-list')

function renderStars(rate) {
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 !== 0;
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<svg class="star-icon" width="20" height="20"><use href="../img/feedbacks/fullstar.svg#star"></use></svg>';
    }

    if (hasHalfStar) {
        starsHTML += '<svg class="star-icon" width="20" height="20"><use href="../img/feedbacks/halfstar.svg#star"></use></svg>';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        starsHTML += '<svg class="star-icon empty" width="20" height="20"><use href="../img/feedbacks/fullstar.svg#star"></use></svg>';
    }
    
    return starsHTML;
}

export function createFeedbackList(feedbacks) {
    const markup = feedbacks.map(feedback => 
        `
        <li class="swiper-slide">
            <div class="feedback-stars">${renderStars(feedback.rate)}</div>
            <p class="feedback-descr">"${feedback.descr}"</p>
            <p class="feedback-name">${feedback.name}</p>
        </li>
        `
    );
    feedbackList.insertAdjacentHTML('beforeend', markup.join(''));
}