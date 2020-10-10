// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { authTypes as types } from '../types';

// Workers
import {
    getSigninCodeWorker,
    signin,
    getSignupCode,
    signupWorker,
    getGmapsKeyWorker,
    logout,
} from './workers';

function* watchSignin() {
    yield takeEvery(types.GET_SIGNIN_CONFIRMATION_CODE_ASYNC, getSigninCodeWorker);
}
function* watchSignout() {
    yield takeEvery(types.SIGN_OUT_ASYNC, logout);
}
function* watchCodeConfirmation() {
    yield takeEvery(types.SIGNIN_ASYNC, signin);
}
function* watchSignupCode() {
    yield takeEvery(types.GET_SIGNUP_CONFIRMATION_CODE_ASYNC, getSignupCode);
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
        call(watchSignout),
        call(watchCodeConfirmation),
        call(watchSignupCode),
        call(watchSignup),
        call(watchGetGoogleMapsKey),
    ]);
}
