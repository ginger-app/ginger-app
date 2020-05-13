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
});

export const marketReducer = (state = initialState, action) => {
    switch (action.type) {
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

        case types.CLEAR_PRODUCT_DATA:
            return state.set('productData', Map({}));

        case types.CLEAR_ORDER_DATA:
            return state.set('orderData', Map({}));

        default:
            return state;
    }
};
