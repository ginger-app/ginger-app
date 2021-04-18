import { SortingOptions } from 'domains/market/hooks/useMarket';

export const marketTypes = {
    // Sync
    FILL_MARKET_CATEGORIES: 'FILL_MARKET_CATEGORIES',
    FILL_MARKET_CATEGORY_DATA: 'FILL_MARKET_CATEGORY_DATA',
    FILL_MARKET_SUBCATEGORY_DATA: 'FILL_MARKET_SUBCATEGORY_DATA',
    FILL_PRODUCT_DATA: 'FILL_PRODUCT_DATA',
    FILL_ORDER_DATA: 'FILL_ORDER_DATA',
    CLEAR_MARKET_CATEGORY_DATA: 'CLEAR_MARKET_CATEGORY_DATA',
    CLEAR_MARKET_SUBCATEGORY_DATA: 'CLEAR_MARKET_SUBCATEGORY_DATA',
    CLEAR_PRODUCT_DATA: 'CLEAR_PRODUCT_DATA',
    CLEAR_ORDER_DATA: 'CLEAR_ORDER_DATA',
    FILL_SEARCH_RESULTS: 'FILL_SEARCH_RESULTS',
    CLEAR_SEARCH_RESULTS: 'CLEAR_SEARCH_RESULTS',
    SET_SORTING_OPTION: 'SET_SORTING_OPTION',
    CLEAR_SORTING_OPTION: 'CLEAR_SORTING_OPTION',

    // Async
    GET_MARKET_CATEGORIES_ASYNC: 'GET_MARKET_CATEGORIES_ASYNC',
    GET_MARKET_CATEGORY_DATA_ASYNC: 'GET_MARKET_CATEGORY_DATA_ASYNC',
    GET_MARKET_SUBCATEGORY_DATA_ASYNC: 'GET_MARKET_SUBCATEGORY_DATA_ASYNC',
    GET_PRODUCT_DATA_ASYNC: 'GET_PRODUCT_DATA_ASYNC',
    GET_ORDER_DATA_ASYNC: 'GET_ORDER_DATA_ASYNC',
    SEARCH_ITEMS_BY_NAME_ASYNC: 'SEARCH_ITEMS_BY_NAME_ASYNC',
    SEND_ORDERS_ASYNC: 'SEND_ORDERS_ASYNC',
};

type SetSortingOption = {
    type: typeof marketTypes.SET_SORTING_OPTION;
    payload: Record<'option', SortingOptions>;
};

type ClearSortingOption = {
    type: typeof marketTypes.CLEAR_SORTING_OPTION;
};

export type MarketItem = {
    category: string;
    image: string;
    maxPrice: number;
    minPrice: number;
    name: string;
    prices: Record<string, number>;
    stock: Record<string, number>;
    suppliers: string[];
    unit: string;
    _id: string;
};

export type MarketCategories = {
    filteringOptions: unknown[];
    image: string;
    items: MarketItem[];
};

type FillMarketCategories = {
    type: typeof marketTypes.FILL_MARKET_CATEGORIES;
    payload: Record<'categories', MarketCategories>;
};

export type MarketCategoryData = {
    items: MarketItem[];
    filteringOptions: unknown[];
    image: string;
    _id: string;
    name: string;
};

type FillMarketCategoryData = {
    type: typeof marketTypes.FILL_MARKET_CATEGORY_DATA;
    payload: Record<'data', MarketCategoryData>;
};

type FillMarketSubcategoryData = {
    type: typeof marketTypes.FILL_MARKET_SUBCATEGORY_DATA;
    payload: Record<'data', any>;
};

type FillProductData = {
    type: typeof marketTypes.FILL_PRODUCT_DATA;
    payload: Record<'data', any>;
};

type FillOrderData = {
    type: typeof marketTypes.FILL_ORDER_DATA;
    payload: Record<'data', any>;
};

type FillSearchResults = {
    type: typeof marketTypes.FILL_SEARCH_RESULTS;
    payload: Record<'items', any>;
};

// Clearing
type ClearMarketCategoryData = {
    type: typeof marketTypes.CLEAR_MARKET_CATEGORY_DATA;
};

type ClearMarketSubcategoryData = {
    type: typeof marketTypes.CLEAR_MARKET_SUBCATEGORY_DATA;
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

type GetMarketSubcategoryDataAsync = {
    type: typeof marketTypes.GET_MARKET_SUBCATEGORY_DATA_ASYNC;
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
    payload: Record<'orders', any>;
};

export type MarketActionsType =
    | SetSortingOption
    | ClearSortingOption
    | FillMarketCategories
    | FillMarketCategoryData
    | FillMarketSubcategoryData
    | FillProductData
    | FillOrderData
    | FillSearchResults
    | ClearMarketCategoryData
    | ClearMarketSubcategoryData
    | ClearProductData
    | ClearOrderData
    | ClearSearchResults
    | GetMarketCategoriesAsync
    | GetMarketCategoryDataAsync
    | GetMarketSubcategoryDataAsync
    | GetProductDataAsync
    | GetOrderDataAsync
    | SearchItemsByNameAsync
    | SendOrdersAsync;
