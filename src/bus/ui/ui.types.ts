import { MarketItem } from 'domains/market/types';
import { SupplierDto } from 'domains/supplier/redux/supplier.types';

export const types = {
    // Spinner
    START_FETCHING: 'START_FETCHING',
    STOP_FETCHING: 'STOP_FETCHING',

    // Routing
    REDIRECT: 'REDIRECT',
    SET_BACK_BUTTON_PATH: 'SET_BACK_BUTTON_PATH',

    // Market stuff
    SHOW_CART: 'SHOW_CART',
    SHOW_CART_ICON: 'SHOW_CART_ICON',
    HIDE_CART: 'HIDE_CART',
    HIDE_CART_ICON: 'HIDE_CART_ICON',
    SET_ORDER_PLACED_STATE: 'SET_ORDER_PLACED_STATE',
    SET_ORDER_ERROR_STATE: 'SET_ORDER_ERROR_STATE',

    // Show overlays
    SHOW_MARKET_FILTERS: 'SHOW_MARKET_FILTERS',
    SHOW_ORDERS_FILTERS: 'SHOW_ORDERS_FILTERS',
    SHOW_LOGIN_OVERLAY: 'SHOW_LOGIN_OVERLAY',
    SHOW_SIGNUP_OVERLAY: 'SHOW_SIGNUP_OVERLAY',
    SHOW_CODE_OVERLAY: 'SHOW_CODE_OVERLAY',
    SHOW_SEARCH_OVERLAY: 'SHOW_SEARCH_OVERLAY',
    SHOW_NEW_LOCATION_OVERLAY: 'SHOW_NEW_LOCATION_OVERLAY',
    SHOW_NEW_LIST_ITEM_OVERLAY: 'SHOW_NEW_LIST_ITEM_OVERLAY',
    SHOW_SUPPLIER_UPLOAD_OVERLAY: 'SHOW_SUPPLIER_UPLOAD_OVERLAY',
    SHOW_SUPPLIER_UPLOAD_PREVIEW_OVERLAY: 'SHOW_SUPPLIER_UPLOAD_PREVIEW_OVERLAY',
    SHOW_ORDER_COMBINATIONS_OVERLAY: 'SHOW_ORDER_COMBINATIONS_OVERLAY',
    SET_DELIVERY_DATE: 'SET_DELIVERY_DATE',

    // Hide overlays
    HIDE_MARKET_FILTERS: 'HIDE_MARKET_FILTERS',
    HIDE_ORDERS_FILTERS: 'HIDE_ORDERS_FILTERS',
    HIDE_LOGIN_OVERLAY: 'HIDE_LOGIN_OVERLAY',
    HIDE_SIGNUP_OVERLAY: 'HIDE_SIGNUP_OVERLAY',
    HIDE_CODE_OVERLAY: 'HIDE_CODE_OVERLAY',
    HIDE_SEARCH_OVERLAY: 'HIDE_SEARCH_OVERLAY',
    HIDE_ALL_OVERLAYS: 'HIDE_ALL_OVERLAYS',
    HIDE_NEW_LOCATION_OVERLAY: 'HIDE_NEW_LOCATION_OVERLAY',
    HIDE_NEW_LIST_ITEM_OVERLAY: 'HIDE_NEW_LIST_ITEM_OVERLAY',
    HIDE_SUPPLIER_UPLOAD_OVERLAY: 'HIDE_SUPPLIER_UPLOAD_OVERLAY',
    HIDE_SUPPLIER_UPLOAD_PREVIEW_OVERLAY: 'HIDE_SUPPLIER_UPLOAD_PREVIEW_OVERLAY',
    HIDE_ORDER_COMBINATIONS_OVERLAY: 'HIDE_ORDER_COMBINATIONS_OVERLAY',

    // Data
    SET_NEW_LIST_ITEM_OVERLAY_DATA: 'SET_NEW_LIST_ITEM_OVERLAY_DATA',
    CLEAR_NEW_LIST_ITEM_OVERLAY_DATA: 'CLEAR_NEW_LIST_ITEM_OVERLAY_DATA',
    SET_CLIENT_LISTS_SELECTED_LOCATION: 'SET_CLIENT_LISTS_SELECTED_LOCATION',
    SET_ORDER_COMBINATIONS: 'SET_ORDER_COMBINATIONS',

    // Errors
    EMIT_ERROR: 'EMIT_ERROR',

    // TEMP
    WRITE_LOG: 'WRITE_LOG',
} as const;

type StartFetching = {
    type: typeof types.START_FETCHING;
};

type StopFetching = {
    type: typeof types.STOP_FETCHING;
};

// Market related actions
type ShowCart = {
    type: typeof types.SHOW_CART;
};

type ShowCartIcon = {
    type: typeof types.SHOW_CART_ICON;
};

type HideCart = {
    type: typeof types.HIDE_CART;
};

type HideCartIcon = {
    type: typeof types.HIDE_CART_ICON;
};

type SetOrderPlacedState = {
    type: typeof types.SET_ORDER_PLACED_STATE;
    payload: Record<'state', any>;
};

type SetDeliveryDate = {
    type: typeof types.SET_DELIVERY_DATE;
    payload: Record<'date', any>;
};

// Routing
type SetBackButtonPath = {
    type: typeof types.SET_BACK_BUTTON_PATH;
    payload: Record<'path', string | undefined>;
};

// Showing overlays actions
type ShowLoginOverlay = {
    type: typeof types.SHOW_LOGIN_OVERLAY;
    payload: Record<'backButtonPath', string | undefined>;
};

type ShowSignupOverlay = {
    type: typeof types.SHOW_SIGNUP_OVERLAY;
};

type ShowCodeConfirmationOverlay = {
    type: typeof types.SHOW_CODE_OVERLAY;
};

type ShowSearchOverlay = {
    type: typeof types.SHOW_SEARCH_OVERLAY;
};

type ShowMarketFiltersOverlay = {
    type: typeof types.SHOW_MARKET_FILTERS;
};

type ShowOrdersFiltersOverlay = {
    type: typeof types.SHOW_ORDERS_FILTERS;
};

type ShowNewLocationOverlay = {
    type: typeof types.SHOW_NEW_LOCATION_OVERLAY;
};

type ShowNewListItemOverlay = {
    type: typeof types.SHOW_NEW_LIST_ITEM_OVERLAY;
};

type ShowSupplierUploadOverlay = {
    type: typeof types.SHOW_SUPPLIER_UPLOAD_OVERLAY;
};

type ShowSupplierUploadPreviewOverlay = {
    type: typeof types.SHOW_SUPPLIER_UPLOAD_PREVIEW_OVERLAY;
};

type ShowOrderCombinationsOverlay = {
    type: typeof types.SHOW_ORDER_COMBINATIONS_OVERLAY;
};

// Hiding overlays actions
type HideLoginOverlay = {
    type: typeof types.HIDE_LOGIN_OVERLAY;
};

type HideMarketFiltersOverlay = {
    type: typeof types.HIDE_MARKET_FILTERS;
};

type HideOrdersFiltersOverlay = {
    type: typeof types.HIDE_ORDERS_FILTERS;
};

type HideSignupOverlay = {
    type: typeof types.HIDE_SIGNUP_OVERLAY;
};

type HideCodeConfirmationOverlay = {
    type: typeof types.HIDE_CODE_OVERLAY;
};

type HideSearchOverlay = {
    type: typeof types.HIDE_SEARCH_OVERLAY;
};

type HideAllOverlays = {
    type: typeof types.HIDE_ALL_OVERLAYS;
};

type HideNewLocationOverlay = {
    type: typeof types.HIDE_NEW_LOCATION_OVERLAY;
};

type HideNewListItemOverlay = {
    type: typeof types.HIDE_NEW_LIST_ITEM_OVERLAY;
};

type HideSupplierUploadOverlay = {
    type: typeof types.HIDE_SUPPLIER_UPLOAD_OVERLAY;
};

type HideSupplierUploadPreviewOverlay = {
    type: typeof types.HIDE_SUPPLIER_UPLOAD_PREVIEW_OVERLAY;
};

type HideOrderCombinationsOverlay = {
    type: typeof types.HIDE_ORDER_COMBINATIONS_OVERLAY;
};

// Data
export type NewListItemOverlayData = {
    category: string;
    unit: string;
    price: Record<string, number>;
    stock: Record<string, number>;
    id: string | null;
    name: string;
    img: string;
};

type SetNewListItemOverlayData = {
    type: typeof types.SET_NEW_LIST_ITEM_OVERLAY_DATA;
    payload: NewListItemOverlayData;
};

type ClearNewListItemOverlayData = {
    type: typeof types.CLEAR_NEW_LIST_ITEM_OVERLAY_DATA;
};

type SetClientListsSelectedLocation = {
    type: typeof types.SET_CLIENT_LISTS_SELECTED_LOCATION;
    payload: string;
};

type TempOrderItem = MarketItem & {
    requestedAmount: number;
};

export type Orders = {
    supplier: SupplierDto;
    sum: number;
    items: TempOrderItem[];
};

export type OrderCombination = {
    name: string;
    sum: number;
    orders: Record<string, Orders>[];
};

type SetOrderCombinations = {
    type: typeof types.SET_ORDER_COMBINATIONS;
    payload: OrderCombination[];
};

// Error
type EmitError = {
    type: typeof types.EMIT_ERROR;
    payload: string;
    error: boolean;
    meta: any;
};

// TEMP
type WriteLog = {
    type: typeof types.WRITE_LOG;
    payload: Record<'string', string>;
};

export type UiActionsType =
    | StartFetching
    | StopFetching
    | ShowCart
    | ShowCartIcon
    | HideCart
    | HideCartIcon
    | SetOrderPlacedState
    | SetDeliveryDate
    | SetBackButtonPath
    | ShowLoginOverlay
    | ShowSignupOverlay
    | ShowCodeConfirmationOverlay
    | ShowSearchOverlay
    | ShowMarketFiltersOverlay
    | ShowOrdersFiltersOverlay
    | ShowNewLocationOverlay
    | ShowNewListItemOverlay
    | ShowSupplierUploadOverlay
    | ShowSupplierUploadPreviewOverlay
    | ShowOrderCombinationsOverlay
    | HideLoginOverlay
    | HideMarketFiltersOverlay
    | HideOrdersFiltersOverlay
    | HideSignupOverlay
    | HideCodeConfirmationOverlay
    | HideSearchOverlay
    | HideAllOverlays
    | HideNewLocationOverlay
    | HideNewListItemOverlay
    | HideSupplierUploadOverlay
    | HideSupplierUploadPreviewOverlay
    | HideOrderCombinationsOverlay
    | SetNewListItemOverlayData
    | ClearNewListItemOverlayData
    | SetClientListsSelectedLocation
    | SetOrderCombinations
    | EmitError
    | WriteLog;
