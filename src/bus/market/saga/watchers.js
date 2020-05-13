// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { marketTypes as types } from '../types';

// Workers
import {
    getCategoriesWorker,
    getCategoryDataWorker,
    getSubcategoryDataWorker,
    getProductDataWorker,
    createNewOrderWorker,
    getOrderDataWorker,
} from './workers';

function* watchGetCategories() {
    yield takeEvery(types.GET_MARKET_CATEGORIES_ASYNC, getCategoriesWorker);
}
function* watchGetCategoryData() {
    yield takeEvery(types.GET_MARKET_CATEGORY_DATA_ASYNC, getCategoryDataWorker);
}
function* watchGetSubcategoryData() {
    yield takeEvery(types.GET_MARKET_SUBCATEGORY_DATA_ASYNC, getSubcategoryDataWorker);
}
function* watchGetProductData() {
    yield takeEvery(types.GET_PRODUCT_DATA_ASYNC, getProductDataWorker);
}
function* watchCreateNewOrder() {
    yield takeEvery(types.CREATE_NEW_ORDER_ASYNC, createNewOrderWorker);
}
function* watchGetOrderData() {
    yield takeEvery(types.GET_ORDER_DATA_ASYNC, getOrderDataWorker);
}

export function* watchMarket() {
    yield all([
        call(watchGetCategories),
        call(watchGetProductData),
        call(watchGetCategoryData),
        call(watchGetSubcategoryData),
        call(watchCreateNewOrder),
        call(watchGetOrderData),
    ]);
}
