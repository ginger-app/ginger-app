// Core
import { fromJS, Map } from 'immutable';

// Types
import { types } from './types';

const initialState = Map({
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
    newListItemOverlayData: Map({
        name: '',
        category: '',
        unit: '',
        price: '',
        amount: '',
        img: '',
        id: null,
    }),
    orderCombinations: [],
    clientListsSelectedLocation: null,
    deliveryDate: {},
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

        case types.SHOW_MARKET_FILTERS:
            return state.set('marketFiltersOverlay', true);

        case types.SHOW_ORDERS_FILTERS:
            return state.set('ordersFiltersOverlay', true);

        case types.SHOW_CART_ICON:
            return state.set('cartIconVisible', true);

        case types.HIDE_CART:
            return state.set('cartIsOpened', false);

        case types.HIDE_MARKET_FILTERS:
            return state.set('marketFiltersOverlay', false);

        case types.HIDE_ORDERS_FILTERS:
            return state.set('ordersFiltersOverlay', false);

        case types.HIDE_CART_ICON:
            return state.set('cartIconVisible', false);

        case types.SET_ORDER_PLACED_STATE:
            return state.set('orderPlacedSuccesfully', action.payload.state);

        case types.SET_DELIVERY_DATE:
            return state.set('deliveryDate', action.payload.date);

        // Routing
        case types.SET_BACK_BUTTON_PATH:
            return state.set('backButtonPath', action.payload.path);

        // Showing overlays
        case types.SHOW_LOGIN_OVERLAY:
            return state.merge({
                loginOverlay: true,
                backButtonPath: action?.payload?.backButtonPath,
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

        case types.SHOW_NEW_LIST_ITEM_OVERLAY:
            return state.set('newListItemOverlay', true);

        case types.SHOW_SUPPLIER_UPLOAD_OVERLAY:
            return state.set('supplierUploadOverlay', true);

        case types.SHOW_SUPPLIER_UPLOAD_PREVIEW_OVERLAY:
            return state.set('supplierUploadPreviewOverlay', true);

        case types.SHOW_ORDER_COMBINATIONS_OVERLAY:
            return state.set('orderCombinationsOverlay', true);

        // Hiding overlays
        case types.HIDE_SEARCH_OVERLAY:
            return state.set('searchOpened', false);

        case types.SHOW_NEW_LOCATION_OVERLAY:
            return state.set('newLocationOverlay', true);

        case types.HIDE_NEW_LOCATION_OVERLAY:
            return state.set('newLocationOverlay', false);

        case types.HIDE_NEW_LIST_ITEM_OVERLAY:
            return state.set('newListItemOverlay', false);

        case types.HIDE_SUPPLIER_UPLOAD_OVERLAY:
            return state.set('supplierUploadOverlay', false);

        case types.HIDE_SUPPLIER_UPLOAD_PREVIEW_OVERLAY:
            return state.set('supplierUploadPreviewOverlay', false);

        case types.HIDE_ORDER_COMBINATIONS_OVERLAY:
            return state.set('orderCombinationsOverlay', false);

        case types.HIDE_ALL_OVERLAYS:
            return state.merge({
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
            return state.set('newListItemOverlayData', fromJS(action.payload));

        case types.CLEAR_NEW_LIST_ITEM_OVERLAY_DATA:
            return state.set('newListItemOverlayData', initialState.get('newListItemOverlayData'));

        case types.SET_CLIENT_LISTS_SELECTED_LOCATION:
            return state.set('clientListsSelectedLocation', action.payload);

        case types.SET_ORDER_COMBINATIONS:
            return state.set('orderCombinations', action.payload);

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
