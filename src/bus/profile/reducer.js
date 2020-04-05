// Core
import { Map } from 'immutable';

// Types
import { profileTypes as types } from './types';

const initialState = Map({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',

    addresses: [],
    orders: [],
    cards: [],
    bonuses: 0,

    registrationDate: '',
    averageSessionDuration: 0,
    lastVisit: '',

    isAdmin: false,
    isWorker: false,
});

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_PROFILE:
            return state.mergeDeep(action.payload);
    }
};
