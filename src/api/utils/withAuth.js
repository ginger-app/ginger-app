// Core
import { Api } from 'api';

// Redux
import { store } from 'bus/init/store';
import { authActions } from 'bus/auth/auth.actions';

// Instruments
import { DateTime } from 'luxon';

export const withAuth = async (url, options = {}) => {
    const { accessToken } = store.getState().auth;
    const tokenExpirationDate = store.getState().auth.expiresAt;

    if (
        !accessToken ||
        (DateTime.fromISO(tokenExpirationDate).diff(DateTime.local(), 'minute').toObject()
            .minutes || 1) < 1
    ) {
        const refreshResponse = await Api.auth.refreshToken();
        const tokens = await refreshResponse.json();

        if (refreshResponse.status >= 400) throw new Error();

        store.dispatch(
            authActions.setAccessToken({
                ...tokens,
                accessToken: tokens.token,
            }),
        );

        return withAuth(url, options);
    }

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
    });
};
