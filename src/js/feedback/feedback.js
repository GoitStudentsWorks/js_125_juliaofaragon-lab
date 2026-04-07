import { getFeedbacks } from "../api/feedback-api";
import { createFeedbackList } from "./feedback-functions";
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

Swiper.use([Navigation, Pagination]);

document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault;
    const feedbacks = await getFeedbacks();
    createFeedbackList(feedbacks);
    
    const swiper = new Swiper('.mySwiper', {
        modules: [Navigation, Pagination],
        slidesPerView: 3,
        spaceBetween: 24,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
        },
    });
})
console.log(getFeedbacks());