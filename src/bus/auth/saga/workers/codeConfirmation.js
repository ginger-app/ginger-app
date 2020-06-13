// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { Api } from 'api';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

export function* codeConfirmationWorker({ payload: { phoneNumber, code } }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(Api, Api.auth.confirmAuthenticationCode, [
            {
                // removing all spaces from phone number
                phoneNumber: phoneNumber.split(' ').join(''),
                code,
            },
        ]);
        const { tokens, message } = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(message);

        yield apply(localStorage, localStorage.setItem, ['ginger-token', tokens.accessToken]);
        yield apply(localStorage, localStorage.setItem, ['ginger-refresh', tokens.refreshToken]);
        yield put(profileActions.getUserDataAsync(tokens));
    } catch (err) {
        yield put(uiActions.emitError(err, '-> codeConfirmationWorker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
