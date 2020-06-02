// Config
import { MAIN_URL } from './config';

// Instruments
// import queryString from 'query-string';

export const Api = {
    app: {
        getGoogleMapsKey: () => {
            return fetch(`${MAIN_URL}/app/g-maps`);
        },
    },

    auth: {
        getAuthenticationCode: (phoneNumber) => {
            return fetch(`${MAIN_URL}/auth/signin`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber }),
            });
        },

        confirmAuthenticationCode: ({ phoneNumber, code }) => {
            return fetch(`${MAIN_URL}/auth/signin-confirmation`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, code }),
            });
        },

        getSignupCode: (phoneNumber) => {
            return fetch(`${MAIN_URL}/auth/get-signup-code`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber }),
            });
        },

        confirmSignupCode: (data) => {
            return fetch(`${MAIN_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        },
    },

    market: {
        getAllCategories: () => {
            return fetch(`${MAIN_URL}/market/categories`);
        },

        getCategoryData: (sku) => {
            return fetch(`${MAIN_URL}/market/categories/${sku}`);
        },

        getSubcategoryData: (sku) => {
            return fetch(`${MAIN_URL}/market/subcategories/${sku}`);
        },

        getProductData: (sku) => {
            return fetch(`${MAIN_URL}/market/product/${sku}`);
        },

        createNewOrder: (orderData) => {
            return fetch(`${MAIN_URL}/market/orders`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: localStorage.getItem('ginger-token'),
                },
                body: JSON.stringify(orderData),
            });
        },

        getOrderData: (id) => {
            return fetch(`${MAIN_URL}/market/orders/${id}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    Authorization: localStorage.getItem('ginger-token'),
                },
            });
        },

        searchProductsByName: (itemName) => {
            return fetch(`${MAIN_URL}/market/product?name=${itemName}`);
        },
    },

    profile: {
        getCurrentUserData: () => {
            return fetch(`${MAIN_URL}/profile/current`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    Authorization: localStorage.getItem('ginger-token'),
                },
            });
        },

        addItemToFavorites: (sku) => {
            return fetch(`${MAIN_URL}/profile/favorites`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: localStorage.getItem('ginger-token'),
                },
                body: JSON.stringify({ sku }),
            });
        },

        removeItemFromFavorites: (sku) => {
            return fetch(`${MAIN_URL}/profile/favorites/remove`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: localStorage.getItem('ginger-token'),
                },
                body: JSON.stringify({ sku }),
            });
        },
    },
};
