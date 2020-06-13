// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { history } from 'bus/init/middleware/core';
import { profileActions } from 'bus/profile/actions';
import { authActions } from 'bus/auth/actions';

export function* logout() {
    // ? maybe we should add disabling token functionality on backend?
    // ? if so -> add try..catch

    yield put(authActions.logout());
    yield put(profileActions.clearProfile());
    yield apply(history, history.push, ['/']);
}
