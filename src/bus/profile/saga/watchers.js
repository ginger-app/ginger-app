//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types
import { profileTypes as types } from '../types';

//*REMEMBER TO REEXPORT
//Workers
import {
    addItemToCartWorker,
    addItemToFavoritesWorker,
    getUserDataWorker,
    removeItemFromFavoritesWorker,
} from './workers';

function* watchAddItemToCart() {
    yield takeEvery(types.ADD_ITEM_TO_CART_ASYNC, addItemToCartWorker);
}
function* watchAddItemToFavorites() {
    yield takeEvery(types.ADD_ITEM_TO_FAVORITES_ASYNC, addItemToFavoritesWorker);
}
function* watchRemoveItemFromFavorites() {
    yield takeEvery(types.REMOVE_ITEM_FROM_FAVORITES_ASYNC, removeItemFromFavoritesWorker);
}
function* watchGetUserData() {
    yield takeEvery(types.GET_USER_DATA_ASYNC, getUserDataWorker);
}

export function* watchProfile() {
    yield all([
        call(watchAddItemToCart),
        call(watchAddItemToFavorites),
        call(watchGetUserData),
        call(watchRemoveItemFromFavorites),
    ]);
}
