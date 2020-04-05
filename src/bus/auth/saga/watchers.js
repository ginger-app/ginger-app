// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { authTypes as types } from '../types';

// Workers
import { signinWorker } from './workers';

function* watchSignin() {
    yield takeEvery(types.GET_AUTH_CONFIRMATION_CODE_ASYNC, signinWorker);
}

export function* watchAuth() {
    yield all([call(watchSignin)]);
}
