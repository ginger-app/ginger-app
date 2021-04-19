import { SortingOptions } from 'domains/market/hooks/useMarket';
import { MarketItem, Order, MarketCategory, NewOrder } from 'domains/market/types';

export const marketTypes = {
    // Sync
    FILL_MARKET_CATEGORIES: 'FILL_MARKET_CATEGORIES',
    FILL_MARKET_CATEGORY_DATA: 'FILL_MARKET_CATEGORY_DATA',
    FILL_PRODUCT_DATA: 'FILL_PRODUCT_DATA',
    FILL_ORDER_DATA: 'FILL_ORDER_DATA',
    CLEAR_MARKET_CATEGORY_DATA: 'CLEAR_MARKET_CATEGORY_DATA',
    CLEAR_PRODUCT_DATA: 'CLEAR_PRODUCT_DATA',
    CLEAR_ORDER_DATA: 'CLEAR_ORDER_DATA',
    FILL_SEARCH_RESULTS: 'FILL_SEARCH_RESULTS',
    CLEAR_SEARCH_RESULTS: 'CLEAR_SEARCH_RESULTS',
    SET_SORTING_OPTION: 'SET_SORTING_OPTION',
    CLEAR_SORTING_OPTION: 'CLEAR_SORTING_OPTION',

    // Async
    GET_MARKET_CATEGORIES_ASYNC: 'GET_MARKET_CATEGORIES_ASYNC',
    GET_MARKET_CATEGORY_DATA_ASYNC: 'GET_MARKET_CATEGORY_DATA_ASYNC',
    GET_PRODUCT_DATA_ASYNC: 'GET_PRODUCT_DATA_ASYNC',
    GET_ORDER_DATA_ASYNC: 'GET_ORDER_DATA_ASYNC',
    SEARCH_ITEMS_BY_NAME_ASYNC: 'SEARCH_ITEMS_BY_NAME_ASYNC',
    SEND_ORDERS_ASYNC: 'SEND_ORDERS_ASYNC',
} as const;

type SetSortingOption = {
    type: typeof marketTypes.SET_SORTING_OPTION;
    payload: Record<'option', SortingOptions>;
};

type ClearSortingOption = {
    type: typeof marketTypes.CLEAR_SORTING_OPTION;
};

type FillMarketCategories = {
    type: typeof marketTypes.FILL_MARKET_CATEGORIES;
    payload: Record<'categories', MarketCategory[]>;
};

type FillMarketCategoryData = {
    type: typeof marketTypes.FILL_MARKET_CATEGORY_DATA;
    payload: Record<'data', MarketCategory>;
};

type FillProductData = {
    type: typeof marketTypes.FILL_PRODUCT_DATA;
    payload: Record<'data', MarketItem>;
};

type FillOrderData = {
    type: typeof marketTypes.FILL_ORDER_DATA;
    payload: Record<'data', Order>;
};

type FillSearchResults = {
    type: typeof marketTypes.FILL_SEARCH_RESULTS;
    payload: Record<'items', MarketItem[]>;
};

// Clearing
type ClearMarketCategoryData = {
    type: typeof marketTypes.CLEAR_MARKET_CATEGORY_DATA;
};

type ClearProductData = {
    type: typeof marketTypes.CLEAR_PRODUCT_DATA;
};

type ClearOrderData = {
    type: typeof marketTypes.CLEAR_ORDER_DATA;
};

type ClearSearchResults = {
    type: typeof marketTypes.CLEAR_SEARCH_RESULTS;
};

// Async
type GetMarketCategoriesAsync = {
    type: typeof marketTypes.GET_MARKET_CATEGORIES_ASYNC;
};

type GetMarketCategoryDataAsync = {
    type: typeof marketTypes.GET_MARKET_CATEGORY_DATA_ASYNC;
    payload: Record<'id', string>;
};

type GetProductDataAsync = {
    type: typeof marketTypes.GET_PRODUCT_DATA_ASYNC;
    payload: Record<'id', string>;
};

type GetOrderDataAsync = {
    type: typeof marketTypes.GET_ORDER_DATA_ASYNC;
    payload: Record<'id', string>;
};

type SearchItemsByNameAsync = {
    type: typeof marketTypes.SEARCH_ITEMS_BY_NAME_ASYNC;
    payload: Record<'itemName', string>;
};

type SendOrdersAsync = {
    type: typeof marketTypes.SEND_ORDERS_ASYNC;
    payload: Record<'orders', NewOrder[]>;
};

export type MarketActionsType =
    | SetSortingOption
    | ClearSortingOption
    | FillMarketCategories
    | FillMarketCategoryData
    | FillProductData
    | FillOrderData
    | FillSearchResults
    | ClearMarketCategoryData
    | ClearProductData
    | ClearOrderData
    | ClearSearchResults
    | GetMarketCategoriesAsync
    | GetMarketCategoryDataAsync
    | GetProductDataAsync
    | GetOrderDataAsync
    | SearchItemsByNameAsync
    | SendOrdersAsync;
