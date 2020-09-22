// Types
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

    showCartIcon: () => ({
        type: types.SHOW_CART_ICON,
    }),

    hideCart: () => ({
        type: types.HIDE_CART,
    }),

    hideCartIcon: () => ({
        type: types.HIDE_CART_ICON,
    }),

    setOrderPlacedState: (state) => ({
        type: types.SET_ORDER_PLACED_STATE,
        payload: { state },
    }),

    // Routing
    setBackButtonPath: (path) => ({
        type: types.SET_BACK_BUTTON_PATH,
        payload: { path },
    }),

    // Showing overlays actions
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

    showMarketFiltersOverlay: () => ({
        type: types.SHOW_MARKET_FILTERS,
    }),

    showOrdersFiltersOverlay: () => ({
        type: types.SHOW_ORDERS_FILTERS,
    }),

    showNewLocationOverlay: () => ({
        type: types.SHOW_NEW_LOCATION_OVERLAY,
    }),

    showNewListItemOverlay: () => ({
        type: types.SHOW_NEW_LIST_ITEM_OVERLAY,
    }),

    showSupplierUploadOverlay: () => ({
        type: types.SHOW_SUPPLIER_UPLOAD_OVERLAY,
    }),

    // Hiding overlays actions
    hideLoginOverlay: () => ({
        type: types.HIDE_LOGIN_OVERLAY,
    }),

    hideMarketFiltersOverlay: () => ({
        type: types.HIDE_MARKET_FILTERS,
    }),

    hideOrdersFiltersOverlay: () => ({
        type: types.HIDE_ORDERS_FILTERS,
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

    hideNewLocationOverlay: () => ({
        type: types.HIDE_NEW_LOCATION_OVERLAY,
    }),

    hideNewListItemOverlay: () => ({
        type: types.HIDE_NEW_LIST_ITEM_OVERLAY,
    }),

    hideSupplierUploadOverlay: () => ({
        type: types.HIDE_SUPPLIER_UPLOAD_OVERLAY,
    }),

    // Error
    emitError: (error, meta = null) => ({
        type: types.EMIT_ERROR,
        payload: error,
        error: true,
        meta,
    }),

    // TEMP
    writeLog: (string) => ({
        type: types.WRITE_LOG,
        payload: { string },
    }),
};
