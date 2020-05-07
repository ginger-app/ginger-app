// Core
import { Map } from 'immutable';

// Types
import { authTypes as types } from './types';

const initialState = Map({
    isAuthenticated: false,
    codeConfirmation: false,
    gmapsKey: '',
    authData: {},
});

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTHENTICATE_USER:
            return state.set('isAuthenticated', true);

        case types.OPEN_CODE_CONFIRMATION:
            return state.set('codeConfirmation', true);

        case types.CLOSE_CODE_CONFIRMATION:
            return state.set('codeConfirmation', false);

        case types.SIGN_OUT:
            sessionStorage.clear();
            return state.set('isAuthenticated', false);

        case types.SET_AUTH_DATA:
            return state.set('authData', action.payload);

        case types.FILL_GOOGLE_MAPS_KEY:
            return state.set('gmapsKey', action.payload.key);

        default:
            return state;
    }
};
