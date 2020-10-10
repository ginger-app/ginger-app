// Types
import { authTypes as types } from './types';

export const authActions = {
    // Sync
    authenticate: () => ({ type: types.AUTHENTICATE_USER }),

    openCodeConfirmation: () => ({ type: types.OPEN_CODE_CONFIRMATION }),

    closeCodeConfirmation: () => ({ type: types.CLOSE_CODE_CONFIRMATION }),

    logout: () => ({ type: types.SIGN_OUT }),

    setAuthData: (data) => ({
        type: types.SET_AUTH_DATA,
        payload: data,
    }),

    fillGoogleMapsKey: (key) => ({
        type: types.FILL_GOOGLE_MAPS_KEY,
        payload: { key },
    }),

    setAccessToken: (accessToken) => ({
        type: types.SET_ACCESS_TOKEN,
        payload: { ...accessToken },
    }),

    clearAccessToken: () => ({
        type: types.CLEAR_ACCESS_TOKEN,
    }),

    // Async
    logoutAsync: () => ({
        type: types.SIGN_OUT_ASYNC,
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

    getGoogleMapsKeyAsync: () => ({
        type: types.GET_GOOGLE_MAPS_KEY_ASYNC,
    }),
};
