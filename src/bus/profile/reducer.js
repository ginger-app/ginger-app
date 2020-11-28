// Core
import { Map } from 'immutable';

// Types
import { profileTypes as types } from './types';

const initialState = Map({
    _id: '',
    name: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    lastVisit: '',
    role: '',
    userpic: null,
    paymentMethods: [],
    locations: [],
    analyticsData: [],
    previewData: [],
    orders: {
        suppliers: [],
        locations: [],
        data: [],
    },

    // displaying stuff
    marketItemChosenLocations: [],
});

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_PROFILE:
            return state.merge(action.payload);

        case types.CLEAR_PROFILE:
            return initialState;

        case types.FILL_SUPPLIER_PREVIEW:
            return state.set('previewData', action.payload);

        case types.UPDATE_PREVIEW_DATA:
            return state.set('previewData', action.payload);

        case types.FILL_CLIENT_LOCATIONS:
            return state.set('locations', action.payload);

        case types.FILL_MARKET_ITEM_CHOSEN_LOCATIONS:
            return state.set('marketItemChosenLocations', action.payload);

        // Deprecated
        case types.UPDATE_CART:
            return state.set('cart', action.payload);

        case types.ADD_ITEM_TO_FAVORITES:
            return state.set('favorites', { ...state.get('favorites'), [action.payload]: true });

        case types.REMOVE_ITEM_FROM_FAVORITES:
            const newFavorites = { ...state.get('favorites') };
            delete newFavorites[action.payload];

            return state.set('favorites', newFavorites);

        default:
            return state;
    }
};
