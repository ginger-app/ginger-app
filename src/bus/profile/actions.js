//Types
import { profileTypes as types } from './types';

export const profileActions = {
    //Sync
    fillProfile: (userData) => ({
        type: types.FILL_PROFILE,
        payload: userData,
    }),

    clearProfile: () => ({
        type: types.CLEAR_PROFILE,
    }),

    addItemToCart: (item) => ({
        type: types.ADD_ITEM_TO_CART,
        payload: item,
    }),

    addItemToFavorites: (item) => ({
        type: types.ADD_ITEM_TO_FAVORITES,
        payload: item,
    }),

    removeItemFromFavorites: (item) => ({
        type: types.REMOVE_ITEM_FROM_FAVORITES,
        payload: item,
    }),

    //Async
    addItemToCartAsync: (item) => ({
        type: types.ADD_ITEM_TO_CART_ASYNC,
        payload: item,
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
};
