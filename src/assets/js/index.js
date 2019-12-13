/* main navigation */
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

/* cookie policy */
const cookie_policy = document.querySelector('.js-cookie-policy');

if (cookie_policy) {
    const cookie_name = 'lookin_cookie_acceptance';

    const set_cookie_accepted = () => {
        const expiry_date = new Date();
        expiry_date.setTime(expiry_date.getTime() + (365 * 24 * 60 * 60 * 1000)); /* set expiry date to one year in the future */
        document.cookie = cookie_name + "=yes;expires=" + expiry_date.toUTCString() + ";path=/";
        cookie_policy.classList.remove('show');
    }

    const is_cookie_accepted = () => {
        const all_cookies = document.cookie.split(';');
        for (let c = 0; c < all_cookies.length; c++) {
            const cookie_kv = all_cookies[c].split('=');
            if (cookie_kv[0].replace(/\s/,'') === cookie_name) return true;
        }
        return false;
    }

    if (! is_cookie_accepted()) {
        const cookie_policy_accept_btn = cookie_policy.querySelector('button');
        if (cookie_policy_accept_btn) {
            cookie_policy_accept_btn.addEventListener('click', set_cookie_accepted);
        }
        cookie_policy.classList.add('show');
    }
}

/* initialised and handles carousels */
const carousels = document.querySelectorAll('.js-carousel');

if (carousels.length) {
    carousels.forEach(carousel => {
        const carouselItems = carousel.querySelectorAll('li');
        if (carouselItems.length > 1) {
            const carouselNav = document.createElement('ul');
            carouselNav.classList.add('carousel__nav');
            
            const removeActiveCarouselItem = () => {
                const allActiveItems = carousel.querySelectorAll('.active');
                allActiveItems.forEach(item => item.classList.remove('active'));
            }

            const changeCarouselItem = (e, idx) => {
                const newSelected = carousel.querySelector(`[data-carousel-item-index='${idx}']`);
                const newSelectedNav = carousel.querySelector(`[data-carousel-nav-index='${idx}']`);
                if (newSelected) {
                    removeActiveCarouselItem();
                    newSelected.classList.add('active');
                    newSelectedNav.classList.add('active');
                }
            };
            carouselItems.forEach((carouselItem, idx) => {
                const carouselNavItem = document.createElement('li');
                carouselNavItem.setAttribute('data-carousel-nav-index',idx);
                carouselItem.setAttribute('data-carousel-item-index',idx);
                carouselNavItem.addEventListener('click', e => changeCarouselItem.bind(null,e,idx)());
                carouselNav.appendChild(carouselNavItem)
            });
            carousel.appendChild(carouselNav);
            if (! carousel.querySelectorAll('.active').length) {
                changeCarouselItem(null,0);
            }
        }
    })
}