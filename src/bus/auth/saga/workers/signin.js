// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { Api } from 'api';

// Actions
import { uiActions } from 'bus/ui/actions';

export function* signinWorker({ payload: phoneNumber }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(Api, Api.auth.getAuthenticationCode, [
            // removing all spaces from phone number
            phoneNumber.split(' ').join(''),
        ]);
        const result = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(result.message);

        yield put(uiActions.showCodeConfirmationOverlay());
    } catch (err) {
        if (err.message === 'No such user found') {
            yield put(uiActions.showSignupOverlay());
            // here we should probably show some toaster
        }
        yield put(uiActions.emitError(err, '-> signinWorker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
