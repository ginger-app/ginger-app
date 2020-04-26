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
    cart: [],
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
            const currentCart = state.get('cart');
            return state.set('cart', [...currentCart, action.payload]);

        default:
            return state;
    }
};
