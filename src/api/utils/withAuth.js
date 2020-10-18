// Core
// import { MAIN_URL } from 'api';

// Redux
import { store } from 'bus/init/store';
// import { authActions } from 'bus/auth/actions';

export const withAuth = async (url, options = {}) => {
    const token = store.getState().auth.get('accessToken');

    // if (!token) {
    //     const refreshResponse = await fetch(`${MAIN_URL}/auth/refresh`, {
    //         method: 'GET',
    //         headers: {
    //             credentials: 'include',
    //         },
    //     });

    //     const tokens = await refreshResponse.json();

    //     // store.dispatch(authActions.setAccessToken())

    //     return withAuth(url, options);
    // }

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: token,
        },
        credentials: 'include',
    });
};
