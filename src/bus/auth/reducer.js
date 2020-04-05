// Core
import { Map } from 'immutable';

// Types
import { authTypes as types } from './types';

const initialState = Map({
    isAuthenticated: false,
});

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTHENTICATE_USER:
            return state.set('isAuthenticated', true);

        case types.SIGN_OUT:
            return state.set('isAuthenticated', false);

        default:
            return state;
    }
};
