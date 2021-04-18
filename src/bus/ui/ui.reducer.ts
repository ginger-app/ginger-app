// Core
import { AnyAction } from 'redux';
// Types
import { types } from './ui.types';

const initialState = Object.freeze({
    // Overlays
    isFetching: false,
    cartIsOpened: false,
    searchOpened: false,
    marketFiltersOverlay: false,
    ordersFiltersOverlay: false,
    codeConfirmationOverlay: false,
    signupOverlay: false,
    loginOverlay: false,
    newLocationOverlay: false,
    newListItemOverlay: false,
    supplierUploadOverlay: false,
    cartIconVisible: true,
    orderPlacedSuccesfully: false,
    orderPlacementError: false,
    supplierUploadPreviewOverlay: false,
    orderCombinationsOverlay: false,

    // Data
    backButtonPath: null,
    newListItemOverlayData: Object.freeze({
        name: '',
        category: '',
        unit: '',
        price: '',
        amount: '',
        img: '',
        id: null,
    }),
    orderCombinations: [] as any[],
    clientListsSelectedLocation: null,
    deliveryDate: {} as Record<string, any>,
    logs: '',
});

export type UiState = typeof initialState;

export const uiReducer = (state = initialState, action: AnyAction): UiState => {
    switch (action.type) {
        // Spinner
        case types.START_FETCHING:
            return Object.freeze({
                ...state,
                isFetching: true,
            });

        case types.STOP_FETCHING:
            return Object.freeze({
                ...state,
                isFetching: false,
            });

        // Market
        case types.SHOW_CART:
            return Object.freeze({
                ...state,
                cartIsOpened: true,
            });

        case types.SHOW_MARKET_FILTERS:
            return Object.freeze({
                ...state,
                marketFiltersOverlay: true,
            });

        case types.SHOW_ORDERS_FILTERS:
            return Object.freeze({
                ...state,
                ordersFiltersOverlay: true,
            });

        case types.SHOW_CART_ICON:
            return Object.freeze({
                ...state,
                cartIconVisible: true,
            });

        case types.HIDE_CART:
            return Object.freeze({
                ...state,
                cartIsOpened: false,
            });

        case types.HIDE_MARKET_FILTERS:
            return Object.freeze({
                ...state,
                marketFiltersOverlay: false,
            });

        case types.HIDE_ORDERS_FILTERS:
            return Object.freeze({
                ...state,
                ordersFiltersOverlay: false,
            });

        case types.HIDE_CART_ICON:
            return Object.freeze({
                ...state,
                cartIconVisible: false,
            });

        case types.SET_ORDER_PLACED_STATE:
            return Object.freeze({
                ...state,
                orderPlacedSuccesfully: action.payload.state,
            });

        case types.SET_DELIVERY_DATE:
            return Object.freeze({
                ...state,
                deliveryDate: action.payload.date,
            });

        // Routing
        case types.SET_BACK_BUTTON_PATH:
            return Object.freeze({
                ...state,
                backButtonPath: action.payload.path,
            });

        // Showing overlays
        case types.SHOW_LOGIN_OVERLAY:
            return Object.freeze({
                ...state,
                loginOverlay: true,
                backButtonPath: action?.payload?.backButtonPath,
            });

        case types.HIDE_LOGIN_OVERLAY:
            return Object.freeze({
                ...state,
                loginOverlay: false,
                backButtonPath: null,
            });

        case types.SHOW_SIGNUP_OVERLAY:
            return Object.freeze({
                ...state,
                signupOverlay: true,
            });

        case types.HIDE_SIGNUP_OVERLAY:
            return Object.freeze({
                ...state,
                signupOverlay: false,
            });

        case types.SHOW_CODE_OVERLAY:
            return Object.freeze({
                ...state,
                codeConfirmationOverlay: true,
            });

        case types.HIDE_CODE_OVERLAY:
            return Object.freeze({
                ...state,
                codeConfirmationOverlay: false,
            });

        case types.SHOW_SEARCH_OVERLAY:
            return Object.freeze({
                ...state,
                searchOpened: true,
            });

        case types.SHOW_NEW_LIST_ITEM_OVERLAY:
            return Object.freeze({
                ...state,
                newListItemOverlay: true,
            });

        case types.SHOW_SUPPLIER_UPLOAD_OVERLAY:
            return Object.freeze({
                ...state,
                supplierUploadOverlay: true,
            });

        case types.SHOW_SUPPLIER_UPLOAD_PREVIEW_OVERLAY:
            return Object.freeze({
                ...state,
                supplierUploadPreviewOverlay: true,
            });

        case types.SHOW_ORDER_COMBINATIONS_OVERLAY:
            return Object.freeze({
                ...state,
                orderCombinationsOverlay: true,
            });

        // Hiding overlays
        case types.HIDE_SEARCH_OVERLAY:
            return Object.freeze({
                ...state,
                searchOpened: false,
            });

        case types.SHOW_NEW_LOCATION_OVERLAY:
            return Object.freeze({
                ...state,
                newLocationOverlay: true,
            });

        case types.HIDE_NEW_LOCATION_OVERLAY:
            return Object.freeze({
                ...state,
                newLocationOverlay: false,
            });

        case types.HIDE_NEW_LIST_ITEM_OVERLAY:
            return Object.freeze({
                ...state,
                newListItemOverlay: false,
            });

        case types.HIDE_SUPPLIER_UPLOAD_OVERLAY:
            return Object.freeze({
                ...state,
                supplierUploadOverlay: false,
            });

        case types.HIDE_SUPPLIER_UPLOAD_PREVIEW_OVERLAY:
            return Object.freeze({
                ...state,
                supplierUploadPreviewOverlay: false,
            });

        case types.HIDE_ORDER_COMBINATIONS_OVERLAY:
            return Object.freeze({
                ...state,
                orderCombinationsOverlay: false,
            });

        case types.HIDE_ALL_OVERLAYS:
            return Object.freeze({
                ...state,
                cartIsOpened: false,
                searchOpened: false,
                marketFiltersOverlay: false,
                ordersFiltersOverlay: false,
                codeConfirmationOverlay: false,
                signupOverlay: false,
                loginOverlay: false,
                newLocationOverlay: false,
                newListItemOverlay: false,
                supplierUploadOverlay: false,
                backButtonPath: null,
            });

        // Data
        case types.SET_NEW_LIST_ITEM_OVERLAY_DATA:
            return Object.freeze({
                ...state,
                newListItemOverlayData: action.payload,
            });

        case types.CLEAR_NEW_LIST_ITEM_OVERLAY_DATA:
            return Object.freeze({
                ...state,
                newListItemOverlayData: initialState.newListItemOverlayData,
            });

        case types.SET_CLIENT_LISTS_SELECTED_LOCATION:
            return Object.freeze({
                ...state,
                clientListsSelectedLocation: action.payload,
            });

        case types.SET_ORDER_COMBINATIONS:
            return Object.freeze({
                ...state,
                orderCombinations: action.payload,
            });

        // Errors
        case types.EMIT_ERROR:
            return Object.freeze({
                ...state,
                errorMessage: action.payload.message,
            });

        // TEMP
        case types.WRITE_LOG:
            return Object.freeze({
                ...state,
                logs: state.logs + action.payload.string,
            });

        default:
            return state;
    }
};
