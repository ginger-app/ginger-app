// Types
import { marketTypes as types } from './types';

export const marketActions = {
    // Sync
    fillMarketCategories: (categories) => ({
        type: types.FILL_MARKET_CATEGORIES,
        payload: { categories },
    }),

    fillMarketCategoryData: (data) => ({
        type: types.FILL_MARKET_CATEGORY_DATA,
        payload: { data },
    }),

    // Async
    getMarketCategoriesAsync: () => ({
        type: types.GET_MARKET_CATEGORIES_ASYNC,
    }),

    getMarketCategoryDataAsync: (sku) => ({
        type: types.GET_MARKET_CATEGORY_DATA_ASYNC,
        payload: { sku },
    }),
};
