const nav = document.querySelector('.js-nav');
const nav_menu = document.querySelector('.js-nav-menu');
const nav_mobile_btn = document.querySelector('.js-mobile-nav');

const toggleNavMobile = () => {
    nav.classList.toggle('mobile-expanded');
}

if (nav_mobile_btn) {
    nav_mobile_btn.addEventListener('click', toggleNavMobile);
}