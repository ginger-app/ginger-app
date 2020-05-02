// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { Api } from 'api';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';
import { authActions } from 'bus/auth/actions';

export function* signupWorker({ payload: { phoneNumber, code, userData } }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(Api, Api.auth.confirmSignupCode, [
            {
                // removing all spaces from phone number
                ...userData,
                phoneNumber: phoneNumber.split(' ').join(''),
                code,
            },
        ]);
        const result = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(result.message);

        yield put(profileActions.fillProfile(result.userData));
        yield put(authActions.authenticate());
        yield put(uiActions.hideAllOverlays());
    } catch (err) {
        yield put(uiActions.emitError(err, '-> signupWorker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
