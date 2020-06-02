//Types
import { types } from './types';

export const uiActions = {
    // Spinner actions
    startFetching: () => ({
        type: types.START_FETCHING,
    }),

    stopFetching: () => ({
        type: types.STOP_FETCHING,
    }),

    // Market related actions
    showCart: () => ({
        type: types.SHOW_CART,
    }),

    showFilters: () => ({
        type: types.SHOW_FILTERS,
    }),

    hideCart: () => ({
        type: types.HIDE_CART,
    }),

    hideFilters: () => ({
        type: types.HIDE_FILTERS,
    }),

    // Routing
    setBackButtonPath: (path) => ({
        type: types.SET_BACK_BUTTON_PATH,
        payload: { path },
    }),

    // Overlays actions
    showLoginOverlay: (backButtonPath) => ({
        type: types.SHOW_LOGIN_OVERLAY,
        payload: { backButtonPath },
    }),

    showSignupOverlay: () => ({
        type: types.SHOW_SIGNUP_OVERLAY,
    }),

    showCodeConfirmationOverlay: () => ({
        type: types.SHOW_CODE_OVERLAY,
    }),

    showSearchOverlay: () => ({
        type: types.SHOW_SEARCH_OVERLAY,
    }),

    hideLoginOverlay: () => ({
        type: types.HIDE_LOGIN_OVERLAY,
    }),

    hideSignupOverlay: () => ({
        type: types.HIDE_SIGNUP_OVERLAY,
    }),

    hideCodeConfirmationOverlay: () => ({
        type: types.HIDE_CODE_OVERLAY,
    }),

    hideSearchOverlay: () => ({
        type: types.HIDE_SEARCH_OVERLAY,
    }),

    hideAllOverlays: () => ({
        type: types.HIDE_ALL_OVERLAYS,
    }),

    // Error
    emitError: (error, meta = null) => ({
        type: types.EMIT_ERROR,
        payload: error,
        error: true,
        meta,
    }),
};
