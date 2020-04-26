//Types
import { types } from './types';

export const uiActions = {
    startFetching: () => ({
        type: types.START_FETCHING,
    }),

    stopFetching: () => ({
        type: types.STOP_FETCHING,
    }),

    showCart: () => ({
        type: types.SHOW_CART,
    }),

    hideCart: () => ({
        type: types.HIDE_CART,
    }),

    redirect: (endpoint) => ({
        type: types.REDIRECT,
        payload: endpoint,
    }),

    emitError: (error, meta = null) => ({
        type: types.EMIT_ERROR,
        payload: error,
        error: true,
        meta,
    }),
};
