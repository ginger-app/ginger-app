// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { profileActions } from 'bus/profile/profile.actions';
import { authActions } from 'bus/auth/auth.actions';

// Instruments

// Api
import { Api } from 'api';

export function* getUserDataWorker() {
    try {
        const response = yield apply(Api, Api.users.getCurrentUserData);
        const { message, data } = yield apply(response, response.json);

        if (response.status >= 400) {
            throw new Error(message);
        }

        yield put(profileActions.fillProfile(data));
        yield put(authActions.authenticate());
        yield put(uiActions.hideAllOverlays());
    } catch (err) {
        yield put(uiActions.emitError(err, '-> getUserDataWorker'));
    }
}
