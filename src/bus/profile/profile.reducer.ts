// Core
import { AnyAction } from 'redux';

// Types
import { profileTypes as types } from './profile.types';

const initialState = Object.freeze({
    _id: '',
    name: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    lastVisit: '',
    role: '',
    userpic: null,
    paymentMethods: [] as Record<string, any>[],
    locations: [] as Record<string, any>[],
    analyticsData: [] as Record<string, any>[],
    previewData: [] as Record<string, any>[],
    orders: [] as Record<string, any>[],

    // displaying stuff
    marketItemChosenLocations: [] as Record<string, any>[],
    ordersCombinations: [] as Record<string, any>[],
});

export type ProfileState = typeof initialState;

export const profileReducer = (state = initialState, action: AnyAction): ProfileState => {
    switch (action.type) {
        case types.FILL_PROFILE:
            return Object.freeze({
                ...state,
                ...action.payload,
            });

        case types.CLEAR_PROFILE:
            return initialState;

        case types.FILL_SUPPLIER_PREVIEW:
            return Object.freeze({
                ...state,
                previewData: action.payload,
            });

        case types.UPDATE_PREVIEW_DATA:
            return Object.freeze({
                ...state,
                previewData: action.payload,
            });

        case types.FILL_CLIENT_LOCATIONS:
            return Object.freeze({
                ...state,
                locations: action.payload,
            });

        case types.FILL_CLIENT_ORDERS:
            return Object.freeze({
                ...state,
                orders: action.payload,
            });

        case types.FILL_SUPPLIER_ORDERS:
            return Object.freeze({
                ...state,
                orders: action.payload,
            });

        case types.FILL_MARKET_ITEM_CHOSEN_LOCATIONS:
            return Object.freeze({
                ...state,
                marketItemChosenLocations: action.payload,
            });

        case types.FILL_ORDERS_COMBINATIONS:
            return Object.freeze({
                ...state,
                ordersCombinations: action.payload,
            });

        default:
            return state;
    }
};
