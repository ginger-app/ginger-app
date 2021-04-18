// Types
import {
    MarketCategoryData,
    MarketCategories,
    MarketActionsType,
    marketTypes as types,
} from './market.types';
import { SortingOptions } from 'domains/market/hooks/useMarket';

export const marketActions = {
    // Sync
    setSortingOption: (option: SortingOptions): MarketActionsType => ({
        type: types.SET_SORTING_OPTION,
        payload: { option },
    }),

    clearSortingOption: (): MarketActionsType => ({
        type: types.CLEAR_SORTING_OPTION,
    }),

    // Filling
    fillMarketCategories: (categories: MarketCategories): MarketActionsType => ({
        type: types.FILL_MARKET_CATEGORIES,
        payload: { categories },
    }),

    fillMarketCategoryData: (data: MarketCategoryData): MarketActionsType => ({
        type: types.FILL_MARKET_CATEGORY_DATA,
        payload: { data },
    }),

    fillMarketSubcategoryData: (data: Record<string, any>): MarketActionsType => ({
        type: types.FILL_MARKET_SUBCATEGORY_DATA,
        payload: { data },
    }),

    fillProductData: (data: Record<string, any>): MarketActionsType => ({
        type: types.FILL_PRODUCT_DATA,
        payload: { data },
    }),

    fillOrderData: (data: Record<string, any>): MarketActionsType => ({
        type: types.FILL_ORDER_DATA,
        payload: { data },
    }),

    fillSearchResults: (items: Record<string, any>): MarketActionsType => ({
        type: types.FILL_SEARCH_RESULTS,
        payload: { items },
    }),

    // Clearing
    clearMarketCategoryData: (): MarketActionsType => ({
        type: types.CLEAR_MARKET_CATEGORY_DATA,
    }),

    clearMarketSubcategoryData: (): MarketActionsType => ({
        type: types.CLEAR_MARKET_SUBCATEGORY_DATA,
    }),

    clearProductData: (): MarketActionsType => ({
        type: types.CLEAR_PRODUCT_DATA,
    }),

    clearOrderData: (): MarketActionsType => ({
        type: types.CLEAR_ORDER_DATA,
    }),

    clearSearchResults: (): MarketActionsType => ({
        type: types.CLEAR_SEARCH_RESULTS,
    }),

    // Async
    getMarketCategoriesAsync: (): MarketActionsType => ({
        type: types.GET_MARKET_CATEGORIES_ASYNC,
    }),

    getMarketCategoryDataAsync: (id: string): MarketActionsType => ({
        type: types.GET_MARKET_CATEGORY_DATA_ASYNC,
        payload: { id },
    }),

    getMarketSubcategoryDataAsync: (id: string): MarketActionsType => ({
        type: types.GET_MARKET_SUBCATEGORY_DATA_ASYNC,
        payload: { id },
    }),

    getProductDataAsync: (id: string): MarketActionsType => ({
        type: types.GET_PRODUCT_DATA_ASYNC,
        payload: { id },
    }),

    getOrderDataAsync: (id: string): MarketActionsType => ({
        type: types.GET_ORDER_DATA_ASYNC,
        payload: { id },
    }),

    searchItemsByNameAsync: (itemName: string): MarketActionsType => ({
        type: types.SEARCH_ITEMS_BY_NAME_ASYNC,
        payload: { itemName },
    }),

    sendOrdersAsync: (orders: unknown[]): MarketActionsType => ({
        type: types.SEND_ORDERS_ASYNC,
        payload: { orders },
    }),
};
