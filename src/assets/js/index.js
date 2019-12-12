const nav = document.querySelector('.js-nav');
const nav_menu = document.querySelector('.js-nav-menu');
const nav_menu_subnav = document.querySelectorAll('.js-subnav');
const nav_mobile_btn = document.querySelector('.js-mobile-nav');

const toggleNavMobile = () => {
    nav.classList.toggle('mobile-expanded');
}

const toggleSubnav = e => {
    e.preventDefault();
    e.target.parentElement.classList.toggle('expanded');
}

if (nav_mobile_btn) {
    nav_mobile_btn.addEventListener('click', toggleNavMobile);
}

if (nav_menu_subnav.length) {
    nav_menu_subnav.forEach(navItem => {
        navItem.querySelector('a').addEventListener('click', toggleSubnav);
    })
}