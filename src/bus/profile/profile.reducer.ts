// Core
import { OrderCombination } from 'bus/ui/ui.types';
import { Location } from 'domains/client/hooks/useClientLocations';
import { Order } from 'domains/market/types';
import { SupplierPreviewItem } from 'domains/supplier/types';

// Types
import { ProfileActions, profileTypes as types } from './profile.types';

const initialState = Object.freeze({
    _id: '',
    name: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    lastVisit: '',
    role: '',
    userpic: '',
    paymentMethods: [] as Record<string, any>[],
    locations: [] as Location[],
    analyticsData: [] as Record<string, any>[],
    previewData: [] as SupplierPreviewItem[],
    orders: [] as Order[],

    // displaying stuff
    ordersCombinations: [] as OrderCombination[],
});

export type ProfileState = typeof initialState;

export const profileReducer = (state = initialState, action: ProfileActions): ProfileState => {
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

        case types.FILL_ORDERS_COMBINATIONS:
            return Object.freeze({
                ...state,
                ordersCombinations: action.payload,
            });

        default:
            return state;
    }
};
