// Types
import { marketTypes as types } from './types';

export const marketActions = {
    // Sync
    fillMarketCategories: (categories) => ({
        type: types.FILL_MARKET_CATEGORIES,
        payload: categories,
    }),

    // Async
    getMarketCategoriesAsync: () => ({
        type: types.GET_MARKET_CATEGORIES_ASYNC,
    }),
};
