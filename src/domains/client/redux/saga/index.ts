// // Core
// import { SagaIterator } from '@redux-saga/core';
// import { takeLatest, all, call } from 'redux-saga/effects';

// // Types
// import {
//   GET_LOGIN_SMS_CODE_ASYNC,
//   LOGIN_ASYNC,
//   LOGIN_WITH_REFRESH_ASYNC,
//   LOGOUT_ASYNC,
//   SIGNUP_ASYNC,
// } from '../auth.types';

// // Workers
// import {
//   getLoginSmsCodeWorker,
//   loginWorker,
//   logoutWorker,
//   signupWorker,
//   loginWithRefresh,
// } from './workers';

// function* watchGetLoginSmsCode(): SagaIterator {
//   yield takeLatest(GET_LOGIN_SMS_CODE_ASYNC, getLoginSmsCodeWorker);
// }
// function* watchSignup(): SagaIterator {
//   yield takeLatest(SIGNUP_ASYNC, signupWorker);
// }
// function* watchLogin(): SagaIterator {
//   yield takeLatest(LOGIN_ASYNC, loginWorker);
// }
// function* watchLogout(): SagaIterator {
//   yield takeLatest(LOGOUT_ASYNC, logoutWorker);
// }
// function* watchLoginWithRefresh(): SagaIterator {
//   yield takeLatest(LOGIN_WITH_REFRESH_ASYNC, loginWithRefresh);
// }

// export function* watchAuth(): SagaIterator {
//   yield all([
//     call(watchGetLoginSmsCode),
//     call(watchSignup),
//     call(watchLogin),
//     call(watchLogout),
//     call(watchLoginWithRefresh),
//   ]);
// }
export {};
