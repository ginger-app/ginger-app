// Types
import { authTypes as types } from './types';

export const authActions = {
    // Sync
    authenticate: () => ({ type: types.AUTHENTICATE_USER }),
    signOut: () => ({ type: types.SIGN_OUT }),

    // Async
    getAuthConfirmationCodeAsync: (phoneNumber) => ({
        type: types.GET_AUTH_CONFIRMATION_CODE_ASYNC,
        payload: phoneNumber,
    }),
};
