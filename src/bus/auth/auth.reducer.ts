// Core
import { AnyAction } from 'redux';

// Types
import { authTypes as types } from './types';

const initialState = Object.freeze({
    isAuthenticated: false,
    codeConfirmation: false,
    accessToken: null,
    expiresAt: null,
    authData: {} as Record<string, any>,
});

export type AuthState = typeof initialState;

export const authReducer = (state = initialState, action: AnyAction): AuthState => {
    switch (action.type) {
        case types.AUTHENTICATE_USER:
            return Object.freeze({
                ...state,
                isAuthenticated: true,
            });

        case types.OPEN_CODE_CONFIRMATION:
            return Object.freeze({
                ...state,
                codeConfirmation: true,
            });

        case types.CLOSE_CODE_CONFIRMATION:
            return Object.freeze({ ...state, codeConfirmation: false });

        case types.LOG_OUT:
            return Object.freeze({
                ...state,
                isAuthenticated: false,
                accessToken: null,
                expiresAt: null,
            });

        case types.SET_AUTH_DATA:
            return Object.freeze({ ...state, authData: action.payload });

        case types.SET_ACCESS_TOKEN:
            return Object.freeze({ ...state, accessToken: action.payload });

        case types.CLEAR_ACCESS_TOKEN:
            return Object.freeze({ ...state, accessToken: null });

        default:
            return state;
    }
};
