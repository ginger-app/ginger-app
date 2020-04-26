//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types
import { profileTypes as types } from '../types';

//*REMEMBER TO REEXPORT
//Workers
import { addItemToCartWorker } from './workers';

function* watchAddItemToCart() {
    yield takeEvery(types.ADD_ITEM_TO_CART_ASYNC, addItemToCartWorker);
}

export function* watchProfile() {
    yield all([call(watchAddItemToCart)]);
}
