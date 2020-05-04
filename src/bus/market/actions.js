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

    fillMarketSubcategoryData: (data) => ({
        type: types.FILL_MARKET_SUBCATEGORY_DATA,
        payload: { data },
    }),

    fillProductData: (data) => ({
        type: types.FILL_PRODUCT_DATA,
        payload: { data },
    }),

    clearProductData: () => ({
        type: types.CLEAR_PRODUCT_DATA,
    }),

    // Async
    getMarketCategoriesAsync: () => ({
        type: types.GET_MARKET_CATEGORIES_ASYNC,
    }),

    getMarketCategoryDataAsync: (sku) => ({
        type: types.GET_MARKET_CATEGORY_DATA_ASYNC,
        payload: { sku },
    }),

    getMarketSubcategoryDataAsync: (sku) => ({
        type: types.GET_MARKET_SUBCATEGORY_DATA_ASYNC,
        payload: { sku },
    }),

    getProductDataAsync: (sku) => ({
        type: types.GET_PRODUCT_DATA_ASYNC,
        payload: { sku },
    }),
};
