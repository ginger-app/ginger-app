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

        refreshToken: () => {
            return fetch(`${MAIN_URL}/auth/refresh`, {
                method: 'GET',
                credentials: 'include',
            });
        },

        logout: () => {
            return withAuth(`${MAIN_URL}/auth/logout`);
        },
    },

    market: {
        getAllCategories: () => {
            return fetch(`${MAIN_URL}/market/categories`);
        },

        getCategoryData: (id) => {
            return fetch(`${MAIN_URL}/market/categories/${id}`);
        },

        getSubcategoryData: (id) => {
            return fetch(`${MAIN_URL}/market/subcategories/${id}`);
        },

        getProductData: (id) => {
            return fetch(`${MAIN_URL}/market/product/${id}`);
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
        getClientLocations: () => {
            return withAuth(`${MAIN_URL}/clients/locations`);
        },

        createNewLocation: (locationData) => {
            return withAuth(`${MAIN_URL}/clients/locations`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(locationData),
            });
        },

        addNewItemToLocation: ({ locationId, itemId, supplierId }) => {
            return withAuth(`${MAIN_URL}/clients/locations/new-item`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ locationId, itemId, supplierId }),
            });
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
