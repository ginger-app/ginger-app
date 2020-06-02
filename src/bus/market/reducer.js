// Core
import { Map, List, fromJS } from 'immutable';

// Types
import { marketTypes as types } from './types';

const initialState = Map({
    categories: List([]),
    categoryData: Map({}),
    subcategoryData: Map({}),
    productData: Map({}),
    orderData: Map({}),
    searchResults: List(),
});

export const marketReducer = (state = initialState, action) => {
    switch (action.type) {
        // FILLING
        case types.FILL_MARKET_CATEGORIES:
            return state.set('categories', fromJS(action.payload.categories));

        case types.FILL_MARKET_CATEGORY_DATA:
            return state.set('categoryData', fromJS(action.payload.data));

        case types.FILL_MARKET_SUBCATEGORY_DATA:
            return state.set('subcategoryData', fromJS(action.payload.data));

        case types.FILL_PRODUCT_DATA:
            return state.set('productData', fromJS(action.payload.data));

        case types.FILL_ORDER_DATA:
            return state.set('orderData', fromJS(action.payload.data));

        case types.FILL_SEARCH_RESULTS:
            return state.set('searchResults', fromJS(action.payload.items));

        // CLEARING
        case types.CLEAR_MARKET_CATEGORY_DATA:
            return state.set('categoryData', Map({}));

        case types.CLEAR_MARKET_SUBCATEGORY_DATA:
            return state.set('subcategoryData', Map({}));

        case types.CLEAR_PRODUCT_DATA:
            return state.set('productData', Map({}));

        case types.CLEAR_ORDER_DATA:
            return state.set('orderData', Map({}));

        case types.CLEAR_SEARCH_RESULTS:
            return state.set('searchResults', List());

        default:
            return state;
    }
};
