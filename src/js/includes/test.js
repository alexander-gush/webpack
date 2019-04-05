import Swiper from 'swiper';

export default function () {

    const container = document.querySelector('.swiper-container');
    console.log(container);
    const mySwiper = new Swiper(container, {});
    const test = () => console.log(1);
    test();
}
