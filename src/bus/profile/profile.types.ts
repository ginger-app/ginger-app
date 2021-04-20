import { ProfileState } from './profile.reducer';
import { MarketItem, Order } from 'domains/market/types';
import { SupplierPreviewItem } from 'domains/supplier/types';
import { Location } from 'domains/client/hooks/useClientLocations';
import { OrderCombinations } from 'bus/ui/ui.types';

export const profileTypes = {
    // Sync
    FILL_PROFILE: 'FILL_PROFILE',
    CLEAR_PROFILE: 'CLEAR_PROFILE',
    UPDATE_CART: 'UPDATE_CART',
    ADD_ITEM_TO_FAVORITES: 'ADD_ITEM_TO_FAVORITES',
    REMOVE_ITEM_FROM_FAVORITES: 'REMOVE_ITEM_FROM_FAVORITES',
    REPEAT_LAST_ORDER: 'REPEAT_LAST_ORDER',
    FILL_SUPPLIER_PREVIEW: 'FILL_SUPPLIER_PREVIEW',
    FILL_SUPPLIER_ORDERS: 'FILL_SUPPLIER_ORDERS',
    UPDATE_PREVIEW_DATA: 'UPDATE_PREVIEW_DATA',
    FILL_CLIENT_LISTS: 'FILL_CLIENT_LISTS',
    FILL_CLIENT_LOCATIONS: 'FILL_CLIENT_LOCATIONS',
    FILL_CLIENT_ORDERS: 'FILL_CLIENT_ORDERS',
    FILL_ORDERS_COMBINATIONS: 'FILL_ORDERS_COMBINATIONS',

    // Async
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
    GET_ORDERS_COMBINATIONS_ASYNC: 'GET_ORDERS_COMBINATIONS_ASYNC',
} as const;

type FillProfileAction = {
    // Sync
    type: typeof profileTypes.FILL_PROFILE;
    payload: Partial<ProfileState>;
};

type ClearProfileAction = {
    type: typeof profileTypes.CLEAR_PROFILE;
};

type ClearSupplierPreviewAction = {
    type: typeof profileTypes.FILL_SUPPLIER_PREVIEW;
    payload: SupplierPreviewItem[];
};

type UpdatePreviewDataAction = {
    type: typeof profileTypes.UPDATE_PREVIEW_DATA;
    payload: SupplierPreviewItem[];
};

type FillClientLocationsAction = {
    type: typeof profileTypes.FILL_CLIENT_LOCATIONS;
    payload: Location[];
};

type FillClientOrdersAction = {
    type: typeof profileTypes.FILL_CLIENT_ORDERS;
    payload: Order[];
};

type FillSupplierOrdersAction = {
    type: typeof profileTypes.FILL_SUPPLIER_ORDERS;
    payload: Order[];
};

type FillOrdersCombinations = {
    type: typeof profileTypes.FILL_ORDERS_COMBINATIONS;
    payload: OrderCombinations;
};

type UpdateCart = {
    type: typeof profileTypes.UPDATE_CART;
    payload: MarketItem[];
};

type AddItemToFavorites = {
    type: typeof profileTypes.ADD_ITEM_TO_FAVORITES;
    payload: MarketItem;
};

type RemoveItemFromFavorites = {
    type: typeof profileTypes.REMOVE_ITEM_FROM_FAVORITES;
    payload: MarketItem;
};

type RepeatLastOrder = {
    type: typeof profileTypes.REPEAT_LAST_ORDER;
    payload: Record<string, any>;
};

type FillClientLists = {
    type: typeof profileTypes.FILL_CLIENT_LISTS;
    payload: Record<string, any>[];
};
// Async
type AddItemToCartAsync = {
    type: typeof profileTypes.ADD_ITEM_TO_CART_ASYNC;
    payload: MarketItem;
};

type RemoveItemFromCartAsync = {
    type: typeof profileTypes.REMOVE_ITEM_FROM_CART_ASYNC;
    payload: string;
};

type AddItemToFavoritesAsync = {
    type: typeof profileTypes.ADD_ITEM_TO_FAVORITES_ASYNC;
    payload: Record<'id', any>;
};

type RemoveItemFromFavoritesAsync = {
    type: typeof profileTypes.REMOVE_ITEM_FROM_FAVORITES_ASYNC;
    payload: Record<'id', any>;
};

type GetUserDataAsync = {
    type: typeof profileTypes.GET_USER_DATA_ASYNC;
};

type UploadSupplierExcelTableAsync = {
    type: typeof profileTypes.UPLOAD_SUPPLIER_EXCEL_TABLE_ASYNC;
    payload: Record<'file', Blob>;
};

type RemoveItemFromPreviewAsync = {
    type: typeof profileTypes.REMOVE_ITEM_FROM_PREVIEW_ASYNC;
    payload: number;
};

export type ItemFromPreview = {
    index: number;
    data: Record<string, any>;
};

type UpdateItemFromPreviewAsync = {
    type: typeof profileTypes.UPDATE_ITEM_FROM_PREVIEW_ASYNC;
    payload: ItemFromPreview;
};

type UpdateSupplierItemsAsync = {
    type: typeof profileTypes.UPDATE_SUPPLIER_ITEMS_ASYNC;
    payload: Record<string, any>[];
};

type AddNewSupplierItemAsync = {
    type: typeof profileTypes.ADD_NEW_SUPPLIER_ITEM_ASYNC;
    payload: string;
};

type GetAllClientListsAsync = {
    type: typeof profileTypes.GET_ALL_CLIENT_LISTS_ASYNC;
};

type GetClientLocationsAsync = {
    type: typeof profileTypes.GET_CLIENT_LOCATIONS_ASYNC;
};

type GetClientOrdersAsync = {
    type: typeof profileTypes.GET_CLIENT_ORDERS_ASYNC;
};

type GetSupplierOrdersAsync = {
    type: typeof profileTypes.GET_SUPPLIER_ORDERS_ASYNC;
};

type CreateNewLocationAsync = {
    type: typeof profileTypes.CREATE_NEW_LOCATION_ASYNC;
    payload: Record<string, any>;
};

export type Item = {
    locationId: string;
    itemId: string;
};

type AddNewItemToLocationAsync = {
    type: typeof profileTypes.ADD_NEW_ITEM_TO_LOCATION_ASYNC;
    payload: Item;
};

type RemoveItemFromLocationAsync = {
    type: typeof profileTypes.REMOVE_ITEM_FROM_LOCATION_ASYNC;
    payload: Item;
};

export type OrdersCombinationsRequest = {
    items: MarketItem[];
    sum: number;
    location: string;
};

type GetOrdersCombinationsAsync = {
    type: typeof profileTypes.GET_ORDERS_COMBINATIONS_ASYNC;
    payload: OrdersCombinationsRequest;
};

export type ProfileActions =
    | FillProfileAction
    | ClearProfileAction
    | ClearSupplierPreviewAction
    | UpdatePreviewDataAction
    | FillClientLocationsAction
    | FillClientOrdersAction
    | FillSupplierOrdersAction
    | UpdateCart
    | AddItemToFavorites
    | RemoveItemFromFavorites
    | RepeatLastOrder
    | FillClientLists
    | FillOrdersCombinations
    | AddItemToCartAsync
    | RemoveItemFromCartAsync
    | AddItemToFavoritesAsync
    | RemoveItemFromFavoritesAsync
    | GetUserDataAsync
    | UploadSupplierExcelTableAsync
    | RemoveItemFromPreviewAsync
    | UpdateItemFromPreviewAsync
    | UpdateSupplierItemsAsync
    | AddNewSupplierItemAsync
    | GetAllClientListsAsync
    | GetClientLocationsAsync
    | GetClientOrdersAsync
    | GetSupplierOrdersAsync
    | CreateNewLocationAsync
    | AddNewItemToLocationAsync
    | RemoveItemFromLocationAsync
    | GetOrdersCombinationsAsync;
