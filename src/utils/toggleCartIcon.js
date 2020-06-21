let elementRef = null;
let showCartIcon = null;
let hideCartIcon = null;

let scrollTop = 0;
let cartIconVisible = true;

const handleCartIconToggling = () => {
    const timeToShowCart = scrollTop > elementRef.current.scrollTop;

    if (timeToShowCart && !cartIconVisible) {
        showCartIcon();
        cartIconVisible = true;
    }

    if (!timeToShowCart && cartIconVisible) {
        hideCartIcon();
        cartIconVisible = false;
    }

    scrollTop = elementRef.current.scrollTop;
};

export const addToggleCartIconListener = (ref, show, hide) => {
    elementRef = ref;
    showCartIcon = show;
    hideCartIcon = hide;

    elementRef.current.addEventListener('scroll', handleCartIconToggling);
};

export const removeToggleCartIconListener = () => {
    elementRef.current.removeEventListener('scroll', handleCartIconToggling);
};
