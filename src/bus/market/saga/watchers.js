// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { marketTypes as types } from '../types';

// Workers
import { getCategoriesWorker, getCategoryDataWorker } from './workers';

function* watchGetCategories() {
    yield takeEvery(types.GET_MARKET_CATEGORIES_ASYNC, getCategoriesWorker);
}
function* watchGetCategoryData() {
    yield takeEvery(types.GET_MARKET_CATEGORY_DATA_ASYNC, getCategoryDataWorker);
}

export function* watchMarket() {
    yield all([call(watchGetCategories), call(watchGetCategoryData)]);
}
