// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { Api } from 'api';

// Actions
import { uiActions } from 'bus/ui/actions';

export function* signupCodeWorker({ payload: phoneNumber }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(Api, Api.auth.getSignupCode, [
            // removing all spaces from phone number
            phoneNumber.split(' ').join(''),
        ]);
        const result = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(result.message);

        yield put(uiActions.showCodeConfirmationOverlay());
    } catch (err) {
        if (err.message === 'User already exists') {
            yield put(uiActions.showLoginOverlay());
            yield put(uiActions.hideSignupOverlay());
            // here we should probably show some toaster
        }
        yield put(uiActions.emitError(err, '-> signupWorker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
