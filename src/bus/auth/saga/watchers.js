// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { authTypes as types } from '../auth.types';

// Workers
import { getSigninCodeWorker, signin, getSignupCode, signupWorker, logoutWorker } from './workers';

function* watchSignin() {
    yield takeEvery(types.GET_SIGNIN_CONFIRMATION_CODE_ASYNC, getSigninCodeWorker);
}
function* watchSignout() {
    yield takeEvery(types.LOG_OUT_ASYNC, logoutWorker);
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

export function* watchAuth() {
    yield all([
        call(watchSignin),
        call(watchSignout),
        call(watchCodeConfirmation),
        call(watchSignupCode),
        call(watchSignup),
    ]);
}
