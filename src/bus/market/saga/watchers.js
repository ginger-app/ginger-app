// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { marketTypes as types } from '../types';

// Workers
import { getCategoriesWorker } from './workers';

function* watchGetCategories() {
    yield takeEvery(types.GET_MARKET_CATEGORIES_ASYNC, getCategoriesWorker);
}

export function* watchMarket() {
    yield all([call(watchGetCategories)]);
}
