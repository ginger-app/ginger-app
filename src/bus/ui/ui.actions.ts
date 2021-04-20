// Types
import { UiActionsType, types, NewListItemOverlayData, OrderCombination } from './ui.types';

export const uiActions = {
    // Spinner actions
    startFetching: (): UiActionsType => ({
        type: types.START_FETCHING,
    }),

    stopFetching: (): UiActionsType => ({
        type: types.STOP_FETCHING,
    }),

    // Market related actions
    showCart: (): UiActionsType => ({
        type: types.SHOW_CART,
    }),

    showCartIcon: (): UiActionsType => ({
        type: types.SHOW_CART_ICON,
    }),

    hideCart: (): UiActionsType => ({
        type: types.HIDE_CART,
    }),

    hideCartIcon: (): UiActionsType => ({
        type: types.HIDE_CART_ICON,
    }),

    setOrderPlacedState: (state: Record<string, any>) => ({
        type: types.SET_ORDER_PLACED_STATE,
        payload: { state },
    }),

    setDeliveryDate: (date: { string: string; utc: string }) => ({
        type: types.SET_DELIVERY_DATE,
        payload: { date },
    }),

    // Routing
    setBackButtonPath: (path: Record<string, string | null>) => ({
        type: types.SET_BACK_BUTTON_PATH,
        payload: { path },
    }),

    // Showing overlays actions
    showLoginOverlay: (backButtonPath?: string | undefined) => ({
        type: types.SHOW_LOGIN_OVERLAY,
        payload: { backButtonPath },
    }),

    showSignupOverlay: (): UiActionsType => ({
        type: types.SHOW_SIGNUP_OVERLAY,
    }),

    showCodeConfirmationOverlay: (): UiActionsType => ({
        type: types.SHOW_CODE_OVERLAY,
    }),

    showSearchOverlay: (): UiActionsType => ({
        type: types.SHOW_SEARCH_OVERLAY,
    }),

    showMarketFiltersOverlay: (): UiActionsType => ({
        type: types.SHOW_MARKET_FILTERS,
    }),

    showOrdersFiltersOverlay: (): UiActionsType => ({
        type: types.SHOW_ORDERS_FILTERS,
    }),

    showNewLocationOverlay: (): UiActionsType => ({
        type: types.SHOW_NEW_LOCATION_OVERLAY,
    }),

    showNewListItemOverlay: (): UiActionsType => ({
        type: types.SHOW_NEW_LIST_ITEM_OVERLAY,
    }),

    showSupplierUploadOverlay: (): UiActionsType => ({
        type: types.SHOW_SUPPLIER_UPLOAD_OVERLAY,
    }),

    showSupplierUploadPreviewOverlay: (): UiActionsType => ({
        type: types.SHOW_SUPPLIER_UPLOAD_PREVIEW_OVERLAY,
    }),

    showOrderCombinationsOverlay: (): UiActionsType => ({
        type: types.SHOW_ORDER_COMBINATIONS_OVERLAY,
    }),

    // Hiding overlays actions
    hideLoginOverlay: (): UiActionsType => ({
        type: types.HIDE_LOGIN_OVERLAY,
    }),

    hideMarketFiltersOverlay: (): UiActionsType => ({
        type: types.HIDE_MARKET_FILTERS,
    }),

    hideOrdersFiltersOverlay: (): UiActionsType => ({
        type: types.HIDE_ORDERS_FILTERS,
    }),

    hideSignupOverlay: (): UiActionsType => ({
        type: types.HIDE_SIGNUP_OVERLAY,
    }),

    hideCodeConfirmationOverlay: (): UiActionsType => ({
        type: types.HIDE_CODE_OVERLAY,
    }),

    hideSearchOverlay: (): UiActionsType => ({
        type: types.HIDE_SEARCH_OVERLAY,
    }),

    hideAllOverlays: (): UiActionsType => ({
        type: types.HIDE_ALL_OVERLAYS,
    }),

    hideNewLocationOverlay: (): UiActionsType => ({
        type: types.HIDE_NEW_LOCATION_OVERLAY,
    }),

    hideNewListItemOverlay: (): UiActionsType => ({
        type: types.HIDE_NEW_LIST_ITEM_OVERLAY,
    }),

    hideSupplierUploadOverlay: (): UiActionsType => ({
        type: types.HIDE_SUPPLIER_UPLOAD_OVERLAY,
    }),

    hideSupplierUploadPreviewOverlay: (): UiActionsType => ({
        type: types.HIDE_SUPPLIER_UPLOAD_PREVIEW_OVERLAY,
    }),

    hideOrderCombinationsOverlay: (): UiActionsType => ({
        type: types.HIDE_ORDER_COMBINATIONS_OVERLAY,
    }),

    // Data
    setNewListItemOverlayData: (payload: NewListItemOverlayData): UiActionsType => ({
        type: types.SET_NEW_LIST_ITEM_OVERLAY_DATA,
        payload,
    }),

    clearNewListItemOverlayData: (): UiActionsType => ({
        type: types.CLEAR_NEW_LIST_ITEM_OVERLAY_DATA,
    }),

    setClientListsSelectedLocation: (payload: string): UiActionsType => ({
        type: types.SET_CLIENT_LISTS_SELECTED_LOCATION,
        payload,
    }),

    setOrderCombinations: (payload: OrderCombination[]): UiActionsType => ({
        type: types.SET_ORDER_COMBINATIONS,
        payload,
    }),

    // Error
    emitError: (error: string, meta = null as any): UiActionsType => ({
        type: types.EMIT_ERROR,
        payload: error,
        error: true,
        meta,
    }),

    // TEMP
    writeLog: (string: string) => ({
        type: types.WRITE_LOG,
        payload: { string },
    }),
};
