// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { Api } from 'api';

// Actions
import { uiActions } from 'bus/ui/actions';
import { authActions } from 'bus/auth/auth.actions';
import { profileActions } from 'bus/profile/profile.actions';

export function* signin({ payload: { phoneNumber, code } }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(Api, Api.auth.signin, [
            {
                // removing all spaces from phone number
                phoneNumber: phoneNumber.split(' ').join(''),
                code,
            },
        ]);
        const { message, user, accessToken, expiresAt } = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(message);

        yield put(authActions.setAccessToken({ accessToken, expiresAt }));
        yield put(profileActions.fillProfile(user));
        yield put(authActions.authenticate());
        yield put(uiActions.hideAllOverlays());
    } catch (err) {
        yield put(uiActions.emitError(err, '-> signin'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
