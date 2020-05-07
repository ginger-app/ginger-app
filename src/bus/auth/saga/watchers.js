// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { authTypes as types } from '../types';

// Workers
import {
    signinWorker,
    codeConfirmationWorker,
    signupCodeWorker,
    signupWorker,
    getGmapsKeyWorker,
} from './workers';

function* watchSignin() {
    yield takeEvery(types.GET_AUTH_CONFIRMATION_CODE_ASYNC, signinWorker);
}
function* watchCodeConfirmation() {
    yield takeEvery(types.SEND_CONFIRMATION_CODE_ASYNC, codeConfirmationWorker);
}
function* watchSignupCode() {
    yield takeEvery(types.GET_SIGNUP_CONFIRMATION_CODE_ASYNC, signupCodeWorker);
}
function* watchSignup() {
    yield takeEvery(types.SEND_SIGNUP_DATA_ASYNC, signupWorker);
}
function* watchGetGoogleMapsKey() {
    yield takeEvery(types.GET_GOOGLE_MAPS_KEY_ASYNC, getGmapsKeyWorker);
}

export function* watchAuth() {
    yield all([
        call(watchSignin),
        call(watchCodeConfirmation),
        call(watchSignupCode),
        call(watchSignup),
        call(watchGetGoogleMapsKey),
    ]);
}
