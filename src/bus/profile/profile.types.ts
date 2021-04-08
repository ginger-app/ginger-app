import { ProfileState } from './profile.reducer';

export const profileTypes = {
    // Sync
    FILL_PROFILE: 'FILL_PROFILE',
    CLEAR_PROFILE: 'CLEAR_PROFILE',

    FILL_REFERRAL_DATA: 'FILL_REFERRAL_DATA',
    UPDATE_NICKNAME: 'UPDATE_NICKNAME',
    UPDATE_EMAIL: 'UPDATE_EMAIL',
    UPDATE_CART: 'UPDATE_CART',
    REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
    ADD_ITEM_TO_FAVORITES: 'ADD_ITEM_TO_FAVORITES',
    REMOVE_ITEM_FROM_FAVORITES: 'REMOVE_ITEM_FROM_FAVORITES',
    REPEAT_LAST_ORDER: 'REPEAT_LAST_ORDER',
    FILL_SUPPLIER_PREVIEW: 'FILL_SUPPLIER_PREVIEW',
    FILL_SUPPLIER_ORDERS: 'FILL_SUPPLIER_ORDERS',
    UPDATE_PREVIEW_DATA: 'UPDATE_PREVIEW_DATA',
    FILL_CLIENT_LISTS: 'FILL_CLIENT_LISTS',
    FILL_CLIENT_LOCATIONS: 'FILL_CLIENT_LOCATIONS',
    FILL_CLIENT_ORDERS: 'FILL_CLIENT_ORDERS',
    FILL_MARKET_ITEM_CHOSEN_LOCATIONS: 'FILL_MARKET_ITEM_CHOSEN_LOCATIONS',
    FILL_ORDERS_COMBINATIONS: 'FILL_ORDERS_COMBINATIONS',

    // Async
    GET_REFERRAL_DATA_ASYNC: 'GET_REFERRAL_DATA_ASYNC',
    UPDATE_EMAIL_ASYNC: 'UPDATE_EMAIL_ASYNC',
    ADD_ITEM_TO_CART_ASYNC: 'ADD_ITEM_TO_CART_ASYNC',
    REMOVE_ITEM_FROM_CART_ASYNC: 'REMOVE_ITEM_FROM_CART_ASYNC',
    ADD_ITEM_TO_FAVORITES_ASYNC: 'ADD_ITEM_TO_FAVORITES_ASYNC',
    REMOVE_ITEM_FROM_FAVORITES_ASYNC: 'REMOVE_ITEM_FROM_FAVORITES_ASYNC',
    GET_USER_DATA_ASYNC: 'GET_USER_DATA_ASYNC',
    UPLOAD_SUPPLIER_EXCEL_TABLE_ASYNC: 'UPLOAD_SUPPLIER_EXCEL_TABLE_ASYNC',
    REMOVE_ITEM_FROM_PREVIEW_ASYNC: 'REMOVE_ITEM_FROM_PREVIEW_ASYNC',
    UPDATE_ITEM_FROM_PREVIEW_ASYNC: 'UPDATE_ITEM_FROM_PREVIEW_ASYNC',
    UPDATE_SUPPLIER_ITEMS_ASYNC: 'UPDATE_SUPPLIER_ITEMS_ASYNC',
    ADD_NEW_SUPPLIER_ITEM_ASYNC: 'ADD_NEW_SUPPLIER_ITEM_ASYNC',
    GET_ALL_CLIENT_LISTS_ASYNC: 'GET_ALL_CLIENT_LISTS_ASYNC',
    GET_CLIENT_LOCATIONS_ASYNC: 'GET_CLIENT_LOCATIONS_ASYNC',
    GET_CLIENT_ORDERS_ASYNC: 'GET_CLIENT_ORDERS_ASYNC',
    GET_SUPPLIER_ORDERS_ASYNC: 'GET_SUPPLIER_ORDERS_ASYNC',
    CREATE_NEW_LOCATION_ASYNC: 'CREATE_NEW_LOCATION_ASYNC',
    ADD_NEW_ITEM_TO_LOCATION_ASYNC: 'ADD_NEW_ITEM_TO_LOCATION_ASYNC',
    REMOVE_ITEM_FROM_LOCATION_ASYNC: 'REMOVE_ITEM_FROM_LOCATION_ASYNC',
    CREATE_NEW_ORDER_ASYNC: 'CREATE_NEW_ORDER_ASYNC',
    GET_ORDERS_COMBINATIONS_ASYNC: 'GET_ORDERS_COMBINATIONS_ASYNC',
};

type FillProfileAction = {
    type: typeof profileTypes.FILL_PROFILE;
    payload: Partial<ProfileState>;
};

type ClearProfileAction = {
    type: typeof profileTypes.CLEAR_PROFILE;
};

type ClearSupplierPreviewAction = {
    type: typeof profileTypes.FILL_SUPPLIER_PREVIEW;
    payload: Record<string, any>;
};

type UpdatePreviewDataAction = {
    type: typeof profileTypes.UPDATE_PREVIEW_DATA;
    payload: Record<string, any>;
};

type FillClientLocationsAction = {
    type: typeof profileTypes.FILL_CLIENT_LOCATIONS;
    payload: Record<string, any>[];
};

type FillClientOrdersAction = {
    type: typeof profileTypes.FILL_CLIENT_ORDERS;
    payload: Record<string, any>[];
};

type FillSupplierOrdersAction = {
    type: typeof profileTypes.FILL_SUPPLIER_ORDERS;
    payload: Record<string, any>[];
};

type FillMarketItemChosenLocations = {
    type: typeof profileTypes.FILL_MARKET_ITEM_CHOSEN_LOCATIONS;
    payload: Record<string, any>[];
};

type FillOrdersCombinations = {
    type: typeof profileTypes.FILL_ORDERS_COMBINATIONS;
    payload: Record<string, any>[];
};

export type ProfileActions =
    | FillProfileAction
    | ClearProfileAction
    | ClearSupplierPreviewAction
    | UpdatePreviewDataAction
    | FillClientLocationsAction
    | FillClientOrdersAction
    | FillSupplierOrdersAction
    | FillMarketItemChosenLocations
    | FillOrdersCombinations;
