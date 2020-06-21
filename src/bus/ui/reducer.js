// Core
import { Map } from 'immutable';

// Types
import { types } from './types';

const initialState = Map({
    isFetching: false,
    cartIsOpened: false,
    searchOpened: false,
    filtersOpened: false,
    codeConfirmationOverlay: false,
    signupOverlay: false,
    loginOverlay: false,
    backButtonPath: null,
    cartIconVisible: true,
    logs: '',
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        // Spinner
        case types.START_FETCHING:
            return state.set('isFetching', true);

        case types.STOP_FETCHING:
            return state.set('isFetching', false);

        // Market
        case types.SHOW_CART:
            return state.set('cartIsOpened', true);

        case types.SHOW_FILTERS:
            return state.set('filtersOpened', true);

        case types.SHOW_CART_ICON:
            return state.set('cartIconVisible', true);

        case types.HIDE_CART:
            return state.set('cartIsOpened', false);

        case types.HIDE_FILTERS:
            return state.set('filtersOpened', false);

        case types.HIDE_CART_ICON:
            return state.set('cartIconVisible', false);

        // Routing
        case types.SET_BACK_BUTTON_PATH:
            return state.set('backButtonPath', action.payload.path);

        // Overlays
        case types.SHOW_LOGIN_OVERLAY:
            return state.merge({
                loginOverlay: true,
                backButtonPath: action.payload.backButtonPath || null,
            });

        case types.HIDE_LOGIN_OVERLAY:
            return state.merge({
                loginOverlay: false,
                backButtonPath: null,
            });

        case types.SHOW_SIGNUP_OVERLAY:
            return state.set('signupOverlay', true);

        case types.HIDE_SIGNUP_OVERLAY:
            return state.set('signupOverlay', false);

        case types.SHOW_CODE_OVERLAY:
            return state.set('codeConfirmationOverlay', true);

        case types.HIDE_CODE_OVERLAY:
            return state.set('codeConfirmationOverlay', false);

        case types.SHOW_SEARCH_OVERLAY:
            return state.set('searchOpened', true);

        case types.HIDE_SEARCH_OVERLAY:
            return state.set('searchOpened', false);

        case types.HIDE_ALL_OVERLAYS:
            return state.merge({
                codeConfirmationOverlay: false,
                loginOverlay: false,
                signupOverlay: false,
                backButtonPath: null,
            });

        // Errors
        case types.EMIT_ERROR:
            return state.set('errorMessage', action.payload.message);

        // TEMP
        case types.WRITE_LOG:
            return state.set('logs', state.get('logs') + action.payload.string);

        default:
            return state;
    }
};
