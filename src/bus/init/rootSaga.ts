// Core
import { all, call } from 'redux-saga/effects';

// Watchers
import { watchAuth } from 'bus/auth/saga/watchers';
import { watchProfile } from 'bus/profile/saga/watchers';
import { watchMarket } from 'bus/market/saga/watchers';
import { SagaIterator } from '@redux-saga/types';

export function* rootSaga(): SagaIterator {
    yield all([call(watchAuth), call(watchProfile), call(watchMarket)]);
}
