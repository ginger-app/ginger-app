// Types
import { marketTypes as types } from './types';

export const marketActions = {
    // Sync

    // Filling
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

    fillOrderData: (data) => ({
        type: types.FILL_ORDER_DATA,
        payload: { data },
    }),

    fillSearchResults: (items) => ({
        type: types.FILL_SEARCH_RESULTS,
        payload: { items },
    }),

    // Clearing
    clearMarketCategoryData: () => ({
        type: types.CLEAR_MARKET_CATEGORY_DATA,
    }),

    clearMarketSubcategoryData: () => ({
        type: types.CLEAR_MARKET_SUBCATEGORY_DATA,
    }),

    clearProductData: () => ({
        type: types.CLEAR_PRODUCT_DATA,
    }),

    clearOrderData: () => ({
        type: types.CLEAR_ORDER_DATA,
    }),

    clearSearchResults: () => ({
        type: types.CLEAR_SEARCH_RESULTS,
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

    getOrderDataAsync: (id) => ({
        type: types.GET_ORDER_DATA_ASYNC,
        payload: { id },
    }),

    createNewOrderAsync: (orderData) => ({
        type: types.CREATE_NEW_ORDER_ASYNC,
        payload: { orderData },
    }),

    searchItemsByNameAsync: (itemName) => ({
        type: types.SEARCH_ITEMS_BY_NAME_ASYNC,
        payload: { itemName },
    }),
};
