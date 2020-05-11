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

    // Cart actions
    showCart: () => ({
        type: types.SHOW_CART,
    }),

    hideCart: () => ({
        type: types.HIDE_CART,
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

    hideLoginOverlay: () => ({
        type: types.HIDE_LOGIN_OVERLAY,
    }),

    hideSignupOverlay: () => ({
        type: types.HIDE_SIGNUP_OVERLAY,
    }),

    hideCodeConfirmationOverlay: () => ({
        type: types.HIDE_CODE_OVERLAY,
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
