// Types
import { authTypes as types } from './types';

export const authActions = {
    // Sync
    authenticate: () => ({ type: types.AUTHENTICATE_USER }),

    openCodeConfirmation: () => ({ type: types.OPEN_CODE_CONFIRMATION }),

    closeCodeConfirmation: () => ({ type: types.CLOSE_CODE_CONFIRMATION }),

    logout: () => ({ type: types.LOG_OUT }),

    setAuthData: (data) => ({
        type: types.SET_AUTH_DATA,
        payload: data,
    }),

    setAccessToken: ({ token: accessToken, expiresAt }) => ({
        type: types.SET_ACCESS_TOKEN,
        payload: { accessToken, expiresAt },
    }),

    clearAccessToken: () => ({
        type: types.CLEAR_ACCESS_TOKEN,
    }),

    // Async
    logoutAsync: () => ({
        type: types.LOG_OUT_ASYNC,
    }),

    getSigninConfirmationCodeAsync: (phoneNumber) => ({
        type: types.GET_SIGNIN_CONFIRMATION_CODE_ASYNC,
        payload: phoneNumber,
    }),

    signinAsync: ({ phoneNumber, code }) => ({
        type: types.SIGNIN_ASYNC,
        payload: { phoneNumber, code },
    }),

    getSignupConfirmationCodeAsync: (phoneNumber) => ({
        type: types.GET_SIGNUP_CONFIRMATION_CODE_ASYNC,
        payload: phoneNumber,
    }),

    sendSignupDataAsync: ({ phoneNumber, code, userData }) => ({
        type: types.SEND_SIGNUP_DATA_ASYNC,
        payload: { phoneNumber, code, userData },
    }),
};
