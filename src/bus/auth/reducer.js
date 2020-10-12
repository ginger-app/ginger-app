// Core
import { fromJS, Map } from 'immutable';

// Types
import { authTypes as types } from './types';

const initialState = Map({
    isAuthenticated: false,
    codeConfirmation: false,
    accessToken: null,
    expiresAt: null,
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
            return state.set('isAuthenticated', false);

        case types.SET_AUTH_DATA:
            return state.set('authData', action.payload);

        case types.SET_ACCESS_TOKEN:
            return state.merge(fromJS(action.payload));

        case types.CLEAR_ACCESS_TOKEN:
            return state.set('accessToken', initialState.get('accessToken'));

        default:
            return state;
    }
};
