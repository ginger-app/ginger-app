// Core
import axios, { AxiosRequestConfig } from 'axios';

// Redux
import { store } from 'bus/init/store';
import { authActions } from 'bus/auth/auth.actions';
import { history } from 'bus/init/middleware/core';
import { uiActions } from 'bus/ui/ui.actions';

// Instruments
import { DateTime } from 'luxon';

export const MAIN_URL = process.env.REACT_APP_MAIN_URL;

export const api = axios.create({
    baseURL: MAIN_URL,
    headers: {
        'content-type': 'application/json',
    },
    withCredentials: true,
});

const reqHandler = async (config: AxiosRequestConfig) => {
    const { accessToken } = store.getState().auth;
    const tokenExpirationDate = store.getState().auth.expiresAt || new Date().toISOString();

    if (
        config.url !== '/auth/refresh' &&
        (!accessToken ||
            (DateTime.fromISO(tokenExpirationDate).diff(DateTime.local(), 'minute').toObject()
                .minutes || 1) < 1)
    ) {
        const { data } = await api.get('/auth/refresh');

        store.dispatch(
            authActions.setAccessToken({
                ...data,
                accessToken: data.token,
            }),
        );
    }

    return {
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${store.getState().auth.accessToken}`,
        },
    };
};

const errHandler = async (err: any) => {
    const originalReq = err.config;

    // Prevent infinite loops
    if (err.response.status === 401 && originalReq.url === '/auth/refresh') {
        history.push('/');
        store.dispatch(uiActions.showLoginOverlay());
        return Promise.reject(err.response.data);
    }

    if (err.response.status === 401) {
        const { data } = await api.get('/auth/refresh');

        store.dispatch(
            authActions.setAccessToken({
                ...data,
                accessToken: data.token,
            }),
        );

        return api(originalReq);
    }

    return Promise.reject(err.response.data);
};

api.interceptors.request.use(reqHandler, errHandler);
