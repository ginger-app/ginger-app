// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/profile.actions';
import { authActions } from 'bus/auth/auth.actions';

// Instruments
import { ErrorHandler } from 'bus/utils';
import { history } from 'bus/init/middleware/core';

// Api
import { Api } from 'api';

export function* logoutWorker() {
    try {
        const response = yield apply(Api, Api.auth.logout);

        if (response.status >= 400) {
            yield apply(ErrorHandler, ErrorHandler, [response]);
            throw new Error(response.message);
        }

        yield put(authActions.logout());
        yield put(profileActions.clearProfile());
        yield apply(history, history.push, ['/']);
    } catch (err) {
        yield put(uiActions.emitError(err, '-> logoutWorker'));
    }
}
