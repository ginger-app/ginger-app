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
    orders: [],

    // displaying stuff
    marketItemChosenLocations: [],
    ordersCombinations: [],
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

        case types.FILL_CLIENT_ORDERS:
            return state.set('orders', action.payload);

        case types.FILL_SUPPLIER_ORDERS:
            return state.set('orders', action.payload);

        case types.FILL_MARKET_ITEM_CHOSEN_LOCATIONS:
            return state.set('marketItemChosenLocations', action.payload);

        case types.FILL_ORDERS_COMBINATIONS:
            return state.set('ordersCombinations', action.payload);

        default:
            return state;
    }
};
