// Core
import { Api } from 'api';

// Redux
import { store } from 'bus/init/store';
import { authActions } from 'bus/auth/actions';

export const withAuth = async (url, options = {}) => {
    const token = store.getState().auth.get('token');

    if (!token) {
        const refreshResponse = await Api.auth.refreshToken();
        const tokens = await refreshResponse.json();

        store.dispatch(authActions.setAccessToken(tokens));

        return withAuth(url, options);
    }

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
    });
};
