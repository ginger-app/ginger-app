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
            const offlineFavorites = state.get('favorites');
            const offlineCart = state.get('cart');

            return state.merge({
                ...action.payload,
                cart: offlineCart,
                favorites: {
                    ...action.payload.favorites,
                    ...offlineFavorites,
                },
            });

        case types.CLEAR_PROFILE:
            return state;

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
