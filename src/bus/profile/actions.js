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

    //Async
    addItemToCartAsync: (item) => ({
        type: types.ADD_ITEM_TO_CART_ASYNC,
        payload: item,
    }),
};
