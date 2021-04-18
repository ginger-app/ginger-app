// Core
import { put } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { profileActions } from 'bus/profile/profile.actions';

// export function* repeatLastOrderWorker({ payload: { userCart, address } }) {
export function* repeatLastOrderWorker({ payload: { userCart } }) {
    try {
        yield put(profileActions.updateCart(userCart));
    } catch (err) {
        yield put(uiActions.emitError(err, '-> repeatLastOrderWorker'));
    }
}
