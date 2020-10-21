// Config
import { MAIN_URL } from './config';
import { withAuth } from './utils';

// Instruments
// import queryString from 'query-string';

export const Api = {
    app: {},

    auth: {
        getSigninCode: (phoneNumber) => {
            return fetch(`${MAIN_URL}/auth/get-signin-code`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber }),
                credentials: 'include',
            });
        },

        signin: ({ phoneNumber, code }) => {
            return fetch(`${MAIN_URL}/auth/signin`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, code }),
                credentials: 'include',
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

        signup: (data) => {
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
            return withAuth(`${MAIN_URL}/market/orders`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
        },

        getOrderData: (id) => {
            return withAuth(`${MAIN_URL}/market/orders/${id}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                },
            });
        },

        searchProductsByName: (itemName) => {
            return fetch(`${MAIN_URL}/market/product?name=${itemName}`);
        },
    },

    users: {
        getCurrentUserData: () => {
            return withAuth(`${MAIN_URL}/users/current`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                },
            });
        },
    },

    client: {
        getClientLists: () => {
            return withAuth(`${MAIN_URL}/clients/lists`);
        },
    },

    supplier: {
        uploadExcelSheet: (file) => {
            const formData = new FormData();
            formData.append('file', file);

            return withAuth(`${MAIN_URL}/suppliers/items-preview`, {
                method: 'POST',
                body: formData,
            });
        },

        updateSupplierItems: (items) => {
            return withAuth(`${MAIN_URL}/suppliers/items`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ items }),
            });
        },

        addnewSupplierItem: (item) => {
            return withAuth(`${MAIN_URL}/suppliers/items/new`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ item }),
            });
        },
    },
};
