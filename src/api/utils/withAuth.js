// Core
import { Api } from 'api';

// Redux
import { store } from 'bus/init/store';
import { authActions } from 'bus/auth/actions';

// Instruments
import { DateTime } from 'luxon';

export const withAuth = async (url, options = {}) => {
    const token = store.getState().auth.get('token');
    const tokenExpirationDate = store.getState().auth.get('expiresAt');

    if (!token || DateTime.local() > DateTime.fromISO(tokenExpirationDate)) {
        const refreshResponse = await Api.auth.refreshToken();
        const tokens = await refreshResponse.json();

        if (refreshResponse.status >= 400) throw new Error();

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
