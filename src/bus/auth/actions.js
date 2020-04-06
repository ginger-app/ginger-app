// Types
import { authTypes as types } from './types';

export const authActions = {
    // Sync
    authenticate: () => ({ type: types.AUTHENTICATE_USER }),
    openLoginCodeConfirmation: () => ({ type: types.OPEN_LOGIN_CODE_CONFIRMATION }),
    closeLoginCodeConfirmation: () => ({ type: types.CLOSE_LOGIN_CODE_CONFIRMATION }),
    signOut: () => ({ type: types.SIGN_OUT }),

    // Async
    getAuthConfirmationCodeAsync: (phoneNumber) => ({
        type: types.GET_AUTH_CONFIRMATION_CODE_ASYNC,
        payload: phoneNumber,
    }),

    sendConfirmationCodeAsync: ({ phoneNumber, code }) => ({
        type: types.SEND_CONFIRMATION_CODE_ASYNC,
        payload: { phoneNumber, code },
    }),
};
