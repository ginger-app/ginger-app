// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { marketTypes as types } from '../market.types';

// Workers
import {
    getCategoriesWorker,
    getCategoryDataWorker,
    getSubcategoryDataWorker,
    getProductDataWorker,
    getOrderDataWorker,
    searchItemsByNameWorker,
    sendOrdersWorker,
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
function* watchGetOrderData() {
    yield takeEvery(types.GET_ORDER_DATA_ASYNC, getOrderDataWorker);
}
function* watchSearchItemsByName() {
    yield takeEvery(types.SEARCH_ITEMS_BY_NAME_ASYNC, searchItemsByNameWorker);
}
function* watchSendOrders() {
    yield takeEvery(types.SEND_ORDERS_ASYNC, sendOrdersWorker);
}

export function* watchMarket() {
    yield all([
        call(watchGetCategories),
        call(watchGetProductData),
        call(watchGetCategoryData),
        call(watchGetSubcategoryData),
        call(watchGetOrderData),
        call(watchSearchItemsByName),
        call(watchSendOrders),
    ]);
}
