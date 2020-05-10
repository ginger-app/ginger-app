// Core
import { Map } from 'immutable';

// Types
import { profileTypes as types } from './types';

// Temp
import userpic from 'theme/assets/images/ginger.jpg';

const initialState = Map({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',

    addresses: [],
    orders: [],
    cards: [],
    lists: [],
    favorites: {},
    cart: {},
    bonuses: 0,

    registrationDate: '',
    averageSessionDuration: 0,
    lastVisit: '',

    isAdmin: false,
    isWorker: false,

    userpic,
});

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_PROFILE:
            return state.mergeDeep(action.payload);

        case types.CLEAR_PROFILE:
            return state.clear();

        case types.ADD_ITEM_TO_CART:
            return state.set('cart', action.payload);

        case types.ADD_ITEM_TO_FAVORITES:
            return state.set('favorites', { ...state.get('favorites'), [action.payload]: true });

        case types.REMOVE_ITEM_FROM_FAVORITES:
            return state.set('favorites', { ...state.get('favorites'), [action.payload]: false });

        default:
            return state;
    }
};
