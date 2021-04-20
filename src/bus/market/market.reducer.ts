// Core
import { AnyAction } from 'redux';
import { SortingOptions } from 'domains/market/hooks/useMarket';
import { MarketCategory, MarketItem, Order } from 'domains/market/types';

// Types
import { marketTypes as types } from './market.types';

const initialState = Object.freeze({
    categories: [] as MarketCategory[],
    categoryData: {} as MarketCategory,
    productData: {} as MarketItem,
    orderData: {} as Order,
    searchResults: [] as MarketItem[],
    sortingOption: null as SortingOptions | null,
});

export type MarketState = typeof initialState;

export const marketReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case types.SET_SORTING_OPTION:
            return Object.freeze({
                ...state,
                sortingOption: action.payload.option,
            });

        case types.CLEAR_SORTING_OPTION:
            return Object.freeze({
                ...state,
                sortingOption: null,
            });

        // FILLING
        case types.FILL_MARKET_CATEGORIES:
            return Object.freeze({
                ...state,
                categories: action.payload.categories,
            });

        case types.FILL_MARKET_CATEGORY_DATA:
            return Object.freeze({
                ...state,
                categoryData: action.payload.data,
            });

        case types.FILL_PRODUCT_DATA:
            return Object.freeze({
                ...state,
                productData: action.payload.data,
            });

        case types.FILL_ORDER_DATA:
            return Object.freeze({
                ...state,
                orderData: action.payload.data,
            });

        case types.FILL_SEARCH_RESULTS:
            return Object.freeze({
                ...state,
                searchResults: action.payload.items,
            });

        // CLEARING
        case types.CLEAR_MARKET_CATEGORY_DATA:
            return Object.freeze({
                ...state,
                categoryData: {},
            });

        case types.CLEAR_PRODUCT_DATA:
            return Object.freeze({
                ...state,
                productData: {},
            });

        case types.CLEAR_ORDER_DATA:
            return Object.freeze({
                ...state,
                orderData: {},
            });

        case types.CLEAR_SEARCH_RESULTS:
            return Object.freeze({
                ...state,
                searchResults: [],
            });

        default:
            return state;
    }
};
