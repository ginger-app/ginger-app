// Config
import { MAIN_URL } from './config';

// Instruments
// import queryString from 'query-string';

export const Api = {
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
    },
};
