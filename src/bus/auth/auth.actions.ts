// Types
import { AccessToken, AuthData, SigninData, SignupData } from 'domains/auth/types';
import { AuthActionsType, authTypes as types } from './auth.types';

export const authActions = {
    // Sync
    authenticate: (): AuthActionsType => ({ type: types.AUTHENTICATE_USER }),

    openCodeConfirmation: (): AuthActionsType => ({ type: types.OPEN_CODE_CONFIRMATION }),

    closeCodeConfirmation: (): AuthActionsType => ({ type: types.CLOSE_CODE_CONFIRMATION }),

    logout: (): AuthActionsType => ({ type: types.LOG_OUT }),

    setAuthData: (data: AuthData): AuthActionsType => ({
        type: types.SET_AUTH_DATA,
        payload: data,
    }),

    setAccessToken: (tokenData: AccessToken): AuthActionsType => ({
        type: types.SET_ACCESS_TOKEN,
        payload: tokenData,
    }),

    clearAccessToken: (): AuthActionsType => ({
        type: types.CLEAR_ACCESS_TOKEN,
    }),

    // Async
    logoutAsync: (): AuthActionsType => ({
        type: types.LOG_OUT_ASYNC,
    }),

    getSigninConfirmationCodeAsync: (phoneNumber: number): AuthActionsType => ({
        type: types.GET_SIGNIN_CONFIRMATION_CODE_ASYNC,
        payload: phoneNumber,
    }),

    signinAsync: ({ phoneNumber, code }: SigninData): AuthActionsType => ({
        type: types.SIGNIN_ASYNC,
        payload: { phoneNumber, code },
    }),

    getSignupConfirmationCodeAsync: (phoneNumber: number): AuthActionsType => ({
        type: types.GET_SIGNUP_CONFIRMATION_CODE_ASYNC,
        payload: phoneNumber,
    }),

    sendSignupDataAsync: ({ phoneNumber, code, userData }: SignupData): AuthActionsType => ({
        type: types.SEND_SIGNUP_DATA_ASYNC,
        payload: { phoneNumber, code, userData },
    }),
};
