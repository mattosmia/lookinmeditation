/*----------------------------------------
    initialises main navigation sub nav 
-----------------------------------------*/
// select navigation elements
const nav = document.querySelector('.js-nav');
const nav_menu = document.querySelector('.js-nav-menu');
const nav_menu_subnav = document.querySelectorAll('.js-subnav');
const nav_mobile_btn = document.querySelector('.js-mobile-nav');

// toggle class that expands main menu (burger) on mobile
const toggleNavMobile = () => {
    nav.classList.toggle('mobile-expanded');
}

// toggle class that expands sub menu on mobile and desktop
const toggleSubnav = e => {
    e.preventDefault();
    e.target.parentElement.classList.toggle('expanded');
}

// add event listener to burger menu button
if (nav_mobile_btn) {
    nav_mobile_btn.addEventListener('click', toggleNavMobile);
}

// add event listener to expand sub nav to menu items with sub nav
if (nav_menu_subnav.length) {
    nav_menu_subnav.forEach(navItem => {
        navItem.querySelector('a').addEventListener('click', toggleSubnav);
    })
}

/*-------------------------------------------------
    initialises and handles cookie policy notice 
--------------------------------------------------*/
// select cookie policy element
const cookie_policy = document.querySelector('.js-cookie-policy');
if (cookie_policy) {
    const cookie_name = 'lookin_cookie_acceptance'; // name for cookie policy accepted cookie

    // set the cookie when user clicks the accept button
    const setCookieAccepted = () => {
        const expiry_date = new Date();
        expiry_date.setTime(expiry_date.getTime() + (365 * 24 * 60 * 60 * 1000)); // set expiry date to one year in the future
        document.cookie = cookie_name + "=yes;expires=" + expiry_date.toUTCString() + ";path=/";
        cookie_policy.classList.remove('show');
    }

    // check if user has already accepted it
    const isCookieAccepted = () => {
        const all_cookies = document.cookie.split(';');
        for (let c = 0; c < all_cookies.length; c++) {
            const cookie_kv = all_cookies[c].split('=');
            if (cookie_kv[0].replace(/\s/,'') === cookie_name) return true;
        }
        return false;
    }
    
    // display notice if user hasn't already accepted it
    if (! isCookieAccepted()) {
        const cookie_policy_accept_btn = cookie_policy.querySelector('button');
        if (cookie_policy_accept_btn) {
            cookie_policy_accept_btn.addEventListener('click', setCookieAccepted);
        }
        cookie_policy.classList.add('show');
    }
}
/*---------------------------------
    initialises carousel banners 
----------------------------------*/
// select carousel elements
const carousels = document.querySelectorAll('.js-carousel');

// initialise if any instances
if (carousels.length) {
    const attr_slide_index = 'data-carousel-slide-index';
    const attr_nav_index = 'data-carousel-nav-index';
    carousels.forEach(carousel => {
        const carousel_slides = carousel.querySelectorAll('li');
        // if more than one slide, create navigation
        if (carousel_slides.length > 1) {
            const carousel_nav = document.createElement('ul');
            carousel_nav.classList.add('carousel__nav');
            
            // remove active class from all carousel elements (slide and navigation)
            const removeActiveCarouselElements = () => {
                const all_active_elements = carousel.querySelectorAll('.active');
                all_active_elements.forEach(el => el.classList.remove('active'));
            }

            // add active class to one carousel element (slide and navigation)
            const activeCarouselSlide = (e, idx) => {
                const new_selected_slide = carousel.querySelector(`[${attr_slide_index}='${idx}']`);
                const new_selected_bullet = carousel.querySelector(`[${attr_nav_index}='${idx}']`);
                if (new_selected_slide && new_selected_bullet) {
                    removeActiveCarouselElements();
                    new_selected_slide.classList.add('active');
                    new_selected_bullet.classList.add('active');
                }
            };

            // initialise slides and link respective nav bullets
            carousel_slides.forEach((carousel_slide, idx) => {
                const carousel_nav_bullet = document.createElement('li');
                carousel_slide.setAttribute(attr_slide_index,idx);
                carousel_nav_bullet.setAttribute(attr_nav_index,idx);
                carousel_nav_bullet.addEventListener('click', e => activeCarouselSlide.bind(null,e,idx)());
                carousel_nav.appendChild(carousel_nav_bullet)
            });

            // append bullet to navigation
            carousel.appendChild(carousel_nav);

            // if no slides activated, initialise first slide
            if (! carousel.querySelectorAll('.active').length) {
                activeCarouselSlide(null,0);
            }
        }
    })
}