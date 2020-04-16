// Core
import { Map, List, fromJS } from 'immutable';

// Types
import { marketTypes as types } from './types';

const initialState = Map({
    categories: List([]),
});

export const marketReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_MARKET_CATEGORIES:
            return state.set('categories', fromJS(action.payload));

        default:
            return initialState;
    }
};
