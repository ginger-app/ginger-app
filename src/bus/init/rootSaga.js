// Core
import { all, call } from 'redux-saga/effects';

// Watchers
import { watchAuth } from 'bus/auth/saga/watchers';
import { watchProfile } from 'bus/profile/saga/watchers';
import { watchMarket } from 'bus/market/saga/watchers';

export function* rootSaga() {
    yield all([call(watchAuth), call(watchProfile), call(watchMarket)]);
}
