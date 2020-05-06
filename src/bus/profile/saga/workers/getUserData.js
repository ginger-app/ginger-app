// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';
import { authActions } from 'bus/auth/actions';

// Api
import { Api } from 'api';

export function* getUserDataWorker() {
    try {
        const response = yield apply(Api, Api.profile.getCurrentUserData);
        const { message, userData } = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(message);

        yield put(profileActions.fillProfile(userData));
        yield put(authActions.authenticate());
        yield put(uiActions.hideAllOverlays());
    } catch (err) {
        yield put(uiActions.emitError(err, '-> getUserDataWorker'));
    }
}
