// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { authTypes as types } from '../types';

// Workers
import { signinWorker, codeConfirmationWorker } from './workers';

function* watchSignin() {
    yield takeEvery(types.GET_AUTH_CONFIRMATION_CODE_ASYNC, signinWorker);
}
function* watchCodeConfirmation() {
    yield takeEvery(types.SEND_CONFIRMATION_CODE_ASYNC, codeConfirmationWorker);
}

export function* watchAuth() {
    yield all([call(watchSignin), call(watchCodeConfirmation)]);
}
