// Types
import { profileTypes as types } from './types';

export const profileActions = {
    // Sync
    fillProfile: (userData) => ({
        type: types.FILL_PROFILE,
        payload: userData,
    }),

    clearProfile: () => ({
        type: types.CLEAR_PROFILE,
    }),

    updateCart: (cart) => ({
        type: types.UPDATE_CART,
        payload: cart,
    }),

    addItemToFavorites: (item) => ({
        type: types.ADD_ITEM_TO_FAVORITES,
        payload: item,
    }),

    removeItemFromFavorites: (item) => ({
        type: types.REMOVE_ITEM_FROM_FAVORITES,
        payload: item,
    }),

    repeatLastOrder: (orderData) => ({
        type: types.REPEAT_LAST_ORDER,
        payload: orderData,
    }),

    fillSupplierPreview: (previewData) => ({
        type: types.FILL_SUPPLIER_PREVIEW,
        payload: previewData,
    }),

    updatePreviewData: (newPreviewData) => ({
        type: types.UPDATE_PREVIEW_DATA,
        payload: newPreviewData,
    }),

    fillClientLists: (data) => ({
        type: types.UPDATE_PREVIEW_DATA,
        payload: data,
    }),

    fillClientLocations: (data) => ({
        type: types.FILL_CLIENT_LOCATIONS,
        payload: data,
    }),

    // Async
    addItemToCartAsync: (item) => ({
        type: types.ADD_ITEM_TO_CART_ASYNC,
        payload: item,
    }),

    removeItemFromCartAsync: (sku) => ({
        type: types.REMOVE_ITEM_FROM_CART_ASYNC,
        payload: sku,
    }),

    addItemToFavoritesAsync: (sku) => ({
        type: types.ADD_ITEM_TO_FAVORITES_ASYNC,
        payload: { sku },
    }),

    removeItemFromFavoritesAsync: (sku) => ({
        type: types.REMOVE_ITEM_FROM_FAVORITES_ASYNC,
        payload: { sku },
    }),

    getUserDataAsync: (tokens) => ({
        type: types.GET_USER_DATA_ASYNC,
        payload: tokens,
    }),

    uploadSupplierExcelTableAsync: (file) => ({
        type: types.UPLOAD_SUPPLIER_EXCEL_TABLE_ASYNC,
        payload: { file },
    }),

    removeItemFromPreviewAsync: (index) => ({
        type: types.REMOVE_ITEM_FROM_PREVIEW_ASYNC,
        payload: index,
    }),

    updateItemFromPreviewAsync: ({ index, data }) => ({
        type: types.UPDATE_ITEM_FROM_PREVIEW_ASYNC,
        payload: { index, data },
    }),

    updateSupplierItemsAsync: (items) => ({
        type: types.UPDATE_SUPPLIER_ITEMS_ASYNC,
        payload: items,
    }),

    addNewSupplierItemAsync: (item) => ({
        type: types.ADD_NEW_SUPPLIER_ITEM_ASYNC,
        payload: item,
    }),

    getAllClientListsAsync: () => ({
        type: types.GET_ALL_CLIENT_LISTS_ASYNC,
    }),

    getClientLocationsAsync: () => ({
        type: types.GET_CLIENT_LOCATIONS_ASYNC,
    }),

    createNewLocationAsync: (data) => ({
        type: types.CREATE_NEW_LOCATION_ASYNC,
        payload: data,
    }),

    addNewItemToLocationAsync: ({ locationId, itemId }) => ({
        type: types.ADD_NEW_ITEM_TO_LOCATION_ASYNC,
        payload: { locationId, itemId },
    }),
};
