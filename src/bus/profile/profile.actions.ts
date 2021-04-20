// Types
import { OrderCombinations } from 'bus/ui/ui.types';
import { Location } from 'domains/client/hooks/useClientLocations';
import { MarketItem, Order } from 'domains/market/types';
import { SupplierPreviewItem } from 'domains/supplier/types';
import { ProfileState } from './profile.reducer';
import { ProfileActions, profileTypes as types, OrdersCombinationsRequest } from './profile.types';

export const profileActions = {
    // Sync
    fillProfile: (userData: Partial<ProfileState>): ProfileActions => ({
        type: types.FILL_PROFILE,
        payload: userData,
    }),

    clearProfile: (): ProfileActions => ({
        type: types.CLEAR_PROFILE,
    }),

    updateCart: (cart: MarketItem[]): ProfileActions => ({
        type: types.UPDATE_CART,
        payload: cart,
    }),

    addItemToFavorites: (item: MarketItem): ProfileActions => ({
        type: types.ADD_ITEM_TO_FAVORITES,
        payload: item,
    }),

    removeItemFromFavorites: (item: MarketItem): ProfileActions => ({
        type: types.REMOVE_ITEM_FROM_FAVORITES,
        payload: item,
    }),

    repeatLastOrder: (orderData: Order[]): ProfileActions => ({
        type: types.REPEAT_LAST_ORDER,
        payload: orderData,
    }),

    fillSupplierPreview: (previewData: SupplierPreviewItem[]): ProfileActions => ({
        type: types.FILL_SUPPLIER_PREVIEW,
        payload: previewData,
    }),

    updatePreviewData: (newPreviewData: SupplierPreviewItem[]): ProfileActions => ({
        type: types.UPDATE_PREVIEW_DATA,
        payload: newPreviewData,
    }),

    fillClientLists: (data: MarketItem[]): ProfileActions => ({
        type: types.FILL_CLIENT_LISTS,
        payload: data,
    }),

    fillClientLocations: (data: Location[]): ProfileActions => ({
        type: types.FILL_CLIENT_LOCATIONS,
        payload: data,
    }),

    fillClientOrders: (data: Order[]): ProfileActions => ({
        type: types.FILL_CLIENT_ORDERS,
        payload: data,
    }),

    fillSupplierOrders: (data: Order[]): ProfileActions => ({
        type: types.FILL_SUPPLIER_ORDERS,
        payload: data,
    }),

    fillOrdersCombinations: (data: OrderCombinations): ProfileActions => ({
        type: types.FILL_ORDERS_COMBINATIONS,
        payload: data,
    }),

    // Async
    addItemToCartAsync: (item: MarketItem): ProfileActions => ({
        type: types.ADD_ITEM_TO_CART_ASYNC,
        payload: item,
    }),

    removeItemFromCartAsync: (id: string): ProfileActions => ({
        type: types.REMOVE_ITEM_FROM_CART_ASYNC,
        payload: id,
    }),

    addItemToFavoritesAsync: (id: string): ProfileActions => ({
        type: types.ADD_ITEM_TO_FAVORITES_ASYNC,
        payload: { id },
    }),

    removeItemFromFavoritesAsync: (id: string): ProfileActions => ({
        type: types.REMOVE_ITEM_FROM_FAVORITES_ASYNC,
        payload: { id },
    }),

    getUserDataAsync: (): ProfileActions => ({
        type: types.GET_USER_DATA_ASYNC,
    }),

    uploadSupplierExcelTableAsync: (file: File): ProfileActions => ({
        type: types.UPLOAD_SUPPLIER_EXCEL_TABLE_ASYNC,
        payload: { file },
    }),

    removeItemFromPreviewAsync: (index: number): ProfileActions => ({
        type: types.REMOVE_ITEM_FROM_PREVIEW_ASYNC,
        payload: index,
    }),

    updateItemFromPreviewAsync: ({
        index,
        data,
    }: {
        index: number;
        data: Record<string, any>;
    }): ProfileActions => ({
        type: types.UPDATE_ITEM_FROM_PREVIEW_ASYNC,
        payload: { index, data },
    }),

    updateSupplierItemsAsync: (items: Record<string, any>[]): ProfileActions => ({
        type: types.UPDATE_SUPPLIER_ITEMS_ASYNC,
        payload: items,
    }),

    addNewSupplierItemAsync: (item: string): ProfileActions => ({
        type: types.ADD_NEW_SUPPLIER_ITEM_ASYNC,
        payload: item,
    }),

    getAllClientListsAsync: (): ProfileActions => ({
        type: types.GET_ALL_CLIENT_LISTS_ASYNC,
    }),

    getClientLocationsAsync: (): ProfileActions => ({
        type: types.GET_CLIENT_LOCATIONS_ASYNC,
    }),

    getClientOrdersAsync: (): ProfileActions => ({
        type: types.GET_CLIENT_ORDERS_ASYNC,
    }),

    getSupplierOrdersAsync: (): ProfileActions => ({
        type: types.GET_SUPPLIER_ORDERS_ASYNC,
    }),

    createNewLocationAsync: (data: Record<string, any>): ProfileActions => ({
        type: types.CREATE_NEW_LOCATION_ASYNC,
        payload: data,
    }),

    addNewItemToLocationAsync: ({
        locationId,
        itemId,
    }: {
        locationId: string;
        itemId: string;
    }): ProfileActions => ({
        type: types.ADD_NEW_ITEM_TO_LOCATION_ASYNC,
        payload: { locationId, itemId },
    }),

    removeItemFromLocationAsync: ({
        locationId,
        itemId,
    }: {
        locationId: string;
        itemId: string;
    }): ProfileActions => ({
        type: types.REMOVE_ITEM_FROM_LOCATION_ASYNC,
        payload: { locationId, itemId },
    }),

    getOrdersCombinationsAsync: (data: OrdersCombinationsRequest): ProfileActions => ({
        type: types.GET_ORDERS_COMBINATIONS_ASYNC,
        payload: data,
    }),
};
