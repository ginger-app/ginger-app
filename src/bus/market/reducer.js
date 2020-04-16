// Core
import { Map, List, fromJS } from 'immutable';

// Types
import { marketTypes as types } from './types';

const initialState = Map({
    categories: List([]),
    categoryData: Map({}),
});

export const marketReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_MARKET_CATEGORIES:
            return state.set('categories', fromJS(action.payload.categories));

        case types.FILL_MARKET_CATEGORY_DATA:
            return state.set('categoryData', fromJS(action.payload.data));

        default:
            return initialState;
    }
};
