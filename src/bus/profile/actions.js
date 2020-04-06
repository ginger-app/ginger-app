//Types
import { profileTypes as types } from './types';

export const profileActions = {
    //Sync
    fillProfile: (userData) => ({
        type: types.FILL_PROFILE,
        payload: userData,
    }),

    clearProfile: () => ({
        type: types.CLEAR_PROFILE,
    }),
    //Async
};
